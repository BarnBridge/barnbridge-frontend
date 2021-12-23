(this["webpackJsonpbarnbridge-frontend"] = this["webpackJsonpbarnbridge-frontend"] || []).push([[0],{

/***/ 1424:
/***/ (function(module, exports) {

module.exports = {
  minBlockRef: minBlockRef,
  maxBlockRef: maxBlockRef,
  sortBlockRefs: sortBlockRefs,
  bnToHex: bnToHex,
  blockRefIsNumber: blockRefIsNumber,
  hexToInt: hexToInt,
  incrementHexInt: incrementHexInt,
  intToHex: intToHex,
  unsafeRandomBytes: unsafeRandomBytes
};

function minBlockRef() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  var sortedRefs = sortBlockRefs(refs);
  return sortedRefs[0];
}

function maxBlockRef() {
  for (var _len2 = arguments.length, refs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    refs[_key2] = arguments[_key2];
  }

  var sortedRefs = sortBlockRefs(refs);
  return sortedRefs[sortedRefs.length - 1];
}

function sortBlockRefs(refs) {
  return refs.sort(function (refA, refB) {
    if (refA === 'latest' || refB === 'earliest') return 1;
    if (refB === 'latest' || refA === 'earliest') return -1;
    return hexToInt(refA) - hexToInt(refB);
  });
}

function bnToHex(bn) {
  return '0x' + bn.toString(16);
}

function blockRefIsNumber(blockRef) {
  return blockRef && !['earliest', 'latest', 'pending'].includes(blockRef);
}

function hexToInt(hexString) {
  if (hexString === undefined || hexString === null) return hexString;
  return Number.parseInt(hexString, 16);
}

function incrementHexInt(hexString) {
  if (hexString === undefined || hexString === null) return hexString;
  var value = hexToInt(hexString);
  return intToHex(value + 1);
}

function intToHex(int) {
  if (int === undefined || int === null) return int;
  var hexString = int.toString(16);
  var needsLeftPad = hexString.length % 2;
  if (needsLeftPad) hexString = '0' + hexString;
  return '0x' + hexString;
}

function unsafeRandomBytes(byteCount) {
  var result = '0x';

  for (var i = 0; i < byteCount; i++) {
    result += unsafeRandomNibble();
    result += unsafeRandomNibble();
  }

  return result;
}

function unsafeRandomNibble() {
  return Math.floor(Math.random() * 16).toString(16);
}

/***/ }),

/***/ 1435:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var _inherits = __webpack_require__(149);

var _createSuper = __webpack_require__(150);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var events_1 = __webpack_require__(61);

function safeApply(handler, context, args) {
  try {
    Reflect.apply(handler, context, args);
  } catch (err) {
    // Throw error after timeout so as not to interrupt the stack
    setTimeout(function () {
      throw err;
    });
  }
}

function arrayClone(arr) {
  var n = arr.length;
  var copy = new Array(n);

  for (var i = 0; i < n; i += 1) {
    copy[i] = arr[i];
  }

  return copy;
}

var SafeEventEmitter = /*#__PURE__*/function (_events_1$EventEmitte) {
  _inherits(SafeEventEmitter, _events_1$EventEmitte);

  var _super = _createSuper(SafeEventEmitter);

  function SafeEventEmitter() {
    _classCallCheck(this, SafeEventEmitter);

    return _super.apply(this, arguments);
  }

  _createClass(SafeEventEmitter, [{
    key: "emit",
    value: function emit(type) {
      var doError = type === 'error';
      var events = this._events;

      if (events !== undefined) {
        doError = doError && events.error === undefined;
      } else if (!doError) {
        return false;
      } // If there is no 'error' event listener then throw.


      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (doError) {
        var er;

        if (args.length > 0) {
          er = args[0];
        }

        if (er instanceof Error) {
          // Note: The comments on the `throw` lines are intentional, they show
          // up in Node's output if this results in an unhandled exception.
          throw er; // Unhandled 'error' event
        } // At least give some kind of context to the user


        var err = new Error("Unhandled error.".concat(er ? " (".concat(er.message, ")") : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
      }

      var handler = events[type];

      if (handler === undefined) {
        return false;
      }

      if (typeof handler === 'function') {
        safeApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler);

        for (var i = 0; i < len; i += 1) {
          safeApply(listeners[i], this, args);
        }
      }

      return true;
    }
  }]);

  return SafeEventEmitter;
}(events_1.EventEmitter);

exports.default = SafeEventEmitter;

/***/ }),

/***/ 1480:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var _inherits = __webpack_require__(149);

var _createSuper = __webpack_require__(150);

var _wrapNativeSuper = __webpack_require__(1518);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EthereumProviderError = exports.EthereumRpcError = void 0;

var fast_safe_stringify_1 = __webpack_require__(1519);
/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors
 * per EIP-1474.
 * Permits any integer error code.
 */


var EthereumRpcError = /*#__PURE__*/function (_Error) {
  _inherits(EthereumRpcError, _Error);

  var _super = _createSuper(EthereumRpcError);

  function EthereumRpcError(code, message, data) {
    var _this;

    _classCallCheck(this, EthereumRpcError);

    if (!Number.isInteger(code)) {
      throw new Error('"code" must be an integer.');
    }

    if (!message || typeof message !== 'string') {
      throw new Error('"message" must be a nonempty string.');
    }

    _this = _super.call(this, message);
    _this.code = code;

    if (data !== undefined) {
      _this.data = data;
    }

    return _this;
  }
  /**
   * Returns a plain object with all public class properties.
   */


  _createClass(EthereumRpcError, [{
    key: "serialize",
    value: function serialize() {
      var serialized = {
        code: this.code,
        message: this.message
      };

      if (this.data !== undefined) {
        serialized.data = this.data;
      }

      if (this.stack) {
        serialized.stack = this.stack;
      }

      return serialized;
    }
    /**
     * Return a string representation of the serialized error, omitting
     * any circular references.
     */

  }, {
    key: "toString",
    value: function toString() {
      return fast_safe_stringify_1.default(this.serialize(), stringifyReplacer, 2);
    }
  }]);

  return EthereumRpcError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.EthereumRpcError = EthereumRpcError;
/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * Permits integer error codes in the [ 1000 <= 4999 ] range.
 */

var EthereumProviderError = /*#__PURE__*/function (_EthereumRpcError) {
  _inherits(EthereumProviderError, _EthereumRpcError);

  var _super2 = _createSuper(EthereumProviderError);

  /**
   * Create an Ethereum Provider JSON-RPC error.
   * `code` must be an integer in the 1000 <= 4999 range.
   */
  function EthereumProviderError(code, message, data) {
    _classCallCheck(this, EthereumProviderError);

    if (!isValidEthProviderCode(code)) {
      throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
    }

    return _super2.call(this, code, message, data);
  }

  return EthereumProviderError;
}(EthereumRpcError);

exports.EthereumProviderError = EthereumProviderError; // Internal

function isValidEthProviderCode(code) {
  return Number.isInteger(code) && code >= 1000 && code <= 4999;
}

function stringifyReplacer(_, value) {
  if (value === '[Circular]') {
    return undefined;
  }

  return value;
}

/***/ }),

/***/ 1481:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorValues = exports.errorCodes = void 0;
exports.errorCodes = {
  rpc: {
    invalidInput: -32000,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603
  },
  provider: {
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901
  }
};
exports.errorValues = {
  '-32700': {
    standard: 'JSON RPC 2.0',
    message: 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.'
  },
  '-32600': {
    standard: 'JSON RPC 2.0',
    message: 'The JSON sent is not a valid Request object.'
  },
  '-32601': {
    standard: 'JSON RPC 2.0',
    message: 'The method does not exist / is not available.'
  },
  '-32602': {
    standard: 'JSON RPC 2.0',
    message: 'Invalid method parameter(s).'
  },
  '-32603': {
    standard: 'JSON RPC 2.0',
    message: 'Internal JSON-RPC error.'
  },
  '-32000': {
    standard: 'EIP-1474',
    message: 'Invalid input.'
  },
  '-32001': {
    standard: 'EIP-1474',
    message: 'Resource not found.'
  },
  '-32002': {
    standard: 'EIP-1474',
    message: 'Resource unavailable.'
  },
  '-32003': {
    standard: 'EIP-1474',
    message: 'Transaction rejected.'
  },
  '-32004': {
    standard: 'EIP-1474',
    message: 'Method not supported.'
  },
  '-32005': {
    standard: 'EIP-1474',
    message: 'Request limit exceeded.'
  },
  '4001': {
    standard: 'EIP-1193',
    message: 'User rejected the request.'
  },
  '4100': {
    standard: 'EIP-1193',
    message: 'The requested account and/or method has not been authorized by the user.'
  },
  '4200': {
    standard: 'EIP-1193',
    message: 'The requested method is not supported by this Ethereum provider.'
  },
  '4900': {
    standard: 'EIP-1193',
    message: 'The provider is disconnected from all chains.'
  },
  '4901': {
    standard: 'EIP-1193',
    message: 'The provider is disconnected from the specified chain.'
  }
};

/***/ }),

