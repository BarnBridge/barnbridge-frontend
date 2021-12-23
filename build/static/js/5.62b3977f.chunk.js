(this["webpackJsonpbarnbridge-frontend"] = this["webpackJsonpbarnbridge-frontend"] || []).push([[5],{

/***/ 1371:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLink = exports.WalletLinkProvider = void 0;

var WalletLinkProvider_1 = __webpack_require__(1458);

var WalletLink_1 = __webpack_require__(1536);

var WalletLinkProvider_2 = __webpack_require__(1458);

Object.defineProperty(exports, "WalletLinkProvider", {
  enumerable: true,
  get: function get() {
    return WalletLinkProvider_2.WalletLinkProvider;
  }
});

var WalletLink_2 = __webpack_require__(1536);

Object.defineProperty(exports, "WalletLink", {
  enumerable: true,
  get: function get() {
    return WalletLink_2.WalletLink;
  }
});
exports.default = WalletLink_1.WalletLink;

if (typeof window !== "undefined") {
  window.WalletLink = WalletLink_1.WalletLink;
  window.WalletLinkProvider = WalletLinkProvider_1.WalletLinkProvider;
}

/***/ }),

/***/ 1380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __extends; });
/* unused harmony export __assign */
/* unused harmony export __rest */
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __createBinding */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __spreadArrays */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/* unused harmony export __classPrivateFieldGet */
/* unused harmony export __classPrivateFieldSet */
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
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
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
function __createBinding(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}
function __exportStar(m, exports) {
  for (var p in m) {
    if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
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
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
}
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
;
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
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}

/***/ }),

/***/ 1381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscriber; });
/* unused harmony export SafeSubscriber */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1416);
/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1521);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1384);
/* harmony import */ var _internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1465);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1415);
/* harmony import */ var _util_hostReportError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1464);
/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */








var Subscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](Subscriber, _super);

  function Subscriber(destinationOrNext, error, complete) {
    var _this = _super.call(this) || this;

    _this.syncErrorValue = null;
    _this.syncErrorThrown = false;
    _this.syncErrorThrowable = false;
    _this.isStopped = false;

    switch (arguments.length) {
      case 0:
        _this.destination = _Observer__WEBPACK_IMPORTED_MODULE_2__[/* empty */ "a"];
        break;

      case 1:
        if (!destinationOrNext) {
          _this.destination = _Observer__WEBPACK_IMPORTED_MODULE_2__[/* empty */ "a"];
          break;
        }

        if (typeof destinationOrNext === 'object') {
          if (destinationOrNext instanceof Subscriber) {
            _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
            _this.destination = destinationOrNext;
            destinationOrNext.add(_this);
          } else {
            _this.syncErrorThrowable = true;
            _this.destination = new SafeSubscriber(_this, destinationOrNext);
          }

          break;
        }

      default:
        _this.syncErrorThrowable = true;
        _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
        break;
    }

    return _this;
  }

  Subscriber.prototype[_internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_4__[/* rxSubscriber */ "a"]] = function () {
    return this;
  };

  Subscriber.create = function (next, error, complete) {
    var subscriber = new Subscriber(next, error, complete);
    subscriber.syncErrorThrowable = false;
    return subscriber;
  };

  Subscriber.prototype.next = function (value) {
    if (!this.isStopped) {
      this._next(value);
    }
  };

  Subscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      this.isStopped = true;

      this._error(err);
    }
  };

  Subscriber.prototype.complete = function () {
    if (!this.isStopped) {
      this.isStopped = true;

      this._complete();
    }
  };

  Subscriber.prototype.unsubscribe = function () {
    if (this.closed) {
      return;
    }

    this.isStopped = true;

    _super.prototype.unsubscribe.call(this);
  };

  Subscriber.prototype._next = function (value) {
    this.destination.next(value);
  };

  Subscriber.prototype._error = function (err) {
    this.destination.error(err);
    this.unsubscribe();
  };

  Subscriber.prototype._complete = function () {
    this.destination.complete();
    this.unsubscribe();
  };

  Subscriber.prototype._unsubscribeAndRecycle = function () {
    var _parentOrParents = this._parentOrParents;
    this._parentOrParents = null;
    this.unsubscribe();
    this.closed = false;
    this.isStopped = false;
    this._parentOrParents = _parentOrParents;
    return this;
  };

  return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_3__[/* Subscription */ "a"]);



var SafeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](SafeSubscriber, _super);

  function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
    var _this = _super.call(this) || this;

    _this._parentSubscriber = _parentSubscriber;
    var next;
    var context = _this;

    if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_1__[/* isFunction */ "a"])(observerOrNext)) {
      next = observerOrNext;
    } else if (observerOrNext) {
      next = observerOrNext.next;
      error = observerOrNext.error;
      complete = observerOrNext.complete;

      if (observerOrNext !== _Observer__WEBPACK_IMPORTED_MODULE_2__[/* empty */ "a"]) {
        context = Object.create(observerOrNext);

        if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_1__[/* isFunction */ "a"])(context.unsubscribe)) {
          _this.add(context.unsubscribe.bind(context));
        }

        context.unsubscribe = _this.unsubscribe.bind(_this);
      }
    }

    _this._context = context;
    _this._next = next;
    _this._error = error;
    _this._complete = complete;
    return _this;
  }

  SafeSubscriber.prototype.next = function (value) {
    if (!this.isStopped && this._next) {
      var _parentSubscriber = this._parentSubscriber;

      if (!_config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
        this.__tryOrUnsub(this._next, value);
      } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;
      var useDeprecatedSynchronousErrorHandling = _config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling;

      if (this._error) {
        if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(this._error, err);

          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, this._error, err);

          this.unsubscribe();
        }
      } else if (!_parentSubscriber.syncErrorThrowable) {
        this.unsubscribe();

        if (useDeprecatedSynchronousErrorHandling) {
          throw err;
        }

        Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__[/* hostReportError */ "a"])(err);
      } else {
        if (useDeprecatedSynchronousErrorHandling) {
          _parentSubscriber.syncErrorValue = err;
          _parentSubscriber.syncErrorThrown = true;
        } else {
          Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__[/* hostReportError */ "a"])(err);
        }

        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.complete = function () {
    var _this = this;

    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;

      if (this._complete) {
        var wrappedComplete = function wrappedComplete() {
          return _this._complete.call(_this._context);
        };

        if (!_config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(wrappedComplete);

          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, wrappedComplete);

          this.unsubscribe();
        }
      } else {
        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
    try {
      fn.call(this._context, value);
    } catch (err) {
      this.unsubscribe();

      if (_config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling) {
        throw err;
      } else {
        Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__[/* hostReportError */ "a"])(err);
      }
    }
  };

  SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
    if (!_config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling) {
      throw new Error('bad call');
    }

    try {
      fn.call(this._context, value);
    } catch (err) {
      if (_config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling) {
        parent.syncErrorValue = err;
        parent.syncErrorThrown = true;
        return true;
      } else {
        Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__[/* hostReportError */ "a"])(err);
        return true;
      }
    }

    return false;
  };

  SafeSubscriber.prototype._unsubscribe = function () {
    var _parentSubscriber = this._parentSubscriber;
    this._context = null;
    this._parentSubscriber = null;

    _parentSubscriber.unsubscribe();
  };

  return SafeSubscriber;
}(Subscriber);



/***/ }),

/***/ 1382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ Observable_Observable; });

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/canReportError.js
var canReportError = __webpack_require__(1468);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscriber.js
var Subscriber = __webpack_require__(1381);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js
var rxSubscriber = __webpack_require__(1465);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observer.js
var Observer = __webpack_require__(1521);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/toSubscriber.js
/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */



function toSubscriber(nextOrObserver, error, complete) {
  if (nextOrObserver) {
    if (nextOrObserver instanceof Subscriber["a" /* Subscriber */]) {
      return nextOrObserver;
    }

    if (nextOrObserver[rxSubscriber["a" /* rxSubscriber */]]) {
      return nextOrObserver[rxSubscriber["a" /* rxSubscriber */]]();
    }
  }

  if (!nextOrObserver && !error && !complete) {
    return new Subscriber["a" /* Subscriber */](Observer["a" /* empty */]);
  }

  return new Subscriber["a" /* Subscriber */](nextOrObserver, error, complete);
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/observable.js
var observable = __webpack_require__(1396);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/pipe.js
var pipe = __webpack_require__(1437);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/config.js
var config = __webpack_require__(1415);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js
/** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */






var Observable_Observable = /*@__PURE__*/function () {
  function Observable(subscribe) {
    this._isScalar = false;

    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  Observable.prototype.lift = function (operator) {
    var observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  };

  Observable.prototype.subscribe = function (observerOrNext, error, complete) {
    var operator = this.operator;
    var sink = toSubscriber(observerOrNext, error, complete);

    if (operator) {
      sink.add(operator.call(sink, this.source));
    } else {
      sink.add(this.source || config["a" /* config */].useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
    }

    if (config["a" /* config */].useDeprecatedSynchronousErrorHandling) {
      if (sink.syncErrorThrowable) {
        sink.syncErrorThrowable = false;

        if (sink.syncErrorThrown) {
          throw sink.syncErrorValue;
        }
      }
    }

    return sink;
  };

  Observable.prototype._trySubscribe = function (sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      if (config["a" /* config */].useDeprecatedSynchronousErrorHandling) {
        sink.syncErrorThrown = true;
        sink.syncErrorValue = err;
      }

      if (Object(canReportError["a" /* canReportError */])(sink)) {
        sink.error(err);
      } else {
        console.warn(err);
      }
    }
  };

  Observable.prototype.forEach = function (next, promiseCtor) {
    var _this = this;

    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function (resolve, reject) {
      var subscription;
      subscription = _this.subscribe(function (value) {
        try {
          next(value);
        } catch (err) {
          reject(err);

          if (subscription) {
            subscription.unsubscribe();
          }
        }
      }, reject, resolve);
    });
  };

  Observable.prototype._subscribe = function (subscriber) {
    var source = this.source;
    return source && source.subscribe(subscriber);
  };

  Observable.prototype[observable["a" /* observable */]] = function () {
    return this;
  };

  Observable.prototype.pipe = function () {
    var operations = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }

    if (operations.length === 0) {
      return this;
    }

    return Object(pipe["b" /* pipeFromArray */])(operations)(this);
  };

  Observable.prototype.toPromise = function (promiseCtor) {
    var _this = this;

    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function (resolve, reject) {
      var value;

      _this.subscribe(function (x) {
        return value = x;
      }, function (err) {
        return reject(err);
      }, function () {
        return resolve(value);
      });
    });
  };

  Observable.create = function (subscribe) {
    return new Observable(subscribe);
  };

  return Observable;
}();



function getPromiseCtor(promiseCtor) {
  if (!promiseCtor) {
    promiseCtor = config["a" /* config */].Promise || Promise;
  }

  if (!promiseCtor) {
    throw new Error('no Promise impl found');
  }

  return promiseCtor;
}

/***/ }),

/***/ 1383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SimpleInnerSubscriber; });
/* unused harmony export ComplexInnerSubscriber */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SimpleOuterSubscriber; });
/* unused harmony export ComplexOuterSubscriber */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return innerSubscribe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1381);
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1382);
/* harmony import */ var _util_subscribeTo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1456);
/** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_util_subscribeTo PURE_IMPORTS_END */





var SimpleInnerSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](SimpleInnerSubscriber, _super);

  function SimpleInnerSubscriber(parent) {
    var _this = _super.call(this) || this;

    _this.parent = parent;
    return _this;
  }

  SimpleInnerSubscriber.prototype._next = function (value) {
    this.parent.notifyNext(value);
  };

  SimpleInnerSubscriber.prototype._error = function (error) {
    this.parent.notifyError(error);
    this.unsubscribe();
  };

  SimpleInnerSubscriber.prototype._complete = function () {
    this.parent.notifyComplete();
    this.unsubscribe();
  };

  return SimpleInnerSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);



var ComplexInnerSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](ComplexInnerSubscriber, _super);

  function ComplexInnerSubscriber(parent, outerValue, outerIndex) {
    var _this = _super.call(this) || this;

    _this.parent = parent;
    _this.outerValue = outerValue;
    _this.outerIndex = outerIndex;
    return _this;
  }

  ComplexInnerSubscriber.prototype._next = function (value) {
    this.parent.notifyNext(this.outerValue, value, this.outerIndex, this);
  };

  ComplexInnerSubscriber.prototype._error = function (error) {
    this.parent.notifyError(error);
    this.unsubscribe();
  };

  ComplexInnerSubscriber.prototype._complete = function () {
    this.parent.notifyComplete(this);
    this.unsubscribe();
  };

  return ComplexInnerSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);



var SimpleOuterSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](SimpleOuterSubscriber, _super);

  function SimpleOuterSubscriber() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SimpleOuterSubscriber.prototype.notifyNext = function (innerValue) {
    this.destination.next(innerValue);
  };

  SimpleOuterSubscriber.prototype.notifyError = function (err) {
    this.destination.error(err);
  };

  SimpleOuterSubscriber.prototype.notifyComplete = function () {
    this.destination.complete();
  };

  return SimpleOuterSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);



var ComplexOuterSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](ComplexOuterSubscriber, _super);

  function ComplexOuterSubscriber() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ComplexOuterSubscriber.prototype.notifyNext = function (_outerValue, innerValue, _outerIndex, _innerSub) {
    this.destination.next(innerValue);
  };

  ComplexOuterSubscriber.prototype.notifyError = function (error) {
    this.destination.error(error);
  };

  ComplexOuterSubscriber.prototype.notifyComplete = function (_innerSub) {
    this.destination.complete();
  };

  return ComplexOuterSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);


function innerSubscribe(result, innerSubscriber) {
  if (innerSubscriber.closed) {
    return undefined;
  }

  if (result instanceof _Observable__WEBPACK_IMPORTED_MODULE_2__[/* Observable */ "a"]) {
    return result.subscribe(innerSubscriber);
  }

  var subscription;

  try {
    subscription = Object(_util_subscribeTo__WEBPACK_IMPORTED_MODULE_3__[/* subscribeTo */ "a"])(result)(innerSubscriber);
  } catch (error) {
    innerSubscriber.error(error);
  }

  return subscription;
}

/***/ }),

/***/ 1384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1387);
/* harmony import */ var _util_isObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1467);
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1416);
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1466);
/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */





var Subscription = /*@__PURE__*/function () {
  function Subscription(unsubscribe) {
    this.closed = false;
    this._parentOrParents = null;
    this._subscriptions = null;

    if (unsubscribe) {
      this._ctorUnsubscribe = true;
      this._unsubscribe = unsubscribe;
    }
  }

  Subscription.prototype.unsubscribe = function () {
    var errors;

    if (this.closed) {
      return;
    }

    var _a = this,
        _parentOrParents = _a._parentOrParents,
        _ctorUnsubscribe = _a._ctorUnsubscribe,
        _unsubscribe = _a._unsubscribe,
        _subscriptions = _a._subscriptions;

    this.closed = true;
    this._parentOrParents = null;
    this._subscriptions = null;

    if (_parentOrParents instanceof Subscription) {
      _parentOrParents.remove(this);
    } else if (_parentOrParents !== null) {
      for (var index = 0; index < _parentOrParents.length; ++index) {
        var parent_1 = _parentOrParents[index];
        parent_1.remove(this);
      }
    }

    if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_2__[/* isFunction */ "a"])(_unsubscribe)) {
      if (_ctorUnsubscribe) {
        this._unsubscribe = undefined;
      }

      try {
        _unsubscribe.call(this);
      } catch (e) {
        errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_3__[/* UnsubscriptionError */ "a"] ? flattenUnsubscriptionErrors(e.errors) : [e];
      }
    }

    if (Object(_util_isArray__WEBPACK_IMPORTED_MODULE_0__[/* isArray */ "a"])(_subscriptions)) {
      var index = -1;
      var len = _subscriptions.length;

      while (++index < len) {
        var sub = _subscriptions[index];

        if (Object(_util_isObject__WEBPACK_IMPORTED_MODULE_1__[/* isObject */ "a"])(sub)) {
          try {
            sub.unsubscribe();
          } catch (e) {
            errors = errors || [];

            if (e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_3__[/* UnsubscriptionError */ "a"]) {
              errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
            } else {
              errors.push(e);
            }
          }
        }
      }
    }

    if (errors) {
      throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_3__[/* UnsubscriptionError */ "a"](errors);
    }
  };

  Subscription.prototype.add = function (teardown) {
    var subscription = teardown;

    if (!teardown) {
      return Subscription.EMPTY;
    }

    switch (typeof teardown) {
      case 'function':
        subscription = new Subscription(teardown);

      case 'object':
        if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
          return subscription;
        } else if (this.closed) {
          subscription.unsubscribe();
          return subscription;
        } else if (!(subscription instanceof Subscription)) {
          var tmp = subscription;
          subscription = new Subscription();
          subscription._subscriptions = [tmp];
        }

        break;

      default:
        {
          throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
    }

    var _parentOrParents = subscription._parentOrParents;

    if (_parentOrParents === null) {
      subscription._parentOrParents = this;
    } else if (_parentOrParents instanceof Subscription) {
      if (_parentOrParents === this) {
        return subscription;
      }

      subscription._parentOrParents = [_parentOrParents, this];
    } else if (_parentOrParents.indexOf(this) === -1) {
      _parentOrParents.push(this);
    } else {
      return subscription;
    }

    var subscriptions = this._subscriptions;

    if (subscriptions === null) {
      this._subscriptions = [subscription];
    } else {
      subscriptions.push(subscription);
    }

    return subscription;
  };

  Subscription.prototype.remove = function (subscription) {
    var subscriptions = this._subscriptions;

    if (subscriptions) {
      var subscriptionIndex = subscriptions.indexOf(subscription);

      if (subscriptionIndex !== -1) {
        subscriptions.splice(subscriptionIndex, 1);
      }
    }
  };

  Subscription.EMPTY = function (empty) {
    empty.closed = true;
    return empty;
  }(new Subscription());

  return Subscription;
}();



function flattenUnsubscriptionErrors(errors) {
  return errors.reduce(function (errs, err) {
    return errs.concat(err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_3__[/* UnsubscriptionError */ "a"] ? err.errors : err);
  }, []);
}

/***/ }),

/***/ 1385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SubjectSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subject; });
/* unused harmony export AnonymousSubject */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1382);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1381);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1384);
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1417);
/* harmony import */ var _SubjectSubscription__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1522);
/* harmony import */ var _internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1465);
/** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */








var SubjectSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](SubjectSubscriber, _super);

  function SubjectSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    return _this;
  }

  return SubjectSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_2__[/* Subscriber */ "a"]);



var Subject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](Subject, _super);

  function Subject() {
    var _this = _super.call(this) || this;

    _this.observers = [];
    _this.closed = false;
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }

  Subject.prototype[_internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_6__[/* rxSubscriber */ "a"]] = function () {
    return new SubjectSubscriber(this);
  };

  Subject.prototype.lift = function (operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };

  Subject.prototype.next = function (value) {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__[/* ObjectUnsubscribedError */ "a"]();
    }

    if (!this.isStopped) {
      var observers = this.observers;
      var len = observers.length;
      var copy = observers.slice();

      for (var i = 0; i < len; i++) {
        copy[i].next(value);
      }
    }
  };

  Subject.prototype.error = function (err) {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__[/* ObjectUnsubscribedError */ "a"]();
    }

    this.hasError = true;
    this.thrownError = err;
    this.isStopped = true;
    var observers = this.observers;
    var len = observers.length;
    var copy = observers.slice();

    for (var i = 0; i < len; i++) {
      copy[i].error(err);
    }

    this.observers.length = 0;
  };

  Subject.prototype.complete = function () {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__[/* ObjectUnsubscribedError */ "a"]();
    }

    this.isStopped = true;
    var observers = this.observers;
    var len = observers.length;
    var copy = observers.slice();

    for (var i = 0; i < len; i++) {
      copy[i].complete();
    }

    this.observers.length = 0;
  };

  Subject.prototype.unsubscribe = function () {
    this.isStopped = true;
    this.closed = true;
    this.observers = null;
  };

  Subject.prototype._trySubscribe = function (subscriber) {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__[/* ObjectUnsubscribedError */ "a"]();
    } else {
      return _super.prototype._trySubscribe.call(this, subscriber);
    }
  };

  Subject.prototype._subscribe = function (subscriber) {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__[/* ObjectUnsubscribedError */ "a"]();
    } else if (this.hasError) {
      subscriber.error(this.thrownError);
      return _Subscription__WEBPACK_IMPORTED_MODULE_3__[/* Subscription */ "a"].EMPTY;
    } else if (this.isStopped) {
      subscriber.complete();
      return _Subscription__WEBPACK_IMPORTED_MODULE_3__[/* Subscription */ "a"].EMPTY;
    } else {
      this.observers.push(subscriber);
      return new _SubjectSubscription__WEBPACK_IMPORTED_MODULE_5__[/* SubjectSubscription */ "a"](this, subscriber);
    }
  };

  Subject.prototype.asObservable = function () {
    var observable = new _Observable__WEBPACK_IMPORTED_MODULE_1__[/* Observable */ "a"]();
    observable.source = this;
    return observable;
  };

  Subject.create = function (destination, source) {
    return new AnonymousSubject(destination, source);
  };

  return Subject;
}(_Observable__WEBPACK_IMPORTED_MODULE_1__[/* Observable */ "a"]);



var AnonymousSubject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](AnonymousSubject, _super);

  function AnonymousSubject(destination, source) {
    var _this = _super.call(this) || this;

    _this.destination = destination;
    _this.source = source;
    return _this;
  }

  AnonymousSubject.prototype.next = function (value) {
    var destination = this.destination;

    if (destination && destination.next) {
      destination.next(value);
    }
  };

  AnonymousSubject.prototype.error = function (err) {
    var destination = this.destination;

    if (destination && destination.error) {
      this.destination.error(err);
    }
  };

  AnonymousSubject.prototype.complete = function () {
    var destination = this.destination;

    if (destination && destination.complete) {
      this.destination.complete();
    }
  };

  AnonymousSubject.prototype._subscribe = function (subscriber) {
    var source = this.source;

    if (source) {
      return this.source.subscribe(subscriber);
    } else {
      return _Subscription__WEBPACK_IMPORTED_MODULE_3__[/* Subscription */ "a"].EMPTY;
    }
  };

  return AnonymousSubject;
}(Subject);



/***/ }),

/***/ 1386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return asyncScheduler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return async; });
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1434);
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1420);
/** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */


var asyncScheduler = /*@__PURE__*/new _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__[/* AsyncScheduler */ "a"](_AsyncAction__WEBPACK_IMPORTED_MODULE_0__[/* AsyncAction */ "a"]);
var async = asyncScheduler;

/***/ }),

/***/ 1387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArray; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = /*@__PURE__*/function () {
  return Array.isArray || function (x) {
    return x && typeof x.length === 'number';
  };
}();

/***/ }),

/***/ 1388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return map; });
/* unused harmony export MapOperator */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1381);
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function map(project, thisArg) {
  return function mapOperation(source) {
    if (typeof project !== 'function') {
      throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }

    return source.lift(new MapOperator(project, thisArg));
  };
}

var MapOperator = /*@__PURE__*/function () {
  function MapOperator(project, thisArg) {
    this.project = project;
    this.thisArg = thisArg;
  }

  MapOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
  };

  return MapOperator;
}();



var MapSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](MapSubscriber, _super);

  function MapSubscriber(destination, project, thisArg) {
    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.count = 0;
    _this.thisArg = thisArg || _this;
    return _this;
  }

  MapSubscriber.prototype._next = function (value) {
    var result;

    try {
      result = this.project.call(this.thisArg, value, this.count++);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(result);
  };

  return MapSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);

/***/ }),

/***/ 1389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EMPTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return empty; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1382);
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

var EMPTY = /*@__PURE__*/new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](function (subscriber) {
  return subscriber.complete();
});
function empty(scheduler) {
  return scheduler ? emptyScheduled(scheduler) : EMPTY;
}

function emptyScheduled(scheduler) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](function (subscriber) {
    return scheduler.schedule(function () {
      return subscriber.complete();
    });
  });
}

/***/ }),

/***/ 1391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return from; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1382);
/* harmony import */ var _util_subscribeTo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1456);
/* harmony import */ var _scheduled_scheduled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1516);
/** PURE_IMPORTS_START _Observable,_util_subscribeTo,_scheduled_scheduled PURE_IMPORTS_END */



function from(input, scheduler) {
  if (!scheduler) {
    if (input instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"]) {
      return input;
    }

    return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](Object(_util_subscribeTo__WEBPACK_IMPORTED_MODULE_1__[/* subscribeTo */ "a"])(input));
  } else {
    return Object(_scheduled_scheduled__WEBPACK_IMPORTED_MODULE_2__[/* scheduled */ "a"])(input, scheduler);
  }
}

/***/ }),

/***/ 1392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isScheduler; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
  return value && typeof value.schedule === 'function';
}

/***/ }),

/***/ 1394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return identity; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
  return x;
}

/***/ }),

/***/ 1396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return observable; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var observable = /*@__PURE__*/function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();

/***/ }),

/***/ 1397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OuterSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1381);
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */



var OuterSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](OuterSubscriber, _super);

  function OuterSubscriber() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
    this.destination.next(innerValue);
  };

  OuterSubscriber.prototype.notifyError = function (error, innerSub) {
    this.destination.error(error);
  };

  OuterSubscriber.prototype.notifyComplete = function (innerSub) {
    this.destination.complete();
  };

  return OuterSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);



/***/ }),

/***/ 1398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return filter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1381);
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function filter(predicate, thisArg) {
  return function filterOperatorFunction(source) {
    return source.lift(new FilterOperator(predicate, thisArg));
  };
}

var FilterOperator = /*@__PURE__*/function () {
  function FilterOperator(predicate, thisArg) {
    this.predicate = predicate;
    this.thisArg = thisArg;
  }

  FilterOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
  };

  return FilterOperator;
}();

var FilterSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](FilterSubscriber, _super);

  function FilterSubscriber(destination, predicate, thisArg) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.thisArg = thisArg;
    _this.count = 0;
    return _this;
  }

  FilterSubscriber.prototype._next = function (value) {
    var result;

    try {
      result = this.predicate.call(this.thisArg, value, this.count++);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    if (result) {
      this.destination.next(value);
    }
  };

  return FilterSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);

/***/ }),

/***/ 1399:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) { // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _toConsumableArray = __webpack_require__(434);

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFavicon = exports.range = exports.isBigNumber = exports.ensureParsedJSONObject = exports.ensureBN = exports.ensureRegExpString = exports.ensureIntNumber = exports.ensureBuffer = exports.ensureAddressString = exports.ensureEvenLengthHexString = exports.ensureHexString = exports.isHexString = exports.prepend0x = exports.strip0x = exports.has0xPrefix = exports.hexStringFromIntNumber = exports.intNumberFromHexString = exports.bigIntStringFromBN = exports.hexStringFromBuffer = exports.hexStringToUint8Array = exports.uint8ArrayToHex = exports.randomBytesHex = void 0;

var bn_js_1 = __importDefault(__webpack_require__(1436));

var types_1 = __webpack_require__(1479);

var INT_STRING_REGEX = /^[0-9]*$/;
var HEXADECIMAL_STRING_REGEX = /^[a-f0-9]*$/;
/**
 * @param length number of bytes
 */

function randomBytesHex(length) {
  return uint8ArrayToHex(crypto.getRandomValues(new Uint8Array(length)));
}

exports.randomBytesHex = randomBytesHex;

function uint8ArrayToHex(value) {
  return _toConsumableArray(value).map(function (b) {
    return b.toString(16).padStart(2, '0');
  }).join('');
}

exports.uint8ArrayToHex = uint8ArrayToHex;

function hexStringToUint8Array(hexString) {
  return new Uint8Array(hexString.match(/.{1,2}/g).map(function (byte) {
    return parseInt(byte, 16);
  }));
}

exports.hexStringToUint8Array = hexStringToUint8Array;

function hexStringFromBuffer(buf) {
  var includePrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var hex = buf.toString("hex");
  return (0, types_1.HexString)(includePrefix ? "0x" + hex : hex);
}

exports.hexStringFromBuffer = hexStringFromBuffer;

function bigIntStringFromBN(bn) {
  return (0, types_1.BigIntString)(bn.toString(10));
}

exports.bigIntStringFromBN = bigIntStringFromBN;

function intNumberFromHexString(hex) {
  return (0, types_1.IntNumber)(new bn_js_1.default(ensureEvenLengthHexString(hex, false), 16).toNumber());
}

exports.intNumberFromHexString = intNumberFromHexString;

function hexStringFromIntNumber(num) {
  return (0, types_1.HexString)("0x" + new bn_js_1.default(num).toString(16));
}

exports.hexStringFromIntNumber = hexStringFromIntNumber;

function has0xPrefix(str) {
  return str.startsWith("0x") || str.startsWith("0X");
}

exports.has0xPrefix = has0xPrefix;

function strip0x(hex) {
  if (has0xPrefix(hex)) {
    return hex.slice(2);
  }

  return hex;
}

exports.strip0x = strip0x;

function prepend0x(hex) {
  if (has0xPrefix(hex)) {
    return "0x" + hex.slice(2);
  }

  return "0x" + hex;
}

exports.prepend0x = prepend0x;

function isHexString(hex) {
  if (typeof hex !== "string") {
    return false;
  }

  var s = strip0x(hex).toLowerCase();
  return HEXADECIMAL_STRING_REGEX.test(s);
}

exports.isHexString = isHexString;

function ensureHexString(hex) {
  var includePrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof hex === "string") {
    var s = strip0x(hex).toLowerCase();

    if (HEXADECIMAL_STRING_REGEX.test(s)) {
      return (0, types_1.HexString)(includePrefix ? "0x" + s : s);
    }
  }

  throw new Error("\"".concat(hex, "\" is not a hexadecimal string"));
}

exports.ensureHexString = ensureHexString;

function ensureEvenLengthHexString(hex) {
  var includePrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var h = ensureHexString(hex, false);

  if (h.length % 2 === 1) {
    h = (0, types_1.HexString)("0" + h);
  }

  return includePrefix ? (0, types_1.HexString)("0x" + h) : h;
}

exports.ensureEvenLengthHexString = ensureEvenLengthHexString;

function ensureAddressString(str) {
  if (typeof str === "string") {
    var s = strip0x(str).toLowerCase();

    if (isHexString(s) && s.length === 40) {
      return (0, types_1.AddressString)(prepend0x(s));
    }
  }

  throw new Error("Invalid Ethereum address: ".concat(str));
}

exports.ensureAddressString = ensureAddressString;

function ensureBuffer(str) {
  if (Buffer.isBuffer(str)) {
    return str;
  }

  if (typeof str === "string") {
    if (isHexString(str)) {
      var s = ensureEvenLengthHexString(str, false);
      return Buffer.from(s, "hex");
    } else {
      return Buffer.from(str, "utf8");
    }
  }

  throw new Error("Not binary data: ".concat(str));
}

exports.ensureBuffer = ensureBuffer;

function ensureIntNumber(num) {
  if (typeof num === "number" && Number.isInteger(num)) {
    return (0, types_1.IntNumber)(num);
  }

  if (typeof num === "string") {
    if (INT_STRING_REGEX.test(num)) {
      return (0, types_1.IntNumber)(Number(num));
    }

    if (isHexString(num)) {
      return (0, types_1.IntNumber)(new bn_js_1.default(ensureEvenLengthHexString(num, false), 16).toNumber());
    }
  }

  throw new Error("Not an integer: ".concat(num));
}

exports.ensureIntNumber = ensureIntNumber;

function ensureRegExpString(regExp) {
  if (regExp instanceof RegExp) {
    return (0, types_1.RegExpString)(regExp.toString());
  }

  throw new Error("Not a RegExp: ".concat(regExp));
}

exports.ensureRegExpString = ensureRegExpString;

function ensureBN(val) {
  if (val != null && (bn_js_1.default.isBN(val) || isBigNumber(val))) {
    return new bn_js_1.default(val.toString(10), 10);
  }

  if (typeof val === "number") {
    return new bn_js_1.default(ensureIntNumber(val));
  }

  if (typeof val === "string") {
    if (INT_STRING_REGEX.test(val)) {
      return new bn_js_1.default(val, 10);
    }

    if (isHexString(val)) {
      return new bn_js_1.default(ensureEvenLengthHexString(val, false), 16);
    }
  }

  throw new Error("Not an integer: ".concat(val));
}

exports.ensureBN = ensureBN;

function ensureParsedJSONObject(val) {
  if (typeof val === "string") {
    return JSON.parse(val);
  }

  if (typeof val === "object") {
    return val;
  }

  throw new Error("Not a JSON string or an object: ".concat(val));
}

exports.ensureParsedJSONObject = ensureParsedJSONObject;

function isBigNumber(val) {
  if (val == null || typeof val.constructor !== "function") {
    return false;
  }

  var constructor = val.constructor;
  return typeof constructor.config === "function" && typeof constructor.EUCLID === "number";
}

exports.isBigNumber = isBigNumber;

function range(start, stop) {
  return Array.from({
    length: stop - start
  }, function (_, i) {
    return start + i;
  });
}

exports.range = range;

function getFavicon() {
  var el = document.querySelector('link[sizes="192x192"]') || document.querySelector('link[sizes="180x180"]') || document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
  var _document$location = document.location,
      protocol = _document$location.protocol,
      host = _document$location.host;
  var href = el ? el.getAttribute("href") : null;

  if (!href || href.startsWith("javascript:")) {
    return null;
  }

  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("data:")) {
    return href;
  }

  if (href.startsWith("//")) {
    return protocol + href;
  }

  return "".concat(protocol, "//").concat(host).concat(href);
}

exports.getFavicon = getFavicon;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9).Buffer))

/***/ }),

/***/ 1400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return i; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return B; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toChildArray", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return l; });
var n,
    l,
    u,
    i,
    t,
    r,
    o,
    f,
    e = {},
    c = [],
    s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

function a(n, l) {
  for (var u in l) {
    n[u] = l[u];
  }

  return n;
}

function h(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function v(l, u, i) {
  var t,
      r,
      o,
      f = {};

  for (o in u) {
    "key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
  }

  if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) {
    void 0 === f[o] && (f[o] = l.defaultProps[o]);
  }
  return y(l, f, t, r, null);
}

function y(n, i, t, r, o) {
  var f = {
    type: n,
    props: i,
    key: t,
    ref: r,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: null == o ? ++u : o
  };
  return null == o && null != l.vnode && l.vnode(f), f;
}

function p() {
  return {
    current: null
  };
}

function d(n) {
  return n.children;
}

function _(n, l) {
  this.props = n, this.context = l;
}

function k(n, l) {
  if (null == l) return n.__ ? k(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) {
    if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
  }

  return "function" == typeof n.type ? k(n) : null;
}

function b(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
      if (null != (u = n.__k[l]) && null != u.__e) {
        n.__e = n.__c.base = u.__e;
        break;
      }
    }

    return b(n);
  }
}

function m(n) {
  (!n.__d && (n.__d = !0) && t.push(n) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(g);
}

function g() {
  for (var n; g.__r = t.length;) {
    n = t.sort(function (n, l) {
      return n.__v.__b - l.__v.__b;
    }), t = [], n.some(function (n) {
      var l, u, i, t, r, o;
      n.__d && (r = (t = (l = n).__v).__e, (o = l.__P) && (u = [], (i = a({}, t)).__v = t.__v + 1, j(o, t, i, l.__n, void 0 !== o.ownerSVGElement, null != t.__h ? [r] : null, u, null == r ? k(t) : r, t.__h), z(u, t), t.__e != r && b(t)));
    });
  }
}

function w(n, l, u, i, t, r, o, f, s, a) {
  var h,
      v,
      p,
      _,
      b,
      m,
      g,
      w = i && i.__k || c,
      A = w.length;

  for (u.__k = [], h = 0; h < l.length; h++) {
    if (null != (_ = u.__k[h] = null == (_ = l[h]) || "boolean" == typeof _ ? null : "string" == typeof _ || "number" == typeof _ || "bigint" == typeof _ ? y(null, _, null, null, _) : Array.isArray(_) ? y(d, {
      children: _
    }, null, null, null) : _.__b > 0 ? y(_.type, _.props, _.key, null, _.__v) : _)) {
      if (_.__ = u, _.__b = u.__b + 1, null === (p = w[h]) || p && _.key == p.key && _.type === p.type) w[h] = void 0;else for (v = 0; v < A; v++) {
        if ((p = w[v]) && _.key == p.key && _.type === p.type) {
          w[v] = void 0;
          break;
        }

        p = null;
      }
      j(n, _, p = p || e, t, r, o, f, s, a), b = _.__e, (v = _.ref) && p.ref != v && (g || (g = []), p.ref && g.push(p.ref, null, _), g.push(v, _.__c || b, _)), null != b ? (null == m && (m = b), "function" == typeof _.type && _.__k === p.__k ? _.__d = s = x(_, s, n) : s = P(n, _, p, w, b, s), "function" == typeof u.type && (u.__d = s)) : s && p.__e == s && s.parentNode != n && (s = k(p));
    }
  }

  for (u.__e = m, h = A; h--;) {
    null != w[h] && ("function" == typeof u.type && null != w[h].__e && w[h].__e == u.__d && (u.__d = k(i, h + 1)), N(w[h], w[h]));
  }

  if (g) for (h = 0; h < g.length; h++) {
    M(g[h], g[++h], g[++h]);
  }
}

function x(n, l, u) {
  for (var i, t = n.__k, r = 0; t && r < t.length; r++) {
    (i = t[r]) && (i.__ = n, l = "function" == typeof i.type ? x(i, l, u) : P(u, i, i, t, i.__e, l));
  }

  return l;
}

function A(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    A(n, l);
  }) : l.push(n)), l;
}

function P(n, l, u, i, t, r) {
  var o, f, e;
  if (void 0 !== l.__d) o = l.__d, l.__d = void 0;else if (null == u || t != r || null == t.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(t), o = null;else {
    for (f = r, e = 0; (f = f.nextSibling) && e < i.length; e += 2) {
      if (f == t) break n;
    }

    n.insertBefore(t, r), o = r;
  }
  return void 0 !== o ? o : t.nextSibling;
}

function C(n, l, u, i, t) {
  var r;

  for (r in u) {
    "children" === r || "key" === r || r in l || H(n, r, null, u[r], i);
  }

  for (r in l) {
    t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || H(n, r, l[r], u[r], i);
  }
}

function $(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || s.test(l) ? u : u + "px";
}

function H(n, l, u, i, t) {
  var r;

  n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) {
        u && l in u || $(n.style, l, "");
      }
      if (u) for (l in u) {
        i && u[l] === i[l] || $(n.style, l, u[l]);
      }
    }
  } else if ("o" === l[0] && "n" === l[1]) r = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? i || n.addEventListener(l, r ? T : I, r) : n.removeEventListener(l, r ? T : I, r);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;
      break n;
    } catch (n) {}
    "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
  }
}

function I(n) {
  this.l[n.type + !1](l.event ? l.event(n) : n);
}

function T(n) {
  this.l[n.type + !0](l.event ? l.event(n) : n);
}

function j(n, u, i, t, r, o, f, e, c) {
  var s,
      h,
      v,
      y,
      p,
      k,
      b,
      m,
      g,
      x,
      A,
      P = u.type;
  if (void 0 !== u.constructor) return null;
  null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, o = [e]), (s = l.__b) && s(u);

  try {
    n: if ("function" == typeof P) {
      if (m = u.props, g = (s = P.contextType) && t[s.__c], x = s ? g ? g.props.value : s.__ : t, i.__c ? b = (h = u.__c = i.__c).__ = h.__E : ("prototype" in P && P.prototype.render ? u.__c = h = new P(m, x) : (u.__c = h = new _(m, x), h.constructor = P, h.render = O), g && g.sub(h), h.props = m, h.state || (h.state = {}), h.context = x, h.__n = t, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), null != P.getDerivedStateFromProps && (h.__s == h.state && (h.__s = a({}, h.__s)), a(h.__s, P.getDerivedStateFromProps(m, h.__s))), y = h.props, p = h.state, v) null == P.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && m !== y && null != h.componentWillReceiveProps && h.componentWillReceiveProps(m, x), !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(m, h.__s, x) || u.__v === i.__v) {
          h.props = m, h.state = h.__s, u.__v !== i.__v && (h.__d = !1), h.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
            n && (n.__ = u);
          }), h.__h.length && f.push(h);
          break n;
        }

        null != h.componentWillUpdate && h.componentWillUpdate(m, h.__s, x), null != h.componentDidUpdate && h.__h.push(function () {
          h.componentDidUpdate(y, p, k);
        });
      }
      h.context = x, h.props = m, h.state = h.__s, (s = l.__r) && s(u), h.__d = !1, h.__v = u, h.__P = n, s = h.render(h.props, h.state, h.context), h.state = h.__s, null != h.getChildContext && (t = a(a({}, t), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (k = h.getSnapshotBeforeUpdate(y, p)), A = null != s && s.type === d && null == s.key ? s.props.children : s, w(n, Array.isArray(A) ? A : [A], u, i, t, r, o, f, e, c), h.base = u.__e, u.__h = null, h.__h.length && f.push(h), b && (h.__E = h.__ = null), h.__e = !1;
    } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = L(i.__e, u, i, t, r, o, f, c);

    (s = l.diffed) && s(u);
  } catch (n) {
    u.__v = null, (c || null != o) && (u.__e = e, u.__h = !!c, o[o.indexOf(e)] = null), l.__e(n, u, i);
  }
}

function z(n, u) {
  l.__c && l.__c(u, n), n.some(function (u) {
    try {
      n = u.__h, u.__h = [], n.some(function (n) {
        n.call(u);
      });
    } catch (n) {
      l.__e(n, u.__v);
    }
  });
}

function L(l, u, i, t, r, o, f, c) {
  var s,
      a,
      v,
      y = i.props,
      p = u.props,
      d = u.type,
      _ = 0;
  if ("svg" === d && (r = !0), null != o) for (; _ < o.length; _++) {
    if ((s = o[_]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
      l = s, o[_] = null;
      break;
    }
  }

  if (null == l) {
    if (null === d) return document.createTextNode(p);
    l = r ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), o = null, c = !1;
  }

  if (null === d) y === p || c && l.data === p || (l.data = p);else {
    if (o = o && n.call(l.childNodes), a = (y = i.props || e).dangerouslySetInnerHTML, v = p.dangerouslySetInnerHTML, !c) {
      if (null != o) for (y = {}, _ = 0; _ < l.attributes.length; _++) {
        y[l.attributes[_].name] = l.attributes[_].value;
      }
      (v || a) && (v && (a && v.__html == a.__html || v.__html === l.innerHTML) || (l.innerHTML = v && v.__html || ""));
    }

    if (C(l, p, y, r, c), v) u.__k = [];else if (_ = u.props.children, w(l, Array.isArray(_) ? _ : [_], u, i, t, r && "foreignObject" !== d, o, f, o ? o[0] : i.__k && k(i, 0), c), null != o) for (_ = o.length; _--;) {
      null != o[_] && h(o[_]);
    }
    c || ("value" in p && void 0 !== (_ = p.value) && (_ !== y.value || _ !== l.value || "progress" === d && !_) && H(l, "value", _, y.value, !1), "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && H(l, "checked", _, y.checked, !1));
  }
  return l;
}

function M(n, u, i) {
  try {
    "function" == typeof n ? n(u) : n.current = u;
  } catch (n) {
    l.__e(n, i);
  }
}

function N(n, u, i) {
  var t, r;

  if (l.unmount && l.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || M(t, null, u)), null != (t = n.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (n) {
      l.__e(n, u);
    }
    t.base = t.__P = null;
  }

  if (t = n.__k) for (r = 0; r < t.length; r++) {
    t[r] && N(t[r], u, "function" != typeof n.type);
  }
  i || null == n.__e || h(n.__e), n.__e = n.__d = void 0;
}

function O(n, l, u) {
  return this.constructor(n, u);
}

function S(u, i, t) {
  var r, o, f;
  l.__ && l.__(u, i), o = (r = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], j(i, u = (!r && t || i).__k = v(d, null, [u]), o || e, e, void 0 !== i.ownerSVGElement, !r && t ? [t] : o ? null : i.firstChild ? n.call(i.childNodes) : null, f, !r && t ? t : o ? o.__e : i.firstChild, r), z(f, u);
}

function q(n, l) {
  S(n, l, q);
}

function B(l, u, i) {
  var t,
      r,
      o,
      f = a({}, l.props);

  for (o in u) {
    "key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
  }

  return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), y(l.type, f, t || l.key, r || l.ref, null);
}

function D(n, l) {
  var u = {
    __c: l = "__cC" + f++,
    __: n,
    Consumer: function Consumer(n, l) {
      return n.children(l);
    },
    Provider: function Provider(n) {
      var u, i;
      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(m);
      }, this.sub = function (n) {
        u.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Provider.__ = u.Consumer.contextType = u;
}

n = c.slice, l = {
  __e: function __e(n, l) {
    for (var u, i, t; l = l.__;) {
      if ((u = l.__c) && !u.__) try {
        if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), t) return u.__E = u;
      } catch (l) {
        n = l;
      }
    }

    throw n;
  }
}, u = 0, i = function i(n) {
  return null != n && void 0 === n.constructor;
}, _.prototype.setState = function (n, l) {
  var u;
  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), "function" == typeof n && (n = n(a({}, u), this.props)), n && a(u, n), null != n && this.__v && (l && this.__h.push(l), m(this));
}, _.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), m(this));
}, _.prototype.render = d, t = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;


/***/ }),

/***/ 1406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ subscribeToResult; });

// EXTERNAL MODULE: ./node_modules/rxjs/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(1380);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscriber.js
var Subscriber = __webpack_require__(1381);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/InnerSubscriber.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */



var InnerSubscriber_InnerSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](InnerSubscriber, _super);

  function InnerSubscriber(parent, outerValue, outerIndex) {
    var _this = _super.call(this) || this;

    _this.parent = parent;
    _this.outerValue = outerValue;
    _this.outerIndex = outerIndex;
    _this.index = 0;
    return _this;
  }

  InnerSubscriber.prototype._next = function (value) {
    this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
  };

  InnerSubscriber.prototype._error = function (error) {
    this.parent.notifyError(error, this);
    this.unsubscribe();
  };

  InnerSubscriber.prototype._complete = function () {
    this.parent.notifyComplete(this);
    this.unsubscribe();
  };

  return InnerSubscriber;
}(Subscriber["a" /* Subscriber */]);


// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeTo.js + 3 modules
var subscribeTo = __webpack_require__(1456);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js + 1 modules
var Observable = __webpack_require__(1382);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js
/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo,_Observable PURE_IMPORTS_END */



function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, innerSubscriber) {
  if (innerSubscriber === void 0) {
    innerSubscriber = new InnerSubscriber_InnerSubscriber(outerSubscriber, outerValue, outerIndex);
  }

  if (innerSubscriber.closed) {
    return undefined;
  }

  if (result instanceof Observable["a" /* Observable */]) {
    return result.subscribe(innerSubscriber);
  }

  return Object(subscribeTo["a" /* subscribeTo */])(result)(innerSubscriber);
}

/***/ }),

/***/ 1407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NotificationKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notification; });
/* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1389);
/* harmony import */ var _observable_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1418);
/* harmony import */ var _observable_throwError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1441);
/** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */



var NotificationKind;
/*@__PURE__*/

(function (NotificationKind) {
  NotificationKind["NEXT"] = "N";
  NotificationKind["ERROR"] = "E";
  NotificationKind["COMPLETE"] = "C";
})(NotificationKind || (NotificationKind = {}));

var Notification = /*@__PURE__*/function () {
  function Notification(kind, value, error) {
    this.kind = kind;
    this.value = value;
    this.error = error;
    this.hasValue = kind === 'N';
  }

  Notification.prototype.observe = function (observer) {
    switch (this.kind) {
      case 'N':
        return observer.next && observer.next(this.value);

      case 'E':
        return observer.error && observer.error(this.error);

      case 'C':
        return observer.complete && observer.complete();
    }
  };

  Notification.prototype.do = function (next, error, complete) {
    var kind = this.kind;

    switch (kind) {
      case 'N':
        return next && next(this.value);

      case 'E':
        return error && error(this.error);

      case 'C':
        return complete && complete();
    }
  };

  Notification.prototype.accept = function (nextOrObserver, error, complete) {
    if (nextOrObserver && typeof nextOrObserver.next === 'function') {
      return this.observe(nextOrObserver);
    } else {
      return this.do(nextOrObserver, error, complete);
    }
  };

  Notification.prototype.toObservable = function () {
    var kind = this.kind;

    switch (kind) {
      case 'N':
        return Object(_observable_of__WEBPACK_IMPORTED_MODULE_1__[/* of */ "a"])(this.value);

      case 'E':
        return Object(_observable_throwError__WEBPACK_IMPORTED_MODULE_2__[/* throwError */ "a"])(this.error);

      case 'C':
        return Object(_observable_empty__WEBPACK_IMPORTED_MODULE_0__[/* empty */ "b"])();
    }

    throw new Error('unexpected notification kind value');
  };

  Notification.createNext = function (value) {
    if (typeof value !== 'undefined') {
      return new Notification('N', value);
    }

    return Notification.undefinedValueNotification;
  };

  Notification.createError = function (err) {
    return new Notification('E', undefined, err);
  };

  Notification.createComplete = function () {
    return Notification.completeNotification;
  };

  Notification.completeNotification = new Notification('C');
  Notification.undefinedValueNotification = new Notification('N', undefined);
  return Notification;
}();



/***/ }),

/***/ 1408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArgumentOutOfRangeError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var ArgumentOutOfRangeErrorImpl = /*@__PURE__*/function () {
  function ArgumentOutOfRangeErrorImpl() {
    Error.call(this);
    this.message = 'argument out of range';
    this.name = 'ArgumentOutOfRangeError';
    return this;
  }

  ArgumentOutOfRangeErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return ArgumentOutOfRangeErrorImpl;
}();

var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

/***/ }),

/***/ 1409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var EmptyErrorImpl = /*@__PURE__*/function () {
  function EmptyErrorImpl() {
    Error.call(this);
    this.message = 'no elements in sequence';
    this.name = 'EmptyError';
    return this;
  }

  EmptyErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return EmptyErrorImpl;
}();

var EmptyError = EmptyErrorImpl;

/***/ }),

/***/ 1410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mergeMap; });
/* unused harmony export MergeMapOperator */
/* unused harmony export MergeMapSubscriber */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return flatMap; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1388);
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1391);
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1383);
/** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */




function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }

  if (typeof resultSelector === 'function') {
    return function (source) {
      return source.pipe(mergeMap(function (a, i) {
        return Object(_observable_from__WEBPACK_IMPORTED_MODULE_2__[/* from */ "a"])(project(a, i)).pipe(Object(_map__WEBPACK_IMPORTED_MODULE_1__[/* map */ "a"])(function (b, ii) {
          return resultSelector(a, b, i, ii);
        }));
      }, concurrent));
    };
  } else if (typeof resultSelector === 'number') {
    concurrent = resultSelector;
  }

  return function (source) {
    return source.lift(new MergeMapOperator(project, concurrent));
  };
}

var MergeMapOperator = /*@__PURE__*/function () {
  function MergeMapOperator(project, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }

    this.project = project;
    this.concurrent = concurrent;
  }

  MergeMapOperator.prototype.call = function (observer, source) {
    return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
  };

  return MergeMapOperator;
}();



var MergeMapSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](MergeMapSubscriber, _super);

  function MergeMapSubscriber(destination, project, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }

    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.concurrent = concurrent;
    _this.hasCompleted = false;
    _this.buffer = [];
    _this.active = 0;
    _this.index = 0;
    return _this;
  }

  MergeMapSubscriber.prototype._next = function (value) {
    if (this.active < this.concurrent) {
      this._tryNext(value);
    } else {
      this.buffer.push(value);
    }
  };

  MergeMapSubscriber.prototype._tryNext = function (value) {
    var result;
    var index = this.index++;

    try {
      result = this.project(value, index);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.active++;

    this._innerSub(result);
  };

  MergeMapSubscriber.prototype._innerSub = function (ish) {
    var innerSubscriber = new _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__[/* SimpleInnerSubscriber */ "a"](this);
    var destination = this.destination;
    destination.add(innerSubscriber);
    var innerSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__[/* innerSubscribe */ "c"])(ish, innerSubscriber);

    if (innerSubscription !== innerSubscriber) {
      destination.add(innerSubscription);
    }
  };

  MergeMapSubscriber.prototype._complete = function () {
    this.hasCompleted = true;

    if (this.active === 0 && this.buffer.length === 0) {
      this.destination.complete();
    }

    this.unsubscribe();
  };

  MergeMapSubscriber.prototype.notifyNext = function (innerValue) {
    this.destination.next(innerValue);
  };

  MergeMapSubscriber.prototype.notifyComplete = function () {
    var buffer = this.buffer;
    this.active--;

    if (buffer.length > 0) {
      this._next(buffer.shift());
    } else if (this.active === 0 && this.hasCompleted) {
      this.destination.complete();
    }
  };

  return MergeMapSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__[/* SimpleOuterSubscriber */ "b"]);


var flatMap = mergeMap;

/***/ }),

/***/ 1414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Observable", function() { return /* reexport */ Observable["a" /* Observable */]; });
__webpack_require__.d(__webpack_exports__, "ConnectableObservable", function() { return /* reexport */ ConnectableObservable["a" /* ConnectableObservable */]; });
__webpack_require__.d(__webpack_exports__, "GroupedObservable", function() { return /* reexport */ groupBy["a" /* GroupedObservable */]; });
__webpack_require__.d(__webpack_exports__, "observable", function() { return /* reexport */ observable["a" /* observable */]; });
__webpack_require__.d(__webpack_exports__, "Subject", function() { return /* reexport */ Subject["a" /* Subject */]; });
__webpack_require__.d(__webpack_exports__, "BehaviorSubject", function() { return /* reexport */ BehaviorSubject["a" /* BehaviorSubject */]; });
__webpack_require__.d(__webpack_exports__, "ReplaySubject", function() { return /* reexport */ ReplaySubject["a" /* ReplaySubject */]; });
__webpack_require__.d(__webpack_exports__, "AsyncSubject", function() { return /* reexport */ AsyncSubject["a" /* AsyncSubject */]; });
__webpack_require__.d(__webpack_exports__, "asap", function() { return /* reexport */ asap["a" /* asap */]; });
__webpack_require__.d(__webpack_exports__, "asapScheduler", function() { return /* reexport */ asap["b" /* asapScheduler */]; });
__webpack_require__.d(__webpack_exports__, "async", function() { return /* reexport */ scheduler_async["a" /* async */]; });
__webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return /* reexport */ scheduler_async["b" /* asyncScheduler */]; });
__webpack_require__.d(__webpack_exports__, "queue", function() { return /* reexport */ queue["a" /* queue */]; });
__webpack_require__.d(__webpack_exports__, "queueScheduler", function() { return /* reexport */ queue["b" /* queueScheduler */]; });
__webpack_require__.d(__webpack_exports__, "animationFrame", function() { return /* reexport */ animationFrame; });
__webpack_require__.d(__webpack_exports__, "animationFrameScheduler", function() { return /* reexport */ animationFrameScheduler; });
__webpack_require__.d(__webpack_exports__, "VirtualTimeScheduler", function() { return /* reexport */ VirtualTimeScheduler_VirtualTimeScheduler; });
__webpack_require__.d(__webpack_exports__, "VirtualAction", function() { return /* reexport */ VirtualTimeScheduler_VirtualAction; });
__webpack_require__.d(__webpack_exports__, "Scheduler", function() { return /* reexport */ Scheduler["a" /* Scheduler */]; });
__webpack_require__.d(__webpack_exports__, "Subscription", function() { return /* reexport */ Subscription["a" /* Subscription */]; });
__webpack_require__.d(__webpack_exports__, "Subscriber", function() { return /* reexport */ Subscriber["a" /* Subscriber */]; });
__webpack_require__.d(__webpack_exports__, "Notification", function() { return /* reexport */ Notification["a" /* Notification */]; });
__webpack_require__.d(__webpack_exports__, "NotificationKind", function() { return /* reexport */ Notification["b" /* NotificationKind */]; });
__webpack_require__.d(__webpack_exports__, "pipe", function() { return /* reexport */ pipe["a" /* pipe */]; });
__webpack_require__.d(__webpack_exports__, "noop", function() { return /* reexport */ noop["a" /* noop */]; });
__webpack_require__.d(__webpack_exports__, "identity", function() { return /* reexport */ identity["a" /* identity */]; });
__webpack_require__.d(__webpack_exports__, "isObservable", function() { return /* reexport */ isObservable; });
__webpack_require__.d(__webpack_exports__, "ArgumentOutOfRangeError", function() { return /* reexport */ ArgumentOutOfRangeError["a" /* ArgumentOutOfRangeError */]; });
__webpack_require__.d(__webpack_exports__, "EmptyError", function() { return /* reexport */ EmptyError["a" /* EmptyError */]; });
__webpack_require__.d(__webpack_exports__, "ObjectUnsubscribedError", function() { return /* reexport */ ObjectUnsubscribedError["a" /* ObjectUnsubscribedError */]; });
__webpack_require__.d(__webpack_exports__, "UnsubscriptionError", function() { return /* reexport */ UnsubscriptionError["a" /* UnsubscriptionError */]; });
__webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return /* reexport */ TimeoutError["a" /* TimeoutError */]; });
__webpack_require__.d(__webpack_exports__, "bindCallback", function() { return /* reexport */ bindCallback; });
__webpack_require__.d(__webpack_exports__, "bindNodeCallback", function() { return /* reexport */ bindNodeCallback; });
__webpack_require__.d(__webpack_exports__, "combineLatest", function() { return /* reexport */ combineLatest["b" /* combineLatest */]; });
__webpack_require__.d(__webpack_exports__, "concat", function() { return /* reexport */ concat["a" /* concat */]; });
__webpack_require__.d(__webpack_exports__, "defer", function() { return /* reexport */ defer["a" /* defer */]; });
__webpack_require__.d(__webpack_exports__, "empty", function() { return /* reexport */ empty["b" /* empty */]; });
__webpack_require__.d(__webpack_exports__, "forkJoin", function() { return /* reexport */ forkJoin; });
__webpack_require__.d(__webpack_exports__, "from", function() { return /* reexport */ from["a" /* from */]; });
__webpack_require__.d(__webpack_exports__, "fromEvent", function() { return /* reexport */ fromEvent; });
__webpack_require__.d(__webpack_exports__, "fromEventPattern", function() { return /* reexport */ fromEventPattern; });
__webpack_require__.d(__webpack_exports__, "generate", function() { return /* reexport */ generate; });
__webpack_require__.d(__webpack_exports__, "iif", function() { return /* reexport */ iif; });
__webpack_require__.d(__webpack_exports__, "interval", function() { return /* reexport */ interval; });
__webpack_require__.d(__webpack_exports__, "merge", function() { return /* reexport */ merge["a" /* merge */]; });
__webpack_require__.d(__webpack_exports__, "never", function() { return /* reexport */ never; });
__webpack_require__.d(__webpack_exports__, "of", function() { return /* reexport */ of["a" /* of */]; });
__webpack_require__.d(__webpack_exports__, "onErrorResumeNext", function() { return /* reexport */ onErrorResumeNext; });
__webpack_require__.d(__webpack_exports__, "pairs", function() { return /* reexport */ pairs; });
__webpack_require__.d(__webpack_exports__, "partition", function() { return /* reexport */ partition; });
__webpack_require__.d(__webpack_exports__, "race", function() { return /* reexport */ race["a" /* race */]; });
__webpack_require__.d(__webpack_exports__, "range", function() { return /* reexport */ range; });
__webpack_require__.d(__webpack_exports__, "throwError", function() { return /* reexport */ throwError["a" /* throwError */]; });
__webpack_require__.d(__webpack_exports__, "timer", function() { return /* reexport */ timer["a" /* timer */]; });
__webpack_require__.d(__webpack_exports__, "using", function() { return /* reexport */ using; });
__webpack_require__.d(__webpack_exports__, "zip", function() { return /* reexport */ zip["b" /* zip */]; });
__webpack_require__.d(__webpack_exports__, "scheduled", function() { return /* reexport */ scheduled["a" /* scheduled */]; });
__webpack_require__.d(__webpack_exports__, "EMPTY", function() { return /* reexport */ empty["a" /* EMPTY */]; });
__webpack_require__.d(__webpack_exports__, "NEVER", function() { return /* reexport */ NEVER; });
__webpack_require__.d(__webpack_exports__, "config", function() { return /* reexport */ config["a" /* config */]; });

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js + 1 modules
var Observable = __webpack_require__(1382);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js
var ConnectableObservable = __webpack_require__(1469);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/groupBy.js
var groupBy = __webpack_require__(1439);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/observable.js
var observable = __webpack_require__(1396);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subject.js
var Subject = __webpack_require__(1385);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/BehaviorSubject.js
var BehaviorSubject = __webpack_require__(1470);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/ReplaySubject.js
var ReplaySubject = __webpack_require__(1440);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/AsyncSubject.js
var AsyncSubject = __webpack_require__(1421);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/asap.js + 3 modules
var asap = __webpack_require__(1455);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/async.js
var scheduler_async = __webpack_require__(1386);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/queue.js + 2 modules
var queue = __webpack_require__(1457);

// EXTERNAL MODULE: ./node_modules/rxjs/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(1380);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js + 1 modules
var AsyncAction = __webpack_require__(1434);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js
/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */



var AnimationFrameAction_AnimationFrameAction = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](AnimationFrameAction, _super);

  function AnimationFrameAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }

  AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }

    scheduler.actions.push(this);
    return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () {
      return scheduler.flush(null);
    }));
  };

  AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
    }

    if (scheduler.actions.length === 0) {
      cancelAnimationFrame(id);
      scheduler.scheduled = undefined;
    }

    return undefined;
  };

  return AnimationFrameAction;
}(AsyncAction["a" /* AsyncAction */]);


// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js
var AsyncScheduler = __webpack_require__(1420);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */



var AnimationFrameScheduler_AnimationFrameScheduler = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](AnimationFrameScheduler, _super);

  function AnimationFrameScheduler() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AnimationFrameScheduler.prototype.flush = function (action) {
    this.active = true;
    this.scheduled = undefined;
    var actions = this.actions;
    var error;
    var index = -1;
    var count = actions.length;
    action = action || actions.shift();

    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (++index < count && (action = actions.shift()));

    this.active = false;

    if (error) {
      while (++index < count && (action = actions.shift())) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  return AnimationFrameScheduler;
}(AsyncScheduler["a" /* AsyncScheduler */]);


// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/animationFrame.js
/** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */


var animationFrameScheduler = /*@__PURE__*/new AnimationFrameScheduler_AnimationFrameScheduler(AnimationFrameAction_AnimationFrameAction);
var animationFrame = animationFrameScheduler;
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/VirtualTimeScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */




var VirtualTimeScheduler_VirtualTimeScheduler = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](VirtualTimeScheduler, _super);

  function VirtualTimeScheduler(SchedulerAction, maxFrames) {
    if (SchedulerAction === void 0) {
      SchedulerAction = VirtualTimeScheduler_VirtualAction;
    }

    if (maxFrames === void 0) {
      maxFrames = Number.POSITIVE_INFINITY;
    }

    var _this = _super.call(this, SchedulerAction, function () {
      return _this.frame;
    }) || this;

    _this.maxFrames = maxFrames;
    _this.frame = 0;
    _this.index = -1;
    return _this;
  }

  VirtualTimeScheduler.prototype.flush = function () {
    var _a = this,
        actions = _a.actions,
        maxFrames = _a.maxFrames;

    var error, action;

    while ((action = actions[0]) && action.delay <= maxFrames) {
      actions.shift();
      this.frame = action.delay;

      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    }

    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  VirtualTimeScheduler.frameTimeFactor = 10;
  return VirtualTimeScheduler;
}(AsyncScheduler["a" /* AsyncScheduler */]);



var VirtualTimeScheduler_VirtualAction = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](VirtualAction, _super);

  function VirtualAction(scheduler, work, index) {
    if (index === void 0) {
      index = scheduler.index += 1;
    }

    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    _this.index = index;
    _this.active = true;
    _this.index = scheduler.index = index;
    return _this;
  }

  VirtualAction.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (!this.id) {
      return _super.prototype.schedule.call(this, state, delay);
    }

    this.active = false;
    var action = new VirtualAction(this.scheduler, this.work);
    this.add(action);
    return action.schedule(state, delay);
  };

  VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    this.delay = scheduler.frame + delay;
    var actions = scheduler.actions;
    actions.push(this);
    actions.sort(VirtualAction.sortActions);
    return true;
  };

  VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return undefined;
  };

  VirtualAction.prototype._execute = function (state, delay) {
    if (this.active === true) {
      return _super.prototype._execute.call(this, state, delay);
    }
  };

  VirtualAction.sortActions = function (a, b) {
    if (a.delay === b.delay) {
      if (a.index === b.index) {
        return 0;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.delay > b.delay) {
      return 1;
    } else {
      return -1;
    }
  };

  return VirtualAction;
}(AsyncAction["a" /* AsyncAction */]);


// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Scheduler.js
var Scheduler = __webpack_require__(1473);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscription.js
var Subscription = __webpack_require__(1384);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscriber.js
var Subscriber = __webpack_require__(1381);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Notification.js
var Notification = __webpack_require__(1407);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/pipe.js
var pipe = __webpack_require__(1437);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/noop.js
var noop = __webpack_require__(1442);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/identity.js
var identity = __webpack_require__(1394);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isObservable.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function isObservable(obj) {
  return !!obj && (obj instanceof Observable["a" /* Observable */] || typeof obj.lift === 'function' && typeof obj.subscribe === 'function');
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js
var ArgumentOutOfRangeError = __webpack_require__(1408);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/EmptyError.js
var EmptyError = __webpack_require__(1409);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js
var ObjectUnsubscribedError = __webpack_require__(1417);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError = __webpack_require__(1466);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/TimeoutError.js
var TimeoutError = __webpack_require__(1474);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/map.js
var map = __webpack_require__(1388);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/canReportError.js
var canReportError = __webpack_require__(1468);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isArray.js
var isArray = __webpack_require__(1387);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isScheduler.js
var isScheduler = __webpack_require__(1392);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/bindCallback.js
/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isArray,_util_isScheduler PURE_IMPORTS_END */






function bindCallback(callbackFunc, resultSelector, scheduler) {
  if (resultSelector) {
    if (Object(isScheduler["a" /* isScheduler */])(resultSelector)) {
      scheduler = resultSelector;
    } else {
      return function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        return bindCallback(callbackFunc, scheduler).apply(void 0, args).pipe(Object(map["a" /* map */])(function (args) {
          return Object(isArray["a" /* isArray */])(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
      };
    }
  }

  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var context = this;
    var subject;
    var params = {
      context: context,
      subject: subject,
      callbackFunc: callbackFunc,
      scheduler: scheduler
    };
    return new Observable["a" /* Observable */](function (subscriber) {
      if (!scheduler) {
        if (!subject) {
          subject = new AsyncSubject["a" /* AsyncSubject */]();

          var handler = function handler() {
            var innerArgs = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              innerArgs[_i] = arguments[_i];
            }

            subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
            subject.complete();
          };

          try {
            callbackFunc.apply(context, args.concat([handler]));
          } catch (err) {
            if (Object(canReportError["a" /* canReportError */])(subject)) {
              subject.error(err);
            } else {
              console.warn(err);
            }
          }
        }

        return subject.subscribe(subscriber);
      } else {
        var state = {
          args: args,
          subscriber: subscriber,
          params: params
        };
        return scheduler.schedule(dispatch, 0, state);
      }
    });
  };
}

function dispatch(state) {
  var _this = this;

  var self = this;
  var args = state.args,
      subscriber = state.subscriber,
      params = state.params;
  var callbackFunc = params.callbackFunc,
      context = params.context,
      scheduler = params.scheduler;
  var subject = params.subject;

  if (!subject) {
    subject = params.subject = new AsyncSubject["a" /* AsyncSubject */]();

    var handler = function handler() {
      var innerArgs = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        innerArgs[_i] = arguments[_i];
      }

      var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;

      _this.add(scheduler.schedule(dispatchNext, 0, {
        value: value,
        subject: subject
      }));
    };

    try {
      callbackFunc.apply(context, args.concat([handler]));
    } catch (err) {
      subject.error(err);
    }
  }

  this.add(subject.subscribe(subscriber));
}

function dispatchNext(state) {
  var value = state.value,
      subject = state.subject;
  subject.next(value);
  subject.complete();
}

function dispatchError(state) {
  var err = state.err,
      subject = state.subject;
  subject.error(err);
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/bindNodeCallback.js
/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isScheduler,_util_isArray PURE_IMPORTS_END */






function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
  if (resultSelector) {
    if (Object(isScheduler["a" /* isScheduler */])(resultSelector)) {
      scheduler = resultSelector;
    } else {
      return function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(Object(map["a" /* map */])(function (args) {
          return Object(isArray["a" /* isArray */])(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
      };
    }
  }

  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var params = {
      subject: undefined,
      args: args,
      callbackFunc: callbackFunc,
      scheduler: scheduler,
      context: this
    };
    return new Observable["a" /* Observable */](function (subscriber) {
      var context = params.context;
      var subject = params.subject;

      if (!scheduler) {
        if (!subject) {
          subject = params.subject = new AsyncSubject["a" /* AsyncSubject */]();

          var handler = function handler() {
            var innerArgs = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              innerArgs[_i] = arguments[_i];
            }

            var err = innerArgs.shift();

            if (err) {
              subject.error(err);
              return;
            }

            subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
            subject.complete();
          };

          try {
            callbackFunc.apply(context, args.concat([handler]));
          } catch (err) {
            if (Object(canReportError["a" /* canReportError */])(subject)) {
              subject.error(err);
            } else {
              console.warn(err);
            }
          }
        }

        return subject.subscribe(subscriber);
      } else {
        return scheduler.schedule(bindNodeCallback_dispatch, 0, {
          params: params,
          subscriber: subscriber,
          context: context
        });
      }
    });
  };
}

function bindNodeCallback_dispatch(state) {
  var _this = this;

  var params = state.params,
      subscriber = state.subscriber,
      context = state.context;
  var callbackFunc = params.callbackFunc,
      args = params.args,
      scheduler = params.scheduler;
  var subject = params.subject;

  if (!subject) {
    subject = params.subject = new AsyncSubject["a" /* AsyncSubject */]();

    var handler = function handler() {
      var innerArgs = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        innerArgs[_i] = arguments[_i];
      }

      var err = innerArgs.shift();

      if (err) {
        _this.add(scheduler.schedule(bindNodeCallback_dispatchError, 0, {
          err: err,
          subject: subject
        }));
      } else {
        var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;

        _this.add(scheduler.schedule(bindNodeCallback_dispatchNext, 0, {
          value: value,
          subject: subject
        }));
      }
    };

    try {
      callbackFunc.apply(context, args.concat([handler]));
    } catch (err) {
      this.add(scheduler.schedule(bindNodeCallback_dispatchError, 0, {
        err: err,
        subject: subject
      }));
    }
  }

  this.add(subject.subscribe(subscriber));
}

function bindNodeCallback_dispatchNext(arg) {
  var value = arg.value,
      subject = arg.subject;
  subject.next(value);
  subject.complete();
}

function bindNodeCallback_dispatchError(arg) {
  var err = arg.err,
      subject = arg.subject;
  subject.error(err);
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/combineLatest.js
var combineLatest = __webpack_require__(1443);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/concat.js
var concat = __webpack_require__(1423);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/defer.js
var defer = __webpack_require__(1445);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/empty.js
var empty = __webpack_require__(1389);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isObject.js
var isObject = __webpack_require__(1467);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/from.js
var from = __webpack_require__(1391);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/forkJoin.js
/** PURE_IMPORTS_START _Observable,_util_isArray,_operators_map,_util_isObject,_from PURE_IMPORTS_END */





function forkJoin() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  if (sources.length === 1) {
    var first_1 = sources[0];

    if (Object(isArray["a" /* isArray */])(first_1)) {
      return forkJoinInternal(first_1, null);
    }

    if (Object(isObject["a" /* isObject */])(first_1) && Object.getPrototypeOf(first_1) === Object.prototype) {
      var keys = Object.keys(first_1);
      return forkJoinInternal(keys.map(function (key) {
        return first_1[key];
      }), keys);
    }
  }

  if (typeof sources[sources.length - 1] === 'function') {
    var resultSelector_1 = sources.pop();
    sources = sources.length === 1 && Object(isArray["a" /* isArray */])(sources[0]) ? sources[0] : sources;
    return forkJoinInternal(sources, null).pipe(Object(map["a" /* map */])(function (args) {
      return resultSelector_1.apply(void 0, args);
    }));
  }

  return forkJoinInternal(sources, null);
}

function forkJoinInternal(sources, keys) {
  return new Observable["a" /* Observable */](function (subscriber) {
    var len = sources.length;

    if (len === 0) {
      subscriber.complete();
      return;
    }

    var values = new Array(len);
    var completed = 0;
    var emitted = 0;

    var _loop_1 = function _loop_1(i) {
      var source = Object(from["a" /* from */])(sources[i]);
      var hasValue = false;
      subscriber.add(source.subscribe({
        next: function next(value) {
          if (!hasValue) {
            hasValue = true;
            emitted++;
          }

          values[i] = value;
        },
        error: function error(err) {
          return subscriber.error(err);
        },
        complete: function complete() {
          completed++;

          if (completed === len || !hasValue) {
            if (emitted === len) {
              subscriber.next(keys ? keys.reduce(function (result, key, i) {
                return result[key] = values[i], result;
              }, {}) : values);
            }

            subscriber.complete();
          }
        }
      }));
    };

    for (var i = 0; i < len; i++) {
      _loop_1(i);
    }
  });
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isFunction.js
var isFunction = __webpack_require__(1416);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromEvent.js
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */





var fromEvent_toString = /*@__PURE__*/function () {
  return Object.prototype.toString;
}();

function fromEvent(target, eventName, options, resultSelector) {
  if (Object(isFunction["a" /* isFunction */])(options)) {
    resultSelector = options;
    options = undefined;
  }

  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(Object(map["a" /* map */])(function (args) {
      return Object(isArray["a" /* isArray */])(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
    }));
  }

  return new Observable["a" /* Observable */](function (subscriber) {
    function handler(e) {
      if (arguments.length > 1) {
        subscriber.next(Array.prototype.slice.call(arguments));
      } else {
        subscriber.next(e);
      }
    }

    setupSubscription(target, eventName, handler, subscriber, options);
  });
}

function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
  var unsubscribe;

  if (isEventTarget(sourceObj)) {
    var source_1 = sourceObj;
    sourceObj.addEventListener(eventName, handler, options);

    unsubscribe = function unsubscribe() {
      return source_1.removeEventListener(eventName, handler, options);
    };
  } else if (isJQueryStyleEventEmitter(sourceObj)) {
    var source_2 = sourceObj;
    sourceObj.on(eventName, handler);

    unsubscribe = function unsubscribe() {
      return source_2.off(eventName, handler);
    };
  } else if (isNodeStyleEventEmitter(sourceObj)) {
    var source_3 = sourceObj;
    sourceObj.addListener(eventName, handler);

    unsubscribe = function unsubscribe() {
      return source_3.removeListener(eventName, handler);
    };
  } else if (sourceObj && sourceObj.length) {
    for (var i = 0, len = sourceObj.length; i < len; i++) {
      setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
    }
  } else {
    throw new TypeError('Invalid event target');
  }

  subscriber.add(unsubscribe);
}

function isNodeStyleEventEmitter(sourceObj) {
  return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}

function isJQueryStyleEventEmitter(sourceObj) {
  return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}

function isEventTarget(sourceObj) {
  return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromEventPattern.js
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */




function fromEventPattern(addHandler, removeHandler, resultSelector) {
  if (resultSelector) {
    return fromEventPattern(addHandler, removeHandler).pipe(Object(map["a" /* map */])(function (args) {
      return Object(isArray["a" /* isArray */])(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
    }));
  }

  return new Observable["a" /* Observable */](function (subscriber) {
    var handler = function handler() {
      var e = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        e[_i] = arguments[_i];
      }

      return subscriber.next(e.length === 1 ? e[0] : e);
    };

    var retValue;

    try {
      retValue = addHandler(handler);
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }

    if (!Object(isFunction["a" /* isFunction */])(removeHandler)) {
      return undefined;
    }

    return function () {
      return removeHandler(handler, retValue);
    };
  });
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/generate.js
/** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */



function generate(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
  var resultSelector;
  var initialState;

  if (arguments.length == 1) {
    var options = initialStateOrOptions;
    initialState = options.initialState;
    condition = options.condition;
    iterate = options.iterate;
    resultSelector = options.resultSelector || identity["a" /* identity */];
    scheduler = options.scheduler;
  } else if (resultSelectorOrObservable === undefined || Object(isScheduler["a" /* isScheduler */])(resultSelectorOrObservable)) {
    initialState = initialStateOrOptions;
    resultSelector = identity["a" /* identity */];
    scheduler = resultSelectorOrObservable;
  } else {
    initialState = initialStateOrOptions;
    resultSelector = resultSelectorOrObservable;
  }

  return new Observable["a" /* Observable */](function (subscriber) {
    var state = initialState;

    if (scheduler) {
      return scheduler.schedule(generate_dispatch, 0, {
        subscriber: subscriber,
        iterate: iterate,
        condition: condition,
        resultSelector: resultSelector,
        state: state
      });
    }

    do {
      if (condition) {
        var conditionResult = void 0;

        try {
          conditionResult = condition(state);
        } catch (err) {
          subscriber.error(err);
          return undefined;
        }

        if (!conditionResult) {
          subscriber.complete();
          break;
        }
      }

      var value = void 0;

      try {
        value = resultSelector(state);
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }

      subscriber.next(value);

      if (subscriber.closed) {
        break;
      }

      try {
        state = iterate(state);
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }
    } while (true);

    return undefined;
  });
}

function generate_dispatch(state) {
  var subscriber = state.subscriber,
      condition = state.condition;

  if (subscriber.closed) {
    return undefined;
  }

  if (state.needIterate) {
    try {
      state.state = state.iterate(state.state);
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }
  } else {
    state.needIterate = true;
  }

  if (condition) {
    var conditionResult = void 0;

    try {
      conditionResult = condition(state.state);
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }

    if (!conditionResult) {
      subscriber.complete();
      return undefined;
    }

    if (subscriber.closed) {
      return undefined;
    }
  }

  var value;

  try {
    value = state.resultSelector(state.state);
  } catch (err) {
    subscriber.error(err);
    return undefined;
  }

  if (subscriber.closed) {
    return undefined;
  }

  subscriber.next(value);

  if (subscriber.closed) {
    return undefined;
  }

  return this.schedule(state);
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/iif.js
/** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */


function iif(condition, trueResult, falseResult) {
  if (trueResult === void 0) {
    trueResult = empty["a" /* EMPTY */];
  }

  if (falseResult === void 0) {
    falseResult = empty["a" /* EMPTY */];
  }

  return Object(defer["a" /* defer */])(function () {
    return condition() ? trueResult : falseResult;
  });
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isNumeric.js
var isNumeric = __webpack_require__(1446);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/interval.js
/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */



function interval(period, scheduler) {
  if (period === void 0) {
    period = 0;
  }

  if (scheduler === void 0) {
    scheduler = scheduler_async["a" /* async */];
  }

  if (!Object(isNumeric["a" /* isNumeric */])(period) || period < 0) {
    period = 0;
  }

  if (!scheduler || typeof scheduler.schedule !== 'function') {
    scheduler = scheduler_async["a" /* async */];
  }

  return new Observable["a" /* Observable */](function (subscriber) {
    subscriber.add(scheduler.schedule(interval_dispatch, period, {
      subscriber: subscriber,
      counter: 0,
      period: period
    }));
    return subscriber;
  });
}

function interval_dispatch(state) {
  var subscriber = state.subscriber,
      counter = state.counter,
      period = state.period;
  subscriber.next(counter);
  this.schedule({
    subscriber: subscriber,
    counter: counter + 1,
    period: period
  }, period);
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/merge.js
var merge = __webpack_require__(1476);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/never.js
/** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */


var NEVER = /*@__PURE__*/new Observable["a" /* Observable */](noop["a" /* noop */]);
function never() {
  return NEVER;
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/of.js
var of = __webpack_require__(1418);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/onErrorResumeNext.js
/** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */




function onErrorResumeNext() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  if (sources.length === 0) {
    return empty["a" /* EMPTY */];
  }

  var first = sources[0],
      remainder = sources.slice(1);

  if (sources.length === 1 && Object(isArray["a" /* isArray */])(first)) {
    return onErrorResumeNext.apply(void 0, first);
  }

  return new Observable["a" /* Observable */](function (subscriber) {
    var subNext = function subNext() {
      return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber));
    };

    return Object(from["a" /* from */])(first).subscribe({
      next: function next(value) {
        subscriber.next(value);
      },
      error: subNext,
      complete: subNext
    });
  });
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/pairs.js
/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */


function pairs(obj, scheduler) {
  if (!scheduler) {
    return new Observable["a" /* Observable */](function (subscriber) {
      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length && !subscriber.closed; i++) {
        var key = keys[i];

        if (obj.hasOwnProperty(key)) {
          subscriber.next([key, obj[key]]);
        }
      }

      subscriber.complete();
    });
  } else {
    return new Observable["a" /* Observable */](function (subscriber) {
      var keys = Object.keys(obj);
      var subscription = new Subscription["a" /* Subscription */]();
      subscription.add(scheduler.schedule(pairs_dispatch, 0, {
        keys: keys,
        index: 0,
        subscriber: subscriber,
        subscription: subscription,
        obj: obj
      }));
      return subscription;
    });
  }
}
function pairs_dispatch(state) {
  var keys = state.keys,
      index = state.index,
      subscriber = state.subscriber,
      subscription = state.subscription,
      obj = state.obj;

  if (!subscriber.closed) {
    if (index < keys.length) {
      var key = keys[index];
      subscriber.next([key, obj[key]]);
      subscription.add(this.schedule({
        keys: keys,
        index: index + 1,
        subscriber: subscriber,
        subscription: subscription,
        obj: obj
      }));
    } else {
      subscriber.complete();
    }
  }
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/not.js
var not = __webpack_require__(1526);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeTo.js + 3 modules
var subscribeTo = __webpack_require__(1456);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/filter.js
var filter = __webpack_require__(1398);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/partition.js
/** PURE_IMPORTS_START _util_not,_util_subscribeTo,_operators_filter,_Observable PURE_IMPORTS_END */




function partition(source, predicate, thisArg) {
  return [Object(filter["a" /* filter */])(predicate, thisArg)(new Observable["a" /* Observable */](Object(subscribeTo["a" /* subscribeTo */])(source))), Object(filter["a" /* filter */])(Object(not["a" /* not */])(predicate, thisArg))(new Observable["a" /* Observable */](Object(subscribeTo["a" /* subscribeTo */])(source)))];
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/race.js
var race = __webpack_require__(1477);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/range.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function range(start, count, scheduler) {
  if (start === void 0) {
    start = 0;
  }

  return new Observable["a" /* Observable */](function (subscriber) {
    if (count === undefined) {
      count = start;
      start = 0;
    }

    var index = 0;
    var current = start;

    if (scheduler) {
      return scheduler.schedule(range_dispatch, 0, {
        index: index,
        count: count,
        start: start,
        subscriber: subscriber
      });
    } else {
      do {
        if (index++ >= count) {
          subscriber.complete();
          break;
        }

        subscriber.next(current++);

        if (subscriber.closed) {
          break;
        }
      } while (true);
    }

    return undefined;
  });
}
function range_dispatch(state) {
  var start = state.start,
      index = state.index,
      count = state.count,
      subscriber = state.subscriber;

  if (index >= count) {
    subscriber.complete();
    return;
  }

  subscriber.next(start);

  if (subscriber.closed) {
    return;
  }

  state.index = index + 1;
  state.start = start + 1;
  this.schedule(state);
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/throwError.js
var throwError = __webpack_require__(1441);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/timer.js
var timer = __webpack_require__(1478);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/using.js
/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */



function using(resourceFactory, observableFactory) {
  return new Observable["a" /* Observable */](function (subscriber) {
    var resource;

    try {
      resource = resourceFactory();
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }

    var result;

    try {
      result = observableFactory(resource);
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }

    var source = result ? Object(from["a" /* from */])(result) : empty["a" /* EMPTY */];
    var subscription = source.subscribe(subscriber);
    return function () {
      subscription.unsubscribe();

      if (resource) {
        resource.unsubscribe();
      }
    };
  });
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/zip.js
var zip = __webpack_require__(1447);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduled/scheduled.js + 5 modules
var scheduled = __webpack_require__(1516);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/config.js
var config = __webpack_require__(1415);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/index.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
























































/***/ }),

/***/ 1415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config = {
  Promise: undefined,

  set useDeprecatedSynchronousErrorHandling(value) {
    if (value) {
      var error = /*@__PURE__*/new Error();
      /*@__PURE__*/

      console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
    } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
      /*@__PURE__*/
      console.log('RxJS: Back to a better error behavior. Thank you. <3');
    }

    _enable_super_gross_mode_that_will_cause_bad_things = value;
  },

  get useDeprecatedSynchronousErrorHandling() {
    return _enable_super_gross_mode_that_will_cause_bad_things;
  }

};

/***/ }),

/***/ 1416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isFunction; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
  return typeof x === 'function';
}

/***/ }),

/***/ 1417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectUnsubscribedError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var ObjectUnsubscribedErrorImpl = /*@__PURE__*/function () {
  function ObjectUnsubscribedErrorImpl() {
    Error.call(this);
    this.message = 'object unsubscribed';
    this.name = 'ObjectUnsubscribedError';
    return this;
  }

  ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return ObjectUnsubscribedErrorImpl;
}();

var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

/***/ }),

/***/ 1418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return of; });
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1392);
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1419);
/* harmony import */ var _scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1472);
/** PURE_IMPORTS_START _util_isScheduler,_fromArray,_scheduled_scheduleArray PURE_IMPORTS_END */



function of() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var scheduler = args[args.length - 1];

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_0__[/* isScheduler */ "a"])(scheduler)) {
    args.pop();
    return Object(_scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_2__[/* scheduleArray */ "a"])(args, scheduler);
  } else {
    return Object(_fromArray__WEBPACK_IMPORTED_MODULE_1__[/* fromArray */ "a"])(args);
  }
}

/***/ }),

/***/ 1419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fromArray; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1382);
/* harmony import */ var _util_subscribeToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1523);
/* harmony import */ var _scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1472);
/** PURE_IMPORTS_START _Observable,_util_subscribeToArray,_scheduled_scheduleArray PURE_IMPORTS_END */



function fromArray(input, scheduler) {
  if (!scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](Object(_util_subscribeToArray__WEBPACK_IMPORTED_MODULE_1__[/* subscribeToArray */ "a"])(input));
  } else {
    return Object(_scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_2__[/* scheduleArray */ "a"])(input, scheduler);
  }
}

/***/ }),

/***/ 1420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsyncScheduler; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1473);
/** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */



var AsyncScheduler = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](AsyncScheduler, _super);

  function AsyncScheduler(SchedulerAction, now) {
    if (now === void 0) {
      now = _Scheduler__WEBPACK_IMPORTED_MODULE_1__[/* Scheduler */ "a"].now;
    }

    var _this = _super.call(this, SchedulerAction, function () {
      if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
        return AsyncScheduler.delegate.now();
      } else {
        return now();
      }
    }) || this;

    _this.actions = [];
    _this.active = false;
    _this.scheduled = undefined;
    return _this;
  }

  AsyncScheduler.prototype.schedule = function (work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }

    if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
      return AsyncScheduler.delegate.schedule(work, delay, state);
    } else {
      return _super.prototype.schedule.call(this, work, delay, state);
    }
  };

  AsyncScheduler.prototype.flush = function (action) {
    var actions = this.actions;

    if (this.active) {
      actions.push(action);
      return;
    }

    var error;
    this.active = true;

    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());

    this.active = false;

    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  return AsyncScheduler;
}(_Scheduler__WEBPACK_IMPORTED_MODULE_1__[/* Scheduler */ "a"]);



/***/ }),

/***/ 1421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsyncSubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1385);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1384);
/** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */




var AsyncSubject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](AsyncSubject, _super);

  function AsyncSubject() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.value = null;
    _this.hasNext = false;
    _this.hasCompleted = false;
    return _this;
  }

  AsyncSubject.prototype._subscribe = function (subscriber) {
    if (this.hasError) {
      subscriber.error(this.thrownError);
      return _Subscription__WEBPACK_IMPORTED_MODULE_2__[/* Subscription */ "a"].EMPTY;
    } else if (this.hasCompleted && this.hasNext) {
      subscriber.next(this.value);
      subscriber.complete();
      return _Subscription__WEBPACK_IMPORTED_MODULE_2__[/* Subscription */ "a"].EMPTY;
    }

    return _super.prototype._subscribe.call(this, subscriber);
  };

  AsyncSubject.prototype.next = function (value) {
    if (!this.hasCompleted) {
      this.value = value;
      this.hasNext = true;
    }
  };

  AsyncSubject.prototype.error = function (error) {
    if (!this.hasCompleted) {
      _super.prototype.error.call(this, error);
    }
  };

  AsyncSubject.prototype.complete = function () {
    this.hasCompleted = true;

    if (this.hasNext) {
      _super.prototype.next.call(this, this.value);
    }

    _super.prototype.complete.call(this);
  };

  return AsyncSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__[/* Subject */ "a"]);



/***/ }),

/***/ 1422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getSymbolIterator */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return iterator; });
/* unused harmony export $$iterator */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
  if (typeof Symbol !== 'function' || !Symbol.iterator) {
    return '@@iterator';
  }

  return Symbol.iterator;
}
var iterator = /*@__PURE__*/getSymbolIterator();
var $$iterator = iterator;

/***/ }),

/***/ 1423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return concat; });
/* harmony import */ var _of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1418);
/* harmony import */ var _operators_concatAll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1475);
/** PURE_IMPORTS_START _of,_operators_concatAll PURE_IMPORTS_END */


function concat() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  return Object(_operators_concatAll__WEBPACK_IMPORTED_MODULE_1__[/* concatAll */ "a"])()(_of__WEBPACK_IMPORTED_MODULE_0__[/* of */ "a"].apply(void 0, observables));
}

/***/ }),

/***/ 1433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "audit", function() { return /* reexport */ audit; });
__webpack_require__.d(__webpack_exports__, "auditTime", function() { return /* reexport */ auditTime; });
__webpack_require__.d(__webpack_exports__, "buffer", function() { return /* reexport */ buffer_buffer; });
__webpack_require__.d(__webpack_exports__, "bufferCount", function() { return /* reexport */ bufferCount; });
__webpack_require__.d(__webpack_exports__, "bufferTime", function() { return /* reexport */ bufferTime; });
__webpack_require__.d(__webpack_exports__, "bufferToggle", function() { return /* reexport */ bufferToggle; });
__webpack_require__.d(__webpack_exports__, "bufferWhen", function() { return /* reexport */ bufferWhen; });
__webpack_require__.d(__webpack_exports__, "catchError", function() { return /* reexport */ catchError; });
__webpack_require__.d(__webpack_exports__, "combineAll", function() { return /* reexport */ combineAll; });
__webpack_require__.d(__webpack_exports__, "combineLatest", function() { return /* reexport */ combineLatest_combineLatest; });
__webpack_require__.d(__webpack_exports__, "concat", function() { return /* reexport */ concat_concat; });
__webpack_require__.d(__webpack_exports__, "concatAll", function() { return /* reexport */ concatAll["a" /* concatAll */]; });
__webpack_require__.d(__webpack_exports__, "concatMap", function() { return /* reexport */ concatMap; });
__webpack_require__.d(__webpack_exports__, "concatMapTo", function() { return /* reexport */ concatMapTo; });
__webpack_require__.d(__webpack_exports__, "count", function() { return /* reexport */ count_count; });
__webpack_require__.d(__webpack_exports__, "debounce", function() { return /* reexport */ debounce; });
__webpack_require__.d(__webpack_exports__, "debounceTime", function() { return /* reexport */ debounceTime; });
__webpack_require__.d(__webpack_exports__, "defaultIfEmpty", function() { return /* reexport */ defaultIfEmpty; });
__webpack_require__.d(__webpack_exports__, "delay", function() { return /* reexport */ delay_delay; });
__webpack_require__.d(__webpack_exports__, "delayWhen", function() { return /* reexport */ delayWhen; });
__webpack_require__.d(__webpack_exports__, "dematerialize", function() { return /* reexport */ dematerialize; });
__webpack_require__.d(__webpack_exports__, "distinct", function() { return /* reexport */ distinct; });
__webpack_require__.d(__webpack_exports__, "distinctUntilChanged", function() { return /* reexport */ distinctUntilChanged; });
__webpack_require__.d(__webpack_exports__, "distinctUntilKeyChanged", function() { return /* reexport */ distinctUntilKeyChanged; });
__webpack_require__.d(__webpack_exports__, "elementAt", function() { return /* reexport */ elementAt; });
__webpack_require__.d(__webpack_exports__, "endWith", function() { return /* reexport */ endWith; });
__webpack_require__.d(__webpack_exports__, "every", function() { return /* reexport */ every; });
__webpack_require__.d(__webpack_exports__, "exhaust", function() { return /* reexport */ exhaust; });
__webpack_require__.d(__webpack_exports__, "exhaustMap", function() { return /* reexport */ exhaustMap; });
__webpack_require__.d(__webpack_exports__, "expand", function() { return /* reexport */ expand; });
__webpack_require__.d(__webpack_exports__, "filter", function() { return /* reexport */ filter["a" /* filter */]; });
__webpack_require__.d(__webpack_exports__, "finalize", function() { return /* reexport */ finalize; });
__webpack_require__.d(__webpack_exports__, "find", function() { return /* reexport */ find; });
__webpack_require__.d(__webpack_exports__, "findIndex", function() { return /* reexport */ findIndex; });
__webpack_require__.d(__webpack_exports__, "first", function() { return /* reexport */ first; });
__webpack_require__.d(__webpack_exports__, "groupBy", function() { return /* reexport */ groupBy["b" /* groupBy */]; });
__webpack_require__.d(__webpack_exports__, "ignoreElements", function() { return /* reexport */ ignoreElements; });
__webpack_require__.d(__webpack_exports__, "isEmpty", function() { return /* reexport */ isEmpty; });
__webpack_require__.d(__webpack_exports__, "last", function() { return /* reexport */ last; });
__webpack_require__.d(__webpack_exports__, "map", function() { return /* reexport */ map["a" /* map */]; });
__webpack_require__.d(__webpack_exports__, "mapTo", function() { return /* reexport */ mapTo; });
__webpack_require__.d(__webpack_exports__, "materialize", function() { return /* reexport */ materialize; });
__webpack_require__.d(__webpack_exports__, "max", function() { return /* reexport */ max_max; });
__webpack_require__.d(__webpack_exports__, "merge", function() { return /* reexport */ merge_merge; });
__webpack_require__.d(__webpack_exports__, "mergeAll", function() { return /* reexport */ mergeAll["a" /* mergeAll */]; });
__webpack_require__.d(__webpack_exports__, "mergeMap", function() { return /* reexport */ mergeMap["b" /* mergeMap */]; });
__webpack_require__.d(__webpack_exports__, "flatMap", function() { return /* reexport */ mergeMap["a" /* flatMap */]; });
__webpack_require__.d(__webpack_exports__, "mergeMapTo", function() { return /* reexport */ mergeMapTo; });
__webpack_require__.d(__webpack_exports__, "mergeScan", function() { return /* reexport */ mergeScan; });
__webpack_require__.d(__webpack_exports__, "min", function() { return /* reexport */ min_min; });
__webpack_require__.d(__webpack_exports__, "multicast", function() { return /* reexport */ multicast; });
__webpack_require__.d(__webpack_exports__, "observeOn", function() { return /* reexport */ observeOn["b" /* observeOn */]; });
__webpack_require__.d(__webpack_exports__, "onErrorResumeNext", function() { return /* reexport */ onErrorResumeNext; });
__webpack_require__.d(__webpack_exports__, "pairwise", function() { return /* reexport */ pairwise; });
__webpack_require__.d(__webpack_exports__, "partition", function() { return /* reexport */ partition; });
__webpack_require__.d(__webpack_exports__, "pluck", function() { return /* reexport */ pluck; });
__webpack_require__.d(__webpack_exports__, "publish", function() { return /* reexport */ publish; });
__webpack_require__.d(__webpack_exports__, "publishBehavior", function() { return /* reexport */ publishBehavior; });
__webpack_require__.d(__webpack_exports__, "publishLast", function() { return /* reexport */ publishLast; });
__webpack_require__.d(__webpack_exports__, "publishReplay", function() { return /* reexport */ publishReplay; });
__webpack_require__.d(__webpack_exports__, "race", function() { return /* reexport */ race_race; });
__webpack_require__.d(__webpack_exports__, "reduce", function() { return /* reexport */ reduce; });
__webpack_require__.d(__webpack_exports__, "repeat", function() { return /* reexport */ repeat; });
__webpack_require__.d(__webpack_exports__, "repeatWhen", function() { return /* reexport */ repeatWhen; });
__webpack_require__.d(__webpack_exports__, "retry", function() { return /* reexport */ retry; });
__webpack_require__.d(__webpack_exports__, "retryWhen", function() { return /* reexport */ retryWhen; });
__webpack_require__.d(__webpack_exports__, "refCount", function() { return /* reexport */ operators_refCount["a" /* refCount */]; });
__webpack_require__.d(__webpack_exports__, "sample", function() { return /* reexport */ sample; });
__webpack_require__.d(__webpack_exports__, "sampleTime", function() { return /* reexport */ sampleTime; });
__webpack_require__.d(__webpack_exports__, "scan", function() { return /* reexport */ scan; });
__webpack_require__.d(__webpack_exports__, "sequenceEqual", function() { return /* reexport */ sequenceEqual; });
__webpack_require__.d(__webpack_exports__, "share", function() { return /* reexport */ share; });
__webpack_require__.d(__webpack_exports__, "shareReplay", function() { return /* reexport */ shareReplay; });
__webpack_require__.d(__webpack_exports__, "single", function() { return /* reexport */ single; });
__webpack_require__.d(__webpack_exports__, "skip", function() { return /* reexport */ skip; });
__webpack_require__.d(__webpack_exports__, "skipLast", function() { return /* reexport */ skipLast; });
__webpack_require__.d(__webpack_exports__, "skipUntil", function() { return /* reexport */ skipUntil; });
__webpack_require__.d(__webpack_exports__, "skipWhile", function() { return /* reexport */ skipWhile; });
__webpack_require__.d(__webpack_exports__, "startWith", function() { return /* reexport */ startWith; });
__webpack_require__.d(__webpack_exports__, "subscribeOn", function() { return /* reexport */ subscribeOn; });
__webpack_require__.d(__webpack_exports__, "switchAll", function() { return /* reexport */ switchAll; });
__webpack_require__.d(__webpack_exports__, "switchMap", function() { return /* reexport */ switchMap; });
__webpack_require__.d(__webpack_exports__, "switchMapTo", function() { return /* reexport */ switchMapTo; });
__webpack_require__.d(__webpack_exports__, "take", function() { return /* reexport */ take; });
__webpack_require__.d(__webpack_exports__, "takeLast", function() { return /* reexport */ takeLast; });
__webpack_require__.d(__webpack_exports__, "takeUntil", function() { return /* reexport */ takeUntil; });
__webpack_require__.d(__webpack_exports__, "takeWhile", function() { return /* reexport */ takeWhile; });
__webpack_require__.d(__webpack_exports__, "tap", function() { return /* reexport */ tap; });
__webpack_require__.d(__webpack_exports__, "throttle", function() { return /* reexport */ throttle; });
__webpack_require__.d(__webpack_exports__, "throttleTime", function() { return /* reexport */ throttleTime; });
__webpack_require__.d(__webpack_exports__, "throwIfEmpty", function() { return /* reexport */ throwIfEmpty; });
__webpack_require__.d(__webpack_exports__, "timeInterval", function() { return /* reexport */ timeInterval; });
__webpack_require__.d(__webpack_exports__, "timeout", function() { return /* reexport */ timeout; });
__webpack_require__.d(__webpack_exports__, "timeoutWith", function() { return /* reexport */ timeoutWith; });
__webpack_require__.d(__webpack_exports__, "timestamp", function() { return /* reexport */ timestamp; });
__webpack_require__.d(__webpack_exports__, "toArray", function() { return /* reexport */ toArray; });
__webpack_require__.d(__webpack_exports__, "window", function() { return /* reexport */ window_window; });
__webpack_require__.d(__webpack_exports__, "windowCount", function() { return /* reexport */ windowCount; });
__webpack_require__.d(__webpack_exports__, "windowTime", function() { return /* reexport */ windowTime_windowTime; });
__webpack_require__.d(__webpack_exports__, "windowToggle", function() { return /* reexport */ windowToggle; });
__webpack_require__.d(__webpack_exports__, "windowWhen", function() { return /* reexport */ windowWhen; });
__webpack_require__.d(__webpack_exports__, "withLatestFrom", function() { return /* reexport */ withLatestFrom; });
__webpack_require__.d(__webpack_exports__, "zip", function() { return /* reexport */ zip_zip; });
__webpack_require__.d(__webpack_exports__, "zipAll", function() { return /* reexport */ zipAll; });

// EXTERNAL MODULE: ./node_modules/rxjs/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(1380);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/innerSubscribe.js
var innerSubscribe = __webpack_require__(1383);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/audit.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function audit(durationSelector) {
  return function auditOperatorFunction(source) {
    return source.lift(new AuditOperator(durationSelector));
  };
}

var AuditOperator = /*@__PURE__*/function () {
  function AuditOperator(durationSelector) {
    this.durationSelector = durationSelector;
  }

  AuditOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new audit_AuditSubscriber(subscriber, this.durationSelector));
  };

  return AuditOperator;
}();

var audit_AuditSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](AuditSubscriber, _super);

  function AuditSubscriber(destination, durationSelector) {
    var _this = _super.call(this, destination) || this;

    _this.durationSelector = durationSelector;
    _this.hasValue = false;
    return _this;
  }

  AuditSubscriber.prototype._next = function (value) {
    this.value = value;
    this.hasValue = true;

    if (!this.throttled) {
      var duration = void 0;

      try {
        var durationSelector = this.durationSelector;
        duration = durationSelector(value);
      } catch (err) {
        return this.destination.error(err);
      }

      var innerSubscription = Object(innerSubscribe["c" /* innerSubscribe */])(duration, new innerSubscribe["a" /* SimpleInnerSubscriber */](this));

      if (!innerSubscription || innerSubscription.closed) {
        this.clearThrottle();
      } else {
        this.add(this.throttled = innerSubscription);
      }
    }
  };

  AuditSubscriber.prototype.clearThrottle = function () {
    var _a = this,
        value = _a.value,
        hasValue = _a.hasValue,
        throttled = _a.throttled;

    if (throttled) {
      this.remove(throttled);
      this.throttled = undefined;
      throttled.unsubscribe();
    }

    if (hasValue) {
      this.value = undefined;
      this.hasValue = false;
      this.destination.next(value);
    }
  };

  AuditSubscriber.prototype.notifyNext = function () {
    this.clearThrottle();
  };

  AuditSubscriber.prototype.notifyComplete = function () {
    this.clearThrottle();
  };

  return AuditSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/async.js
var scheduler_async = __webpack_require__(1386);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/timer.js
var timer = __webpack_require__(1478);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/auditTime.js
/** PURE_IMPORTS_START _scheduler_async,_audit,_observable_timer PURE_IMPORTS_END */



function auditTime(duration, scheduler) {
  if (scheduler === void 0) {
    scheduler = scheduler_async["a" /* async */];
  }

  return audit(function () {
    return Object(timer["a" /* timer */])(duration, scheduler);
  });
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/buffer.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function buffer_buffer(closingNotifier) {
  return function bufferOperatorFunction(source) {
    return source.lift(new BufferOperator(closingNotifier));
  };
}

var BufferOperator = /*@__PURE__*/function () {
  function BufferOperator(closingNotifier) {
    this.closingNotifier = closingNotifier;
  }

  BufferOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new buffer_BufferSubscriber(subscriber, this.closingNotifier));
  };

  return BufferOperator;
}();

var buffer_BufferSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](BufferSubscriber, _super);

  function BufferSubscriber(destination, closingNotifier) {
    var _this = _super.call(this, destination) || this;

    _this.buffer = [];

    _this.add(Object(innerSubscribe["c" /* innerSubscribe */])(closingNotifier, new innerSubscribe["a" /* SimpleInnerSubscriber */](_this)));

    return _this;
  }

  BufferSubscriber.prototype._next = function (value) {
    this.buffer.push(value);
  };

  BufferSubscriber.prototype.notifyNext = function () {
    var buffer = this.buffer;
    this.buffer = [];
    this.destination.next(buffer);
  };

  return BufferSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscriber.js
var Subscriber = __webpack_require__(1381);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/bufferCount.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function bufferCount(bufferSize, startBufferEvery) {
  if (startBufferEvery === void 0) {
    startBufferEvery = null;
  }

  return function bufferCountOperatorFunction(source) {
    return source.lift(new BufferCountOperator(bufferSize, startBufferEvery));
  };
}

var BufferCountOperator = /*@__PURE__*/function () {
  function BufferCountOperator(bufferSize, startBufferEvery) {
    this.bufferSize = bufferSize;
    this.startBufferEvery = startBufferEvery;

    if (!startBufferEvery || bufferSize === startBufferEvery) {
      this.subscriberClass = bufferCount_BufferCountSubscriber;
    } else {
      this.subscriberClass = bufferCount_BufferSkipCountSubscriber;
    }
  }

  BufferCountOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
  };

  return BufferCountOperator;
}();

var bufferCount_BufferCountSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](BufferCountSubscriber, _super);

  function BufferCountSubscriber(destination, bufferSize) {
    var _this = _super.call(this, destination) || this;

    _this.bufferSize = bufferSize;
    _this.buffer = [];
    return _this;
  }

  BufferCountSubscriber.prototype._next = function (value) {
    var buffer = this.buffer;
    buffer.push(value);

    if (buffer.length == this.bufferSize) {
      this.destination.next(buffer);
      this.buffer = [];
    }
  };

  BufferCountSubscriber.prototype._complete = function () {
    var buffer = this.buffer;

    if (buffer.length > 0) {
      this.destination.next(buffer);
    }

    _super.prototype._complete.call(this);
  };

  return BufferCountSubscriber;
}(Subscriber["a" /* Subscriber */]);

var bufferCount_BufferSkipCountSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](BufferSkipCountSubscriber, _super);

  function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
    var _this = _super.call(this, destination) || this;

    _this.bufferSize = bufferSize;
    _this.startBufferEvery = startBufferEvery;
    _this.buffers = [];
    _this.count = 0;
    return _this;
  }

  BufferSkipCountSubscriber.prototype._next = function (value) {
    var _a = this,
        bufferSize = _a.bufferSize,
        startBufferEvery = _a.startBufferEvery,
        buffers = _a.buffers,
        count = _a.count;

    this.count++;

    if (count % startBufferEvery === 0) {
      buffers.push([]);
    }

    for (var i = buffers.length; i--;) {
      var buffer = buffers[i];
      buffer.push(value);

      if (buffer.length === bufferSize) {
        buffers.splice(i, 1);
        this.destination.next(buffer);
      }
    }
  };

  BufferSkipCountSubscriber.prototype._complete = function () {
    var _a = this,
        buffers = _a.buffers,
        destination = _a.destination;

    while (buffers.length > 0) {
      var buffer = buffers.shift();

      if (buffer.length > 0) {
        destination.next(buffer);
      }
    }

    _super.prototype._complete.call(this);
  };

  return BufferSkipCountSubscriber;
}(Subscriber["a" /* Subscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isScheduler.js
var isScheduler = __webpack_require__(1392);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/bufferTime.js
/** PURE_IMPORTS_START tslib,_scheduler_async,_Subscriber,_util_isScheduler PURE_IMPORTS_END */




function bufferTime(bufferTimeSpan) {
  var length = arguments.length;
  var scheduler = scheduler_async["a" /* async */];

  if (Object(isScheduler["a" /* isScheduler */])(arguments[arguments.length - 1])) {
    scheduler = arguments[arguments.length - 1];
    length--;
  }

  var bufferCreationInterval = null;

  if (length >= 2) {
    bufferCreationInterval = arguments[1];
  }

  var maxBufferSize = Number.POSITIVE_INFINITY;

  if (length >= 3) {
    maxBufferSize = arguments[2];
  }

  return function bufferTimeOperatorFunction(source) {
    return source.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
  };
}

var BufferTimeOperator = /*@__PURE__*/function () {
  function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
    this.bufferTimeSpan = bufferTimeSpan;
    this.bufferCreationInterval = bufferCreationInterval;
    this.maxBufferSize = maxBufferSize;
    this.scheduler = scheduler;
  }

  BufferTimeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new bufferTime_BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
  };

  return BufferTimeOperator;
}();

var Context = /*@__PURE__*/function () {
  function Context() {
    this.buffer = [];
  }

  return Context;
}();

var bufferTime_BufferTimeSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](BufferTimeSubscriber, _super);

  function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.bufferTimeSpan = bufferTimeSpan;
    _this.bufferCreationInterval = bufferCreationInterval;
    _this.maxBufferSize = maxBufferSize;
    _this.scheduler = scheduler;
    _this.contexts = [];

    var context = _this.openContext();

    _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;

    if (_this.timespanOnly) {
      var timeSpanOnlyState = {
        subscriber: _this,
        context: context,
        bufferTimeSpan: bufferTimeSpan
      };

      _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
    } else {
      var closeState = {
        subscriber: _this,
        context: context
      };
      var creationState = {
        bufferTimeSpan: bufferTimeSpan,
        bufferCreationInterval: bufferCreationInterval,
        subscriber: _this,
        scheduler: scheduler
      };

      _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));

      _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
    }

    return _this;
  }

  BufferTimeSubscriber.prototype._next = function (value) {
    var contexts = this.contexts;
    var len = contexts.length;
    var filledBufferContext;

    for (var i = 0; i < len; i++) {
      var context_1 = contexts[i];
      var buffer = context_1.buffer;
      buffer.push(value);

      if (buffer.length == this.maxBufferSize) {
        filledBufferContext = context_1;
      }
    }

    if (filledBufferContext) {
      this.onBufferFull(filledBufferContext);
    }
  };

  BufferTimeSubscriber.prototype._error = function (err) {
    this.contexts.length = 0;

    _super.prototype._error.call(this, err);
  };

  BufferTimeSubscriber.prototype._complete = function () {
    var _a = this,
        contexts = _a.contexts,
        destination = _a.destination;

    while (contexts.length > 0) {
      var context_2 = contexts.shift();
      destination.next(context_2.buffer);
    }

    _super.prototype._complete.call(this);
  };

  BufferTimeSubscriber.prototype._unsubscribe = function () {
    this.contexts = null;
  };

  BufferTimeSubscriber.prototype.onBufferFull = function (context) {
    this.closeContext(context);
    var closeAction = context.closeAction;
    closeAction.unsubscribe();
    this.remove(closeAction);

    if (!this.closed && this.timespanOnly) {
      context = this.openContext();
      var bufferTimeSpan = this.bufferTimeSpan;
      var timeSpanOnlyState = {
        subscriber: this,
        context: context,
        bufferTimeSpan: bufferTimeSpan
      };
      this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
    }
  };

  BufferTimeSubscriber.prototype.openContext = function () {
    var context = new Context();
    this.contexts.push(context);
    return context;
  };

  BufferTimeSubscriber.prototype.closeContext = function (context) {
    this.destination.next(context.buffer);
    var contexts = this.contexts;
    var spliceIndex = contexts ? contexts.indexOf(context) : -1;

    if (spliceIndex >= 0) {
      contexts.splice(contexts.indexOf(context), 1);
    }
  };

  return BufferTimeSubscriber;
}(Subscriber["a" /* Subscriber */]);

function dispatchBufferTimeSpanOnly(state) {
  var subscriber = state.subscriber;
  var prevContext = state.context;

  if (prevContext) {
    subscriber.closeContext(prevContext);
  }

  if (!subscriber.closed) {
    state.context = subscriber.openContext();
    state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
  }
}

function dispatchBufferCreation(state) {
  var bufferCreationInterval = state.bufferCreationInterval,
      bufferTimeSpan = state.bufferTimeSpan,
      subscriber = state.subscriber,
      scheduler = state.scheduler;
  var context = subscriber.openContext();
  var action = this;

  if (!subscriber.closed) {
    subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, {
      subscriber: subscriber,
      context: context
    }));
    action.schedule(state, bufferCreationInterval);
  }
}

function dispatchBufferClose(arg) {
  var subscriber = arg.subscriber,
      context = arg.context;
  subscriber.closeContext(context);
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscription.js
var Subscription = __webpack_require__(1384);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js + 1 modules
var subscribeToResult = __webpack_require__(1406);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/OuterSubscriber.js
var OuterSubscriber = __webpack_require__(1397);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/bufferToggle.js
/** PURE_IMPORTS_START tslib,_Subscription,_util_subscribeToResult,_OuterSubscriber PURE_IMPORTS_END */




function bufferToggle(openings, closingSelector) {
  return function bufferToggleOperatorFunction(source) {
    return source.lift(new BufferToggleOperator(openings, closingSelector));
  };
}

var BufferToggleOperator = /*@__PURE__*/function () {
  function BufferToggleOperator(openings, closingSelector) {
    this.openings = openings;
    this.closingSelector = closingSelector;
  }

  BufferToggleOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new bufferToggle_BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
  };

  return BufferToggleOperator;
}();

var bufferToggle_BufferToggleSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](BufferToggleSubscriber, _super);

  function BufferToggleSubscriber(destination, openings, closingSelector) {
    var _this = _super.call(this, destination) || this;

    _this.closingSelector = closingSelector;
    _this.contexts = [];

    _this.add(Object(subscribeToResult["a" /* subscribeToResult */])(_this, openings));

    return _this;
  }

  BufferToggleSubscriber.prototype._next = function (value) {
    var contexts = this.contexts;
    var len = contexts.length;

    for (var i = 0; i < len; i++) {
      contexts[i].buffer.push(value);
    }
  };

  BufferToggleSubscriber.prototype._error = function (err) {
    var contexts = this.contexts;

    while (contexts.length > 0) {
      var context_1 = contexts.shift();
      context_1.subscription.unsubscribe();
      context_1.buffer = null;
      context_1.subscription = null;
    }

    this.contexts = null;

    _super.prototype._error.call(this, err);
  };

  BufferToggleSubscriber.prototype._complete = function () {
    var contexts = this.contexts;

    while (contexts.length > 0) {
      var context_2 = contexts.shift();
      this.destination.next(context_2.buffer);
      context_2.subscription.unsubscribe();
      context_2.buffer = null;
      context_2.subscription = null;
    }

    this.contexts = null;

    _super.prototype._complete.call(this);
  };

  BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue) {
    outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
  };

  BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
    this.closeBuffer(innerSub.context);
  };

  BufferToggleSubscriber.prototype.openBuffer = function (value) {
    try {
      var closingSelector = this.closingSelector;
      var closingNotifier = closingSelector.call(this, value);

      if (closingNotifier) {
        this.trySubscribe(closingNotifier);
      }
    } catch (err) {
      this._error(err);
    }
  };

  BufferToggleSubscriber.prototype.closeBuffer = function (context) {
    var contexts = this.contexts;

    if (contexts && context) {
      var buffer = context.buffer,
          subscription = context.subscription;
      this.destination.next(buffer);
      contexts.splice(contexts.indexOf(context), 1);
      this.remove(subscription);
      subscription.unsubscribe();
    }
  };

  BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
    var contexts = this.contexts;
    var buffer = [];
    var subscription = new Subscription["a" /* Subscription */]();
    var context = {
      buffer: buffer,
      subscription: subscription
    };
    contexts.push(context);
    var innerSubscription = Object(subscribeToResult["a" /* subscribeToResult */])(this, closingNotifier, context);

    if (!innerSubscription || innerSubscription.closed) {
      this.closeBuffer(context);
    } else {
      innerSubscription.context = context;
      this.add(innerSubscription);
      subscription.add(innerSubscription);
    }
  };

  return BufferToggleSubscriber;
}(OuterSubscriber["a" /* OuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/bufferWhen.js
/** PURE_IMPORTS_START tslib,_Subscription,_innerSubscribe PURE_IMPORTS_END */



function bufferWhen(closingSelector) {
  return function (source) {
    return source.lift(new BufferWhenOperator(closingSelector));
  };
}

var BufferWhenOperator = /*@__PURE__*/function () {
  function BufferWhenOperator(closingSelector) {
    this.closingSelector = closingSelector;
  }

  BufferWhenOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new bufferWhen_BufferWhenSubscriber(subscriber, this.closingSelector));
  };

  return BufferWhenOperator;
}();

var bufferWhen_BufferWhenSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](BufferWhenSubscriber, _super);

  function BufferWhenSubscriber(destination, closingSelector) {
    var _this = _super.call(this, destination) || this;

    _this.closingSelector = closingSelector;
    _this.subscribing = false;

    _this.openBuffer();

    return _this;
  }

  BufferWhenSubscriber.prototype._next = function (value) {
    this.buffer.push(value);
  };

  BufferWhenSubscriber.prototype._complete = function () {
    var buffer = this.buffer;

    if (buffer) {
      this.destination.next(buffer);
    }

    _super.prototype._complete.call(this);
  };

  BufferWhenSubscriber.prototype._unsubscribe = function () {
    this.buffer = undefined;
    this.subscribing = false;
  };

  BufferWhenSubscriber.prototype.notifyNext = function () {
    this.openBuffer();
  };

  BufferWhenSubscriber.prototype.notifyComplete = function () {
    if (this.subscribing) {
      this.complete();
    } else {
      this.openBuffer();
    }
  };

  BufferWhenSubscriber.prototype.openBuffer = function () {
    var closingSubscription = this.closingSubscription;

    if (closingSubscription) {
      this.remove(closingSubscription);
      closingSubscription.unsubscribe();
    }

    var buffer = this.buffer;

    if (this.buffer) {
      this.destination.next(buffer);
    }

    this.buffer = [];
    var closingNotifier;

    try {
      var closingSelector = this.closingSelector;
      closingNotifier = closingSelector();
    } catch (err) {
      return this.error(err);
    }

    closingSubscription = new Subscription["a" /* Subscription */]();
    this.closingSubscription = closingSubscription;
    this.add(closingSubscription);
    this.subscribing = true;
    closingSubscription.add(Object(innerSubscribe["c" /* innerSubscribe */])(closingNotifier, new innerSubscribe["a" /* SimpleInnerSubscriber */](this)));
    this.subscribing = false;
  };

  return BufferWhenSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/catchError.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function catchError(selector) {
  return function catchErrorOperatorFunction(source) {
    var operator = new CatchOperator(selector);
    var caught = source.lift(operator);
    return operator.caught = caught;
  };
}

var CatchOperator = /*@__PURE__*/function () {
  function CatchOperator(selector) {
    this.selector = selector;
  }

  CatchOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new catchError_CatchSubscriber(subscriber, this.selector, this.caught));
  };

  return CatchOperator;
}();

var catchError_CatchSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](CatchSubscriber, _super);

  function CatchSubscriber(destination, selector, caught) {
    var _this = _super.call(this, destination) || this;

    _this.selector = selector;
    _this.caught = caught;
    return _this;
  }

  CatchSubscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      var result = void 0;

      try {
        result = this.selector(err, this.caught);
      } catch (err2) {
        _super.prototype.error.call(this, err2);

        return;
      }

      this._unsubscribeAndRecycle();

      var innerSubscriber = new innerSubscribe["a" /* SimpleInnerSubscriber */](this);
      this.add(innerSubscriber);
      var innerSubscription = Object(innerSubscribe["c" /* innerSubscribe */])(result, innerSubscriber);

      if (innerSubscription !== innerSubscriber) {
        this.add(innerSubscription);
      }
    }
  };

  return CatchSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/combineLatest.js
var combineLatest = __webpack_require__(1443);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/combineAll.js
/** PURE_IMPORTS_START _observable_combineLatest PURE_IMPORTS_END */

function combineAll(project) {
  return function (source) {
    return source.lift(new combineLatest["a" /* CombineLatestOperator */](project));
  };
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isArray.js
var isArray = __webpack_require__(1387);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/from.js
var from = __webpack_require__(1391);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/combineLatest.js
/** PURE_IMPORTS_START _util_isArray,_observable_combineLatest,_observable_from PURE_IMPORTS_END */



var none = {};
function combineLatest_combineLatest() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  var project = null;

  if (typeof observables[observables.length - 1] === 'function') {
    project = observables.pop();
  }

  if (observables.length === 1 && Object(isArray["a" /* isArray */])(observables[0])) {
    observables = observables[0].slice();
  }

  return function (source) {
    return source.lift.call(Object(from["a" /* from */])([source].concat(observables)), new combineLatest["a" /* CombineLatestOperator */](project));
  };
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/concat.js
var concat = __webpack_require__(1423);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/concat.js
/** PURE_IMPORTS_START _observable_concat PURE_IMPORTS_END */

function concat_concat() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  return function (source) {
    return source.lift.call(concat["a" /* concat */].apply(void 0, [source].concat(observables)));
  };
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/concatAll.js
var concatAll = __webpack_require__(1475);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeMap.js
var mergeMap = __webpack_require__(1410);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/concatMap.js
/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

function concatMap(project, resultSelector) {
  return Object(mergeMap["b" /* mergeMap */])(project, resultSelector, 1);
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/concatMapTo.js
/** PURE_IMPORTS_START _concatMap PURE_IMPORTS_END */

function concatMapTo(innerObservable, resultSelector) {
  return concatMap(function () {
    return innerObservable;
  }, resultSelector);
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/count.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function count_count(predicate) {
  return function (source) {
    return source.lift(new CountOperator(predicate, source));
  };
}

var CountOperator = /*@__PURE__*/function () {
  function CountOperator(predicate, source) {
    this.predicate = predicate;
    this.source = source;
  }

  CountOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new count_CountSubscriber(subscriber, this.predicate, this.source));
  };

  return CountOperator;
}();

var count_CountSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](CountSubscriber, _super);

  function CountSubscriber(destination, predicate, source) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.source = source;
    _this.count = 0;
    _this.index = 0;
    return _this;
  }

  CountSubscriber.prototype._next = function (value) {
    if (this.predicate) {
      this._tryPredicate(value);
    } else {
      this.count++;
    }
  };

  CountSubscriber.prototype._tryPredicate = function (value) {
    var result;

    try {
      result = this.predicate(value, this.index++, this.source);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    if (result) {
      this.count++;
    }
  };

  CountSubscriber.prototype._complete = function () {
    this.destination.next(this.count);
    this.destination.complete();
  };

  return CountSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/debounce.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function debounce(durationSelector) {
  return function (source) {
    return source.lift(new DebounceOperator(durationSelector));
  };
}

var DebounceOperator = /*@__PURE__*/function () {
  function DebounceOperator(durationSelector) {
    this.durationSelector = durationSelector;
  }

  DebounceOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new debounce_DebounceSubscriber(subscriber, this.durationSelector));
  };

  return DebounceOperator;
}();

var debounce_DebounceSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](DebounceSubscriber, _super);

  function DebounceSubscriber(destination, durationSelector) {
    var _this = _super.call(this, destination) || this;

    _this.durationSelector = durationSelector;
    _this.hasValue = false;
    return _this;
  }

  DebounceSubscriber.prototype._next = function (value) {
    try {
      var result = this.durationSelector.call(this, value);

      if (result) {
        this._tryNext(value, result);
      }
    } catch (err) {
      this.destination.error(err);
    }
  };

  DebounceSubscriber.prototype._complete = function () {
    this.emitValue();
    this.destination.complete();
  };

  DebounceSubscriber.prototype._tryNext = function (value, duration) {
    var subscription = this.durationSubscription;
    this.value = value;
    this.hasValue = true;

    if (subscription) {
      subscription.unsubscribe();
      this.remove(subscription);
    }

    subscription = Object(innerSubscribe["c" /* innerSubscribe */])(duration, new innerSubscribe["a" /* SimpleInnerSubscriber */](this));

    if (subscription && !subscription.closed) {
      this.add(this.durationSubscription = subscription);
    }
  };

  DebounceSubscriber.prototype.notifyNext = function () {
    this.emitValue();
  };

  DebounceSubscriber.prototype.notifyComplete = function () {
    this.emitValue();
  };

  DebounceSubscriber.prototype.emitValue = function () {
    if (this.hasValue) {
      var value = this.value;
      var subscription = this.durationSubscription;

      if (subscription) {
        this.durationSubscription = undefined;
        subscription.unsubscribe();
        this.remove(subscription);
      }

      this.value = undefined;
      this.hasValue = false;

      _super.prototype._next.call(this, value);
    }
  };

  return DebounceSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/debounceTime.js
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */



function debounceTime(dueTime, scheduler) {
  if (scheduler === void 0) {
    scheduler = scheduler_async["a" /* async */];
  }

  return function (source) {
    return source.lift(new DebounceTimeOperator(dueTime, scheduler));
  };
}

var DebounceTimeOperator = /*@__PURE__*/function () {
  function DebounceTimeOperator(dueTime, scheduler) {
    this.dueTime = dueTime;
    this.scheduler = scheduler;
  }

  DebounceTimeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new debounceTime_DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
  };

  return DebounceTimeOperator;
}();

var debounceTime_DebounceTimeSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](DebounceTimeSubscriber, _super);

  function DebounceTimeSubscriber(destination, dueTime, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.dueTime = dueTime;
    _this.scheduler = scheduler;
    _this.debouncedSubscription = null;
    _this.lastValue = null;
    _this.hasValue = false;
    return _this;
  }

  DebounceTimeSubscriber.prototype._next = function (value) {
    this.clearDebounce();
    this.lastValue = value;
    this.hasValue = true;
    this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
  };

  DebounceTimeSubscriber.prototype._complete = function () {
    this.debouncedNext();
    this.destination.complete();
  };

  DebounceTimeSubscriber.prototype.debouncedNext = function () {
    this.clearDebounce();

    if (this.hasValue) {
      var lastValue = this.lastValue;
      this.lastValue = null;
      this.hasValue = false;
      this.destination.next(lastValue);
    }
  };

  DebounceTimeSubscriber.prototype.clearDebounce = function () {
    var debouncedSubscription = this.debouncedSubscription;

    if (debouncedSubscription !== null) {
      this.remove(debouncedSubscription);
      debouncedSubscription.unsubscribe();
      this.debouncedSubscription = null;
    }
  };

  return DebounceTimeSubscriber;
}(Subscriber["a" /* Subscriber */]);

function dispatchNext(subscriber) {
  subscriber.debouncedNext();
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/defaultIfEmpty.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function defaultIfEmpty(defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = null;
  }

  return function (source) {
    return source.lift(new DefaultIfEmptyOperator(defaultValue));
  };
}

var DefaultIfEmptyOperator = /*@__PURE__*/function () {
  function DefaultIfEmptyOperator(defaultValue) {
    this.defaultValue = defaultValue;
  }

  DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new defaultIfEmpty_DefaultIfEmptySubscriber(subscriber, this.defaultValue));
  };

  return DefaultIfEmptyOperator;
}();

var defaultIfEmpty_DefaultIfEmptySubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](DefaultIfEmptySubscriber, _super);

  function DefaultIfEmptySubscriber(destination, defaultValue) {
    var _this = _super.call(this, destination) || this;

    _this.defaultValue = defaultValue;
    _this.isEmpty = true;
    return _this;
  }

  DefaultIfEmptySubscriber.prototype._next = function (value) {
    this.isEmpty = false;
    this.destination.next(value);
  };

  DefaultIfEmptySubscriber.prototype._complete = function () {
    if (this.isEmpty) {
      this.destination.next(this.defaultValue);
    }

    this.destination.complete();
  };

  return DefaultIfEmptySubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isDate.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isDate(value) {
  return value instanceof Date && !isNaN(+value);
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Notification.js
var Notification = __webpack_require__(1407);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/delay.js
/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_Subscriber,_Notification PURE_IMPORTS_END */





function delay_delay(delay, scheduler) {
  if (scheduler === void 0) {
    scheduler = scheduler_async["a" /* async */];
  }

  var absoluteDelay = isDate(delay);
  var delayFor = absoluteDelay ? +delay - scheduler.now() : Math.abs(delay);
  return function (source) {
    return source.lift(new DelayOperator(delayFor, scheduler));
  };
}

var DelayOperator = /*@__PURE__*/function () {
  function DelayOperator(delay, scheduler) {
    this.delay = delay;
    this.scheduler = scheduler;
  }

  DelayOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new delay_DelaySubscriber(subscriber, this.delay, this.scheduler));
  };

  return DelayOperator;
}();

var delay_DelaySubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](DelaySubscriber, _super);

  function DelaySubscriber(destination, delay, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.delay = delay;
    _this.scheduler = scheduler;
    _this.queue = [];
    _this.active = false;
    _this.errored = false;
    return _this;
  }

  DelaySubscriber.dispatch = function (state) {
    var source = state.source;
    var queue = source.queue;
    var scheduler = state.scheduler;
    var destination = state.destination;

    while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
      queue.shift().notification.observe(destination);
    }

    if (queue.length > 0) {
      var delay_1 = Math.max(0, queue[0].time - scheduler.now());
      this.schedule(state, delay_1);
    } else {
      this.unsubscribe();
      source.active = false;
    }
  };

  DelaySubscriber.prototype._schedule = function (scheduler) {
    this.active = true;
    var destination = this.destination;
    destination.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
      source: this,
      destination: this.destination,
      scheduler: scheduler
    }));
  };

  DelaySubscriber.prototype.scheduleNotification = function (notification) {
    if (this.errored === true) {
      return;
    }

    var scheduler = this.scheduler;
    var message = new DelayMessage(scheduler.now() + this.delay, notification);
    this.queue.push(message);

    if (this.active === false) {
      this._schedule(scheduler);
    }
  };

  DelaySubscriber.prototype._next = function (value) {
    this.scheduleNotification(Notification["a" /* Notification */].createNext(value));
  };

  DelaySubscriber.prototype._error = function (err) {
    this.errored = true;
    this.queue = [];
    this.destination.error(err);
    this.unsubscribe();
  };

  DelaySubscriber.prototype._complete = function () {
    this.scheduleNotification(Notification["a" /* Notification */].createComplete());
    this.unsubscribe();
  };

  return DelaySubscriber;
}(Subscriber["a" /* Subscriber */]);

var DelayMessage = /*@__PURE__*/function () {
  function DelayMessage(time, notification) {
    this.time = time;
    this.notification = notification;
  }

  return DelayMessage;
}();
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js + 1 modules
var Observable = __webpack_require__(1382);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/delayWhen.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function delayWhen(delayDurationSelector, subscriptionDelay) {
  if (subscriptionDelay) {
    return function (source) {
      return new delayWhen_SubscriptionDelayObservable(source, subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));
    };
  }

  return function (source) {
    return source.lift(new DelayWhenOperator(delayDurationSelector));
  };
}

var DelayWhenOperator = /*@__PURE__*/function () {
  function DelayWhenOperator(delayDurationSelector) {
    this.delayDurationSelector = delayDurationSelector;
  }

  DelayWhenOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new delayWhen_DelayWhenSubscriber(subscriber, this.delayDurationSelector));
  };

  return DelayWhenOperator;
}();

var delayWhen_DelayWhenSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](DelayWhenSubscriber, _super);

  function DelayWhenSubscriber(destination, delayDurationSelector) {
    var _this = _super.call(this, destination) || this;

    _this.delayDurationSelector = delayDurationSelector;
    _this.completed = false;
    _this.delayNotifierSubscriptions = [];
    _this.index = 0;
    return _this;
  }

  DelayWhenSubscriber.prototype.notifyNext = function (outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
    this.destination.next(outerValue);
    this.removeSubscription(innerSub);
    this.tryComplete();
  };

  DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
    this._error(error);
  };

  DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
    var value = this.removeSubscription(innerSub);

    if (value) {
      this.destination.next(value);
    }

    this.tryComplete();
  };

  DelayWhenSubscriber.prototype._next = function (value) {
    var index = this.index++;

    try {
      var delayNotifier = this.delayDurationSelector(value, index);

      if (delayNotifier) {
        this.tryDelay(delayNotifier, value);
      }
    } catch (err) {
      this.destination.error(err);
    }
  };

  DelayWhenSubscriber.prototype._complete = function () {
    this.completed = true;
    this.tryComplete();
    this.unsubscribe();
  };

  DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
    subscription.unsubscribe();
    var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);

    if (subscriptionIdx !== -1) {
      this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
    }

    return subscription.outerValue;
  };

  DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
    var notifierSubscription = Object(subscribeToResult["a" /* subscribeToResult */])(this, delayNotifier, value);

    if (notifierSubscription && !notifierSubscription.closed) {
      var destination = this.destination;
      destination.add(notifierSubscription);
      this.delayNotifierSubscriptions.push(notifierSubscription);
    }
  };

  DelayWhenSubscriber.prototype.tryComplete = function () {
    if (this.completed && this.delayNotifierSubscriptions.length === 0) {
      this.destination.complete();
    }
  };

  return DelayWhenSubscriber;
}(OuterSubscriber["a" /* OuterSubscriber */]);

var delayWhen_SubscriptionDelayObservable = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SubscriptionDelayObservable, _super);

  function SubscriptionDelayObservable(source, subscriptionDelay) {
    var _this = _super.call(this) || this;

    _this.source = source;
    _this.subscriptionDelay = subscriptionDelay;
    return _this;
  }

  SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
    this.subscriptionDelay.subscribe(new delayWhen_SubscriptionDelaySubscriber(subscriber, this.source));
  };

  return SubscriptionDelayObservable;
}(Observable["a" /* Observable */]);

var delayWhen_SubscriptionDelaySubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SubscriptionDelaySubscriber, _super);

  function SubscriptionDelaySubscriber(parent, source) {
    var _this = _super.call(this) || this;

    _this.parent = parent;
    _this.source = source;
    _this.sourceSubscribed = false;
    return _this;
  }

  SubscriptionDelaySubscriber.prototype._next = function (unused) {
    this.subscribeToSource();
  };

  SubscriptionDelaySubscriber.prototype._error = function (err) {
    this.unsubscribe();
    this.parent.error(err);
  };

  SubscriptionDelaySubscriber.prototype._complete = function () {
    this.unsubscribe();
    this.subscribeToSource();
  };

  SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
    if (!this.sourceSubscribed) {
      this.sourceSubscribed = true;
      this.unsubscribe();
      this.source.subscribe(this.parent);
    }
  };

  return SubscriptionDelaySubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/dematerialize.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function dematerialize() {
  return function dematerializeOperatorFunction(source) {
    return source.lift(new DeMaterializeOperator());
  };
}

var DeMaterializeOperator = /*@__PURE__*/function () {
  function DeMaterializeOperator() {}

  DeMaterializeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new dematerialize_DeMaterializeSubscriber(subscriber));
  };

  return DeMaterializeOperator;
}();

var dematerialize_DeMaterializeSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](DeMaterializeSubscriber, _super);

  function DeMaterializeSubscriber(destination) {
    return _super.call(this, destination) || this;
  }

  DeMaterializeSubscriber.prototype._next = function (value) {
    value.observe(this.destination);
  };

  return DeMaterializeSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/distinct.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function distinct(keySelector, flushes) {
  return function (source) {
    return source.lift(new DistinctOperator(keySelector, flushes));
  };
}

var DistinctOperator = /*@__PURE__*/function () {
  function DistinctOperator(keySelector, flushes) {
    this.keySelector = keySelector;
    this.flushes = flushes;
  }

  DistinctOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new distinct_DistinctSubscriber(subscriber, this.keySelector, this.flushes));
  };

  return DistinctOperator;
}();

var distinct_DistinctSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](DistinctSubscriber, _super);

  function DistinctSubscriber(destination, keySelector, flushes) {
    var _this = _super.call(this, destination) || this;

    _this.keySelector = keySelector;
    _this.values = new Set();

    if (flushes) {
      _this.add(Object(innerSubscribe["c" /* innerSubscribe */])(flushes, new innerSubscribe["a" /* SimpleInnerSubscriber */](_this)));
    }

    return _this;
  }

  DistinctSubscriber.prototype.notifyNext = function () {
    this.values.clear();
  };

  DistinctSubscriber.prototype.notifyError = function (error) {
    this._error(error);
  };

  DistinctSubscriber.prototype._next = function (value) {
    if (this.keySelector) {
      this._useKeySelector(value);
    } else {
      this._finalizeNext(value, value);
    }
  };

  DistinctSubscriber.prototype._useKeySelector = function (value) {
    var key;
    var destination = this.destination;

    try {
      key = this.keySelector(value);
    } catch (err) {
      destination.error(err);
      return;
    }

    this._finalizeNext(key, value);
  };

  DistinctSubscriber.prototype._finalizeNext = function (key, value) {
    var values = this.values;

    if (!values.has(key)) {
      values.add(key);
      this.destination.next(value);
    }
  };

  return DistinctSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);


// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/distinctUntilChanged.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function distinctUntilChanged(compare, keySelector) {
  return function (source) {
    return source.lift(new DistinctUntilChangedOperator(compare, keySelector));
  };
}

var DistinctUntilChangedOperator = /*@__PURE__*/function () {
  function DistinctUntilChangedOperator(compare, keySelector) {
    this.compare = compare;
    this.keySelector = keySelector;
  }

  DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new distinctUntilChanged_DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
  };

  return DistinctUntilChangedOperator;
}();

var distinctUntilChanged_DistinctUntilChangedSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](DistinctUntilChangedSubscriber, _super);

  function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
    var _this = _super.call(this, destination) || this;

    _this.keySelector = keySelector;
    _this.hasKey = false;

    if (typeof compare === 'function') {
      _this.compare = compare;
    }

    return _this;
  }

  DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
    return x === y;
  };

  DistinctUntilChangedSubscriber.prototype._next = function (value) {
    var key;

    try {
      var keySelector = this.keySelector;
      key = keySelector ? keySelector(value) : value;
    } catch (err) {
      return this.destination.error(err);
    }

    var result = false;

    if (this.hasKey) {
      try {
        var compare = this.compare;
        result = compare(this.key, key);
      } catch (err) {
        return this.destination.error(err);
      }
    } else {
      this.hasKey = true;
    }

    if (!result) {
      this.key = key;
      this.destination.next(value);
    }
  };

  return DistinctUntilChangedSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/distinctUntilKeyChanged.js
/** PURE_IMPORTS_START _distinctUntilChanged PURE_IMPORTS_END */

function distinctUntilKeyChanged(key, compare) {
  return distinctUntilChanged(function (x, y) {
    return compare ? compare(x[key], y[key]) : x[key] === y[key];
  });
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js
var ArgumentOutOfRangeError = __webpack_require__(1408);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/filter.js
var filter = __webpack_require__(1398);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/EmptyError.js
var EmptyError = __webpack_require__(1409);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/throwIfEmpty.js
/** PURE_IMPORTS_START tslib,_util_EmptyError,_Subscriber PURE_IMPORTS_END */



function throwIfEmpty(errorFactory) {
  if (errorFactory === void 0) {
    errorFactory = defaultErrorFactory;
  }

  return function (source) {
    return source.lift(new ThrowIfEmptyOperator(errorFactory));
  };
}

var ThrowIfEmptyOperator = /*@__PURE__*/function () {
  function ThrowIfEmptyOperator(errorFactory) {
    this.errorFactory = errorFactory;
  }

  ThrowIfEmptyOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new throwIfEmpty_ThrowIfEmptySubscriber(subscriber, this.errorFactory));
  };

  return ThrowIfEmptyOperator;
}();

var throwIfEmpty_ThrowIfEmptySubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](ThrowIfEmptySubscriber, _super);

  function ThrowIfEmptySubscriber(destination, errorFactory) {
    var _this = _super.call(this, destination) || this;

    _this.errorFactory = errorFactory;
    _this.hasValue = false;
    return _this;
  }

  ThrowIfEmptySubscriber.prototype._next = function (value) {
    this.hasValue = true;
    this.destination.next(value);
  };

  ThrowIfEmptySubscriber.prototype._complete = function () {
    if (!this.hasValue) {
      var err = void 0;

      try {
        err = this.errorFactory();
      } catch (e) {
        err = e;
      }

      this.destination.error(err);
    } else {
      return this.destination.complete();
    }
  };

  return ThrowIfEmptySubscriber;
}(Subscriber["a" /* Subscriber */]);

function defaultErrorFactory() {
  return new EmptyError["a" /* EmptyError */]();
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/empty.js
var empty = __webpack_require__(1389);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/take.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */




function take(count) {
  return function (source) {
    if (count === 0) {
      return Object(empty["b" /* empty */])();
    } else {
      return source.lift(new take_TakeOperator(count));
    }
  };
}

var take_TakeOperator = /*@__PURE__*/function () {
  function TakeOperator(total) {
    this.total = total;

    if (this.total < 0) {
      throw new ArgumentOutOfRangeError["a" /* ArgumentOutOfRangeError */]();
    }
  }

  TakeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new take_TakeSubscriber(subscriber, this.total));
  };

  return TakeOperator;
}();

var take_TakeSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](TakeSubscriber, _super);

  function TakeSubscriber(destination, total) {
    var _this = _super.call(this, destination) || this;

    _this.total = total;
    _this.count = 0;
    return _this;
  }

  TakeSubscriber.prototype._next = function (value) {
    var total = this.total;
    var count = ++this.count;

    if (count <= total) {
      this.destination.next(value);

      if (count === total) {
        this.destination.complete();
        this.unsubscribe();
      }
    }
  };

  return TakeSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/elementAt.js
/** PURE_IMPORTS_START _util_ArgumentOutOfRangeError,_filter,_throwIfEmpty,_defaultIfEmpty,_take PURE_IMPORTS_END */





function elementAt(index, defaultValue) {
  if (index < 0) {
    throw new ArgumentOutOfRangeError["a" /* ArgumentOutOfRangeError */]();
  }

  var hasDefaultValue = arguments.length >= 2;
  return function (source) {
    return source.pipe(Object(filter["a" /* filter */])(function (v, i) {
      return i === index;
    }), take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () {
      return new ArgumentOutOfRangeError["a" /* ArgumentOutOfRangeError */]();
    }));
  };
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/of.js
var of = __webpack_require__(1418);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/endWith.js
/** PURE_IMPORTS_START _observable_concat,_observable_of PURE_IMPORTS_END */


function endWith() {
  var array = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    array[_i] = arguments[_i];
  }

  return function (source) {
    return Object(concat["a" /* concat */])(source, of["a" /* of */].apply(void 0, array));
  };
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/every.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function every(predicate, thisArg) {
  return function (source) {
    return source.lift(new EveryOperator(predicate, thisArg, source));
  };
}

var EveryOperator = /*@__PURE__*/function () {
  function EveryOperator(predicate, thisArg, source) {
    this.predicate = predicate;
    this.thisArg = thisArg;
    this.source = source;
  }

  EveryOperator.prototype.call = function (observer, source) {
    return source.subscribe(new every_EverySubscriber(observer, this.predicate, this.thisArg, this.source));
  };

  return EveryOperator;
}();

var every_EverySubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](EverySubscriber, _super);

  function EverySubscriber(destination, predicate, thisArg, source) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.thisArg = thisArg;
    _this.source = source;
    _this.index = 0;
    _this.thisArg = thisArg || _this;
    return _this;
  }

  EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
    this.destination.next(everyValueMatch);
    this.destination.complete();
  };

  EverySubscriber.prototype._next = function (value) {
    var result = false;

    try {
      result = this.predicate.call(this.thisArg, value, this.index++, this.source);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    if (!result) {
      this.notifyComplete(false);
    }
  };

  EverySubscriber.prototype._complete = function () {
    this.notifyComplete(true);
  };

  return EverySubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/exhaust.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function exhaust() {
  return function (source) {
    return source.lift(new SwitchFirstOperator());
  };
}

var SwitchFirstOperator = /*@__PURE__*/function () {
  function SwitchFirstOperator() {}

  SwitchFirstOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new exhaust_SwitchFirstSubscriber(subscriber));
  };

  return SwitchFirstOperator;
}();

var exhaust_SwitchFirstSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SwitchFirstSubscriber, _super);

  function SwitchFirstSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.hasCompleted = false;
    _this.hasSubscription = false;
    return _this;
  }

  SwitchFirstSubscriber.prototype._next = function (value) {
    if (!this.hasSubscription) {
      this.hasSubscription = true;
      this.add(Object(innerSubscribe["c" /* innerSubscribe */])(value, new innerSubscribe["a" /* SimpleInnerSubscriber */](this)));
    }
  };

  SwitchFirstSubscriber.prototype._complete = function () {
    this.hasCompleted = true;

    if (!this.hasSubscription) {
      this.destination.complete();
    }
  };

  SwitchFirstSubscriber.prototype.notifyComplete = function () {
    this.hasSubscription = false;

    if (this.hasCompleted) {
      this.destination.complete();
    }
  };

  return SwitchFirstSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/map.js
var map = __webpack_require__(1388);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/exhaustMap.js
/** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */




function exhaustMap(project, resultSelector) {
  if (resultSelector) {
    return function (source) {
      return source.pipe(exhaustMap(function (a, i) {
        return Object(from["a" /* from */])(project(a, i)).pipe(Object(map["a" /* map */])(function (b, ii) {
          return resultSelector(a, b, i, ii);
        }));
      }));
    };
  }

  return function (source) {
    return source.lift(new ExhaustMapOperator(project));
  };
}

var ExhaustMapOperator = /*@__PURE__*/function () {
  function ExhaustMapOperator(project) {
    this.project = project;
  }

  ExhaustMapOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new exhaustMap_ExhaustMapSubscriber(subscriber, this.project));
  };

  return ExhaustMapOperator;
}();

var exhaustMap_ExhaustMapSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](ExhaustMapSubscriber, _super);

  function ExhaustMapSubscriber(destination, project) {
    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.hasSubscription = false;
    _this.hasCompleted = false;
    _this.index = 0;
    return _this;
  }

  ExhaustMapSubscriber.prototype._next = function (value) {
    if (!this.hasSubscription) {
      this.tryNext(value);
    }
  };

  ExhaustMapSubscriber.prototype.tryNext = function (value) {
    var result;
    var index = this.index++;

    try {
      result = this.project(value, index);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.hasSubscription = true;

    this._innerSub(result);
  };

  ExhaustMapSubscriber.prototype._innerSub = function (result) {
    var innerSubscriber = new innerSubscribe["a" /* SimpleInnerSubscriber */](this);
    var destination = this.destination;
    destination.add(innerSubscriber);
    var innerSubscription = Object(innerSubscribe["c" /* innerSubscribe */])(result, innerSubscriber);

    if (innerSubscription !== innerSubscriber) {
      destination.add(innerSubscription);
    }
  };

  ExhaustMapSubscriber.prototype._complete = function () {
    this.hasCompleted = true;

    if (!this.hasSubscription) {
      this.destination.complete();
    }

    this.unsubscribe();
  };

  ExhaustMapSubscriber.prototype.notifyNext = function (innerValue) {
    this.destination.next(innerValue);
  };

  ExhaustMapSubscriber.prototype.notifyError = function (err) {
    this.destination.error(err);
  };

  ExhaustMapSubscriber.prototype.notifyComplete = function () {
    this.hasSubscription = false;

    if (this.hasCompleted) {
      this.destination.complete();
    }
  };

  return ExhaustMapSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/expand.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function expand(project, concurrent, scheduler) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }

  concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
  return function (source) {
    return source.lift(new ExpandOperator(project, concurrent, scheduler));
  };
}

var ExpandOperator = /*@__PURE__*/function () {
  function ExpandOperator(project, concurrent, scheduler) {
    this.project = project;
    this.concurrent = concurrent;
    this.scheduler = scheduler;
  }

  ExpandOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new expand_ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
  };

  return ExpandOperator;
}();



var expand_ExpandSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](ExpandSubscriber, _super);

  function ExpandSubscriber(destination, project, concurrent, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.concurrent = concurrent;
    _this.scheduler = scheduler;
    _this.index = 0;
    _this.active = 0;
    _this.hasCompleted = false;

    if (concurrent < Number.POSITIVE_INFINITY) {
      _this.buffer = [];
    }

    return _this;
  }

  ExpandSubscriber.dispatch = function (arg) {
    var subscriber = arg.subscriber,
        result = arg.result,
        value = arg.value,
        index = arg.index;
    subscriber.subscribeToProjection(result, value, index);
  };

  ExpandSubscriber.prototype._next = function (value) {
    var destination = this.destination;

    if (destination.closed) {
      this._complete();

      return;
    }

    var index = this.index++;

    if (this.active < this.concurrent) {
      destination.next(value);

      try {
        var project = this.project;
        var result = project(value, index);

        if (!this.scheduler) {
          this.subscribeToProjection(result, value, index);
        } else {
          var state = {
            subscriber: this,
            result: result,
            value: value,
            index: index
          };
          var destination_1 = this.destination;
          destination_1.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
        }
      } catch (e) {
        destination.error(e);
      }
    } else {
      this.buffer.push(value);
    }
  };

  ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
    this.active++;
    var destination = this.destination;
    destination.add(Object(innerSubscribe["c" /* innerSubscribe */])(result, new innerSubscribe["a" /* SimpleInnerSubscriber */](this)));
  };

  ExpandSubscriber.prototype._complete = function () {
    this.hasCompleted = true;

    if (this.hasCompleted && this.active === 0) {
      this.destination.complete();
    }

    this.unsubscribe();
  };

  ExpandSubscriber.prototype.notifyNext = function (innerValue) {
    this._next(innerValue);
  };

  ExpandSubscriber.prototype.notifyComplete = function () {
    var buffer = this.buffer;
    this.active--;

    if (buffer && buffer.length > 0) {
      this._next(buffer.shift());
    }

    if (this.hasCompleted && this.active === 0) {
      this.destination.complete();
    }
  };

  return ExpandSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);


// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/finalize.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription PURE_IMPORTS_END */



function finalize(callback) {
  return function (source) {
    return source.lift(new FinallyOperator(callback));
  };
}

var FinallyOperator = /*@__PURE__*/function () {
  function FinallyOperator(callback) {
    this.callback = callback;
  }

  FinallyOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new finalize_FinallySubscriber(subscriber, this.callback));
  };

  return FinallyOperator;
}();

var finalize_FinallySubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](FinallySubscriber, _super);

  function FinallySubscriber(destination, callback) {
    var _this = _super.call(this, destination) || this;

    _this.add(new Subscription["a" /* Subscription */](callback));

    return _this;
  }

  return FinallySubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/find.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function find(predicate, thisArg) {
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate is not a function');
  }

  return function (source) {
    return source.lift(new FindValueOperator(predicate, source, false, thisArg));
  };
}

var FindValueOperator = /*@__PURE__*/function () {
  function FindValueOperator(predicate, source, yieldIndex, thisArg) {
    this.predicate = predicate;
    this.source = source;
    this.yieldIndex = yieldIndex;
    this.thisArg = thisArg;
  }

  FindValueOperator.prototype.call = function (observer, source) {
    return source.subscribe(new find_FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
  };

  return FindValueOperator;
}();



var find_FindValueSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](FindValueSubscriber, _super);

  function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.source = source;
    _this.yieldIndex = yieldIndex;
    _this.thisArg = thisArg;
    _this.index = 0;
    return _this;
  }

  FindValueSubscriber.prototype.notifyComplete = function (value) {
    var destination = this.destination;
    destination.next(value);
    destination.complete();
    this.unsubscribe();
  };

  FindValueSubscriber.prototype._next = function (value) {
    var _a = this,
        predicate = _a.predicate,
        thisArg = _a.thisArg;

    var index = this.index++;

    try {
      var result = predicate.call(thisArg || this, value, index, this.source);

      if (result) {
        this.notifyComplete(this.yieldIndex ? index : value);
      }
    } catch (err) {
      this.destination.error(err);
    }
  };

  FindValueSubscriber.prototype._complete = function () {
    this.notifyComplete(this.yieldIndex ? -1 : undefined);
  };

  return FindValueSubscriber;
}(Subscriber["a" /* Subscriber */]);


// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/findIndex.js
/** PURE_IMPORTS_START _operators_find PURE_IMPORTS_END */

function findIndex(predicate, thisArg) {
  return function (source) {
    return source.lift(new FindValueOperator(predicate, source, true, thisArg));
  };
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/identity.js
var identity = __webpack_require__(1394);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/first.js
/** PURE_IMPORTS_START _util_EmptyError,_filter,_take,_defaultIfEmpty,_throwIfEmpty,_util_identity PURE_IMPORTS_END */






function first(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function (source) {
    return source.pipe(predicate ? Object(filter["a" /* filter */])(function (v, i) {
      return predicate(v, i, source);
    }) : identity["a" /* identity */], take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () {
      return new EmptyError["a" /* EmptyError */]();
    }));
  };
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/groupBy.js
var groupBy = __webpack_require__(1439);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/ignoreElements.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function ignoreElements() {
  return function ignoreElementsOperatorFunction(source) {
    return source.lift(new IgnoreElementsOperator());
  };
}

var IgnoreElementsOperator = /*@__PURE__*/function () {
  function IgnoreElementsOperator() {}

  IgnoreElementsOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ignoreElements_IgnoreElementsSubscriber(subscriber));
  };

  return IgnoreElementsOperator;
}();

var ignoreElements_IgnoreElementsSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](IgnoreElementsSubscriber, _super);

  function IgnoreElementsSubscriber() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  IgnoreElementsSubscriber.prototype._next = function (unused) {};

  return IgnoreElementsSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/isEmpty.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function isEmpty() {
  return function (source) {
    return source.lift(new IsEmptyOperator());
  };
}

var IsEmptyOperator = /*@__PURE__*/function () {
  function IsEmptyOperator() {}

  IsEmptyOperator.prototype.call = function (observer, source) {
    return source.subscribe(new isEmpty_IsEmptySubscriber(observer));
  };

  return IsEmptyOperator;
}();

var isEmpty_IsEmptySubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](IsEmptySubscriber, _super);

  function IsEmptySubscriber(destination) {
    return _super.call(this, destination) || this;
  }

  IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
    var destination = this.destination;
    destination.next(isEmpty);
    destination.complete();
  };

  IsEmptySubscriber.prototype._next = function (value) {
    this.notifyComplete(false);
  };

  IsEmptySubscriber.prototype._complete = function () {
    this.notifyComplete(true);
  };

  return IsEmptySubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/takeLast.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */




function takeLast(count) {
  return function takeLastOperatorFunction(source) {
    if (count === 0) {
      return Object(empty["b" /* empty */])();
    } else {
      return source.lift(new takeLast_TakeLastOperator(count));
    }
  };
}

var takeLast_TakeLastOperator = /*@__PURE__*/function () {
  function TakeLastOperator(total) {
    this.total = total;

    if (this.total < 0) {
      throw new ArgumentOutOfRangeError["a" /* ArgumentOutOfRangeError */]();
    }
  }

  TakeLastOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new takeLast_TakeLastSubscriber(subscriber, this.total));
  };

  return TakeLastOperator;
}();

var takeLast_TakeLastSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](TakeLastSubscriber, _super);

  function TakeLastSubscriber(destination, total) {
    var _this = _super.call(this, destination) || this;

    _this.total = total;
    _this.ring = new Array();
    _this.count = 0;
    return _this;
  }

  TakeLastSubscriber.prototype._next = function (value) {
    var ring = this.ring;
    var total = this.total;
    var count = this.count++;

    if (ring.length < total) {
      ring.push(value);
    } else {
      var index = count % total;
      ring[index] = value;
    }
  };

  TakeLastSubscriber.prototype._complete = function () {
    var destination = this.destination;
    var count = this.count;

    if (count > 0) {
      var total = this.count >= this.total ? this.total : this.count;
      var ring = this.ring;

      for (var i = 0; i < total; i++) {
        var idx = count++ % total;
        destination.next(ring[idx]);
      }
    }

    destination.complete();
  };

  return TakeLastSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/last.js
/** PURE_IMPORTS_START _util_EmptyError,_filter,_takeLast,_throwIfEmpty,_defaultIfEmpty,_util_identity PURE_IMPORTS_END */






function last(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function (source) {
    return source.pipe(predicate ? Object(filter["a" /* filter */])(function (v, i) {
      return predicate(v, i, source);
    }) : identity["a" /* identity */], takeLast(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () {
      return new EmptyError["a" /* EmptyError */]();
    }));
  };
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/mapTo.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function mapTo(value) {
  return function (source) {
    return source.lift(new MapToOperator(value));
  };
}

var MapToOperator = /*@__PURE__*/function () {
  function MapToOperator(value) {
    this.value = value;
  }

  MapToOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new mapTo_MapToSubscriber(subscriber, this.value));
  };

  return MapToOperator;
}();

var mapTo_MapToSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](MapToSubscriber, _super);

  function MapToSubscriber(destination, value) {
    var _this = _super.call(this, destination) || this;

    _this.value = value;
    return _this;
  }

  MapToSubscriber.prototype._next = function (x) {
    this.destination.next(this.value);
  };

  return MapToSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/materialize.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */



function materialize() {
  return function materializeOperatorFunction(source) {
    return source.lift(new MaterializeOperator());
  };
}

var MaterializeOperator = /*@__PURE__*/function () {
  function MaterializeOperator() {}

  MaterializeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new materialize_MaterializeSubscriber(subscriber));
  };

  return MaterializeOperator;
}();

var materialize_MaterializeSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](MaterializeSubscriber, _super);

  function MaterializeSubscriber(destination) {
    return _super.call(this, destination) || this;
  }

  MaterializeSubscriber.prototype._next = function (value) {
    this.destination.next(Notification["a" /* Notification */].createNext(value));
  };

  MaterializeSubscriber.prototype._error = function (err) {
    var destination = this.destination;
    destination.next(Notification["a" /* Notification */].createError(err));
    destination.complete();
  };

  MaterializeSubscriber.prototype._complete = function () {
    var destination = this.destination;
    destination.next(Notification["a" /* Notification */].createComplete());
    destination.complete();
  };

  return MaterializeSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/scan.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function scan(accumulator, seed) {
  var hasSeed = false;

  if (arguments.length >= 2) {
    hasSeed = true;
  }

  return function scanOperatorFunction(source) {
    return source.lift(new ScanOperator(accumulator, seed, hasSeed));
  };
}

var ScanOperator = /*@__PURE__*/function () {
  function ScanOperator(accumulator, seed, hasSeed) {
    if (hasSeed === void 0) {
      hasSeed = false;
    }

    this.accumulator = accumulator;
    this.seed = seed;
    this.hasSeed = hasSeed;
  }

  ScanOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new scan_ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
  };

  return ScanOperator;
}();

var scan_ScanSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](ScanSubscriber, _super);

  function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
    var _this = _super.call(this, destination) || this;

    _this.accumulator = accumulator;
    _this._seed = _seed;
    _this.hasSeed = hasSeed;
    _this.index = 0;
    return _this;
  }

  Object.defineProperty(ScanSubscriber.prototype, "seed", {
    get: function get() {
      return this._seed;
    },
    set: function set(value) {
      this.hasSeed = true;
      this._seed = value;
    },
    enumerable: true,
    configurable: true
  });

  ScanSubscriber.prototype._next = function (value) {
    if (!this.hasSeed) {
      this.seed = value;
      this.destination.next(value);
    } else {
      return this._tryNext(value);
    }
  };

  ScanSubscriber.prototype._tryNext = function (value) {
    var index = this.index++;
    var result;

    try {
      result = this.accumulator(this.seed, value, index);
    } catch (err) {
      this.destination.error(err);
    }

    this.seed = result;
    this.destination.next(result);
  };

  return ScanSubscriber;
}(Subscriber["a" /* Subscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/pipe.js
var pipe = __webpack_require__(1437);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/reduce.js
/** PURE_IMPORTS_START _scan,_takeLast,_defaultIfEmpty,_util_pipe PURE_IMPORTS_END */




function reduce(accumulator, seed) {
  if (arguments.length >= 2) {
    return function reduceOperatorFunctionWithSeed(source) {
      return Object(pipe["a" /* pipe */])(scan(accumulator, seed), takeLast(1), defaultIfEmpty(seed))(source);
    };
  }

  return function reduceOperatorFunction(source) {
    return Object(pipe["a" /* pipe */])(scan(function (acc, value, index) {
      return accumulator(acc, value, index + 1);
    }), takeLast(1))(source);
  };
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/max.js
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

function max_max(comparer) {
  var max = typeof comparer === 'function' ? function (x, y) {
    return comparer(x, y) > 0 ? x : y;
  } : function (x, y) {
    return x > y ? x : y;
  };
  return reduce(max);
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/merge.js
var merge = __webpack_require__(1476);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/merge.js
/** PURE_IMPORTS_START _observable_merge PURE_IMPORTS_END */

function merge_merge() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  return function (source) {
    return source.lift.call(merge["a" /* merge */].apply(void 0, [source].concat(observables)));
  };
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeAll.js
var mergeAll = __webpack_require__(1444);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeMapTo.js
/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

function mergeMapTo(innerObservable, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }

  if (typeof resultSelector === 'function') {
    return Object(mergeMap["b" /* mergeMap */])(function () {
      return innerObservable;
    }, resultSelector, concurrent);
  }

  if (typeof resultSelector === 'number') {
    concurrent = resultSelector;
  }

  return Object(mergeMap["b" /* mergeMap */])(function () {
    return innerObservable;
  }, concurrent);
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeScan.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function mergeScan(accumulator, seed, concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }

  return function (source) {
    return source.lift(new MergeScanOperator(accumulator, seed, concurrent));
  };
}

var MergeScanOperator = /*@__PURE__*/function () {
  function MergeScanOperator(accumulator, seed, concurrent) {
    this.accumulator = accumulator;
    this.seed = seed;
    this.concurrent = concurrent;
  }

  MergeScanOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new mergeScan_MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
  };

  return MergeScanOperator;
}();



var mergeScan_MergeScanSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](MergeScanSubscriber, _super);

  function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
    var _this = _super.call(this, destination) || this;

    _this.accumulator = accumulator;
    _this.acc = acc;
    _this.concurrent = concurrent;
    _this.hasValue = false;
    _this.hasCompleted = false;
    _this.buffer = [];
    _this.active = 0;
    _this.index = 0;
    return _this;
  }

  MergeScanSubscriber.prototype._next = function (value) {
    if (this.active < this.concurrent) {
      var index = this.index++;
      var destination = this.destination;
      var ish = void 0;

      try {
        var accumulator = this.accumulator;
        ish = accumulator(this.acc, value, index);
      } catch (e) {
        return destination.error(e);
      }

      this.active++;

      this._innerSub(ish);
    } else {
      this.buffer.push(value);
    }
  };

  MergeScanSubscriber.prototype._innerSub = function (ish) {
    var innerSubscriber = new innerSubscribe["a" /* SimpleInnerSubscriber */](this);
    var destination = this.destination;
    destination.add(innerSubscriber);
    var innerSubscription = Object(innerSubscribe["c" /* innerSubscribe */])(ish, innerSubscriber);

    if (innerSubscription !== innerSubscriber) {
      destination.add(innerSubscription);
    }
  };

  MergeScanSubscriber.prototype._complete = function () {
    this.hasCompleted = true;

    if (this.active === 0 && this.buffer.length === 0) {
      if (this.hasValue === false) {
        this.destination.next(this.acc);
      }

      this.destination.complete();
    }

    this.unsubscribe();
  };

  MergeScanSubscriber.prototype.notifyNext = function (innerValue) {
    var destination = this.destination;
    this.acc = innerValue;
    this.hasValue = true;
    destination.next(innerValue);
  };

  MergeScanSubscriber.prototype.notifyComplete = function () {
    var buffer = this.buffer;
    this.active--;

    if (buffer.length > 0) {
      this._next(buffer.shift());
    } else if (this.active === 0 && this.hasCompleted) {
      if (this.hasValue === false) {
        this.destination.next(this.acc);
      }

      this.destination.complete();
    }
  };

  return MergeScanSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);


// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/min.js
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

function min_min(comparer) {
  var min = typeof comparer === 'function' ? function (x, y) {
    return comparer(x, y) < 0 ? x : y;
  } : function (x, y) {
    return x < y ? x : y;
  };
  return reduce(min);
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js
var ConnectableObservable = __webpack_require__(1469);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/multicast.js
/** PURE_IMPORTS_START _observable_ConnectableObservable PURE_IMPORTS_END */

function multicast(subjectOrSubjectFactory, selector) {
  return function multicastOperatorFunction(source) {
    var subjectFactory;

    if (typeof subjectOrSubjectFactory === 'function') {
      subjectFactory = subjectOrSubjectFactory;
    } else {
      subjectFactory = function subjectFactory() {
        return subjectOrSubjectFactory;
      };
    }

    if (typeof selector === 'function') {
      return source.lift(new MulticastOperator(subjectFactory, selector));
    }

    var connectable = Object.create(source, ConnectableObservable["b" /* connectableObservableDescriptor */]);
    connectable.source = source;
    connectable.subjectFactory = subjectFactory;
    return connectable;
  };
}

var MulticastOperator = /*@__PURE__*/function () {
  function MulticastOperator(subjectFactory, selector) {
    this.subjectFactory = subjectFactory;
    this.selector = selector;
  }

  MulticastOperator.prototype.call = function (subscriber, source) {
    var selector = this.selector;
    var subject = this.subjectFactory();
    var subscription = selector(subject).subscribe(subscriber);
    subscription.add(source.subscribe(subject));
    return subscription;
  };

  return MulticastOperator;
}();


// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/observeOn.js
var observeOn = __webpack_require__(1471);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js
/** PURE_IMPORTS_START tslib,_observable_from,_util_isArray,_innerSubscribe PURE_IMPORTS_END */




function onErrorResumeNext() {
  var nextSources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    nextSources[_i] = arguments[_i];
  }

  if (nextSources.length === 1 && Object(isArray["a" /* isArray */])(nextSources[0])) {
    nextSources = nextSources[0];
  }

  return function (source) {
    return source.lift(new OnErrorResumeNextOperator(nextSources));
  };
}
function onErrorResumeNextStatic() {
  var nextSources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    nextSources[_i] = arguments[_i];
  }

  var source = undefined;

  if (nextSources.length === 1 && Object(isArray["a" /* isArray */])(nextSources[0])) {
    nextSources = nextSources[0];
  }

  source = nextSources.shift();
  return Object(from["a" /* from */])(source).lift(new OnErrorResumeNextOperator(nextSources));
}

var OnErrorResumeNextOperator = /*@__PURE__*/function () {
  function OnErrorResumeNextOperator(nextSources) {
    this.nextSources = nextSources;
  }

  OnErrorResumeNextOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new onErrorResumeNext_OnErrorResumeNextSubscriber(subscriber, this.nextSources));
  };

  return OnErrorResumeNextOperator;
}();

var onErrorResumeNext_OnErrorResumeNextSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](OnErrorResumeNextSubscriber, _super);

  function OnErrorResumeNextSubscriber(destination, nextSources) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    _this.nextSources = nextSources;
    return _this;
  }

  OnErrorResumeNextSubscriber.prototype.notifyError = function () {
    this.subscribeToNextSource();
  };

  OnErrorResumeNextSubscriber.prototype.notifyComplete = function () {
    this.subscribeToNextSource();
  };

  OnErrorResumeNextSubscriber.prototype._error = function (err) {
    this.subscribeToNextSource();
    this.unsubscribe();
  };

  OnErrorResumeNextSubscriber.prototype._complete = function () {
    this.subscribeToNextSource();
    this.unsubscribe();
  };

  OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
    var next = this.nextSources.shift();

    if (!!next) {
      var innerSubscriber = new innerSubscribe["a" /* SimpleInnerSubscriber */](this);
      var destination = this.destination;
      destination.add(innerSubscriber);
      var innerSubscription = Object(innerSubscribe["c" /* innerSubscribe */])(next, innerSubscriber);

      if (innerSubscription !== innerSubscriber) {
        destination.add(innerSubscription);
      }
    } else {
      this.destination.complete();
    }
  };

  return OnErrorResumeNextSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/pairwise.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function pairwise() {
  return function (source) {
    return source.lift(new PairwiseOperator());
  };
}

var PairwiseOperator = /*@__PURE__*/function () {
  function PairwiseOperator() {}

  PairwiseOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new pairwise_PairwiseSubscriber(subscriber));
  };

  return PairwiseOperator;
}();

var pairwise_PairwiseSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](PairwiseSubscriber, _super);

  function PairwiseSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.hasPrev = false;
    return _this;
  }

  PairwiseSubscriber.prototype._next = function (value) {
    var pair;

    if (this.hasPrev) {
      pair = [this.prev, value];
    } else {
      this.hasPrev = true;
    }

    this.prev = value;

    if (pair) {
      this.destination.next(pair);
    }
  };

  return PairwiseSubscriber;
}(Subscriber["a" /* Subscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/not.js
var not = __webpack_require__(1526);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/partition.js
/** PURE_IMPORTS_START _util_not,_filter PURE_IMPORTS_END */


function partition(predicate, thisArg) {
  return function (source) {
    return [Object(filter["a" /* filter */])(predicate, thisArg)(source), Object(filter["a" /* filter */])(Object(not["a" /* not */])(predicate, thisArg))(source)];
  };
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/pluck.js
/** PURE_IMPORTS_START _map PURE_IMPORTS_END */

function pluck() {
  var properties = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    properties[_i] = arguments[_i];
  }

  var length = properties.length;

  if (length === 0) {
    throw new Error('list of properties cannot be empty.');
  }

  return function (source) {
    return Object(map["a" /* map */])(plucker(properties, length))(source);
  };
}

function plucker(props, length) {
  var mapper = function mapper(x) {
    var currentProp = x;

    for (var i = 0; i < length; i++) {
      var p = currentProp != null ? currentProp[props[i]] : undefined;

      if (p !== void 0) {
        currentProp = p;
      } else {
        return undefined;
      }
    }

    return currentProp;
  };

  return mapper;
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subject.js
var Subject = __webpack_require__(1385);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/publish.js
/** PURE_IMPORTS_START _Subject,_multicast PURE_IMPORTS_END */


function publish(selector) {
  return selector ? multicast(function () {
    return new Subject["a" /* Subject */]();
  }, selector) : multicast(new Subject["a" /* Subject */]());
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/BehaviorSubject.js
var BehaviorSubject = __webpack_require__(1470);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/publishBehavior.js
/** PURE_IMPORTS_START _BehaviorSubject,_multicast PURE_IMPORTS_END */


function publishBehavior(value) {
  return function (source) {
    return multicast(new BehaviorSubject["a" /* BehaviorSubject */](value))(source);
  };
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/AsyncSubject.js
var AsyncSubject = __webpack_require__(1421);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/publishLast.js
/** PURE_IMPORTS_START _AsyncSubject,_multicast PURE_IMPORTS_END */


function publishLast() {
  return function (source) {
    return multicast(new AsyncSubject["a" /* AsyncSubject */]())(source);
  };
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/ReplaySubject.js
var ReplaySubject = __webpack_require__(1440);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/publishReplay.js
/** PURE_IMPORTS_START _ReplaySubject,_multicast PURE_IMPORTS_END */


function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
  if (selectorOrScheduler && typeof selectorOrScheduler !== 'function') {
    scheduler = selectorOrScheduler;
  }

  var selector = typeof selectorOrScheduler === 'function' ? selectorOrScheduler : undefined;
  var subject = new ReplaySubject["a" /* ReplaySubject */](bufferSize, windowTime, scheduler);
  return function (source) {
    return multicast(function () {
      return subject;
    }, selector)(source);
  };
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/race.js
var race = __webpack_require__(1477);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/race.js
/** PURE_IMPORTS_START _util_isArray,_observable_race PURE_IMPORTS_END */


function race_race() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  return function raceOperatorFunction(source) {
    if (observables.length === 1 && Object(isArray["a" /* isArray */])(observables[0])) {
      observables = observables[0];
    }

    return source.lift.call(race["a" /* race */].apply(void 0, [source].concat(observables)));
  };
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/repeat.js
/** PURE_IMPORTS_START tslib,_Subscriber,_observable_empty PURE_IMPORTS_END */



function repeat(count) {
  if (count === void 0) {
    count = -1;
  }

  return function (source) {
    if (count === 0) {
      return Object(empty["b" /* empty */])();
    } else if (count < 0) {
      return source.lift(new RepeatOperator(-1, source));
    } else {
      return source.lift(new RepeatOperator(count - 1, source));
    }
  };
}

var RepeatOperator = /*@__PURE__*/function () {
  function RepeatOperator(count, source) {
    this.count = count;
    this.source = source;
  }

  RepeatOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new repeat_RepeatSubscriber(subscriber, this.count, this.source));
  };

  return RepeatOperator;
}();

var repeat_RepeatSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](RepeatSubscriber, _super);

  function RepeatSubscriber(destination, count, source) {
    var _this = _super.call(this, destination) || this;

    _this.count = count;
    _this.source = source;
    return _this;
  }

  RepeatSubscriber.prototype.complete = function () {
    if (!this.isStopped) {
      var _a = this,
          source = _a.source,
          count = _a.count;

      if (count === 0) {
        return _super.prototype.complete.call(this);
      } else if (count > -1) {
        this.count = count - 1;
      }

      source.subscribe(this._unsubscribeAndRecycle());
    }
  };

  return RepeatSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/repeatWhen.js
/** PURE_IMPORTS_START tslib,_Subject,_innerSubscribe PURE_IMPORTS_END */



function repeatWhen(notifier) {
  return function (source) {
    return source.lift(new RepeatWhenOperator(notifier));
  };
}

var RepeatWhenOperator = /*@__PURE__*/function () {
  function RepeatWhenOperator(notifier) {
    this.notifier = notifier;
  }

  RepeatWhenOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new repeatWhen_RepeatWhenSubscriber(subscriber, this.notifier, source));
  };

  return RepeatWhenOperator;
}();

var repeatWhen_RepeatWhenSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](RepeatWhenSubscriber, _super);

  function RepeatWhenSubscriber(destination, notifier, source) {
    var _this = _super.call(this, destination) || this;

    _this.notifier = notifier;
    _this.source = source;
    _this.sourceIsBeingSubscribedTo = true;
    return _this;
  }

  RepeatWhenSubscriber.prototype.notifyNext = function () {
    this.sourceIsBeingSubscribedTo = true;
    this.source.subscribe(this);
  };

  RepeatWhenSubscriber.prototype.notifyComplete = function () {
    if (this.sourceIsBeingSubscribedTo === false) {
      return _super.prototype.complete.call(this);
    }
  };

  RepeatWhenSubscriber.prototype.complete = function () {
    this.sourceIsBeingSubscribedTo = false;

    if (!this.isStopped) {
      if (!this.retries) {
        this.subscribeToRetries();
      }

      if (!this.retriesSubscription || this.retriesSubscription.closed) {
        return _super.prototype.complete.call(this);
      }

      this._unsubscribeAndRecycle();

      this.notifications.next(undefined);
    }
  };

  RepeatWhenSubscriber.prototype._unsubscribe = function () {
    var _a = this,
        notifications = _a.notifications,
        retriesSubscription = _a.retriesSubscription;

    if (notifications) {
      notifications.unsubscribe();
      this.notifications = undefined;
    }

    if (retriesSubscription) {
      retriesSubscription.unsubscribe();
      this.retriesSubscription = undefined;
    }

    this.retries = undefined;
  };

  RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
    var _unsubscribe = this._unsubscribe;
    this._unsubscribe = null;

    _super.prototype._unsubscribeAndRecycle.call(this);

    this._unsubscribe = _unsubscribe;
    return this;
  };

  RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
    this.notifications = new Subject["a" /* Subject */]();
    var retries;

    try {
      var notifier = this.notifier;
      retries = notifier(this.notifications);
    } catch (e) {
      return _super.prototype.complete.call(this);
    }

    this.retries = retries;
    this.retriesSubscription = Object(innerSubscribe["c" /* innerSubscribe */])(retries, new innerSubscribe["a" /* SimpleInnerSubscriber */](this));
  };

  return RepeatWhenSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/retry.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function retry(count) {
  if (count === void 0) {
    count = -1;
  }

  return function (source) {
    return source.lift(new RetryOperator(count, source));
  };
}

var RetryOperator = /*@__PURE__*/function () {
  function RetryOperator(count, source) {
    this.count = count;
    this.source = source;
  }

  RetryOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new retry_RetrySubscriber(subscriber, this.count, this.source));
  };

  return RetryOperator;
}();

var retry_RetrySubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](RetrySubscriber, _super);

  function RetrySubscriber(destination, count, source) {
    var _this = _super.call(this, destination) || this;

    _this.count = count;
    _this.source = source;
    return _this;
  }

  RetrySubscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      var _a = this,
          source = _a.source,
          count = _a.count;

      if (count === 0) {
        return _super.prototype.error.call(this, err);
      } else if (count > -1) {
        this.count = count - 1;
      }

      source.subscribe(this._unsubscribeAndRecycle());
    }
  };

  return RetrySubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/retryWhen.js
/** PURE_IMPORTS_START tslib,_Subject,_innerSubscribe PURE_IMPORTS_END */



function retryWhen(notifier) {
  return function (source) {
    return source.lift(new RetryWhenOperator(notifier, source));
  };
}

var RetryWhenOperator = /*@__PURE__*/function () {
  function RetryWhenOperator(notifier, source) {
    this.notifier = notifier;
    this.source = source;
  }

  RetryWhenOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new retryWhen_RetryWhenSubscriber(subscriber, this.notifier, this.source));
  };

  return RetryWhenOperator;
}();

var retryWhen_RetryWhenSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](RetryWhenSubscriber, _super);

  function RetryWhenSubscriber(destination, notifier, source) {
    var _this = _super.call(this, destination) || this;

    _this.notifier = notifier;
    _this.source = source;
    return _this;
  }

  RetryWhenSubscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      var errors = this.errors;
      var retries = this.retries;
      var retriesSubscription = this.retriesSubscription;

      if (!retries) {
        errors = new Subject["a" /* Subject */]();

        try {
          var notifier = this.notifier;
          retries = notifier(errors);
        } catch (e) {
          return _super.prototype.error.call(this, e);
        }

        retriesSubscription = Object(innerSubscribe["c" /* innerSubscribe */])(retries, new innerSubscribe["a" /* SimpleInnerSubscriber */](this));
      } else {
        this.errors = undefined;
        this.retriesSubscription = undefined;
      }

      this._unsubscribeAndRecycle();

      this.errors = errors;
      this.retries = retries;
      this.retriesSubscription = retriesSubscription;
      errors.next(err);
    }
  };

  RetryWhenSubscriber.prototype._unsubscribe = function () {
    var _a = this,
        errors = _a.errors,
        retriesSubscription = _a.retriesSubscription;

    if (errors) {
      errors.unsubscribe();
      this.errors = undefined;
    }

    if (retriesSubscription) {
      retriesSubscription.unsubscribe();
      this.retriesSubscription = undefined;
    }

    this.retries = undefined;
  };

  RetryWhenSubscriber.prototype.notifyNext = function () {
    var _unsubscribe = this._unsubscribe;
    this._unsubscribe = null;

    this._unsubscribeAndRecycle();

    this._unsubscribe = _unsubscribe;
    this.source.subscribe(this);
  };

  return RetryWhenSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/refCount.js
var operators_refCount = __webpack_require__(1438);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/sample.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function sample(notifier) {
  return function (source) {
    return source.lift(new sample_SampleOperator(notifier));
  };
}

var sample_SampleOperator = /*@__PURE__*/function () {
  function SampleOperator(notifier) {
    this.notifier = notifier;
  }

  SampleOperator.prototype.call = function (subscriber, source) {
    var sampleSubscriber = new sample_SampleSubscriber(subscriber);
    var subscription = source.subscribe(sampleSubscriber);
    subscription.add(Object(innerSubscribe["c" /* innerSubscribe */])(this.notifier, new innerSubscribe["a" /* SimpleInnerSubscriber */](sampleSubscriber)));
    return subscription;
  };

  return SampleOperator;
}();

var sample_SampleSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SampleSubscriber, _super);

  function SampleSubscriber() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.hasValue = false;
    return _this;
  }

  SampleSubscriber.prototype._next = function (value) {
    this.value = value;
    this.hasValue = true;
  };

  SampleSubscriber.prototype.notifyNext = function () {
    this.emitValue();
  };

  SampleSubscriber.prototype.notifyComplete = function () {
    this.emitValue();
  };

  SampleSubscriber.prototype.emitValue = function () {
    if (this.hasValue) {
      this.hasValue = false;
      this.destination.next(this.value);
    }
  };

  return SampleSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/sampleTime.js
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */



function sampleTime(period, scheduler) {
  if (scheduler === void 0) {
    scheduler = scheduler_async["a" /* async */];
  }

  return function (source) {
    return source.lift(new SampleTimeOperator(period, scheduler));
  };
}

var SampleTimeOperator = /*@__PURE__*/function () {
  function SampleTimeOperator(period, scheduler) {
    this.period = period;
    this.scheduler = scheduler;
  }

  SampleTimeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new sampleTime_SampleTimeSubscriber(subscriber, this.period, this.scheduler));
  };

  return SampleTimeOperator;
}();

var sampleTime_SampleTimeSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SampleTimeSubscriber, _super);

  function SampleTimeSubscriber(destination, period, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.period = period;
    _this.scheduler = scheduler;
    _this.hasValue = false;

    _this.add(scheduler.schedule(dispatchNotification, period, {
      subscriber: _this,
      period: period
    }));

    return _this;
  }

  SampleTimeSubscriber.prototype._next = function (value) {
    this.lastValue = value;
    this.hasValue = true;
  };

  SampleTimeSubscriber.prototype.notifyNext = function () {
    if (this.hasValue) {
      this.hasValue = false;
      this.destination.next(this.lastValue);
    }
  };

  return SampleTimeSubscriber;
}(Subscriber["a" /* Subscriber */]);

function dispatchNotification(state) {
  var subscriber = state.subscriber,
      period = state.period;
  subscriber.notifyNext();
  this.schedule(state, period);
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/sequenceEqual.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function sequenceEqual(compareTo, comparator) {
  return function (source) {
    return source.lift(new SequenceEqualOperator(compareTo, comparator));
  };
}

var SequenceEqualOperator = /*@__PURE__*/function () {
  function SequenceEqualOperator(compareTo, comparator) {
    this.compareTo = compareTo;
    this.comparator = comparator;
  }

  SequenceEqualOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new sequenceEqual_SequenceEqualSubscriber(subscriber, this.compareTo, this.comparator));
  };

  return SequenceEqualOperator;
}();



var sequenceEqual_SequenceEqualSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SequenceEqualSubscriber, _super);

  function SequenceEqualSubscriber(destination, compareTo, comparator) {
    var _this = _super.call(this, destination) || this;

    _this.compareTo = compareTo;
    _this.comparator = comparator;
    _this._a = [];
    _this._b = [];
    _this._oneComplete = false;

    _this.destination.add(compareTo.subscribe(new sequenceEqual_SequenceEqualCompareToSubscriber(destination, _this)));

    return _this;
  }

  SequenceEqualSubscriber.prototype._next = function (value) {
    if (this._oneComplete && this._b.length === 0) {
      this.emit(false);
    } else {
      this._a.push(value);

      this.checkValues();
    }
  };

  SequenceEqualSubscriber.prototype._complete = function () {
    if (this._oneComplete) {
      this.emit(this._a.length === 0 && this._b.length === 0);
    } else {
      this._oneComplete = true;
    }

    this.unsubscribe();
  };

  SequenceEqualSubscriber.prototype.checkValues = function () {
    var _c = this,
        _a = _c._a,
        _b = _c._b,
        comparator = _c.comparator;

    while (_a.length > 0 && _b.length > 0) {
      var a = _a.shift();

      var b = _b.shift();

      var areEqual = false;

      try {
        areEqual = comparator ? comparator(a, b) : a === b;
      } catch (e) {
        this.destination.error(e);
      }

      if (!areEqual) {
        this.emit(false);
      }
    }
  };

  SequenceEqualSubscriber.prototype.emit = function (value) {
    var destination = this.destination;
    destination.next(value);
    destination.complete();
  };

  SequenceEqualSubscriber.prototype.nextB = function (value) {
    if (this._oneComplete && this._a.length === 0) {
      this.emit(false);
    } else {
      this._b.push(value);

      this.checkValues();
    }
  };

  SequenceEqualSubscriber.prototype.completeB = function () {
    if (this._oneComplete) {
      this.emit(this._a.length === 0 && this._b.length === 0);
    } else {
      this._oneComplete = true;
    }
  };

  return SequenceEqualSubscriber;
}(Subscriber["a" /* Subscriber */]);



var sequenceEqual_SequenceEqualCompareToSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SequenceEqualCompareToSubscriber, _super);

  function SequenceEqualCompareToSubscriber(destination, parent) {
    var _this = _super.call(this, destination) || this;

    _this.parent = parent;
    return _this;
  }

  SequenceEqualCompareToSubscriber.prototype._next = function (value) {
    this.parent.nextB(value);
  };

  SequenceEqualCompareToSubscriber.prototype._error = function (err) {
    this.parent.error(err);
    this.unsubscribe();
  };

  SequenceEqualCompareToSubscriber.prototype._complete = function () {
    this.parent.completeB();
    this.unsubscribe();
  };

  return SequenceEqualCompareToSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/share.js
/** PURE_IMPORTS_START _multicast,_refCount,_Subject PURE_IMPORTS_END */




function shareSubjectFactory() {
  return new Subject["a" /* Subject */]();
}

function share() {
  return function (source) {
    return Object(operators_refCount["a" /* refCount */])()(multicast(shareSubjectFactory)(source));
  };
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/shareReplay.js
/** PURE_IMPORTS_START _ReplaySubject PURE_IMPORTS_END */

function shareReplay(configOrBufferSize, windowTime, scheduler) {
  var config;

  if (configOrBufferSize && typeof configOrBufferSize === 'object') {
    config = configOrBufferSize;
  } else {
    config = {
      bufferSize: configOrBufferSize,
      windowTime: windowTime,
      refCount: false,
      scheduler: scheduler
    };
  }

  return function (source) {
    return source.lift(shareReplayOperator(config));
  };
}

function shareReplayOperator(_a) {
  var _b = _a.bufferSize,
      bufferSize = _b === void 0 ? Number.POSITIVE_INFINITY : _b,
      _c = _a.windowTime,
      windowTime = _c === void 0 ? Number.POSITIVE_INFINITY : _c,
      useRefCount = _a.refCount,
      scheduler = _a.scheduler;
  var subject;
  var refCount = 0;
  var subscription;
  var hasError = false;
  var isComplete = false;
  return function shareReplayOperation(source) {
    refCount++;
    var innerSub;

    if (!subject || hasError) {
      hasError = false;
      subject = new ReplaySubject["a" /* ReplaySubject */](bufferSize, windowTime, scheduler);
      innerSub = subject.subscribe(this);
      subscription = source.subscribe({
        next: function next(value) {
          subject.next(value);
        },
        error: function error(err) {
          hasError = true;
          subject.error(err);
        },
        complete: function complete() {
          isComplete = true;
          subscription = undefined;
          subject.complete();
        }
      });

      if (isComplete) {
        subscription = undefined;
      }
    } else {
      innerSub = subject.subscribe(this);
    }

    this.add(function () {
      refCount--;
      innerSub.unsubscribe();
      innerSub = undefined;

      if (subscription && !isComplete && useRefCount && refCount === 0) {
        subscription.unsubscribe();
        subscription = undefined;
        subject = undefined;
      }
    });
  };
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/single.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_EmptyError PURE_IMPORTS_END */



function single(predicate) {
  return function (source) {
    return source.lift(new SingleOperator(predicate, source));
  };
}

var SingleOperator = /*@__PURE__*/function () {
  function SingleOperator(predicate, source) {
    this.predicate = predicate;
    this.source = source;
  }

  SingleOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new single_SingleSubscriber(subscriber, this.predicate, this.source));
  };

  return SingleOperator;
}();

var single_SingleSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SingleSubscriber, _super);

  function SingleSubscriber(destination, predicate, source) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.source = source;
    _this.seenValue = false;
    _this.index = 0;
    return _this;
  }

  SingleSubscriber.prototype.applySingleValue = function (value) {
    if (this.seenValue) {
      this.destination.error('Sequence contains more than one element');
    } else {
      this.seenValue = true;
      this.singleValue = value;
    }
  };

  SingleSubscriber.prototype._next = function (value) {
    var index = this.index++;

    if (this.predicate) {
      this.tryNext(value, index);
    } else {
      this.applySingleValue(value);
    }
  };

  SingleSubscriber.prototype.tryNext = function (value, index) {
    try {
      if (this.predicate(value, index, this.source)) {
        this.applySingleValue(value);
      }
    } catch (err) {
      this.destination.error(err);
    }
  };

  SingleSubscriber.prototype._complete = function () {
    var destination = this.destination;

    if (this.index > 0) {
      destination.next(this.seenValue ? this.singleValue : undefined);
      destination.complete();
    } else {
      destination.error(new EmptyError["a" /* EmptyError */]());
    }
  };

  return SingleSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/skip.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function skip(count) {
  return function (source) {
    return source.lift(new SkipOperator(count));
  };
}

var SkipOperator = /*@__PURE__*/function () {
  function SkipOperator(total) {
    this.total = total;
  }

  SkipOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new skip_SkipSubscriber(subscriber, this.total));
  };

  return SkipOperator;
}();

var skip_SkipSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SkipSubscriber, _super);

  function SkipSubscriber(destination, total) {
    var _this = _super.call(this, destination) || this;

    _this.total = total;
    _this.count = 0;
    return _this;
  }

  SkipSubscriber.prototype._next = function (x) {
    if (++this.count > this.total) {
      this.destination.next(x);
    }
  };

  return SkipSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/skipLast.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError PURE_IMPORTS_END */



function skipLast(count) {
  return function (source) {
    return source.lift(new skipLast_SkipLastOperator(count));
  };
}

var skipLast_SkipLastOperator = /*@__PURE__*/function () {
  function SkipLastOperator(_skipCount) {
    this._skipCount = _skipCount;

    if (this._skipCount < 0) {
      throw new ArgumentOutOfRangeError["a" /* ArgumentOutOfRangeError */]();
    }
  }

  SkipLastOperator.prototype.call = function (subscriber, source) {
    if (this._skipCount === 0) {
      return source.subscribe(new Subscriber["a" /* Subscriber */](subscriber));
    } else {
      return source.subscribe(new skipLast_SkipLastSubscriber(subscriber, this._skipCount));
    }
  };

  return SkipLastOperator;
}();

var skipLast_SkipLastSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SkipLastSubscriber, _super);

  function SkipLastSubscriber(destination, _skipCount) {
    var _this = _super.call(this, destination) || this;

    _this._skipCount = _skipCount;
    _this._count = 0;
    _this._ring = new Array(_skipCount);
    return _this;
  }

  SkipLastSubscriber.prototype._next = function (value) {
    var skipCount = this._skipCount;
    var count = this._count++;

    if (count < skipCount) {
      this._ring[count] = value;
    } else {
      var currentIndex = count % skipCount;
      var ring = this._ring;
      var oldValue = ring[currentIndex];
      ring[currentIndex] = value;
      this.destination.next(oldValue);
    }
  };

  return SkipLastSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/skipUntil.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function skipUntil(notifier) {
  return function (source) {
    return source.lift(new SkipUntilOperator(notifier));
  };
}

var SkipUntilOperator = /*@__PURE__*/function () {
  function SkipUntilOperator(notifier) {
    this.notifier = notifier;
  }

  SkipUntilOperator.prototype.call = function (destination, source) {
    return source.subscribe(new skipUntil_SkipUntilSubscriber(destination, this.notifier));
  };

  return SkipUntilOperator;
}();

var skipUntil_SkipUntilSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SkipUntilSubscriber, _super);

  function SkipUntilSubscriber(destination, notifier) {
    var _this = _super.call(this, destination) || this;

    _this.hasValue = false;
    var innerSubscriber = new innerSubscribe["a" /* SimpleInnerSubscriber */](_this);

    _this.add(innerSubscriber);

    _this.innerSubscription = innerSubscriber;
    var innerSubscription = Object(innerSubscribe["c" /* innerSubscribe */])(notifier, innerSubscriber);

    if (innerSubscription !== innerSubscriber) {
      _this.add(innerSubscription);

      _this.innerSubscription = innerSubscription;
    }

    return _this;
  }

  SkipUntilSubscriber.prototype._next = function (value) {
    if (this.hasValue) {
      _super.prototype._next.call(this, value);
    }
  };

  SkipUntilSubscriber.prototype.notifyNext = function () {
    this.hasValue = true;

    if (this.innerSubscription) {
      this.innerSubscription.unsubscribe();
    }
  };

  SkipUntilSubscriber.prototype.notifyComplete = function () {};

  return SkipUntilSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/skipWhile.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function skipWhile(predicate) {
  return function (source) {
    return source.lift(new SkipWhileOperator(predicate));
  };
}

var SkipWhileOperator = /*@__PURE__*/function () {
  function SkipWhileOperator(predicate) {
    this.predicate = predicate;
  }

  SkipWhileOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new skipWhile_SkipWhileSubscriber(subscriber, this.predicate));
  };

  return SkipWhileOperator;
}();

var skipWhile_SkipWhileSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SkipWhileSubscriber, _super);

  function SkipWhileSubscriber(destination, predicate) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.skipping = true;
    _this.index = 0;
    return _this;
  }

  SkipWhileSubscriber.prototype._next = function (value) {
    var destination = this.destination;

    if (this.skipping) {
      this.tryCallPredicate(value);
    }

    if (!this.skipping) {
      destination.next(value);
    }
  };

  SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
    try {
      var result = this.predicate(value, this.index++);
      this.skipping = Boolean(result);
    } catch (err) {
      this.destination.error(err);
    }
  };

  return SkipWhileSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/startWith.js
/** PURE_IMPORTS_START _observable_concat,_util_isScheduler PURE_IMPORTS_END */


function startWith() {
  var array = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    array[_i] = arguments[_i];
  }

  var scheduler = array[array.length - 1];

  if (Object(isScheduler["a" /* isScheduler */])(scheduler)) {
    array.pop();
    return function (source) {
      return Object(concat["a" /* concat */])(array, source, scheduler);
    };
  } else {
    return function (source) {
      return Object(concat["a" /* concat */])(array, source);
    };
  }
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/asap.js + 3 modules
var asap = __webpack_require__(1455);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isNumeric.js
var isNumeric = __webpack_require__(1446);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/SubscribeOnObservable.js
/** PURE_IMPORTS_START tslib,_Observable,_scheduler_asap,_util_isNumeric PURE_IMPORTS_END */





var SubscribeOnObservable_SubscribeOnObservable = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SubscribeOnObservable, _super);

  function SubscribeOnObservable(source, delayTime, scheduler) {
    if (delayTime === void 0) {
      delayTime = 0;
    }

    if (scheduler === void 0) {
      scheduler = asap["a" /* asap */];
    }

    var _this = _super.call(this) || this;

    _this.source = source;
    _this.delayTime = delayTime;
    _this.scheduler = scheduler;

    if (!Object(isNumeric["a" /* isNumeric */])(delayTime) || delayTime < 0) {
      _this.delayTime = 0;
    }

    if (!scheduler || typeof scheduler.schedule !== 'function') {
      _this.scheduler = asap["a" /* asap */];
    }

    return _this;
  }

  SubscribeOnObservable.create = function (source, delay, scheduler) {
    if (delay === void 0) {
      delay = 0;
    }

    if (scheduler === void 0) {
      scheduler = asap["a" /* asap */];
    }

    return new SubscribeOnObservable(source, delay, scheduler);
  };

  SubscribeOnObservable.dispatch = function (arg) {
    var source = arg.source,
        subscriber = arg.subscriber;
    return this.add(source.subscribe(subscriber));
  };

  SubscribeOnObservable.prototype._subscribe = function (subscriber) {
    var delay = this.delayTime;
    var source = this.source;
    var scheduler = this.scheduler;
    return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
      source: source,
      subscriber: subscriber
    });
  };

  return SubscribeOnObservable;
}(Observable["a" /* Observable */]);


// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/subscribeOn.js
/** PURE_IMPORTS_START _observable_SubscribeOnObservable PURE_IMPORTS_END */

function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  return function subscribeOnOperatorFunction(source) {
    return source.lift(new subscribeOn_SubscribeOnOperator(scheduler, delay));
  };
}

var subscribeOn_SubscribeOnOperator = /*@__PURE__*/function () {
  function SubscribeOnOperator(scheduler, delay) {
    this.scheduler = scheduler;
    this.delay = delay;
  }

  SubscribeOnOperator.prototype.call = function (subscriber, source) {
    return new SubscribeOnObservable_SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
  };

  return SubscribeOnOperator;
}();
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/switchMap.js
/** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */




function switchMap(project, resultSelector) {
  if (typeof resultSelector === 'function') {
    return function (source) {
      return source.pipe(switchMap(function (a, i) {
        return Object(from["a" /* from */])(project(a, i)).pipe(Object(map["a" /* map */])(function (b, ii) {
          return resultSelector(a, b, i, ii);
        }));
      }));
    };
  }

  return function (source) {
    return source.lift(new SwitchMapOperator(project));
  };
}

var SwitchMapOperator = /*@__PURE__*/function () {
  function SwitchMapOperator(project) {
    this.project = project;
  }

  SwitchMapOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new switchMap_SwitchMapSubscriber(subscriber, this.project));
  };

  return SwitchMapOperator;
}();

var switchMap_SwitchMapSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](SwitchMapSubscriber, _super);

  function SwitchMapSubscriber(destination, project) {
    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.index = 0;
    return _this;
  }

  SwitchMapSubscriber.prototype._next = function (value) {
    var result;
    var index = this.index++;

    try {
      result = this.project(value, index);
    } catch (error) {
      this.destination.error(error);
      return;
    }

    this._innerSub(result);
  };

  SwitchMapSubscriber.prototype._innerSub = function (result) {
    var innerSubscription = this.innerSubscription;

    if (innerSubscription) {
      innerSubscription.unsubscribe();
    }

    var innerSubscriber = new innerSubscribe["a" /* SimpleInnerSubscriber */](this);
    var destination = this.destination;
    destination.add(innerSubscriber);
    this.innerSubscription = Object(innerSubscribe["c" /* innerSubscribe */])(result, innerSubscriber);

    if (this.innerSubscription !== innerSubscriber) {
      destination.add(this.innerSubscription);
    }
  };

  SwitchMapSubscriber.prototype._complete = function () {
    var innerSubscription = this.innerSubscription;

    if (!innerSubscription || innerSubscription.closed) {
      _super.prototype._complete.call(this);
    }

    this.unsubscribe();
  };

  SwitchMapSubscriber.prototype._unsubscribe = function () {
    this.innerSubscription = undefined;
  };

  SwitchMapSubscriber.prototype.notifyComplete = function () {
    this.innerSubscription = undefined;

    if (this.isStopped) {
      _super.prototype._complete.call(this);
    }
  };

  SwitchMapSubscriber.prototype.notifyNext = function (innerValue) {
    this.destination.next(innerValue);
  };

  return SwitchMapSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/switchAll.js
/** PURE_IMPORTS_START _switchMap,_util_identity PURE_IMPORTS_END */


function switchAll() {
  return switchMap(identity["a" /* identity */]);
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/switchMapTo.js
/** PURE_IMPORTS_START _switchMap PURE_IMPORTS_END */

function switchMapTo(innerObservable, resultSelector) {
  return resultSelector ? switchMap(function () {
    return innerObservable;
  }, resultSelector) : switchMap(function () {
    return innerObservable;
  });
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/takeUntil.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function takeUntil(notifier) {
  return function (source) {
    return source.lift(new takeUntil_TakeUntilOperator(notifier));
  };
}

var takeUntil_TakeUntilOperator = /*@__PURE__*/function () {
  function TakeUntilOperator(notifier) {
    this.notifier = notifier;
  }

  TakeUntilOperator.prototype.call = function (subscriber, source) {
    var takeUntilSubscriber = new takeUntil_TakeUntilSubscriber(subscriber);
    var notifierSubscription = Object(innerSubscribe["c" /* innerSubscribe */])(this.notifier, new innerSubscribe["a" /* SimpleInnerSubscriber */](takeUntilSubscriber));

    if (notifierSubscription && !takeUntilSubscriber.seenValue) {
      takeUntilSubscriber.add(notifierSubscription);
      return source.subscribe(takeUntilSubscriber);
    }

    return takeUntilSubscriber;
  };

  return TakeUntilOperator;
}();

var takeUntil_TakeUntilSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](TakeUntilSubscriber, _super);

  function TakeUntilSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.seenValue = false;
    return _this;
  }

  TakeUntilSubscriber.prototype.notifyNext = function () {
    this.seenValue = true;
    this.complete();
  };

  TakeUntilSubscriber.prototype.notifyComplete = function () {};

  return TakeUntilSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/takeWhile.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function takeWhile(predicate, inclusive) {
  if (inclusive === void 0) {
    inclusive = false;
  }

  return function (source) {
    return source.lift(new TakeWhileOperator(predicate, inclusive));
  };
}

var TakeWhileOperator = /*@__PURE__*/function () {
  function TakeWhileOperator(predicate, inclusive) {
    this.predicate = predicate;
    this.inclusive = inclusive;
  }

  TakeWhileOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new takeWhile_TakeWhileSubscriber(subscriber, this.predicate, this.inclusive));
  };

  return TakeWhileOperator;
}();

var takeWhile_TakeWhileSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](TakeWhileSubscriber, _super);

  function TakeWhileSubscriber(destination, predicate, inclusive) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.inclusive = inclusive;
    _this.index = 0;
    return _this;
  }

  TakeWhileSubscriber.prototype._next = function (value) {
    var destination = this.destination;
    var result;

    try {
      result = this.predicate(value, this.index++);
    } catch (err) {
      destination.error(err);
      return;
    }

    this.nextOrComplete(value, result);
  };

  TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
    var destination = this.destination;

    if (Boolean(predicateResult)) {
      destination.next(value);
    } else {
      if (this.inclusive) {
        destination.next(value);
      }

      destination.complete();
    }
  };

  return TakeWhileSubscriber;
}(Subscriber["a" /* Subscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/noop.js
var noop = __webpack_require__(1442);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isFunction.js
var isFunction = __webpack_require__(1416);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/tap.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_noop,_util_isFunction PURE_IMPORTS_END */




function tap(nextOrObserver, error, complete) {
  return function tapOperatorFunction(source) {
    return source.lift(new DoOperator(nextOrObserver, error, complete));
  };
}

var DoOperator = /*@__PURE__*/function () {
  function DoOperator(nextOrObserver, error, complete) {
    this.nextOrObserver = nextOrObserver;
    this.error = error;
    this.complete = complete;
  }

  DoOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new tap_TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
  };

  return DoOperator;
}();

var tap_TapSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](TapSubscriber, _super);

  function TapSubscriber(destination, observerOrNext, error, complete) {
    var _this = _super.call(this, destination) || this;

    _this._tapNext = noop["a" /* noop */];
    _this._tapError = noop["a" /* noop */];
    _this._tapComplete = noop["a" /* noop */];
    _this._tapError = error || noop["a" /* noop */];
    _this._tapComplete = complete || noop["a" /* noop */];

    if (Object(isFunction["a" /* isFunction */])(observerOrNext)) {
      _this._context = _this;
      _this._tapNext = observerOrNext;
    } else if (observerOrNext) {
      _this._context = observerOrNext;
      _this._tapNext = observerOrNext.next || noop["a" /* noop */];
      _this._tapError = observerOrNext.error || noop["a" /* noop */];
      _this._tapComplete = observerOrNext.complete || noop["a" /* noop */];
    }

    return _this;
  }

  TapSubscriber.prototype._next = function (value) {
    try {
      this._tapNext.call(this._context, value);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(value);
  };

  TapSubscriber.prototype._error = function (err) {
    try {
      this._tapError.call(this._context, err);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.error(err);
  };

  TapSubscriber.prototype._complete = function () {
    try {
      this._tapComplete.call(this._context);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    return this.destination.complete();
  };

  return TapSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/throttle.js
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


var defaultThrottleConfig = {
  leading: true,
  trailing: false
};
function throttle(durationSelector, config) {
  if (config === void 0) {
    config = defaultThrottleConfig;
  }

  return function (source) {
    return source.lift(new ThrottleOperator(durationSelector, !!config.leading, !!config.trailing));
  };
}

var ThrottleOperator = /*@__PURE__*/function () {
  function ThrottleOperator(durationSelector, leading, trailing) {
    this.durationSelector = durationSelector;
    this.leading = leading;
    this.trailing = trailing;
  }

  ThrottleOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new throttle_ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
  };

  return ThrottleOperator;
}();

var throttle_ThrottleSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](ThrottleSubscriber, _super);

  function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    _this.durationSelector = durationSelector;
    _this._leading = _leading;
    _this._trailing = _trailing;
    _this._hasValue = false;
    return _this;
  }

  ThrottleSubscriber.prototype._next = function (value) {
    this._hasValue = true;
    this._sendValue = value;

    if (!this._throttled) {
      if (this._leading) {
        this.send();
      } else {
        this.throttle(value);
      }
    }
  };

  ThrottleSubscriber.prototype.send = function () {
    var _a = this,
        _hasValue = _a._hasValue,
        _sendValue = _a._sendValue;

    if (_hasValue) {
      this.destination.next(_sendValue);
      this.throttle(_sendValue);
    }

    this._hasValue = false;
    this._sendValue = undefined;
  };

  ThrottleSubscriber.prototype.throttle = function (value) {
    var duration = this.tryDurationSelector(value);

    if (!!duration) {
      this.add(this._throttled = Object(innerSubscribe["c" /* innerSubscribe */])(duration, new innerSubscribe["a" /* SimpleInnerSubscriber */](this)));
    }
  };

  ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
    try {
      return this.durationSelector(value);
    } catch (err) {
      this.destination.error(err);
      return null;
    }
  };

  ThrottleSubscriber.prototype.throttlingDone = function () {
    var _a = this,
        _throttled = _a._throttled,
        _trailing = _a._trailing;

    if (_throttled) {
      _throttled.unsubscribe();
    }

    this._throttled = undefined;

    if (_trailing) {
      this.send();
    }
  };

  ThrottleSubscriber.prototype.notifyNext = function () {
    this.throttlingDone();
  };

  ThrottleSubscriber.prototype.notifyComplete = function () {
    this.throttlingDone();
  };

  return ThrottleSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/throttleTime.js
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async,_throttle PURE_IMPORTS_END */




function throttleTime(duration, scheduler, config) {
  if (scheduler === void 0) {
    scheduler = scheduler_async["a" /* async */];
  }

  if (config === void 0) {
    config = defaultThrottleConfig;
  }

  return function (source) {
    return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing));
  };
}

var ThrottleTimeOperator = /*@__PURE__*/function () {
  function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
    this.duration = duration;
    this.scheduler = scheduler;
    this.leading = leading;
    this.trailing = trailing;
  }

  ThrottleTimeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new throttleTime_ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
  };

  return ThrottleTimeOperator;
}();

var throttleTime_ThrottleTimeSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](ThrottleTimeSubscriber, _super);

  function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
    var _this = _super.call(this, destination) || this;

    _this.duration = duration;
    _this.scheduler = scheduler;
    _this.leading = leading;
    _this.trailing = trailing;
    _this._hasTrailingValue = false;
    _this._trailingValue = null;
    return _this;
  }

  ThrottleTimeSubscriber.prototype._next = function (value) {
    if (this.throttled) {
      if (this.trailing) {
        this._trailingValue = value;
        this._hasTrailingValue = true;
      }
    } else {
      this.add(this.throttled = this.scheduler.schedule(throttleTime_dispatchNext, this.duration, {
        subscriber: this
      }));

      if (this.leading) {
        this.destination.next(value);
      } else if (this.trailing) {
        this._trailingValue = value;
        this._hasTrailingValue = true;
      }
    }
  };

  ThrottleTimeSubscriber.prototype._complete = function () {
    if (this._hasTrailingValue) {
      this.destination.next(this._trailingValue);
      this.destination.complete();
    } else {
      this.destination.complete();
    }
  };

  ThrottleTimeSubscriber.prototype.clearThrottle = function () {
    var throttled = this.throttled;

    if (throttled) {
      if (this.trailing && this._hasTrailingValue) {
        this.destination.next(this._trailingValue);
        this._trailingValue = null;
        this._hasTrailingValue = false;
      }

      throttled.unsubscribe();
      this.remove(throttled);
      this.throttled = null;
    }
  };

  return ThrottleTimeSubscriber;
}(Subscriber["a" /* Subscriber */]);

function throttleTime_dispatchNext(arg) {
  var subscriber = arg.subscriber;
  subscriber.clearThrottle();
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/defer.js
var defer = __webpack_require__(1445);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/timeInterval.js
/** PURE_IMPORTS_START _scheduler_async,_scan,_observable_defer,_map PURE_IMPORTS_END */




function timeInterval(scheduler) {
  if (scheduler === void 0) {
    scheduler = scheduler_async["a" /* async */];
  }

  return function (source) {
    return Object(defer["a" /* defer */])(function () {
      return source.pipe(scan(function (_a, value) {
        var current = _a.current;
        return {
          value: value,
          current: scheduler.now(),
          last: current
        };
      }, {
        current: scheduler.now(),
        value: undefined,
        last: undefined
      }), Object(map["a" /* map */])(function (_a) {
        var current = _a.current,
            last = _a.last,
            value = _a.value;
        return new TimeInterval(value, current - last);
      }));
    });
  };
}

var TimeInterval = /*@__PURE__*/function () {
  function TimeInterval(value, interval) {
    this.value = value;
    this.interval = interval;
  }

  return TimeInterval;
}();


// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/TimeoutError.js
var TimeoutError = __webpack_require__(1474);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/timeoutWith.js
/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_innerSubscribe PURE_IMPORTS_END */




function timeoutWith(due, withObservable, scheduler) {
  if (scheduler === void 0) {
    scheduler = scheduler_async["a" /* async */];
  }

  return function (source) {
    var absoluteTimeout = isDate(due);
    var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
    return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
  };
}

var TimeoutWithOperator = /*@__PURE__*/function () {
  function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
    this.waitFor = waitFor;
    this.absoluteTimeout = absoluteTimeout;
    this.withObservable = withObservable;
    this.scheduler = scheduler;
  }

  TimeoutWithOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new timeoutWith_TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
  };

  return TimeoutWithOperator;
}();

var timeoutWith_TimeoutWithSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](TimeoutWithSubscriber, _super);

  function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.absoluteTimeout = absoluteTimeout;
    _this.waitFor = waitFor;
    _this.withObservable = withObservable;
    _this.scheduler = scheduler;

    _this.scheduleTimeout();

    return _this;
  }

  TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
    var withObservable = subscriber.withObservable;

    subscriber._unsubscribeAndRecycle();

    subscriber.add(Object(innerSubscribe["c" /* innerSubscribe */])(withObservable, new innerSubscribe["a" /* SimpleInnerSubscriber */](subscriber)));
  };

  TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
    var action = this.action;

    if (action) {
      this.action = action.schedule(this, this.waitFor);
    } else {
      this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
    }
  };

  TimeoutWithSubscriber.prototype._next = function (value) {
    if (!this.absoluteTimeout) {
      this.scheduleTimeout();
    }

    _super.prototype._next.call(this, value);
  };

  TimeoutWithSubscriber.prototype._unsubscribe = function () {
    this.action = undefined;
    this.scheduler = null;
    this.withObservable = null;
  };

  return TimeoutWithSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/throwError.js
var throwError = __webpack_require__(1441);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/timeout.js
/** PURE_IMPORTS_START _scheduler_async,_util_TimeoutError,_timeoutWith,_observable_throwError PURE_IMPORTS_END */




function timeout(due, scheduler) {
  if (scheduler === void 0) {
    scheduler = scheduler_async["a" /* async */];
  }

  return timeoutWith(due, Object(throwError["a" /* throwError */])(new TimeoutError["a" /* TimeoutError */]()), scheduler);
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/timestamp.js
/** PURE_IMPORTS_START _scheduler_async,_map PURE_IMPORTS_END */


function timestamp(scheduler) {
  if (scheduler === void 0) {
    scheduler = scheduler_async["a" /* async */];
  }

  return Object(map["a" /* map */])(function (value) {
    return new Timestamp(value, scheduler.now());
  });
}

var Timestamp = /*@__PURE__*/function () {
  function Timestamp(value, timestamp) {
    this.value = value;
    this.timestamp = timestamp;
  }

  return Timestamp;
}();


// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/toArray.js
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */


function toArrayReducer(arr, item, index) {
  if (index === 0) {
    return [item];
  }

  arr.push(item);
  return arr;
}

function toArray() {
  return reduce(toArrayReducer, []);
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/window.js
/** PURE_IMPORTS_START tslib,_Subject,_innerSubscribe PURE_IMPORTS_END */



function window_window(windowBoundaries) {
  return function windowOperatorFunction(source) {
    return source.lift(new window_WindowOperator(windowBoundaries));
  };
}

var window_WindowOperator = /*@__PURE__*/function () {
  function WindowOperator(windowBoundaries) {
    this.windowBoundaries = windowBoundaries;
  }

  WindowOperator.prototype.call = function (subscriber, source) {
    var windowSubscriber = new window_WindowSubscriber(subscriber);
    var sourceSubscription = source.subscribe(windowSubscriber);

    if (!sourceSubscription.closed) {
      windowSubscriber.add(Object(innerSubscribe["c" /* innerSubscribe */])(this.windowBoundaries, new innerSubscribe["a" /* SimpleInnerSubscriber */](windowSubscriber)));
    }

    return sourceSubscription;
  };

  return WindowOperator;
}();

var window_WindowSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](WindowSubscriber, _super);

  function WindowSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.window = new Subject["a" /* Subject */]();
    destination.next(_this.window);
    return _this;
  }

  WindowSubscriber.prototype.notifyNext = function () {
    this.openWindow();
  };

  WindowSubscriber.prototype.notifyError = function (error) {
    this._error(error);
  };

  WindowSubscriber.prototype.notifyComplete = function () {
    this._complete();
  };

  WindowSubscriber.prototype._next = function (value) {
    this.window.next(value);
  };

  WindowSubscriber.prototype._error = function (err) {
    this.window.error(err);
    this.destination.error(err);
  };

  WindowSubscriber.prototype._complete = function () {
    this.window.complete();
    this.destination.complete();
  };

  WindowSubscriber.prototype._unsubscribe = function () {
    this.window = null;
  };

  WindowSubscriber.prototype.openWindow = function () {
    var prevWindow = this.window;

    if (prevWindow) {
      prevWindow.complete();
    }

    var destination = this.destination;
    var newWindow = this.window = new Subject["a" /* Subject */]();
    destination.next(newWindow);
  };

  return WindowSubscriber;
}(innerSubscribe["b" /* SimpleOuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/windowCount.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Subject PURE_IMPORTS_END */



function windowCount(windowSize, startWindowEvery) {
  if (startWindowEvery === void 0) {
    startWindowEvery = 0;
  }

  return function windowCountOperatorFunction(source) {
    return source.lift(new WindowCountOperator(windowSize, startWindowEvery));
  };
}

var WindowCountOperator = /*@__PURE__*/function () {
  function WindowCountOperator(windowSize, startWindowEvery) {
    this.windowSize = windowSize;
    this.startWindowEvery = startWindowEvery;
  }

  WindowCountOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new windowCount_WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
  };

  return WindowCountOperator;
}();

var windowCount_WindowCountSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](WindowCountSubscriber, _super);

  function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    _this.windowSize = windowSize;
    _this.startWindowEvery = startWindowEvery;
    _this.windows = [new Subject["a" /* Subject */]()];
    _this.count = 0;
    destination.next(_this.windows[0]);
    return _this;
  }

  WindowCountSubscriber.prototype._next = function (value) {
    var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
    var destination = this.destination;
    var windowSize = this.windowSize;
    var windows = this.windows;
    var len = windows.length;

    for (var i = 0; i < len && !this.closed; i++) {
      windows[i].next(value);
    }

    var c = this.count - windowSize + 1;

    if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
      windows.shift().complete();
    }

    if (++this.count % startWindowEvery === 0 && !this.closed) {
      var window_1 = new Subject["a" /* Subject */]();
      windows.push(window_1);
      destination.next(window_1);
    }
  };

  WindowCountSubscriber.prototype._error = function (err) {
    var windows = this.windows;

    if (windows) {
      while (windows.length > 0 && !this.closed) {
        windows.shift().error(err);
      }
    }

    this.destination.error(err);
  };

  WindowCountSubscriber.prototype._complete = function () {
    var windows = this.windows;

    if (windows) {
      while (windows.length > 0 && !this.closed) {
        windows.shift().complete();
      }
    }

    this.destination.complete();
  };

  WindowCountSubscriber.prototype._unsubscribe = function () {
    this.count = 0;
    this.windows = null;
  };

  return WindowCountSubscriber;
}(Subscriber["a" /* Subscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/windowTime.js
/** PURE_IMPORTS_START tslib,_Subject,_scheduler_async,_Subscriber,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */






function windowTime_windowTime(windowTimeSpan) {
  var scheduler = scheduler_async["a" /* async */];
  var windowCreationInterval = null;
  var maxWindowSize = Number.POSITIVE_INFINITY;

  if (Object(isScheduler["a" /* isScheduler */])(arguments[3])) {
    scheduler = arguments[3];
  }

  if (Object(isScheduler["a" /* isScheduler */])(arguments[2])) {
    scheduler = arguments[2];
  } else if (Object(isNumeric["a" /* isNumeric */])(arguments[2])) {
    maxWindowSize = Number(arguments[2]);
  }

  if (Object(isScheduler["a" /* isScheduler */])(arguments[1])) {
    scheduler = arguments[1];
  } else if (Object(isNumeric["a" /* isNumeric */])(arguments[1])) {
    windowCreationInterval = Number(arguments[1]);
  }

  return function windowTimeOperatorFunction(source) {
    return source.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
  };
}

var WindowTimeOperator = /*@__PURE__*/function () {
  function WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
    this.windowTimeSpan = windowTimeSpan;
    this.windowCreationInterval = windowCreationInterval;
    this.maxWindowSize = maxWindowSize;
    this.scheduler = scheduler;
  }

  WindowTimeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new windowTime_WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
  };

  return WindowTimeOperator;
}();

var windowTime_CountedSubject = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](CountedSubject, _super);

  function CountedSubject() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._numberOfNextedValues = 0;
    return _this;
  }

  CountedSubject.prototype.next = function (value) {
    this._numberOfNextedValues++;

    _super.prototype.next.call(this, value);
  };

  Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
    get: function get() {
      return this._numberOfNextedValues;
    },
    enumerable: true,
    configurable: true
  });
  return CountedSubject;
}(Subject["a" /* Subject */]);

var windowTime_WindowTimeSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](WindowTimeSubscriber, _super);

  function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    _this.windowTimeSpan = windowTimeSpan;
    _this.windowCreationInterval = windowCreationInterval;
    _this.maxWindowSize = maxWindowSize;
    _this.scheduler = scheduler;
    _this.windows = [];

    var window = _this.openWindow();

    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
      var closeState = {
        subscriber: _this,
        window: window,
        context: null
      };
      var creationState = {
        windowTimeSpan: windowTimeSpan,
        windowCreationInterval: windowCreationInterval,
        subscriber: _this,
        scheduler: scheduler
      };

      _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));

      _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
    } else {
      var timeSpanOnlyState = {
        subscriber: _this,
        window: window,
        windowTimeSpan: windowTimeSpan
      };

      _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
    }

    return _this;
  }

  WindowTimeSubscriber.prototype._next = function (value) {
    var windows = this.windows;
    var len = windows.length;

    for (var i = 0; i < len; i++) {
      var window_1 = windows[i];

      if (!window_1.closed) {
        window_1.next(value);

        if (window_1.numberOfNextedValues >= this.maxWindowSize) {
          this.closeWindow(window_1);
        }
      }
    }
  };

  WindowTimeSubscriber.prototype._error = function (err) {
    var windows = this.windows;

    while (windows.length > 0) {
      windows.shift().error(err);
    }

    this.destination.error(err);
  };

  WindowTimeSubscriber.prototype._complete = function () {
    var windows = this.windows;

    while (windows.length > 0) {
      var window_2 = windows.shift();

      if (!window_2.closed) {
        window_2.complete();
      }
    }

    this.destination.complete();
  };

  WindowTimeSubscriber.prototype.openWindow = function () {
    var window = new windowTime_CountedSubject();
    this.windows.push(window);
    var destination = this.destination;
    destination.next(window);
    return window;
  };

  WindowTimeSubscriber.prototype.closeWindow = function (window) {
    window.complete();
    var windows = this.windows;
    windows.splice(windows.indexOf(window), 1);
  };

  return WindowTimeSubscriber;
}(Subscriber["a" /* Subscriber */]);

function dispatchWindowTimeSpanOnly(state) {
  var subscriber = state.subscriber,
      windowTimeSpan = state.windowTimeSpan,
      window = state.window;

  if (window) {
    subscriber.closeWindow(window);
  }

  state.window = subscriber.openWindow();
  this.schedule(state, windowTimeSpan);
}

function dispatchWindowCreation(state) {
  var windowTimeSpan = state.windowTimeSpan,
      subscriber = state.subscriber,
      scheduler = state.scheduler,
      windowCreationInterval = state.windowCreationInterval;
  var window = subscriber.openWindow();
  var action = this;
  var context = {
    action: action,
    subscription: null
  };
  var timeSpanState = {
    subscriber: subscriber,
    window: window,
    context: context
  };
  context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
  action.add(context.subscription);
  action.schedule(state, windowCreationInterval);
}

function dispatchWindowClose(state) {
  var subscriber = state.subscriber,
      window = state.window,
      context = state.context;

  if (context && context.action && context.subscription) {
    context.action.remove(context.subscription);
  }

  subscriber.closeWindow(window);
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/windowToggle.js
/** PURE_IMPORTS_START tslib,_Subject,_Subscription,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function windowToggle(openings, closingSelector) {
  return function (source) {
    return source.lift(new WindowToggleOperator(openings, closingSelector));
  };
}

var WindowToggleOperator = /*@__PURE__*/function () {
  function WindowToggleOperator(openings, closingSelector) {
    this.openings = openings;
    this.closingSelector = closingSelector;
  }

  WindowToggleOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new windowToggle_WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
  };

  return WindowToggleOperator;
}();

var windowToggle_WindowToggleSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](WindowToggleSubscriber, _super);

  function WindowToggleSubscriber(destination, openings, closingSelector) {
    var _this = _super.call(this, destination) || this;

    _this.openings = openings;
    _this.closingSelector = closingSelector;
    _this.contexts = [];

    _this.add(_this.openSubscription = Object(subscribeToResult["a" /* subscribeToResult */])(_this, openings, openings));

    return _this;
  }

  WindowToggleSubscriber.prototype._next = function (value) {
    var contexts = this.contexts;

    if (contexts) {
      var len = contexts.length;

      for (var i = 0; i < len; i++) {
        contexts[i].window.next(value);
      }
    }
  };

  WindowToggleSubscriber.prototype._error = function (err) {
    var contexts = this.contexts;
    this.contexts = null;

    if (contexts) {
      var len = contexts.length;
      var index = -1;

      while (++index < len) {
        var context_1 = contexts[index];
        context_1.window.error(err);
        context_1.subscription.unsubscribe();
      }
    }

    _super.prototype._error.call(this, err);
  };

  WindowToggleSubscriber.prototype._complete = function () {
    var contexts = this.contexts;
    this.contexts = null;

    if (contexts) {
      var len = contexts.length;
      var index = -1;

      while (++index < len) {
        var context_2 = contexts[index];
        context_2.window.complete();
        context_2.subscription.unsubscribe();
      }
    }

    _super.prototype._complete.call(this);
  };

  WindowToggleSubscriber.prototype._unsubscribe = function () {
    var contexts = this.contexts;
    this.contexts = null;

    if (contexts) {
      var len = contexts.length;
      var index = -1;

      while (++index < len) {
        var context_3 = contexts[index];
        context_3.window.unsubscribe();
        context_3.subscription.unsubscribe();
      }
    }
  };

  WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
    if (outerValue === this.openings) {
      var closingNotifier = void 0;

      try {
        var closingSelector = this.closingSelector;
        closingNotifier = closingSelector(innerValue);
      } catch (e) {
        return this.error(e);
      }

      var window_1 = new Subject["a" /* Subject */]();
      var subscription = new Subscription["a" /* Subscription */]();
      var context_4 = {
        window: window_1,
        subscription: subscription
      };
      this.contexts.push(context_4);
      var innerSubscription = Object(subscribeToResult["a" /* subscribeToResult */])(this, closingNotifier, context_4);

      if (innerSubscription.closed) {
        this.closeWindow(this.contexts.length - 1);
      } else {
        innerSubscription.context = context_4;
        subscription.add(innerSubscription);
      }

      this.destination.next(window_1);
    } else {
      this.closeWindow(this.contexts.indexOf(outerValue));
    }
  };

  WindowToggleSubscriber.prototype.notifyError = function (err) {
    this.error(err);
  };

  WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
    if (inner !== this.openSubscription) {
      this.closeWindow(this.contexts.indexOf(inner.context));
    }
  };

  WindowToggleSubscriber.prototype.closeWindow = function (index) {
    if (index === -1) {
      return;
    }

    var contexts = this.contexts;
    var context = contexts[index];
    var window = context.window,
        subscription = context.subscription;
    contexts.splice(index, 1);
    window.complete();
    subscription.unsubscribe();
  };

  return WindowToggleSubscriber;
}(OuterSubscriber["a" /* OuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/windowWhen.js
/** PURE_IMPORTS_START tslib,_Subject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */




function windowWhen(closingSelector) {
  return function windowWhenOperatorFunction(source) {
    return source.lift(new windowWhen_WindowOperator(closingSelector));
  };
}

var windowWhen_WindowOperator = /*@__PURE__*/function () {
  function WindowOperator(closingSelector) {
    this.closingSelector = closingSelector;
  }

  WindowOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new windowWhen_WindowSubscriber(subscriber, this.closingSelector));
  };

  return WindowOperator;
}();

var windowWhen_WindowSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](WindowSubscriber, _super);

  function WindowSubscriber(destination, closingSelector) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    _this.closingSelector = closingSelector;

    _this.openWindow();

    return _this;
  }

  WindowSubscriber.prototype.notifyNext = function (_outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
    this.openWindow(innerSub);
  };

  WindowSubscriber.prototype.notifyError = function (error) {
    this._error(error);
  };

  WindowSubscriber.prototype.notifyComplete = function (innerSub) {
    this.openWindow(innerSub);
  };

  WindowSubscriber.prototype._next = function (value) {
    this.window.next(value);
  };

  WindowSubscriber.prototype._error = function (err) {
    this.window.error(err);
    this.destination.error(err);
    this.unsubscribeClosingNotification();
  };

  WindowSubscriber.prototype._complete = function () {
    this.window.complete();
    this.destination.complete();
    this.unsubscribeClosingNotification();
  };

  WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
    if (this.closingNotification) {
      this.closingNotification.unsubscribe();
    }
  };

  WindowSubscriber.prototype.openWindow = function (innerSub) {
    if (innerSub === void 0) {
      innerSub = null;
    }

    if (innerSub) {
      this.remove(innerSub);
      innerSub.unsubscribe();
    }

    var prevWindow = this.window;

    if (prevWindow) {
      prevWindow.complete();
    }

    var window = this.window = new Subject["a" /* Subject */]();
    this.destination.next(window);
    var closingNotifier;

    try {
      var closingSelector = this.closingSelector;
      closingNotifier = closingSelector();
    } catch (e) {
      this.destination.error(e);
      this.window.error(e);
      return;
    }

    this.add(this.closingNotification = Object(subscribeToResult["a" /* subscribeToResult */])(this, closingNotifier));
  };

  return WindowSubscriber;
}(OuterSubscriber["a" /* OuterSubscriber */]);
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/withLatestFrom.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function withLatestFrom() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return function (source) {
    var project;

    if (typeof args[args.length - 1] === 'function') {
      project = args.pop();
    }

    var observables = args;
    return source.lift(new WithLatestFromOperator(observables, project));
  };
}

var WithLatestFromOperator = /*@__PURE__*/function () {
  function WithLatestFromOperator(observables, project) {
    this.observables = observables;
    this.project = project;
  }

  WithLatestFromOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new withLatestFrom_WithLatestFromSubscriber(subscriber, this.observables, this.project));
  };

  return WithLatestFromOperator;
}();

var withLatestFrom_WithLatestFromSubscriber = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](WithLatestFromSubscriber, _super);

  function WithLatestFromSubscriber(destination, observables, project) {
    var _this = _super.call(this, destination) || this;

    _this.observables = observables;
    _this.project = project;
    _this.toRespond = [];
    var len = observables.length;
    _this.values = new Array(len);

    for (var i = 0; i < len; i++) {
      _this.toRespond.push(i);
    }

    for (var i = 0; i < len; i++) {
      var observable = observables[i];

      _this.add(Object(subscribeToResult["a" /* subscribeToResult */])(_this, observable, undefined, i));
    }

    return _this;
  }

  WithLatestFromSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
    this.values[outerIndex] = innerValue;
    var toRespond = this.toRespond;

    if (toRespond.length > 0) {
      var found = toRespond.indexOf(outerIndex);

      if (found !== -1) {
        toRespond.splice(found, 1);
      }
    }
  };

  WithLatestFromSubscriber.prototype.notifyComplete = function () {};

  WithLatestFromSubscriber.prototype._next = function (value) {
    if (this.toRespond.length === 0) {
      var args = [value].concat(this.values);

      if (this.project) {
        this._tryProject(args);
      } else {
        this.destination.next(args);
      }
    }
  };

  WithLatestFromSubscriber.prototype._tryProject = function (args) {
    var result;

    try {
      result = this.project.apply(this, args);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(result);
  };

  return WithLatestFromSubscriber;
}(OuterSubscriber["a" /* OuterSubscriber */]);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/zip.js
var zip = __webpack_require__(1447);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/zip.js
/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

function zip_zip() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  return function zipOperatorFunction(source) {
    return source.lift.call(zip["b" /* zip */].apply(void 0, [source].concat(observables)));
  };
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/zipAll.js
/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

function zipAll(project) {
  return function (source) {
    return source.lift(new zip["a" /* ZipOperator */](project));
  };
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/operators/index.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */








































































































/***/ }),

/***/ 1434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ AsyncAction_AsyncAction; });

// EXTERNAL MODULE: ./node_modules/rxjs/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(1380);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscription.js
var Subscription = __webpack_require__(1384);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/Action.js
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */



var Action_Action = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](Action, _super);

  function Action(scheduler, work) {
    return _super.call(this) || this;
  }

  Action.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return this;
  };

  return Action;
}(Subscription["a" /* Subscription */]);


// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js
/** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */



var AsyncAction_AsyncAction = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](AsyncAction, _super);

  function AsyncAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }

  AsyncAction.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (this.closed) {
      return this;
    }

    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;

    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }

    this.pending = true;
    this.delay = delay;
    this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
    return this;
  };

  AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return setInterval(scheduler.flush.bind(scheduler, this), delay);
  };

  AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && this.delay === delay && this.pending === false) {
      return id;
    }

    clearInterval(id);
    return undefined;
  };

  AsyncAction.prototype.execute = function (state, delay) {
    if (this.closed) {
      return new Error('executing a cancelled action');
    }

    this.pending = false;

    var error = this._execute(state, delay);

    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };

  AsyncAction.prototype._execute = function (state, delay) {
    var errored = false;
    var errorValue = undefined;

    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = !!e && e || new Error(e);
    }

    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };

  AsyncAction.prototype._unsubscribe = function () {
    var id = this.id;
    var scheduler = this.scheduler;
    var actions = scheduler.actions;
    var index = actions.indexOf(this);
    this.work = null;
    this.state = null;
    this.pending = false;
    this.scheduler = null;

    if (index !== -1) {
      actions.splice(index, 1);
    }

    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, null);
    }

    this.delay = null;
  };

  return AsyncAction;
}(Action_Action);



/***/ }),

/***/ 1436:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
  'use strict'; // Utils

  function assert(val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  } // Could use `inherits` module, but don't want to move from single file
  // architecture yet.


  function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function TempCtor() {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  } // BN


  function BN(number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0; // Reduction context

    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }

  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;
  var Buffer;

  try {
    if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {
      Buffer = window.Buffer;
    } else {
      Buffer = __webpack_require__(1613).Buffer;
    }
  } catch (e) {}

  BN.isBN = function isBN(num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' && num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max(left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min(left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init(number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }

    assert(base === (base | 0) && base >= 2 && base <= 36);
    number = number.toString().replace(/\s+/g, '');
    var start = 0;

    if (number[0] === '-') {
      start++;
      this.negative = 1;
    }

    if (start < number.length) {
      if (base === 16) {
        this._parseHex(number, start, endian);
      } else {
        this._parseBase(number, base, start);

        if (endian === 'le') {
          this._initArray(this.toArray(), base, endian);
        }
      }
    }
  };

  BN.prototype._initNumber = function _initNumber(number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }

    if (number < 0x4000000) {
      this.words = [number & 0x3ffffff];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [number & 0x3ffffff, number / 0x4000000 & 0x3ffffff];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)

      this.words = [number & 0x3ffffff, number / 0x4000000 & 0x3ffffff, 1];
      this.length = 3;
    }

    if (endian !== 'le') return; // Reverse the bytes

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray(number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');

    if (number.length <= 0) {
      this.words = [0];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);

    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;

    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
        this.words[j] |= w << off & 0x3ffffff;
        this.words[j + 1] = w >>> 26 - off & 0x3ffffff;
        off += 24;

        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
        this.words[j] |= w << off & 0x3ffffff;
        this.words[j + 1] = w >>> 26 - off & 0x3ffffff;
        off += 24;

        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }

    return this._strip();
  };

  function parseHex4Bits(string, index) {
    var c = string.charCodeAt(index); // '0' - '9'

    if (c >= 48 && c <= 57) {
      return c - 48; // 'A' - 'F'
    } else if (c >= 65 && c <= 70) {
      return c - 55; // 'a' - 'f'
    } else if (c >= 97 && c <= 102) {
      return c - 87;
    } else {
      assert(false, 'Invalid character in ' + string);
    }
  }

  function parseHexByte(string, lowerBound, index) {
    var r = parseHex4Bits(string, index);

    if (index - 1 >= lowerBound) {
      r |= parseHex4Bits(string, index - 1) << 4;
    }

    return r;
  }

  BN.prototype._parseHex = function _parseHex(number, start, endian) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);

    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    } // 24-bits chunks


    var off = 0;
    var j = 0;
    var w;

    if (endian === 'be') {
      for (i = number.length - 1; i >= start; i -= 2) {
        w = parseHexByte(number, start, i) << off;
        this.words[j] |= w & 0x3ffffff;

        if (off >= 18) {
          off -= 18;
          j += 1;
          this.words[j] |= w >>> 26;
        } else {
          off += 8;
        }
      }
    } else {
      var parseLength = number.length - start;

      for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
        w = parseHexByte(number, start, i) << off;
        this.words[j] |= w & 0x3ffffff;

        if (off >= 18) {
          off -= 18;
          j += 1;
          this.words[j] |= w >>> 26;
        } else {
          off += 8;
        }
      }
    }

    this._strip();
  };

  function parseBase(str, start, end, mul) {
    var r = 0;
    var b = 0;
    var len = Math.min(str.length, end);

    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;
      r *= mul; // 'a'

      if (c >= 49) {
        b = c - 49 + 0xa; // 'A'
      } else if (c >= 17) {
        b = c - 17 + 0xa; // '0' - '9'
      } else {
        b = c;
      }

      assert(c >= 0 && b < mul, 'Invalid character');
      r += b;
    }

    return r;
  }

  BN.prototype._parseBase = function _parseBase(number, base, start) {
    // Initialize as zero
    this.words = [0];
    this.length = 1; // Find length of limb in base

    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }

    limbLen--;
    limbPow = limbPow / base | 0;
    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;
    var word = 0;

    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);
      this.imuln(limbPow);

      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);

      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    this._strip();
  };

  BN.prototype.copy = function copy(dest) {
    dest.words = new Array(this.length);

    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }

    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  function move(dest, src) {
    dest.words = src.words;
    dest.length = src.length;
    dest.negative = src.negative;
    dest.red = src.red;
  }

  BN.prototype._move = function _move(dest) {
    move(dest, this);
  };

  BN.prototype.clone = function clone() {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand(size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }

    return this;
  }; // Remove leading `0` from `this`


  BN.prototype._strip = function strip() {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }

    return this._normSign();
  };

  BN.prototype._normSign = function _normSign() {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }

    return this;
  }; // Check Symbol.for because not everywhere where Symbol defined
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Browser_compatibility


  if (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function') {
    try {
      BN.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspect;
    } catch (e) {
      BN.prototype.inspect = inspect;
    }
  } else {
    BN.prototype.inspect = inspect;
  }

  function inspect() {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  }
  /*
   var zeros = [];
  var groupSizes = [];
  var groupBases = [];
   var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }
   */


  var zeros = ['', '0', '00', '000', '0000', '00000', '000000', '0000000', '00000000', '000000000', '0000000000', '00000000000', '000000000000', '0000000000000', '00000000000000', '000000000000000', '0000000000000000', '00000000000000000', '000000000000000000', '0000000000000000000', '00000000000000000000', '000000000000000000000', '0000000000000000000000', '00000000000000000000000', '000000000000000000000000', '0000000000000000000000000'];
  var groupSizes = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
  var groupBases = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

  BN.prototype.toString = function toString(base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;
    var out;

    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;

      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = ((w << off | carry) & 0xffffff).toString(16);
        carry = w >>> 24 - off & 0xffffff;

        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }

        off += 2;

        if (off >= 26) {
          off -= 26;
          i--;
        }
      }

      if (carry !== 0) {
        out = carry.toString(16) + out;
      }

      while (out.length % padding !== 0) {
        out = '0' + out;
      }

      if (this.negative !== 0) {
        out = '-' + out;
      }

      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base]; // var groupBase = Math.pow(base, groupSize);

      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;

      while (!c.isZero()) {
        var r = c.modrn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }

      if (this.isZero()) {
        out = '0' + out;
      }

      while (out.length % padding !== 0) {
        out = '0' + out;
      }

      if (this.negative !== 0) {
        out = '-' + out;
      }

      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber() {
    var ret = this.words[0];

    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + this.words[1] * 0x4000000;
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }

    return this.negative !== 0 ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON() {
    return this.toString(16, 2);
  };

  if (Buffer) {
    BN.prototype.toBuffer = function toBuffer(endian, length) {
      return this.toArrayLike(Buffer, endian, length);
    };
  }

  BN.prototype.toArray = function toArray(endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  var allocate = function allocate(ArrayType, size) {
    if (ArrayType.allocUnsafe) {
      return ArrayType.allocUnsafe(size);
    }

    return new ArrayType(size);
  };

  BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
    this._strip();

    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');
    var res = allocate(ArrayType, reqLength);
    var postfix = endian === 'le' ? 'LE' : 'BE';
    this['_toArrayLike' + postfix](res, byteLength);
    return res;
  };

  BN.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
    var position = 0;
    var carry = 0;

    for (var i = 0, shift = 0; i < this.length; i++) {
      var word = this.words[i] << shift | carry;
      res[position++] = word & 0xff;

      if (position < res.length) {
        res[position++] = word >> 8 & 0xff;
      }

      if (position < res.length) {
        res[position++] = word >> 16 & 0xff;
      }

      if (shift === 6) {
        if (position < res.length) {
          res[position++] = word >> 24 & 0xff;
        }

        carry = 0;
        shift = 0;
      } else {
        carry = word >>> 24;
        shift += 2;
      }
    }

    if (position < res.length) {
      res[position++] = carry;

      while (position < res.length) {
        res[position++] = 0;
      }
    }
  };

  BN.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
    var position = res.length - 1;
    var carry = 0;

    for (var i = 0, shift = 0; i < this.length; i++) {
      var word = this.words[i] << shift | carry;
      res[position--] = word & 0xff;

      if (position >= 0) {
        res[position--] = word >> 8 & 0xff;
      }

      if (position >= 0) {
        res[position--] = word >> 16 & 0xff;
      }

      if (shift === 6) {
        if (position >= 0) {
          res[position--] = word >> 24 & 0xff;
        }

        carry = 0;
        shift = 0;
      } else {
        carry = word >>> 24;
        shift += 2;
      }
    }

    if (position >= 0) {
      res[position--] = carry;

      while (position >= 0) {
        res[position--] = 0;
      }
    }
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits(w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits(w) {
      var t = w;
      var r = 0;

      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }

      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }

      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }

      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }

      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits(w) {
    // Short-cut
    if (w === 0) return 26;
    var t = w;
    var r = 0;

    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }

    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }

    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }

    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }

    if ((t & 0x1) === 0) {
      r++;
    }

    return r;
  }; // Return number of used bits in a BN


  BN.prototype.bitLength = function bitLength() {
    var w = this.words[this.length - 1];

    var hi = this._countBits(w);

    return (this.length - 1) * 26 + hi;
  };

  function toBitArray(num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = bit / 26 | 0;
      var wbit = bit % 26;
      w[bit] = num.words[off] >>> wbit & 0x01;
    }

    return w;
  } // Number of trailing zero bits


  BN.prototype.zeroBits = function zeroBits() {
    if (this.isZero()) return 0;
    var r = 0;

    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);

      r += b;
      if (b !== 26) break;
    }

    return r;
  };

  BN.prototype.byteLength = function byteLength() {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos(width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }

    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos(width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }

    return this.clone();
  };

  BN.prototype.isNeg = function isNeg() {
    return this.negative !== 0;
  }; // Return negative clone of `this`


  BN.prototype.neg = function neg() {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg() {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  }; // Or `num` with `this` in-place


  BN.prototype.iuor = function iuor(num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this._strip();
  };

  BN.prototype.ior = function ior(num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  }; // Or `num` with `this`


  BN.prototype.or = function or(num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor(num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  }; // And `num` with `this` in-place


  BN.prototype.iuand = function iuand(num) {
    // b = min-length(num, this)
    var b;

    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;
    return this._strip();
  };

  BN.prototype.iand = function iand(num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  }; // And `num` with `this`


  BN.prototype.and = function and(num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand(num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  }; // Xor `num` with `this` in-place


  BN.prototype.iuxor = function iuxor(num) {
    // a.length > b.length
    var a;
    var b;

    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;
    return this._strip();
  };

  BN.prototype.ixor = function ixor(num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  }; // Xor `num` with `this`


  BN.prototype.xor = function xor(num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor(num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  }; // Not ``this`` with ``width`` bitwidth


  BN.prototype.inotn = function inotn(width) {
    assert(typeof width === 'number' && width >= 0);
    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26; // Extend the buffer with leading zeroes

    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    } // Handle complete words


    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    } // Handle the residue


    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & 0x3ffffff >> 26 - bitsLeft;
    } // And remove leading zeroes


    return this._strip();
  };

  BN.prototype.notn = function notn(width) {
    return this.clone().inotn(width);
  }; // Set `bit` of `this`


  BN.prototype.setn = function setn(bit, val) {
    assert(typeof bit === 'number' && bit >= 0);
    var off = bit / 26 | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | 1 << wbit;
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this._strip();
  }; // Add `num` to `this` in-place


  BN.prototype.iadd = function iadd(num) {
    var r; // negative + positive

    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign(); // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    } // a.length > b.length


    var a, b;

    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;

    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;

    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++; // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  }; // Add `num` to `this`


  BN.prototype.add = function add(num) {
    var res;

    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);
    return num.clone().iadd(this);
  }; // Subtract `num` from `this` in-place


  BN.prototype.isub = function isub(num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign(); // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    } // At this point both numbers are positive


    var cmp = this.cmp(num); // Optimization - zeroify

    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    } // a > b


    var a, b;

    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;

    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    } // Copy rest of the words


    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this._strip();
  }; // Subtract `num` from `this`


  BN.prototype.sub = function sub(num) {
    return this.clone().isub(num);
  };

  function smallMulTo(self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = self.length + num.length | 0;
    out.length = len;
    len = len - 1 | 0; // Peel one iteration (compiler can't do it, because of code complexity)

    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;
    var lo = r & 0x3ffffff;
    var carry = r / 0x4000000 | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);

      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += r / 0x4000000 | 0;
        rword = r & 0x3ffffff;
      }

      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }

    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out._strip();
  } // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).


  var comb10MulTo = function comb10MulTo(self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;
    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */

    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = mid + Math.imul(ah0, bl0) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */

    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = mid + Math.imul(ah1, bl0) | 0;
    hi = Math.imul(ah1, bh0);
    lo = lo + Math.imul(al0, bl1) | 0;
    mid = mid + Math.imul(al0, bh1) | 0;
    mid = mid + Math.imul(ah0, bl1) | 0;
    hi = hi + Math.imul(ah0, bh1) | 0;
    var w1 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */

    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = mid + Math.imul(ah2, bl0) | 0;
    hi = Math.imul(ah2, bh0);
    lo = lo + Math.imul(al1, bl1) | 0;
    mid = mid + Math.imul(al1, bh1) | 0;
    mid = mid + Math.imul(ah1, bl1) | 0;
    hi = hi + Math.imul(ah1, bh1) | 0;
    lo = lo + Math.imul(al0, bl2) | 0;
    mid = mid + Math.imul(al0, bh2) | 0;
    mid = mid + Math.imul(ah0, bl2) | 0;
    hi = hi + Math.imul(ah0, bh2) | 0;
    var w2 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */

    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = mid + Math.imul(ah3, bl0) | 0;
    hi = Math.imul(ah3, bh0);
    lo = lo + Math.imul(al2, bl1) | 0;
    mid = mid + Math.imul(al2, bh1) | 0;
    mid = mid + Math.imul(ah2, bl1) | 0;
    hi = hi + Math.imul(ah2, bh1) | 0;
    lo = lo + Math.imul(al1, bl2) | 0;
    mid = mid + Math.imul(al1, bh2) | 0;
    mid = mid + Math.imul(ah1, bl2) | 0;
    hi = hi + Math.imul(ah1, bh2) | 0;
    lo = lo + Math.imul(al0, bl3) | 0;
    mid = mid + Math.imul(al0, bh3) | 0;
    mid = mid + Math.imul(ah0, bl3) | 0;
    hi = hi + Math.imul(ah0, bh3) | 0;
    var w3 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */

    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = mid + Math.imul(ah4, bl0) | 0;
    hi = Math.imul(ah4, bh0);
    lo = lo + Math.imul(al3, bl1) | 0;
    mid = mid + Math.imul(al3, bh1) | 0;
    mid = mid + Math.imul(ah3, bl1) | 0;
    hi = hi + Math.imul(ah3, bh1) | 0;
    lo = lo + Math.imul(al2, bl2) | 0;
    mid = mid + Math.imul(al2, bh2) | 0;
    mid = mid + Math.imul(ah2, bl2) | 0;
    hi = hi + Math.imul(ah2, bh2) | 0;
    lo = lo + Math.imul(al1, bl3) | 0;
    mid = mid + Math.imul(al1, bh3) | 0;
    mid = mid + Math.imul(ah1, bl3) | 0;
    hi = hi + Math.imul(ah1, bh3) | 0;
    lo = lo + Math.imul(al0, bl4) | 0;
    mid = mid + Math.imul(al0, bh4) | 0;
    mid = mid + Math.imul(ah0, bl4) | 0;
    hi = hi + Math.imul(ah0, bh4) | 0;
    var w4 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */

    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = mid + Math.imul(ah5, bl0) | 0;
    hi = Math.imul(ah5, bh0);
    lo = lo + Math.imul(al4, bl1) | 0;
    mid = mid + Math.imul(al4, bh1) | 0;
    mid = mid + Math.imul(ah4, bl1) | 0;
    hi = hi + Math.imul(ah4, bh1) | 0;
    lo = lo + Math.imul(al3, bl2) | 0;
    mid = mid + Math.imul(al3, bh2) | 0;
    mid = mid + Math.imul(ah3, bl2) | 0;
    hi = hi + Math.imul(ah3, bh2) | 0;
    lo = lo + Math.imul(al2, bl3) | 0;
    mid = mid + Math.imul(al2, bh3) | 0;
    mid = mid + Math.imul(ah2, bl3) | 0;
    hi = hi + Math.imul(ah2, bh3) | 0;
    lo = lo + Math.imul(al1, bl4) | 0;
    mid = mid + Math.imul(al1, bh4) | 0;
    mid = mid + Math.imul(ah1, bl4) | 0;
    hi = hi + Math.imul(ah1, bh4) | 0;
    lo = lo + Math.imul(al0, bl5) | 0;
    mid = mid + Math.imul(al0, bh5) | 0;
    mid = mid + Math.imul(ah0, bl5) | 0;
    hi = hi + Math.imul(ah0, bh5) | 0;
    var w5 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */

    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = mid + Math.imul(ah6, bl0) | 0;
    hi = Math.imul(ah6, bh0);
    lo = lo + Math.imul(al5, bl1) | 0;
    mid = mid + Math.imul(al5, bh1) | 0;
    mid = mid + Math.imul(ah5, bl1) | 0;
    hi = hi + Math.imul(ah5, bh1) | 0;
    lo = lo + Math.imul(al4, bl2) | 0;
    mid = mid + Math.imul(al4, bh2) | 0;
    mid = mid + Math.imul(ah4, bl2) | 0;
    hi = hi + Math.imul(ah4, bh2) | 0;
    lo = lo + Math.imul(al3, bl3) | 0;
    mid = mid + Math.imul(al3, bh3) | 0;
    mid = mid + Math.imul(ah3, bl3) | 0;
    hi = hi + Math.imul(ah3, bh3) | 0;
    lo = lo + Math.imul(al2, bl4) | 0;
    mid = mid + Math.imul(al2, bh4) | 0;
    mid = mid + Math.imul(ah2, bl4) | 0;
    hi = hi + Math.imul(ah2, bh4) | 0;
    lo = lo + Math.imul(al1, bl5) | 0;
    mid = mid + Math.imul(al1, bh5) | 0;
    mid = mid + Math.imul(ah1, bl5) | 0;
    hi = hi + Math.imul(ah1, bh5) | 0;
    lo = lo + Math.imul(al0, bl6) | 0;
    mid = mid + Math.imul(al0, bh6) | 0;
    mid = mid + Math.imul(ah0, bl6) | 0;
    hi = hi + Math.imul(ah0, bh6) | 0;
    var w6 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */

    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = mid + Math.imul(ah7, bl0) | 0;
    hi = Math.imul(ah7, bh0);
    lo = lo + Math.imul(al6, bl1) | 0;
    mid = mid + Math.imul(al6, bh1) | 0;
    mid = mid + Math.imul(ah6, bl1) | 0;
    hi = hi + Math.imul(ah6, bh1) | 0;
    lo = lo + Math.imul(al5, bl2) | 0;
    mid = mid + Math.imul(al5, bh2) | 0;
    mid = mid + Math.imul(ah5, bl2) | 0;
    hi = hi + Math.imul(ah5, bh2) | 0;
    lo = lo + Math.imul(al4, bl3) | 0;
    mid = mid + Math.imul(al4, bh3) | 0;
    mid = mid + Math.imul(ah4, bl3) | 0;
    hi = hi + Math.imul(ah4, bh3) | 0;
    lo = lo + Math.imul(al3, bl4) | 0;
    mid = mid + Math.imul(al3, bh4) | 0;
    mid = mid + Math.imul(ah3, bl4) | 0;
    hi = hi + Math.imul(ah3, bh4) | 0;
    lo = lo + Math.imul(al2, bl5) | 0;
    mid = mid + Math.imul(al2, bh5) | 0;
    mid = mid + Math.imul(ah2, bl5) | 0;
    hi = hi + Math.imul(ah2, bh5) | 0;
    lo = lo + Math.imul(al1, bl6) | 0;
    mid = mid + Math.imul(al1, bh6) | 0;
    mid = mid + Math.imul(ah1, bl6) | 0;
    hi = hi + Math.imul(ah1, bh6) | 0;
    lo = lo + Math.imul(al0, bl7) | 0;
    mid = mid + Math.imul(al0, bh7) | 0;
    mid = mid + Math.imul(ah0, bl7) | 0;
    hi = hi + Math.imul(ah0, bh7) | 0;
    var w7 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */

    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = mid + Math.imul(ah8, bl0) | 0;
    hi = Math.imul(ah8, bh0);
    lo = lo + Math.imul(al7, bl1) | 0;
    mid = mid + Math.imul(al7, bh1) | 0;
    mid = mid + Math.imul(ah7, bl1) | 0;
    hi = hi + Math.imul(ah7, bh1) | 0;
    lo = lo + Math.imul(al6, bl2) | 0;
    mid = mid + Math.imul(al6, bh2) | 0;
    mid = mid + Math.imul(ah6, bl2) | 0;
    hi = hi + Math.imul(ah6, bh2) | 0;
    lo = lo + Math.imul(al5, bl3) | 0;
    mid = mid + Math.imul(al5, bh3) | 0;
    mid = mid + Math.imul(ah5, bl3) | 0;
    hi = hi + Math.imul(ah5, bh3) | 0;
    lo = lo + Math.imul(al4, bl4) | 0;
    mid = mid + Math.imul(al4, bh4) | 0;
    mid = mid + Math.imul(ah4, bl4) | 0;
    hi = hi + Math.imul(ah4, bh4) | 0;
    lo = lo + Math.imul(al3, bl5) | 0;
    mid = mid + Math.imul(al3, bh5) | 0;
    mid = mid + Math.imul(ah3, bl5) | 0;
    hi = hi + Math.imul(ah3, bh5) | 0;
    lo = lo + Math.imul(al2, bl6) | 0;
    mid = mid + Math.imul(al2, bh6) | 0;
    mid = mid + Math.imul(ah2, bl6) | 0;
    hi = hi + Math.imul(ah2, bh6) | 0;
    lo = lo + Math.imul(al1, bl7) | 0;
    mid = mid + Math.imul(al1, bh7) | 0;
    mid = mid + Math.imul(ah1, bl7) | 0;
    hi = hi + Math.imul(ah1, bh7) | 0;
    lo = lo + Math.imul(al0, bl8) | 0;
    mid = mid + Math.imul(al0, bh8) | 0;
    mid = mid + Math.imul(ah0, bl8) | 0;
    hi = hi + Math.imul(ah0, bh8) | 0;
    var w8 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */

    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = mid + Math.imul(ah9, bl0) | 0;
    hi = Math.imul(ah9, bh0);
    lo = lo + Math.imul(al8, bl1) | 0;
    mid = mid + Math.imul(al8, bh1) | 0;
    mid = mid + Math.imul(ah8, bl1) | 0;
    hi = hi + Math.imul(ah8, bh1) | 0;
    lo = lo + Math.imul(al7, bl2) | 0;
    mid = mid + Math.imul(al7, bh2) | 0;
    mid = mid + Math.imul(ah7, bl2) | 0;
    hi = hi + Math.imul(ah7, bh2) | 0;
    lo = lo + Math.imul(al6, bl3) | 0;
    mid = mid + Math.imul(al6, bh3) | 0;
    mid = mid + Math.imul(ah6, bl3) | 0;
    hi = hi + Math.imul(ah6, bh3) | 0;
    lo = lo + Math.imul(al5, bl4) | 0;
    mid = mid + Math.imul(al5, bh4) | 0;
    mid = mid + Math.imul(ah5, bl4) | 0;
    hi = hi + Math.imul(ah5, bh4) | 0;
    lo = lo + Math.imul(al4, bl5) | 0;
    mid = mid + Math.imul(al4, bh5) | 0;
    mid = mid + Math.imul(ah4, bl5) | 0;
    hi = hi + Math.imul(ah4, bh5) | 0;
    lo = lo + Math.imul(al3, bl6) | 0;
    mid = mid + Math.imul(al3, bh6) | 0;
    mid = mid + Math.imul(ah3, bl6) | 0;
    hi = hi + Math.imul(ah3, bh6) | 0;
    lo = lo + Math.imul(al2, bl7) | 0;
    mid = mid + Math.imul(al2, bh7) | 0;
    mid = mid + Math.imul(ah2, bl7) | 0;
    hi = hi + Math.imul(ah2, bh7) | 0;
    lo = lo + Math.imul(al1, bl8) | 0;
    mid = mid + Math.imul(al1, bh8) | 0;
    mid = mid + Math.imul(ah1, bl8) | 0;
    hi = hi + Math.imul(ah1, bh8) | 0;
    lo = lo + Math.imul(al0, bl9) | 0;
    mid = mid + Math.imul(al0, bh9) | 0;
    mid = mid + Math.imul(ah0, bl9) | 0;
    hi = hi + Math.imul(ah0, bh9) | 0;
    var w9 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */

    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = mid + Math.imul(ah9, bl1) | 0;
    hi = Math.imul(ah9, bh1);
    lo = lo + Math.imul(al8, bl2) | 0;
    mid = mid + Math.imul(al8, bh2) | 0;
    mid = mid + Math.imul(ah8, bl2) | 0;
    hi = hi + Math.imul(ah8, bh2) | 0;
    lo = lo + Math.imul(al7, bl3) | 0;
    mid = mid + Math.imul(al7, bh3) | 0;
    mid = mid + Math.imul(ah7, bl3) | 0;
    hi = hi + Math.imul(ah7, bh3) | 0;
    lo = lo + Math.imul(al6, bl4) | 0;
    mid = mid + Math.imul(al6, bh4) | 0;
    mid = mid + Math.imul(ah6, bl4) | 0;
    hi = hi + Math.imul(ah6, bh4) | 0;
    lo = lo + Math.imul(al5, bl5) | 0;
    mid = mid + Math.imul(al5, bh5) | 0;
    mid = mid + Math.imul(ah5, bl5) | 0;
    hi = hi + Math.imul(ah5, bh5) | 0;
    lo = lo + Math.imul(al4, bl6) | 0;
    mid = mid + Math.imul(al4, bh6) | 0;
    mid = mid + Math.imul(ah4, bl6) | 0;
    hi = hi + Math.imul(ah4, bh6) | 0;
    lo = lo + Math.imul(al3, bl7) | 0;
    mid = mid + Math.imul(al3, bh7) | 0;
    mid = mid + Math.imul(ah3, bl7) | 0;
    hi = hi + Math.imul(ah3, bh7) | 0;
    lo = lo + Math.imul(al2, bl8) | 0;
    mid = mid + Math.imul(al2, bh8) | 0;
    mid = mid + Math.imul(ah2, bl8) | 0;
    hi = hi + Math.imul(ah2, bh8) | 0;
    lo = lo + Math.imul(al1, bl9) | 0;
    mid = mid + Math.imul(al1, bh9) | 0;
    mid = mid + Math.imul(ah1, bl9) | 0;
    hi = hi + Math.imul(ah1, bh9) | 0;
    var w10 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */

    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = mid + Math.imul(ah9, bl2) | 0;
    hi = Math.imul(ah9, bh2);
    lo = lo + Math.imul(al8, bl3) | 0;
    mid = mid + Math.imul(al8, bh3) | 0;
    mid = mid + Math.imul(ah8, bl3) | 0;
    hi = hi + Math.imul(ah8, bh3) | 0;
    lo = lo + Math.imul(al7, bl4) | 0;
    mid = mid + Math.imul(al7, bh4) | 0;
    mid = mid + Math.imul(ah7, bl4) | 0;
    hi = hi + Math.imul(ah7, bh4) | 0;
    lo = lo + Math.imul(al6, bl5) | 0;
    mid = mid + Math.imul(al6, bh5) | 0;
    mid = mid + Math.imul(ah6, bl5) | 0;
    hi = hi + Math.imul(ah6, bh5) | 0;
    lo = lo + Math.imul(al5, bl6) | 0;
    mid = mid + Math.imul(al5, bh6) | 0;
    mid = mid + Math.imul(ah5, bl6) | 0;
    hi = hi + Math.imul(ah5, bh6) | 0;
    lo = lo + Math.imul(al4, bl7) | 0;
    mid = mid + Math.imul(al4, bh7) | 0;
    mid = mid + Math.imul(ah4, bl7) | 0;
    hi = hi + Math.imul(ah4, bh7) | 0;
    lo = lo + Math.imul(al3, bl8) | 0;
    mid = mid + Math.imul(al3, bh8) | 0;
    mid = mid + Math.imul(ah3, bl8) | 0;
    hi = hi + Math.imul(ah3, bh8) | 0;
    lo = lo + Math.imul(al2, bl9) | 0;
    mid = mid + Math.imul(al2, bh9) | 0;
    mid = mid + Math.imul(ah2, bl9) | 0;
    hi = hi + Math.imul(ah2, bh9) | 0;
    var w11 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */

    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = mid + Math.imul(ah9, bl3) | 0;
    hi = Math.imul(ah9, bh3);
    lo = lo + Math.imul(al8, bl4) | 0;
    mid = mid + Math.imul(al8, bh4) | 0;
    mid = mid + Math.imul(ah8, bl4) | 0;
    hi = hi + Math.imul(ah8, bh4) | 0;
    lo = lo + Math.imul(al7, bl5) | 0;
    mid = mid + Math.imul(al7, bh5) | 0;
    mid = mid + Math.imul(ah7, bl5) | 0;
    hi = hi + Math.imul(ah7, bh5) | 0;
    lo = lo + Math.imul(al6, bl6) | 0;
    mid = mid + Math.imul(al6, bh6) | 0;
    mid = mid + Math.imul(ah6, bl6) | 0;
    hi = hi + Math.imul(ah6, bh6) | 0;
    lo = lo + Math.imul(al5, bl7) | 0;
    mid = mid + Math.imul(al5, bh7) | 0;
    mid = mid + Math.imul(ah5, bl7) | 0;
    hi = hi + Math.imul(ah5, bh7) | 0;
    lo = lo + Math.imul(al4, bl8) | 0;
    mid = mid + Math.imul(al4, bh8) | 0;
    mid = mid + Math.imul(ah4, bl8) | 0;
    hi = hi + Math.imul(ah4, bh8) | 0;
    lo = lo + Math.imul(al3, bl9) | 0;
    mid = mid + Math.imul(al3, bh9) | 0;
    mid = mid + Math.imul(ah3, bl9) | 0;
    hi = hi + Math.imul(ah3, bh9) | 0;
    var w12 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */

    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = mid + Math.imul(ah9, bl4) | 0;
    hi = Math.imul(ah9, bh4);
    lo = lo + Math.imul(al8, bl5) | 0;
    mid = mid + Math.imul(al8, bh5) | 0;
    mid = mid + Math.imul(ah8, bl5) | 0;
    hi = hi + Math.imul(ah8, bh5) | 0;
    lo = lo + Math.imul(al7, bl6) | 0;
    mid = mid + Math.imul(al7, bh6) | 0;
    mid = mid + Math.imul(ah7, bl6) | 0;
    hi = hi + Math.imul(ah7, bh6) | 0;
    lo = lo + Math.imul(al6, bl7) | 0;
    mid = mid + Math.imul(al6, bh7) | 0;
    mid = mid + Math.imul(ah6, bl7) | 0;
    hi = hi + Math.imul(ah6, bh7) | 0;
    lo = lo + Math.imul(al5, bl8) | 0;
    mid = mid + Math.imul(al5, bh8) | 0;
    mid = mid + Math.imul(ah5, bl8) | 0;
    hi = hi + Math.imul(ah5, bh8) | 0;
    lo = lo + Math.imul(al4, bl9) | 0;
    mid = mid + Math.imul(al4, bh9) | 0;
    mid = mid + Math.imul(ah4, bl9) | 0;
    hi = hi + Math.imul(ah4, bh9) | 0;
    var w13 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */

    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = mid + Math.imul(ah9, bl5) | 0;
    hi = Math.imul(ah9, bh5);
    lo = lo + Math.imul(al8, bl6) | 0;
    mid = mid + Math.imul(al8, bh6) | 0;
    mid = mid + Math.imul(ah8, bl6) | 0;
    hi = hi + Math.imul(ah8, bh6) | 0;
    lo = lo + Math.imul(al7, bl7) | 0;
    mid = mid + Math.imul(al7, bh7) | 0;
    mid = mid + Math.imul(ah7, bl7) | 0;
    hi = hi + Math.imul(ah7, bh7) | 0;
    lo = lo + Math.imul(al6, bl8) | 0;
    mid = mid + Math.imul(al6, bh8) | 0;
    mid = mid + Math.imul(ah6, bl8) | 0;
    hi = hi + Math.imul(ah6, bh8) | 0;
    lo = lo + Math.imul(al5, bl9) | 0;
    mid = mid + Math.imul(al5, bh9) | 0;
    mid = mid + Math.imul(ah5, bl9) | 0;
    hi = hi + Math.imul(ah5, bh9) | 0;
    var w14 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */

    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = mid + Math.imul(ah9, bl6) | 0;
    hi = Math.imul(ah9, bh6);
    lo = lo + Math.imul(al8, bl7) | 0;
    mid = mid + Math.imul(al8, bh7) | 0;
    mid = mid + Math.imul(ah8, bl7) | 0;
    hi = hi + Math.imul(ah8, bh7) | 0;
    lo = lo + Math.imul(al7, bl8) | 0;
    mid = mid + Math.imul(al7, bh8) | 0;
    mid = mid + Math.imul(ah7, bl8) | 0;
    hi = hi + Math.imul(ah7, bh8) | 0;
    lo = lo + Math.imul(al6, bl9) | 0;
    mid = mid + Math.imul(al6, bh9) | 0;
    mid = mid + Math.imul(ah6, bl9) | 0;
    hi = hi + Math.imul(ah6, bh9) | 0;
    var w15 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */

    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = mid + Math.imul(ah9, bl7) | 0;
    hi = Math.imul(ah9, bh7);
    lo = lo + Math.imul(al8, bl8) | 0;
    mid = mid + Math.imul(al8, bh8) | 0;
    mid = mid + Math.imul(ah8, bl8) | 0;
    hi = hi + Math.imul(ah8, bh8) | 0;
    lo = lo + Math.imul(al7, bl9) | 0;
    mid = mid + Math.imul(al7, bh9) | 0;
    mid = mid + Math.imul(ah7, bl9) | 0;
    hi = hi + Math.imul(ah7, bh9) | 0;
    var w16 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */

    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = mid + Math.imul(ah9, bl8) | 0;
    hi = Math.imul(ah9, bh8);
    lo = lo + Math.imul(al8, bl9) | 0;
    mid = mid + Math.imul(al8, bh9) | 0;
    mid = mid + Math.imul(ah8, bl9) | 0;
    hi = hi + Math.imul(ah8, bh9) | 0;
    var w17 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */

    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = mid + Math.imul(ah9, bl9) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;

    if (c !== 0) {
      o[19] = c;
      out.length++;
    }

    return out;
  }; // Polyfill comb


  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo(self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;
    var carry = 0;
    var hncarry = 0;

    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);

      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;
        var lo = r & 0x3ffffff;
        ncarry = ncarry + (r / 0x4000000 | 0) | 0;
        lo = lo + rword | 0;
        rword = lo & 0x3ffffff;
        ncarry = ncarry + (lo >>> 26) | 0;
        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }

      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }

    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out._strip();
  }

  function jumboMulTo(self, num, out) {
    // Temporary disable, see https://github.com/indutny/bn.js/issues/211
    // var fftm = new FFTM();
    // return fftm.mulp(self, num, out);
    return bigMulTo(self, num, out);
  }

  BN.prototype.mulTo = function mulTo(num, out) {
    var res;
    var len = this.length + num.length;

    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  }; // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion


  function FFTM(x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT(N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;

    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  }; // Returns binary-reversed representation of `x`


  FFTM.prototype.revBin = function revBin(x, l, N) {
    if (x === 0 || x === N - 1) return x;
    var rb = 0;

    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << l - i - 1;
      x >>= 1;
    }

    return rb;
  }; // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm


  FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;
      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];
          var ro = rtws[p + j + s];
          var io = itws[p + j + s];
          var rx = rtwdf_ * ro - itwdf_ * io;
          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;
          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;
          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;
          /* jshint maxdepth : false */

          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;
            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;

    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];
      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;
      t = iws[i];
      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b(ws, N) {
    var carry = 0;

    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 + Math.round(ws[2 * i] / N) + carry;
      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
    var carry = 0;

    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);
      rws[2 * i] = carry & 0x1fff;
      carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff;
      carry = carry >>> 13;
    } // Pad with zeroes


    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub(N) {
    var ph = new Array(N);

    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp(x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);
    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);
    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);
    var rmws = out.words;
    rmws.length = N;
    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);
    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);
    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out._strip();
  }; // Multiply `this` by `num`


  BN.prototype.mul = function mul(num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  }; // Multiply employing FFT


  BN.prototype.mulf = function mulf(num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  }; // In-place Multiplication


  BN.prototype.imul = function imul(num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln(num) {
    var isNegNum = num < 0;
    if (isNegNum) num = -num;
    assert(typeof num === 'number');
    assert(num < 0x4000000); // Carry

    var carry = 0;

    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += w / 0x4000000 | 0; // NOTE: lo is 27bit maximum

      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return isNegNum ? this.ineg() : this;
  };

  BN.prototype.muln = function muln(num) {
    return this.clone().imuln(num);
  }; // `this` * `this`


  BN.prototype.sqr = function sqr() {
    return this.mul(this);
  }; // `this` * `this` in-place


  BN.prototype.isqr = function isqr() {
    return this.imul(this.clone());
  }; // Math.pow(`this`, `num`)


  BN.prototype.pow = function pow(num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1); // Skip leading zeroes

    var res = this;

    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;
        res = res.mul(q);
      }
    }

    return res;
  }; // Shift-left in-place


  BN.prototype.iushln = function iushln(bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = 0x3ffffff >>> 26 - r << 26 - r;
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = (this.words[i] | 0) - newCarry << r;
        this.words[i] = c | carry;
        carry = newCarry >>> 26 - r;
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this._strip();
  };

  BN.prototype.ishln = function ishln(bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  }; // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits


  BN.prototype.iushrn = function iushrn(bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;

    if (hint) {
      h = (hint - hint % 26) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ 0x3ffffff >>> r << r;
    var maskedWords = extended;
    h -= s;
    h = Math.max(0, h); // Extended mode, copy masked part

    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }

      maskedWords.length = s;
    }

    if (s === 0) {// No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;

      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;

    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = carry << 26 - r | word >>> r;
      carry = word & mask;
    } // Push carried bits as a mask


    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this._strip();
  };

  BN.prototype.ishrn = function ishrn(bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  }; // Shift-left


  BN.prototype.shln = function shln(bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln(bits) {
    return this.clone().iushln(bits);
  }; // Shift-right


  BN.prototype.shrn = function shrn(bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn(bits) {
    return this.clone().iushrn(bits);
  }; // Test if n bit is set


  BN.prototype.testn = function testn(bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r; // Fast case: bit is much higher than all existing words

    if (this.length <= s) return false; // Check bit and return

    var w = this.words[s];
    return !!(w & q);
  }; // Return only lowers bits of number (in-place)


  BN.prototype.imaskn = function imaskn(bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }

    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ 0x3ffffff >>> r << r;
      this.words[this.length - 1] &= mask;
    }

    return this._strip();
  }; // Return only lowers bits of number


  BN.prototype.maskn = function maskn(bits) {
    return this.clone().imaskn(bits);
  }; // Add plain number `num` to `this`


  BN.prototype.iaddn = function iaddn(num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num); // Possible sign change

    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) <= num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    } // Add without checks


    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn(num) {
    this.words[0] += num; // Carry

    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;

      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }

    this.length = Math.max(this.length, i + 1);
    return this;
  }; // Subtract plain number `num` from `this`


  BN.prototype.isubn = function isubn(num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this._strip();
  };

  BN.prototype.addn = function addn(num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn(num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs() {
    this.negative = 0;
    return this;
  };

  BN.prototype.abs = function abs() {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;

    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - (right / 0x4000000 | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }

    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this._strip(); // Subtraction overflow

    assert(carry === -1);
    carry = 0;

    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }

    this.negative = 1;
    return this._strip();
  };

  BN.prototype._wordDiv = function _wordDiv(num, mode) {
    var shift = this.length - num.length;
    var a = this.clone();
    var b = num; // Normalize

    var bhi = b.words[b.length - 1] | 0;

    var bhiBits = this._countBits(bhi);

    shift = 26 - bhiBits;

    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    } // Initialize quotient


    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);

      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);

    if (diff.negative === 0) {
      a = diff;

      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 + (a.words[b.length + j - 1] | 0); // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)

      qj = Math.min(qj / bhi | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);

      while (a.negative !== 0) {
        qj--;
        a.negative = 0;

        a._ishlnsubmul(b, 1, j);

        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }

      if (q) {
        q.words[j] = qj;
      }
    }

    if (q) {
      q._strip();
    }

    a._strip(); // Denormalize


    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  }; // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested


  BN.prototype.divmod = function divmod(num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;

    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();

        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();

        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    } // Both numbers are positive at this point
    // Strip both numbers to approximate shift value


    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    } // Very short reduction


    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modrn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modrn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  }; // Find `this` / `num`


  BN.prototype.div = function div(num) {
    return this.divmod(num, 'div', false).div;
  }; // Find `this` % `num`


  BN.prototype.mod = function mod(num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod(num) {
    return this.divmod(num, 'mod', true).mod;
  }; // Find Round(`this` / `num`)


  BN.prototype.divRound = function divRound(num) {
    var dm = this.divmod(num); // Fast case - exact division

    if (dm.mod.isZero()) return dm.div;
    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half); // Round down

    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div; // Round up

    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modrn = function modrn(num) {
    var isNegNum = num < 0;
    if (isNegNum) num = -num;
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;
    var acc = 0;

    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return isNegNum ? -acc : acc;
  }; // WARNING: DEPRECATED


  BN.prototype.modn = function modn(num) {
    return this.modrn(num);
  }; // In-place division by number


  BN.prototype.idivn = function idivn(num) {
    var isNegNum = num < 0;
    if (isNegNum) num = -num;
    assert(num <= 0x3ffffff);
    var carry = 0;

    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = w / num | 0;
      carry = w % num;
    }

    this._strip();

    return isNegNum ? this.ineg() : this;
  };

  BN.prototype.divn = function divn(num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd(p) {
    assert(p.negative === 0);
    assert(!p.isZero());
    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    } // A * x + B * y = x


    var A = new BN(1);
    var B = new BN(0); // C * x + D * y = y

    var C = new BN(0);
    var D = new BN(1);
    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) {
        ;
      }

      if (i > 0) {
        x.iushrn(i);

        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) {
        ;
      }

      if (j > 0) {
        y.iushrn(j);

        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  }; // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed


  BN.prototype._invmp = function _invmp(p) {
    assert(p.negative === 0);
    assert(!p.isZero());
    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);
    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) {
        ;
      }

      if (i > 0) {
        a.iushrn(i);

        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) {
        ;
      }

      if (j > 0) {
        b.iushrn(j);

        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;

    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd(num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();
    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0; // Remove common factor of two

    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }

      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);

      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  }; // Invert number in the field F(num)


  BN.prototype.invm = function invm(num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven() {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd() {
    return (this.words[0] & 1) === 1;
  }; // And first word and num


  BN.prototype.andln = function andln(num) {
    return this.words[0] & num;
  }; // Increment at the bit position in-line


  BN.prototype.bincn = function bincn(bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r; // Fast case: bit is much higher than all existing words

    if (this.length <= s) {
      this._expand(s + 1);

      this.words[s] |= q;
      return this;
    } // Add bit and propagate, if needed


    var carry = q;

    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.isZero = function isZero() {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn(num) {
    var negative = num < 0;
    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this._strip();

    var res;

    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');
      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }

    if (this.negative !== 0) return -res | 0;
    return res;
  }; // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`


  BN.prototype.cmp = function cmp(num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;
    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  }; // Unsigned comparison


  BN.prototype.ucmp = function ucmp(num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;
    var res = 0;

    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;
      if (a === b) continue;

      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }

      break;
    }

    return res;
  };

  BN.prototype.gtn = function gtn(num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt(num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten(num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte(num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn(num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt(num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten(num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte(num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn(num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq(num) {
    return this.cmp(num) === 0;
  }; //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //


  BN.red = function red(num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed(ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed() {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed(ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed(ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd(num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd(num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub(num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub(num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl(num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul(num) {
    assert(this.red, 'redMul works only with red numbers');

    this.red._verify2(this, num);

    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul(num) {
    assert(this.red, 'redMul works only with red numbers');

    this.red._verify2(this, num);

    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr() {
    assert(this.red, 'redSqr works only with red numbers');

    this.red._verify1(this);

    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr() {
    assert(this.red, 'redISqr works only with red numbers');

    this.red._verify1(this);

    return this.red.isqr(this);
  }; // Square root over p


  BN.prototype.redSqrt = function redSqrt() {
    assert(this.red, 'redSqrt works only with red numbers');

    this.red._verify1(this);

    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm() {
    assert(this.red, 'redInvm works only with red numbers');

    this.red._verify1(this);

    return this.red.invm(this);
  }; // Return negative clone of `this` % `red modulo`


  BN.prototype.redNeg = function redNeg() {
    assert(this.red, 'redNeg works only with red numbers');

    this.red._verify1(this);

    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow(num) {
    assert(this.red && !num.red, 'redPow(normalNum)');

    this.red._verify1(this);

    return this.red.pow(this, num);
  }; // Prime numbers with efficient reduction


  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  }; // Pseudo-Mersenne prime

  function MPrime(name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);
    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp() {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce(num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);

    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      if (r.strip !== undefined) {
        // r is a BN v4 instance
        r.strip();
      } else {
        // r is a BN v5 instance
        r._strip();
      }
    }

    return r;
  };

  MPrime.prototype.split = function split(input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK(num) {
    return num.imul(this.k);
  };

  function K256() {
    MPrime.call(this, 'k256', 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }

  inherits(K256, MPrime);

  K256.prototype.split = function split(input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;
    var outLen = Math.min(input.length, 9);

    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }

    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    } // Shift by 9 limbs


    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
      prev = next;
    }

    prev >>>= 22;
    input.words[i - 10] = prev;

    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK(num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2; // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390

    var lo = 0;

    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + (lo / 0x4000000 | 0);
    } // Fast length reduction


    if (num.words[num.length - 1] === 0) {
      num.length--;

      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }

    return num;
  };

  function P224() {
    MPrime.call(this, 'p224', 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }

  inherits(P224, MPrime);

  function P192() {
    MPrime.call(this, 'p192', 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }

  inherits(P192, MPrime);

  function P25519() {
    // 2 ^ 255 - 19
    MPrime.call(this, '25519', '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }

  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK(num) {
    // K = 0x13
    var carry = 0;

    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;
      num.words[i] = lo;
      carry = hi;
    }

    if (carry !== 0) {
      num.words[num.length++] = carry;
    }

    return num;
  }; // Exported mostly for testing purposes, use plain name instead


  BN._prime = function prime(name) {
    // Cached version of prime
    if (primes[name]) return primes[name];
    var prime;

    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }

    primes[name] = prime;
    return prime;
  }; //
  // Base reduction engine
  //


  function Red(m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);

      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1(a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2(a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red, 'red works only with red numbers');
  };

  Red.prototype.imod = function imod(a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    move(a, a.umod(this.m)._forceRed(this));
    return a;
  };

  Red.prototype.neg = function neg(a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add(a, b) {
    this._verify2(a, b);

    var res = a.add(b);

    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }

    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd(a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);

    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }

    return res;
  };

  Red.prototype.sub = function sub(a, b) {
    this._verify2(a, b);

    var res = a.sub(b);

    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Red.prototype.isub = function isub(a, b) {
    this._verify2(a, b);

    var res = a.isub(b);

    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }

    return res;
  };

  Red.prototype.shl = function shl(a, num) {
    this._verify1(a);

    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul(a, b) {
    this._verify2(a, b);

    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul(a, b) {
    this._verify2(a, b);

    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr(a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr(a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt(a) {
    if (a.isZero()) return a.clone();
    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1); // Fast case

    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    } // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)


    var q = this.m.subn(1);
    var s = 0;

    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }

    assert(!q.isZero());
    var one = new BN(1).toRed(this);
    var nOne = one.redNeg(); // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.

    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;

    while (t.cmp(one) !== 0) {
      var tmp = t;

      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }

      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));
      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm(a) {
    var inv = a._invmp(this.m);

    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow(a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();
    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;

    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;

    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];

      for (var j = start - 1; j >= 0; j--) {
        var bit = word >> j & 1;

        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }

      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo(num) {
    var r = num.umod(this.m);
    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom(num) {
    var res = num.clone();
    res.red = null;
    return res;
  }; //
  // Montgomery method engine
  //


  BN.mont = function mont(num) {
    return new Mont(num);
  };

  function Mont(m) {
    Red.call(this, m);
    this.shift = this.m.bitLength();

    if (this.shift % 26 !== 0) {
      this.shift += 26 - this.shift % 26;
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);
    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }

  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo(num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom(num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul(a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul(a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);
    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm(a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})( false || module, this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(87)(module)))

/***/ }),

/***/ 1437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pipeFromArray; });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1394);
/** PURE_IMPORTS_START _identity PURE_IMPORTS_END */

function pipe() {
  var fns = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }

  return pipeFromArray(fns);
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return _identity__WEBPACK_IMPORTED_MODULE_0__[/* identity */ "a"];
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input) {
    return fns.reduce(function (prev, fn) {
      return fn(prev);
    }, input);
  };
}

/***/ }),

/***/ 1438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return refCount; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1381);
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function refCount() {
  return function refCountOperatorFunction(source) {
    return source.lift(new RefCountOperator(source));
  };
}

var RefCountOperator = /*@__PURE__*/function () {
  function RefCountOperator(connectable) {
    this.connectable = connectable;
  }

  RefCountOperator.prototype.call = function (subscriber, source) {
    var connectable = this.connectable;
    connectable._refCount++;
    var refCounter = new RefCountSubscriber(subscriber, connectable);
    var subscription = source.subscribe(refCounter);

    if (!refCounter.closed) {
      refCounter.connection = connectable.connect();
    }

    return subscription;
  };

  return RefCountOperator;
}();

var RefCountSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](RefCountSubscriber, _super);

  function RefCountSubscriber(destination, connectable) {
    var _this = _super.call(this, destination) || this;

    _this.connectable = connectable;
    return _this;
  }

  RefCountSubscriber.prototype._unsubscribe = function () {
    var connectable = this.connectable;

    if (!connectable) {
      this.connection = null;
      return;
    }

    this.connectable = null;
    var refCount = connectable._refCount;

    if (refCount <= 0) {
      this.connection = null;
      return;
    }

    connectable._refCount = refCount - 1;

    if (refCount > 1) {
      this.connection = null;
      return;
    }

    var connection = this.connection;
    var sharedConnection = connectable._connection;
    this.connection = null;

    if (sharedConnection && (!connection || sharedConnection === connection)) {
      sharedConnection.unsubscribe();
    }
  };

  return RefCountSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);

/***/ }),

/***/ 1439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return groupBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupedObservable; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1381);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1384);
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1382);
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1385);
/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */





function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
  return function (source) {
    return source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
  };
}

var GroupByOperator = /*@__PURE__*/function () {
  function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
    this.keySelector = keySelector;
    this.elementSelector = elementSelector;
    this.durationSelector = durationSelector;
    this.subjectSelector = subjectSelector;
  }

  GroupByOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
  };

  return GroupByOperator;
}();

var GroupBySubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](GroupBySubscriber, _super);

  function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
    var _this = _super.call(this, destination) || this;

    _this.keySelector = keySelector;
    _this.elementSelector = elementSelector;
    _this.durationSelector = durationSelector;
    _this.subjectSelector = subjectSelector;
    _this.groups = null;
    _this.attemptedToUnsubscribe = false;
    _this.count = 0;
    return _this;
  }

  GroupBySubscriber.prototype._next = function (value) {
    var key;

    try {
      key = this.keySelector(value);
    } catch (err) {
      this.error(err);
      return;
    }

    this._group(value, key);
  };

  GroupBySubscriber.prototype._group = function (value, key) {
    var groups = this.groups;

    if (!groups) {
      groups = this.groups = new Map();
    }

    var group = groups.get(key);
    var element;

    if (this.elementSelector) {
      try {
        element = this.elementSelector(value);
      } catch (err) {
        this.error(err);
      }
    } else {
      element = value;
    }

    if (!group) {
      group = this.subjectSelector ? this.subjectSelector() : new _Subject__WEBPACK_IMPORTED_MODULE_4__[/* Subject */ "a"]();
      groups.set(key, group);
      var groupedObservable = new GroupedObservable(key, group, this);
      this.destination.next(groupedObservable);

      if (this.durationSelector) {
        var duration = void 0;

        try {
          duration = this.durationSelector(new GroupedObservable(key, group));
        } catch (err) {
          this.error(err);
          return;
        }

        this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
      }
    }

    if (!group.closed) {
      group.next(element);
    }
  };

  GroupBySubscriber.prototype._error = function (err) {
    var groups = this.groups;

    if (groups) {
      groups.forEach(function (group, key) {
        group.error(err);
      });
      groups.clear();
    }

    this.destination.error(err);
  };

  GroupBySubscriber.prototype._complete = function () {
    var groups = this.groups;

    if (groups) {
      groups.forEach(function (group, key) {
        group.complete();
      });
      groups.clear();
    }

    this.destination.complete();
  };

  GroupBySubscriber.prototype.removeGroup = function (key) {
    this.groups.delete(key);
  };

  GroupBySubscriber.prototype.unsubscribe = function () {
    if (!this.closed) {
      this.attemptedToUnsubscribe = true;

      if (this.count === 0) {
        _super.prototype.unsubscribe.call(this);
      }
    }
  };

  return GroupBySubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);

var GroupDurationSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](GroupDurationSubscriber, _super);

  function GroupDurationSubscriber(key, group, parent) {
    var _this = _super.call(this, group) || this;

    _this.key = key;
    _this.group = group;
    _this.parent = parent;
    return _this;
  }

  GroupDurationSubscriber.prototype._next = function (value) {
    this.complete();
  };

  GroupDurationSubscriber.prototype._unsubscribe = function () {
    var _a = this,
        parent = _a.parent,
        key = _a.key;

    this.key = this.parent = null;

    if (parent) {
      parent.removeGroup(key);
    }
  };

  return GroupDurationSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);

var GroupedObservable = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](GroupedObservable, _super);

  function GroupedObservable(key, groupSubject, refCountSubscription) {
    var _this = _super.call(this) || this;

    _this.key = key;
    _this.groupSubject = groupSubject;
    _this.refCountSubscription = refCountSubscription;
    return _this;
  }

  GroupedObservable.prototype._subscribe = function (subscriber) {
    var subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_2__[/* Subscription */ "a"]();

    var _a = this,
        refCountSubscription = _a.refCountSubscription,
        groupSubject = _a.groupSubject;

    if (refCountSubscription && !refCountSubscription.closed) {
      subscription.add(new InnerRefCountSubscription(refCountSubscription));
    }

    subscription.add(groupSubject.subscribe(subscriber));
    return subscription;
  };

  return GroupedObservable;
}(_Observable__WEBPACK_IMPORTED_MODULE_3__[/* Observable */ "a"]);



var InnerRefCountSubscription = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](InnerRefCountSubscription, _super);

  function InnerRefCountSubscription(parent) {
    var _this = _super.call(this) || this;

    _this.parent = parent;
    parent.count++;
    return _this;
  }

  InnerRefCountSubscription.prototype.unsubscribe = function () {
    var parent = this.parent;

    if (!parent.closed && !this.closed) {
      _super.prototype.unsubscribe.call(this);

      parent.count -= 1;

      if (parent.count === 0 && parent.attemptedToUnsubscribe) {
        parent.unsubscribe();
      }
    }
  };

  return InnerRefCountSubscription;
}(_Subscription__WEBPACK_IMPORTED_MODULE_2__[/* Subscription */ "a"]);

/***/ }),

/***/ 1440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReplaySubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1385);
/* harmony import */ var _scheduler_queue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1457);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1384);
/* harmony import */ var _operators_observeOn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1471);
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1417);
/* harmony import */ var _SubjectSubscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1522);
/** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */








var ReplaySubject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](ReplaySubject, _super);

  function ReplaySubject(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) {
      bufferSize = Number.POSITIVE_INFINITY;
    }

    if (windowTime === void 0) {
      windowTime = Number.POSITIVE_INFINITY;
    }

    var _this = _super.call(this) || this;

    _this.scheduler = scheduler;
    _this._events = [];
    _this._infiniteTimeWindow = false;
    _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
    _this._windowTime = windowTime < 1 ? 1 : windowTime;

    if (windowTime === Number.POSITIVE_INFINITY) {
      _this._infiniteTimeWindow = true;
      _this.next = _this.nextInfiniteTimeWindow;
    } else {
      _this.next = _this.nextTimeWindow;
    }

    return _this;
  }

  ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
    if (!this.isStopped) {
      var _events = this._events;

      _events.push(value);

      if (_events.length > this._bufferSize) {
        _events.shift();
      }
    }

    _super.prototype.next.call(this, value);
  };

  ReplaySubject.prototype.nextTimeWindow = function (value) {
    if (!this.isStopped) {
      this._events.push(new ReplayEvent(this._getNow(), value));

      this._trimBufferThenGetEvents();
    }

    _super.prototype.next.call(this, value);
  };

  ReplaySubject.prototype._subscribe = function (subscriber) {
    var _infiniteTimeWindow = this._infiniteTimeWindow;

    var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();

    var scheduler = this.scheduler;
    var len = _events.length;
    var subscription;

    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_5__[/* ObjectUnsubscribedError */ "a"]();
    } else if (this.isStopped || this.hasError) {
      subscription = _Subscription__WEBPACK_IMPORTED_MODULE_3__[/* Subscription */ "a"].EMPTY;
    } else {
      this.observers.push(subscriber);
      subscription = new _SubjectSubscription__WEBPACK_IMPORTED_MODULE_6__[/* SubjectSubscription */ "a"](this, subscriber);
    }

    if (scheduler) {
      subscriber.add(subscriber = new _operators_observeOn__WEBPACK_IMPORTED_MODULE_4__[/* ObserveOnSubscriber */ "a"](subscriber, scheduler));
    }

    if (_infiniteTimeWindow) {
      for (var i = 0; i < len && !subscriber.closed; i++) {
        subscriber.next(_events[i]);
      }
    } else {
      for (var i = 0; i < len && !subscriber.closed; i++) {
        subscriber.next(_events[i].value);
      }
    }

    if (this.hasError) {
      subscriber.error(this.thrownError);
    } else if (this.isStopped) {
      subscriber.complete();
    }

    return subscription;
  };

  ReplaySubject.prototype._getNow = function () {
    return (this.scheduler || _scheduler_queue__WEBPACK_IMPORTED_MODULE_2__[/* queue */ "a"]).now();
  };

  ReplaySubject.prototype._trimBufferThenGetEvents = function () {
    var now = this._getNow();

    var _bufferSize = this._bufferSize;
    var _windowTime = this._windowTime;
    var _events = this._events;
    var eventsCount = _events.length;
    var spliceCount = 0;

    while (spliceCount < eventsCount) {
      if (now - _events[spliceCount].time < _windowTime) {
        break;
      }

      spliceCount++;
    }

    if (eventsCount > _bufferSize) {
      spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
    }

    if (spliceCount > 0) {
      _events.splice(0, spliceCount);
    }

    return _events;
  };

  return ReplaySubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__[/* Subject */ "a"]);



var ReplayEvent = /*@__PURE__*/function () {
  function ReplayEvent(time, value) {
    this.time = time;
    this.value = value;
  }

  return ReplayEvent;
}();

/***/ }),

/***/ 1441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return throwError; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1382);
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function throwError(error, scheduler) {
  if (!scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](function (subscriber) {
      return subscriber.error(error);
    });
  } else {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](function (subscriber) {
      return scheduler.schedule(dispatch, 0, {
        error: error,
        subscriber: subscriber
      });
    });
  }
}

function dispatch(_a) {
  var error = _a.error,
      subscriber = _a.subscriber;
  subscriber.error(error);
}

/***/ }),

/***/ 1442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return noop; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() {}

/***/ }),

/***/ 1443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return combineLatest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CombineLatestOperator; });
/* unused harmony export CombineLatestSubscriber */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1392);
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1387);
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1397);
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1406);
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1419);
/** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */






var NONE = {};
function combineLatest() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  var resultSelector = undefined;
  var scheduler = undefined;

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__[/* isScheduler */ "a"])(observables[observables.length - 1])) {
    scheduler = observables.pop();
  }

  if (typeof observables[observables.length - 1] === 'function') {
    resultSelector = observables.pop();
  }

  if (observables.length === 1 && Object(_util_isArray__WEBPACK_IMPORTED_MODULE_2__[/* isArray */ "a"])(observables[0])) {
    observables = observables[0];
  }

  return Object(_fromArray__WEBPACK_IMPORTED_MODULE_5__[/* fromArray */ "a"])(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
}

var CombineLatestOperator = /*@__PURE__*/function () {
  function CombineLatestOperator(resultSelector) {
    this.resultSelector = resultSelector;
  }

  CombineLatestOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new CombineLatestSubscriber(subscriber, this.resultSelector));
  };

  return CombineLatestOperator;
}();



var CombineLatestSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](CombineLatestSubscriber, _super);

  function CombineLatestSubscriber(destination, resultSelector) {
    var _this = _super.call(this, destination) || this;

    _this.resultSelector = resultSelector;
    _this.active = 0;
    _this.values = [];
    _this.observables = [];
    return _this;
  }

  CombineLatestSubscriber.prototype._next = function (observable) {
    this.values.push(NONE);
    this.observables.push(observable);
  };

  CombineLatestSubscriber.prototype._complete = function () {
    var observables = this.observables;
    var len = observables.length;

    if (len === 0) {
      this.destination.complete();
    } else {
      this.active = len;
      this.toRespond = len;

      for (var i = 0; i < len; i++) {
        var observable = observables[i];
        this.add(Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__[/* subscribeToResult */ "a"])(this, observable, undefined, i));
      }
    }
  };

  CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
    if ((this.active -= 1) === 0) {
      this.destination.complete();
    }
  };

  CombineLatestSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
    var values = this.values;
    var oldVal = values[outerIndex];
    var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
    values[outerIndex] = innerValue;

    if (toRespond === 0) {
      if (this.resultSelector) {
        this._tryResultSelector(values);
      } else {
        this.destination.next(values.slice());
      }
    }
  };

  CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
    var result;

    try {
      result = this.resultSelector.apply(this, values);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(result);
  };

  return CombineLatestSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__[/* OuterSubscriber */ "a"]);



/***/ }),

/***/ 1444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mergeAll; });
/* harmony import */ var _mergeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1410);
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1394);
/** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */


function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }

  return Object(_mergeMap__WEBPACK_IMPORTED_MODULE_0__[/* mergeMap */ "b"])(_util_identity__WEBPACK_IMPORTED_MODULE_1__[/* identity */ "a"], concurrent);
}

/***/ }),

/***/ 1445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defer; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1382);
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1391);
/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1389);
/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */



function defer(observableFactory) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](function (subscriber) {
    var input;

    try {
      input = observableFactory();
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }

    var source = input ? Object(_from__WEBPACK_IMPORTED_MODULE_1__[/* from */ "a"])(input) : Object(_empty__WEBPACK_IMPORTED_MODULE_2__[/* empty */ "b"])();
    return source.subscribe(subscriber);
  });
}

/***/ }),

/***/ 1446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isNumeric; });
/* harmony import */ var _isArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1387);
/** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */

function isNumeric(val) {
  return !Object(_isArray__WEBPACK_IMPORTED_MODULE_0__[/* isArray */ "a"])(val) && val - parseFloat(val) + 1 >= 0;
}

/***/ }),

/***/ 1447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return zip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZipOperator; });
/* unused harmony export ZipSubscriber */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1419);
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1387);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1381);
/* harmony import */ var _internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1422);
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1383);
/** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_.._internal_symbol_iterator,_innerSubscribe PURE_IMPORTS_END */






function zip() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  var resultSelector = observables[observables.length - 1];

  if (typeof resultSelector === 'function') {
    observables.pop();
  }

  return Object(_fromArray__WEBPACK_IMPORTED_MODULE_1__[/* fromArray */ "a"])(observables, undefined).lift(new ZipOperator(resultSelector));
}

var ZipOperator = /*@__PURE__*/function () {
  function ZipOperator(resultSelector) {
    this.resultSelector = resultSelector;
  }

  ZipOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ZipSubscriber(subscriber, this.resultSelector));
  };

  return ZipOperator;
}();



var ZipSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](ZipSubscriber, _super);

  function ZipSubscriber(destination, resultSelector, values) {
    if (values === void 0) {
      values = Object.create(null);
    }

    var _this = _super.call(this, destination) || this;

    _this.resultSelector = resultSelector;
    _this.iterators = [];
    _this.active = 0;
    _this.resultSelector = typeof resultSelector === 'function' ? resultSelector : undefined;
    return _this;
  }

  ZipSubscriber.prototype._next = function (value) {
    var iterators = this.iterators;

    if (Object(_util_isArray__WEBPACK_IMPORTED_MODULE_2__[/* isArray */ "a"])(value)) {
      iterators.push(new StaticArrayIterator(value));
    } else if (typeof value[_internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_4__[/* iterator */ "a"]] === 'function') {
      iterators.push(new StaticIterator(value[_internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_4__[/* iterator */ "a"]]()));
    } else {
      iterators.push(new ZipBufferIterator(this.destination, this, value));
    }
  };

  ZipSubscriber.prototype._complete = function () {
    var iterators = this.iterators;
    var len = iterators.length;
    this.unsubscribe();

    if (len === 0) {
      this.destination.complete();
      return;
    }

    this.active = len;

    for (var i = 0; i < len; i++) {
      var iterator = iterators[i];

      if (iterator.stillUnsubscribed) {
        var destination = this.destination;
        destination.add(iterator.subscribe());
      } else {
        this.active--;
      }
    }
  };

  ZipSubscriber.prototype.notifyInactive = function () {
    this.active--;

    if (this.active === 0) {
      this.destination.complete();
    }
  };

  ZipSubscriber.prototype.checkIterators = function () {
    var iterators = this.iterators;
    var len = iterators.length;
    var destination = this.destination;

    for (var i = 0; i < len; i++) {
      var iterator = iterators[i];

      if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
        return;
      }
    }

    var shouldComplete = false;
    var args = [];

    for (var i = 0; i < len; i++) {
      var iterator = iterators[i];
      var result = iterator.next();

      if (iterator.hasCompleted()) {
        shouldComplete = true;
      }

      if (result.done) {
        destination.complete();
        return;
      }

      args.push(result.value);
    }

    if (this.resultSelector) {
      this._tryresultSelector(args);
    } else {
      destination.next(args);
    }

    if (shouldComplete) {
      destination.complete();
    }
  };

  ZipSubscriber.prototype._tryresultSelector = function (args) {
    var result;

    try {
      result = this.resultSelector.apply(this, args);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(result);
  };

  return ZipSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_3__[/* Subscriber */ "a"]);



var StaticIterator = /*@__PURE__*/function () {
  function StaticIterator(iterator) {
    this.iterator = iterator;
    this.nextResult = iterator.next();
  }

  StaticIterator.prototype.hasValue = function () {
    return true;
  };

  StaticIterator.prototype.next = function () {
    var result = this.nextResult;
    this.nextResult = this.iterator.next();
    return result;
  };

  StaticIterator.prototype.hasCompleted = function () {
    var nextResult = this.nextResult;
    return Boolean(nextResult && nextResult.done);
  };

  return StaticIterator;
}();

var StaticArrayIterator = /*@__PURE__*/function () {
  function StaticArrayIterator(array) {
    this.array = array;
    this.index = 0;
    this.length = 0;
    this.length = array.length;
  }

  StaticArrayIterator.prototype[_internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_4__[/* iterator */ "a"]] = function () {
    return this;
  };

  StaticArrayIterator.prototype.next = function (value) {
    var i = this.index++;
    var array = this.array;
    return i < this.length ? {
      value: array[i],
      done: false
    } : {
      value: null,
      done: true
    };
  };

  StaticArrayIterator.prototype.hasValue = function () {
    return this.array.length > this.index;
  };

  StaticArrayIterator.prototype.hasCompleted = function () {
    return this.array.length === this.index;
  };

  return StaticArrayIterator;
}();

var ZipBufferIterator = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](ZipBufferIterator, _super);

  function ZipBufferIterator(destination, parent, observable) {
    var _this = _super.call(this, destination) || this;

    _this.parent = parent;
    _this.observable = observable;
    _this.stillUnsubscribed = true;
    _this.buffer = [];
    _this.isComplete = false;
    return _this;
  }

  ZipBufferIterator.prototype[_internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_4__[/* iterator */ "a"]] = function () {
    return this;
  };

  ZipBufferIterator.prototype.next = function () {
    var buffer = this.buffer;

    if (buffer.length === 0 && this.isComplete) {
      return {
        value: null,
        done: true
      };
    } else {
      return {
        value: buffer.shift(),
        done: false
      };
    }
  };

  ZipBufferIterator.prototype.hasValue = function () {
    return this.buffer.length > 0;
  };

  ZipBufferIterator.prototype.hasCompleted = function () {
    return this.buffer.length === 0 && this.isComplete;
  };

  ZipBufferIterator.prototype.notifyComplete = function () {
    if (this.buffer.length > 0) {
      this.isComplete = true;
      this.parent.notifyInactive();
    } else {
      this.destination.complete();
    }
  };

  ZipBufferIterator.prototype.notifyNext = function (innerValue) {
    this.buffer.push(innerValue);
    this.parent.checkIterators();
  };

  ZipBufferIterator.prototype.subscribe = function () {
    return Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_5__[/* innerSubscribe */ "c"])(this.observable, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_5__[/* SimpleInnerSubscriber */ "a"](this));
  };

  return ZipBufferIterator;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_5__[/* SimpleOuterSubscriber */ "b"]);

/***/ }),

/***/ 1448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReducer", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEffect", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLayoutEffect", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRef", function() { return s; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useImperativeHandle", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useContext", function() { return F; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDebugValue", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useErrorBoundary", function() { return q; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1400);

var t,
    u,
    r,
    o = 0,
    i = [],
    c = preact__WEBPACK_IMPORTED_MODULE_0__["options"].__b,
    f = preact__WEBPACK_IMPORTED_MODULE_0__["options"].__r,
    e = preact__WEBPACK_IMPORTED_MODULE_0__["options"].diffed,
    a = preact__WEBPACK_IMPORTED_MODULE_0__["options"].__c,
    v = preact__WEBPACK_IMPORTED_MODULE_0__["options"].unmount;

function m(t, r) {
  preact__WEBPACK_IMPORTED_MODULE_0__["options"].__h && preact__WEBPACK_IMPORTED_MODULE_0__["options"].__h(u, t, o || r), o = 0;
  var i = u.__H || (u.__H = {
    __: [],
    __h: []
  });
  return t >= i.__.length && i.__.push({}), i.__[t];
}

function l(n) {
  return o = 1, p(w, n);
}

function p(n, r, o) {
  var i = m(t++, 2);
  return i.t = n, i.__c || (i.__ = [o ? o(r) : w(void 0, r), function (n) {
    var t = i.t(i.__[0], n);
    i.__[0] !== t && (i.__ = [t, i.__[1]], i.__c.setState({}));
  }], i.__c = u), i.__;
}

function y(r, o) {
  var i = m(t++, 3);
  !preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s && k(i.__H, o) && (i.__ = r, i.__H = o, u.__H.__h.push(i));
}

function h(r, o) {
  var i = m(t++, 4);
  !preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s && k(i.__H, o) && (i.__ = r, i.__H = o, u.__h.push(i));
}

function s(n) {
  return o = 5, d(function () {
    return {
      current: n
    };
  }, []);
}

function _(n, t, u) {
  o = 6, h(function () {
    "function" == typeof n ? n(t()) : n && (n.current = t());
  }, null == u ? u : u.concat(n));
}

function d(n, u) {
  var r = m(t++, 7);
  return k(r.__H, u) && (r.__ = n(), r.__H = u, r.__h = n), r.__;
}

function A(n, t) {
  return o = 8, d(function () {
    return n;
  }, t);
}

function F(n) {
  var r = u.context[n.__c],
      o = m(t++, 9);
  return o.c = n, r ? (null == o.__ && (o.__ = !0, r.sub(u)), r.props.value) : n.__;
}

function T(t, u) {
  preact__WEBPACK_IMPORTED_MODULE_0__["options"].useDebugValue && preact__WEBPACK_IMPORTED_MODULE_0__["options"].useDebugValue(u ? u(t) : t);
}

function q(n) {
  var r = m(t++, 10),
      o = l();
  return r.__ = n, u.componentDidCatch || (u.componentDidCatch = function (n) {
    r.__ && r.__(n), o[1](n);
  }), [o[0], function () {
    o[1](void 0);
  }];
}

function x() {
  var t;

  for (i.sort(function (n, t) {
    return n.__v.__b - t.__v.__b;
  }); t = i.pop();) {
    if (t.__P) try {
      t.__H.__h.forEach(g), t.__H.__h.forEach(j), t.__H.__h = [];
    } catch (u) {
      t.__H.__h = [], preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(u, t.__v);
    }
  }
}

preact__WEBPACK_IMPORTED_MODULE_0__["options"].__b = function (n) {
  u = null, c && c(n);
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].__r = function (n) {
  f && f(n), t = 0;
  var r = (u = n.__c).__H;
  r && (r.__h.forEach(g), r.__h.forEach(j), r.__h = []);
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].diffed = function (t) {
  e && e(t);
  var o = t.__c;
  o && o.__H && o.__H.__h.length && (1 !== i.push(o) && r === preact__WEBPACK_IMPORTED_MODULE_0__["options"].requestAnimationFrame || ((r = preact__WEBPACK_IMPORTED_MODULE_0__["options"].requestAnimationFrame) || function (n) {
    var t,
        u = function u() {
      clearTimeout(r), b && cancelAnimationFrame(t), setTimeout(n);
    },
        r = setTimeout(u, 100);

    b && (t = requestAnimationFrame(u));
  })(x)), u = null;
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].__c = function (t, u) {
  u.some(function (t) {
    try {
      t.__h.forEach(g), t.__h = t.__h.filter(function (n) {
        return !n.__ || j(n);
      });
    } catch (r) {
      u.some(function (n) {
        n.__h && (n.__h = []);
      }), u = [], preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(r, t.__v);
    }
  }), a && a(t, u);
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].unmount = function (t) {
  v && v(t);
  var u,
      r = t.__c;
  r && r.__H && (r.__H.__.forEach(function (n) {
    try {
      g(n);
    } catch (n) {
      u = n;
    }
  }), u && preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(u, r.__v));
};
var b = "function" == typeof requestAnimationFrame;

function g(n) {
  var t = u,
      r = n.__c;
  "function" == typeof r && (n.__c = void 0, r()), u = t;
}

function j(n) {
  var t = u;
  n.__c = n.__(), u = t;
}

function k(n, t) {
  return !n || n.length !== t.length || t.some(function (t, u) {
    return t !== n[u];
  });
}

function w(n, t) {
  return "function" == typeof t ? t(n) : t;
}



/***/ }),

/***/ 1455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ asapScheduler; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ asap; });

// EXTERNAL MODULE: ./node_modules/rxjs/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(1380);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/Immediate.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var nextHandle = 1;

var RESOLVED = /*@__PURE__*/function () {
  return /*@__PURE__*/Promise.resolve();
}();

var activeHandles = {};

function findAndClearHandle(handle) {
  if (handle in activeHandles) {
    delete activeHandles[handle];
    return true;
  }

  return false;
}

var Immediate = {
  setImmediate: function setImmediate(cb) {
    var handle = nextHandle++;
    activeHandles[handle] = true;
    RESOLVED.then(function () {
      return findAndClearHandle(handle) && cb();
    });
    return handle;
  },
  clearImmediate: function clearImmediate(handle) {
    findAndClearHandle(handle);
  }
};
var TestTools = {
  pending: function pending() {
    return Object.keys(activeHandles).length;
  }
};
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js + 1 modules
var AsyncAction = __webpack_require__(1434);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsapAction.js
/** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */




var AsapAction_AsapAction = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](AsapAction, _super);

  function AsapAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }

  AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }

    scheduler.actions.push(this);
    return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
  };

  AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
    }

    if (scheduler.actions.length === 0) {
      Immediate.clearImmediate(id);
      scheduler.scheduled = undefined;
    }

    return undefined;
  };

  return AsapAction;
}(AsyncAction["a" /* AsyncAction */]);


// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js
var AsyncScheduler = __webpack_require__(1420);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsapScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */



var AsapScheduler_AsapScheduler = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](AsapScheduler, _super);

  function AsapScheduler() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AsapScheduler.prototype.flush = function (action) {
    this.active = true;
    this.scheduled = undefined;
    var actions = this.actions;
    var error;
    var index = -1;
    var count = actions.length;
    action = action || actions.shift();

    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (++index < count && (action = actions.shift()));

    this.active = false;

    if (error) {
      while (++index < count && (action = actions.shift())) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  return AsapScheduler;
}(AsyncScheduler["a" /* AsyncScheduler */]);


// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/asap.js
/** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */


var asapScheduler = /*@__PURE__*/new AsapScheduler_AsapScheduler(AsapAction_AsapAction);
var asap = asapScheduler;

/***/ }),

/***/ 1456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ subscribeTo_subscribeTo; });

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js
var subscribeToArray = __webpack_require__(1523);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/hostReportError.js
var hostReportError = __webpack_require__(1464);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToPromise.js
/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */

var subscribeToPromise_subscribeToPromise = function subscribeToPromise(promise) {
  return function (subscriber) {
    promise.then(function (value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function (err) {
      return subscriber.error(err);
    }).then(null, hostReportError["a" /* hostReportError */]);
    return subscriber;
  };
};
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/iterator.js
var symbol_iterator = __webpack_require__(1422);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

var subscribeToIterable_subscribeToIterable = function subscribeToIterable(iterable) {
  return function (subscriber) {
    var iterator = iterable[symbol_iterator["a" /* iterator */]]();

    do {
      var item = void 0;

      try {
        item = iterator.next();
      } catch (err) {
        subscriber.error(err);
        return subscriber;
      }

      if (item.done) {
        subscriber.complete();
        break;
      }

      subscriber.next(item.value);

      if (subscriber.closed) {
        break;
      }
    } while (true);

    if (typeof iterator.return === 'function') {
      subscriber.add(function () {
        if (iterator.return) {
          iterator.return();
        }
      });
    }

    return subscriber;
  };
};
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/observable.js
var observable = __webpack_require__(1396);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

var subscribeToObservable_subscribeToObservable = function subscribeToObservable(obj) {
  return function (subscriber) {
    var obs = obj[observable["a" /* observable */]]();

    if (typeof obs.subscribe !== 'function') {
      throw new TypeError('Provided object does not correctly implement Symbol.observable');
    } else {
      return obs.subscribe(subscriber);
    }
  };
};
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isArrayLike.js
var isArrayLike = __webpack_require__(1524);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isPromise.js
var isPromise = __webpack_require__(1525);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isObject.js
var isObject = __webpack_require__(1467);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeTo.js
/** PURE_IMPORTS_START _subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */









var subscribeTo_subscribeTo = function subscribeTo(result) {
  if (!!result && typeof result[observable["a" /* observable */]] === 'function') {
    return subscribeToObservable_subscribeToObservable(result);
  } else if (Object(isArrayLike["a" /* isArrayLike */])(result)) {
    return Object(subscribeToArray["a" /* subscribeToArray */])(result);
  } else if (Object(isPromise["a" /* isPromise */])(result)) {
    return subscribeToPromise_subscribeToPromise(result);
  } else if (!!result && typeof result[symbol_iterator["a" /* iterator */]] === 'function') {
    return subscribeToIterable_subscribeToIterable(result);
  } else {
    var value = Object(isObject["a" /* isObject */])(result) ? 'an invalid object' : "'" + result + "'";
    var msg = "You provided " + value + " where a stream was expected." + ' You can provide an Observable, Promise, Array, or Iterable.';
    throw new TypeError(msg);
  }
};

/***/ }),

/***/ 1457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ queueScheduler; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ queue; });

// EXTERNAL MODULE: ./node_modules/rxjs/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(1380);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js + 1 modules
var AsyncAction = __webpack_require__(1434);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js
/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */



var QueueAction_QueueAction = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](QueueAction, _super);

  function QueueAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }

  QueueAction.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay > 0) {
      return _super.prototype.schedule.call(this, state, delay);
    }

    this.delay = delay;
    this.state = state;
    this.scheduler.flush(this);
    return this;
  };

  QueueAction.prototype.execute = function (state, delay) {
    return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
  };

  QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }

    return scheduler.flush(this);
  };

  return QueueAction;
}(AsyncAction["a" /* AsyncAction */]);


// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js
var AsyncScheduler = __webpack_require__(1420);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */



var QueueScheduler_QueueScheduler = /*@__PURE__*/function (_super) {
  tslib_es6["a" /* __extends */](QueueScheduler, _super);

  function QueueScheduler() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return QueueScheduler;
}(AsyncScheduler["a" /* AsyncScheduler */]);


// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/queue.js
/** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */


var queueScheduler = /*@__PURE__*/new QueueScheduler_QueueScheduler(QueueAction_QueueAction);
var queue = queueScheduler;

/***/ }),

/***/ 1458:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) { // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var _assertThisInitialized = __webpack_require__(264);

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
exports.WalletLinkProvider = void 0;

var safe_event_emitter_1 = __importDefault(__webpack_require__(1435));

var bn_js_1 = __importDefault(__webpack_require__(1436));

var eth_rpc_errors_1 = __webpack_require__(1614);

var WalletLinkAnalytics_1 = __webpack_require__(1461);

var EthereumChain_1 = __webpack_require__(1617);

var init_1 = __webpack_require__(1462);

var Session_1 = __webpack_require__(1463);

var WalletLinkRelayAbstract_1 = __webpack_require__(1527);

var util_1 = __webpack_require__(1399);

var eth_eip712_util_1 = __importDefault(__webpack_require__(1621));

var FilterPolyfill_1 = __webpack_require__(1623);

var JSONRPC_1 = __webpack_require__(1624);

var SubscriptionManager_1 = __webpack_require__(1625);

var DEFAULT_CHAIN_ID_KEY = "DefaultChainId";
var DEFAULT_JSON_RPC_URL = "DefaultJsonRpcUrl"; // Indicates chain has been switched by switchEthereumChain or addEthereumChain request

var HAS_CHAIN_BEEN_SWITCHED_KEY = "HasChainBeenSwitched";
var HAS_CHAIN_OVERRIDDEN_FROM_RELAY = "HasChainOverriddenFromRelay";

var WalletLinkProvider = /*#__PURE__*/function (_safe_event_emitter_) {
  _inherits(WalletLinkProvider, _safe_event_emitter_);

  var _super = _createSuper(WalletLinkProvider);

  function WalletLinkProvider(options) {
    var _this;

    _classCallCheck(this, WalletLinkProvider);

    _this = _super.call(this); // So dapps can easily identify Coinbase Wallet for enabling features like 3085 network switcher menus

    _this.isCoinbaseWallet = true;
    _this._filterPolyfill = new FilterPolyfill_1.FilterPolyfill(_assertThisInitialized(_this));
    _this._subscriptionManager = new SubscriptionManager_1.SubscriptionManager(_assertThisInitialized(_this));
    _this._relay = null;
    _this._addresses = [];
    _this.hasMadeFirstChainChangedEmission = false;
    _this._send = _this.send;
    _this._sendAsync = _this.sendAsync;
    _this.setProviderInfo = _this.setProviderInfo.bind(_assertThisInitialized(_this));
    _this.updateProviderInfo = _this.updateProviderInfo.bind(_assertThisInitialized(_this));
    _this.getChainId = _this.getChainId.bind(_assertThisInitialized(_this));
    _this.setAppInfo = _this.setAppInfo.bind(_assertThisInitialized(_this));
    _this.enable = _this.enable.bind(_assertThisInitialized(_this));
    _this.close = _this.close.bind(_assertThisInitialized(_this));
    _this.send = _this.send.bind(_assertThisInitialized(_this));
    _this.sendAsync = _this.sendAsync.bind(_assertThisInitialized(_this));
    _this.request = _this.request.bind(_assertThisInitialized(_this));
    _this._setAddresses = _this._setAddresses.bind(_assertThisInitialized(_this));
    _this.scanQRCode = _this.scanQRCode.bind(_assertThisInitialized(_this));
    _this.arbitraryRequest = _this.arbitraryRequest.bind(_assertThisInitialized(_this));
    _this._jsonRpcUrlFromOpts = options.jsonRpcUrl;
    _this._overrideIsMetaMask = options.overrideIsMetaMask;
    _this._relayProvider = options.relayProvider;
    _this._storage = options.storage;
    _this._relayEventManager = options.relayEventManager;
    _this._walletLinkAnalytics = options.walletLinkAnalytics ? options.walletLinkAnalytics : new WalletLinkAnalytics_1.WalletLinkAnalytics();

    var chainId = _this.getChainId();

    var chainIdStr = (0, util_1.prepend0x)(chainId.toString(16)); // indicate that we've connected, for EIP-1193 compliance

    _this.emit("connect", {
      chainIdStr: chainIdStr
    });

    var cachedAddresses = _this._storage.getItem(WalletLinkRelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY);

    if (cachedAddresses) {
      var addresses = cachedAddresses.split(" ");

      if (addresses[0] !== "") {
        _this._addresses = addresses;

        _this.emit("accountsChanged", addresses);
      }
    }

    _this._subscriptionManager.events.on("notification", function (notification) {
      _this.emit("message", {
        type: notification.method,
        data: notification.params
      });
    });

    if (_this._addresses.length > 0) {
      _this.initializeRelay();
    }

    window.addEventListener('message', function (event) {
      var _a;

      if (event.data.type !== 'walletLinkMessage') return;

      if (event.data.data.action === 'defaultChainChanged') {
        var _chainId = event.data.data.chainId;
        var jsonRpcUrl = (_a = event.data.data.jsonRpcUrl) !== null && _a !== void 0 ? _a : _this.jsonRpcUrl;

        _this.updateProviderInfo(jsonRpcUrl, Number(_chainId), true);
      }
    });
    return _this;
  }

  _createClass(WalletLinkProvider, [{
    key: "selectedAddress",
    get: function get() {
      return this._addresses[0] || undefined;
    }
  }, {
    key: "networkVersion",
    get: function get() {
      return this.getChainId().toString(10);
    }
  }, {
    key: "chainId",
    get: function get() {
      return (0, util_1.prepend0x)(this.getChainId().toString(16));
    }
  }, {
    key: "isWalletLink",
    get: function get() {
      return true;
    }
    /**
     * Some DApps (i.e. Alpha Homora) seem to require the window.ethereum object return
     * true for this method.
     */

  }, {
    key: "isMetaMask",
    get: function get() {
      return this._overrideIsMetaMask;
    }
  }, {
    key: "host",
    get: function get() {
      return this.jsonRpcUrl;
    }
  }, {
    key: "connected",
    get: function get() {
      return true;
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return true;
    }
  }, {
    key: "jsonRpcUrl",
    get: function get() {
      var _a;

      return (_a = this._storage.getItem(DEFAULT_JSON_RPC_URL)) !== null && _a !== void 0 ? _a : this._jsonRpcUrlFromOpts;
    },
    set: function set(value) {
      this._storage.setItem(DEFAULT_JSON_RPC_URL, value);
    }
  }, {
    key: "isChainOverridden",
    get: function get() {
      return this._storage.getItem(HAS_CHAIN_OVERRIDDEN_FROM_RELAY) === 'true';
    },
    set: function set(value) {
      this._storage.setItem(HAS_CHAIN_OVERRIDDEN_FROM_RELAY, value.toString());
    } // @ts-ignore

  }, {
    key: "setProviderInfo",
    value: function setProviderInfo(jsonRpcUrl, chainId) {
      if (this.isChainOverridden) return;
      this.updateProviderInfo(jsonRpcUrl, this.getChainId(), false);
    }
  }, {
    key: "updateProviderInfo",
    value: function updateProviderInfo(jsonRpcUrl, chainId, fromRelay) {
      var hasChainSwitched = this._storage.getItem(HAS_CHAIN_BEEN_SWITCHED_KEY) === "true";
      if (hasChainSwitched && fromRelay) return;

      if (fromRelay) {
        this.isChainOverridden = true;
      }

      this.jsonRpcUrl = jsonRpcUrl; // emit chainChanged event if necessary

      var originalChainId = this.getChainId();

      this._storage.setItem(DEFAULT_CHAIN_ID_KEY, chainId.toString(10));

      var chainChanged = (0, util_1.ensureIntNumber)(chainId) !== originalChainId;

      if (chainChanged || !this.hasMadeFirstChainChangedEmission) {
        this.emit("chainChanged", this.getChainId());
        this.hasMadeFirstChainChangedEmission = true;
      }
    }
  }, {
    key: "switchEthereumChain",
    value: function () {
      var _switchEthereumChain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(rpcUrl, chainId) {
        var relay, res;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!((0, util_1.ensureIntNumber)(chainId) === this.getChainId())) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.next = 4;
                return this.initializeRelay();

              case 4:
                relay = _context.sent;
                _context.next = 7;
                return relay.switchEthereumChain(chainId.toString(10)).promise;

              case 7:
                res = _context.sent;

                if (res.result === true) {
                  this._storage.setItem(HAS_CHAIN_BEEN_SWITCHED_KEY, "true");

                  this.updateProviderInfo(rpcUrl, chainId, false);
                }

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function switchEthereumChain(_x, _x2) {
        return _switchEthereumChain.apply(this, arguments);
      }

      return switchEthereumChain;
    }()
  }, {
    key: "setAppInfo",
    value: function setAppInfo(appName, appLogoUrl) {
      this.initializeRelay().then(function (relay) {
        return relay.setAppInfo(appName, appLogoUrl);
      });
    }
  }, {
    key: "enable",
    value: function () {
      var _enable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._walletLinkAnalytics.sendEvent(init_1.EVENTS.ETH_ACCOUNTS_STATE, {
                  method: "provider::enable",
                  addresses_length: this._addresses.length,
                  sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : null
                });

                if (!(this._addresses.length > 0)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", this._addresses);

              case 3:
                _context2.next = 5;
                return this._send(JSONRPC_1.JSONRPCMethod.eth_requestAccounts);

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function enable() {
        return _enable.apply(this, arguments);
      }

      return enable;
    }()
  }, {
    key: "close",
    value: function close() {
      this.initializeRelay().then(function (relay) {
        return relay.resetAndReload();
      });
    }
  }, {
    key: "send",
    value: function send(requestOrMethod, callbackOrParams) {
      var _this2 = this;

      // send<T>(method, params): Promise<T>
      if (typeof requestOrMethod === "string") {
        var method = requestOrMethod;
        var params = Array.isArray(callbackOrParams) ? callbackOrParams : callbackOrParams !== undefined ? [callbackOrParams] : [];
        var request = {
          jsonrpc: "2.0",
          id: 0,
          method: method,
          params: params
        };
        return this._sendRequestAsync(request).then(function (res) {
          return res.result;
        });
      } // send(JSONRPCRequest | JSONRPCRequest[], callback): void


      if (typeof callbackOrParams === "function") {
        var _request = requestOrMethod;
        var callback = callbackOrParams;
        return this._sendAsync(_request, callback);
      } // send(JSONRPCRequest[]): JSONRPCResponse[]


      if (Array.isArray(requestOrMethod)) {
        var requests = requestOrMethod;
        return requests.map(function (r) {
          return _this2._sendRequest(r);
        });
      } // send(JSONRPCRequest): JSONRPCResponse


      var req = requestOrMethod;
      return this._sendRequest(req);
    }
  }, {
    key: "sendAsync",
    value: function sendAsync(request, callback) {
      if (typeof callback !== "function") {
        throw new Error("callback is required");
      } // send(JSONRPCRequest[], callback): void


      if (Array.isArray(request)) {
        var arrayCb = callback;

        this._sendMultipleRequestsAsync(request).then(function (responses) {
          return arrayCb(null, responses);
        }).catch(function (err) {
          return arrayCb(err, null);
        });

        return;
      } // send(JSONRPCRequest, callback): void


      var cb = callback;

      this._sendRequestAsync(request).then(function (response) {
        return cb(null, response);
      }).catch(function (err) {
        return cb(err, null);
      });
    }
  }, {
    key: "request",
    value: function () {
      var _request2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(args) {
        var method, params, newParams, id, result;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!args || typeof args !== "object" || Array.isArray(args))) {
                  _context3.next = 2;
                  break;
                }

                throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({
                  message: "Expected a single, non-array, object argument.",
                  data: args
                });

              case 2:
                method = args.method, params = args.params;

                if (!(typeof method !== "string" || method.length === 0)) {
                  _context3.next = 5;
                  break;
                }

                throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({
                  message: "'args.method' must be a non-empty string.",
                  data: args
                });

              case 5:
                if (!(params !== undefined && !Array.isArray(params) && (typeof params !== "object" || params === null))) {
                  _context3.next = 7;
                  break;
                }

                throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({
                  message: "'args.params' must be an object or array if provided.",
                  data: args
                });

              case 7:
                newParams = params === undefined ? [] : params; // WalletLink Requests

                id = this._relayEventManager.makeRequestId();
                _context3.next = 11;
                return this._sendRequestAsync({
                  method: method,
                  params: newParams,
                  jsonrpc: "2.0",
                  id: id
                });

              case 11:
                result = _context3.sent;
                return _context3.abrupt("return", result.result);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function request(_x3) {
        return _request2.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "scanQRCode",
    value: function () {
      var _scanQRCode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(match) {
        var relay, res;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.initializeRelay();

              case 2:
                relay = _context4.sent;
                _context4.next = 5;
                return relay.scanQRCode((0, util_1.ensureRegExpString)(match)).promise;

              case 5:
                res = _context4.sent;

                if (!(typeof res.result !== "string")) {
                  _context4.next = 8;
                  break;
                }

                throw new Error("result was not a string");

              case 8:
                return _context4.abrupt("return", res.result);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function scanQRCode(_x4) {
        return _scanQRCode.apply(this, arguments);
      }

      return scanQRCode;
    }()
  }, {
    key: "arbitraryRequest",
    value: function () {
      var _arbitraryRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(data) {
        var relay, res;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.initializeRelay();

              case 2:
                relay = _context5.sent;
                _context5.next = 5;
                return relay.arbitraryRequest(data).promise;

              case 5:
                res = _context5.sent;

                if (!(typeof res.result !== "string")) {
                  _context5.next = 8;
                  break;
                }

                throw new Error("result was not a string");

              case 8:
                return _context5.abrupt("return", res.result);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function arbitraryRequest(_x5) {
        return _arbitraryRequest.apply(this, arguments);
      }

      return arbitraryRequest;
    }()
  }, {
    key: "supportsSubscriptions",
    value: function supportsSubscriptions() {
      return false;
    }
  }, {
    key: "subscribe",
    value: function subscribe() {
      throw new Error("Subscriptions are not supported");
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      throw new Error("Subscriptions are not supported");
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      return true;
    }
  }, {
    key: "_sendRequest",
    value: function _sendRequest(request) {
      var response = {
        jsonrpc: "2.0",
        id: request.id
      };
      var method = request.method;
      response.result = this._handleSynchronousMethods(request);

      if (response.result === undefined) {
        throw new Error("WalletLink does not support calling ".concat(method, " synchronously without ") + "a callback. Please provide a callback parameter to call ".concat(method, " ") + "asynchronously.");
      }

      return response;
    }
  }, {
    key: "_setAddresses",
    value: function _setAddresses(addresses) {
      if (!Array.isArray(addresses)) {
        throw new Error("addresses is not an array");
      }

      var newAddresses = addresses.map(function (address) {
        return (0, util_1.ensureAddressString)(address);
      });

      if (JSON.stringify(newAddresses) === JSON.stringify(this._addresses)) {
        return;
      }

      this._addresses = newAddresses;
      this.emit("accountsChanged", this._addresses);

      this._storage.setItem(WalletLinkRelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY, newAddresses.join(" "));

      window.dispatchEvent(new CustomEvent("walletlink:addresses", {
        detail: this._addresses
      }));
    }
  }, {
    key: "_sendRequestAsync",
    value: function _sendRequestAsync(request) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        try {
          var syncResult = _this3._handleSynchronousMethods(request);

          if (syncResult !== undefined) {
            return resolve({
              jsonrpc: "2.0",
              id: request.id,
              result: syncResult
            });
          }

          var filterPromise = _this3._handleAsynchronousFilterMethods(request);

          if (filterPromise !== undefined) {
            filterPromise.then(function (res) {
              return resolve(Object.assign(Object.assign({}, res), {
                id: request.id
              }));
            }).catch(function (err) {
              return reject(err);
            });
            return;
          }

          var subscriptionPromise = _this3._handleSubscriptionMethods(request);

          if (subscriptionPromise !== undefined) {
            subscriptionPromise.then(function (res) {
              return resolve({
                jsonrpc: "2.0",
                id: request.id,
                result: res.result
              });
            }).catch(function (err) {
              return reject(err);
            });
            return;
          }
        } catch (err) {
          return reject(err);
        }

        _this3._handleAsynchronousMethods(request).then(function (res) {
          return resolve(Object.assign(Object.assign({}, res), {
            id: request.id
          }));
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "_sendMultipleRequestsAsync",
    value: function _sendMultipleRequestsAsync(requests) {
      var _this4 = this;

      return Promise.all(requests.map(function (r) {
        return _this4._sendRequestAsync(r);
      }));
    }
  }, {
    key: "_handleSynchronousMethods",
    value: function _handleSynchronousMethods(request) {
      var method = request.method;
      var params = request.params || [];

      switch (method) {
        case JSONRPC_1.JSONRPCMethod.eth_accounts:
          return this._eth_accounts();

        case JSONRPC_1.JSONRPCMethod.eth_coinbase:
          return this._eth_coinbase();

        case JSONRPC_1.JSONRPCMethod.eth_uninstallFilter:
          return this._eth_uninstallFilter(params);

        case JSONRPC_1.JSONRPCMethod.net_version:
          return this._net_version();

        case JSONRPC_1.JSONRPCMethod.eth_chainId:
          return this._eth_chainId();

        default:
          return undefined;
      }
    }
  }, {
    key: "_handleAsynchronousMethods",
    value: function _handleAsynchronousMethods(request) {
      var method = request.method;
      var params = request.params || [];

      switch (method) {
        case JSONRPC_1.JSONRPCMethod.eth_requestAccounts:
          return this._eth_requestAccounts();

        case JSONRPC_1.JSONRPCMethod.eth_sign:
          return this._eth_sign(params);

        case JSONRPC_1.JSONRPCMethod.eth_ecRecover:
          return this._eth_ecRecover(params);

        case JSONRPC_1.JSONRPCMethod.personal_sign:
          return this._personal_sign(params);

        case JSONRPC_1.JSONRPCMethod.personal_ecRecover:
          return this._personal_ecRecover(params);

        case JSONRPC_1.JSONRPCMethod.eth_signTransaction:
          return this._eth_signTransaction(params);

        case JSONRPC_1.JSONRPCMethod.eth_sendRawTransaction:
          return this._eth_sendRawTransaction(params);

        case JSONRPC_1.JSONRPCMethod.eth_sendTransaction:
          return this._eth_sendTransaction(params);

        case JSONRPC_1.JSONRPCMethod.eth_signTypedData_v1:
          return this._eth_signTypedData_v1(params);

        case JSONRPC_1.JSONRPCMethod.eth_signTypedData_v2:
          return this._throwUnsupportedMethodError();

        case JSONRPC_1.JSONRPCMethod.eth_signTypedData_v3:
          return this._eth_signTypedData_v3(params);

        case JSONRPC_1.JSONRPCMethod.eth_signTypedData_v4:
        case JSONRPC_1.JSONRPCMethod.eth_signTypedData:
          return this._eth_signTypedData_v4(params);

        case JSONRPC_1.JSONRPCMethod.walletlink_arbitrary:
          return this._walletlink_arbitrary(params);

        case JSONRPC_1.JSONRPCMethod.wallet_addEthereumChain:
          return this._wallet_addEthereumChain(params);

        case JSONRPC_1.JSONRPCMethod.wallet_switchEthereumChain:
          return this._wallet_switchEthereumChain(params);
      }

      if (!this.jsonRpcUrl) throw Error("Error: No jsonRpcUrl provided");
      return window.fetch(this.jsonRpcUrl, {
        method: "POST",
        body: JSON.stringify(request),
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        if (!json) {
          throw eth_rpc_errors_1.ethErrors.rpc.parse({});
        }

        var response = json;
        var error = response.error;

        if (error) {
          throw (0, eth_rpc_errors_1.serializeError)(error);
        }

        return response;
      });
    }
  }, {
    key: "_handleAsynchronousFilterMethods",
    value: function _handleAsynchronousFilterMethods(request) {
      var method = request.method;
      var params = request.params || [];

      switch (method) {
        case JSONRPC_1.JSONRPCMethod.eth_newFilter:
          return this._eth_newFilter(params);

        case JSONRPC_1.JSONRPCMethod.eth_newBlockFilter:
          return this._eth_newBlockFilter();

        case JSONRPC_1.JSONRPCMethod.eth_newPendingTransactionFilter:
          return this._eth_newPendingTransactionFilter();

        case JSONRPC_1.JSONRPCMethod.eth_getFilterChanges:
          return this._eth_getFilterChanges(params);

        case JSONRPC_1.JSONRPCMethod.eth_getFilterLogs:
          return this._eth_getFilterLogs(params);
      }

      return undefined;
    }
  }, {
    key: "_handleSubscriptionMethods",
    value: function _handleSubscriptionMethods(request) {
      switch (request.method) {
        case JSONRPC_1.JSONRPCMethod.eth_subscribe:
        case JSONRPC_1.JSONRPCMethod.eth_unsubscribe:
          return this._subscriptionManager.handleRequest(request);
      }

      return undefined;
    }
  }, {
    key: "_isKnownAddress",
    value: function _isKnownAddress(addressString) {
      try {
        var address = (0, util_1.ensureAddressString)(addressString);
        return this._addresses.includes(address);
      } catch (_a) {}

      return false;
    }
  }, {
    key: "_ensureKnownAddress",
    value: function _ensureKnownAddress(addressString) {
      if (!this._isKnownAddress(addressString)) {
        throw new Error("Unknown Ethereum address");
      }
    }
  }, {
    key: "_prepareTransactionParams",
    value: function _prepareTransactionParams(tx) {
      var fromAddress = tx.from ? (0, util_1.ensureAddressString)(tx.from) : this.selectedAddress;

      if (!fromAddress) {
        throw new Error("Ethereum address is unavailable");
      }

      this._ensureKnownAddress(fromAddress);

      var toAddress = tx.to ? (0, util_1.ensureAddressString)(tx.to) : null;
      var weiValue = tx.value != null ? (0, util_1.ensureBN)(tx.value) : new bn_js_1.default(0);
      var data = tx.data ? (0, util_1.ensureBuffer)(tx.data) : Buffer.alloc(0);
      var nonce = tx.nonce != null ? (0, util_1.ensureIntNumber)(tx.nonce) : null;
      var gasPriceInWei = tx.gasPrice != null ? (0, util_1.ensureBN)(tx.gasPrice) : null;
      var maxFeePerGas = tx.maxFeePerGas != null ? (0, util_1.ensureBN)(tx.maxFeePerGas) : null;
      var maxPriorityFeePerGas = tx.maxPriorityFeePerGas != null ? (0, util_1.ensureBN)(tx.maxPriorityFeePerGas) : null;
      var gasLimit = tx.gas != null ? (0, util_1.ensureBN)(tx.gas) : null;
      var chainId = this.getChainId();
      return {
        fromAddress: fromAddress,
        toAddress: toAddress,
        weiValue: weiValue,
        data: data,
        nonce: nonce,
        gasPriceInWei: gasPriceInWei,
        maxFeePerGas: maxFeePerGas,
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        gasLimit: gasLimit,
        chainId: chainId
      };
    }
  }, {
    key: "_requireAuthorization",
    value: function _requireAuthorization() {
      if (this._addresses.length === 0) {
        throw eth_rpc_errors_1.ethErrors.provider.unauthorized({});
      }
    }
  }, {
    key: "_throwUnsupportedMethodError",
    value: function _throwUnsupportedMethodError() {
      throw eth_rpc_errors_1.ethErrors.provider.unsupportedMethod({});
    }
  }, {
    key: "_signEthereumMessage",
    value: function () {
      var _signEthereumMessage2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(message, address, addPrefix, typedDataJson) {
        var relay, res;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this._ensureKnownAddress(address);

                _context6.prev = 1;
                _context6.next = 4;
                return this.initializeRelay();

              case 4:
                relay = _context6.sent;
                _context6.next = 7;
                return relay.signEthereumMessage(message, address, addPrefix, typedDataJson).promise;

              case 7:
                res = _context6.sent;
                return _context6.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: res.result
                });

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6["catch"](1);

                if (!(typeof _context6.t0.message === "string" && _context6.t0.message.match(/(denied|rejected)/i))) {
                  _context6.next = 15;
                  break;
                }

                throw eth_rpc_errors_1.ethErrors.provider.userRejectedRequest("User denied message signature");

              case 15:
                throw _context6.t0;

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 11]]);
      }));

      function _signEthereumMessage(_x6, _x7, _x8, _x9) {
        return _signEthereumMessage2.apply(this, arguments);
      }

      return _signEthereumMessage;
    }()
  }, {
    key: "_ethereumAddressFromSignedMessage",
    value: function () {
      var _ethereumAddressFromSignedMessage2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(message, signature, addPrefix) {
        var relay, res;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.initializeRelay();

              case 2:
                relay = _context7.sent;
                _context7.next = 5;
                return relay.ethereumAddressFromSignedMessage(message, signature, addPrefix).promise;

              case 5:
                res = _context7.sent;
                return _context7.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: res.result
                });

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _ethereumAddressFromSignedMessage(_x10, _x11, _x12) {
        return _ethereumAddressFromSignedMessage2.apply(this, arguments);
      }

      return _ethereumAddressFromSignedMessage;
    }()
  }, {
    key: "_eth_accounts",
    value: function _eth_accounts() {
      return this._addresses;
    }
  }, {
    key: "_eth_coinbase",
    value: function _eth_coinbase() {
      return this.selectedAddress || null;
    }
  }, {
    key: "_net_version",
    value: function _net_version() {
      return this.getChainId().toString(10);
    }
  }, {
    key: "_eth_chainId",
    value: function _eth_chainId() {
      return (0, util_1.hexStringFromIntNumber)(this.getChainId());
    }
  }, {
    key: "getChainId",
    value: function getChainId() {
      var chainIdStr = this._storage.getItem(DEFAULT_CHAIN_ID_KEY) || "1";
      var chainId = parseInt(chainIdStr, 10);
      return (0, util_1.ensureIntNumber)(chainId);
    }
  }, {
    key: "_eth_requestAccounts",
    value: function () {
      var _eth_requestAccounts2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
        var res, relay;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this._walletLinkAnalytics.sendEvent(init_1.EVENTS.ETH_ACCOUNTS_STATE, {
                  method: "provider::_eth_requestAccounts",
                  addresses_length: this._addresses.length,
                  sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : null
                });

                if (!(this._addresses.length > 0)) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return", Promise.resolve({
                  jsonrpc: "2.0",
                  id: 0,
                  result: this._addresses
                }));

              case 3:
                _context8.prev = 3;
                _context8.next = 6;
                return this.initializeRelay();

              case 6:
                relay = _context8.sent;
                _context8.next = 9;
                return relay.requestEthereumAccounts().promise;

              case 9:
                res = _context8.sent;
                _context8.next = 17;
                break;

              case 12:
                _context8.prev = 12;
                _context8.t0 = _context8["catch"](3);

                if (!(typeof _context8.t0.message === "string" && _context8.t0.message.match(/(denied|rejected)/i))) {
                  _context8.next = 16;
                  break;
                }

                throw eth_rpc_errors_1.ethErrors.provider.userRejectedRequest("User denied account authorization");

              case 16:
                throw _context8.t0;

              case 17:
                if (res.result) {
                  _context8.next = 19;
                  break;
                }

                throw new Error("accounts received is empty");

              case 19:
                this._setAddresses(res.result);

                return _context8.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: this._addresses
                });

              case 21:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[3, 12]]);
      }));

      function _eth_requestAccounts() {
        return _eth_requestAccounts2.apply(this, arguments);
      }

      return _eth_requestAccounts;
    }()
  }, {
    key: "_eth_sign",
    value: function _eth_sign(params) {
      this._requireAuthorization();

      var address = (0, util_1.ensureAddressString)(params[0]);
      var message = (0, util_1.ensureBuffer)(params[1]);
      return this._signEthereumMessage(message, address, false);
    }
  }, {
    key: "_eth_ecRecover",
    value: function _eth_ecRecover(params) {
      var message = (0, util_1.ensureBuffer)(params[0]);
      var signature = (0, util_1.ensureBuffer)(params[1]);
      return this._ethereumAddressFromSignedMessage(message, signature, false);
    }
  }, {
    key: "_personal_sign",
    value: function _personal_sign(params) {
      this._requireAuthorization();

      var message = (0, util_1.ensureBuffer)(params[0]);
      var address = (0, util_1.ensureAddressString)(params[1]);
      return this._signEthereumMessage(message, address, true);
    }
  }, {
    key: "_personal_ecRecover",
    value: function _personal_ecRecover(params) {
      var message = (0, util_1.ensureBuffer)(params[0]);
      var signature = (0, util_1.ensureBuffer)(params[1]);
      return this._ethereumAddressFromSignedMessage(message, signature, true);
    }
  }, {
    key: "_eth_signTransaction",
    value: function () {
      var _eth_signTransaction2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(params) {
        var tx, relay, res;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this._requireAuthorization();

                tx = this._prepareTransactionParams(params[0] || {});
                _context9.prev = 2;
                _context9.next = 5;
                return this.initializeRelay();

              case 5:
                relay = _context9.sent;
                _context9.next = 8;
                return relay.signEthereumTransaction(tx).promise;

              case 8:
                res = _context9.sent;
                return _context9.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: res.result
                });

              case 12:
                _context9.prev = 12;
                _context9.t0 = _context9["catch"](2);

                if (!(typeof _context9.t0.message === "string" && _context9.t0.message.match(/(denied|rejected)/i))) {
                  _context9.next = 16;
                  break;
                }

                throw eth_rpc_errors_1.ethErrors.provider.userRejectedRequest("User denied transaction signature");

              case 16:
                throw _context9.t0;

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[2, 12]]);
      }));

      function _eth_signTransaction(_x13) {
        return _eth_signTransaction2.apply(this, arguments);
      }

      return _eth_signTransaction;
    }()
  }, {
    key: "_eth_sendRawTransaction",
    value: function () {
      var _eth_sendRawTransaction2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(params) {
        var signedTransaction, relay, res;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                signedTransaction = (0, util_1.ensureBuffer)(params[0]);
                _context10.next = 3;
                return this.initializeRelay();

              case 3:
                relay = _context10.sent;
                _context10.next = 6;
                return relay.submitEthereumTransaction(signedTransaction, this.getChainId()).promise;

              case 6:
                res = _context10.sent;
                return _context10.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: res.result
                });

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _eth_sendRawTransaction(_x14) {
        return _eth_sendRawTransaction2.apply(this, arguments);
      }

      return _eth_sendRawTransaction;
    }()
  }, {
    key: "_eth_sendTransaction",
    value: function () {
      var _eth_sendTransaction2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(params) {
        var tx, relay, res;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this._requireAuthorization();

                tx = this._prepareTransactionParams(params[0] || {});
                _context11.prev = 2;
                _context11.next = 5;
                return this.initializeRelay();

              case 5:
                relay = _context11.sent;
                _context11.next = 8;
                return relay.signAndSubmitEthereumTransaction(tx).promise;

              case 8:
                res = _context11.sent;
                return _context11.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: res.result
                });

              case 12:
                _context11.prev = 12;
                _context11.t0 = _context11["catch"](2);

                if (!(typeof _context11.t0.message === "string" && _context11.t0.message.match(/(denied|rejected)/i))) {
                  _context11.next = 16;
                  break;
                }

                throw eth_rpc_errors_1.ethErrors.provider.userRejectedRequest("User denied transaction signature");

              case 16:
                throw _context11.t0;

              case 17:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[2, 12]]);
      }));

      function _eth_sendTransaction(_x15) {
        return _eth_sendTransaction2.apply(this, arguments);
      }

      return _eth_sendTransaction;
    }()
  }, {
    key: "_eth_signTypedData_v1",
    value: function () {
      var _eth_signTypedData_v = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(params) {
        var typedData, address, message, typedDataJSON;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this._requireAuthorization();

                typedData = (0, util_1.ensureParsedJSONObject)(params[0]);
                address = (0, util_1.ensureAddressString)(params[1]);

                this._ensureKnownAddress(address);

                message = eth_eip712_util_1.default.hashForSignTypedDataLegacy({
                  data: typedData
                });
                typedDataJSON = JSON.stringify(typedData, null, 2);
                return _context12.abrupt("return", this._signEthereumMessage(message, address, false, typedDataJSON));

              case 7:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _eth_signTypedData_v1(_x16) {
        return _eth_signTypedData_v.apply(this, arguments);
      }

      return _eth_signTypedData_v1;
    }()
  }, {
    key: "_eth_signTypedData_v3",
    value: function () {
      var _eth_signTypedData_v2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(params) {
        var address, typedData, message, typedDataJSON;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                this._requireAuthorization();

                address = (0, util_1.ensureAddressString)(params[0]);
                typedData = (0, util_1.ensureParsedJSONObject)(params[1]);

                this._ensureKnownAddress(address);

                message = eth_eip712_util_1.default.hashForSignTypedData_v3({
                  data: typedData
                });
                typedDataJSON = JSON.stringify(typedData, null, 2);
                return _context13.abrupt("return", this._signEthereumMessage(message, address, false, typedDataJSON));

              case 7:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function _eth_signTypedData_v3(_x17) {
        return _eth_signTypedData_v2.apply(this, arguments);
      }

      return _eth_signTypedData_v3;
    }()
  }, {
    key: "_eth_signTypedData_v4",
    value: function () {
      var _eth_signTypedData_v5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(params) {
        var address, typedData, message, typedDataJSON;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                this._requireAuthorization();

                address = (0, util_1.ensureAddressString)(params[0]);
                typedData = (0, util_1.ensureParsedJSONObject)(params[1]);

                this._ensureKnownAddress(address);

                message = eth_eip712_util_1.default.hashForSignTypedData_v4({
                  data: typedData
                });
                typedDataJSON = JSON.stringify(typedData, null, 2);
                return _context14.abrupt("return", this._signEthereumMessage(message, address, false, typedDataJSON));

              case 7:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function _eth_signTypedData_v4(_x18) {
        return _eth_signTypedData_v5.apply(this, arguments);
      }

      return _eth_signTypedData_v4;
    }()
  }, {
    key: "_walletlink_arbitrary",
    value: function () {
      var _walletlink_arbitrary2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(params) {
        var data, result;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                data = params[0];

                if (!(typeof data !== "string")) {
                  _context15.next = 3;
                  break;
                }

                throw new Error("parameter must be a string");

              case 3:
                _context15.next = 5;
                return this.arbitraryRequest(data);

              case 5:
                result = _context15.sent;
                return _context15.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: result
                });

              case 7:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function _walletlink_arbitrary(_x19) {
        return _walletlink_arbitrary2.apply(this, arguments);
      }

      return _walletlink_arbitrary;
    }()
  }, {
    key: "_wallet_addEthereumChain",
    value: function () {
      var _wallet_addEthereumChain2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16(params) {
        var request, chainIdNumber, ethereumChain, rpcUrl;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                request = params[0];
                chainIdNumber = parseInt(request.chainId, 16);
                ethereumChain = EthereumChain_1.EthereumChain.fromChainId(BigInt(chainIdNumber));

                if (!(ethereumChain === undefined)) {
                  _context16.next = 5;
                  break;
                }

                return _context16.abrupt("return", {
                  jsonrpc: '2.0',
                  id: 0,
                  error: {
                    code: 2,
                    message: "chainId ".concat(request.chainId, " not supported")
                  }
                });

              case 5:
                rpcUrl = EthereumChain_1.EthereumChain.rpcUrl(ethereumChain); // @ts-ignore

                _context16.next = 8;
                return this.switchEthereumChain(rpcUrl, parseInt(request.chainId, 16));

              case 8:
                return _context16.abrupt("return", {
                  jsonrpc: '2.0',
                  id: 0,
                  result: null
                });

              case 9:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function _wallet_addEthereumChain(_x20) {
        return _wallet_addEthereumChain2.apply(this, arguments);
      }

      return _wallet_addEthereumChain;
    }()
  }, {
    key: "_wallet_switchEthereumChain",
    value: function () {
      var _wallet_switchEthereumChain2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17(params) {
        var request, chainIdNumber, ethereumChain, rpcUrl;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                request = params[0];
                chainIdNumber = parseInt(request.chainId, 16);
                ethereumChain = EthereumChain_1.EthereumChain.fromChainId(BigInt(chainIdNumber));

                if (!(ethereumChain === undefined)) {
                  _context17.next = 5;
                  break;
                }

                return _context17.abrupt("return", {
                  jsonrpc: '2.0',
                  id: 0,
                  error: {
                    code: 2,
                    message: "chainId ".concat(request.chainId, " not supported")
                  }
                });

              case 5:
                rpcUrl = EthereumChain_1.EthereumChain.rpcUrl(ethereumChain); // @ts-ignore

                _context17.next = 8;
                return this.switchEthereumChain(rpcUrl, parseInt(request.chainId, 16));

              case 8:
                return _context17.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: null
                });

              case 9:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function _wallet_switchEthereumChain(_x21) {
        return _wallet_switchEthereumChain2.apply(this, arguments);
      }

      return _wallet_switchEthereumChain;
    }()
  }, {
    key: "_eth_uninstallFilter",
    value: function _eth_uninstallFilter(params) {
      var filterId = (0, util_1.ensureHexString)(params[0]);
      return this._filterPolyfill.uninstallFilter(filterId);
    }
  }, {
    key: "_eth_newFilter",
    value: function () {
      var _eth_newFilter2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee18(params) {
        var param, filterId;
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                param = params[0];
                _context18.next = 3;
                return this._filterPolyfill.newFilter(param);

              case 3:
                filterId = _context18.sent;
                return _context18.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: filterId
                });

              case 5:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function _eth_newFilter(_x22) {
        return _eth_newFilter2.apply(this, arguments);
      }

      return _eth_newFilter;
    }()
  }, {
    key: "_eth_newBlockFilter",
    value: function () {
      var _eth_newBlockFilter2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee19() {
        var filterId;
        return _regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return this._filterPolyfill.newBlockFilter();

              case 2:
                filterId = _context19.sent;
                return _context19.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: filterId
                });

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function _eth_newBlockFilter() {
        return _eth_newBlockFilter2.apply(this, arguments);
      }

      return _eth_newBlockFilter;
    }()
  }, {
    key: "_eth_newPendingTransactionFilter",
    value: function () {
      var _eth_newPendingTransactionFilter2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee20() {
        var filterId;
        return _regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return this._filterPolyfill.newPendingTransactionFilter();

              case 2:
                filterId = _context20.sent;
                return _context20.abrupt("return", {
                  jsonrpc: "2.0",
                  id: 0,
                  result: filterId
                });

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function _eth_newPendingTransactionFilter() {
        return _eth_newPendingTransactionFilter2.apply(this, arguments);
      }

      return _eth_newPendingTransactionFilter;
    }()
  }, {
    key: "_eth_getFilterChanges",
    value: function _eth_getFilterChanges(params) {
      var filterId = (0, util_1.ensureHexString)(params[0]);
      return this._filterPolyfill.getFilterChanges(filterId);
    }
  }, {
    key: "_eth_getFilterLogs",
    value: function _eth_getFilterLogs(params) {
      var filterId = (0, util_1.ensureHexString)(params[0]);
      return this._filterPolyfill.getFilterLogs(filterId);
    }
  }, {
    key: "initializeRelay",
    value: function initializeRelay() {
      var _this5 = this;

      if (this._relay) {
        return Promise.resolve(this._relay);
      }

      return this._relayProvider().then(function (relay) {
        relay.setAccountsCallback(function (accounts) {
          return _this5._setAddresses(accounts);
        });
        relay.setChainCallback(function (chainId, jsonRpcUrl) {
          _this5.updateProviderInfo(jsonRpcUrl, parseInt(chainId, 10), true);
        });
        _this5._relay = relay;
        return relay;
      });
    }
  }]);

  return WalletLinkProvider;
}(safe_event_emitter_1.default);

exports.WalletLinkProvider = WalletLinkProvider;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9).Buffer))

/***/ }),

/***/ 1459:
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

/***/ 1460:
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

/***/ 1461:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkAnalytics = void 0;

var WalletLinkAnalytics = /*#__PURE__*/function () {
  function WalletLinkAnalytics() {
    _classCallCheck(this, WalletLinkAnalytics);
  }

  _createClass(WalletLinkAnalytics, [{
    key: "sendEvent",
    value: function sendEvent(_eventType, _eventProperties) {// no-op
    }
  }]);

  return WalletLinkAnalytics;
}();

exports.WalletLinkAnalytics = WalletLinkAnalytics;

/***/ }),

/***/ 1462:
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

__exportStar(__webpack_require__(1618), exports);

__exportStar(__webpack_require__(1619), exports);

/***/ }),

/***/ 1463:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Session = void 0;

var rxjs_1 = __webpack_require__(1414);

var operators_1 = __webpack_require__(1433);

var util_1 = __webpack_require__(1399);

var js_sha256_1 = __webpack_require__(1620);

var STORAGE_KEY_SESSION_ID = "session:id";
var STORAGE_KEY_SESSION_SECRET = "session:secret";
var STORAGE_KEY_SESSION_LINKED = "session:linked";

var Session = /*#__PURE__*/function () {
  function Session(storage, id, secret, linked) {
    _classCallCheck(this, Session);

    this._storage = storage;
    this._id = id || (0, util_1.randomBytesHex)(16);
    this._secret = secret || (0, util_1.randomBytesHex)(32);
    var hash = js_sha256_1.sha256.create();
    hash.update("".concat(this._id, ", ").concat(this._secret, " WalletLink"));
    this._key = hash.hex();
    this._linked = !!linked;
  }

  _createClass(Session, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "secret",
    get: function get() {
      return this._secret;
    }
  }, {
    key: "key",
    get: function get() {
      return this._key;
    }
  }, {
    key: "linked",
    get: function get() {
      return this._linked;
    },
    set: function set(val) {
      this._linked = val;
      this.persistLinked();
    }
  }, {
    key: "save",
    value: function save() {
      this._storage.setItem(STORAGE_KEY_SESSION_ID, this._id);

      this._storage.setItem(STORAGE_KEY_SESSION_SECRET, this._secret);

      this.persistLinked();
      return this;
    }
  }, {
    key: "persistLinked",
    value: function persistLinked() {
      this._storage.setItem(STORAGE_KEY_SESSION_LINKED, this._linked ? "1" : "0");
    }
  }], [{
    key: "load",
    value: function load(storage) {
      var id = storage.getItem(STORAGE_KEY_SESSION_ID);
      var linked = storage.getItem(STORAGE_KEY_SESSION_LINKED);
      var secret = storage.getItem(STORAGE_KEY_SESSION_SECRET);

      if (id && secret) {
        return new Session(storage, id, secret, linked === "1");
      }

      return null;
    }
  }, {
    key: "clear",
    value: function clear(storage) {
      storage.removeItem(STORAGE_KEY_SESSION_SECRET);
      storage.removeItem(STORAGE_KEY_SESSION_ID);
      storage.removeItem(STORAGE_KEY_SESSION_LINKED);
    }
  }, {
    key: "persistedSessionIdChange$",
    get: function get() {
      return (0, rxjs_1.fromEvent)(window, "storage").pipe((0, operators_1.filter)(function (evt) {
        return evt.key === STORAGE_KEY_SESSION_ID;
      }), (0, operators_1.map)(function (evt) {
        return {
          oldValue: evt.oldValue || null,
          newValue: evt.newValue || null
        };
      }));
    }
    /**
     * Takes in a session ID and returns the sha256 hash of it.
     * @param sessionId session ID
     */

  }, {
    key: "hash",
    value: function hash(sessionId) {
      var hash = js_sha256_1.sha256.create();
      return hash.update(sessionId).hex();
    }
  }]);

  return Session;
}();

exports.Session = Session;

/***/ }),

/***/ 1464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hostReportError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
  setTimeout(function () {
    throw err;
  }, 0);
}

/***/ }),

/***/ 1465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rxSubscriber; });
/* unused harmony export $$rxSubscriber */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var rxSubscriber = /*@__PURE__*/function () {
  return typeof Symbol === 'function' ? /*@__PURE__*/Symbol('rxSubscriber') : '@@rxSubscriber_' + /*@__PURE__*/Math.random();
}();
var $$rxSubscriber = rxSubscriber;

/***/ }),

/***/ 1466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnsubscriptionError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var UnsubscriptionErrorImpl = /*@__PURE__*/function () {
  function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
      return i + 1 + ") " + err.toString();
    }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
  }

  UnsubscriptionErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return UnsubscriptionErrorImpl;
}();

var UnsubscriptionError = UnsubscriptionErrorImpl;

/***/ }),

/***/ 1467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isObject; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
  return x !== null && typeof x === 'object';
}

/***/ }),

/***/ 1468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return canReportError; });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1381);
/** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */

function canReportError(observer) {
  while (observer) {
    var _a = observer,
        closed_1 = _a.closed,
        destination = _a.destination,
        isStopped = _a.isStopped;

    if (closed_1 || isStopped) {
      return false;
    } else if (destination && destination instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__[/* Subscriber */ "a"]) {
      observer = destination;
    } else {
      observer = null;
    }
  }

  return true;
}

/***/ }),

/***/ 1469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectableObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return connectableObservableDescriptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1385);
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1382);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1381);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1384);
/* harmony import */ var _operators_refCount__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1438);
/** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */







var ConnectableObservable = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](ConnectableObservable, _super);

  function ConnectableObservable(source, subjectFactory) {
    var _this = _super.call(this) || this;

    _this.source = source;
    _this.subjectFactory = subjectFactory;
    _this._refCount = 0;
    _this._isComplete = false;
    return _this;
  }

  ConnectableObservable.prototype._subscribe = function (subscriber) {
    return this.getSubject().subscribe(subscriber);
  };

  ConnectableObservable.prototype.getSubject = function () {
    var subject = this._subject;

    if (!subject || subject.isStopped) {
      this._subject = this.subjectFactory();
    }

    return this._subject;
  };

  ConnectableObservable.prototype.connect = function () {
    var connection = this._connection;

    if (!connection) {
      this._isComplete = false;
      connection = this._connection = new _Subscription__WEBPACK_IMPORTED_MODULE_4__[/* Subscription */ "a"]();
      connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));

      if (connection.closed) {
        this._connection = null;
        connection = _Subscription__WEBPACK_IMPORTED_MODULE_4__[/* Subscription */ "a"].EMPTY;
      }
    }

    return connection;
  };

  ConnectableObservable.prototype.refCount = function () {
    return Object(_operators_refCount__WEBPACK_IMPORTED_MODULE_5__[/* refCount */ "a"])()(this);
  };

  return ConnectableObservable;
}(_Observable__WEBPACK_IMPORTED_MODULE_2__[/* Observable */ "a"]);


var connectableObservableDescriptor = /*@__PURE__*/function () {
  var connectableProto = ConnectableObservable.prototype;
  return {
    operator: {
      value: null
    },
    _refCount: {
      value: 0,
      writable: true
    },
    _subject: {
      value: null,
      writable: true
    },
    _connection: {
      value: null,
      writable: true
    },
    _subscribe: {
      value: connectableProto._subscribe
    },
    _isComplete: {
      value: connectableProto._isComplete,
      writable: true
    },
    getSubject: {
      value: connectableProto.getSubject
    },
    connect: {
      value: connectableProto.connect
    },
    refCount: {
      value: connectableProto.refCount
    }
  };
}();

var ConnectableSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](ConnectableSubscriber, _super);

  function ConnectableSubscriber(destination, connectable) {
    var _this = _super.call(this, destination) || this;

    _this.connectable = connectable;
    return _this;
  }

  ConnectableSubscriber.prototype._error = function (err) {
    this._unsubscribe();

    _super.prototype._error.call(this, err);
  };

  ConnectableSubscriber.prototype._complete = function () {
    this.connectable._isComplete = true;

    this._unsubscribe();

    _super.prototype._complete.call(this);
  };

  ConnectableSubscriber.prototype._unsubscribe = function () {
    var connectable = this.connectable;

    if (connectable) {
      this.connectable = null;
      var connection = connectable._connection;
      connectable._refCount = 0;
      connectable._subject = null;
      connectable._connection = null;

      if (connection) {
        connection.unsubscribe();
      }
    }
  };

  return ConnectableSubscriber;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__[/* SubjectSubscriber */ "b"]);

var RefCountOperator = /*@__PURE__*/function () {
  function RefCountOperator(connectable) {
    this.connectable = connectable;
  }

  RefCountOperator.prototype.call = function (subscriber, source) {
    var connectable = this.connectable;
    connectable._refCount++;
    var refCounter = new RefCountSubscriber(subscriber, connectable);
    var subscription = source.subscribe(refCounter);

    if (!refCounter.closed) {
      refCounter.connection = connectable.connect();
    }

    return subscription;
  };

  return RefCountOperator;
}();

var RefCountSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](RefCountSubscriber, _super);

  function RefCountSubscriber(destination, connectable) {
    var _this = _super.call(this, destination) || this;

    _this.connectable = connectable;
    return _this;
  }

  RefCountSubscriber.prototype._unsubscribe = function () {
    var connectable = this.connectable;

    if (!connectable) {
      this.connection = null;
      return;
    }

    this.connectable = null;
    var refCount = connectable._refCount;

    if (refCount <= 0) {
      this.connection = null;
      return;
    }

    connectable._refCount = refCount - 1;

    if (refCount > 1) {
      this.connection = null;
      return;
    }

    var connection = this.connection;
    var sharedConnection = connectable._connection;
    this.connection = null;

    if (sharedConnection && (!connection || sharedConnection === connection)) {
      sharedConnection.unsubscribe();
    }
  };

  return RefCountSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_3__[/* Subscriber */ "a"]);

/***/ }),

/***/ 1470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BehaviorSubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1385);
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1417);
/** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */




var BehaviorSubject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](BehaviorSubject, _super);

  function BehaviorSubject(_value) {
    var _this = _super.call(this) || this;

    _this._value = _value;
    return _this;
  }

  Object.defineProperty(BehaviorSubject.prototype, "value", {
    get: function get() {
      return this.getValue();
    },
    enumerable: true,
    configurable: true
  });

  BehaviorSubject.prototype._subscribe = function (subscriber) {
    var subscription = _super.prototype._subscribe.call(this, subscriber);

    if (subscription && !subscription.closed) {
      subscriber.next(this._value);
    }

    return subscription;
  };

  BehaviorSubject.prototype.getValue = function () {
    if (this.hasError) {
      throw this.thrownError;
    } else if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_2__[/* ObjectUnsubscribedError */ "a"]();
    } else {
      return this._value;
    }
  };

  BehaviorSubject.prototype.next = function (value) {
    _super.prototype.next.call(this, this._value = value);
  };

  return BehaviorSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__[/* Subject */ "a"]);



/***/ }),

/***/ 1471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return observeOn; });
/* unused harmony export ObserveOnOperator */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserveOnSubscriber; });
/* unused harmony export ObserveOnMessage */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1381);
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1407);
/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */



function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  return function observeOnOperatorFunction(source) {
    return source.lift(new ObserveOnOperator(scheduler, delay));
  };
}

var ObserveOnOperator = /*@__PURE__*/function () {
  function ObserveOnOperator(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    this.scheduler = scheduler;
    this.delay = delay;
  }

  ObserveOnOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
  };

  return ObserveOnOperator;
}();



var ObserveOnSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](ObserveOnSubscriber, _super);

  function ObserveOnSubscriber(destination, scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    var _this = _super.call(this, destination) || this;

    _this.scheduler = scheduler;
    _this.delay = delay;
    return _this;
  }

  ObserveOnSubscriber.dispatch = function (arg) {
    var notification = arg.notification,
        destination = arg.destination;
    notification.observe(destination);
    this.unsubscribe();
  };

  ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
    var destination = this.destination;
    destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
  };

  ObserveOnSubscriber.prototype._next = function (value) {
    this.scheduleMessage(_Notification__WEBPACK_IMPORTED_MODULE_2__[/* Notification */ "a"].createNext(value));
  };

  ObserveOnSubscriber.prototype._error = function (err) {
    this.scheduleMessage(_Notification__WEBPACK_IMPORTED_MODULE_2__[/* Notification */ "a"].createError(err));
    this.unsubscribe();
  };

  ObserveOnSubscriber.prototype._complete = function () {
    this.scheduleMessage(_Notification__WEBPACK_IMPORTED_MODULE_2__[/* Notification */ "a"].createComplete());
    this.unsubscribe();
  };

  return ObserveOnSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]);



var ObserveOnMessage = /*@__PURE__*/function () {
  function ObserveOnMessage(notification, destination) {
    this.notification = notification;
    this.destination = destination;
  }

  return ObserveOnMessage;
}();



/***/ }),

/***/ 1472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return scheduleArray; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1382);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1384);
/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */


function scheduleArray(input, scheduler) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](function (subscriber) {
    var sub = new _Subscription__WEBPACK_IMPORTED_MODULE_1__[/* Subscription */ "a"]();
    var i = 0;
    sub.add(scheduler.schedule(function () {
      if (i === input.length) {
        subscriber.complete();
        return;
      }

      subscriber.next(input[i++]);

      if (!subscriber.closed) {
        sub.add(this.schedule());
      }
    }));
    return sub;
  });
}

/***/ }),

/***/ 1473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scheduler; });
var Scheduler = /*@__PURE__*/function () {
  function Scheduler(SchedulerAction, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }

    this.SchedulerAction = SchedulerAction;
    this.now = now;
  }

  Scheduler.prototype.schedule = function (work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }

    return new this.SchedulerAction(this, work).schedule(state, delay);
  };

  Scheduler.now = function () {
    return Date.now();
  };

  return Scheduler;
}();



/***/ }),

/***/ 1474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeoutError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var TimeoutErrorImpl = /*@__PURE__*/function () {
  function TimeoutErrorImpl() {
    Error.call(this);
    this.message = 'Timeout has occurred';
    this.name = 'TimeoutError';
    return this;
  }

  TimeoutErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return TimeoutErrorImpl;
}();

var TimeoutError = TimeoutErrorImpl;

/***/ }),

/***/ 1475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return concatAll; });
/* harmony import */ var _mergeAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1444);
/** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

function concatAll() {
  return Object(_mergeAll__WEBPACK_IMPORTED_MODULE_0__[/* mergeAll */ "a"])(1);
}

/***/ }),

/***/ 1476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return merge; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1382);
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1392);
/* harmony import */ var _operators_mergeAll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1444);
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1419);
/** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */




function merge() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  var concurrent = Number.POSITIVE_INFINITY;
  var scheduler = null;
  var last = observables[observables.length - 1];

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__[/* isScheduler */ "a"])(last)) {
    scheduler = observables.pop();

    if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
      concurrent = observables.pop();
    }
  } else if (typeof last === 'number') {
    concurrent = observables.pop();
  }

  if (scheduler === null && observables.length === 1 && observables[0] instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"]) {
    return observables[0];
  }

  return Object(_operators_mergeAll__WEBPACK_IMPORTED_MODULE_2__[/* mergeAll */ "a"])(concurrent)(Object(_fromArray__WEBPACK_IMPORTED_MODULE_3__[/* fromArray */ "a"])(observables, scheduler));
}

/***/ }),

/***/ 1477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return race; });
/* unused harmony export RaceOperator */
/* unused harmony export RaceSubscriber */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1387);
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1419);
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1397);
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1406);
/** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function race() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  if (observables.length === 1) {
    if (Object(_util_isArray__WEBPACK_IMPORTED_MODULE_1__[/* isArray */ "a"])(observables[0])) {
      observables = observables[0];
    } else {
      return observables[0];
    }
  }

  return Object(_fromArray__WEBPACK_IMPORTED_MODULE_2__[/* fromArray */ "a"])(observables, undefined).lift(new RaceOperator());
}

var RaceOperator = /*@__PURE__*/function () {
  function RaceOperator() {}

  RaceOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new RaceSubscriber(subscriber));
  };

  return RaceOperator;
}();



var RaceSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](RaceSubscriber, _super);

  function RaceSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.hasFirst = false;
    _this.observables = [];
    _this.subscriptions = [];
    return _this;
  }

  RaceSubscriber.prototype._next = function (observable) {
    this.observables.push(observable);
  };

  RaceSubscriber.prototype._complete = function () {
    var observables = this.observables;
    var len = observables.length;

    if (len === 0) {
      this.destination.complete();
    } else {
      for (var i = 0; i < len && !this.hasFirst; i++) {
        var observable = observables[i];
        var subscription = Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__[/* subscribeToResult */ "a"])(this, observable, undefined, i);

        if (this.subscriptions) {
          this.subscriptions.push(subscription);
        }

        this.add(subscription);
      }

      this.observables = null;
    }
  };

  RaceSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
    if (!this.hasFirst) {
      this.hasFirst = true;

      for (var i = 0; i < this.subscriptions.length; i++) {
        if (i !== outerIndex) {
          var subscription = this.subscriptions[i];
          subscription.unsubscribe();
          this.remove(subscription);
        }
      }

      this.subscriptions = null;
    }

    this.destination.next(innerValue);
  };

  return RaceSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__[/* OuterSubscriber */ "a"]);



/***/ }),

/***/ 1478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return timer; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1382);
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1386);
/* harmony import */ var _util_isNumeric__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1446);
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1392);
/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */




function timer(dueTime, periodOrScheduler, scheduler) {
  if (dueTime === void 0) {
    dueTime = 0;
  }

  var period = -1;

  if (Object(_util_isNumeric__WEBPACK_IMPORTED_MODULE_2__[/* isNumeric */ "a"])(periodOrScheduler)) {
    period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
  } else if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_3__[/* isScheduler */ "a"])(periodOrScheduler)) {
    scheduler = periodOrScheduler;
  }

  if (!Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_3__[/* isScheduler */ "a"])(scheduler)) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_1__[/* async */ "a"];
  }

  return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](function (subscriber) {
    var due = Object(_util_isNumeric__WEBPACK_IMPORTED_MODULE_2__[/* isNumeric */ "a"])(dueTime) ? dueTime : +dueTime - scheduler.now();
    return scheduler.schedule(dispatch, due, {
      index: 0,
      period: period,
      subscriber: subscriber
    });
  });
}

function dispatch(state) {
  var index = state.index,
      period = state.period,
      subscriber = state.subscriber;
  subscriber.next(index);

  if (subscriber.closed) {
    return;
  } else if (period === -1) {
    return subscriber.complete();
  }

  state.index = index + 1;
  this.schedule(state, period);
}

/***/ }),

/***/ 1479:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegExpString = exports.IntNumber = exports.BigIntString = exports.AddressString = exports.HexString = exports.OpaqueType = void 0;

function OpaqueType() {
  return function (value) {
    return value;
  };
}

exports.OpaqueType = OpaqueType;
exports.HexString = OpaqueType();
exports.AddressString = OpaqueType();
exports.BigIntString = OpaqueType();

function IntNumber(num) {
  return Math.floor(num);
}

exports.IntNumber = IntNumber;
exports.RegExpString = OpaqueType();

/***/ }),

/***/ 1484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function toVal(mix) {
  var k,
      y,
      str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if (y = toVal(mix[k])) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }

  return str;
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var i = 0,
      tmp,
      x,
      str = '';

  while (i < arguments.length) {
    if (tmp = arguments[i++]) {
      if (x = toVal(tmp)) {
        str && (str += ' ');
        str += x;
      }
    }
  }

  return str;
});

/***/ }),

/***/ 1485:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelayMessageType = void 0;
var RelayMessageType;

(function (RelayMessageType) {
  RelayMessageType["SESSION_ID_REQUEST"] = "SESSION_ID_REQUEST";
  RelayMessageType["SESSION_ID_RESPONSE"] = "SESSION_ID_RESPONSE";
  RelayMessageType["LINKED"] = "LINKED";
  RelayMessageType["UNLINKED"] = "UNLINKED";
  RelayMessageType["WEB3_REQUEST"] = "WEB3_REQUEST";
  RelayMessageType["WEB3_REQUEST_CANCELED"] = "WEB3_REQUEST_CANCELED";
  RelayMessageType["WEB3_RESPONSE"] = "WEB3_RESPONSE";
})(RelayMessageType = exports.RelayMessageType || (exports.RelayMessageType = {}));

/***/ }),

/***/ 1516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ scheduled; });

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js + 1 modules
var Observable = __webpack_require__(1382);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscription.js
var Subscription = __webpack_require__(1384);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/observable.js
var symbol_observable = __webpack_require__(1396);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduled/scheduleObservable.js
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable PURE_IMPORTS_END */



function scheduleObservable(input, scheduler) {
  return new Observable["a" /* Observable */](function (subscriber) {
    var sub = new Subscription["a" /* Subscription */]();
    sub.add(scheduler.schedule(function () {
      var observable = input[symbol_observable["a" /* observable */]]();
      sub.add(observable.subscribe({
        next: function next(value) {
          sub.add(scheduler.schedule(function () {
            return subscriber.next(value);
          }));
        },
        error: function error(err) {
          sub.add(scheduler.schedule(function () {
            return subscriber.error(err);
          }));
        },
        complete: function complete() {
          sub.add(scheduler.schedule(function () {
            return subscriber.complete();
          }));
        }
      }));
    }));
    return sub;
  });
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduled/schedulePromise.js
/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */


function schedulePromise(input, scheduler) {
  return new Observable["a" /* Observable */](function (subscriber) {
    var sub = new Subscription["a" /* Subscription */]();
    sub.add(scheduler.schedule(function () {
      return input.then(function (value) {
        sub.add(scheduler.schedule(function () {
          subscriber.next(value);
          sub.add(scheduler.schedule(function () {
            return subscriber.complete();
          }));
        }));
      }, function (err) {
        sub.add(scheduler.schedule(function () {
          return subscriber.error(err);
        }));
      });
    }));
    return sub;
  });
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/scheduled/scheduleArray.js
var scheduleArray = __webpack_require__(1472);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/iterator.js
var symbol_iterator = __webpack_require__(1422);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduled/scheduleIterable.js
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator PURE_IMPORTS_END */



function scheduleIterable(input, scheduler) {
  if (!input) {
    throw new Error('Iterable cannot be null');
  }

  return new Observable["a" /* Observable */](function (subscriber) {
    var sub = new Subscription["a" /* Subscription */]();
    var iterator;
    sub.add(function () {
      if (iterator && typeof iterator.return === 'function') {
        iterator.return();
      }
    });
    sub.add(scheduler.schedule(function () {
      iterator = input[symbol_iterator["a" /* iterator */]]();
      sub.add(scheduler.schedule(function () {
        if (subscriber.closed) {
          return;
        }

        var value;
        var done;

        try {
          var result = iterator.next();
          value = result.value;
          done = result.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }

        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
          this.schedule();
        }
      }));
    }));
    return sub;
  });
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isInteropObservable.js
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

function isInteropObservable(input) {
  return input && typeof input[symbol_observable["a" /* observable */]] === 'function';
}
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isPromise.js
var isPromise = __webpack_require__(1525);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isArrayLike.js
var isArrayLike = __webpack_require__(1524);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isIterable.js
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

function isIterable(input) {
  return input && typeof input[symbol_iterator["a" /* iterator */]] === 'function';
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduled/scheduled.js
/** PURE_IMPORTS_START _scheduleObservable,_schedulePromise,_scheduleArray,_scheduleIterable,_util_isInteropObservable,_util_isPromise,_util_isArrayLike,_util_isIterable PURE_IMPORTS_END */








function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    } else if (Object(isPromise["a" /* isPromise */])(input)) {
      return schedulePromise(input, scheduler);
    } else if (Object(isArrayLike["a" /* isArrayLike */])(input)) {
      return Object(scheduleArray["a" /* scheduleArray */])(input, scheduler);
    } else if (isIterable(input) || typeof input === 'string') {
      return scheduleIterable(input, scheduler);
    }
  }

  throw new TypeError((input !== null && typeof input || input) + ' is not observable');
}

/***/ }),

/***/ 1520:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeError = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;

var error_constants_1 = __webpack_require__(1460);

var classes_1 = __webpack_require__(1459);

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

/***/ 1521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return empty; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1415);
/* harmony import */ var _util_hostReportError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1464);
/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */


var empty = {
  closed: true,
  next: function next(value) {},
  error: function error(err) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__[/* config */ "a"].useDeprecatedSynchronousErrorHandling) {
      throw err;
    } else {
      Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_1__[/* hostReportError */ "a"])(err);
    }
  },
  complete: function complete() {}
};

/***/ }),

/***/ 1522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubjectSubscription; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1380);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1384);
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */



var SubjectSubscription = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](SubjectSubscription, _super);

  function SubjectSubscription(subject, subscriber) {
    var _this = _super.call(this) || this;

    _this.subject = subject;
    _this.subscriber = subscriber;
    _this.closed = false;
    return _this;
  }

  SubjectSubscription.prototype.unsubscribe = function () {
    if (this.closed) {
      return;
    }

    this.closed = true;
    var subject = this.subject;
    var observers = subject.observers;
    this.subject = null;

    if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
      return;
    }

    var subscriberIndex = observers.indexOf(this.subscriber);

    if (subscriberIndex !== -1) {
      observers.splice(subscriberIndex, 1);
    }
  };

  return SubjectSubscription;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__[/* Subscription */ "a"]);



/***/ }),

/***/ 1523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeToArray; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var subscribeToArray = function subscribeToArray(array) {
  return function (subscriber) {
    for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }

    subscriber.complete();
  };
};

/***/ }),

/***/ 1524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArrayLike; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = function isArrayLike(x) {
  return x && typeof x.length === 'number' && typeof x !== 'function';
};

/***/ }),

/***/ 1525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isPromise; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
  return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}

/***/ }),

/***/ 1526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return not; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function not(pred, thisArg) {
  function notPred() {
    return !notPred.pred.apply(notPred.thisArg, arguments);
  }

  notPred.pred = pred;
  notPred.thisArg = thisArg;
  return notPred;
}

/***/ }),

/***/ 1527:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(58);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkRelayAbstract = exports.LOCAL_STORAGE_ADDRESSES_KEY = exports.WALLET_USER_NAME_KEY = void 0;
exports.WALLET_USER_NAME_KEY = "walletUsername";
exports.LOCAL_STORAGE_ADDRESSES_KEY = "Addresses";

var WalletLinkRelayAbstract = function WalletLinkRelayAbstract() {
  _classCallCheck(this, WalletLinkRelayAbstract);
};

exports.WalletLinkRelayAbstract = WalletLinkRelayAbstract;

/***/ }),

/***/ 1528:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Extracted from https://github.com/ethereumjs/ethereumjs-util and stripped out irrelevant code
// Original code licensed under the Mozilla Public License Version 2.0
var createKeccakHash = __webpack_require__(683);

var BN = __webpack_require__(1436);
/**
 * Returns a buffer filled with 0s
 * @method zeros
 * @param {Number} bytes  the number of bytes the buffer should be
 * @return {Buffer}
 */


function zeros(bytes) {
  return Buffer.allocUnsafe(bytes).fill(0);
}
/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @method setLength
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @param {Boolean} [right=false] whether to start padding form the left or right
 * @return {Buffer|Array}
 */


function setLength(msg, length, right) {
  var buf = zeros(length);
  msg = toBuffer(msg);

  if (right) {
    if (msg.length < length) {
      msg.copy(buf);
      return buf;
    }

    return msg.slice(0, length);
  } else {
    if (msg.length < length) {
      msg.copy(buf, length - msg.length);
      return buf;
    }

    return msg.slice(-length);
  }
}
/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @return {Buffer|Array}
 */


function setLengthRight(msg, length) {
  return setLength(msg, length, true);
}
/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param {*} v the value
 */


function toBuffer(v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v);
    } else if (typeof v === 'string') {
      if (isHexString(v)) {
        v = Buffer.from(padToEven(stripHexPrefix(v)), 'hex');
      } else {
        v = Buffer.from(v);
      }
    } else if (typeof v === 'number') {
      v = intToBuffer(v);
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0);
    } else if (BN.isBN(v)) {
      v = v.toArrayLike(Buffer);
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray());
    } else {
      throw new Error('invalid type');
    }
  }

  return v;
}
/**
 * Converts a `Buffer` into a hex `String`
 * @param {Buffer} buf
 * @return {String}
 */


function bufferToHex(buf) {
  buf = toBuffer(buf);
  return '0x' + buf.toString('hex');
}
/**
 * Creates Keccak hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Number} [bits=256] the Keccak width
 * @return {Buffer}
 */


function keccak(a, bits) {
  a = toBuffer(a);
  if (!bits) bits = 256;
  return createKeccakHash('keccak' + bits).update(a).digest();
}

function padToEven(str) {
  return str.length % 2 ? '0' + str : str;
}

function isHexString(str) {
  return typeof str === 'string' && str.match(/^0x[0-9A-Fa-f]*$/);
}

function stripHexPrefix(str) {
  if (typeof str === 'string' && str.startsWith('0x')) {
    return str.slice(2);
  }

  return str;
}

module.exports = {
  zeros: zeros,
  setLength: setLength,
  setLengthRight: setLengthRight,
  isHexString: isHexString,
  stripHexPrefix: stripHexPrefix,
  toBuffer: toBuffer,
  bufferToHex: bufferToHex,
  keccak: keccak
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9).Buffer))

/***/ }),

/***/ 1536:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLink = void 0;

var WalletLinkAnalytics_1 = __webpack_require__(1461);

var ScopedLocalStorage_1 = __webpack_require__(1638);

var WalletLinkProvider_1 = __webpack_require__(1458);

var WalletLinkSdkUI_1 = __webpack_require__(1639);

var WalletLinkRelay_1 = __webpack_require__(1656);

var WalletLinkRelayEventManager_1 = __webpack_require__(1667);

var util_1 = __webpack_require__(1399);

var WALLETLINK_URL = Object({"NODE_ENV":"production","PUBLIC_URL":"","WDS_SOCKET_HOST":undefined,"WDS_SOCKET_PATH":undefined,"WDS_SOCKET_PORT":undefined,"FAST_REFRESH":true,"REACT_APP_ENV":"production"}).WALLETLINK_URL || "https://www.walletlink.org";
var WALLETLINK_VERSION = Object({"NODE_ENV":"production","PUBLIC_URL":"","WDS_SOCKET_HOST":undefined,"WDS_SOCKET_PATH":undefined,"WDS_SOCKET_PORT":undefined,"FAST_REFRESH":true,"REACT_APP_ENV":"production"}).WALLETLINK_VERSION || __webpack_require__(1668).version || "unknown";

var WalletLink = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param options WalletLink options object
   */
  function WalletLink(options) {
    _classCallCheck(this, WalletLink);

    this._appName = "";
    this._appLogoUrl = null;
    this._relay = null;
    this._relayEventManager = null;
    var walletLinkUrl = options.walletLinkUrl || WALLETLINK_URL;
    var walletLinkUIConstructor;

    if (!options.walletLinkUIConstructor) {
      walletLinkUIConstructor = function walletLinkUIConstructor(options) {
        return new WalletLinkSdkUI_1.WalletLinkSdkUI(options);
      };
    } else {
      walletLinkUIConstructor = options.walletLinkUIConstructor;
    }

    if (typeof options.overrideIsMetaMask === "undefined") {
      this._overrideIsMetaMask = false;
    } else {
      this._overrideIsMetaMask = options.overrideIsMetaMask;
    }

    this._walletLinkAnalytics = options.walletLinkAnalytics ? options.walletLinkAnalytics : new WalletLinkAnalytics_1.WalletLinkAnalytics();
    var u = new URL(walletLinkUrl);
    var walletLinkOrigin = "".concat(u.protocol, "//").concat(u.host);
    this._storage = new ScopedLocalStorage_1.ScopedLocalStorage("-walletlink:".concat(walletLinkOrigin));

    this._storage.setItem("version", WalletLink.VERSION);

    if (typeof window.walletLinkExtension !== "undefined") {
      return;
    }

    this._relayEventManager = new WalletLinkRelayEventManager_1.WalletLinkRelayEventManager();
    this._relay = new WalletLinkRelay_1.WalletLinkRelay({
      walletLinkUrl: walletLinkUrl,
      version: WALLETLINK_VERSION,
      darkMode: !!options.darkMode,
      walletLinkUIConstructor: walletLinkUIConstructor,
      storage: this._storage,
      relayEventManager: this._relayEventManager,
      walletLinkAnalytics: this._walletLinkAnalytics
    });
    this.setAppInfo(options.appName, options.appLogoUrl);

    this._relay.attachUI();
  }
  /**
   * Create a Web3 Provider object
   * @param jsonRpcUrl Ethereum JSON RPC URL (Default: "")
   * @param chainId Ethereum Chain ID (Default: 1)
   * @returns A Web3 Provider
   */


  _createClass(WalletLink, [{
    key: "makeWeb3Provider",
    value: function makeWeb3Provider() {
      var jsonRpcUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var chainId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (typeof window.walletLinkExtension !== "undefined") {
        if ( //@ts-ignore
        typeof window.walletLinkExtension.isCipher !== "boolean" || //@ts-ignore
        !window.walletLinkExtension.isCipher) {
          //@ts-ignore
          window.walletLinkExtension.setProviderInfo(jsonRpcUrl, chainId);
        }

        return window.walletLinkExtension;
      }

      var relay = this._relay;

      if (!relay || !this._relayEventManager || !this._storage) {
        throw new Error("Relay not initialized, should never happen");
      }

      if (!jsonRpcUrl) relay.setConnectDisabled(true);
      return new WalletLinkProvider_1.WalletLinkProvider({
        relayProvider: function relayProvider() {
          return Promise.resolve(relay);
        },
        relayEventManager: this._relayEventManager,
        storage: this._storage,
        jsonRpcUrl: jsonRpcUrl,
        chainId: chainId,
        walletLinkAnalytics: this._walletLinkAnalytics,
        overrideIsMetaMask: this._overrideIsMetaMask
      });
    }
    /**
     * Set application information
     * @param appName Application name
     * @param appLogoUrl Application logo image URL
     */

  }, {
    key: "setAppInfo",
    value: function setAppInfo(appName, appLogoUrl) {
      var _a;

      this._appName = appName || "DApp";
      this._appLogoUrl = appLogoUrl || (0, util_1.getFavicon)();

      if (typeof window.walletLinkExtension !== "undefined") {
        if ( //@ts-ignore
        typeof window.walletLinkExtension.isCipher !== "boolean" || //@ts-ignore
        !window.walletLinkExtension.isCipher) {
          //@ts-ignore
          window.walletLinkExtension.setAppInfo(this._appName, this._appLogoUrl);
        }
      } else {
        (_a = this._relay) === null || _a === void 0 ? void 0 : _a.setAppInfo(this._appName, this._appLogoUrl);
      }
    }
    /**
     * Disconnect. After disconnecting, this will reload the web page to ensure
     * all potential stale state is cleared.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      var _a;

      if (typeof window.walletLinkExtension !== "undefined") {
        window.walletLinkExtension.close();
      } else {
        (_a = this._relay) === null || _a === void 0 ? void 0 : _a.resetAndReload();
      }
    }
  }]);

  return WalletLink;
}();

exports.WalletLink = WalletLink;
/**
 * WalletLink version
 */

WalletLink.VERSION = WALLETLINK_VERSION;

/***/ }),

/***/ 1537:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) { // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _slicedToArray = __webpack_require__(138);

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QRCode = void 0;

var preact_1 = __webpack_require__(1400);

var hooks_1 = __webpack_require__(1448);

var qrcode_svg_1 = __importDefault(__webpack_require__(1643));

var QRCode = function QRCode(props) {
  var _ref = (0, hooks_1.useState)(""),
      _ref2 = _slicedToArray(_ref, 2),
      svg = _ref2[0],
      setSvg = _ref2[1];

  (0, hooks_1.useEffect)(function () {
    var _a, _b;

    var qrcode = new qrcode_svg_1.default({
      content: props.content,
      background: props.bgColor || "#ffffff",
      color: props.fgColor || "#000000",
      container: "svg",
      ecl: "M",
      width: (_a = props.width) !== null && _a !== void 0 ? _a : 256,
      height: (_b = props.height) !== null && _b !== void 0 ? _b : 256,
      padding: 0,
      image: props.image
    });
    var base64 = Buffer.from(qrcode.svg(), "utf8").toString("base64");
    setSvg("data:image/svg+xml;base64,".concat(base64));
  });
  return svg ? (0, preact_1.h)("img", {
    src: svg,
    alt: "QR Code"
  }) : null;
};

exports.QRCode = QRCode;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9).Buffer))

/***/ }),

/***/ 1538:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = void 0;

var preact_1 = __webpack_require__(1400);

var Spinner_css_1 = __importDefault(__webpack_require__(1644));

var Spinner = function Spinner(props) {
  var _a;

  var size = (_a = props.size) !== null && _a !== void 0 ? _a : 64;
  var color = props.color || "#000";
  return (0, preact_1.h)("div", {
    class: "-walletlink-spinner"
  }, (0, preact_1.h)("style", null, Spinner_css_1.default), (0, preact_1.h)("svg", {
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      width: size,
      height: size
    }
  }, (0, preact_1.h)("circle", {
    style: {
      cx: 50,
      cy: 50,
      r: 45,
      stroke: color
    }
  })));
};

exports.Spinner = Spinner;

/***/ }),

/***/ 1539:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3Method = void 0;
var Web3Method;

(function (Web3Method) {
  Web3Method["requestEthereumAccounts"] = "requestEthereumAccounts";
  Web3Method["signEthereumMessage"] = "signEthereumMessage";
  Web3Method["signEthereumTransaction"] = "signEthereumTransaction";
  Web3Method["submitEthereumTransaction"] = "submitEthereumTransaction";
  Web3Method["ethereumAddressFromSignedMessage"] = "ethereumAddressFromSignedMessage";
  Web3Method["scanQRCode"] = "scanQRCode";
  Web3Method["arbitrary"] = "arbitrary";
  Web3Method["childRequestEthereumAccounts"] = "childRequestEthereumAccounts";
  Web3Method["addEthereumChain"] = "addEthereumChain";
  Web3Method["switchEthereumChain"] = "switchEthereumChain";
})(Web3Method = exports.Web3Method || (exports.Web3Method = {}));

/***/ }),

/***/ 1614:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageFromCode = exports.serializeError = exports.EthereumProviderError = exports.EthereumRpcError = exports.ethErrors = exports.errorCodes = void 0;

var classes_1 = __webpack_require__(1459);

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

var utils_1 = __webpack_require__(1520);

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

var errors_1 = __webpack_require__(1616);

Object.defineProperty(exports, "ethErrors", {
  enumerable: true,
  get: function get() {
    return errors_1.ethErrors;
  }
});

var error_constants_1 = __webpack_require__(1460);

Object.defineProperty(exports, "errorCodes", {
  enumerable: true,
  get: function get() {
    return error_constants_1.errorCodes;
  }
});

/***/ }),

/***/ 1616:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__(138);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ethErrors = void 0;

var classes_1 = __webpack_require__(1459);

var utils_1 = __webpack_require__(1520);

var error_constants_1 = __webpack_require__(1460);

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

/***/ 1617:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EthereumChain = void 0;
var EthereumChain;

(function (EthereumChain) {
  // mainnets
  EthereumChain[EthereumChain["ETHEREUM_MAINNET"] = 1] = "ETHEREUM_MAINNET";
  EthereumChain[EthereumChain["OPTIMISM_MAINNET"] = 10] = "OPTIMISM_MAINNET";
  EthereumChain[EthereumChain["POLYGON_MAINNET"] = 137] = "POLYGON_MAINNET";
  EthereumChain[EthereumChain["ETHEREUM_CLASSIC_MAINNET"] = 61] = "ETHEREUM_CLASSIC_MAINNET";
  EthereumChain[EthereumChain["BSC_MAINNET"] = 56] = "BSC_MAINNET";
  EthereumChain[EthereumChain["FANTOM_MAINNET"] = 250] = "FANTOM_MAINNET";
  EthereumChain[EthereumChain["ARBITRUM_MAINNET"] = 42161] = "ARBITRUM_MAINNET";
  EthereumChain[EthereumChain["XDAI_MAINNET"] = 100] = "XDAI_MAINNET";
  EthereumChain[EthereumChain["AVALANCHE_MAINNET"] = 43114] = "AVALANCHE_MAINNET"; // testnets

  EthereumChain[EthereumChain["ROPSTEN"] = 3] = "ROPSTEN";
  EthereumChain[EthereumChain["RINKEBY"] = 4] = "RINKEBY";
  EthereumChain[EthereumChain["GOERLI"] = 5] = "GOERLI";
  EthereumChain[EthereumChain["KOVAN"] = 42] = "KOVAN";
  EthereumChain[EthereumChain["OPTIMISM_KOVAN"] = 69] = "OPTIMISM_KOVAN";
  EthereumChain[EthereumChain["POLYGON_TESTNET"] = 80001] = "POLYGON_TESTNET";
  EthereumChain[EthereumChain["BSC_TESTNET"] = 97] = "BSC_TESTNET";
  EthereumChain[EthereumChain["FANTOM_TESTNET"] = 4002] = "FANTOM_TESTNET";
  EthereumChain[EthereumChain["ARBITRUM_TESTNET"] = 421611] = "ARBITRUM_TESTNET";
  EthereumChain[EthereumChain["AVALANCHE_FUJI"] = 43113] = "AVALANCHE_FUJI";
})(EthereumChain = exports.EthereumChain || (exports.EthereumChain = {}));

(function (EthereumChain) {
  function rpcUrl(thiz) {
    switch (thiz) {
      case EthereumChain.ETHEREUM_MAINNET:
        return "https://mainnet-infura.wallet.coinbase.com";

      case EthereumChain.ROPSTEN:
        return "https://ropsten-infura.wallet.coinbase.com";

      case EthereumChain.RINKEBY:
        return "https://rinkeby-infura.wallet.coinbase.com";

      case EthereumChain.KOVAN:
        return "https://kovan-infura.wallet.coinbase.com";

      case EthereumChain.GOERLI:
        return "https://goerli-node.wallet.coinbase.com";

      case EthereumChain.OPTIMISM_KOVAN:
        return "https://optimism-node.wallet.coinbase.com";

      case EthereumChain.OPTIMISM_MAINNET:
        return "https://optimism-mainnet.wallet.coinbase.com";

      case EthereumChain.POLYGON_MAINNET:
        return "https://polygon-mainnet-infura.wallet.coinbase.com";

      case EthereumChain.POLYGON_TESTNET:
        return "https://polygon-mumbai-infura.wallet.coinbase.com";

      case EthereumChain.BSC_MAINNET:
        return "https://bsc-dataseed.binance.org";

      case EthereumChain.BSC_TESTNET:
        return "https://data-seed-prebsc-1-s1.binance.org:8545";

      case EthereumChain.FANTOM_MAINNET:
        return "https://rpcapi.fantom.network";

      case EthereumChain.FANTOM_TESTNET:
        return "https://rpc.testnet.fantom.network";

      case EthereumChain.ARBITRUM_MAINNET:
        return "https://l2-mainnet.wallet.coinbase.com?targetName=arbitrum";

      case EthereumChain.ARBITRUM_TESTNET:
        return "https://rinkeby.arbitrum.io/rpc";

      case EthereumChain.XDAI_MAINNET:
        return "https://rpc.xdaichain.com";

      case EthereumChain.AVALANCHE_MAINNET:
        return "https://api.avax.network/ext/bc/C/rpc";

      case EthereumChain.AVALANCHE_FUJI:
        return "https://api.avax-test.network/ext/bc/C/rpc";

      default:
        return undefined;
    }
  }

  EthereumChain.rpcUrl = rpcUrl;

  function fromChainId(chainId) {
    switch (Number(chainId)) {
      // mainnets
      case EthereumChain.ETHEREUM_MAINNET.valueOf():
        return EthereumChain.ETHEREUM_MAINNET;

      case EthereumChain.OPTIMISM_MAINNET.valueOf():
        return EthereumChain.OPTIMISM_MAINNET;

      case EthereumChain.POLYGON_MAINNET.valueOf():
        return EthereumChain.POLYGON_MAINNET;

      case EthereumChain.ETHEREUM_CLASSIC_MAINNET.valueOf():
        return EthereumChain.ETHEREUM_CLASSIC_MAINNET;

      case EthereumChain.BSC_MAINNET.valueOf():
        return EthereumChain.BSC_MAINNET;

      case EthereumChain.FANTOM_MAINNET.valueOf():
        return EthereumChain.FANTOM_MAINNET;

      case EthereumChain.ARBITRUM_MAINNET.valueOf():
        return EthereumChain.ARBITRUM_MAINNET;

      case EthereumChain.AVALANCHE_MAINNET.valueOf():
        return EthereumChain.AVALANCHE_MAINNET;

      case EthereumChain.XDAI_MAINNET.valueOf():
        return EthereumChain.XDAI_MAINNET;
      // testnets

      case EthereumChain.ROPSTEN.valueOf():
        return EthereumChain.ROPSTEN;

      case EthereumChain.RINKEBY.valueOf():
        return EthereumChain.RINKEBY;

      case EthereumChain.GOERLI.valueOf():
        return EthereumChain.GOERLI;

      case EthereumChain.KOVAN.valueOf():
        return EthereumChain.KOVAN;

      case EthereumChain.OPTIMISM_KOVAN.valueOf():
        return EthereumChain.OPTIMISM_KOVAN;

      case EthereumChain.POLYGON_TESTNET.valueOf():
        return EthereumChain.POLYGON_TESTNET;

      case EthereumChain.BSC_TESTNET.valueOf():
        return EthereumChain.BSC_TESTNET;

      case EthereumChain.FANTOM_TESTNET.valueOf():
        return EthereumChain.FANTOM_TESTNET;

      case EthereumChain.ARBITRUM_TESTNET.valueOf():
        return EthereumChain.ARBITRUM_TESTNET;

      case EthereumChain.AVALANCHE_FUJI.valueOf():
        return EthereumChain.AVALANCHE_FUJI;

      default:
        return undefined;
    }
  }

  EthereumChain.fromChainId = fromChainId;
})(EthereumChain = exports.EthereumChain || (exports.EthereumChain = {}));

/***/ }),

/***/ 1618:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = void 0;
exports.EVENTS = {
  REQUEST_CHILD_ETHEREUM_ACCOUNTS_START: "walletlink_sdk.request_child_ethereum_accounts.start",
  REQUEST_CHILD_ETHEREUM_ACCOUNTS_RESPONSE: "walletlink_sdk.request_child_ethereum_accounts.response",
  STARTED_CONNECTING: "walletlink_sdk.started.connecting",
  CONNECTED_STATE_CHANGE: "walletlink_sdk.connected",
  DISCONNECTED: "walletlink_sdk.disconnected",
  METADATA_DESTROYED: "walletlink_sdk_metadata_destroyed",
  LINKED: "walletlink_sdk.linked",
  FAILURE: "walletlink_sdk.generic_failure",
  SESSION_CONFIG_RECEIVED: "walletlink_sdk.session_config_event_received",
  ETH_ACCOUNTS_STATE: "walletlink_sdk.eth_accounts_state",
  SESSION_STATE_CHANGE: "walletlink_sdk.session_state_change",
  UNLINKED_ERROR_STATE: "walletlink_sdk.unlinked_error_state",
  GENERAL_ERROR: "walletlink_sdk.general_error"
};

/***/ }),

/***/ 1619:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(58);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkAnalyticsAbstract = void 0;
/**
 * An abstract class used to send events to track metrics / analytics
 */

var WalletLinkAnalyticsAbstract = function WalletLinkAnalyticsAbstract() {
  _classCallCheck(this, WalletLinkAnalyticsAbstract);
};

exports.WalletLinkAnalyticsAbstract = WalletLinkAnalyticsAbstract;

/***/ }),

/***/ 1620:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */

/*jslint bitwise: true */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};

  if (root.JS_SHA256_NO_WINDOW) {
    WINDOW = false;
  }

  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;

  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }

  var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(346);
  var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];
  var blocks = [];

  if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function createOutputMethod(outputType, is224) {
    return function (message) {
      return new Sha256(is224, true).update(message)[outputType]();
    };
  };

  var createMethod = function createMethod(is224) {
    var method = createOutputMethod('hex', is224);

    if (NODE_JS) {
      method = nodeWrap(method, is224);
    }

    method.create = function () {
      return new Sha256(is224);
    };

    method.update = function (message) {
      return method.create().update(message);
    };

    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type, is224);
    }

    return method;
  };

  var nodeWrap = function nodeWrap(method, is224) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var algorithm = is224 ? 'sha224' : 'sha256';

    var nodeMethod = function nodeMethod(message) {
      if (typeof message === 'string') {
        return crypto.createHash(algorithm).update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw new Error(ERROR);
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }

      if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer) {
        return crypto.createHash(algorithm).update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };

    return nodeMethod;
  };

  var createHmacOutputMethod = function createHmacOutputMethod(outputType, is224) {
    return function (key, message) {
      return new HmacSha256(key, is224, true).update(message)[outputType]();
    };
  };

  var createHmacMethod = function createHmacMethod(is224) {
    var method = createHmacOutputMethod('hex', is224);

    method.create = function (key) {
      return new HmacSha256(key, is224);
    };

    method.update = function (key, message) {
      return method.create(key).update(message);
    };

    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createHmacOutputMethod(type, is224);
    }

    return method;
  };

  function Sha256(is224, sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
    } else {
      this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    if (is224) {
      this.h0 = 0xc1059ed8;
      this.h1 = 0x367cd507;
      this.h2 = 0x3070dd17;
      this.h3 = 0xf70e5939;
      this.h4 = 0xffc00b31;
      this.h5 = 0x68581511;
      this.h6 = 0x64f98fa7;
      this.h7 = 0xbefa4fa4;
    } else {
      // 256
      this.h0 = 0x6a09e667;
      this.h1 = 0xbb67ae85;
      this.h2 = 0x3c6ef372;
      this.h3 = 0xa54ff53a;
      this.h4 = 0x510e527f;
      this.h5 = 0x9b05688c;
      this.h6 = 0x1f83d9ab;
      this.h7 = 0x5be0cd19;
    }

    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
    this.is224 = is224;
  }

  Sha256.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }

    var notString,
        type = typeof message;

    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }

      notString = true;
    }

    var code,
        index = 0,
        i,
        length = message.length,
        blocks = this.blocks;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        for (i = this.start; index < length && i < 64; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < 64; ++index) {
          code = message.charCodeAt(index);

          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
            blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;
      this.bytes += i - this.start;

      if (i >= 64) {
        this.block = blocks[16];
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }

    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }

    return this;
  };

  Sha256.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }

    this.finalized = true;
    var blocks = this.blocks,
        i = this.lastByteIndex;
    blocks[16] = this.block;
    blocks[i >> 2] |= EXTRA[i & 3];
    this.block = blocks[16];

    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }

      blocks[0] = this.block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }

    blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[15] = this.bytes << 3;
    this.hash();
  };

  Sha256.prototype.hash = function () {
    var a = this.h0,
        b = this.h1,
        c = this.h2,
        d = this.h3,
        e = this.h4,
        f = this.h5,
        g = this.h6,
        h = this.h7,
        blocks = this.blocks,
        j,
        s0,
        s1,
        maj,
        t1,
        t2,
        ch,
        ab,
        da,
        cd,
        bc;

    for (j = 16; j < 64; ++j) {
      // rightrotate
      t1 = blocks[j - 15];
      s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
      t1 = blocks[j - 2];
      s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
      blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
    }

    bc = b & c;

    for (j = 0; j < 64; j += 4) {
      if (this.first) {
        if (this.is224) {
          ab = 300032;
          t1 = blocks[0] - 1413257819;
          h = t1 - 150054599 << 0;
          d = t1 + 24177077 << 0;
        } else {
          ab = 704751109;
          t1 = blocks[0] - 210244248;
          h = t1 - 1521486534 << 0;
          d = t1 + 143694565 << 0;
        }

        this.first = false;
      } else {
        s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
        s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
        ab = a & b;
        maj = ab ^ a & c ^ bc;
        ch = e & f ^ ~e & g;
        t1 = h + s1 + ch + K[j] + blocks[j];
        t2 = s0 + maj;
        h = d + t1 << 0;
        d = t1 + t2 << 0;
      }

      s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
      s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
      da = d & a;
      maj = da ^ d & b ^ ab;
      ch = h & e ^ ~h & f;
      t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
      t2 = s0 + maj;
      g = c + t1 << 0;
      c = t1 + t2 << 0;
      s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
      s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
      cd = c & d;
      maj = cd ^ c & a ^ da;
      ch = g & h ^ ~g & e;
      t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
      t2 = s0 + maj;
      f = b + t1 << 0;
      b = t1 + t2 << 0;
      s0 = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
      s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
      bc = b & c;
      maj = bc ^ b & d ^ cd;
      ch = f & g ^ ~f & h;
      t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
      t2 = s0 + maj;
      e = a + t1 << 0;
      a = t1 + t2 << 0;
    }

    this.h0 = this.h0 + a << 0;
    this.h1 = this.h1 + b << 0;
    this.h2 = this.h2 + c << 0;
    this.h3 = this.h3 + d << 0;
    this.h4 = this.h4 + e << 0;
    this.h5 = this.h5 + f << 0;
    this.h6 = this.h6 + g << 0;
    this.h7 = this.h7 + h << 0;
  };

  Sha256.prototype.hex = function () {
    this.finalize();
    var h0 = this.h0,
        h1 = this.h1,
        h2 = this.h2,
        h3 = this.h3,
        h4 = this.h4,
        h5 = this.h5,
        h6 = this.h6,
        h7 = this.h7;
    var hex = HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] + HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] + HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] + HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] + HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] + HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] + HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] + HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] + HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] + HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F] + HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] + HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] + HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[h4 >> 28 & 0x0F] + HEX_CHARS[h4 >> 24 & 0x0F] + HEX_CHARS[h4 >> 20 & 0x0F] + HEX_CHARS[h4 >> 16 & 0x0F] + HEX_CHARS[h4 >> 12 & 0x0F] + HEX_CHARS[h4 >> 8 & 0x0F] + HEX_CHARS[h4 >> 4 & 0x0F] + HEX_CHARS[h4 & 0x0F] + HEX_CHARS[h5 >> 28 & 0x0F] + HEX_CHARS[h5 >> 24 & 0x0F] + HEX_CHARS[h5 >> 20 & 0x0F] + HEX_CHARS[h5 >> 16 & 0x0F] + HEX_CHARS[h5 >> 12 & 0x0F] + HEX_CHARS[h5 >> 8 & 0x0F] + HEX_CHARS[h5 >> 4 & 0x0F] + HEX_CHARS[h5 & 0x0F] + HEX_CHARS[h6 >> 28 & 0x0F] + HEX_CHARS[h6 >> 24 & 0x0F] + HEX_CHARS[h6 >> 20 & 0x0F] + HEX_CHARS[h6 >> 16 & 0x0F] + HEX_CHARS[h6 >> 12 & 0x0F] + HEX_CHARS[h6 >> 8 & 0x0F] + HEX_CHARS[h6 >> 4 & 0x0F] + HEX_CHARS[h6 & 0x0F];

    if (!this.is224) {
      hex += HEX_CHARS[h7 >> 28 & 0x0F] + HEX_CHARS[h7 >> 24 & 0x0F] + HEX_CHARS[h7 >> 20 & 0x0F] + HEX_CHARS[h7 >> 16 & 0x0F] + HEX_CHARS[h7 >> 12 & 0x0F] + HEX_CHARS[h7 >> 8 & 0x0F] + HEX_CHARS[h7 >> 4 & 0x0F] + HEX_CHARS[h7 & 0x0F];
    }

    return hex;
  };

  Sha256.prototype.toString = Sha256.prototype.hex;

  Sha256.prototype.digest = function () {
    this.finalize();
    var h0 = this.h0,
        h1 = this.h1,
        h2 = this.h2,
        h3 = this.h3,
        h4 = this.h4,
        h5 = this.h5,
        h6 = this.h6,
        h7 = this.h7;
    var arr = [h0 >> 24 & 0xFF, h0 >> 16 & 0xFF, h0 >> 8 & 0xFF, h0 & 0xFF, h1 >> 24 & 0xFF, h1 >> 16 & 0xFF, h1 >> 8 & 0xFF, h1 & 0xFF, h2 >> 24 & 0xFF, h2 >> 16 & 0xFF, h2 >> 8 & 0xFF, h2 & 0xFF, h3 >> 24 & 0xFF, h3 >> 16 & 0xFF, h3 >> 8 & 0xFF, h3 & 0xFF, h4 >> 24 & 0xFF, h4 >> 16 & 0xFF, h4 >> 8 & 0xFF, h4 & 0xFF, h5 >> 24 & 0xFF, h5 >> 16 & 0xFF, h5 >> 8 & 0xFF, h5 & 0xFF, h6 >> 24 & 0xFF, h6 >> 16 & 0xFF, h6 >> 8 & 0xFF, h6 & 0xFF];

    if (!this.is224) {
      arr.push(h7 >> 24 & 0xFF, h7 >> 16 & 0xFF, h7 >> 8 & 0xFF, h7 & 0xFF);
    }

    return arr;
  };

  Sha256.prototype.array = Sha256.prototype.digest;

  Sha256.prototype.arrayBuffer = function () {
    this.finalize();
    var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
    var dataView = new DataView(buffer);
    dataView.setUint32(0, this.h0);
    dataView.setUint32(4, this.h1);
    dataView.setUint32(8, this.h2);
    dataView.setUint32(12, this.h3);
    dataView.setUint32(16, this.h4);
    dataView.setUint32(20, this.h5);
    dataView.setUint32(24, this.h6);

    if (!this.is224) {
      dataView.setUint32(28, this.h7);
    }

    return buffer;
  };

  function HmacSha256(key, is224, sharedMemory) {
    var i,
        type = typeof key;

    if (type === 'string') {
      var bytes = [],
          length = key.length,
          index = 0,
          code;

      for (i = 0; i < length; ++i) {
        code = key.charCodeAt(i);

        if (code < 0x80) {
          bytes[index++] = code;
        } else if (code < 0x800) {
          bytes[index++] = 0xc0 | code >> 6;
          bytes[index++] = 0x80 | code & 0x3f;
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes[index++] = 0xe0 | code >> 12;
          bytes[index++] = 0x80 | code >> 6 & 0x3f;
          bytes[index++] = 0x80 | code & 0x3f;
        } else {
          code = 0x10000 + ((code & 0x3ff) << 10 | key.charCodeAt(++i) & 0x3ff);
          bytes[index++] = 0xf0 | code >> 18;
          bytes[index++] = 0x80 | code >> 12 & 0x3f;
          bytes[index++] = 0x80 | code >> 6 & 0x3f;
          bytes[index++] = 0x80 | code & 0x3f;
        }
      }

      key = bytes;
    } else {
      if (type === 'object') {
        if (key === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
          key = new Uint8Array(key);
        } else if (!Array.isArray(key)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
    }

    if (key.length > 64) {
      key = new Sha256(is224, true).update(key).array();
    }

    var oKeyPad = [],
        iKeyPad = [];

    for (i = 0; i < 64; ++i) {
      var b = key[i] || 0;
      oKeyPad[i] = 0x5c ^ b;
      iKeyPad[i] = 0x36 ^ b;
    }

    Sha256.call(this, is224, sharedMemory);
    this.update(iKeyPad);
    this.oKeyPad = oKeyPad;
    this.inner = true;
    this.sharedMemory = sharedMemory;
  }

  HmacSha256.prototype = new Sha256();

  HmacSha256.prototype.finalize = function () {
    Sha256.prototype.finalize.call(this);

    if (this.inner) {
      this.inner = false;
      var innerHash = this.array();
      Sha256.call(this, this.is224, this.sharedMemory);
      this.update(this.oKeyPad);
      this.update(innerHash);
      Sha256.prototype.finalize.call(this);
    }
  };

  var exports = createMethod();
  exports.sha256 = exports;
  exports.sha224 = createMethod(true);
  exports.sha256.hmac = createHmacMethod();
  exports.sha224.hmac = createHmacMethod(true);

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.sha256 = exports.sha256;
    root.sha224 = exports.sha224;

    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(34), __webpack_require__(29)))

/***/ }),

/***/ 1621:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var _createForOfIteratorHelper = __webpack_require__(112);

var _slicedToArray = __webpack_require__(138);

var util = __webpack_require__(1528);

var abi = __webpack_require__(1622);

var TYPED_MESSAGE_SCHEMA = {
  type: 'object',
  properties: {
    types: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            type: {
              type: 'string'
            }
          },
          required: ['name', 'type']
        }
      }
    },
    primaryType: {
      type: 'string'
    },
    domain: {
      type: 'object'
    },
    message: {
      type: 'object'
    }
  },
  required: ['types', 'primaryType', 'domain', 'message']
};
/**
 * A collection of utility functions used for signing typed data
 */

var TypedDataUtils = {
  /**
   * Encodes an object by encoding and concatenating each of its members
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of an object
   */
  encodeData: function encodeData(primaryType, data, types) {
    var _this = this;

    var useV4 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var encodedTypes = ['bytes32'];
    var encodedValues = [this.hashType(primaryType, types)];

    if (useV4) {
      var encodeField = function encodeField(name, type, value) {
        if (types[type] !== undefined) {
          return ['bytes32', value == null ? '0x0000000000000000000000000000000000000000000000000000000000000000' : util.keccak(_this.encodeData(type, value, types, useV4))];
        }

        if (value === undefined) throw new Error("missing value for field ".concat(name, " of type ").concat(type));

        if (type === 'bytes') {
          return ['bytes32', util.keccak(value)];
        }

        if (type === 'string') {
          // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
          if (typeof value === 'string') {
            value = Buffer.from(value, 'utf8');
          }

          return ['bytes32', util.keccak(value)];
        }

        if (type.lastIndexOf(']') === type.length - 1) {
          var parsedType = type.slice(0, type.lastIndexOf('['));
          var typeValuePairs = value.map(function (item) {
            return encodeField(name, parsedType, item);
          });
          return ['bytes32', util.keccak(abi.rawEncode(typeValuePairs.map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1),
                type = _ref2[0];

            return type;
          }), typeValuePairs.map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                value = _ref4[1];

            return value;
          })))];
        }

        return [type, value];
      };

      var _iterator = _createForOfIteratorHelper(types[primaryType]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;

          var _encodeField = encodeField(field.name, field.type, data[field.name]),
              _encodeField2 = _slicedToArray(_encodeField, 2),
              type = _encodeField2[0],
              value = _encodeField2[1];

          encodedTypes.push(type);
          encodedValues.push(value);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      var _iterator2 = _createForOfIteratorHelper(types[primaryType]),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _field = _step2.value;
          var _value = data[_field.name];

          if (_value !== undefined) {
            if (_field.type === 'bytes') {
              encodedTypes.push('bytes32');
              _value = util.keccak(_value);
              encodedValues.push(_value);
            } else if (_field.type === 'string') {
              encodedTypes.push('bytes32'); // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex

              if (typeof _value === 'string') {
                _value = Buffer.from(_value, 'utf8');
              }

              _value = util.keccak(_value);
              encodedValues.push(_value);
            } else if (types[_field.type] !== undefined) {
              encodedTypes.push('bytes32');
              _value = util.keccak(this.encodeData(_field.type, _value, types, useV4));
              encodedValues.push(_value);
            } else if (_field.type.lastIndexOf(']') === _field.type.length - 1) {
              throw new Error('Arrays currently unimplemented in encodeData');
            } else {
              encodedTypes.push(_field.type);
              encodedValues.push(_value);
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    return abi.rawEncode(encodedTypes, encodedValues);
  },

  /**
   * Encodes the type of an object by encoding a comma delimited list of its members
   *
   * @param {string} primaryType - Root type to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of the type of an object
   */
  encodeType: function encodeType(primaryType, types) {
    var result = '';
    var deps = this.findTypeDependencies(primaryType, types).filter(function (dep) {
      return dep !== primaryType;
    });
    deps = [primaryType].concat(deps.sort());

    var _iterator3 = _createForOfIteratorHelper(deps),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var type = _step3.value;
        var children = types[type];

        if (!children) {
          throw new Error('No type definition specified: ' + type);
        }

        result += type + '(' + types[type].map(function (_ref5) {
          var name = _ref5.name,
              type = _ref5.type;
          return type + ' ' + name;
        }).join(',') + ')';
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return result;
  },

  /**
   * Finds all types within a type defintion object
   *
   * @param {string} primaryType - Root type
   * @param {Object} types - Type definitions
   * @param {Array} results - current set of accumulated types
   * @returns {Array} - Set of all types found in the type definition
   */
  findTypeDependencies: function findTypeDependencies(primaryType, types) {
    var results = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    primaryType = primaryType.match(/^\w*/)[0];

    if (results.includes(primaryType) || types[primaryType] === undefined) {
      return results;
    }

    results.push(primaryType);

    var _iterator4 = _createForOfIteratorHelper(types[primaryType]),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var field = _step4.value;

        var _iterator5 = _createForOfIteratorHelper(this.findTypeDependencies(field.type, types, results)),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var dep = _step5.value;
            !results.includes(dep) && results.push(dep);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    return results;
  },

  /**
   * Hashes an object
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to hash
   * @param {Object} types - Type definitions
   * @returns {string} - Hash of an object
   */
  hashStruct: function hashStruct(primaryType, data, types) {
    var useV4 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return util.keccak(this.encodeData(primaryType, data, types, useV4));
  },

  /**
   * Hashes the type of an object
   *
   * @param {string} primaryType - Root type to hash
   * @param {Object} types - Type definitions
   * @returns {string} - Hash of an object
   */
  hashType: function hashType(primaryType, types) {
    return util.keccak(this.encodeType(primaryType, types));
  },

  /**
   * Removes properties from a message object that are not defined per EIP-712
   *
   * @param {Object} data - typed message object
   * @returns {Object} - typed message object with only allowed fields
   */
  sanitizeData: function sanitizeData(data) {
    var sanitizedData = {};

    for (var key in TYPED_MESSAGE_SCHEMA.properties) {
      data[key] && (sanitizedData[key] = data[key]);
    }

    if (sanitizedData.types) {
      sanitizedData.types = Object.assign({
        EIP712Domain: []
      }, sanitizedData.types);
    }

    return sanitizedData;
  },

  /**
   * Returns the hash of a typed message as per EIP-712 for signing
   *
   * @param {Object} typedData - Types message data to sign
   * @returns {string} - sha3 hash for signing
   */
  hash: function hash(typedData) {
    var useV4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var sanitizedData = this.sanitizeData(typedData);
    var parts = [Buffer.from('1901', 'hex')];
    parts.push(this.hashStruct('EIP712Domain', sanitizedData.domain, sanitizedData.types, useV4));

    if (sanitizedData.primaryType !== 'EIP712Domain') {
      parts.push(this.hashStruct(sanitizedData.primaryType, sanitizedData.message, sanitizedData.types, useV4));
    }

    return util.keccak(Buffer.concat(parts));
  }
};
module.exports = {
  TYPED_MESSAGE_SCHEMA: TYPED_MESSAGE_SCHEMA,
  TypedDataUtils: TypedDataUtils,
  hashForSignTypedDataLegacy: function hashForSignTypedDataLegacy(msgParams) {
    return typedSignatureHashLegacy(msgParams.data);
  },
  hashForSignTypedData_v3: function hashForSignTypedData_v3(msgParams) {
    return TypedDataUtils.hash(msgParams.data, false);
  },
  hashForSignTypedData_v4: function hashForSignTypedData_v4(msgParams) {
    return TypedDataUtils.hash(msgParams.data);
  }
};
/**
 * @param typedData - Array of data along with types, as per EIP712.
 * @returns Buffer
 */

function typedSignatureHashLegacy(typedData) {
  var error = new Error('Expect argument to be non-empty array');
  if (typeof typedData !== 'object' || !typedData.length) throw error;
  var data = typedData.map(function (e) {
    return e.type === 'bytes' ? util.toBuffer(e.value) : e.value;
  });
  var types = typedData.map(function (e) {
    return e.type;
  });
  var schema = typedData.map(function (e) {
    if (!e.name) throw error;
    return e.type + ' ' + e.name;
  });
  return abi.soliditySHA3(['bytes32', 'bytes32'], [abi.soliditySHA3(new Array(typedData.length).fill('string'), schema), abi.soliditySHA3(types, data)]);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9).Buffer))

/***/ }),

/***/ 1622:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Extracted from https://github.com/ethereumjs/ethereumjs-abi and stripped out irrelevant code
// Original code licensed under the MIT License - Copyright (c) 2015 Alex Beregszaszi
var util = __webpack_require__(1528);

var BN = __webpack_require__(1436); // Convert from short to canonical names
// FIXME: optimise or make this nicer?


function elementaryName(name) {
  if (name.startsWith('int[')) {
    return 'int256' + name.slice(3);
  } else if (name === 'int') {
    return 'int256';
  } else if (name.startsWith('uint[')) {
    return 'uint256' + name.slice(4);
  } else if (name === 'uint') {
    return 'uint256';
  } else if (name.startsWith('fixed[')) {
    return 'fixed128x128' + name.slice(5);
  } else if (name === 'fixed') {
    return 'fixed128x128';
  } else if (name.startsWith('ufixed[')) {
    return 'ufixed128x128' + name.slice(6);
  } else if (name === 'ufixed') {
    return 'ufixed128x128';
  }

  return name;
} // Parse N from type<N>


function parseTypeN(type) {
  return parseInt(/^\D+(\d+)$/.exec(type)[1], 10);
} // Parse N,M from type<N>x<M>


function parseTypeNxM(type) {
  var tmp = /^\D+(\d+)x(\d+)$/.exec(type);
  return [parseInt(tmp[1], 10), parseInt(tmp[2], 10)];
} // Parse N in type[<N>] where "type" can itself be an array type.


function parseTypeArray(type) {
  var tmp = type.match(/(.*)\[(.*?)\]$/);

  if (tmp) {
    return tmp[2] === '' ? 'dynamic' : parseInt(tmp[2], 10);
  }

  return null;
}

function parseNumber(arg) {
  var type = typeof arg;

  if (type === 'string') {
    if (util.isHexString(arg)) {
      return new BN(util.stripHexPrefix(arg), 16);
    } else {
      return new BN(arg, 10);
    }
  } else if (type === 'number') {
    return new BN(arg);
  } else if (arg.toArray) {
    // assume this is a BN for the moment, replace with BN.isBN soon
    return arg;
  } else {
    throw new Error('Argument is not a number');
  }
} // Encodes a single item (can be dynamic array)
// @returns: Buffer


function encodeSingle(type, arg) {
  var size, num, ret, i;

  if (type === 'address') {
    return encodeSingle('uint160', parseNumber(arg));
  } else if (type === 'bool') {
    return encodeSingle('uint8', arg ? 1 : 0);
  } else if (type === 'string') {
    return encodeSingle('bytes', new Buffer(arg, 'utf8'));
  } else if (isArray(type)) {
    // this part handles fixed-length ([2]) and variable length ([]) arrays
    // NOTE: we catch here all calls to arrays, that simplifies the rest
    if (typeof arg.length === 'undefined') {
      throw new Error('Not an array?');
    }

    size = parseTypeArray(type);

    if (size !== 'dynamic' && size !== 0 && arg.length > size) {
      throw new Error('Elements exceed array size: ' + size);
    }

    ret = [];
    type = type.slice(0, type.lastIndexOf('['));

    if (typeof arg === 'string') {
      arg = JSON.parse(arg);
    }

    for (i in arg) {
      ret.push(encodeSingle(type, arg[i]));
    }

    if (size === 'dynamic') {
      var length = encodeSingle('uint256', arg.length);
      ret.unshift(length);
    }

    return Buffer.concat(ret);
  } else if (type === 'bytes') {
    arg = new Buffer(arg);
    ret = Buffer.concat([encodeSingle('uint256', arg.length), arg]);

    if (arg.length % 32 !== 0) {
      ret = Buffer.concat([ret, util.zeros(32 - arg.length % 32)]);
    }

    return ret;
  } else if (type.startsWith('bytes')) {
    size = parseTypeN(type);

    if (size < 1 || size > 32) {
      throw new Error('Invalid bytes<N> width: ' + size);
    }

    return util.setLengthRight(arg, 32);
  } else if (type.startsWith('uint')) {
    size = parseTypeN(type);

    if (size % 8 || size < 8 || size > 256) {
      throw new Error('Invalid uint<N> width: ' + size);
    }

    num = parseNumber(arg);

    if (num.bitLength() > size) {
      throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
    }

    if (num < 0) {
      throw new Error('Supplied uint is negative');
    }

    return num.toArrayLike(Buffer, 'be', 32);
  } else if (type.startsWith('int')) {
    size = parseTypeN(type);

    if (size % 8 || size < 8 || size > 256) {
      throw new Error('Invalid int<N> width: ' + size);
    }

    num = parseNumber(arg);

    if (num.bitLength() > size) {
      throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
    }

    return num.toTwos(256).toArrayLike(Buffer, 'be', 32);
  } else if (type.startsWith('ufixed')) {
    size = parseTypeNxM(type);
    num = parseNumber(arg);

    if (num < 0) {
      throw new Error('Supplied ufixed is negative');
    }

    return encodeSingle('uint256', num.mul(new BN(2).pow(new BN(size[1]))));
  } else if (type.startsWith('fixed')) {
    size = parseTypeNxM(type);
    return encodeSingle('int256', parseNumber(arg).mul(new BN(2).pow(new BN(size[1]))));
  }

  throw new Error('Unsupported or invalid type: ' + type);
} // Is a type dynamic?


function isDynamic(type) {
  // FIXME: handle all types? I don't think anything is missing now
  return type === 'string' || type === 'bytes' || parseTypeArray(type) === 'dynamic';
} // Is a type an array?


function isArray(type) {
  return type.lastIndexOf(']') === type.length - 1;
} // Encode a method/event with arguments
// @types an array of string type names
// @args  an array of the appropriate values


function rawEncode(types, values) {
  var output = [];
  var data = [];
  var headLength = 32 * types.length;

  for (var i in types) {
    var type = elementaryName(types[i]);
    var value = values[i];
    var cur = encodeSingle(type, value); // Use the head/tail method for storing dynamic data

    if (isDynamic(type)) {
      output.push(encodeSingle('uint256', headLength));
      data.push(cur);
      headLength += cur.length;
    } else {
      output.push(cur);
    }
  }

  return Buffer.concat(output.concat(data));
}

function solidityPack(types, values) {
  if (types.length !== values.length) {
    throw new Error('Number of types are not matching the values');
  }

  var size, num;
  var ret = [];

  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i]);
    var value = values[i];

    if (type === 'bytes') {
      ret.push(value);
    } else if (type === 'string') {
      ret.push(new Buffer(value, 'utf8'));
    } else if (type === 'bool') {
      ret.push(new Buffer(value ? '01' : '00', 'hex'));
    } else if (type === 'address') {
      ret.push(util.setLength(value, 20));
    } else if (type.startsWith('bytes')) {
      size = parseTypeN(type);

      if (size < 1 || size > 32) {
        throw new Error('Invalid bytes<N> width: ' + size);
      }

      ret.push(util.setLengthRight(value, size));
    } else if (type.startsWith('uint')) {
      size = parseTypeN(type);

      if (size % 8 || size < 8 || size > 256) {
        throw new Error('Invalid uint<N> width: ' + size);
      }

      num = parseNumber(value);

      if (num.bitLength() > size) {
        throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
      }

      ret.push(num.toArrayLike(Buffer, 'be', size / 8));
    } else if (type.startsWith('int')) {
      size = parseTypeN(type);

      if (size % 8 || size < 8 || size > 256) {
        throw new Error('Invalid int<N> width: ' + size);
      }

      num = parseNumber(value);

      if (num.bitLength() > size) {
        throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
      }

      ret.push(num.toTwos(size).toArrayLike(Buffer, 'be', size / 8));
    } else {
      // FIXME: support all other types
      throw new Error('Unsupported or invalid type: ' + type);
    }
  }

  return Buffer.concat(ret);
}

function soliditySHA3(types, values) {
  return util.keccak(solidityPack(types, values));
}

module.exports = {
  rawEncode: rawEncode,
  solidityPack: solidityPack,
  soliditySHA3: soliditySHA3
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9).Buffer))

/***/ }),

/***/ 1623:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _toConsumableArray = __webpack_require__(434);

var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterFromParam = exports.FilterPolyfill = void 0;

var types_1 = __webpack_require__(1479);

var util_1 = __webpack_require__(1399);

var TIMEOUT = 5 * 60 * 1000; // 5 minutes

var JSONRPC_TEMPLATE = {
  jsonrpc: "2.0",
  id: 0
};

var FilterPolyfill = /*#__PURE__*/function () {
  function FilterPolyfill(provider) {
    _classCallCheck(this, FilterPolyfill);

    this.logFilters = new Map(); // <id, filter>

    this.blockFilters = new Set(); // <id>

    this.pendingTransactionFilters = new Set(); // <id, true>

    this.cursors = new Map(); // <id, cursor>

    this.timeouts = new Map(); // <id, setTimeout id>

    this.nextFilterId = (0, types_1.IntNumber)(1);
    this.provider = provider;
  }

  _createClass(FilterPolyfill, [{
    key: "newFilter",
    value: function () {
      var _newFilter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(param) {
        var filter, id, cursor;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filter = filterFromParam(param);
                id = this.makeFilterId();
                _context.next = 4;
                return this.setInitialCursorPosition(id, filter.fromBlock);

              case 4:
                cursor = _context.sent;
                console.log("Installing new log filter(".concat(id, "):"), filter, "initial cursor position:", cursor);
                this.logFilters.set(id, filter);
                this.setFilterTimeout(id);
                return _context.abrupt("return", (0, util_1.hexStringFromIntNumber)(id));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function newFilter(_x) {
        return _newFilter.apply(this, arguments);
      }

      return newFilter;
    }()
  }, {
    key: "newBlockFilter",
    value: function () {
      var _newBlockFilter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var id, cursor;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = this.makeFilterId();
                _context2.next = 3;
                return this.setInitialCursorPosition(id, "latest");

              case 3:
                cursor = _context2.sent;
                console.log("Installing new block filter (".concat(id, ") with initial cursor position:"), cursor);
                this.blockFilters.add(id);
                this.setFilterTimeout(id);
                return _context2.abrupt("return", (0, util_1.hexStringFromIntNumber)(id));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function newBlockFilter() {
        return _newBlockFilter.apply(this, arguments);
      }

      return newBlockFilter;
    }()
  }, {
    key: "newPendingTransactionFilter",
    value: function () {
      var _newPendingTransactionFilter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var id, cursor;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = this.makeFilterId();
                _context3.next = 3;
                return this.setInitialCursorPosition(id, "latest");

              case 3:
                cursor = _context3.sent;
                console.log("Installing new block filter (".concat(id, ") with initial cursor position:"), cursor);
                this.pendingTransactionFilters.add(id);
                this.setFilterTimeout(id);
                return _context3.abrupt("return", (0, util_1.hexStringFromIntNumber)(id));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function newPendingTransactionFilter() {
        return _newPendingTransactionFilter.apply(this, arguments);
      }

      return newPendingTransactionFilter;
    }()
  }, {
    key: "uninstallFilter",
    value: function uninstallFilter(filterId) {
      var id = (0, util_1.intNumberFromHexString)(filterId);
      console.log("Uninstalling filter (".concat(id, ")"));
      this.deleteFilter(id);
      return true;
    }
  }, {
    key: "getFilterChanges",
    value: function getFilterChanges(filterId) {
      var id = (0, util_1.intNumberFromHexString)(filterId);

      if (this.timeouts.has(id)) {
        // extend timeout
        this.setFilterTimeout(id);
      }

      if (this.logFilters.has(id)) {
        return this.getLogFilterChanges(id);
      } else if (this.blockFilters.has(id)) {
        return this.getBlockFilterChanges(id);
      } else if (this.pendingTransactionFilters.has(id)) {
        return this.getPendingTransactionFilterChanges(id);
      }

      return Promise.resolve(filterNotFoundError());
    }
  }, {
    key: "getFilterLogs",
    value: function () {
      var _getFilterLogs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(filterId) {
        var id, filter;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = (0, util_1.intNumberFromHexString)(filterId);
                filter = this.logFilters.get(id);

                if (filter) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt("return", filterNotFoundError());

              case 4:
                return _context4.abrupt("return", this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
                  method: "eth_getLogs",
                  params: [paramFromFilter(filter)]
                })));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getFilterLogs(_x2) {
        return _getFilterLogs.apply(this, arguments);
      }

      return getFilterLogs;
    }()
  }, {
    key: "makeFilterId",
    value: function makeFilterId() {
      return (0, types_1.IntNumber)(++this.nextFilterId);
    }
  }, {
    key: "sendAsyncPromise",
    value: function sendAsyncPromise(request) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.provider.sendAsync(request, function (err, response) {
          if (err) {
            return reject(err);
          }

          if (Array.isArray(response) || response == null) {
            return reject(new Error("unexpected response received: ".concat(JSON.stringify(response))));
          }

          resolve(response);
        });
      });
    }
  }, {
    key: "deleteFilter",
    value: function deleteFilter(id) {
      console.log("Deleting filter (".concat(id, ")"));
      this.logFilters.delete(id);
      this.blockFilters.delete(id);
      this.pendingTransactionFilters.delete(id);
      this.cursors.delete(id);
      this.timeouts.delete(id);
    }
  }, {
    key: "getLogFilterChanges",
    value: function () {
      var _getLogFilterChanges = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(id) {
        var filter, cursorPosition, currentBlockHeight, toBlock, response, blocks, highestBlock, newCursorPosition;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                filter = this.logFilters.get(id);
                cursorPosition = this.cursors.get(id);

                if (!(!cursorPosition || !filter)) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt("return", filterNotFoundError());

              case 4:
                _context5.next = 6;
                return this.getCurrentBlockHeight();

              case 6:
                currentBlockHeight = _context5.sent;
                toBlock = filter.toBlock === "latest" ? currentBlockHeight : filter.toBlock;

                if (!(cursorPosition > currentBlockHeight)) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", emptyResult());

              case 10:
                if (!(cursorPosition > filter.toBlock)) {
                  _context5.next = 12;
                  break;
                }

                return _context5.abrupt("return", emptyResult());

              case 12:
                console.log("Fetching logs from ".concat(cursorPosition, " to ").concat(toBlock, " for filter ").concat(id));
                _context5.next = 15;
                return this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
                  method: "eth_getLogs",
                  params: [paramFromFilter(Object.assign(Object.assign({}, filter), {
                    fromBlock: cursorPosition,
                    toBlock: toBlock
                  }))]
                }));

              case 15:
                response = _context5.sent;

                if (Array.isArray(response.result)) {
                  blocks = response.result.map(function (log) {
                    return (0, util_1.intNumberFromHexString)(log.blockNumber || "0x0");
                  });
                  highestBlock = Math.max.apply(Math, _toConsumableArray(blocks));

                  if (highestBlock && highestBlock > cursorPosition) {
                    newCursorPosition = (0, types_1.IntNumber)(highestBlock + 1);
                    console.log("Moving cursor position for filter (".concat(id, ") from ").concat(cursorPosition, " to ").concat(newCursorPosition));
                    this.cursors.set(id, newCursorPosition);
                  }
                }

                return _context5.abrupt("return", response);

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getLogFilterChanges(_x3) {
        return _getLogFilterChanges.apply(this, arguments);
      }

      return getLogFilterChanges;
    }()
  }, {
    key: "getBlockFilterChanges",
    value: function () {
      var _getBlockFilterChanges = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(id) {
        var _this2 = this;

        var cursorPosition, currentBlockHeight, blocks, newCursorPosition;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                cursorPosition = this.cursors.get(id);

                if (cursorPosition) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", filterNotFoundError());

              case 3:
                _context6.next = 5;
                return this.getCurrentBlockHeight();

              case 5:
                currentBlockHeight = _context6.sent;

                if (!(cursorPosition > currentBlockHeight)) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", emptyResult());

              case 8:
                console.log("Fetching blocks from ".concat(cursorPosition, " to ").concat(currentBlockHeight, " for filter (").concat(id, ")"));
                _context6.next = 11;
                return Promise.all((0, util_1.range)(cursorPosition, currentBlockHeight + 1).map(function (i) {
                  return _this2.getBlockHashByNumber((0, types_1.IntNumber)(i));
                }));

              case 11:
                blocks = _context6.sent.filter(function (hash) {
                  return !!hash;
                });
                newCursorPosition = (0, types_1.IntNumber)(cursorPosition + blocks.length);
                console.log("Moving cursor position for filter (".concat(id, ") from ").concat(cursorPosition, " to ").concat(newCursorPosition));
                this.cursors.set(id, newCursorPosition);
                return _context6.abrupt("return", Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
                  result: blocks
                }));

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getBlockFilterChanges(_x4) {
        return _getBlockFilterChanges.apply(this, arguments);
      }

      return getBlockFilterChanges;
    }()
  }, {
    key: "getPendingTransactionFilterChanges",
    value: function () {
      var _getPendingTransactionFilterChanges = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(_id) {
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", Promise.resolve(emptyResult()));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getPendingTransactionFilterChanges(_x5) {
        return _getPendingTransactionFilterChanges.apply(this, arguments);
      }

      return getPendingTransactionFilterChanges;
    }()
  }, {
    key: "setInitialCursorPosition",
    value: function () {
      var _setInitialCursorPosition = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(id, startBlock) {
        var currentBlockHeight, initialCursorPosition;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.getCurrentBlockHeight();

              case 2:
                currentBlockHeight = _context8.sent;
                initialCursorPosition = typeof startBlock === "number" && startBlock > currentBlockHeight ? startBlock : currentBlockHeight;
                this.cursors.set(id, initialCursorPosition);
                return _context8.abrupt("return", initialCursorPosition);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setInitialCursorPosition(_x6, _x7) {
        return _setInitialCursorPosition.apply(this, arguments);
      }

      return setInitialCursorPosition;
    }()
  }, {
    key: "setFilterTimeout",
    value: function setFilterTimeout(id) {
      var _this3 = this;

      var existing = this.timeouts.get(id);

      if (existing) {
        window.clearTimeout(existing);
      }

      var timeout = window.setTimeout(function () {
        console.log("Filter (".concat(id, ") timed out"));

        _this3.deleteFilter(id);
      }, TIMEOUT);
      this.timeouts.set(id, timeout);
    }
  }, {
    key: "getCurrentBlockHeight",
    value: function () {
      var _getCurrentBlockHeight = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
        var _yield$this$sendAsync, result;

        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
                  method: "eth_blockNumber",
                  params: []
                }));

              case 2:
                _yield$this$sendAsync = _context9.sent;
                result = _yield$this$sendAsync.result;
                return _context9.abrupt("return", (0, util_1.intNumberFromHexString)((0, util_1.ensureHexString)(result)));

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getCurrentBlockHeight() {
        return _getCurrentBlockHeight.apply(this, arguments);
      }

      return getCurrentBlockHeight;
    }()
  }, {
    key: "getBlockHashByNumber",
    value: function () {
      var _getBlockHashByNumber = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(blockNumber) {
        var response;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
                  method: "eth_getBlockByNumber",
                  params: [(0, util_1.hexStringFromIntNumber)(blockNumber), false]
                }));

              case 2:
                response = _context10.sent;

                if (!(response.result && typeof response.result.hash === "string")) {
                  _context10.next = 5;
                  break;
                }

                return _context10.abrupt("return", (0, util_1.ensureHexString)(response.result.hash));

              case 5:
                return _context10.abrupt("return", null);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getBlockHashByNumber(_x8) {
        return _getBlockHashByNumber.apply(this, arguments);
      }

      return getBlockHashByNumber;
    }()
  }]);

  return FilterPolyfill;
}();

exports.FilterPolyfill = FilterPolyfill;

function filterFromParam(param) {
  return {
    fromBlock: intBlockHeightFromHexBlockHeight(param.fromBlock),
    toBlock: intBlockHeightFromHexBlockHeight(param.toBlock),
    addresses: param.address === undefined ? null : Array.isArray(param.address) ? param.address : [param.address],
    topics: param.topics || []
  };
}

exports.filterFromParam = filterFromParam;

function paramFromFilter(filter) {
  var param = {
    fromBlock: hexBlockHeightFromIntBlockHeight(filter.fromBlock),
    toBlock: hexBlockHeightFromIntBlockHeight(filter.toBlock),
    topics: filter.topics
  };

  if (filter.addresses !== null) {
    param.address = filter.addresses;
  }

  return param;
}

function intBlockHeightFromHexBlockHeight(value) {
  if (value === undefined || value === "latest" || value === "pending") {
    return "latest";
  } else if (value === "earliest") {
    return (0, types_1.IntNumber)(0);
  } else if ((0, util_1.isHexString)(value)) {
    return (0, util_1.intNumberFromHexString)(value);
  }

  throw new Error("Invalid block option: ".concat(value));
}

function hexBlockHeightFromIntBlockHeight(value) {
  if (value === "latest") {
    return value;
  }

  return (0, util_1.hexStringFromIntNumber)(value);
}

function filterNotFoundError() {
  return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
    error: {
      code: -32000,
      message: "filter not found"
    }
  });
}

function emptyResult() {
  return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
    result: []
  });
}

/***/ }),

/***/ 1624:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSONRPCMethod = void 0;
var JSONRPCMethod;

(function (JSONRPCMethod) {
  // synchronous or asynchronous
  JSONRPCMethod["eth_accounts"] = "eth_accounts";
  JSONRPCMethod["eth_coinbase"] = "eth_coinbase";
  JSONRPCMethod["net_version"] = "net_version";
  JSONRPCMethod["eth_chainId"] = "eth_chainId";
  JSONRPCMethod["eth_uninstallFilter"] = "eth_uninstallFilter"; // asynchronous only

  JSONRPCMethod["eth_requestAccounts"] = "eth_requestAccounts";
  JSONRPCMethod["eth_sign"] = "eth_sign";
  JSONRPCMethod["eth_ecRecover"] = "eth_ecRecover";
  JSONRPCMethod["personal_sign"] = "personal_sign";
  JSONRPCMethod["personal_ecRecover"] = "personal_ecRecover";
  JSONRPCMethod["eth_signTransaction"] = "eth_signTransaction";
  JSONRPCMethod["eth_sendRawTransaction"] = "eth_sendRawTransaction";
  JSONRPCMethod["eth_sendTransaction"] = "eth_sendTransaction";
  JSONRPCMethod["eth_signTypedData_v1"] = "eth_signTypedData_v1";
  JSONRPCMethod["eth_signTypedData_v2"] = "eth_signTypedData_v2";
  JSONRPCMethod["eth_signTypedData_v3"] = "eth_signTypedData_v3";
  JSONRPCMethod["eth_signTypedData_v4"] = "eth_signTypedData_v4";
  JSONRPCMethod["eth_signTypedData"] = "eth_signTypedData";
  JSONRPCMethod["walletlink_arbitrary"] = "walletlink_arbitrary";
  JSONRPCMethod["wallet_addEthereumChain"] = "wallet_addEthereumChain";
  JSONRPCMethod["wallet_switchEthereumChain"] = "wallet_switchEthereumChain"; // asynchronous pub/sub

  JSONRPCMethod["eth_subscribe"] = "eth_subscribe";
  JSONRPCMethod["eth_unsubscribe"] = "eth_unsubscribe"; // asynchronous filter methods

  JSONRPCMethod["eth_newFilter"] = "eth_newFilter";
  JSONRPCMethod["eth_newBlockFilter"] = "eth_newBlockFilter";
  JSONRPCMethod["eth_newPendingTransactionFilter"] = "eth_newPendingTransactionFilter";
  JSONRPCMethod["eth_getFilterChanges"] = "eth_getFilterChanges";
  JSONRPCMethod["eth_getFilterLogs"] = "eth_getFilterLogs";
})(JSONRPCMethod = exports.JSONRPCMethod || (exports.JSONRPCMethod = {}));

/***/ }),

/***/ 1625:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regeneratorRuntime = __webpack_require__(12);

var _asyncToGenerator = __webpack_require__(103);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionManager = void 0;

var PollingBlockTracker = __webpack_require__(686);

var createSubscriptionManager = __webpack_require__(1529);

var noop = function noop() {};

var SubscriptionManager = /*#__PURE__*/function () {
  function SubscriptionManager(provider) {
    _classCallCheck(this, SubscriptionManager);

    var blockTracker = new PollingBlockTracker({
      provider: provider,
      pollingInterval: 15 * 1000,
      setSkipCacheFlag: true
    });

    var _createSubscriptionMa = createSubscriptionManager({
      blockTracker: blockTracker,
      provider: provider
    }),
        events = _createSubscriptionMa.events,
        middleware = _createSubscriptionMa.middleware;

    this.events = events;
    this.subscriptionMiddleware = middleware;
  }

  _createClass(SubscriptionManager, [{
    key: "handleRequest",
    value: function () {
      var _handleRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(request) {
        var result;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = {};
                _context.next = 3;
                return this.subscriptionMiddleware(request, result, noop, noop);

              case 3:
                return _context.abrupt("return", result);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleRequest(_x) {
        return _handleRequest.apply(this, arguments);
      }

      return handleRequest;
    }()
  }, {
    key: "destroy",
    value: function destroy() {
      this.subscriptionMiddleware.destroy();
    }
  }]);

  return SubscriptionManager;
}();

exports.SubscriptionManager = SubscriptionManager;

/***/ }),

/***/ 1638:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopedLocalStorage = void 0;

var ScopedLocalStorage = /*#__PURE__*/function () {
  function ScopedLocalStorage(scope) {
    _classCallCheck(this, ScopedLocalStorage);

    this.scope = scope;
  }

  _createClass(ScopedLocalStorage, [{
    key: "setItem",
    value: function setItem(key, value) {
      localStorage.setItem(this.scopedKey(key), value);
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      return localStorage.getItem(this.scopedKey(key));
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      localStorage.removeItem(this.scopedKey(key));
    }
  }, {
    key: "clear",
    value: function clear() {
      var prefix = this.scopedKey("");
      var keysToRemove = [];

      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);

        if (typeof key === "string" && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(function (key) {
        return localStorage.removeItem(key);
      });
    }
  }, {
    key: "scopedKey",
    value: function scopedKey(key) {
      return "".concat(this.scope, ":").concat(key);
    }
  }]);

  return ScopedLocalStorage;
}();

exports.ScopedLocalStorage = ScopedLocalStorage;

/***/ }),

/***/ 1639:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var _inherits = __webpack_require__(149);

var _createSuper = __webpack_require__(150);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkSdkUI = void 0;

var LinkFlow_1 = __webpack_require__(1640);

var Snackbar_1 = __webpack_require__(1651);

var cssReset_1 = __webpack_require__(1653);

var WalletLinkUI_1 = __webpack_require__(1655);

var WalletLinkSdkUI = /*#__PURE__*/function (_WalletLinkUI_1$Walle) {
  _inherits(WalletLinkSdkUI, _WalletLinkUI_1$Walle);

  var _super = _createSuper(WalletLinkSdkUI);

  function WalletLinkSdkUI(options) {
    var _this;

    _classCallCheck(this, WalletLinkSdkUI);

    _this = _super.call(this, options);
    _this.attached = false;
    _this.snackbar = new Snackbar_1.Snackbar({
      darkMode: options.darkMode
    });
    _this.linkFlow = new LinkFlow_1.LinkFlow({
      darkMode: options.darkMode,
      version: options.version,
      sessionId: options.session.id,
      sessionSecret: options.session.secret,
      walletLinkUrl: options.walletLinkUrl,
      connected$: options.connected$,
      isParentConnection: false
    });
    return _this;
  }

  _createClass(WalletLinkSdkUI, [{
    key: "attach",
    value: function attach() {
      if (this.attached) {
        throw new Error("WalletLinkUI is already attached");
      }

      var el = document.documentElement;
      var container = document.createElement("div");
      container.className = "-walletlink-css-reset";
      el.appendChild(container);
      this.linkFlow.attach(container);
      this.snackbar.attach(container);
      this.attached = true;
      (0, cssReset_1.injectCssReset)();
    }
  }, {
    key: "setConnectDisabled",
    value: function setConnectDisabled(connectDisabled) {
      this.linkFlow.setConnectDisabled(connectDisabled);
    } // @ts-ignore

  }, {
    key: "switchEthereumChain",
    value: function switchEthereumChain(options) {// no-op
    }
  }, {
    key: "requestEthereumAccounts",
    value: function requestEthereumAccounts(options) {
      this.linkFlow.open({
        onCancel: options.onCancel
      });
    }
  }, {
    key: "hideRequestEthereumAccounts",
    value: function hideRequestEthereumAccounts() {
      this.linkFlow.close();
    }
  }, {
    key: "signEthereumMessage",
    value: function signEthereumMessage(_) {// No-op
    }
  }, {
    key: "signEthereumTransaction",
    value: function signEthereumTransaction(_) {// No-op
    }
  }, {
    key: "submitEthereumTransaction",
    value: function submitEthereumTransaction(_) {// No-op
    }
  }, {
    key: "ethereumAddressFromSignedMessage",
    value: function ethereumAddressFromSignedMessage(_) {// No-op
    }
  }, {
    key: "showConnecting",
    value: function showConnecting(options) {
      var snackbarProps = {
        message: "Confirm on phone",
        menuItems: [{
          isRed: true,
          info: "Cancel transaction",
          svgWidth: "11",
          svgHeight: "11",
          path: "M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z",
          defaultFillRule: "inherit",
          defaultClipRule: "inherit",
          onClick: options.onCancel
        }, {
          isRed: false,
          info: "Reset connection",
          svgWidth: "10",
          svgHeight: "11",
          path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
          defaultFillRule: "evenodd",
          defaultClipRule: "evenodd",
          onClick: options.onResetConnection
        }]
      };
      return this.snackbar.presentItem(snackbarProps);
    }
  }, {
    key: "reloadUI",
    value: function reloadUI() {
      document.location.reload();
    }
  }, {
    key: "inlineAccountsResponse",
    value: function inlineAccountsResponse() {
      return false;
    }
  }, {
    key: "inlineSwitchEthereumChain",
    value: function inlineSwitchEthereumChain() {
      return false;
    }
  }, {
    key: "isStandalone",
    value: function isStandalone() {
      return false;
    }
  }]);

  return WalletLinkSdkUI;
}(WalletLinkUI_1.WalletLinkUI);

exports.WalletLinkSdkUI = WalletLinkSdkUI;

/***/ }),

/***/ 1640:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkFlow = void 0;

var preact_1 = __webpack_require__(1400);

var rxjs_1 = __webpack_require__(1414);

var LinkDialog_1 = __webpack_require__(1641);

var operators_1 = __webpack_require__(1433);

var TryExtensionLinkDialog_1 = __webpack_require__(1645);

var LinkFlow = /*#__PURE__*/function () {
  function LinkFlow(options) {
    var _this = this;

    _classCallCheck(this, LinkFlow);

    this.extensionUI$ = new rxjs_1.BehaviorSubject({});
    this.subscriptions = new rxjs_1.Subscription();
    this.isConnected = false;
    this.isOpen = false;
    this.onCancel = null;
    this.root = null; // if true, hide QR code in LinkFlow (which happens if no jsonRpcUrl is provided)

    this.connectDisabled = false;
    this.darkMode = options.darkMode;
    this.version = options.version;
    this.sessionId = options.sessionId;
    this.sessionSecret = options.sessionSecret;
    this.walletLinkUrl = options.walletLinkUrl;
    this.isParentConnection = options.isParentConnection;
    this.connected$ = options.connected$; // Check if extension UI is enabled

    fetch("https://api.wallet.coinbase.com/rpc/v2/getFeatureFlags").then(function (res) {
      return res.json();
    }).then(function (json) {
      var enabled = json.result.desktop.extension_ui;

      if (typeof enabled === "undefined") {
        _this.extensionUI$.next({
          value: false
        });
      } else {
        _this.extensionUI$.next({
          value: enabled
        });
      }
    }).catch(function (err) {
      console.error("Couldn't fetch feature flags - ".concat(err));

      _this.extensionUI$.next({
        value: false
      });
    });
  }

  _createClass(LinkFlow, [{
    key: "attach",
    value: function attach(el) {
      var _this2 = this;

      this.root = document.createElement("div");
      this.root.className = "-walletlink-link-flow-root";
      el.appendChild(this.root);
      this.render();
      this.subscriptions.add(this.connected$.subscribe(function (v) {
        if (_this2.isConnected !== v) {
          _this2.isConnected = v;

          _this2.render();
        }
      }));
    }
  }, {
    key: "detach",
    value: function detach() {
      var _a;

      if (!this.root) {
        return;
      }

      this.subscriptions.unsubscribe();
      (0, preact_1.render)(null, this.root);
      (_a = this.root.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.root);
    }
  }, {
    key: "setConnectDisabled",
    value: function setConnectDisabled(connectDisabled) {
      this.connectDisabled = connectDisabled;
    }
  }, {
    key: "open",
    value: function open(options) {
      this.isOpen = true;
      this.onCancel = options.onCancel;
      this.render();
    }
  }, {
    key: "close",
    value: function close() {
      this.isOpen = false;
      this.onCancel = null;
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (!this.root) {
        return;
      }

      var subscription = this.extensionUI$.pipe((0, operators_1.first)(function (enabled) {
        return enabled.value !== undefined;
      })) // wait for a valid value before rendering
      .subscribe(function (enabled) {
        if (!_this3.root) {
          return;
        }

        (0, preact_1.render)(enabled.value ? (0, preact_1.h)(TryExtensionLinkDialog_1.TryExtensionLinkDialog, {
          darkMode: _this3.darkMode,
          version: _this3.version,
          sessionId: _this3.sessionId,
          sessionSecret: _this3.sessionSecret,
          walletLinkUrl: _this3.walletLinkUrl,
          isOpen: _this3.isOpen,
          isConnected: _this3.isConnected,
          isParentConnection: _this3.isParentConnection,
          onCancel: _this3.onCancel,
          connectDisabled: _this3.connectDisabled
        }) : (0, preact_1.h)(LinkDialog_1.LinkDialog, {
          darkMode: _this3.darkMode,
          version: _this3.version,
          sessionId: _this3.sessionId,
          sessionSecret: _this3.sessionSecret,
          walletLinkUrl: _this3.walletLinkUrl,
          isOpen: _this3.isOpen,
          isConnected: _this3.isConnected,
          isParentConnection: _this3.isParentConnection,
          onCancel: _this3.onCancel
        }), _this3.root);
      });
      this.subscriptions.add(subscription);
    }
  }]);

  return LinkFlow;
}();

exports.LinkFlow = LinkFlow;

/***/ }),

/***/ 1641:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _slicedToArray = __webpack_require__(138);

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkDialog = void 0;

var clsx_1 = __importDefault(__webpack_require__(1484));

var preact_1 = __webpack_require__(1400);

var hooks_1 = __webpack_require__(1448);

var LinkDialog_css_1 = __importDefault(__webpack_require__(1642));

var QRCode_1 = __webpack_require__(1537);

var Spinner_1 = __webpack_require__(1538);

var LinkDialog = function LinkDialog(props) {
  var _ref = (0, hooks_1.useState)(!props.isOpen),
      _ref2 = _slicedToArray(_ref, 2),
      isContainerHidden = _ref2[0],
      setContainerHidden = _ref2[1];

  var _ref3 = (0, hooks_1.useState)(!props.isOpen),
      _ref4 = _slicedToArray(_ref3, 2),
      isDialogHidden = _ref4[0],
      setDialogHidden = _ref4[1];

  (0, hooks_1.useEffect)(function () {
    var isOpen = props.isOpen;
    var timers = [window.setTimeout(function () {
      setDialogHidden(!isOpen);
    }, 10)];

    if (isOpen) {
      setContainerHidden(false);
    } else {
      timers.push(window.setTimeout(function () {
        setContainerHidden(true);
      }, 360));
    }

    return function () {
      timers.forEach(window.clearTimeout);
    };
  }, [props.isOpen]);
  return (0, preact_1.h)("div", {
    class: (0, clsx_1.default)("-walletlink-link-dialog-container", props.darkMode && "-walletlink-link-dialog-container-dark", isContainerHidden && "-walletlink-link-dialog-container-hidden")
  }, (0, preact_1.h)("style", null, LinkDialog_css_1.default), (0, preact_1.h)("div", {
    class: (0, clsx_1.default)("-walletlink-link-dialog-backdrop", isDialogHidden && "-walletlink-link-dialog-backdrop-hidden")
  }), (0, preact_1.h)("div", {
    class: "-walletlink-link-dialog"
  }, (0, preact_1.h)("div", {
    class: (0, clsx_1.default)("-walletlink-link-dialog-box", isDialogHidden && "-walletlink-link-dialog-box-hidden")
  }, (0, preact_1.h)(ScanQRCode, {
    darkMode: props.darkMode,
    version: props.version,
    sessionId: props.sessionId,
    sessionSecret: props.sessionSecret,
    walletLinkUrl: props.walletLinkUrl,
    isConnected: props.isConnected,
    isParentConnection: props.isParentConnection
  }), props.onCancel && (0, preact_1.h)(CancelButton, {
    onClick: props.onCancel
  }))));
};

exports.LinkDialog = LinkDialog;

var ScanQRCode = function ScanQRCode(props) {
  var serverUrl = window.encodeURIComponent(props.walletLinkUrl);
  var sessionIdKey = props.isParentConnection ? "parent-id" : "id";
  var qrUrl = "".concat(props.walletLinkUrl, "/#/link?").concat(sessionIdKey, "=").concat(props.sessionId, "&secret=").concat(props.sessionSecret, "&server=").concat(serverUrl, "&v=1");
  return (0, preact_1.h)("div", {
    class: "-walletlink-link-dialog-box-content"
  }, (0, preact_1.h)("h3", null, "Scan to", (0, preact_1.h)("br", null), " Connect"), (0, preact_1.h)("div", {
    class: "-walletlink-link-dialog-box-content-qrcode"
  }, (0, preact_1.h)("div", {
    class: "-walletlink-link-dialog-box-content-qrcode-wrapper"
  }, (0, preact_1.h)(QRCode_1.QRCode, {
    content: qrUrl,
    width: 224,
    height: 224,
    fgColor: "#000",
    bgColor: "transparent"
  })), (0, preact_1.h)("input", {
    type: "hidden",
    value: qrUrl
  }), !props.isConnected && (0, preact_1.h)("div", {
    class: "-walletlink-link-dialog-box-content-qrcode-connecting"
  }, (0, preact_1.h)(Spinner_1.Spinner, {
    size: 128,
    color: props.darkMode ? "#fff" : "#000"
  }), (0, preact_1.h)("p", null, "Connecting...")), (0, preact_1.h)("p", {
    title: "WalletLink v".concat(props.version)
  }, "Powered by WalletLink")), (0, preact_1.h)("a", {
    href: "".concat(props.walletLinkUrl, "/#/wallets"),
    target: "_blank",
    rel: "noopener"
  }, "Don\u2019t have a wallet app?"));
};

var CancelButton = function CancelButton(props) {
  return (0, preact_1.h)("button", {
    class: "-walletlink-link-dialog-box-cancel",
    onClick: props.onClick
  }, (0, preact_1.h)("div", {
    class: "-walletlink-link-dialog-box-cancel-x"
  }));
};

/***/ }),

/***/ 1642:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2021 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2021 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ".-walletlink-css-reset .-walletlink-link-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-walletlink-css-reset .-walletlink-link-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.33);transition:opacity .25s}.-walletlink-css-reset .-walletlink-link-dialog-backdrop-hidden{opacity:0}.-walletlink-css-reset .-walletlink-link-dialog-box{display:flex;position:relative;flex-direction:column;background-color:#f6f6f6;border-radius:16px;box-shadow:0px 16px 24px rgba(0,0,0,.1),0px 0px 8px rgba(0,0,0,.05);transform:scale(1);transition:opacity .25s,transform .25s;overflow:hidden}.-walletlink-css-reset .-walletlink-link-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-walletlink-css-reset .-walletlink-link-dialog-box-content{padding:24px;text-align:center}.-walletlink-css-reset .-walletlink-link-dialog-box-content h3{display:block;margin-bottom:24px;text-align:left;text-transform:uppercase;font-size:22px;font-weight:bold;line-height:1.2;color:#000}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode{position:relative;display:block;margin-bottom:24px;background-color:#f6f6f6;padding:16px;border-radius:16px;box-shadow:4px 4px 8px rgba(0,0,0,.15),-8px -8px 8px #fff;overflow:hidden}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-wrapper{display:block;width:232px;height:232px;padding:4px;border-radius:4px;background:#f4f4f4;margin-bottom:16px}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-wrapper img{display:block;width:224px;height:224px}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode>p{display:block;color:gray;font-weight:bold;font-size:12px;text-align:center}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-connecting{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(246,246,246,.98)}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-connecting p{margin-top:16px;color:#333;font-size:12px;font-weight:bold}.-walletlink-css-reset .-walletlink-link-dialog-box-content a{text-align:center;cursor:pointer;transition:color .1s;font-size:14px}.-walletlink-css-reset .-walletlink-link-dialog-box-content a,.-walletlink-css-reset .-walletlink-link-dialog-box-content a:link,.-walletlink-css-reset .-walletlink-link-dialog-box-content a:visited{color:#999}.-walletlink-css-reset .-walletlink-link-dialog-box-content a:hover,.-walletlink-css-reset .-walletlink-link-dialog-box-content a:active{color:#666;text-decoration:underline}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel{position:absolute;-webkit-appearance:none;display:flex;align-items:center;justify-content:center;top:24px;right:24px;width:24px;height:24px;border-radius:12px;background-color:#e7e7e7;cursor:pointer}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x{position:relative;display:block}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::after{content:\"\";position:absolute;display:block;top:-1px;left:-7px;width:14px;height:2px;background-color:#999;transition:background-color .2s}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::before{transform:rotate(45deg)}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::after{transform:rotate(135deg)}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x-a,.-walletlink-css-reset .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x-b{background-color:#000}.-walletlink-css-reset .-walletlink-link-dialog-container{display:block}.-walletlink-css-reset .-walletlink-link-dialog-container-hidden{display:none}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box{background-color:#2a2a2a}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content h3{color:#ccc}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode{background-color:#2a2a2a;box-shadow:4px 4px 8px rgba(0,0,0,.5),-8px -8px 8px #343434}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode>p{color:#999}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode-connecting{background:rgba(42,42,42,.98)}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode-connecting p{color:#ddd}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:link,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:visited{color:#888}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:hover,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:active{color:#aaa}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel{background-color:#333}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel-x::after{background-color:#aaa}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x::after{background-color:#eee}";

/***/ }),

/***/ 1643:
/***/ (function(module, exports) {

/**
 * @fileoverview
 * - modified davidshimjs/qrcodejs library for use in node.js
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 *
 * @version 0.9.1 (2016-02-12)
 * @author davidshimjs, papnkukn
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 * @see <a href="https://github.com/davidshimjs/qrcodejs" target="_blank">https://github.com/davidshimjs/qrcodejs</a>
 */
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
function QR8bitByte(data) {
  this.mode = QRMode.MODE_8BIT_BYTE;
  this.data = data;
  this.parsedData = []; // Added to support UTF-8 Characters

  for (var i = 0, l = this.data.length; i < l; i++) {
    var byteArray = [];
    var code = this.data.charCodeAt(i);

    if (code > 0x10000) {
      byteArray[0] = 0xF0 | (code & 0x1C0000) >>> 18;
      byteArray[1] = 0x80 | (code & 0x3F000) >>> 12;
      byteArray[2] = 0x80 | (code & 0xFC0) >>> 6;
      byteArray[3] = 0x80 | code & 0x3F;
    } else if (code > 0x800) {
      byteArray[0] = 0xE0 | (code & 0xF000) >>> 12;
      byteArray[1] = 0x80 | (code & 0xFC0) >>> 6;
      byteArray[2] = 0x80 | code & 0x3F;
    } else if (code > 0x80) {
      byteArray[0] = 0xC0 | (code & 0x7C0) >>> 6;
      byteArray[1] = 0x80 | code & 0x3F;
    } else {
      byteArray[0] = code;
    }

    this.parsedData.push(byteArray);
  }

  this.parsedData = Array.prototype.concat.apply([], this.parsedData);

  if (this.parsedData.length != this.data.length) {
    this.parsedData.unshift(191);
    this.parsedData.unshift(187);
    this.parsedData.unshift(239);
  }
}

QR8bitByte.prototype = {
  getLength: function getLength(buffer) {
    return this.parsedData.length;
  },
  write: function write(buffer) {
    for (var i = 0, l = this.parsedData.length; i < l; i++) {
      buffer.put(this.parsedData[i], 8);
    }
  }
};

function QRCodeModel(typeNumber, errorCorrectLevel) {
  this.typeNumber = typeNumber;
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null;
  this.moduleCount = 0;
  this.dataCache = null;
  this.dataList = [];
}

QRCodeModel.prototype = {
  addData: function addData(data) {
    var newData = new QR8bitByte(data);
    this.dataList.push(newData);
    this.dataCache = null;
  },
  isDark: function isDark(row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(row + "," + col);
    }

    return this.modules[row][col];
  },
  getModuleCount: function getModuleCount() {
    return this.moduleCount;
  },
  make: function make() {
    this.makeImpl(false, this.getBestMaskPattern());
  },
  makeImpl: function makeImpl(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);

    for (var row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);

      for (var col = 0; col < this.moduleCount; col++) {
        this.modules[row][col] = null;
      }
    }

    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test);
    }

    if (this.dataCache == null) {
      this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
    }

    this.mapData(this.dataCache, maskPattern);
  },
  setupPositionProbePattern: function setupPositionProbePattern(row, col) {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;

      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;

        if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  getBestMaskPattern: function getBestMaskPattern() {
    var minLostPoint = 0;
    var pattern = 0;

    for (var i = 0; i < 8; i++) {
      this.makeImpl(true, i);
      var lostPoint = QRUtil.getLostPoint(this);

      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }

    return pattern;
  },
  createMovieClip: function createMovieClip(target_mc, instance_name, depth) {
    var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
    var cs = 1;
    this.make();

    for (var row = 0; row < this.modules.length; row++) {
      var y = row * cs;

      for (var col = 0; col < this.modules[row].length; col++) {
        var x = col * cs;
        var dark = this.modules[row][col];

        if (dark) {
          qr_mc.beginFill(0, 100);
          qr_mc.moveTo(x, y);
          qr_mc.lineTo(x + cs, y);
          qr_mc.lineTo(x + cs, y + cs);
          qr_mc.lineTo(x, y + cs);
          qr_mc.endFill();
        }
      }
    }

    return qr_mc;
  },
  setupTimingPattern: function setupTimingPattern() {
    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }

      this.modules[r][6] = r % 2 == 0;
    }

    for (var c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] != null) {
        continue;
      }

      this.modules[6][c] = c % 2 == 0;
    }
  },
  setupPositionAdjustPattern: function setupPositionAdjustPattern() {
    var pos = QRUtil.getPatternPosition(this.typeNumber);

    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];

        if (this.modules[row][col] != null) {
          continue;
        }

        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  setupTypeNumber: function setupTypeNumber(test) {
    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
    }

    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  setupTypeInfo: function setupTypeInfo(test, maskPattern) {
    var data = this.errorCorrectLevel << 3 | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);

    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;

      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
    }

    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;

      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }

    this.modules[this.moduleCount - 8][8] = !test;
  },
  mapData: function mapData(data, maskPattern) {
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;

    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;

      while (true) {
        for (var c = 0; c < 2; c++) {
          if (this.modules[row][col - c] == null) {
            var dark = false;

            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }

            var mask = QRUtil.getMask(maskPattern, row, col - c);

            if (mask) {
              dark = !dark;
            }

            this.modules[row][col - c] = dark;
            bitIndex--;

            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }

        row += inc;

        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
};
QRCodeModel.PAD0 = 0xEC;
QRCodeModel.PAD1 = 0x11;

QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
  var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
  var buffer = new QRBitBuffer();

  for (var i = 0; i < dataList.length; i++) {
    var data = dataList[i];
    buffer.put(data.mode, 4);
    buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
    data.write(buffer);
  }

  var totalDataCount = 0;

  for (var i = 0; i < rsBlocks.length; i++) {
    totalDataCount += rsBlocks[i].dataCount;
  }

  if (buffer.getLengthInBits() > totalDataCount * 8) {
    throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
  }

  if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
    buffer.put(0, 4);
  }

  while (buffer.getLengthInBits() % 8 != 0) {
    buffer.putBit(false);
  }

  while (true) {
    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }

    buffer.put(QRCodeModel.PAD0, 8);

    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }

    buffer.put(QRCodeModel.PAD1, 8);
  }

  return QRCodeModel.createBytes(buffer, rsBlocks);
};

QRCodeModel.createBytes = function (buffer, rsBlocks) {
  var offset = 0;
  var maxDcCount = 0;
  var maxEcCount = 0;
  var dcdata = new Array(rsBlocks.length);
  var ecdata = new Array(rsBlocks.length);

  for (var r = 0; r < rsBlocks.length; r++) {
    var dcCount = rsBlocks[r].dataCount;
    var ecCount = rsBlocks[r].totalCount - dcCount;
    maxDcCount = Math.max(maxDcCount, dcCount);
    maxEcCount = Math.max(maxEcCount, ecCount);
    dcdata[r] = new Array(dcCount);

    for (var i = 0; i < dcdata[r].length; i++) {
      dcdata[r][i] = 0xff & buffer.buffer[i + offset];
    }

    offset += dcCount;
    var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
    var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
    var modPoly = rawPoly.mod(rsPoly);
    ecdata[r] = new Array(rsPoly.getLength() - 1);

    for (var i = 0; i < ecdata[r].length; i++) {
      var modIndex = i + modPoly.getLength() - ecdata[r].length;
      ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
    }
  }

  var totalCodeCount = 0;

  for (var i = 0; i < rsBlocks.length; i++) {
    totalCodeCount += rsBlocks[i].totalCount;
  }

  var data = new Array(totalCodeCount);
  var index = 0;

  for (var i = 0; i < maxDcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < dcdata[r].length) {
        data[index++] = dcdata[r][i];
      }
    }
  }

  for (var i = 0; i < maxEcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < ecdata[r].length) {
        data[index++] = ecdata[r][i];
      }
    }
  }

  return data;
};

var QRMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
};
var QRErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
var QRUtil = {
  PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  getBCHTypeInfo: function getBCHTypeInfo(data) {
    var d = data << 10;

    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
    }

    return (data << 10 | d) ^ QRUtil.G15_MASK;
  },
  getBCHTypeNumber: function getBCHTypeNumber(data) {
    var d = data << 12;

    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
    }

    return data << 12 | d;
  },
  getBCHDigit: function getBCHDigit(data) {
    var digit = 0;

    while (data != 0) {
      digit++;
      data >>>= 1;
    }

    return digit;
  },
  getPatternPosition: function getPatternPosition(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  getMask: function getMask(maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;

      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;

      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;

      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;

      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;

      case QRMaskPattern.PATTERN101:
        return i * j % 2 + i * j % 3 == 0;

      case QRMaskPattern.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 == 0;

      case QRMaskPattern.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 == 0;

      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
    var a = new QRPolynomial([1], 0);

    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }

    return a;
  },
  getLengthInBits: function getLengthInBits(mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10;

        case QRMode.MODE_ALPHA_NUM:
          return 9;

        case QRMode.MODE_8BIT_BYTE:
          return 8;

        case QRMode.MODE_KANJI:
          return 8;

        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 27) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12;

        case QRMode.MODE_ALPHA_NUM:
          return 11;

        case QRMode.MODE_8BIT_BYTE:
          return 16;

        case QRMode.MODE_KANJI:
          return 10;

        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 41) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14;

        case QRMode.MODE_ALPHA_NUM:
          return 13;

        case QRMode.MODE_8BIT_BYTE:
          return 16;

        case QRMode.MODE_KANJI:
          return 12;

        default:
          throw new Error("mode:" + mode);
      }
    } else {
      throw new Error("type:" + type);
    }
  },
  getLostPoint: function getLostPoint(qrCode) {
    var moduleCount = qrCode.getModuleCount();
    var lostPoint = 0;

    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var dark = qrCode.isDark(row, col);

        for (var r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }

          for (var c = -1; c <= 1; c++) {
            if (col + c < 0 || moduleCount <= col + c) {
              continue;
            }

            if (r == 0 && c == 0) {
              continue;
            }

            if (dark == qrCode.isDark(row + r, col + c)) {
              sameCount++;
            }
          }
        }

        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    }

    for (var row = 0; row < moduleCount - 1; row++) {
      for (var col = 0; col < moduleCount - 1; col++) {
        var count = 0;
        if (qrCode.isDark(row, col)) count++;
        if (qrCode.isDark(row + 1, col)) count++;
        if (qrCode.isDark(row, col + 1)) count++;
        if (qrCode.isDark(row + 1, col + 1)) count++;

        if (count == 0 || count == 4) {
          lostPoint += 3;
        }
      }
    }

    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount - 6; col++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
          lostPoint += 40;
        }
      }
    }

    for (var col = 0; col < moduleCount; col++) {
      for (var row = 0; row < moduleCount - 6; row++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
          lostPoint += 40;
        }
      }
    }

    var darkCount = 0;

    for (var col = 0; col < moduleCount; col++) {
      for (var row = 0; row < moduleCount; row++) {
        if (qrCode.isDark(row, col)) {
          darkCount++;
        }
      }
    }

    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  }
};
var QRMath = {
  glog: function glog(n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }

    return QRMath.LOG_TABLE[n];
  },
  gexp: function gexp(n) {
    while (n < 0) {
      n += 255;
    }

    while (n >= 256) {
      n -= 255;
    }

    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};

for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}

for (var i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}

for (var i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}

function QRPolynomial(num, shift) {
  if (num.length == undefined) {
    throw new Error(num.length + "/" + shift);
  }

  var offset = 0;

  while (offset < num.length && num[offset] == 0) {
    offset++;
  }

  this.num = new Array(num.length - offset + shift);

  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}

QRPolynomial.prototype = {
  get: function get(index) {
    return this.num[index];
  },
  getLength: function getLength() {
    return this.num.length;
  },
  multiply: function multiply(e) {
    var num = new Array(this.getLength() + e.getLength() - 1);

    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }

    return new QRPolynomial(num, 0);
  },
  mod: function mod(e) {
    if (this.getLength() - e.getLength() < 0) {
      return this;
    }

    var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
    var num = new Array(this.getLength());

    for (var i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i);
    }

    for (var i = 0; i < e.getLength(); i++) {
      num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
    }

    return new QRPolynomial(num, 0).mod(e);
  }
};

function QRRSBlock(totalCount, dataCount) {
  this.totalCount = totalCount;
  this.dataCount = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];

QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
  var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

  if (rsBlock == undefined) {
    throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
  }

  var length = rsBlock.length / 3;
  var list = [];

  for (var i = 0; i < length; i++) {
    var count = rsBlock[i * 3 + 0];
    var totalCount = rsBlock[i * 3 + 1];
    var dataCount = rsBlock[i * 3 + 2];

    for (var j = 0; j < count; j++) {
      list.push(new QRRSBlock(totalCount, dataCount));
    }
  }

  return list;
};

QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
  switch (errorCorrectLevel) {
    case QRErrorCorrectLevel.L:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];

    case QRErrorCorrectLevel.M:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];

    case QRErrorCorrectLevel.Q:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];

    case QRErrorCorrectLevel.H:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];

    default:
      return undefined;
  }
};

function QRBitBuffer() {
  this.buffer = [];
  this.length = 0;
}

QRBitBuffer.prototype = {
  get: function get(index) {
    var bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
  },
  put: function put(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) == 1);
    }
  },
  getLengthInBits: function getLengthInBits() {
    return this.length;
  },
  putBit: function putBit(bit) {
    var bufIndex = Math.floor(this.length / 8);

    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }

    this.length++;
  }
};
var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
/** Constructor */

function QRCode(options) {
  var instance = this; //Default options

  this.options = {
    padding: 4,
    width: 256,
    height: 256,
    typeNumber: 4,
    color: "#000000",
    background: "#ffffff",
    ecl: "M",
    image: {
      svg: "",
      width: 0,
      height: 0
    }
  }; //In case the options is string

  if (typeof options === 'string') {
    options = {
      content: options
    };
  } //Merge options


  if (options) {
    for (var i in options) {
      this.options[i] = options[i];
    }
  }

  if (typeof this.options.content !== 'string') {
    throw new Error("Expected 'content' as string!");
  }

  if (this.options.content.length === 0
  /* || this.options.content.length > 7089 */
  ) {
    throw new Error("Expected 'content' to be non-empty!");
  }

  if (!(this.options.padding >= 0)) {
    throw new Error("Expected 'padding' value to be non-negative!");
  }

  if (!(this.options.width > 0) || !(this.options.height > 0)) {
    throw new Error("Expected 'width' or 'height' value to be higher than zero!");
  } //Gets the error correction level


  function _getErrorCorrectLevel(ecl) {
    switch (ecl) {
      case "L":
        return QRErrorCorrectLevel.L;

      case "M":
        return QRErrorCorrectLevel.M;

      case "Q":
        return QRErrorCorrectLevel.Q;

      case "H":
        return QRErrorCorrectLevel.H;

      default:
        throw new Error("Unknwon error correction level: " + ecl);
    }
  } //Get type number


  function _getTypeNumber(content, ecl) {
    var length = _getUTF8Length(content);

    var type = 1;
    var limit = 0;

    for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
      var table = QRCodeLimitLength[i];

      if (!table) {
        throw new Error("Content too long: expected " + limit + " but got " + length);
      }

      switch (ecl) {
        case "L":
          limit = table[0];
          break;

        case "M":
          limit = table[1];
          break;

        case "Q":
          limit = table[2];
          break;

        case "H":
          limit = table[3];
          break;

        default:
          throw new Error("Unknwon error correction level: " + ecl);
      }

      if (length <= limit) {
        break;
      }

      type++;
    }

    if (type > QRCodeLimitLength.length) {
      throw new Error("Content too long");
    }

    return type;
  } //Gets text length


  function _getUTF8Length(content) {
    var result = encodeURI(content).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
    return result.length + (result.length != content ? 3 : 0);
  } //Generate QR Code matrix


  var content = this.options.content;

  var type = _getTypeNumber(content, this.options.ecl);

  var ecl = _getErrorCorrectLevel(this.options.ecl);

  this.qrcode = new QRCodeModel(type, ecl);
  this.qrcode.addData(content);
  this.qrcode.make();
}
/** Generates QR Code as SVG image */


QRCode.prototype.svg = function (opt) {
  var options = this.options || {};
  var modules = this.qrcode.modules;

  if (typeof opt == "undefined") {
    opt = {
      container: options.container || "svg"
    };
  } //Apply new lines and indents in SVG?


  var pretty = typeof options.pretty != "undefined" ? !!options.pretty : true;
  var indent = pretty ? '  ' : '';
  var EOL = pretty ? '\r\n' : '';
  var width = options.width;
  var height = options.height;
  var length = modules.length;
  var xsize = width / (length + 2 * options.padding);
  var ysize = height / (length + 2 * options.padding); //Join (union, merge) rectangles into one shape?

  var join = typeof options.join != "undefined" ? !!options.join : false; //Swap the X and Y modules, pull request #2

  var swap = typeof options.swap != "undefined" ? !!options.swap : false; //Apply <?xml...?> declaration in SVG?

  var xmlDeclaration = typeof options.xmlDeclaration != "undefined" ? !!options.xmlDeclaration : true; //Populate with predefined shape instead of "rect" elements, thanks to @kkocdko

  var predefined = typeof options.predefined != "undefined" ? !!options.predefined : false;
  var defs = predefined ? indent + '<defs><path id="qrmodule" d="M0 0 h' + ysize + ' v' + xsize + ' H0 z" style="fill:' + options.color + ';shape-rendering:crispEdges;" /></defs>' + EOL : ''; //Background rectangle

  var bgrect = indent + '<rect x="0" y="0" width="' + width + '" height="' + height + '" style="fill:' + options.background + ';shape-rendering:crispEdges;"/>' + EOL; //Rectangles representing modules

  var modrect = '';
  var pathdata = '';

  for (var y = 0; y < length; y++) {
    for (var x = 0; x < length; x++) {
      var module = modules[x][y];

      if (module) {
        var px = x * xsize + options.padding * xsize;
        var py = y * ysize + options.padding * ysize; //Some users have had issues with the QR Code, thanks to @danioso for the solution

        if (swap) {
          var t = px;
          px = py;
          py = t;
        }

        if (join) {
          //Module as a part of svg path data, thanks to @danioso
          var w = xsize + px;
          var h = ysize + py;
          px = Number.isInteger(px) ? Number(px) : px.toFixed(2);
          py = Number.isInteger(py) ? Number(py) : py.toFixed(2);
          w = Number.isInteger(w) ? Number(w) : w.toFixed(2);
          h = Number.isInteger(h) ? Number(h) : h.toFixed(2);
          pathdata += 'M' + px + ',' + py + ' V' + h + ' H' + w + ' V' + py + ' H' + px + ' Z ';
        } else if (predefined) {
          //Module as a predefined shape, thanks to @kkocdko
          modrect += indent + '<use x="' + px.toString() + '" y="' + py.toString() + '" href="#qrmodule" />' + EOL;
        } else {
          //Module as rectangle element
          modrect += indent + '<rect x="' + px.toString() + '" y="' + py.toString() + '" width="' + xsize + '" height="' + ysize + '" style="fill:' + options.color + ';shape-rendering:crispEdges;"/>' + EOL;
        }
      }
    }
  }

  if (join) {
    modrect = indent + '<path x="0" y="0" style="fill:' + options.color + ';shape-rendering:crispEdges;" d="' + pathdata + '" />';
  }

  var imgSvg = "";

  if (this.options.image !== undefined && this.options.image.svg) {
    var imgWidth = width * this.options.image.width / 100;
    var imgHeight = height * this.options.image.height / 100;
    var imgX = width / 2 - imgWidth / 2;
    var imgY = height / 2 - imgHeight / 2;
    imgSvg += "<svg x=\"".concat(imgX, "\" y=\"").concat(imgY, "\" width=\"").concat(imgWidth, "\" height=\"").concat(imgHeight, "\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMinYMin meet\">");
    imgSvg += this.options.image.svg + EOL;
    imgSvg += '</svg>';
  }

  var svg = "";

  switch (opt.container) {
    //Wrapped in SVG document
    case "svg":
      if (xmlDeclaration) {
        svg += '<?xml version="1.0" standalone="yes"?>' + EOL;
      }

      svg += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + width + '" height="' + height + '">' + EOL;
      svg += defs + bgrect + modrect;
      svg += imgSvg;
      svg += '</svg>';
      break;
    //Viewbox for responsive use in a browser, thanks to @danioso

    case "svg-viewbox":
      if (xmlDeclaration) {
        svg += '<?xml version="1.0" standalone="yes"?>' + EOL;
      }

      svg += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + width + ' ' + height + '">' + EOL;
      svg += defs + bgrect + modrect;
      svg += imgSvg;
      svg += '</svg>';
      break;
    //Wrapped in group element

    case "g":
      svg += '<g width="' + width + '" height="' + height + '">' + EOL;
      svg += defs + bgrect + modrect;
      svg += imgSvg;
      svg += '</g>';
      break;
    //Without a container

    default:
      svg += (defs + bgrect + modrect + imgSvg).replace(/^\s+/, ""); //Clear indents on each line

      break;
  }

  return svg;
};

module.exports = QRCode;

/***/ }),

/***/ 1644:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2021 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2021 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ".-walletlink-css-reset .-walletlink-spinner{display:inline-block}.-walletlink-css-reset .-walletlink-spinner svg{display:inline-block;animation:2s linear infinite -walletlink-spinner-svg}.-walletlink-css-reset .-walletlink-spinner svg circle{animation:1.9s ease-in-out infinite both -walletlink-spinner-circle;display:block;fill:transparent;stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -walletlink-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -walletlink-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}";

/***/ }),

/***/ 1645:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__(138);

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TryExtensionLinkDialog = void 0;

var clsx_1 = __importDefault(__webpack_require__(1484));

var preact_1 = __webpack_require__(1400);

var hooks_1 = __webpack_require__(1448);

var globe_icon_svg_1 = __importDefault(__webpack_require__(1646));

var link_icon_svg_1 = __importDefault(__webpack_require__(1647));

var lock_icon_svg_1 = __importDefault(__webpack_require__(1648));

var QRLogo_1 = __importDefault(__webpack_require__(1649));

var QRCode_1 = __webpack_require__(1537);

var Spinner_1 = __webpack_require__(1538);

var TryExtensionLinkDialog_css_1 = __importDefault(__webpack_require__(1650));

var TryExtensionLinkDialog = function TryExtensionLinkDialog(props) {
  var _ref = (0, hooks_1.useState)(!props.isOpen),
      _ref2 = _slicedToArray(_ref, 2),
      isContainerHidden = _ref2[0],
      setContainerHidden = _ref2[1];

  var _ref3 = (0, hooks_1.useState)(!props.isOpen),
      _ref4 = _slicedToArray(_ref3, 2),
      isDialogHidden = _ref4[0],
      setDialogHidden = _ref4[1];

  (0, hooks_1.useEffect)(function () {
    var isOpen = props.isOpen;
    var timers = [window.setTimeout(function () {
      setDialogHidden(!isOpen);
    }, 10)];

    if (isOpen) {
      setContainerHidden(false);
    } else {
      timers.push(window.setTimeout(function () {
        setContainerHidden(true);
      }, 360));
    }

    return function () {
      timers.forEach(window.clearTimeout);
    };
  }, [props.isOpen]);
  return (0, preact_1.h)("div", {
    class: (0, clsx_1.default)("-walletlink-extension-dialog-container", isContainerHidden && "-walletlink-extension-dialog-container-hidden")
  }, (0, preact_1.h)("style", null, TryExtensionLinkDialog_css_1.default), (0, preact_1.h)("div", {
    class: (0, clsx_1.default)("-walletlink-extension-dialog-backdrop", isDialogHidden && "-walletlink-extension-dialog-backdrop-hidden")
  }), (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog"
  }, (0, preact_1.h)("div", {
    class: (0, clsx_1.default)("-walletlink-extension-dialog-box", isDialogHidden && "-walletlink-extension-dialog-box-hidden")
  }, (0, preact_1.h)(TryExtensionBox, {
    onInstallClick: function onInstallClick() {
      window.open("https://api.wallet.coinbase.com/rpc/v2/desktop/chrome", "_blank");
    }
  }), !props.connectDisabled ? (0, preact_1.h)(ScanQRBox, {
    darkMode: props.darkMode,
    version: props.version,
    sessionId: props.sessionId,
    sessionSecret: props.sessionSecret,
    walletLinkUrl: props.walletLinkUrl,
    isConnected: props.isConnected,
    isParentConnection: props.isParentConnection
  }) : null, props.onCancel && (0, preact_1.h)(CancelButton, {
    onClick: props.onCancel
  }))));
};

exports.TryExtensionLinkDialog = TryExtensionLinkDialog;

var TryExtensionBox = function TryExtensionBox(props) {
  return (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-top"
  }, (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-top-install-region"
  }, (0, preact_1.h)("h2", null, "Try the Coinbase Wallet extension"), (0, preact_1.h)("button", {
    onClick: props.onInstallClick
  }, "Install")), (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-top-info-region"
  }, (0, preact_1.h)(DescriptionItem, {
    icon: link_icon_svg_1.default,
    text: "Connect to crypto apps with one click"
  }), (0, preact_1.h)(DescriptionItem, {
    icon: lock_icon_svg_1.default,
    text: "Your private key is stored securely"
  }), (0, preact_1.h)(DescriptionItem, {
    icon: globe_icon_svg_1.default,
    text: "Works with Ethereum, Polygon, and more"
  })));
};

var ScanQRBox = function ScanQRBox(props) {
  var serverUrl = window.encodeURIComponent(props.walletLinkUrl);
  var sessionIdKey = props.isParentConnection ? "parent-id" : "id";
  var qrUrl = "".concat(props.walletLinkUrl, "/#/link?").concat(sessionIdKey, "=").concat(props.sessionId, "&secret=").concat(props.sessionSecret, "&server=").concat(serverUrl, "&v=1");
  return (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-bottom"
  }, (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-bottom-description-region"
  }, (0, preact_1.h)("h2", null, "Or scan to connect"), (0, preact_1.h)("body", {
    class: "-walletlink-extension-dialog-box-bottom-description"
  }, "Open ", (0, preact_1.h)("a", {
    href: "https://wallet.coinbase.com/"
  }, "Coinbase Wallet"), " on your mobile phone and scan")), (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-bottom-qr-region"
  }, (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-bottom-qr-wrapper"
  }, (0, preact_1.h)(QRCode_1.QRCode, {
    content: qrUrl,
    width: 150,
    height: 150,
    fgColor: "#000",
    bgColor: "transparent",
    image: {
      svg: QRLogo_1.default,
      width: 34,
      height: 34
    }
  })), (0, preact_1.h)("input", {
    type: "hidden",
    value: qrUrl
  }), !props.isConnected && (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-bottom-qr-connecting"
  }, (0, preact_1.h)(Spinner_1.Spinner, {
    size: 36,
    color: "#000"
  }), (0, preact_1.h)("p", null, "Connecting..."))));
};

var DescriptionItem = function DescriptionItem(props) {
  return (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-top-description"
  }, (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-top-description-icon-wrapper"
  }, (0, preact_1.h)("img", {
    src: props.icon
  })), (0, preact_1.h)("body", {
    class: "-walletlink-extension-dialog-box-top-description-text"
  }, props.text));
};

var CancelButton = function CancelButton(props) {
  return (0, preact_1.h)("button", {
    class: "-walletlink-extension-dialog-box-cancel",
    onClick: props.onClick
  }, (0, preact_1.h)("div", {
    class: "-walletlink-extension-dialog-box-cancel-x"
  }));
};

/***/ }),

/***/ 1646:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2021 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2021 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggMEMzLjU4IDAgMCAzLjU4IDAgOHMzLjU4IDggOCA4IDgtMy41OCA4LTgtMy41OC04LTgtOFptNS45MSA3aC0xLjk0Yy0uMS0xLjU3LS40Mi0zLS45MS00LjE1IDEuNDguODggMi41NSAyLjM4IDIuODUgNC4xNVpNOCAxNGMtLjQ1IDAtMS43Mi0xLjc3LTEuOTUtNWgzLjljLS4yMyAzLjIzLTEuNSA1LTEuOTUgNVpNNi4wNSA3QzYuMjggMy43NyA3LjU1IDIgOCAyYy40NSAwIDEuNzIgMS43NyAxLjk1IDVoLTMuOVpNNC45NCAyLjg1QzQuNDYgNCA0LjEzIDUuNDMgNC4wMyA3SDIuMDljLjMtMS43NyAxLjM3LTMuMjcgMi44NS00LjE1Wk0yLjA5IDloMS45NGMuMSAxLjU3LjQyIDMgLjkxIDQuMTVBNS45OTggNS45OTggMCAwIDEgMi4wOSA5Wm04Ljk3IDQuMTVjLjQ4LTEuMTUuODEtMi41OC45MS00LjE1aDEuOTRhNS45OTggNS45OTggMCAwIDEtMi44NSA0LjE1WiIgZmlsbD0iIzE2NTJGMCIvPjwvc3ZnPg==";

/***/ }),

/***/ 1647:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2021 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2021 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1LjYzNSAyLjExN2EzLjg4OSAzLjg4OSAwIDAgMC01LjUyMSAwTDYuODkgNS4zMzVBMy44OTQgMy44OTQgMCAwIDAgNS44IDguNzM5Yy4wODMuNTA2LjI2OCAxLjAxMS41NTMgMS40NjYuMTUxLjI1My4zMzYuNDcyLjUzNy42OTFsLjYyMS42MjQgMS4xNDEtMS4xNDYtLjYyLS42MjRhMi4xMDUgMi4xMDUgMCAwIDEtLjQ4Ny0uNzQxIDIuMzQgMi4zNCAwIDAgMSAuNTAzLTIuNTFsMy4yMDYtMy4yMmEyLjI5MyAyLjI5MyAwIDAgMSAzLjIzOSAwYy44OS44OTQuODkgMi4zNDMgMCAzLjI1M2wtMS41MjcgMS41MzNjLjIzNC42NC4zMzUgMS4zMzEuMzAyIDIuMDA1bDIuMzgzLTIuMzkyYzEuNTEtMS41MzQgMS40OTMtNC4wMjgtLjAxNy01LjU2MVoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBkPSJNMTEuMjcxIDcuNzQ1YTMuMTMgMy4xMyAwIDAgMC0uNTU0LS42OWwtLjYyLS42MjQtMS4xNDIgMS4xNDYuNjIxLjYyM2MuMjE4LjIyLjM4Ni40ODkuNDg3Ljc1OC4zMzUuODI2LjE2NyAxLjgyLS41MDQgMi40OTRsLTMuMjA1IDMuMjE5YTIuMjkzIDIuMjkzIDAgMCAxLTMuMjQgMCAyLjMxNiAyLjMxNiAwIDAgMSAwLTMuMjUybDEuNTI4LTEuNTM0YTQuODE1IDQuODE1IDAgMCAxLS4yODUtMi4wMDVsLTIuMzgzIDIuMzkzYTMuOTI3IDMuOTI3IDAgMCAwIDAgNS41NDQgMy45MDkgMy45MDkgMCAwIDAgNS41MzggMGwzLjIwNS0zLjIxOWEzLjk1OCAzLjk1OCAwIDAgMCAxLjA5MS0zLjQwNCA0LjIxMSA0LjIxMSAwIDAgMC0uNTM3LTEuNDQ5WiIgZmlsbD0iIzE2NTJGMCIvPjwvc3ZnPg==";

/***/ }),

/***/ 1648:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2021 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2021 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgN3Y5aDE0VjdIMVptNy41IDQuMzlWMTRoLTF2LTIuNjFjLS40NC0uMTktLjc1LS42My0uNzUtMS4xNGExLjI1IDEuMjUgMCAwIDEgMi41IDBjMCAuNTEtLjMxLjk1LS43NSAxLjE0Wk01LjY3IDZWNC4zM0M1LjY3IDMuMDUgNi43MSAyIDggMnMyLjMzIDEuMDUgMi4zMyAyLjMzVjZoMlY0LjMzQzEyLjMzIDEuOTQgMTAuMzkgMCA4IDBTMy42NyAxLjk0IDMuNjcgNC4zM1Y2aDJaIiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+";

/***/ }),

/***/ 1649:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"white\"/>\n<circle cx=\"49.9996\" cy=\"49.9996\" r=\"43.6363\" fill=\"#1B53E4\"/>\n<circle cx=\"49.9996\" cy=\"49.9996\" r=\"43.6363\" stroke=\"white\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.3379 49.9484C19.3379 66.8508 33.04 80.553 49.9425 80.553C66.8449 80.553 80.5471 66.8508 80.5471 49.9484C80.5471 33.0459 66.8449 19.3438 49.9425 19.3438C33.04 19.3438 19.3379 33.0459 19.3379 49.9484ZM44.0817 40.0799C41.8725 40.0799 40.0817 41.8708 40.0817 44.0799V55.8029C40.0817 58.012 41.8725 59.8029 44.0817 59.8029H55.8046C58.0138 59.8029 59.8046 58.012 59.8046 55.8029V44.0799C59.8046 41.8708 58.0138 40.0799 55.8046 40.0799H44.0817Z\" fill=\"white\"/>\n</svg>\n\n";

/***/ }),

/***/ 1650:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2021 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2021 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ".-walletlink-css-reset .-walletlink-extension-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-walletlink-css-reset .-walletlink-extension-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);transition:opacity .25s}.-walletlink-css-reset .-walletlink-extension-dialog-backdrop-hidden{opacity:0}.-walletlink-css-reset .-walletlink-extension-dialog-box{display:flex;position:relative;max-width:500px;flex-direction:column;transform:scale(1);transition:opacity .25s,transform .25s}.-walletlink-css-reset .-walletlink-extension-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-walletlink-css-reset .-walletlink-extension-dialog-box-top{display:flex;flex-direction:row;background-color:#fff;border-radius:8px;overflow:hidden;min-height:300px}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-install-region{display:flex;flex-basis:50%;flex-direction:column;justify-content:center;padding:32px}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-install-region button{display:block;border-radius:8px;background-color:#1652f0;color:#fff;width:90%;min-width:fit-content;height:44px;margin-top:16px;font-size:16px;padding-left:16px;padding-right:16px;cursor:pointer;font-weight:500;text-align:center}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-info-region{display:flex;flex-basis:50%;flex-direction:column;justify-content:center;background-color:#fafbfc}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-description{display:flex;flex-direction:row;align-items:center;padding-top:14px;padding-bottom:14px;padding-left:24px;padding-right:32px}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-description-icon-wrapper{display:block;position:relative;width:40px;height:40px;flex-shrink:0;flex-grow:0;border-radius:20px;background-color:#fff;box-shadow:0px 0px 8px rgba(0,0,0,.04),0px 16px 24px rgba(0,0,0,.06)}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-description-icon-wrapper img{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-description-text{margin-left:16px;flex-grow:1;font-size:13px;line-height:19px;color:#000;align-self:center}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom{display:flex;flex-direction:row;overflow:hidden;border-radius:8px;background-color:#fff;margin-top:8px}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-description-region{display:flex;flex-direction:column;justify-content:center;padding:32px;flex-grow:1}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-description{font-size:13px;line-height:19px;margin-top:12px;color:#aaa}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-description a{font-size:inherit;line-height:inherit;color:#1652f0;cursor:pointer}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-qr-region{position:relative;flex-shrink:0;display:flex;flex-direction:column;justify-content:center;padding-left:24px;padding-right:24px;padding-top:16px;padding-bottom:16px}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-qr-wrapper{position:relative;display:block;padding:8px;border-radius:8px;box-shadow:0px 4px 12px rgba(0,0,0,.1)}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-qr-wrapper img{display:block}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-qr-connecting{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:rgba(255,255,255,.95)}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-qr-connecting>p{font-size:12px;font-weight:bold;color:#000;margin-top:16px}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel{position:absolute;-webkit-appearance:none;display:flex;align-items:center;justify-content:center;top:16px;right:16px;width:24px;height:24px;border-radius:12px;background-color:#fafbfc;cursor:pointer}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel-x{position:relative;display:block;cursor:pointer}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel-x::after{content:\"\";position:absolute;display:block;top:-1px;left:-7px;width:14px;height:1px;background-color:#000;transition:background-color .2s}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel-x::before{transform:rotate(45deg)}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel-x::after{transform:rotate(135deg)}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x-a,.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x-b{background-color:#000}.-walletlink-css-reset .-walletlink-extension-dialog-container{display:block}.-walletlink-css-reset .-walletlink-extension-dialog-container-hidden{display:none}.-walletlink-css-reset .-walletlink-extension-dialog h2{display:block;text-align:left;font-size:22px;font-weight:600;line-height:28px;color:#000}";

/***/ }),

/***/ 1651:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _slicedToArray = __webpack_require__(138);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snackbar = void 0;

var clsx_1 = __importDefault(__webpack_require__(1484));

var preact_1 = __webpack_require__(1400);

var hooks_1 = __webpack_require__(1448);

var Snackbar_css_1 = __importDefault(__webpack_require__(1652));

var cblogo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+";
var gearIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=";

var Snackbar = /*#__PURE__*/function () {
  function Snackbar(options) {
    _classCallCheck(this, Snackbar);

    this.items = new Map();
    this.nextItemKey = 0;
    this.root = null;
    this.darkMode = options.darkMode;
  }

  _createClass(Snackbar, [{
    key: "attach",
    value: function attach(el) {
      this.root = document.createElement("div");
      this.root.className = "-walletlink-snackbar-root";
      el.appendChild(this.root);
      this.render();
    }
  }, {
    key: "presentItem",
    value: function presentItem(itemProps) {
      var _this = this;

      var key = this.nextItemKey++;
      this.items.set(key, itemProps);
      this.render();
      return function () {
        _this.items.delete(key);

        _this.render();
      };
    }
  }, {
    key: "clear",
    value: function clear() {
      this.items.clear();
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.root) {
        return;
      }

      (0, preact_1.render)((0, preact_1.h)("div", null, (0, preact_1.h)(SnackbarContainer, {
        darkMode: this.darkMode
      }, Array.from(this.items.entries()).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            itemProps = _ref2[1];

        return (0, preact_1.h)(SnackbarInstance, Object.assign({}, itemProps, {
          key: key
        }));
      }))), this.root);
    }
  }]);

  return Snackbar;
}();

exports.Snackbar = Snackbar;

var SnackbarContainer = function SnackbarContainer(props) {
  return (0, preact_1.h)("div", {
    class: (0, clsx_1.default)("-walletlink-snackbar-container")
  }, (0, preact_1.h)("style", null, Snackbar_css_1.default), (0, preact_1.h)("div", {
    class: "-walletlink-snackbar"
  }, props.children));
};

var SnackbarInstance = function SnackbarInstance(_ref3) {
  var message = _ref3.message,
      menuItems = _ref3.menuItems;

  var _ref4 = (0, hooks_1.useState)(true),
      _ref5 = _slicedToArray(_ref4, 2),
      hidden = _ref5[0],
      setHidden = _ref5[1];

  var _ref6 = (0, hooks_1.useState)(false),
      _ref7 = _slicedToArray(_ref6, 2),
      expanded = _ref7[0],
      setExpanded = _ref7[1];

  (0, hooks_1.useEffect)(function () {
    var timers = [window.setTimeout(function () {
      setHidden(false);
    }, 1), window.setTimeout(function () {
      setExpanded(true);
    }, 10000)];
    return function () {
      timers.forEach(window.clearTimeout);
    };
  });

  var toggleExpanded = function toggleExpanded() {
    setExpanded(!expanded);
  };

  return (0, preact_1.h)("div", {
    class: (0, clsx_1.default)("-walletlink-snackbar-instance", hidden && "-walletlink-snackbar-instance-hidden", expanded && "-walletlink-snackbar-instance-expanded")
  }, (0, preact_1.h)("div", {
    class: "-walletlink-snackbar-instance-header",
    onClick: toggleExpanded
  }, (0, preact_1.h)("img", {
    src: cblogo,
    class: "-walletlink-snackbar-instance-header-cblogo"
  }), (0, preact_1.h)("div", {
    class: "-walletlink-snackbar-instance-header-message"
  }, message), (0, preact_1.h)("div", {
    class: "-gear-container"
  }, !expanded && (0, preact_1.h)("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, preact_1.h)("circle", {
    cx: "12",
    cy: "12",
    r: "12",
    fill: "#F5F7F8"
  })), (0, preact_1.h)("img", {
    src: gearIcon,
    class: "-gear-icon",
    title: "Expand"
  }))), menuItems && menuItems.length > 0 && (0, preact_1.h)("div", {
    class: "-walletlink-snackbar-instance-menu"
  }, menuItems.map(function (action, i) {
    return (0, preact_1.h)("div", {
      class: (0, clsx_1.default)("-walletlink-snackbar-instance-menu-item", action.isRed && "-walletlink-snackbar-instance-menu-item-is-red"),
      onClick: action.onClick,
      key: i
    }, (0, preact_1.h)("svg", {
      width: action.svgWidth,
      height: action.svgHeight,
      viewBox: "0 0 10 11",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0, preact_1.h)("path", {
      "fill-rule": action.defaultFillRule,
      "clip-rule": action.defaultClipRule,
      d: action.path,
      fill: "#AAAAAA"
    })), (0, preact_1.h)("span", {
      class: (0, clsx_1.default)("-walletlink-snackbar-instance-menu-item-info", action.isRed && "-walletlink-snackbar-instance-menu-item-info-is-red")
    }, action.info));
  })));
};

/***/ }),

/***/ 1652:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2021 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2021 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ".-walletlink-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-walletlink-css-reset .-gear-container *{user-select:none}.-walletlink-css-reset .-gear-container svg{opacity:0;position:absolute}.-walletlink-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-walletlink-css-reset .-walletlink-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-walletlink-css-reset .-walletlink-snackbar *{user-select:none}.-walletlink-css-reset .-walletlink-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-walletlink-css-reset .-walletlink-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-walletlink-css-reset .-walletlink-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-walletlink-css-reset .-walletlink-snackbar-instance-header *{cursor:pointer}.-walletlink-css-reset .-walletlink-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-walletlink-css-reset .-walletlink-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-walletlink-css-reset .-walletlink-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-walletlink-css-reset .-walletlink-snackbar-instance-expanded .-walletlink-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}";

/***/ }),

/***/ 1653:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectCssReset = void 0;

var cssReset_css_1 = __importDefault(__webpack_require__(1654));

function injectCssReset() {
  var styleEl = document.createElement("style");
  styleEl.type = "text/css";
  styleEl.appendChild(document.createTextNode(cssReset_css_1.default));
  document.documentElement.appendChild(styleEl);
}

exports.injectCssReset = injectCssReset;

/***/ }),

/***/ 1654:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2021 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2021 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "@namespace svg \"http://www.w3.org/2000/svg\";.-walletlink-css-reset,.-walletlink-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:transparent;background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;bottom:auto;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;content:normal;counter-increment:none;counter-reset:none;cursor:auto;direction:ltr;display:block;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"Helvetica Neue\",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;left:auto;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;max-height:none;max-width:none;min-height:0;min-width:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:\"\\201C\" \"\\201D\" \"\\2018\" \"\\2019\";right:auto;tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;top:auto;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;width:auto;word-spacing:normal;z-index:auto}.-walletlink-css-reset *{box-sizing:border-box;display:initial;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"Helvetica Neue\",Arial,sans-serif;line-height:1}.-walletlink-css-reset [class*=container]{margin:0;padding:0}.-walletlink-css-reset style{display:none}";

/***/ }),

/***/ 1655:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkUI = void 0;

var WalletLinkUI = /*#__PURE__*/function () {
  function WalletLinkUI(_) {
    _classCallCheck(this, WalletLinkUI);
  }
  /**
   * We want to disable showing the qr code for in-page walletlink if the dapp hasn't provided a json rpc url
   */


  _createClass(WalletLinkUI, [{
    key: "setConnectDisabled",
    value: function setConnectDisabled(_) {}
  }]);

  return WalletLinkUI;
}();

exports.WalletLinkUI = WalletLinkUI;

/***/ }),

/***/ 1656:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _slicedToArray = __webpack_require__(138);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

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

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkRelay = void 0;

var bind_decorator_1 = __importDefault(__webpack_require__(1657));

var rxjs_1 = __webpack_require__(1414);

var operators_1 = __webpack_require__(1433);

var WalletLinkAnalytics_1 = __webpack_require__(1461);

var WalletLinkConnection_1 = __webpack_require__(1658);

var init_1 = __webpack_require__(1462);

var util_1 = __webpack_require__(1399);

var aes256gcm = __importStar(__webpack_require__(1662));

var Session_1 = __webpack_require__(1463);

var WalletLinkRelayAbstract_1 = __webpack_require__(1527);

var Web3Method_1 = __webpack_require__(1539);

var Web3RequestCanceledMessage_1 = __webpack_require__(1663);

var Web3RequestMessage_1 = __webpack_require__(1664);

var Web3Response_1 = __webpack_require__(1665);

var Web3ResponseMessage_1 = __webpack_require__(1666);

var WalletLinkRelay = /*#__PURE__*/function () {
  function WalletLinkRelay(options) {
    var _this = this;

    _classCallCheck(this, WalletLinkRelay);

    this.accountsCallback = null;
    this.chainCallback = null;
    this.appName = "";
    this.appLogoUrl = null;
    this.subscriptions = new rxjs_1.Subscription();
    this.walletLinkUrl = options.walletLinkUrl;
    this.storage = options.storage;
    this._session = Session_1.Session.load(options.storage) || new Session_1.Session(options.storage).save();
    this.relayEventManager = options.relayEventManager;
    this.walletLinkAnalytics = options.walletLinkAnalytics ? options.walletLinkAnalytics : new WalletLinkAnalytics_1.WalletLinkAnalytics();
    this.connection = new WalletLinkConnection_1.WalletLinkConnection(this._session.id, this._session.key, this.walletLinkUrl, this.walletLinkAnalytics);
    this.subscriptions.add(this.connection.incomingEvent$.pipe((0, operators_1.filter)(function (m) {
      return m.event === "Web3Response";
    })).subscribe({
      next: this.handleIncomingEvent
    }));
    this.subscriptions.add(this.connection.linked$.pipe((0, operators_1.skip)(1), (0, operators_1.tap)(function (linked) {
      var _a;

      _this.isLinked = linked;

      var cachedAddresses = _this.storage.getItem(WalletLinkRelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY);

      if (cachedAddresses) {
        var addresses = cachedAddresses.split(" ");

        if (addresses[0] !== "" && !linked) {
          var sessionIdHash = Session_1.Session.hash(_this._session.id);
          (_a = _this.walletLinkAnalytics) === null || _a === void 0 ? void 0 : _a.sendEvent(init_1.EVENTS.UNLINKED_ERROR_STATE, {
            sessionIdHash: sessionIdHash
          });
        }
      }
    })).subscribe()); // if session is marked destroyed, reset and reload

    this.subscriptions.add(this.connection.sessionConfig$.pipe((0, operators_1.filter)(function (c) {
      return !!c.metadata && c.metadata.__destroyed === "1";
    })).subscribe(function () {
      var _a;

      var alreadyDestroyed = _this.connection.isDestroyed;
      (_a = _this.walletLinkAnalytics) === null || _a === void 0 ? void 0 : _a.sendEvent(init_1.EVENTS.METADATA_DESTROYED, {
        alreadyDestroyed: alreadyDestroyed,
        sessionIdHash: Session_1.Session.hash(_this._session.id)
      });
      return _this.resetAndReload();
    }));
    this.subscriptions.add(this.connection.sessionConfig$.pipe((0, operators_1.filter)(function (c) {
      return c.metadata && c.metadata.WalletUsername !== undefined;
    })).pipe((0, operators_1.mergeMap)(function (c) {
      return aes256gcm.decrypt(c.metadata.WalletUsername, _this._session.secret);
    })).subscribe({
      next: function next(walletUsername) {
        _this.storage.setItem(WalletLinkRelayAbstract_1.WALLET_USER_NAME_KEY, walletUsername);
      },
      error: function error() {
        var _a;

        (_a = _this.walletLinkAnalytics) === null || _a === void 0 ? void 0 : _a.sendEvent(init_1.EVENTS.GENERAL_ERROR, {
          message: 'Had error decrypting',
          value: 'username'
        });
      }
    }));
    this.subscriptions.add(this.connection.sessionConfig$.pipe((0, operators_1.filter)(function (c) {
      return c.metadata && c.metadata.ChainId !== undefined && c.metadata.JsonRpcUrl !== undefined;
    })).pipe((0, operators_1.mergeMap)(function (c) {
      return (0, rxjs_1.zip)(aes256gcm.decrypt(c.metadata.ChainId, _this._session.secret), aes256gcm.decrypt(c.metadata.JsonRpcUrl, _this._session.secret));
    })).pipe((0, operators_1.distinctUntilChanged)()).subscribe({
      next: function next(_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            chainId = _ref2[0],
            jsonRpcUrl = _ref2[1];

        if (_this.chainCallback) {
          _this.chainCallback(chainId, jsonRpcUrl);
        }
      },
      error: function error() {
        var _a;

        (_a = _this.walletLinkAnalytics) === null || _a === void 0 ? void 0 : _a.sendEvent(init_1.EVENTS.GENERAL_ERROR, {
          message: 'Had error decrypting',
          value: 'chainId|jsonRpcUrl'
        });
      }
    }));
    this.subscriptions.add(this.connection.sessionConfig$.pipe((0, operators_1.filter)(function (c) {
      return c.metadata && c.metadata.EthereumAddress !== undefined;
    })).pipe((0, operators_1.mergeMap)(function (c) {
      return aes256gcm.decrypt(c.metadata.EthereumAddress, _this._session.secret);
    })).subscribe({
      next: function next(selectedAddress) {
        if (_this.accountsCallback) {
          _this.accountsCallback([selectedAddress]);
        }

        if (WalletLinkRelay.accountRequestCallbackIds.size > 0) {
          // We get the ethereum address from the metadata.  If for whatever
          // reason we don't get a response via an explicit web3 message
          // we can still fulfill the eip1102 request.
          Array.from(WalletLinkRelay.accountRequestCallbackIds.values()).forEach(function (id) {
            var message = (0, Web3ResponseMessage_1.Web3ResponseMessage)({
              id: id,
              response: (0, Web3Response_1.RequestEthereumAccountsResponse)([selectedAddress])
            });

            _this.invokeCallback(Object.assign(Object.assign({}, message), {
              id: id
            }));
          });
          WalletLinkRelay.accountRequestCallbackIds.clear();
        }
      },
      error: function error() {
        var _a;

        (_a = _this.walletLinkAnalytics) === null || _a === void 0 ? void 0 : _a.sendEvent(init_1.EVENTS.GENERAL_ERROR, {
          message: 'Had error decrypting',
          value: 'selectedAddress'
        });
      }
    }));
    this.ui = options.walletLinkUIConstructor({
      walletLinkUrl: options.walletLinkUrl,
      version: options.version,
      darkMode: options.darkMode,
      session: this._session,
      connected$: this.connection.connected$
    });
    this.connection.connect();
  }

  _createClass(WalletLinkRelay, [{
    key: "attachUI",
    value: function attachUI() {
      this.ui.attach();
    }
  }, {
    key: "resetAndReload",
    value: function resetAndReload() {
      var _this2 = this;

      this.connection.setSessionMetadata("__destroyed", "1").pipe((0, operators_1.timeout)(1000), (0, operators_1.catchError)(function (_) {
        return (0, rxjs_1.of)(null);
      })).subscribe(function (_) {
        var _a, _b;

        try {
          _this2.subscriptions.unsubscribe();
        } catch (err) {
          (_a = _this2.walletLinkAnalytics) === null || _a === void 0 ? void 0 : _a.sendEvent(init_1.EVENTS.GENERAL_ERROR, {
            message: "Had error unsubscribing"
          });
        }

        (_b = _this2.walletLinkAnalytics) === null || _b === void 0 ? void 0 : _b.sendEvent(init_1.EVENTS.SESSION_STATE_CHANGE, {
          method: "relay::resetAndReload",
          sessionMetadataChange: "__destroyed, 1",
          sessionIdHash: Session_1.Session.hash(_this2._session.id)
        });

        _this2.connection.destroy();

        _this2.storage.clear();

        _this2.ui.reloadUI();
      }, function (err) {
        var _a;

        (_a = _this2.walletLinkAnalytics) === null || _a === void 0 ? void 0 : _a.sendEvent(init_1.EVENTS.FAILURE, {
          method: "relay::resetAndReload",
          message: "faled to reset and relod with ".concat(err),
          sessionIdHash: Session_1.Session.hash(_this2._session.id)
        });
      });
    }
  }, {
    key: "setAppInfo",
    value: function setAppInfo(appName, appLogoUrl) {
      this.appName = appName;
      this.appLogoUrl = appLogoUrl;
    }
  }, {
    key: "getStorageItem",
    value: function getStorageItem(key) {
      return this.storage.getItem(key);
    }
  }, {
    key: "session",
    get: function get() {
      return this._session;
    }
  }, {
    key: "setStorageItem",
    value: function setStorageItem(key, value) {
      this.storage.setItem(key, value);
    }
  }, {
    key: "requestEthereumAccounts",
    value: function requestEthereumAccounts() {
      return this.sendRequest({
        method: Web3Method_1.Web3Method.requestEthereumAccounts,
        params: {
          appName: this.appName,
          appLogoUrl: this.appLogoUrl || null
        }
      });
    }
  }, {
    key: "signEthereumMessage",
    value: function signEthereumMessage(message, address, addPrefix, typedDataJson) {
      return this.sendRequest({
        method: Web3Method_1.Web3Method.signEthereumMessage,
        params: {
          message: (0, util_1.hexStringFromBuffer)(message, true),
          address: address,
          addPrefix: addPrefix,
          typedDataJson: typedDataJson || null
        }
      });
    }
  }, {
    key: "ethereumAddressFromSignedMessage",
    value: function ethereumAddressFromSignedMessage(message, signature, addPrefix) {
      return this.sendRequest({
        method: Web3Method_1.Web3Method.ethereumAddressFromSignedMessage,
        params: {
          message: (0, util_1.hexStringFromBuffer)(message, true),
          signature: (0, util_1.hexStringFromBuffer)(signature, true),
          addPrefix: addPrefix
        }
      });
    }
  }, {
    key: "signEthereumTransaction",
    value: function signEthereumTransaction(params) {
      return this.sendRequest({
        method: Web3Method_1.Web3Method.signEthereumTransaction,
        params: {
          fromAddress: params.fromAddress,
          toAddress: params.toAddress,
          weiValue: (0, util_1.bigIntStringFromBN)(params.weiValue),
          data: (0, util_1.hexStringFromBuffer)(params.data, true),
          nonce: params.nonce,
          gasPriceInWei: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
          maxFeePerGas: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
          maxPriorityFeePerGas: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
          gasLimit: params.gasLimit ? (0, util_1.bigIntStringFromBN)(params.gasLimit) : null,
          chainId: params.chainId,
          shouldSubmit: false
        }
      });
    }
  }, {
    key: "signAndSubmitEthereumTransaction",
    value: function signAndSubmitEthereumTransaction(params) {
      return this.sendRequest({
        method: Web3Method_1.Web3Method.signEthereumTransaction,
        params: {
          fromAddress: params.fromAddress,
          toAddress: params.toAddress,
          weiValue: (0, util_1.bigIntStringFromBN)(params.weiValue),
          data: (0, util_1.hexStringFromBuffer)(params.data, true),
          nonce: params.nonce,
          gasPriceInWei: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
          maxFeePerGas: params.maxFeePerGas ? (0, util_1.bigIntStringFromBN)(params.maxFeePerGas) : null,
          maxPriorityFeePerGas: params.maxPriorityFeePerGas ? (0, util_1.bigIntStringFromBN)(params.maxPriorityFeePerGas) : null,
          gasLimit: params.gasLimit ? (0, util_1.bigIntStringFromBN)(params.gasLimit) : null,
          chainId: params.chainId,
          shouldSubmit: true
        }
      });
    }
  }, {
    key: "submitEthereumTransaction",
    value: function submitEthereumTransaction(signedTransaction, chainId) {
      return this.sendRequest({
        method: Web3Method_1.Web3Method.submitEthereumTransaction,
        params: {
          signedTransaction: (0, util_1.hexStringFromBuffer)(signedTransaction, true),
          chainId: chainId
        }
      });
    }
  }, {
    key: "scanQRCode",
    value: function scanQRCode(regExp) {
      return this.sendRequest({
        method: Web3Method_1.Web3Method.scanQRCode,
        params: {
          regExp: regExp
        }
      });
    }
  }, {
    key: "arbitraryRequest",
    value: function arbitraryRequest(data) {
      return this.sendRequest({
        method: Web3Method_1.Web3Method.arbitrary,
        params: {
          data: data
        }
      });
    }
  }, {
    key: "addEthereumChain",
    value: function addEthereumChain(chainId, blockExplorerUrls, chainName, iconUrls, nativeCurrency) {
      return this.sendRequest({
        method: Web3Method_1.Web3Method.addEthereumChain,
        params: {
          chainId: chainId,
          blockExplorerUrls: blockExplorerUrls,
          chainName: chainName,
          iconUrls: iconUrls,
          nativeCurrency: nativeCurrency
        }
      });
    }
  }, {
    key: "sendRequest",
    value: function sendRequest(request) {
      var _this3 = this;

      var hideSnackbarItem = null;
      var id = (0, util_1.randomBytesHex)(8);

      var cancel = function cancel() {
        _this3.publishWeb3RequestCanceledEvent(id);

        _this3.handleWeb3ResponseMessage((0, Web3ResponseMessage_1.Web3ResponseMessage)({
          id: id,
          response: (0, Web3Response_1.ErrorResponse)(request.method, "User rejected request")
        }));

        hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
      };

      var promise = new Promise(function (resolve, reject) {
        var _a;

        var isRequestAccounts = request.method === Web3Method_1.Web3Method.requestEthereumAccounts;
        var isSwitchEthereumChain = request.method === Web3Method_1.Web3Method.switchEthereumChain;

        if (isRequestAccounts) {
          var userAgent = ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) || null;

          if (userAgent && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
            window.location.href = "https://go.cb-w.com/xoXnYwQimhb?cb_url=".concat(window.location.href);
            return;
          }

          if (_this3.ui.inlineAccountsResponse()) {
            var onAccounts = function onAccounts(accounts) {
              _this3.handleWeb3ResponseMessage((0, Web3ResponseMessage_1.Web3ResponseMessage)({
                id: id,
                response: (0, Web3Response_1.RequestEthereumAccountsResponse)(accounts)
              }));
            };

            _this3.ui.requestEthereumAccounts({
              onCancel: cancel,
              onAccounts: onAccounts
            });
          } else {
            _this3.ui.requestEthereumAccounts({
              onCancel: cancel
            });
          }

          WalletLinkRelay.accountRequestCallbackIds.add(id);
        } else if (request.method === Web3Method_1.Web3Method.switchEthereumChain || request.method === Web3Method_1.Web3Method.addEthereumChain) {
          var _cancel = function _cancel() {
            _this3.handleWeb3ResponseMessage((0, Web3ResponseMessage_1.Web3ResponseMessage)({
              id: id,
              response: (0, Web3Response_1.SwitchEthereumChainResponse)(false)
            }));
          };

          var approve = function approve() {
            _this3.handleWeb3ResponseMessage((0, Web3ResponseMessage_1.Web3ResponseMessage)({
              id: id,
              response: (0, Web3Response_1.SwitchEthereumChainResponse)(true)
            }));
          };

          _this3.ui.switchEthereumChain({
            onCancel: _cancel,
            onApprove: approve,
            chainId: request.params.chainId
          });

          if (!_this3.ui.inlineSwitchEthereumChain()) {
            hideSnackbarItem = _this3.ui.showConnecting({
              onCancel: _cancel,
              onResetConnection: _this3.resetAndReload
            });
          }
        } else if (_this3.ui.isStandalone()) {
          var onCancel = function onCancel() {
            _this3.handleWeb3ResponseMessage((0, Web3ResponseMessage_1.Web3ResponseMessage)({
              id: id,
              response: (0, Web3Response_1.ErrorResponse)(request.method, "User rejected request")
            }));
          };

          var onSuccess = function onSuccess(response) {
            _this3.handleWeb3ResponseMessage((0, Web3ResponseMessage_1.Web3ResponseMessage)({
              id: id,
              response: response
            }));
          };

          switch (request.method) {
            case Web3Method_1.Web3Method.signEthereumMessage:
              _this3.ui.signEthereumMessage({
                request: request,
                onSuccess: onSuccess,
                onCancel: onCancel
              });

              break;

            case Web3Method_1.Web3Method.signEthereumTransaction:
              _this3.ui.signEthereumTransaction({
                request: request,
                onSuccess: onSuccess,
                onCancel: onCancel
              });

              break;

            case Web3Method_1.Web3Method.submitEthereumTransaction:
              _this3.ui.submitEthereumTransaction({
                request: request,
                onSuccess: onSuccess,
                onCancel: onCancel
              });

              break;

            case Web3Method_1.Web3Method.ethereumAddressFromSignedMessage:
              _this3.ui.ethereumAddressFromSignedMessage({
                request: request,
                onSuccess: onSuccess
              });

              break;

            default:
              onCancel();
              break;
          }
        } else {
          hideSnackbarItem = _this3.ui.showConnecting({
            onCancel: cancel,
            onResetConnection: _this3.resetAndReload
          });
        }

        _this3.relayEventManager.callbacks.set(id, function (response) {
          _this3.ui.hideRequestEthereumAccounts();

          hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();

          if (response.errorMessage) {
            return reject(new Error(response.errorMessage));
          }

          resolve(response);
        });

        if (isRequestAccounts && _this3.ui.inlineAccountsResponse() || isSwitchEthereumChain && _this3.ui.inlineSwitchEthereumChain() || _this3.ui.isStandalone()) {
          return;
        }

        _this3.publishWeb3RequestEvent(id, request);
      });
      return {
        promise: promise,
        cancel: cancel
      };
    }
  }, {
    key: "setConnectDisabled",
    value: function setConnectDisabled(disabled) {
      this.ui.setConnectDisabled(disabled);
    }
  }, {
    key: "setAccountsCallback",
    value: function setAccountsCallback(accountsCallback) {
      this.accountsCallback = accountsCallback;
    }
  }, {
    key: "setChainCallback",
    value: function setChainCallback(chainCallback) {
      this.chainCallback = chainCallback;
    }
  }, {
    key: "publishWeb3RequestEvent",
    value: function publishWeb3RequestEvent(id, request) {
      var _this4 = this;

      var message = (0, Web3RequestMessage_1.Web3RequestMessage)({
        id: id,
        request: request
      });
      this.subscriptions.add(this.publishEvent("Web3Request", message, true).subscribe({
        error: function error(err) {
          _this4.handleWeb3ResponseMessage((0, Web3ResponseMessage_1.Web3ResponseMessage)({
            id: message.id,
            response: {
              method: message.request.method,
              errorMessage: err.message
            }
          }));
        }
      }));
    }
  }, {
    key: "publishWeb3RequestCanceledEvent",
    value: function publishWeb3RequestCanceledEvent(id) {
      var message = (0, Web3RequestCanceledMessage_1.Web3RequestCanceledMessage)(id);
      this.subscriptions.add(this.publishEvent("Web3RequestCanceled", message, false).subscribe());
    }
  }, {
    key: "publishEvent",
    value: function publishEvent(event, message, callWebhook) {
      var _this5 = this;

      var secret = this.session.secret;
      return new rxjs_1.Observable(function (subscriber) {
        aes256gcm.encrypt(JSON.stringify(Object.assign(Object.assign({}, message), {
          origin: location.origin
        })), secret).then(function (encrypted) {
          subscriber.next(encrypted);
          subscriber.complete();
        });
      }).pipe((0, operators_1.mergeMap)(function (encrypted) {
        return _this5.connection.publishEvent(event, encrypted, callWebhook);
      }));
    }
  }, {
    key: "handleIncomingEvent",
    value: function handleIncomingEvent(event) {
      var _this6 = this;

      try {
        this.subscriptions.add(aes256gcm.decrypt(event.data, this.session.secret).pipe((0, operators_1.map)(function (c) {
          return JSON.parse(c);
        })).subscribe({
          next: function next(json) {
            var message = (0, Web3ResponseMessage_1.isWeb3ResponseMessage)(json) ? json : null;

            if (!message) {
              return;
            }

            _this6.handleWeb3ResponseMessage(message);
          },
          error: function error() {
            var _a;

            (_a = _this6.walletLinkAnalytics) === null || _a === void 0 ? void 0 : _a.sendEvent(init_1.EVENTS.GENERAL_ERROR, {
              message: 'Had error decrypting',
              value: 'incomingEvent'
            });
          }
        }));
      } catch (_a) {
        return;
      }
    }
  }, {
    key: "handleWeb3ResponseMessage",
    value: function handleWeb3ResponseMessage(message) {
      var _this7 = this;

      var response = message.response;

      if ((0, Web3Response_1.isRequestEthereumAccountsResponse)(response)) {
        Array.from(WalletLinkRelay.accountRequestCallbackIds.values()).forEach(function (id) {
          return _this7.invokeCallback(Object.assign(Object.assign({}, message), {
            id: id
          }));
        });
        WalletLinkRelay.accountRequestCallbackIds.clear();
        return;
      }

      this.invokeCallback(message);
    }
  }, {
    key: "invokeCallback",
    value: function invokeCallback(message) {
      var callback = this.relayEventManager.callbacks.get(message.id);

      if (callback) {
        callback(message.response);
        this.relayEventManager.callbacks.delete(message.id);
      }
    }
  }, {
    key: "switchEthereumChain",
    value: function switchEthereumChain(chainId) {
      return this.sendRequest({
        method: Web3Method_1.Web3Method.switchEthereumChain,
        params: {
          chainId: chainId
        }
      });
    }
  }]);

  return WalletLinkRelay;
}();

WalletLinkRelay.accountRequestCallbackIds = new Set();

__decorate([bind_decorator_1.default], WalletLinkRelay.prototype, "resetAndReload", null);

__decorate([bind_decorator_1.default], WalletLinkRelay.prototype, "handleIncomingEvent", null);

exports.WalletLinkRelay = WalletLinkRelay;

/***/ }),

/***/ 1657:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var constants;

(function (constants) {
  constants.typeOfFunction = 'function';
  constants.boolTrue = true;
})(constants || (constants = {}));

function bind(target, propertyKey, descriptor) {
  if (!descriptor || typeof descriptor.value !== constants.typeOfFunction) {
    throw new TypeError("Only methods can be decorated with @bind. <" + propertyKey + "> is not a method!");
  }

  return {
    configurable: constants.boolTrue,
    get: function get() {
      var bound = descriptor.value.bind(this); // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.

      Object.defineProperty(this, propertyKey, {
        value: bound,
        configurable: constants.boolTrue,
        writable: constants.boolTrue
      });
      return bound;
    }
  };
}

exports.bind = bind;
exports.default = bind;

/***/ }),

/***/ 1658:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _defineProperty = __webpack_require__(348);

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkConnection = void 0;

var rxjs_1 = __webpack_require__(1414);

var operators_1 = __webpack_require__(1433);

var init_1 = __webpack_require__(1462);

var Session_1 = __webpack_require__(1463);

var types_1 = __webpack_require__(1479);

var ClientMessage_1 = __webpack_require__(1659);

var RxWebSocket_1 = __webpack_require__(1660);

var ServerMessage_1 = __webpack_require__(1661);

var HEARTBEAT_INTERVAL = 10000;
var REQUEST_TIMEOUT = 60000;
/**
 * WalletLink Connection
 */

var WalletLinkConnection = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param sessionId Session ID
   * @param sessionKey Session Key
   * @param serverUrl Walletlinkd RPC URL
   * @param [WebSocketClass] Custom WebSocket implementation
   */
  function WalletLinkConnection(sessionId, sessionKey, serverUrl, walletLinkAnalytics) {
    var _this = this;

    var WebSocketClass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : WebSocket;

    _classCallCheck(this, WalletLinkConnection);

    this.sessionId = sessionId;
    this.sessionKey = sessionKey;
    this.subscriptions = new rxjs_1.Subscription();
    this.destroyed = false;
    this.lastHeartbeatResponse = 0;
    this.nextReqId = (0, types_1.IntNumber)(1);
    this.connectedSubject = new rxjs_1.BehaviorSubject(false);
    this.linkedSubject = new rxjs_1.BehaviorSubject(false);
    this.sessionConfigSubject = new rxjs_1.ReplaySubject(1);
    var ws = new RxWebSocket_1.RxWebSocket(serverUrl + "/rpc", WebSocketClass);
    this.ws = ws;
    this.walletLinkAnalytics = walletLinkAnalytics; // attempt to reconnect every 5 seconds when disconnected

    this.subscriptions.add(ws.connectionState$.pipe((0, operators_1.tap)(function (state) {
      return _this.walletLinkAnalytics.sendEvent(init_1.EVENTS.CONNECTED_STATE_CHANGE, {
        state: state,
        sessionIdHash: Session_1.Session.hash(sessionId)
      });
    }), // ignore initial DISCONNECTED state
    (0, operators_1.skip)(1), // if DISCONNECTED and not destroyed
    (0, operators_1.filter)(function (cs) {
      return cs === RxWebSocket_1.ConnectionState.DISCONNECTED && !_this.destroyed;
    }), // wait 5 seconds
    (0, operators_1.delay)(5000), // check whether it's destroyed again
    (0, operators_1.filter)(function (_) {
      return !_this.destroyed;
    }), // reconnect
    (0, operators_1.flatMap)(function (_) {
      return ws.connect();
    }), (0, operators_1.retry)()).subscribe()); // perform authentication upon connection

    this.subscriptions.add(ws.connectionState$.pipe( // ignore initial DISCONNECTED and CONNECTING states
    (0, operators_1.skip)(2), (0, operators_1.switchMap)(function (cs) {
      return (0, rxjs_1.iif)(function () {
        return cs === RxWebSocket_1.ConnectionState.CONNECTED;
      }, // if CONNECTED, authenticate, and then check link status
      _this.authenticate().pipe((0, operators_1.tap)(function (_) {
        return _this.sendIsLinked();
      }), (0, operators_1.tap)(function (_) {
        return _this.sendGetSessionConfig();
      }), (0, operators_1.map)(function (_) {
        return true;
      })), // if not CONNECTED, emit false immediately
      (0, rxjs_1.of)(false));
    }), (0, operators_1.distinctUntilChanged)(), (0, operators_1.catchError)(function (_) {
      return (0, rxjs_1.of)(false);
    })).subscribe(function (connected) {
      return _this.connectedSubject.next(connected);
    })); // send heartbeat every n seconds while connected

    this.subscriptions.add(ws.connectionState$.pipe( // ignore initial DISCONNECTED state
    (0, operators_1.skip)(1), (0, operators_1.switchMap)(function (cs) {
      return (0, rxjs_1.iif)(function () {
        return cs === RxWebSocket_1.ConnectionState.CONNECTED;
      }, // if CONNECTED, start the heartbeat timer
      (0, rxjs_1.timer)(0, HEARTBEAT_INTERVAL));
    })).subscribe(function (i) {
      return (// first timer event updates lastHeartbeat timestamp
        // subsequent calls send heartbeat message
        i === 0 ? _this.updateLastHeartbeat() : _this.heartbeat()
      );
    })); // handle server's heartbeat responses

    this.subscriptions.add(ws.incomingData$.pipe((0, operators_1.filter)(function (m) {
      return m === "h";
    })).subscribe(function (_) {
      return _this.updateLastHeartbeat();
    })); // handle link status updates

    this.subscriptions.add(ws.incomingJSONData$.pipe((0, operators_1.filter)(function (m) {
      return ["IsLinkedOK", "Linked"].includes(m.type);
    })).subscribe(function (m) {
      var msg = m;

      _this.walletLinkAnalytics.sendEvent(init_1.EVENTS.LINKED, {
        sessionIdHash: Session_1.Session.hash(sessionId),
        linked: msg.linked,
        type: m.type,
        onlineGuests: msg.onlineGuests
      });

      _this.linkedSubject.next(msg.linked || msg.onlineGuests > 0);
    })); // handle session config updates

    this.subscriptions.add(ws.incomingJSONData$.pipe((0, operators_1.filter)(function (m) {
      return ["GetSessionConfigOK", "SessionConfigUpdated"].includes(m.type);
    })).subscribe(function (m) {
      var msg = m;

      _this.walletLinkAnalytics.sendEvent(init_1.EVENTS.SESSION_CONFIG_RECEIVED, {
        sessionIdHash: Session_1.Session.hash(sessionId),
        metadata_keys: msg && msg.metadata ? Object.keys(msg.metadata) : undefined
      });

      _this.sessionConfigSubject.next({
        webhookId: msg.webhookId,
        webhookUrl: msg.webhookUrl,
        metadata: msg.metadata
      });
    }));
  }
  /**
   * Make a connection to the server
   */


  _createClass(WalletLinkConnection, [{
    key: "connect",
    value: function connect() {
      if (this.destroyed) {
        throw new Error("instance is destroyed");
      }

      this.walletLinkAnalytics.sendEvent(init_1.EVENTS.STARTED_CONNECTING, {
        sessionIdHash: Session_1.Session.hash(this.sessionId)
      });
      this.ws.connect().subscribe();
    }
    /**
     * Terminate connection, and mark as destroyed. To reconnect, create a new
     * instance of WalletLinkConnection
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.subscriptions.unsubscribe();
      this.ws.disconnect();
      this.walletLinkAnalytics.sendEvent(init_1.EVENTS.DISCONNECTED, {
        sessionIdHash: Session_1.Session.hash(this.sessionId)
      });
      this.destroyed = true;
    }
  }, {
    key: "isDestroyed",
    get: function get() {
      return this.destroyed;
    }
    /**
     * Emit true if connected and authenticated, else false
     * @returns an Observable
     */

  }, {
    key: "connected$",
    get: function get() {
      return this.connectedSubject.asObservable();
    }
    /**
     * Emit once connected
     * @returns an Observable
     */

  }, {
    key: "onceConnected$",
    get: function get() {
      return this.connected$.pipe((0, operators_1.filter)(function (v) {
        return v;
      }), (0, operators_1.take)(1), (0, operators_1.map)(function () {
        return void 0;
      }));
    }
    /**
     * Emit true if linked (a guest has joined before)
     * @returns an Observable
     */

  }, {
    key: "linked$",
    get: function get() {
      return this.linkedSubject.asObservable();
    }
    /**
     * Emit once when linked
     * @returns an Observable
     */

  }, {
    key: "onceLinked$",
    get: function get() {
      return this.linked$.pipe((0, operators_1.filter)(function (v) {
        return v;
      }), (0, operators_1.take)(1), (0, operators_1.map)(function () {
        return void 0;
      }));
    }
    /**
     * Emit current session config if available, and subsequent updates
     * @returns an Observable for the session config
     */

  }, {
    key: "sessionConfig$",
    get: function get() {
      return this.sessionConfigSubject.asObservable();
    }
    /**
     * Emit incoming Event messages
     * @returns an Observable for the messages
     */

  }, {
    key: "incomingEvent$",
    get: function get() {
      return this.ws.incomingJSONData$.pipe((0, operators_1.filter)(function (m) {
        if (m.type !== "Event") {
          return false;
        }

        var sme = m;
        return typeof sme.sessionId === "string" && typeof sme.eventId === "string" && typeof sme.event === "string" && typeof sme.data === "string";
      }), (0, operators_1.map)(function (m) {
        return m;
      }));
    }
    /**
     * Set session metadata in SessionConfig object
     * @param key
     * @param value
     * @returns an Observable that completes when successful
     */

  }, {
    key: "setSessionMetadata",
    value: function setSessionMetadata(key, value) {
      var _this2 = this;

      var message = (0, ClientMessage_1.ClientMessageSetSessionConfig)({
        id: (0, types_1.IntNumber)(this.nextReqId++),
        sessionId: this.sessionId,
        metadata: _defineProperty({}, key, value)
      });
      return this.onceConnected$.pipe((0, operators_1.flatMap)(function (_) {
        return _this2.makeRequest(message);
      }), (0, operators_1.map)(function (res) {
        if ((0, ServerMessage_1.isServerMessageFail)(res)) {
          throw new Error(res.error || "failed to set session metadata");
        }
      }));
    }
    /**
     * Publish an event and emit event ID when successful
     * @param event event name
     * @param data event data
     * @param callWebhook whether the webhook should be invoked
     * @returns an Observable that emits event ID when successful
     */

  }, {
    key: "publishEvent",
    value: function publishEvent(event, data) {
      var _this3 = this;

      var callWebhook = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var message = (0, ClientMessage_1.ClientMessagePublishEvent)({
        id: (0, types_1.IntNumber)(this.nextReqId++),
        sessionId: this.sessionId,
        event: event,
        data: data,
        callWebhook: callWebhook
      });
      return this.onceLinked$.pipe((0, operators_1.flatMap)(function (_) {
        return _this3.makeRequest(message);
      }), (0, operators_1.map)(function (res) {
        if ((0, ServerMessage_1.isServerMessageFail)(res)) {
          throw new Error(res.error || "failed to publish event");
        }

        return res.eventId;
      }));
    }
  }, {
    key: "sendData",
    value: function sendData(message) {
      this.ws.sendData(JSON.stringify(message));
    }
  }, {
    key: "updateLastHeartbeat",
    value: function updateLastHeartbeat() {
      this.lastHeartbeatResponse = Date.now();
    }
  }, {
    key: "heartbeat",
    value: function heartbeat() {
      if (Date.now() - this.lastHeartbeatResponse > HEARTBEAT_INTERVAL * 2) {
        this.ws.disconnect();
        return;
      }

      try {
        this.ws.sendData("h");
      } catch (_a) {}
    }
  }, {
    key: "makeRequest",
    value: function makeRequest(message) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : REQUEST_TIMEOUT;
      var reqId = message.id;

      try {
        this.sendData(message);
      } catch (err) {
        return (0, rxjs_1.throwError)(err);
      } // await server message with corresponding id


      return this.ws.incomingJSONData$.pipe((0, operators_1.timeoutWith)(timeout, (0, rxjs_1.throwError)(new Error("request ".concat(reqId, " timed out")))), (0, operators_1.filter)(function (m) {
        return m.id === reqId;
      }), (0, operators_1.take)(1));
    }
  }, {
    key: "authenticate",
    value: function authenticate() {
      var msg = (0, ClientMessage_1.ClientMessageHostSession)({
        id: (0, types_1.IntNumber)(this.nextReqId++),
        sessionId: this.sessionId,
        sessionKey: this.sessionKey
      });
      return this.makeRequest(msg).pipe((0, operators_1.map)(function (res) {
        if ((0, ServerMessage_1.isServerMessageFail)(res)) {
          throw new Error(res.error || "failed to authentcate");
        }
      }));
    }
  }, {
    key: "sendIsLinked",
    value: function sendIsLinked() {
      var msg = (0, ClientMessage_1.ClientMessageIsLinked)({
        id: (0, types_1.IntNumber)(this.nextReqId++),
        sessionId: this.sessionId
      });
      this.sendData(msg);
    }
  }, {
    key: "sendGetSessionConfig",
    value: function sendGetSessionConfig() {
      var msg = (0, ClientMessage_1.ClientMessageGetSessionConfig)({
        id: (0, types_1.IntNumber)(this.nextReqId++),
        sessionId: this.sessionId
      });
      this.sendData(msg);
    }
  }]);

  return WalletLinkConnection;
}();

exports.WalletLinkConnection = WalletLinkConnection;

/***/ }),

/***/ 1659:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientMessagePublishEvent = exports.ClientMessageSetSessionConfig = exports.ClientMessageGetSessionConfig = exports.ClientMessageIsLinked = exports.ClientMessageHostSession = void 0;

function ClientMessageHostSession(params) {
  return Object.assign({
    type: "HostSession"
  }, params);
}

exports.ClientMessageHostSession = ClientMessageHostSession;

function ClientMessageIsLinked(params) {
  return Object.assign({
    type: "IsLinked"
  }, params);
}

exports.ClientMessageIsLinked = ClientMessageIsLinked;

function ClientMessageGetSessionConfig(params) {
  return Object.assign({
    type: "GetSessionConfig"
  }, params);
}

exports.ClientMessageGetSessionConfig = ClientMessageGetSessionConfig;

function ClientMessageSetSessionConfig(params) {
  return Object.assign({
    type: "SetSessionConfig"
  }, params);
}

exports.ClientMessageSetSessionConfig = ClientMessageSetSessionConfig;

function ClientMessagePublishEvent(params) {
  return Object.assign({
    type: "PublishEvent"
  }, params);
}

exports.ClientMessagePublishEvent = ClientMessagePublishEvent;

/***/ }),

/***/ 1660:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RxWebSocket = exports.ConnectionState = void 0;

var rxjs_1 = __webpack_require__(1414);

var operators_1 = __webpack_require__(1433);

var ConnectionState;

(function (ConnectionState) {
  ConnectionState[ConnectionState["DISCONNECTED"] = 0] = "DISCONNECTED";
  ConnectionState[ConnectionState["CONNECTING"] = 1] = "CONNECTING";
  ConnectionState[ConnectionState["CONNECTED"] = 2] = "CONNECTED";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
/**
 * Rx-ified WebSocket
 */


var RxWebSocket = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param url WebSocket server URL
   * @param [WebSocketClass] Custom WebSocket implementation
   */
  function RxWebSocket(url) {
    var WebSocketClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : WebSocket;

    _classCallCheck(this, RxWebSocket);

    this.WebSocketClass = WebSocketClass;
    this.webSocket = null;
    this.connectionStateSubject = new rxjs_1.BehaviorSubject(ConnectionState.DISCONNECTED);
    this.incomingDataSubject = new rxjs_1.Subject();
    this.url = url.replace(/^http/, "ws");
  }
  /**
   * Make a websocket connection
   * @returns an Observable that completes when connected
   */


  _createClass(RxWebSocket, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      if (this.webSocket) {
        return (0, rxjs_1.throwError)(new Error("webSocket object is not null"));
      }

      return new rxjs_1.Observable(function (obs) {
        var webSocket;

        try {
          _this.webSocket = webSocket = new _this.WebSocketClass(_this.url);
        } catch (err) {
          obs.error(err);
          return;
        }

        _this.connectionStateSubject.next(ConnectionState.CONNECTING);

        webSocket.onclose = function (evt) {
          _this.clearWebSocket();

          obs.error(new Error("websocket error ".concat(evt.code, ": ").concat(evt.reason)));

          _this.connectionStateSubject.next(ConnectionState.DISCONNECTED);
        };

        webSocket.onopen = function (_) {
          obs.next();
          obs.complete();

          _this.connectionStateSubject.next(ConnectionState.CONNECTED);
        };

        webSocket.onmessage = function (evt) {
          _this.incomingDataSubject.next(evt.data);
        };
      }).pipe((0, operators_1.take)(1));
    }
    /**
     * Disconnect from server
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      var webSocket = this.webSocket;

      if (!webSocket) {
        return;
      }

      this.clearWebSocket();
      this.connectionStateSubject.next(ConnectionState.DISCONNECTED);

      try {
        webSocket.close();
      } catch (_a) {}
    }
    /**
     * Emit current connection state and subsequent changes
     * @returns an Observable for the connection state
     */

  }, {
    key: "connectionState$",
    get: function get() {
      return this.connectionStateSubject.asObservable();
    }
    /**
     * Emit incoming data from server
     * @returns an Observable for the data received
     */

  }, {
    key: "incomingData$",
    get: function get() {
      return this.incomingDataSubject.asObservable();
    }
    /**
     * Emit incoming JSON data from server. non-JSON data are ignored
     * @returns an Observable for parsed JSON data
     */

  }, {
    key: "incomingJSONData$",
    get: function get() {
      return this.incomingData$.pipe((0, operators_1.flatMap)(function (m) {
        var j;

        try {
          j = JSON.parse(m);
        } catch (err) {
          return (0, rxjs_1.empty)();
        }

        return (0, rxjs_1.of)(j);
      }));
    }
    /**
     * Send data to server
     * @param data text to send
     */

  }, {
    key: "sendData",
    value: function sendData(data) {
      var webSocket = this.webSocket;

      if (!webSocket) {
        throw new Error("websocket is not connected");
      }

      webSocket.send(data);
    }
  }, {
    key: "clearWebSocket",
    value: function clearWebSocket() {
      var webSocket = this.webSocket;

      if (!webSocket) {
        return;
      }

      this.webSocket = null;
      webSocket.onclose = null;
      webSocket.onerror = null;
      webSocket.onmessage = null;
      webSocket.onopen = null;
    }
  }]);

  return RxWebSocket;
}();

exports.RxWebSocket = RxWebSocket;

/***/ }),

/***/ 1661:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isServerMessageFail = void 0;

function isServerMessageFail(msg) {
  return msg && msg.type === "Fail" && typeof msg.id === "number" && typeof msg.sessionId === "string" && typeof msg.error === "string";
}

exports.isServerMessageFail = isServerMessageFail;

/***/ }),

/***/ 1662:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var _regeneratorRuntime = __webpack_require__(12);

var _toConsumableArray = __webpack_require__(434);

var _asyncToGenerator = __webpack_require__(103);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = exports.encrypt = void 0;

var rxjs_1 = __webpack_require__(1414);

var util_1 = __webpack_require__(1399);
/**
 *
 * @param plainText string to be encrypted
 * @param secret hex representation of 32-byte secret
 * returns hex string representation of bytes in the order: initialization vector (iv),
 * auth tag, encrypted plaintext. IV is 12 bytes. Auth tag is 16 bytes. Remaining bytes are the
 * encrypted plainText.
 */


function encrypt(_x, _x2) {
  return _encrypt.apply(this, arguments);
}

function _encrypt() {
  _encrypt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(plainText, secret) {
    var ivBytes, secretKey, enc, encryptedResult, tagLength, authTag, encryptedPlaintext, authTagBytes, encryptedPlaintextBytes, concatted;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(secret.length != 64)) {
              _context2.next = 2;
              break;
            }

            throw Error("secret must be 256 bits");

          case 2:
            ivBytes = crypto.getRandomValues(new Uint8Array(12));
            _context2.next = 5;
            return crypto.subtle.importKey("raw", (0, util_1.hexStringToUint8Array)(secret), {
              "name": "aes-gcm"
            }, false, ["encrypt", "decrypt"]);

          case 5:
            secretKey = _context2.sent;
            enc = new TextEncoder(); // Will return encrypted plainText with auth tag (ie MAC or checksum) appended at the end

            _context2.next = 9;
            return window.crypto.subtle.encrypt({
              name: "AES-GCM",
              iv: ivBytes
            }, secretKey, enc.encode(plainText));

          case 9:
            encryptedResult = _context2.sent;
            tagLength = 16;
            authTag = encryptedResult.slice(encryptedResult.byteLength - tagLength);
            encryptedPlaintext = encryptedResult.slice(0, encryptedResult.byteLength - tagLength);
            authTagBytes = new Uint8Array(authTag);
            encryptedPlaintextBytes = new Uint8Array(encryptedPlaintext);
            concatted = new Uint8Array([].concat(_toConsumableArray(ivBytes), _toConsumableArray(authTagBytes), _toConsumableArray(encryptedPlaintextBytes)));
            return _context2.abrupt("return", (0, util_1.uint8ArrayToHex)(concatted));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _encrypt.apply(this, arguments);
}

exports.encrypt = encrypt;
/**
 *
 * @param cipherText hex string representation of bytes in the order: initialization vector (iv),
 * auth tag, encrypted plaintext. IV is 12 bytes. Auth tag is 16 bytes.
 * @param secret hex string representation of 32-byte secret
 */

function decrypt(cipherText, secret) {
  if (secret.length != 64) throw Error("secret must be 256 bits");
  return new rxjs_1.Observable(function (subscriber) {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var secretKey, encrypted, ivBytes, authTagBytes, encryptedPlaintextBytes, concattedBytes, algo, decrypted, decoder;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return crypto.subtle.importKey("raw", (0, util_1.hexStringToUint8Array)(secret), {
                "name": "aes-gcm"
              }, false, ["encrypt", "decrypt"]);

            case 2:
              secretKey = _context.sent;
              encrypted = (0, util_1.hexStringToUint8Array)(cipherText);
              ivBytes = encrypted.slice(0, 12);
              authTagBytes = encrypted.slice(12, 28);
              encryptedPlaintextBytes = encrypted.slice(28);
              concattedBytes = new Uint8Array([].concat(_toConsumableArray(encryptedPlaintextBytes), _toConsumableArray(authTagBytes)));
              algo = {
                name: "AES-GCM",
                iv: new Uint8Array(ivBytes)
              };
              _context.prev = 9;
              _context.next = 12;
              return window.crypto.subtle.decrypt(algo, secretKey, concattedBytes);

            case 12:
              decrypted = _context.sent;
              decoder = new TextDecoder();
              subscriber.next(decoder.decode(decrypted));
              subscriber.complete();
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](9);
              subscriber.error(_context.t0);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[9, 18]]);
    }))();
  });
}

exports.decrypt = decrypt;

/***/ }),

/***/ 1663:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3RequestCanceledMessage = void 0;

var RelayMessage_1 = __webpack_require__(1485);

function Web3RequestCanceledMessage(id) {
  return {
    type: RelayMessage_1.RelayMessageType.WEB3_REQUEST_CANCELED,
    id: id
  };
}

exports.Web3RequestCanceledMessage = Web3RequestCanceledMessage;

/***/ }),

/***/ 1664:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3RequestMessage = void 0;

var RelayMessage_1 = __webpack_require__(1485);

function Web3RequestMessage(params) {
  return Object.assign({
    type: RelayMessage_1.RelayMessageType.WEB3_REQUEST
  }, params);
}

exports.Web3RequestMessage = Web3RequestMessage;

/***/ }),

/***/ 1665:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EthereumAddressFromSignedMessageResponse = exports.SubmitEthereumTransactionResponse = exports.SignEthereumTransactionResponse = exports.SignEthereumMessageResponse = exports.isRequestEthereumAccountsResponse = exports.RequestEthereumAccountsResponse = exports.SwitchEthereumChainResponse = exports.ErrorResponse = void 0;

var Web3Method_1 = __webpack_require__(1539);

function ErrorResponse(method, errorMessage) {
  return {
    method: method,
    errorMessage: errorMessage
  };
}

exports.ErrorResponse = ErrorResponse;

function SwitchEthereumChainResponse(isApproved) {
  return {
    method: Web3Method_1.Web3Method.switchEthereumChain,
    result: isApproved
  };
}

exports.SwitchEthereumChainResponse = SwitchEthereumChainResponse;

function RequestEthereumAccountsResponse(addresses) {
  return {
    method: Web3Method_1.Web3Method.requestEthereumAccounts,
    result: addresses
  };
}

exports.RequestEthereumAccountsResponse = RequestEthereumAccountsResponse;

function isRequestEthereumAccountsResponse(res) {
  return res && res.method === Web3Method_1.Web3Method.requestEthereumAccounts;
}

exports.isRequestEthereumAccountsResponse = isRequestEthereumAccountsResponse;

function SignEthereumMessageResponse(signature) {
  return {
    method: Web3Method_1.Web3Method.signEthereumMessage,
    result: signature
  };
}

exports.SignEthereumMessageResponse = SignEthereumMessageResponse;

function SignEthereumTransactionResponse(signedData) {
  return {
    method: Web3Method_1.Web3Method.signEthereumTransaction,
    result: signedData
  };
}

exports.SignEthereumTransactionResponse = SignEthereumTransactionResponse;

function SubmitEthereumTransactionResponse(txHash) {
  return {
    method: Web3Method_1.Web3Method.submitEthereumTransaction,
    result: txHash
  };
}

exports.SubmitEthereumTransactionResponse = SubmitEthereumTransactionResponse;

function EthereumAddressFromSignedMessageResponse(address) {
  return {
    method: Web3Method_1.Web3Method.ethereumAddressFromSignedMessage,
    result: address
  };
}

exports.EthereumAddressFromSignedMessageResponse = EthereumAddressFromSignedMessageResponse;

/***/ }),

/***/ 1666:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWeb3ResponseMessage = exports.Web3ResponseMessage = void 0;

var RelayMessage_1 = __webpack_require__(1485);

function Web3ResponseMessage(params) {
  return Object.assign({
    type: RelayMessage_1.RelayMessageType.WEB3_RESPONSE
  }, params);
}

exports.Web3ResponseMessage = Web3ResponseMessage;

function isWeb3ResponseMessage(msg) {
  return msg && msg.type === RelayMessage_1.RelayMessageType.WEB3_RESPONSE;
}

exports.isWeb3ResponseMessage = isWeb3ResponseMessage;

/***/ }),

/***/ 1667:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(58);

var _createClass = __webpack_require__(78);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkRelayEventManager = void 0;

var util_1 = __webpack_require__(1399);

var WalletLinkRelayEventManager = /*#__PURE__*/function () {
  function WalletLinkRelayEventManager() {
    _classCallCheck(this, WalletLinkRelayEventManager);

    this._nextRequestId = 0;
    this.callbacks = new Map();
  }

  _createClass(WalletLinkRelayEventManager, [{
    key: "makeRequestId",
    value: function makeRequestId() {
      // max nextId == max int32 for compatibility with mobile
      this._nextRequestId = (this._nextRequestId + 1) % 0x7fffffff;
      var id = this._nextRequestId;
      var idStr = (0, util_1.prepend0x)(id.toString(16)); // unlikely that this will ever be an issue, but just to be safe

      var callback = this.callbacks.get(idStr);

      if (callback) {
        this.callbacks.delete(idStr);
      }

      return id;
    }
  }]);

  return WalletLinkRelayEventManager;
}();

exports.WalletLinkRelayEventManager = WalletLinkRelayEventManager;

/***/ }),

/***/ 1668:
/***/ (function(module) {

module.exports = JSON.parse("{\"_args\":[[\"walletlink@2.2.10\",\"/Users/shoekure/Dev/Swingby/barnbridge-frontend\"]],\"_from\":\"walletlink@2.2.10\",\"_id\":\"walletlink@2.2.10\",\"_inBundle\":false,\"_integrity\":\"sha512-6txfqP2M6WhMtyptOlrGGaY91Ty97dbBFWCbcL8Y+4N+9nuUD+9II8XibpYLHduZQ+KdyIyA9jiYfjPE9+HkmA==\",\"_location\":\"/walletlink\",\"_phantomChildren\":{\"fast-safe-stringify\":\"2.1.1\"},\"_requested\":{\"type\":\"version\",\"registry\":true,\"raw\":\"walletlink@2.2.10\",\"name\":\"walletlink\",\"escapedName\":\"walletlink\",\"rawSpec\":\"2.2.10\",\"saveSpec\":null,\"fetchSpec\":\"2.2.10\"},\"_requiredBy\":[\"/@web3-react/walletlink-connector\"],\"_resolved\":\"https://registry.npmjs.org/walletlink/-/walletlink-2.2.10.tgz\",\"_spec\":\"2.2.10\",\"_where\":\"/Users/shoekure/Dev/Swingby/barnbridge-frontend\",\"author\":{\"name\":\"Coinbase, Inc.\"},\"bugs\":{\"url\":\"https://github.com/walletlink/walletlink/issues\"},\"dependencies\":{\"@metamask/safe-event-emitter\":\"2.0.0\",\"bind-decorator\":\"^1.0.11\",\"bn.js\":\"^5.1.1\",\"clsx\":\"^1.1.0\",\"eth-block-tracker\":\"4.4.3\",\"eth-json-rpc-filters\":\"4.2.2\",\"eth-rpc-errors\":\"4.0.2\",\"js-sha256\":\"0.9.0\",\"json-rpc-engine\":\"6.1.0\",\"keccak\":\"^3.0.1\",\"preact\":\"^10.5.9\",\"rxjs\":\"^6.6.3\",\"stream-browserify\":\"^3.0.0\"},\"description\":\"WalletLink JavaScript SDK\",\"devDependencies\":{\"@types/bn.js\":\"^4.11.6\",\"@types/node\":\"^14.14.20\",\"browserify\":\"17.0.0\",\"copy-webpack-plugin\":\"^6.4.1\",\"core-js\":\"^3.8.2\",\"jasmine\":\"3.8.0\",\"karma\":\"^6.3.2\",\"karma-browserify\":\"8.1.0\",\"karma-chrome-launcher\":\"^3.1.0\",\"karma-jasmine\":\"^4.0.1\",\"nodemon\":\"^2.0.6\",\"raw-loader\":\"^4.0.2\",\"regenerator-runtime\":\"^0.13.7\",\"rxjs-tslint\":\"^0.1.7\",\"sass\":\"^1.32.0\",\"svgo\":\"^2.8.0\",\"ts-jest\":\"^26.4.4\",\"ts-loader\":\"^8.0.13\",\"tslib\":\"^2.0.3\",\"tslint\":\"^6.1.3\",\"tslint-config-prettier\":\"^1.18.0\",\"tslint-config-security\":\"^1.16.0\",\"tslint-microsoft-contrib\":\"^6.2.0\",\"typescript\":\"^4.1.3\",\"watchify\":\"4.0.0\",\"webpack\":\"^5.49.0\",\"webpack-cli\":\"^3.3.12\",\"whatwg-fetch\":\"^3.5.0\"},\"engines\":{\"node\":\">= 10.0.0\"},\"homepage\":\"https://github.com/walletlink/walletlink#readme\",\"jest\":{\"transform\":{\"^.+\\\\.tsx?$\":\"ts-jest\"},\"testEnvironment\":\"node\",\"testPathIgnorePatterns\":[\"<rootDir>/dist/\",\"<rootDir>/node_modules/\"],\"testRegex\":\"(/__tests__/.*|\\\\.(test|spec))\\\\.(ts|tsx|js)$\",\"moduleFileExtensions\":[\"ts\",\"js\",\"json\"]},\"keywords\":[\"cipher\",\"cipherbrowser\",\"coinbase\",\"coinbasewallet\",\"eth\",\"ether\",\"ethereum\",\"etherium\",\"injection\",\"toshi\",\"wallet\",\"walletlink\",\"web3\"],\"license\":\"Apache-2.0\",\"main\":\"dist/index.js\",\"name\":\"walletlink\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/walletlink/walletlink.git\"},\"scripts\":{\"build\":\"node compile-assets.js && webpack --config webpack.config.js\",\"build-chrome\":\"webpack --config webpack.config.chrome.js\",\"build-npm\":\"tsc -p ./tsconfig.build.json\",\"build:dev\":\"export WALLETLINK_URL='http://localhost:3000'; yarn build && yarn build-chrome\",\"build:dev:watch\":\"nodemon -e 'ts,tsx,js,json,css,scss,svg' --ignore 'src/**/*-css.ts' --ignore 'src/**/*-svg.ts' --watch src/ --watch chrome/ --exec 'yarn build:dev'\",\"build:prod\":\"yarn build && yarn build-chrome && yarn build-npm && cp ./package.json ../README.md ../LICENSE build/npm && cp -a src/vendor-js build/npm/dist && sed -i.bak 's|  \\\"private\\\": true,||g' build/npm/package.json && rm -f build/npm/package.json.bak\",\"lint\":\"tslint -p . 'src/**/*.ts{,x}'\",\"lint:watch\":\"nodemon -e ts,tsx,js,json,css,scss,svg --watch src/ --exec 'yarn tsc && yarn lint'\",\"test\":\"yarn build-npm && karma start\",\"tsc\":\"tsc --noEmit --pretty\"},\"types\":\"dist/index.d.ts\",\"version\":\"2.2.10\"}");

/***/ })

}]);