/***/ 1482:
/***/ (function(module, exports, __webpack_require__) {

var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var _inherits = __webpack_require__(149);

var _createSuper = __webpack_require__(150);

var SafeEventEmitter = __webpack_require__(1435).default;

var BaseFilter = /*#__PURE__*/function (_SafeEventEmitter) {
  "use strict";

  _inherits(BaseFilter, _SafeEventEmitter);

  var _super = _createSuper(BaseFilter);

  function BaseFilter() {
    var _this;

    _classCallCheck(this, BaseFilter);

    _this = _super.call(this);
    _this.updates = [];
    return _this;
  }

  _createClass(BaseFilter, [{
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function initialize() {
        return _initialize.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                throw new Error('BaseFilter - no update method specified');

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "addResults",
    value: function addResults(newResults) {
      var _this2 = this;

      this.updates = this.updates.concat(newResults);
      newResults.forEach(function (result) {
        return _this2.emit('update', result);
      });
    }
  }, {
    key: "addInitialResults",
    value: function addInitialResults(newResults) {}
  }, {
    key: "getChangesAndClear",
    value: function getChangesAndClear() {
      var updates = this.updates;
      this.updates = [];
      return updates;
    }
  }]);

  return BaseFilter;
}(SafeEventEmitter);

module.exports = BaseFilter;

/***/ }),

/***/ 1483:
/***/ (function(module, exports, __webpack_require__) {

var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

module.exports = getBlocksForRange;

function getBlocksForRange(_x) {
  return _getBlocksForRange.apply(this, arguments);
}

function _getBlocksForRange() {
  _getBlocksForRange = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var provider, fromBlock, toBlock, fromBlockNumber, toBlockNumber, blockCountToQuery, missingBlockNumbers, blockBodies;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            provider = _ref.provider, fromBlock = _ref.fromBlock, toBlock = _ref.toBlock;
            if (!fromBlock) fromBlock = toBlock;
            fromBlockNumber = hexToInt(fromBlock);
            toBlockNumber = hexToInt(toBlock);
            blockCountToQuery = toBlockNumber - fromBlockNumber + 1; // load all blocks from old to new (inclusive)

            missingBlockNumbers = Array(blockCountToQuery).fill().map(function (_, index) {
              return fromBlockNumber + index;
            }).map(intToHex);
            _context.next = 8;
            return Promise.all(missingBlockNumbers.map(function (blockNum) {
              return query(provider, 'eth_getBlockByNumber', [blockNum, false]);
            }));

          case 8:
            blockBodies = _context.sent;
            return _context.abrupt("return", blockBodies);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getBlocksForRange.apply(this, arguments);
}

function hexToInt(hexString) {
  if (hexString === undefined || hexString === null) return hexString;
  return Number.parseInt(hexString, 16);
}

function incrementHexInt(hexString) {
  if (hexString === undefined || hexString === null) return hexString;
  var value = hexToInt(hexString);
  return intToHex(value + 1);
}

function intToHex(int) {
  if (int === undefined || int === null) return int;
  var hexString = int.toString(16);
  return '0x' + hexString;
}

function query(provider, method, params) {
  return new Promise(function (resolve, reject) {
    provider.sendAsync({
      id: 1,
      jsonrpc: '2.0',
      method: method,
      params: params
    }, function (err, res) {
      if (err) return reject(err);
      resolve(res.result);
    });
  });
}

/***/ }),

/***/ 1518:
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(341);

var setPrototypeOf = __webpack_require__(456);

var isNativeFunction = __webpack_require__(1615);

var construct = __webpack_require__(682);

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;

/***/ }),

/***/ 1519:
/***/ (function(module, exports) {

module.exports = stringify;
stringify.default = stringify;
stringify.stable = deterministicStringify;
stringify.stableStringify = deterministicStringify;
var LIMIT_REPLACE_NODE = '[...]';
var CIRCULAR_REPLACE_NODE = '[Circular]';
var arr = [];
var replacerStack = [];

function defaultOptions() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  };
} // Regular stringify


function stringify(obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions();
  }

  decirc(obj, '', 0, [], undefined, 0, options);
  var res;

  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(obj, replacer, spacer);
    } else {
      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]');
  } finally {
    while (arr.length !== 0) {
      var part = arr.pop();

      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3]);
      } else {
        part[0][part[1]] = part[2];
      }
    }
  }

  return res;
}

function setReplace(replace, val, k, parent) {
  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);

  if (propertyDescriptor.get !== undefined) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, k, {
        value: replace
      });
      arr.push([parent, k, val, propertyDescriptor]);
    } else {
      replacerStack.push([val, k, replace]);
    }
  } else {
    parent[k] = replace;
    arr.push([parent, k, val]);
  }
}

function decirc(val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1;
  var i;

  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
        return;
      }
    }

    if (typeof options.depthLimit !== 'undefined' && depth > options.depthLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }

    if (typeof options.edgesLimit !== 'undefined' && edgeIndex + 1 > options.edgesLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }

    stack.push(val); // Optimize for Arrays. Big arrays could kill the performance otherwise!

    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, i, stack, val, depth, options);
      }
    } else {
      var keys = Object.keys(val);

      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        decirc(val[key], key, i, stack, val, depth, options);
      }
    }

    stack.pop();
  }
} // Stable-stringify


function compareFunction(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function deterministicStringify(obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions();
  }

  var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj;
  var res;

  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(tmp, replacer, spacer);
    } else {
      res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]');
  } finally {
    // Ensure that we restore the object as it was.
    while (arr.length !== 0) {
      var part = arr.pop();

      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3]);
      } else {
        part[0][part[1]] = part[2];
      }
    }
  }

  return res;
}

function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1;
  var i;

  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
        return;
      }
    }

    try {
      if (typeof val.toJSON === 'function') {
        return;
      }
    } catch (_) {
      return;
    }

    if (typeof options.depthLimit !== 'undefined' && depth > options.depthLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }

    if (typeof options.edgesLimit !== 'undefined' && edgeIndex + 1 > options.edgesLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }

    stack.push(val); // Optimize for Arrays. Big arrays could kill the performance otherwise!

    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, i, stack, val, depth, options);
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {};
      var keys = Object.keys(val).sort(compareFunction);

      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        deterministicDecirc(val[key], key, i, stack, val, depth, options);
        tmp[key] = val[key];
      }

      if (typeof parent !== 'undefined') {
        arr.push([parent, k, val]);
        parent[k] = tmp;
      } else {
        return tmp;
      }
    }

    stack.pop();
  }
} // wraps replacer function to handle values we couldn't replace
// and mark them as replaced value


function replaceGetterValues(replacer) {
  replacer = typeof replacer !== 'undefined' ? replacer : function (k, v) {
    return v;
  };
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i];

        if (part[1] === key && part[0] === val) {
          val = part[2];
          replacerStack.splice(i, 1);
          break;
        }
      }
    }

    return replacer.call(this, key, val);
  };
}

/***/ }),

/***/ 1529:
/***/ (function(module, exports, __webpack_require__) {

var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

var SafeEventEmitter = __webpack_require__(1435).default;

var createScaffoldMiddleware = __webpack_require__(1530);

var _require = __webpack_require__(1531),
    createAsyncMiddleware = _require.createAsyncMiddleware;

var createFilterMiddleware = __webpack_require__(1535);

var _require2 = __webpack_require__(1424),
    unsafeRandomBytes = _require2.unsafeRandomBytes,
    incrementHexInt = _require2.incrementHexInt;

var getBlocksForRange = __webpack_require__(1483);

module.exports = createSubscriptionMiddleware;

function createSubscriptionMiddleware(_ref) {
  var blockTracker = _ref.blockTracker,
      provider = _ref.provider;
  // state and utilities for handling subscriptions
  var subscriptions = {};
  var filterManager = createFilterMiddleware({
    blockTracker: blockTracker,
    provider: provider
  }); // internal flag

  var isDestroyed = false; // create subscriptionManager api object

  var events = new SafeEventEmitter();
  var middleware = createScaffoldMiddleware({
    eth_subscribe: createAsyncMiddleware(subscribe),
    eth_unsubscribe: createAsyncMiddleware(unsubscribe)
  });
  middleware.destroy = destroy;
  return {
    events: events,
    middleware: middleware
  };

  function subscribe(_x, _x2) {
    return _subscribe.apply(this, arguments);
  }

  function _subscribe() {
    _subscribe = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(req, res) {
      var subscriptionType, subId, sub, filterParams, filter, createSubNewHeads, createSubFromFilter;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              createSubFromFilter = function _createSubFromFilter(_ref4) {
                var subId = _ref4.subId,
                    filter = _ref4.filter;
                filter.on('update', function (result) {
                  return _emitSubscriptionResult(subId, result);
                });
                var sub = {
                  type: subscriptionType,
                  destroy: function () {
                    var _destroy2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
                      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.next = 2;
                              return filterManager.uninstallFilter(filter.idHex);

                            case 2:
                              return _context3.abrupt("return", _context3.sent);

                            case 3:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3);
                    }));

                    function destroy() {
                      return _destroy2.apply(this, arguments);
                    }

                    return destroy;
                  }()
                };
                return sub;
              };

              createSubNewHeads = function _createSubNewHeads(_ref2) {
                var subId = _ref2.subId;
                var sub = {
                  type: subscriptionType,
                  destroy: function () {
                    var _destroy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                      return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              blockTracker.removeListener('sync', sub.update);

                            case 1:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    function destroy() {
                      return _destroy.apply(this, arguments);
                    }

                    return destroy;
                  }(),
                  update: function () {
                    var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref3) {
                      var oldBlock, newBlock, toBlock, fromBlock, rawBlocks, results;
                      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              oldBlock = _ref3.oldBlock, newBlock = _ref3.newBlock;
                              // for newHeads
                              toBlock = newBlock;
                              fromBlock = incrementHexInt(oldBlock);
                              _context2.next = 5;
                              return getBlocksForRange({
                                provider: provider,
                                fromBlock: fromBlock,
                                toBlock: toBlock
                              });

                            case 5:
                              rawBlocks = _context2.sent;
                              results = rawBlocks.map(normalizeBlock);
                              results.forEach(function (value) {
                                _emitSubscriptionResult(subId, value);
                              });

                            case 8:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));

                    function update(_x5) {
                      return _update.apply(this, arguments);
                    }

                    return update;
                  }()
                }; // check for subscription updates on new block

                blockTracker.on('sync', sub.update);
                return sub;
              };

              if (!isDestroyed) {
                _context4.next = 4;
                break;
              }

              throw new Error('SubscriptionManager - attempting to use after destroying');

            case 4:
              subscriptionType = req.params[0]; // subId is 16 byte hex string

              subId = unsafeRandomBytes(16); // create sub

              _context4.t0 = subscriptionType;
              _context4.next = _context4.t0 === 'newHeads' ? 9 : _context4.t0 === 'logs' ? 11 : 17;
              break;

            case 9:
              sub = createSubNewHeads({
                subId: subId
              });
              return _context4.abrupt("break", 18);

            case 11:
              filterParams = req.params[1];
              _context4.next = 14;
              return filterManager.newLogFilter(filterParams);

            case 14:
              filter = _context4.sent;
              sub = createSubFromFilter({
                subId: subId,
                filter: filter
              });
              return _context4.abrupt("break", 18);

            case 17:
              throw new Error("SubscriptionManager - unsupported subscription type \"".concat(subscriptionType, "\""));

            case 18:
              subscriptions[subId] = sub;
              res.result = subId;
              return _context4.abrupt("return");

            case 21:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _subscribe.apply(this, arguments);
  }

  function unsubscribe(_x3, _x4) {
    return _unsubscribe.apply(this, arguments);
  }

  function _unsubscribe() {
    _unsubscribe = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(req, res) {
      var id, subscription;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!isDestroyed) {
                _context5.next = 2;
                break;
              }

              throw new Error('SubscriptionManager - attempting to use after destroying');

            case 2:
              id = req.params[0];
              subscription = subscriptions[id]; // if missing, return "false" to indicate it was not removed

              if (subscription) {
                _context5.next = 7;
                break;
              }

              res.result = false;
              return _context5.abrupt("return");

            case 7:
              // cleanup subscription
              delete subscriptions[id];
              _context5.next = 10;
              return subscription.destroy();

            case 10:
              res.result = true;

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _unsubscribe.apply(this, arguments);
  }

  function _emitSubscriptionResult(filterIdHex, value) {
    events.emit('notification', {
      jsonrpc: '2.0',
      method: 'eth_subscription',
      params: {
        subscription: filterIdHex,
        result: value
      }
    });
  }

  function destroy() {
    events.removeAllListeners();

    for (var id in subscriptions) {
      subscriptions[id].destroy();
      delete subscriptions[id];
    }

    isDestroyed = true;
  }
}

function normalizeBlock(block) {
  return {
    hash: block.hash,
    parentHash: block.parentHash,
    sha3Uncles: block.sha3Uncles,
    miner: block.miner,
    stateRoot: block.stateRoot,
    transactionsRoot: block.transactionsRoot,
    receiptsRoot: block.receiptsRoot,
    logsBloom: block.logsBloom,
    difficulty: block.difficulty,
    number: block.number,
    gasLimit: block.gasLimit,
    gasUsed: block.gasUsed,
    nonce: block.nonce,
    mixHash: block.mixHash,
    timestamp: block.timestamp,
    extraData: block.extraData
  };
}

/***/ }),

/***/ 1530:
/***/ (function(module, exports, __webpack_require__) {

// for backwards compat
module.exports = __webpack_require__(1626);

/***/ }),

/***/ 1531:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(1627), exports);

__exportStar(__webpack_require__(1628), exports);

__exportStar(__webpack_require__(1629), exports);

__exportStar(__webpack_require__(1532), exports);

__exportStar(__webpack_require__(1533), exports);

__exportStar(__webpack_require__(1632), exports);

/***/ }),

/***/ 1532:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUniqueId = void 0; // uint32 (two's complement) max
// more conservative than Number.MAX_SAFE_INTEGER

var MAX = 4294967295;
var idCounter = Math.floor(Math.random() * MAX);

function getUniqueId() {
  idCounter = (idCounter + 1) % MAX;
  return idCounter;
}

exports.getUniqueId = getUniqueId;

/***/ }),

/***/ 1533:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createForOfIteratorHelper = __webpack_require__(112);

var _regeneratorRuntime = __webpack_require__(12);

var _slicedToArray = __webpack_require__(138);

var _asyncToGenerator = __webpack_require__(103);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var _inherits = __webpack_require__(149);

var _createSuper = __webpack_require__(150);

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonRpcEngine = void 0;

var safe_event_emitter_1 = __importDefault(__webpack_require__(1435));

var eth_rpc_errors_1 = __webpack_require__(1630);
/**
 * A JSON-RPC request and response processor.
 * Give it a stack of middleware, pass it requests, and get back responses.
 */


var JsonRpcEngine = /*#__PURE__*/function (_safe_event_emitter_) {
  _inherits(JsonRpcEngine, _safe_event_emitter_);

  var _super = _createSuper(JsonRpcEngine);

  function JsonRpcEngine() {
    var _this;

    _classCallCheck(this, JsonRpcEngine);

    _this = _super.call(this);
    _this._middleware = [];
    return _this;
  }
  /**
   * Add a middleware function to the engine's middleware stack.
   *
   * @param middleware - The middleware function to add.
   */


  _createClass(JsonRpcEngine, [{
    key: "push",
    value: function push(middleware) {
      this._middleware.push(middleware);
    }
  }, {
    key: "handle",
    value: function handle(req, cb) {
      if (cb && typeof cb !== 'function') {
        throw new Error('"callback" must be a function if provided.');
      }

      if (Array.isArray(req)) {
        if (cb) {
          return this._handleBatch(req, cb);
        }

        return this._handleBatch(req);
      }

      if (cb) {
        return this._handle(req, cb);
      }

      return this._promiseHandle(req);
    }
    /**
     * Returns this engine as a middleware function that can be pushed to other
     * engines.
     *
     * @returns This engine as a middleware function.
     */

  }, {
    key: "asMiddleware",
    value: function asMiddleware() {
      var _this2 = this;

      return /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res, next, end) {
          var _yield$JsonRpcEngine$, _yield$JsonRpcEngine$2, middlewareError, isComplete, returnHandlers;

          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return JsonRpcEngine._runAllMiddleware(req, res, _this2._middleware);

                case 3:
                  _yield$JsonRpcEngine$ = _context2.sent;
                  _yield$JsonRpcEngine$2 = _slicedToArray(_yield$JsonRpcEngine$, 3);
                  middlewareError = _yield$JsonRpcEngine$2[0];
                  isComplete = _yield$JsonRpcEngine$2[1];
                  returnHandlers = _yield$JsonRpcEngine$2[2];

                  if (!isComplete) {
                    _context2.next = 12;
                    break;
                  }

                  _context2.next = 11;
                  return JsonRpcEngine._runReturnHandlers(returnHandlers);

                case 11:
                  return _context2.abrupt("return", end(middlewareError));

                case 12:
                  return _context2.abrupt("return", next( /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(handlerCallback) {
                      return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              _context.next = 3;
                              return JsonRpcEngine._runReturnHandlers(returnHandlers);

                            case 3:
                              _context.next = 8;
                              break;

                            case 5:
                              _context.prev = 5;
                              _context.t0 = _context["catch"](0);
                              return _context.abrupt("return", handlerCallback(_context.t0));

                            case 8:
                              return _context.abrupt("return", handlerCallback());

                            case 9:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, null, [[0, 5]]);
                    }));

                    return function (_x5) {
                      return _ref2.apply(this, arguments);
                    };
                  }()));

                case 15:
                  _context2.prev = 15;
                  _context2.t0 = _context2["catch"](0);
                  return _context2.abrupt("return", end(_context2.t0));

                case 18:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[0, 15]]);
        }));

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }();
    }
  }, {
    key: "_handleBatch",
    value: function () {
      var _handleBatch2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(reqs, cb) {
        var responses;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return Promise.all( // 1. Begin executing each request in the order received
                reqs.map(this._promiseHandle.bind(this)));

              case 3:
                responses = _context3.sent;

                if (!cb) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", cb(null, responses));

              case 6:
                return _context3.abrupt("return", responses);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);

                if (!cb) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("return", cb(_context3.t0));

              case 13:
                throw _context3.t0;

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 9]]);
      }));

      function _handleBatch(_x6, _x7) {
        return _handleBatch2.apply(this, arguments);
      }

      return _handleBatch;
    }()
    /**
     * A promise-wrapped _handle.
     */

  }, {
    key: "_promiseHandle",
    value: function _promiseHandle(req) {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3._handle(req, function (_err, res) {
          // There will always be a response, and it will always have any error
          // that is caught and propagated.
          resolve(res);
        });
      });
    }
    /**
     * Ensures that the request object is valid, processes it, and passes any
     * error and the response object to the given callback.
     *
     * Does not reject.
     */

  }, {
    key: "_handle",
    value: function () {
      var _handle2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(callerReq, cb) {
        var _error2, _error3, req, res, error;

        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!callerReq || Array.isArray(callerReq) || typeof callerReq !== 'object')) {
                  _context4.next = 3;
                  break;
                }

                _error2 = new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.invalidRequest, "Requests must be plain objects. Received: ".concat(typeof callerReq), {
                  request: callerReq
                });
                return _context4.abrupt("return", cb(_error2, {
                  id: undefined,
                  jsonrpc: '2.0',
                  error: _error2
                }));

              case 3:
                if (!(typeof callerReq.method !== 'string')) {
                  _context4.next = 6;
                  break;
                }

                _error3 = new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.invalidRequest, "Must specify a string method. Received: ".concat(typeof callerReq.method), {
                  request: callerReq
                });
                return _context4.abrupt("return", cb(_error3, {
                  id: callerReq.id,
                  jsonrpc: '2.0',
                  error: _error3
                }));

              case 6:
                req = Object.assign({}, callerReq);
                res = {
                  id: req.id,
                  jsonrpc: req.jsonrpc
                };
                error = null;
                _context4.prev = 9;
                _context4.next = 12;
                return this._processRequest(req, res);

              case 12:
                _context4.next = 17;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](9);
                // A request handler error, a re-thrown middleware error, or something
                // unexpected.
                error = _context4.t0;

              case 17:
                if (error) {
                  // Ensure no result is present on an errored response
                  delete res.result;

                  if (!res.error) {
                    res.error = eth_rpc_errors_1.serializeError(error);
                  }
                }

                return _context4.abrupt("return", cb(error, res));

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[9, 14]]);
      }));

      function _handle(_x8, _x9) {
        return _handle2.apply(this, arguments);
      }

      return _handle;
    }()
    /**
     * For the given request and response, runs all middleware and their return
     * handlers, if any, and ensures that internal request processing semantics
     * are satisfied.
     */

  }, {
    key: "_processRequest",
    value: function () {
      var _processRequest2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(req, res) {
        var _yield$JsonRpcEngine$3, _yield$JsonRpcEngine$4, error, isComplete, returnHandlers;

        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return JsonRpcEngine._runAllMiddleware(req, res, this._middleware);

              case 2:
                _yield$JsonRpcEngine$3 = _context5.sent;
                _yield$JsonRpcEngine$4 = _slicedToArray(_yield$JsonRpcEngine$3, 3);
                error = _yield$JsonRpcEngine$4[0];
                isComplete = _yield$JsonRpcEngine$4[1];
                returnHandlers = _yield$JsonRpcEngine$4[2];

                // Throw if "end" was not called, or if the response has neither a result
                // nor an error.
                JsonRpcEngine._checkForCompletion(req, res, isComplete); // The return handlers should run even if an error was encountered during
                // middleware processing.


                _context5.next = 10;
                return JsonRpcEngine._runReturnHandlers(returnHandlers);

              case 10:
                if (!error) {
                  _context5.next = 12;
                  break;
                }

                throw error;

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _processRequest(_x10, _x11) {
        return _processRequest2.apply(this, arguments);
      }

      return _processRequest;
    }()
    /**
     * Serially executes the given stack of middleware.
     *
     * @returns An array of any error encountered during middleware execution,
     * a boolean indicating whether the request was completed, and an array of
     * middleware-defined return handlers.
     */

  }], [{
    key: "_runAllMiddleware",
    value: function () {
      var _runAllMiddleware2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(req, res, middlewareStack) {
        var returnHandlers, error, isComplete, _iterator, _step, middleware, _yield$JsonRpcEngine$5, _yield$JsonRpcEngine$6;

        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                returnHandlers = [];
                error = null;
                isComplete = false; // Go down stack of middleware, call and collect optional returnHandlers

                _iterator = _createForOfIteratorHelper(middlewareStack);
                _context6.prev = 4;

                _iterator.s();

              case 6:
                if ((_step = _iterator.n()).done) {
                  _context6.next = 18;
                  break;
                }

                middleware = _step.value;
                _context6.next = 10;
                return JsonRpcEngine._runMiddleware(req, res, middleware, returnHandlers);

              case 10:
                _yield$JsonRpcEngine$5 = _context6.sent;
                _yield$JsonRpcEngine$6 = _slicedToArray(_yield$JsonRpcEngine$5, 2);
                error = _yield$JsonRpcEngine$6[0];
                isComplete = _yield$JsonRpcEngine$6[1];

                if (!isComplete) {
                  _context6.next = 16;
                  break;
                }

                return _context6.abrupt("break", 18);

              case 16:
                _context6.next = 6;
                break;

              case 18:
                _context6.next = 23;
                break;

              case 20:
                _context6.prev = 20;
                _context6.t0 = _context6["catch"](4);

                _iterator.e(_context6.t0);

              case 23:
                _context6.prev = 23;

                _iterator.f();

                return _context6.finish(23);

              case 26:
                return _context6.abrupt("return", [error, isComplete, returnHandlers.reverse()]);

              case 27:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[4, 20, 23, 26]]);
      }));

      function _runAllMiddleware(_x12, _x13, _x14) {
        return _runAllMiddleware2.apply(this, arguments);
      }

      return _runAllMiddleware;
    }()
    /**
     * Runs an individual middleware.
     *
     * @returns An array of any error encountered during middleware exection,
     * and a boolean indicating whether the request should end.
     */

  }, {
    key: "_runMiddleware",
    value: function _runMiddleware(req, res, middleware, returnHandlers) {
      return new Promise(function (resolve) {
        var end = function end(err) {
          var error = err || res.error;

          if (error) {
            res.error = eth_rpc_errors_1.serializeError(error);
          } // True indicates that the request should end


          resolve([error, true]);
        };

        var next = function next(returnHandler) {
          if (res.error) {
            end(res.error);
          } else {
            if (returnHandler) {
              if (typeof returnHandler !== 'function') {
                end(new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, "JsonRpcEngine: \"next\" return handlers must be functions. " + "Received \"".concat(typeof returnHandler, "\" for request:\n").concat(jsonify(req)), {
                  request: req
                }));
              }

              returnHandlers.push(returnHandler);
            } // False indicates that the request should not end


            resolve([null, false]);
          }
        };

        try {
          middleware(req, res, next, end);
        } catch (error) {
          end(error);
        }
      });
    }
    /**
     * Serially executes array of return handlers. The request and response are
     * assumed to be in their scope.
     */

  }, {
    key: "_runReturnHandlers",
    value: function () {
      var _runReturnHandlers2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(handlers) {
        var _iterator2, _step2, _loop;

        return _regeneratorRuntime.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _iterator2 = _createForOfIteratorHelper(handlers);
                _context8.prev = 1;
                _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop() {
                  var handler;
                  return _regeneratorRuntime.wrap(function _loop$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          handler = _step2.value;
                          _context7.next = 3;
                          return new Promise(function (resolve, reject) {
                            handler(function (err) {
                              return err ? reject(err) : resolve();
                            });
                          });

                        case 3:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _loop);
                });

                _iterator2.s();

              case 4:
                if ((_step2 = _iterator2.n()).done) {
                  _context8.next = 8;
                  break;
                }

                return _context8.delegateYield(_loop(), "t0", 6);

              case 6:
                _context8.next = 4;
                break;

              case 8:
                _context8.next = 13;
                break;

              case 10:
                _context8.prev = 10;
                _context8.t1 = _context8["catch"](1);

                _iterator2.e(_context8.t1);

              case 13:
                _context8.prev = 13;

                _iterator2.f();

                return _context8.finish(13);

              case 16:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, null, [[1, 10, 13, 16]]);
      }));

      function _runReturnHandlers(_x15) {
        return _runReturnHandlers2.apply(this, arguments);
      }

      return _runReturnHandlers;
    }()
    /**
     * Throws an error if the response has neither a result nor an error, or if
     * the "isComplete" flag is falsy.
     */

  }, {
    key: "_checkForCompletion",
    value: function _checkForCompletion(req, res, isComplete) {
      if (!('result' in res) && !('error' in res)) {
        throw new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, "JsonRpcEngine: Response has no error or result for request:\n".concat(jsonify(req)), {
          request: req
        });
      }

      if (!isComplete) {
        throw new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, "JsonRpcEngine: Nothing ended request:\n".concat(jsonify(req)), {
          request: req
        });
      }
    }
  }]);

  return JsonRpcEngine;
}(safe_event_emitter_1.default);

exports.JsonRpcEngine = JsonRpcEngine;

function jsonify(request) {
  return JSON.stringify(request, null, 2);
}

/***/ }),

/***/ 1534:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeError = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;

var error_constants_1 = __webpack_require__(1481);

var classes_1 = __webpack_require__(1480);

var FALLBACK_ERROR_CODE = error_constants_1.errorCodes.rpc.internal;
var FALLBACK_MESSAGE = 'Unspecified error message. This is a bug, please report it.';
var FALLBACK_ERROR = {
  code: FALLBACK_ERROR_CODE,
  message: getMessageFromCode(FALLBACK_ERROR_CODE)
};
exports.JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.';
/**
 * Gets the message for a given code, or a fallback message if the code has
 * no corresponding message.
 */

function getMessageFromCode(code) {
  var fallbackMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FALLBACK_MESSAGE;

  if (Number.isInteger(code)) {
    var codeString = code.toString();

    if (hasKey(error_constants_1.errorValues, codeString)) {
      return error_constants_1.errorValues[codeString].message;
    }

    if (isJsonRpcServerError(code)) {
      return exports.JSON_RPC_SERVER_ERROR_MESSAGE;
    }
  }

  return fallbackMessage;
}

exports.getMessageFromCode = getMessageFromCode;
/**
 * Returns whether the given code is valid.
 * A code is only valid if it has a message.
 */

function isValidCode(code) {
  if (!Number.isInteger(code)) {
    return false;
  }

  var codeString = code.toString();

  if (error_constants_1.errorValues[codeString]) {
    return true;
  }

  if (isJsonRpcServerError(code)) {
    return true;
  }

  return false;
}

exports.isValidCode = isValidCode;
/**
 * Serializes the given error to an Ethereum JSON RPC-compatible error object.
 * Merely copies the given error's values if it is already compatible.
 * If the given error is not fully compatible, it will be preserved on the
 * returned object's data.originalError property.
 */

function serializeError(error) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$fallbackError = _ref.fallbackError,
      fallbackError = _ref$fallbackError === void 0 ? FALLBACK_ERROR : _ref$fallbackError,
      _ref$shouldIncludeSta = _ref.shouldIncludeStack,
      shouldIncludeStack = _ref$shouldIncludeSta === void 0 ? false : _ref$shouldIncludeSta;

  var _a, _b;

  if (!fallbackError || !Number.isInteger(fallbackError.code) || typeof fallbackError.message !== 'string') {
    throw new Error('Must provide fallback error with integer number code and string message.');
  }

  if (error instanceof classes_1.EthereumRpcError) {
    return error.serialize();
  }

  var serialized = {};

  if (error && typeof error === 'object' && !Array.isArray(error) && hasKey(error, 'code') && isValidCode(error.code)) {
    var _error = error;
    serialized.code = _error.code;

    if (_error.message && typeof _error.message === 'string') {
      serialized.message = _error.message;

      if (hasKey(_error, 'data')) {
        serialized.data = _error.data;
      }
    } else {
      serialized.message = getMessageFromCode(serialized.code);
      serialized.data = {
        originalError: assignOriginalError(error)
      };
    }
  } else {
    serialized.code = fallbackError.code;
    var message = (_a = error) === null || _a === void 0 ? void 0 : _a.message;
    serialized.message = message && typeof message === 'string' ? message : fallbackError.message;
    serialized.data = {
      originalError: assignOriginalError(error)
    };
  }

  var stack = (_b = error) === null || _b === void 0 ? void 0 : _b.stack;

  if (shouldIncludeStack && error && stack && typeof stack === 'string') {
    serialized.stack = stack;
  }

  return serialized;
}

exports.serializeError = serializeError; // Internal

function isJsonRpcServerError(code) {
  return code >= -32099 && code <= -32000;
}

function assignOriginalError(error) {
  if (error && typeof error === 'object' && !Array.isArray(error)) {
    return Object.assign({}, error);
  }

  return error;
}

function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/***/ }),

/***/ 1535:
/***/ (function(module, exports, __webpack_require__) {

var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

var Mutex = __webpack_require__(1961).Mutex;

var _require = __webpack_require__(1531),
    createAsyncMiddleware = _require.createAsyncMiddleware;

var createJsonRpcMiddleware = __webpack_require__(1530);

var LogFilter = __webpack_require__(1633);

var BlockFilter = __webpack_require__(1636);

var TxFilter = __webpack_require__(1637);

var _require2 = __webpack_require__(1424),
    intToHex = _require2.intToHex,
    hexToInt = _require2.hexToInt;

module.exports = createEthFilterMiddleware;

function createEthFilterMiddleware(_ref) {
  var blockTracker = _ref.blockTracker,
      provider = _ref.provider;
  // create filter collection
  var filterIndex = 0;
  var filters = {}; // create update mutex

  var mutex = new Mutex();
  var waitForFree = mutexMiddlewareWrapper({
    mutex: mutex
  });
  var middleware = createJsonRpcMiddleware({
    // install filters
    eth_newFilter: waitForFree(toFilterCreationMiddleware(newLogFilter)),
    eth_newBlockFilter: waitForFree(toFilterCreationMiddleware(newBlockFilter)),
    eth_newPendingTransactionFilter: waitForFree(toFilterCreationMiddleware(newPendingTransactionFilter)),
    // uninstall filters
    eth_uninstallFilter: waitForFree(toAsyncRpcMiddleware(uninstallFilterHandler)),
    // checking filter changes
    eth_getFilterChanges: waitForFree(toAsyncRpcMiddleware(getFilterChanges)),
    eth_getFilterLogs: waitForFree(toAsyncRpcMiddleware(getFilterLogs))
  }); // setup filter updating and destroy handler

  var filterUpdater = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref2) {
      var oldBlock, newBlock, releaseLock;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              oldBlock = _ref2.oldBlock, newBlock = _ref2.newBlock;

              if (!(filters.length === 0)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              _context2.next = 5;
              return mutex.acquire();

            case 5:
              releaseLock = _context2.sent;
              _context2.prev = 6;
              _context2.next = 9;
              return Promise.all(objValues(filters).map( /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(filter) {
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return filter.update({
                            oldBlock: oldBlock,
                            newBlock: newBlock
                          });

                        case 3:
                          _context.next = 8;
                          break;

                        case 5:
                          _context.prev = 5;
                          _context.t0 = _context["catch"](0);
                          // handle each error individually so filter update errors don't affect other filters
                          console.error(_context.t0);

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[0, 5]]);
                }));

                return function (_x2) {
                  return _ref4.apply(this, arguments);
                };
              }()));

            case 9:
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](6);
              // log error so we don't skip the releaseLock
              console.error(_context2.t0);

            case 14:
              // unlock update reads
              releaseLock();

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[6, 11]]);
    }));

    return function filterUpdater(_x) {
      return _ref3.apply(this, arguments);
    };
  }(); // expose filter methods directly


  middleware.newLogFilter = newLogFilter;
  middleware.newBlockFilter = newBlockFilter;
  middleware.newPendingTransactionFilter = newPendingTransactionFilter;
  middleware.uninstallFilter = uninstallFilterHandler;
  middleware.getFilterChanges = getFilterChanges;
  middleware.getFilterLogs = getFilterLogs; // expose destroy method for cleanup

  middleware.destroy = function () {
    uninstallAllFilters();
  };

  return middleware; //
  // new filters
  //

  function newLogFilter(_x3) {
    return _newLogFilter.apply(this, arguments);
  }

  function _newLogFilter() {
    _newLogFilter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(params) {
      var filter, filterIndex;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              filter = new LogFilter({
                provider: provider,
                params: params
              });
              _context3.next = 3;
              return installFilter(filter);

            case 3:
              filterIndex = _context3.sent;
              return _context3.abrupt("return", filter);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _newLogFilter.apply(this, arguments);
  }

  function newBlockFilter() {
    return _newBlockFilter.apply(this, arguments);
  }

  function _newBlockFilter() {
    _newBlockFilter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      var filter, filterIndex;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              filter = new BlockFilter({
                provider: provider
              });
              _context4.next = 3;
              return installFilter(filter);

            case 3:
              filterIndex = _context4.sent;
              return _context4.abrupt("return", filter);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _newBlockFilter.apply(this, arguments);
  }

  function newPendingTransactionFilter() {
    return _newPendingTransactionFilter.apply(this, arguments);
  } //
  // get filter changes
  //


  function _newPendingTransactionFilter() {
    _newPendingTransactionFilter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
      var filter, filterIndex;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              filter = new TxFilter({
                provider: provider
              });
              _context5.next = 3;
              return installFilter(filter);

            case 3:
              filterIndex = _context5.sent;
              return _context5.abrupt("return", filter);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _newPendingTransactionFilter.apply(this, arguments);
  }

  function getFilterChanges(_x4) {
    return _getFilterChanges.apply(this, arguments);
  }

  function _getFilterChanges() {
    _getFilterChanges = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(filterIndexHex) {
      var filterIndex, filter, results;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              filterIndex = hexToInt(filterIndexHex);
              filter = filters[filterIndex];

              if (filter) {
                _context6.next = 4;
                break;
              }

              throw new Error("No filter for index \"".concat(filterIndex, "\""));

            case 4:
              results = filter.getChangesAndClear();
              return _context6.abrupt("return", results);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _getFilterChanges.apply(this, arguments);
  }

  function getFilterLogs(_x5) {
    return _getFilterLogs.apply(this, arguments);
  } //
  // remove filters
  //


  function _getFilterLogs() {
    _getFilterLogs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(filterIndexHex) {
      var filterIndex, filter;
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              filterIndex = hexToInt(filterIndexHex);
              filter = filters[filterIndex];

              if (filter) {
                _context7.next = 4;
                break;
              }

              throw new Error("No filter for index \"".concat(filterIndex, "\""));

            case 4:
              // only return results for log filters
              if (filter.type === 'log') {
                results = filter.getAllResults();
              } else {
                results = [];
              }

              return _context7.abrupt("return", results);

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    return _getFilterLogs.apply(this, arguments);
  }

  function uninstallFilterHandler(_x6) {
    return _uninstallFilterHandler.apply(this, arguments);
  } //
  // utils
  //


  function _uninstallFilterHandler() {
    _uninstallFilterHandler = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(filterIndexHex) {
      var filterIndex, filter, result;
      return _regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              // check filter exists
              filterIndex = hexToInt(filterIndexHex);
              filter = filters[filterIndex];
              result = Boolean(filter); // uninstall filter

              if (!result) {
                _context8.next = 6;
                break;
              }

              _context8.next = 6;
              return uninstallFilter(filterIndex);

            case 6:
              return _context8.abrupt("return", result);

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));
    return _uninstallFilterHandler.apply(this, arguments);
  }

  function installFilter(_x7) {
    return _installFilter.apply(this, arguments);
  }

  function _installFilter() {
    _installFilter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(filter) {
      var prevFilterCount, currentBlock, newFilterCount;
      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              prevFilterCount = objValues(filters).length; // install filter

              _context9.next = 3;
              return blockTracker.getLatestBlock();

            case 3:
              currentBlock = _context9.sent;
              _context9.next = 6;
              return filter.initialize({
                currentBlock: currentBlock
              });

            case 6:
              filterIndex++;
              filters[filterIndex] = filter;
              filter.id = filterIndex;
              filter.idHex = intToHex(filterIndex); // update block tracker subs

              newFilterCount = objValues(filters).length;
              updateBlockTrackerSubs({
                prevFilterCount: prevFilterCount,
                newFilterCount: newFilterCount
              });
              return _context9.abrupt("return", filterIndex);

            case 13:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));
    return _installFilter.apply(this, arguments);
  }

  function uninstallFilter(_x8) {
    return _uninstallFilter.apply(this, arguments);
  }

  function _uninstallFilter() {
    _uninstallFilter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(filterIndex) {
      var prevFilterCount, newFilterCount;
      return _regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              prevFilterCount = objValues(filters).length;
              delete filters[filterIndex]; // update block tracker subs

              newFilterCount = objValues(filters).length;
              updateBlockTrackerSubs({
                prevFilterCount: prevFilterCount,
                newFilterCount: newFilterCount
              });

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));
    return _uninstallFilter.apply(this, arguments);
  }

  function uninstallAllFilters() {
    return _uninstallAllFilters.apply(this, arguments);
  }

  function _uninstallAllFilters() {
    _uninstallAllFilters = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11() {
      var prevFilterCount;
      return _regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              prevFilterCount = objValues(filters).length;
              filters = {}; // update block tracker subs

              updateBlockTrackerSubs({
                prevFilterCount: prevFilterCount,
                newFilterCount: 0
              });

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));
    return _uninstallAllFilters.apply(this, arguments);
  }

  function updateBlockTrackerSubs(_ref5) {
    var prevFilterCount = _ref5.prevFilterCount,
        newFilterCount = _ref5.newFilterCount;

    // subscribe
    if (prevFilterCount === 0 && newFilterCount > 0) {
      blockTracker.on('sync', filterUpdater);
      return;
    } // unsubscribe


    if (prevFilterCount > 0 && newFilterCount === 0) {
      blockTracker.removeListener('sync', filterUpdater);
      return;
    }
  }
} // helper for turning filter constructors into rpc middleware


function toFilterCreationMiddleware(createFilterFn) {
  return toAsyncRpcMiddleware( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12() {
    var filter,
        result,
        _args12 = arguments;
    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return createFilterFn.apply(void 0, _args12);

          case 2:
            filter = _context12.sent;
            result = intToHex(filter.id);
            return _context12.abrupt("return", result);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
} // helper for pulling out req.params and setting res.result


function toAsyncRpcMiddleware(asyncFn) {
  return createAsyncMiddleware( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(req, res) {
      var result;
      return _regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return asyncFn.apply(null, req.params);

            case 2:
              result = _context13.sent;
              res.result = result;

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x9, _x10) {
      return _ref7.apply(this, arguments);
    };
  }());
}

function mutexMiddlewareWrapper(_ref8) {
  var mutex = _ref8.mutex;
  return function (middleware) {
    return /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(req, res, next, end) {
        var releaseLock;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return mutex.acquire();

              case 2:
                releaseLock = _context14.sent;
                releaseLock();
                middleware(req, res, next, end);

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      return function (_x11, _x12, _x13, _x14) {
        return _ref9.apply(this, arguments);
      };
    }();
  };
}

function objValues(obj, fn) {
  var values = [];

  for (var key in obj) {
    values.push(obj[key]);
  }

  return values;
}

/***/ }),

/***/ 1615:
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;

/***/ }),

/***/ 1626:
/***/ (function(module, exports) {

module.exports = function createScaffoldMiddleware(handlers) {
  return function (req, res, next, end) {
    var handler = handlers[req.method]; // if no handler, return

    if (handler === undefined) {
      return next();
    } // if handler is fn, call as middleware


    if (typeof handler === 'function') {
      return handler(req, res, next, end);
    } // if handler is some other value, use as result


    res.result = handler;
    return end();
  };
};

/***/ }),

/***/ 1627:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIdRemapMiddleware = void 0;

var getUniqueId_1 = __webpack_require__(1532);

function createIdRemapMiddleware() {
  return function (req, res, next, _end) {
    var originalId = req.id;
    var newId = getUniqueId_1.getUniqueId();
    req.id = newId;
    res.id = newId;
    next(function (done) {
      req.id = originalId;
      res.id = originalId;
      done();
    });
  };
}

exports.createIdRemapMiddleware = createIdRemapMiddleware;

/***/ }),

/***/ 1628:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAsyncMiddleware = void 0;
/**
 * JsonRpcEngine only accepts callback-based middleware directly.
 * createAsyncMiddleware exists to enable consumers to pass in async middleware
 * functions.
 *
 * Async middleware have no "end" function. Instead, they "end" if they return
 * without calling "next". Rather than passing in explicit return handlers,
 * async middleware can simply await "next", and perform operations on the
 * response object when execution resumes.
 *
 * To accomplish this, createAsyncMiddleware passes the async middleware a
 * wrapped "next" function. That function calls the internal JsonRpcEngine
 * "next" function with a return handler that resolves a promise when called.
 *
 * The return handler will always be called. Its resolution of the promise
 * enables the control flow described above.
 */

function createAsyncMiddleware(asyncMiddleware) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res, next, end) {
      var resolveNextPromise, nextPromise, returnHandlerCallback, nextWasCalled, asyncNext;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // nextPromise is the key to the implementation
              // it is resolved by the return handler passed to the
              // "next" function
              nextPromise = new Promise(function (resolve) {
                resolveNextPromise = resolve;
              });
              returnHandlerCallback = null;
              nextWasCalled = false; // This will be called by the consumer's async middleware.

              asyncNext = /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          nextWasCalled = true; // We pass a return handler to next(). When it is called by the engine,
                          // the consumer's async middleware will resume executing.
                          // eslint-disable-next-line node/callback-return

                          next(function (runReturnHandlersCallback) {
                            // This callback comes from JsonRpcEngine._runReturnHandlers
                            returnHandlerCallback = runReturnHandlersCallback;
                            resolveNextPromise();
                          });
                          _context.next = 4;
                          return nextPromise;

                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function asyncNext() {
                  return _ref2.apply(this, arguments);
                };
              }();

              _context2.prev = 4;
              _context2.next = 7;
              return asyncMiddleware(req, res, asyncNext);

            case 7:
              if (!nextWasCalled) {
                _context2.next = 13;
                break;
              }

              _context2.next = 10;
              return nextPromise;

            case 10:
              // we must wait until the return handler is called
              returnHandlerCallback(null);
              _context2.next = 14;
              break;

            case 13:
              end(null);

            case 14:
              _context2.next = 19;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](4);

              if (returnHandlerCallback) {
                returnHandlerCallback(_context2.t0);
              } else {
                end(_context2.t0);
              }

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 16]]);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
}

exports.createAsyncMiddleware = createAsyncMiddleware;

/***/ }),

/***/ 1629:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScaffoldMiddleware = void 0;

function createScaffoldMiddleware(handlers) {
  return function (req, res, next, end) {
    var handler = handlers[req.method]; // if no handler, return

    if (handler === undefined) {
      return next();
    } // if handler is fn, call as middleware


    if (typeof handler === 'function') {
      return handler(req, res, next, end);
    } // if handler is some other value, use as result


    res.result = handler;
    return end();
  };
}

exports.createScaffoldMiddleware = createScaffoldMiddleware;

/***/ }),

/***/ 1630:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageFromCode = exports.serializeError = exports.EthereumProviderError = exports.EthereumRpcError = exports.ethErrors = exports.errorCodes = void 0;

var classes_1 = __webpack_require__(1480);

Object.defineProperty(exports, "EthereumRpcError", {
  enumerable: true,
  get: function get() {
    return classes_1.EthereumRpcError;
  }
});
Object.defineProperty(exports, "EthereumProviderError", {
  enumerable: true,
  get: function get() {
    return classes_1.EthereumProviderError;
  }
});

var utils_1 = __webpack_require__(1534);

Object.defineProperty(exports, "serializeError", {
  enumerable: true,
  get: function get() {
    return utils_1.serializeError;
  }
});
Object.defineProperty(exports, "getMessageFromCode", {
  enumerable: true,
  get: function get() {
    return utils_1.getMessageFromCode;
  }
});

var errors_1 = __webpack_require__(1631);

Object.defineProperty(exports, "ethErrors", {
  enumerable: true,
  get: function get() {
    return errors_1.ethErrors;
  }
});

var error_constants_1 = __webpack_require__(1481);

Object.defineProperty(exports, "errorCodes", {
  enumerable: true,
  get: function get() {
    return error_constants_1.errorCodes;
  }
});

/***/ }),

/***/ 1631:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__(138);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ethErrors = void 0;

var classes_1 = __webpack_require__(1480);

var utils_1 = __webpack_require__(1534);

var error_constants_1 = __webpack_require__(1481);

exports.ethErrors = {
  rpc: {
    /**
     * Get a JSON RPC 2.0 Parse (-32700) error.
     */
    parse: function parse(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.parse, arg);
    },

    /**
     * Get a JSON RPC 2.0 Invalid Request (-32600) error.
     */
    invalidRequest: function invalidRequest(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidRequest, arg);
    },

    /**
     * Get a JSON RPC 2.0 Invalid Params (-32602) error.
     */
    invalidParams: function invalidParams(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidParams, arg);
    },

    /**
     * Get a JSON RPC 2.0 Method Not Found (-32601) error.
     */
    methodNotFound: function methodNotFound(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotFound, arg);
    },

    /**
     * Get a JSON RPC 2.0 Internal (-32603) error.
     */
    internal: function internal(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.internal, arg);
    },

    /**
     * Get a JSON RPC 2.0 Server error.
     * Permits integer error codes in the [ -32099 <= -32005 ] range.
     * Codes -32000 through -32004 are reserved by EIP-1474.
     */
    server: function server(opts) {
      if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
        throw new Error('Ethereum RPC Server errors must provide single object argument.');
      }

      var code = opts.code;

      if (!Number.isInteger(code) || code > -32005 || code < -32099) {
        throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
      }

      return getEthJsonRpcError(code, opts);
    },

    /**
     * Get an Ethereum JSON RPC Invalid Input (-32000) error.
     */
    invalidInput: function invalidInput(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidInput, arg);
    },

    /**
     * Get an Ethereum JSON RPC Resource Not Found (-32001) error.
     */
    resourceNotFound: function resourceNotFound(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceNotFound, arg);
    },

    /**
     * Get an Ethereum JSON RPC Resource Unavailable (-32002) error.
     */
    resourceUnavailable: function resourceUnavailable(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceUnavailable, arg);
    },

    /**
     * Get an Ethereum JSON RPC Transaction Rejected (-32003) error.
     */
    transactionRejected: function transactionRejected(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.transactionRejected, arg);
    },

    /**
     * Get an Ethereum JSON RPC Method Not Supported (-32004) error.
     */
    methodNotSupported: function methodNotSupported(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotSupported, arg);
    },

    /**
     * Get an Ethereum JSON RPC Limit Exceeded (-32005) error.
     */
    limitExceeded: function limitExceeded(arg) {
      return getEthJsonRpcError(error_constants_1.errorCodes.rpc.limitExceeded, arg);
    }
  },
  provider: {
    /**
     * Get an Ethereum Provider User Rejected Request (4001) error.
     */
    userRejectedRequest: function userRejectedRequest(arg) {
      return getEthProviderError(error_constants_1.errorCodes.provider.userRejectedRequest, arg);
    },

    /**
     * Get an Ethereum Provider Unauthorized (4100) error.
     */
    unauthorized: function unauthorized(arg) {
      return getEthProviderError(error_constants_1.errorCodes.provider.unauthorized, arg);
    },

    /**
     * Get an Ethereum Provider Unsupported Method (4200) error.
     */
    unsupportedMethod: function unsupportedMethod(arg) {
      return getEthProviderError(error_constants_1.errorCodes.provider.unsupportedMethod, arg);
    },

    /**
     * Get an Ethereum Provider Not Connected (4900) error.
     */
    disconnected: function disconnected(arg) {
      return getEthProviderError(error_constants_1.errorCodes.provider.disconnected, arg);
    },

    /**
     * Get an Ethereum Provider Chain Not Connected (4901) error.
     */
    chainDisconnected: function chainDisconnected(arg) {
      return getEthProviderError(error_constants_1.errorCodes.provider.chainDisconnected, arg);
    },

    /**
     * Get a custom Ethereum Provider error.
     */
    custom: function custom(opts) {
      if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
        throw new Error('Ethereum Provider custom errors must provide single object argument.');
      }

      var code = opts.code,
          message = opts.message,
          data = opts.data;

      if (!message || typeof message !== 'string') {
        throw new Error('"message" must be a nonempty string');
      }

      return new classes_1.EthereumProviderError(code, message, data);
    }
  }
}; // Internal

function getEthJsonRpcError(code, arg) {
  var _parseOpts = parseOpts(arg),
      _parseOpts2 = _slicedToArray(_parseOpts, 2),
      message = _parseOpts2[0],
      data = _parseOpts2[1];

  return new classes_1.EthereumRpcError(code, message || utils_1.getMessageFromCode(code), data);
}

function getEthProviderError(code, arg) {
  var _parseOpts3 = parseOpts(arg),
      _parseOpts4 = _slicedToArray(_parseOpts3, 2),
      message = _parseOpts4[0],
      data = _parseOpts4[1];

  return new classes_1.EthereumProviderError(code, message || utils_1.getMessageFromCode(code), data);
}

function parseOpts(arg) {
  if (arg) {
    if (typeof arg === 'string') {
      return [arg];
    } else if (typeof arg === 'object' && !Array.isArray(arg)) {
      var message = arg.message,
          data = arg.data;

      if (message && typeof message !== 'string') {
        throw new Error('Must specify string message.');
      }

      return [message || undefined, data];
    }
  }

  return [];
}

/***/ }),

/***/ 1632:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeMiddleware = void 0;

var JsonRpcEngine_1 = __webpack_require__(1533);

function mergeMiddleware(middlewareStack) {
  var engine = new JsonRpcEngine_1.JsonRpcEngine();
  middlewareStack.forEach(function (middleware) {
    return engine.push(middleware);
  });
  return engine.asMiddleware();
}

exports.mergeMiddleware = mergeMiddleware;

/***/ }),

/***/ 1633:
/***/ (function(module, exports, __webpack_require__) {

var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var _inherits = __webpack_require__(149);

var _createSuper = __webpack_require__(150);

var EthQuery = __webpack_require__(459);

var pify = __webpack_require__(1634);

var BaseFilterWithHistory = __webpack_require__(1635);

var _require = __webpack_require__(1424),
    bnToHex = _require.bnToHex,
    hexToInt = _require.hexToInt,
    incrementHexInt = _require.incrementHexInt,
    minBlockRef = _require.minBlockRef,
    blockRefIsNumber = _require.blockRefIsNumber;

var LogFilter = /*#__PURE__*/function (_BaseFilterWithHistor) {
  "use strict";

  _inherits(LogFilter, _BaseFilterWithHistor);

  var _super = _createSuper(LogFilter);

  function LogFilter(_ref) {
    var _this;

    var provider = _ref.provider,
        params = _ref.params;

    _classCallCheck(this, LogFilter);

    _this = _super.call(this);
    _this.type = 'log';
    _this.ethQuery = new EthQuery(provider);
    _this.params = Object.assign({
      fromBlock: 'latest',
      toBlock: 'latest',
      address: undefined,
      topics: []
    }, params); // normalize address parameter

    if (_this.params.address) {
      // ensure array
      if (!Array.isArray(_this.params.address)) {
        _this.params.address = [_this.params.address];
      } // ensure lowercase


      _this.params.address = _this.params.address.map(function (address) {
        return address.toLowerCase();
      });
    }

    return _this;
  }

  _createClass(LogFilter, [{
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref2) {
        var currentBlock, fromBlock, toBlock, params, newLogs;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currentBlock = _ref2.currentBlock;
                // resolve params.fromBlock
                fromBlock = this.params.fromBlock;
                if (['latest', 'pending'].includes(fromBlock)) fromBlock = currentBlock;
                if ('earliest' === fromBlock) fromBlock = '0x0';
                this.params.fromBlock = fromBlock; // set toBlock for initial lookup

                toBlock = minBlockRef(this.params.toBlock, currentBlock);
                params = Object.assign({}, this.params, {
                  toBlock: toBlock
                }); // fetch logs and add to results

                _context.next = 9;
                return this._fetchLogs(params);

              case 9:
                newLogs = _context.sent;
                this.addInitialResults(newLogs);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initialize(_x) {
        return _initialize.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref3) {
        var _this2 = this;

        var oldBlock, newBlock, toBlock, fromBlock, params, newLogs, matchingLogs;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                oldBlock = _ref3.oldBlock, newBlock = _ref3.newBlock;
                // configure params for this update
                toBlock = newBlock;

                // oldBlock is empty on first sync
                if (oldBlock) {
                  fromBlock = incrementHexInt(oldBlock);
                } else {
                  fromBlock = newBlock;
                } // fetch logs


                params = Object.assign({}, this.params, {
                  fromBlock: fromBlock,
                  toBlock: toBlock
                });
                _context2.next = 6;
                return this._fetchLogs(params);

              case 6:
                newLogs = _context2.sent;
                matchingLogs = newLogs.filter(function (log) {
                  return _this2.matchLog(log);
                }); // add to results

                this.addResults(matchingLogs);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "_fetchLogs",
    value: function () {
      var _fetchLogs2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(params) {
        var _this3 = this;

        var newLogs;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return pify(function (cb) {
                  return _this3.ethQuery.getLogs(params, cb);
                })();

              case 2:
                newLogs = _context3.sent;
                return _context3.abrupt("return", newLogs);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function _fetchLogs(_x3) {
        return _fetchLogs2.apply(this, arguments);
      }

      return _fetchLogs;
    }()
  }, {
    key: "matchLog",
    value: function matchLog(log) {
      // check if block number in bounds:
      if (hexToInt(this.params.fromBlock) >= hexToInt(log.blockNumber)) return false;
      if (blockRefIsNumber(this.params.toBlock) && hexToInt(this.params.toBlock) <= hexToInt(log.blockNumber)) return false; // address is correct:

      var normalizedLogAddress = log.address && log.address.toLowerCase();
      if (this.params.address && normalizedLogAddress && !this.params.address.includes(normalizedLogAddress)) return false; // topics match:
      // topics are position-dependant
      // topics can be nested to represent `or` [[a || b], c]
      // topics can be null, representing a wild card for that position

      var topicsMatch = this.params.topics.every(function (topicPattern, index) {
        // pattern is longer than actual topics
        var logTopic = log.topics[index];
        if (!logTopic) return false;
        logTopic = logTopic.toLowerCase(); // normalize subTopics

        var subtopicsToMatch = Array.isArray(topicPattern) ? topicPattern : [topicPattern]; // check for wild card

        var subtopicsIncludeWildcard = subtopicsToMatch.includes(null);
        if (subtopicsIncludeWildcard) return true;
        subtopicsToMatch = subtopicsToMatch.map(function (topic) {
          return topic.toLowerCase();
        }); // check each possible matching topic

        var topicDoesMatch = subtopicsToMatch.includes(logTopic);
        return topicDoesMatch;
      });
      return topicsMatch;
    }
  }]);

  return LogFilter;
}(BaseFilterWithHistory);

module.exports = LogFilter;

/***/ }),

/***/ 1634:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _objectSpread = __webpack_require__(267);

var processFn = function processFn(fn, options, proxy, unwrapped) {
  return function () {
    var _this = this;

    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }

    var P = options.promiseModule;
    return new P(function (resolve, reject) {
      if (options.multiArgs) {
        arguments_.push(function () {
          for (var _len2 = arguments.length, result = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            result[_key2] = arguments[_key2];
          }

          if (options.errorFirst) {
            if (result[0]) {
              reject(result);
            } else {
              result.shift();
              resolve(result);
            }
          } else {
            resolve(result);
          }
        });
      } else if (options.errorFirst) {
        arguments_.push(function (error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      } else {
        arguments_.push(resolve);
      }

      var self = _this === proxy ? unwrapped : _this;
      Reflect.apply(fn, self, arguments_);
    });
  };
};

var filterCache = new WeakMap();

module.exports = function (input, options) {
  options = _objectSpread({
    exclude: [/.+(?:Sync|Stream)$/],
    errorFirst: true,
    promiseModule: Promise
  }, options);
  var objectType = typeof input;

  if (!(input !== null && (objectType === 'object' || objectType === 'function'))) {
    throw new TypeError("Expected `input` to be a `Function` or `Object`, got `".concat(input === null ? 'null' : objectType, "`"));
  }

  var filter = function filter(target, key) {
    var cached = filterCache.get(target);

    if (!cached) {
      cached = {};
      filterCache.set(target, cached);
    }

    if (key in cached) {
      return cached[key];
    }

    var match = function match(pattern) {
      return typeof pattern === 'string' || typeof key === 'symbol' ? key === pattern : pattern.test(key);
    };

    var desc = Reflect.getOwnPropertyDescriptor(target, key);
    var writableOrConfigurableOwn = desc === undefined || desc.writable || desc.configurable;
    var included = options.include ? options.include.some(match) : !options.exclude.some(match);
    var shouldFilter = included && writableOrConfigurableOwn;
    cached[key] = shouldFilter;
    return shouldFilter;
  };

  var cache = new WeakMap();
  var proxy = new Proxy(input, {
    apply: function apply(target, thisArg, args) {
      var cached = cache.get(target);

      if (cached) {
        return Reflect.apply(cached, thisArg, args);
      }

      var pified = options.excludeMain ? target : processFn(target, options, proxy, target);
      cache.set(target, pified);
      return Reflect.apply(pified, thisArg, args);
    },
    get: function get(target, key) {
      var property = target[key]; // eslint-disable-next-line no-use-extend-native/no-use-extend-native

      if (!filter(target, key) || property === Function.prototype[key]) {
        return property;
      }

      var cached = cache.get(property);

      if (cached) {
        return cached;
      }

      if (typeof property === 'function') {
        var pified = processFn(property, options, proxy, target);
        cache.set(property, pified);
        return pified;
      }

      return property;
    }
  });
  return proxy;
};

/***/ }),

/***/ 1635:
/***/ (function(module, exports, __webpack_require__) {

var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var _get = __webpack_require__(667);

var _getPrototypeOf = __webpack_require__(341);

var _inherits = __webpack_require__(149);

var _createSuper = __webpack_require__(150);

var BaseFilter = __webpack_require__(1482); // tracks all results ever recorded


var BaseFilterWithHistory = /*#__PURE__*/function (_BaseFilter) {
  "use strict";

  _inherits(BaseFilterWithHistory, _BaseFilter);

  var _super = _createSuper(BaseFilterWithHistory);

  function BaseFilterWithHistory() {
    var _this;

    _classCallCheck(this, BaseFilterWithHistory);

    _this = _super.call(this);
    _this.allResults = [];
    return _this;
  }

  _createClass(BaseFilterWithHistory, [{
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('BaseFilterWithHistory - no update method specified');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "addResults",
    value: function addResults(newResults) {
      this.allResults = this.allResults.concat(newResults);

      _get(_getPrototypeOf(BaseFilterWithHistory.prototype), "addResults", this).call(this, newResults);
    }
  }, {
    key: "addInitialResults",
    value: function addInitialResults(newResults) {
      this.allResults = this.allResults.concat(newResults);

      _get(_getPrototypeOf(BaseFilterWithHistory.prototype), "addInitialResults", this).call(this, newResults);
    }
  }, {
    key: "getAllResults",
    value: function getAllResults() {
      return this.allResults;
    }
  }]);

  return BaseFilterWithHistory;
}(BaseFilter);

module.exports = BaseFilterWithHistory;

/***/ }),

/***/ 1636:
/***/ (function(module, exports, __webpack_require__) {

var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var _inherits = __webpack_require__(149);

var _createSuper = __webpack_require__(150);

var BaseFilter = __webpack_require__(1482);

var getBlocksForRange = __webpack_require__(1483);

var _require = __webpack_require__(1424),
    incrementHexInt = _require.incrementHexInt;

var BlockFilter = /*#__PURE__*/function (_BaseFilter) {
  "use strict";

  _inherits(BlockFilter, _BaseFilter);

  var _super = _createSuper(BlockFilter);

  function BlockFilter(_ref) {
    var _this;

    var provider = _ref.provider,
        params = _ref.params;

    _classCallCheck(this, BlockFilter);

    _this = _super.call(this);
    _this.type = 'block';
    _this.provider = provider;
    return _this;
  }

  _createClass(BlockFilter, [{
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref2) {
        var oldBlock, newBlock, toBlock, fromBlock, blockBodies, blockHashes;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                oldBlock = _ref2.oldBlock, newBlock = _ref2.newBlock;
                toBlock = newBlock;
                fromBlock = incrementHexInt(oldBlock);
                _context.next = 5;
                return getBlocksForRange({
                  provider: this.provider,
                  fromBlock: fromBlock,
                  toBlock: toBlock
                });

              case 5:
                blockBodies = _context.sent;
                blockHashes = blockBodies.map(function (block) {
                  return block.hash;
                });
                this.addResults(blockHashes);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function update(_x) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return BlockFilter;
}(BaseFilter);

module.exports = BlockFilter;

/***/ }),

/***/ 1637:
/***/ (function(module, exports, __webpack_require__) {

var _regeneratorRuntime = __webpack_require__(12);

var _toConsumableArray = __webpack_require__(434);

var _createForOfIteratorHelper = __webpack_require__(112);

var _asyncToGenerator = __webpack_require__(103);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var _inherits = __webpack_require__(149);

var _createSuper = __webpack_require__(150);

var BaseFilter = __webpack_require__(1482);

var getBlocksForRange = __webpack_require__(1483);

var _require = __webpack_require__(1424),
    incrementHexInt = _require.incrementHexInt;

var TxFilter = /*#__PURE__*/function (_BaseFilter) {
  "use strict";

  _inherits(TxFilter, _BaseFilter);

  var _super = _createSuper(TxFilter);

  function TxFilter(_ref) {
    var _this;

    var provider = _ref.provider;

    _classCallCheck(this, TxFilter);

    _this = _super.call(this);
    _this.type = 'tx';
    _this.provider = provider;
    return _this;
  }

  _createClass(TxFilter, [{
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref2) {
        var oldBlock, toBlock, fromBlock, blocks, blockTxHashes, _iterator, _step, block;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                oldBlock = _ref2.oldBlock;
                toBlock = oldBlock;
                fromBlock = incrementHexInt(oldBlock);
                _context.next = 5;
                return getBlocksForRange({
                  provider: this.provider,
                  fromBlock: fromBlock,
                  toBlock: toBlock
                });

              case 5:
                blocks = _context.sent;
                blockTxHashes = [];
                _iterator = _createForOfIteratorHelper(blocks);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    block = _step.value;
                    blockTxHashes.push.apply(blockTxHashes, _toConsumableArray(block.transactions));
                  } // add to results

                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                this.addResults(blockTxHashes);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function update(_x) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return TxFilter;
}(BaseFilter);

module.exports = TxFilter;

/***/ }),

/***/ 1961:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Mutex", function() { return /* reexport */ es6_Mutex; });
__webpack_require__.d(__webpack_exports__, "Semaphore", function() { return /* reexport */ es6_Semaphore; });
__webpack_require__.d(__webpack_exports__, "withTimeout", function() { return /* reexport */ withTimeout; });

// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};


function __rest(s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};
function __exportStar(m, o) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
/** @deprecated */

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
}
/** @deprecated */

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}
;

var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
// CONCATENATED MODULE: ./node_modules/async-mutex/es6/Semaphore.js


var Semaphore_Semaphore =
/** @class */
function () {
  function Semaphore(_maxConcurrency) {
    this._maxConcurrency = _maxConcurrency;
    this._queue = [];

    if (_maxConcurrency <= 0) {
      throw new Error('semaphore must be initialized to a positive value');
    }

    this._value = _maxConcurrency;
  }

  Semaphore.prototype.acquire = function () {
    var _this = this;

    var locked = this.isLocked();
    var ticket = new Promise(function (r) {
      return _this._queue.push(r);
    });
    if (!locked) this._dispatch();
    return ticket;
  };

  Semaphore.prototype.runExclusive = function (callback) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, value, release;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , this.acquire()];

          case 1:
            _a = _b.sent(), value = _a[0], release = _a[1];
            _b.label = 2;

          case 2:
            _b.trys.push([2,, 4, 5]);

            return [4
            /*yield*/
            , callback(value)];

          case 3:
            return [2
            /*return*/
            , _b.sent()];

          case 4:
            release();
            return [7
            /*endfinally*/
            ];

          case 5:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Semaphore.prototype.isLocked = function () {
    return this._value <= 0;
  };

  Semaphore.prototype.release = function () {
    if (this._maxConcurrency > 1) {
      throw new Error('this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead');
    }

    if (this._currentReleaser) {
      var releaser = this._currentReleaser;
      this._currentReleaser = undefined;
      releaser();
    }
  };

  Semaphore.prototype._dispatch = function () {
    var _this = this;

    var nextConsumer = this._queue.shift();

    if (!nextConsumer) return;
    var released = false;

    this._currentReleaser = function () {
      if (released) return;
      released = true;
      _this._value++;

      _this._dispatch();
    };

    nextConsumer([this._value--, this._currentReleaser]);
  };

  return Semaphore;
}();

/* harmony default export */ var es6_Semaphore = (Semaphore_Semaphore);
// CONCATENATED MODULE: ./node_modules/async-mutex/es6/Mutex.js



var Mutex_Mutex =
/** @class */
function () {
  function Mutex() {
    this._semaphore = new es6_Semaphore(1);
  }

  Mutex.prototype.acquire = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a, releaser;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , this._semaphore.acquire()];

          case 1:
            _a = _b.sent(), releaser = _a[1];
            return [2
            /*return*/
            , releaser];
        }
      });
    });
  };

  Mutex.prototype.runExclusive = function (callback) {
    return this._semaphore.runExclusive(function () {
      return callback();
    });
  };

  Mutex.prototype.isLocked = function () {
    return this._semaphore.isLocked();
  };

  Mutex.prototype.release = function () {
    this._semaphore.release();
  };

  return Mutex;
}();

/* harmony default export */ var es6_Mutex = (Mutex_Mutex);
// CONCATENATED MODULE: ./node_modules/async-mutex/es6/withTimeout.js
 // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

function withTimeout(sync, timeout, timeoutError) {
  var _this = this;

  if (timeoutError === void 0) {
    timeoutError = new Error('timeout');
  }

  return {
    acquire: function acquire() {
      return new Promise(function (resolve, reject) {
        return __awaiter(_this, void 0, void 0, function () {
          var isTimeout, ticket, release;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                isTimeout = false;
                setTimeout(function () {
                  isTimeout = true;
                  reject(timeoutError);
                }, timeout);
                return [4
                /*yield*/
                , sync.acquire()];

              case 1:
                ticket = _a.sent();

                if (isTimeout) {
                  release = Array.isArray(ticket) ? ticket[1] : ticket;
                  release();
                } else {
                  resolve(ticket);
                }

                return [2
                /*return*/
                ];
            }
          });
        });
      });
    },
    runExclusive: function runExclusive(callback) {
      return __awaiter(this, void 0, void 0, function () {
        var release, ticket;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              release = function release() {
                return undefined;
              };

              _a.label = 1;

            case 1:
              _a.trys.push([1,, 7, 8]);

              return [4
              /*yield*/
              , this.acquire()];

            case 2:
              ticket = _a.sent();
              if (!Array.isArray(ticket)) return [3
              /*break*/
              , 4];
              release = ticket[1];
              return [4
              /*yield*/
              , callback(ticket[0])];

            case 3:
              return [2
              /*return*/
              , _a.sent()];

            case 4:
              release = ticket;
              return [4
              /*yield*/
              , callback()];

            case 5:
              return [2
              /*return*/
              , _a.sent()];

            case 6:
              return [3
              /*break*/
              , 8];

            case 7:
              release();
              return [7
              /*endfinally*/
              ];

            case 8:
              return [2
              /*return*/
              ];
          }
        });
      });
    },
    release: function release() {
      sync.release();
    },
    isLocked: function isLocked() {
      return sync.isLocked();
    }
  };
}
// CONCATENATED MODULE: ./node_modules/async-mutex/es6/index.js




/***/ })

}]);