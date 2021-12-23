(this["webpackJsonpbarnbridge-frontend"] = this["webpackJsonpbarnbridge-frontend"] || []).push([[1],{

/***/ 1008:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"primary":"s_primary__3PtGh","small":"s_small__3ls_q","iconOnly":"s_iconOnly__ETROW","normal":"s_normal__1OPGF","big":"s_big__1aEz0","disabled":"s_disabled__OEngC","secondary":"s_secondary__1mtkq","ghost":"s_ghost__1qL06","ghost-alt":"s_ghost-alt__36vYM","text":"s_text__1tKaK","text-alt":"s_text-alt__39wNX","link":"s_link__1O5LA","spinner":"s_spinner__2RLWA","rotate":"s_rotate__2J7kr"};

/***/ }),

/***/ 1010:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1017:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1019:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"footer":"s_footer__34P4z","footerTop":"s_footerTop__2sIuG","footerTopLeft":"s_footerTopLeft__25pCb","logo":"s_logo__1cKJq","socialLinks":"s_socialLinks__2V9bE","footerTopRight":"s_footerTopRight__3krC1","navSection":"s_navSection__2Axa4","footerBottom":"s_footerBottom__nDNl4","copyright":"s_copyright__k2R6D","footerBottomLinks":"s_footerBottomLinks__3uVU_"};

/***/ }),

/***/ 1033:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(420);
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd_lib_modal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var components_antd_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(79);
/* harmony import */ var components_custom_grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(51);
/* harmony import */ var components_custom_typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11);
/* harmony import */ var components_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(35);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(419);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
var _excluded=["className","children","confirmClose","confirmText","onCancel"];var Modal=function Modal(props){var className=props.className,children=props.children,_props$confirmClose=props.confirmClose,confirmClose=_props$confirmClose===void 0?false:_props$confirmClose,confirmText=props.confirmText,onCancel=props.onCancel,modalProps=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(props,_excluded);var _React$useState=react__WEBPACK_IMPORTED_MODULE_3___default.a.useState(false),_React$useState2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_React$useState,2),confirmVisible=_React$useState2[0],showConfirm=_React$useState2[1];function handleCancel(){if(confirmClose){showConfirm(true);}else{onCancel===null||onCancel===void 0?void 0:onCancel();}}return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxs"])(antd_lib_modal__WEBPACK_IMPORTED_MODULE_4___default.a,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({zIndex:1000,className:classnames__WEBPACK_IMPORTED_MODULE_5___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_10___default.a.component,className),visible:true,centered:true,footer:null,closeIcon:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])(components_icon__WEBPACK_IMPORTED_MODULE_9__[/* Icon */ "a"],{name:"close"}),onCancel:handleCancel},modalProps),{},{children:[children,confirmVisible&&/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])(antd_lib_modal__WEBPACK_IMPORTED_MODULE_4___default.a,{zIndex:1001,className:_s_module_scss__WEBPACK_IMPORTED_MODULE_10___default.a.component,visible:true,centered:true,footer:null,closeIcon:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["Fragment"],{}),onCancel:function onCancel(){return showConfirm(false);},children:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxs"])(components_custom_grid__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"],{flow:"row",gap:32,children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])(components_custom_typography__WEBPACK_IMPORTED_MODULE_8__[/* Text */ "b"],{type:"p2",weight:"semibold",color:"secondary",children:confirmText}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxs"])(components_custom_grid__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"],{flow:"col",justify:"space-between",children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])(components_antd_button__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"],{type:"ghost",onClick:function onClick(){return showConfirm(false);},children:"No"}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])(components_antd_button__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"],{type:"primary",onClick:onCancel,children:"Yes"})]})]})})]}));};/* harmony default export */ __webpack_exports__["a"] = (Modal);

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hint; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var components_antd_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(115);
/* harmony import */ var components_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(35);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(136);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
var _excluded=["tag","type","weight","color","align","ellipsis","wrap","className","children","tooltip"];var Text=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.memo(function(props){var _cn;var _props$tag=props.tag,tag=_props$tag===void 0?'div':_props$tag,type=props.type,weight=props.weight,color=props.color,align=props.align,ellipsis=props.ellipsis,wrap=props.wrap,className=props.className,children=props.children,tooltip=props.tooltip,textProps=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(props,_excluded);var textComponent=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(tag,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({className:classnames__WEBPACK_IMPORTED_MODULE_4___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.text,_s_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a[type],className,(_cn={},Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_cn,_s_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.hasTooltip,tooltip),Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_cn,_s_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a["weight-".concat(weight)],weight),Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_cn,_s_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a["".concat(color,"-color")],color),Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_cn,"text-".concat(align),align),Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_cn,'text-ellipsis',ellipsis),Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_cn,'text-wrap',wrap),Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_cn,'text-nowrap',wrap===false),_cn))},textProps),children);return tooltip?/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])(components_antd_tooltip__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"],{title:tooltip,className:classnames__WEBPACK_IMPORTED_MODULE_4___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.tooltip,'text-p2','primary-color')// overlayStyle={overlayStyle}
// overlayInnerStyle={overlayStyle}
,children:textComponent}):textComponent;});var Hint=function Hint(props){var text=props.text,className=props.className,maxWidth=props.maxWidth,children=props.children;if(!text){return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["Fragment"],{children:children});}var overlayStyle=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({},maxWidth!==undefined&&{maxWidth:"".concat(maxWidth,"px")});return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxs"])("div",{className:classnames__WEBPACK_IMPORTED_MODULE_4___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.hint,className),children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])("span",{children:children}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])(components_antd_tooltip__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"],{title:text,className:classnames__WEBPACK_IMPORTED_MODULE_4___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.tooltip,'text-p2','primary-color'),overlayStyle:overlayStyle,overlayInnerStyle:overlayStyle,children:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__["jsx"])(components_icon__WEBPACK_IMPORTED_MODULE_6__[/* Icon */ "a"],{name:"info",size:16,className:_s_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.icon,color:"icon"})})]});};

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(340);
/* harmony import */ var antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(637);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
var _excluded=["overlayClassName","children"];var Tooltip=function Tooltip(props){var overlayClassName=props.overlayClassName,children=props.children,tooltipProps=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props,_excluded);return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])(antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_3___default.a,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({title:"",placement:"bottom",overlayClassName:classnames__WEBPACK_IMPORTED_MODULE_4___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.overlay,overlayClassName)},tooltipProps),{},{children:children}));};/* harmony default export */ __webpack_exports__["a"] = (Tooltip);

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useReload; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _rooks_use_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(463);
function useReload(){var _React$useState=react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(0),_React$useState2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_React$useState,2),version=_React$useState2[0],setVersion=_React$useState2[1];var reloadRef=react__WEBPACK_IMPORTED_MODULE_1___default.a.useRef(Object(_rooks_use_debounce__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(function(){setVersion(function(prevState){return prevState+1;});},400));return[reloadRef.current,version];}

/***/ }),

/***/ 1330:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"text":"s_text__hBZHE","weight-semibold":"s_weight-semibold__3nEFw","weight-bold":"s_weight-bold__3Fsf9","h1":"s_h1___lRi-","h2":"s_h2__ztgjT","h3":"s_h3__3dCQY","p1":"s_p1__2yd3a","p2":"s_p2__3cm5P","lb1":"s_lb1__3vcTw","lb2":"s_lb2__3ugFi","small":"s_small__2PLN6","primary-color":"s_primary-color__1-UdC","secondary-color":"s_secondary-color__3dFPp","red-color":"s_red-color__LP9J2","green-color":"s_green-color__3SAtx","blue-color":"s_blue-color__2U15L","purple-color":"s_purple-color__2igd7","yellow-color":"s_yellow-color__3101y","hasTooltip":"s_hasTooltip__3yQd_","hint":"s_hint__1bbn7","tooltip":"s_tooltip__2aYKI","icon":"s_icon__2sKpm"};

/***/ }),

/***/ 1365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/styles/index.scss
var styles = __webpack_require__(692);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__(296);

// EXTERNAL MODULE: ./node_modules/bignumber.js/bignumber.js
var bignumber = __webpack_require__(16);
var bignumber_default = /*#__PURE__*/__webpack_require__.n(bignumber);

// CONCATENATED MODULE: ./src/utils/bignumber.ts
bignumber_default.a.ZERO=new bignumber_default.a(0);bignumber_default.a.MAX_UINT_256=new bignumber_default.a(2).pow(256).minus(1);bignumber_default.a.from=function(value){if(value===undefined||value===null){return undefined;}var bnValue=new bignumber_default.a(value);if(bnValue.isNaN()){return undefined;}return bnValue;};bignumber_default.a.parse=function(value){return new bignumber_default.a(value);};bignumber_default.a.sumEach=function(items,predicate){var sum=bignumber_default.a.ZERO;var _iterator=Object(createForOfIteratorHelper["a" /* default */])(items),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var _item=_step.value;var val=predicate===null||predicate===void 0?void 0:predicate(_item);if(!val||val.isNaN()){return undefined;}sum=sum.plus(val);}}catch(err){_iterator.e(err);}finally{_iterator.f();}return sum;};bignumber_default.a.prototype.scaleBy=function(decimals){if(decimals===undefined){return undefined;}return this.multipliedBy(Math.pow(10,decimals));};bignumber_default.a.prototype.unscaleBy=function(decimals){if(decimals===undefined){return undefined;}return this.dividedBy(Math.pow(10,decimals));};bignumber_default.a.prototype.round=function(){return new bignumber_default.a(this.toPrecision(1,0));};
// EXTERNAL MODULE: ./src/utils.ts
var utils = __webpack_require__(71);

// EXTERNAL MODULE: ./src/web3/utils.ts
var web3_utils = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(53);

// EXTERNAL MODULE: ./node_modules/react-provider-tree/dist/index.js
var dist = __webpack_require__(635);

// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(64);

// EXTERNAL MODULE: ./src/web3/components/contractManagerProvider.tsx
var contractManagerProvider = __webpack_require__(75);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper.js + 2 modules
var createSuper = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/antd/lib/notification/index.js
var lib_notification = __webpack_require__(357);
var notification_default = /*#__PURE__*/__webpack_require__.n(lib_notification);

// EXTERNAL MODULE: ./node_modules/antd/lib/result/index.js
var result = __webpack_require__(650);
var result_default = /*#__PURE__*/__webpack_require__.n(result);

// EXTERNAL MODULE: ./src/components/custom/typography/index.tsx
var typography = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(1);

// CONCATENATED MODULE: ./src/components/custom/error-boundary/index.tsx
var error_boundary_ErrorBoundary=/*#__PURE__*/function(_React$Component){Object(inherits["a" /* default */])(ErrorBoundary,_React$Component);var _super=Object(createSuper["a" /* default */])(ErrorBoundary);function ErrorBoundary(props){var _this;Object(classCallCheck["a" /* default */])(this,ErrorBoundary);_this=_super.call(this,props);_this.handleRefresh=function(){window.location.href="".concat(window.location.href);};_this.state={error:undefined};return _this;}Object(createClass["a" /* default */])(ErrorBoundary,[{key:"componentDidCatch",value:function componentDidCatch(error){this.setState({error:error});notification_default.a.error({message:error.message});}},{key:"render",value:function render(){if(this.state.error){return/*#__PURE__*/Object(jsx_runtime["jsx"])(result_default.a,{className:"absolute-center",status:"500",title:/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"h2",weight:"semibold",color:"primary",children:"500"}),subTitle:/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:"Sorry, something went wrong."}),extra:/*#__PURE__*/Object(jsx_runtime["jsx"])("button",{type:"button",className:"button-primary button-small",style:{margin:'0 auto'},onClick:this.handleRefresh,children:"Refresh page"})});}return this.props.children;}}]);return ErrorBoundary;}(react_default.a.Component);
// EXTERNAL MODULE: ./src/components/providers/configProvider.tsx
var configProvider = __webpack_require__(49);

// EXTERNAL MODULE: ./src/components/providers/generalProvider.tsx
var generalProvider = __webpack_require__(98);

// EXTERNAL MODULE: ./src/components/providers/knownTokensProvider.tsx
var knownTokensProvider = __webpack_require__(191);

// EXTERNAL MODULE: ./src/components/providers/networkProvider.tsx
var networkProvider = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/react-use-storage/lib/esm/index.js
var esm = __webpack_require__(133);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(7);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/date-fns/esm/index.js + 196 modules
var date_fns_esm = __webpack_require__(630);

// EXTERNAL MODULE: ./node_modules/date-fns/esm/format/index.js + 2 modules
var format = __webpack_require__(158);

// EXTERNAL MODULE: ./node_modules/date-fns/esm/isThisWeek/index.js
var isThisWeek = __webpack_require__(311);

// EXTERNAL MODULE: ./node_modules/date-fns/esm/isToday/index.js
var isToday = __webpack_require__(312);

// EXTERNAL MODULE: ./src/web3/erc20Contract.ts
var web3_erc20Contract = __webpack_require__(94);

// EXTERNAL MODULE: ./src/components/button/index.tsx
var components_button = __webpack_require__(43);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/nanoid/index.browser.js + 1 modules
var index_browser = __webpack_require__(251);

// CONCATENATED MODULE: ./src/components/custom/icon-notification/index.tsx
var _excluded=["bubble","style","width","height","notificationSize","notificationGap","children"];var icon_notification_IconNotification=function IconNotification(props){var bubble=props.bubble,_props$style=props.style,style=_props$style===void 0?{}:_props$style,_props$width=props.width,width=_props$width===void 0?24:_props$width,_props$height=props.height,height=_props$height===void 0?24:_props$height,_props$notificationSi=props.notificationSize,notificationSize=_props$notificationSi===void 0?10:_props$notificationSi,_props$notificationGa=props.notificationGap,notificationGap=_props$notificationGa===void 0?2:_props$notificationGa,children=props.children,rest=Object(objectWithoutProperties["a" /* default */])(props,_excluded);var id=react_default.a.useMemo(function(){return Object(index_browser["a" /* nanoid */])();},[]);return/*#__PURE__*/Object(jsx_runtime["jsxs"])("svg",Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({role:"none",style:Object(objectSpread2["a" /* default */])({width:width,height:height},style)},rest),{},{children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("mask",{id:id,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])("rect",{width:width,height:height,fill:"white"}),/*#__PURE__*/Object(jsx_runtime["jsx"])("circle",{cx:width-notificationSize/2,cy:notificationSize/2,fill:"black",r:notificationSize/2+notificationGap})]}),/*#__PURE__*/Object(jsx_runtime["jsx"])("g",{mask:bubble?"url(#".concat(id,")"):'',children:children}),bubble&&/*#__PURE__*/Object(jsx_runtime["jsx"])("circle",{cx:width-notificationSize/2,cy:notificationSize/2,fill:"var(--theme-red-color)",r:notificationSize/2})]}));};/* harmony default export */ var icon_notification = (icon_notification_IconNotification);
// EXTERNAL MODULE: ./src/components/icon/index.tsx
var icon = __webpack_require__(35);

// EXTERNAL MODULE: ./src/hooks/useReload.ts
var useReload = __webpack_require__(127);

// CONCATENATED MODULE: ./src/components/custom/notification/icon.tsx
var icon_NotificationIcon=function NotificationIcon(_ref){var rgbVarName=_ref.rgbVarName,children=_ref.children;var width=40;var height=40;var childWidth=24;var childHeight=24;return/*#__PURE__*/Object(jsx_runtime["jsxs"])("svg",{role:"none",style:{width:width,height:height},children:[/*#__PURE__*/Object(jsx_runtime["jsx"])("circle",{cx:"50%",cy:"50%",fill:"rgba(var(".concat(rgbVarName,"), 0.08)"),r:"20"}),/*#__PURE__*/react_default.a.isValidElement(children)&&/*#__PURE__*/react_default.a.cloneElement(children,{width:childWidth,height:childHeight,x:(width-childWidth)/2,y:(height-childHeight)/2})]});};/* harmony default export */ var notification_icon = (icon_NotificationIcon);
// EXTERNAL MODULE: ./src/components/custom/notification/s.module.scss
var s_module = __webpack_require__(221);
var s_module_default = /*#__PURE__*/__webpack_require__.n(s_module);

// CONCATENATED MODULE: ./src/components/custom/notification/index.tsx
// @ts-ignore
window['dateFns']=date_fns_esm;var colorPairs={green:['--theme-green-color','--theme-green-color-rgb'],red:['--theme-red-color','--theme-red-color-rgb'],blue:['--theme-blue-color','--theme-blue-color-rgb']};var SYContractsMap=new Map();function getProposalLink(id){return/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router_dom["b" /* Link */],{className:"link-blue",to:"/governance/proposals/".concat(id),children:"PID-".concat(id)});}function getStrongText(){var text=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';return/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p2",tag:"strong",weight:"bold",color:"primary",children:text});}function useGetData(n){var _getHumanValue,_n$metadata$amount;var _useReload=Object(useReload["a" /* useReload */])(),_useReload2=Object(slicedToArray["a" /* default */])(_useReload,1),reload=_useReload2[0];var knownTokens=Object(knownTokensProvider["b" /* useKnownTokens */])();var _useContractManager=Object(contractManagerProvider["c" /* useContractManager */])(),getContract=_useContractManager.getContract;switch(n.notificationType){case'proposal-created':return['file-add',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsxs"])(jsx_runtime["Fragment"],{children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",className:"mb-16",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has been created by",' ',getStrongText(Object(web3_utils["f" /* shortenAddr */])(n.metadata.proposer))," and entered the warm-up phase. You have",' ',getStrongText(Object(utils["c" /* getRelativeTime */])(n.metadata.displayDuration))," to stake your BOND"]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router_dom["b" /* Link */],{to:"/governance/portfolio/deposit",className:"button-primary",children:"Deposit now"})]})];case'proposal-activating-soon':return['timer',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Voting on proposal ",getProposalLink(n.metadata.proposalId)," starts in ",getStrongText('5 minutes')]})];case'proposal-canceled':return['file-failed',colorPairs.red,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has been cancelled by",' ',/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["b" /* ExplorerAddressLink */],{address:n.metadata.caller,variation:"link",children:Object(web3_utils["f" /* shortenAddr */])(n.metadata.caller)})]})];case'proposal-voting-open':return['judge',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has entered the voting period. You have",' ',getStrongText(Object(utils["c" /* getRelativeTime */])(n.metadata.displayDuration))," to cast your vote"]})];case'proposal-voting-ending-soon':return['judge',colorPairs.red,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Voting on proposal ",getProposalLink(n.metadata.proposalId)," ends in ",getStrongText('5 minutes')]})];case'proposal-outcome':return['file-clock',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:n.message})];case'proposal-accepted':return['file-clock',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has been accepted with",' ',getStrongText("".concat(n.metadata.votedRatio,"%"))," votes for. You have",' ',getStrongText(Object(utils["c" /* getRelativeTime */])(n.metadata.displayDuration))," to queue it for execution"]})];case'proposal-failed-quorum':return['file-failed',colorPairs.red,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has not met quorum and has been rejected"]})];case'proposal-failed-votes':return['file-failed',colorPairs.red,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has been rejected with ",n.metadata.votedRatio,"% votes against"]})];case'proposal-queued':return['queue',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has been queued for execution by",' ',getStrongText(Object(web3_utils["f" /* shortenAddr */])(n.metadata.caller)),". You have",' ',getStrongText(Object(utils["c" /* getRelativeTime */])(n.metadata.displayDuration))," to create an abrogation proposal"]})];case'proposal-queue-ending-soon':return['queue',colorPairs.red,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Queue period on proposal ",getProposalLink(n.metadata.proposalId)," ends in ",getStrongText('5 minutes')]})];case'proposal-grace':return['gear',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has passed the queue period. You have",' ',getStrongText(Object(utils["c" /* getRelativeTime */])(n.metadata.displayDuration))," to execute it"]})];case'proposal-executed':return['file-check',colorPairs.green,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has been executed by",' ',getStrongText(Object(web3_utils["f" /* shortenAddr */])(n.metadata.caller))]})];case'proposal-expires-soon':return['docs',colorPairs.red,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," expires in ",getStrongText('5 minutes')]})];case'proposal-expired':return['file-failed',colorPairs.red,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has expired"]})];case'abrogation-proposal-created':return['proposal-canceled',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Abrogation proposal for proposal ",getProposalLink(n.metadata.proposalId)," has been created by",' ',getStrongText(Object(web3_utils["f" /* shortenAddr */])(n.metadata.proposer)),". You have",' ',getStrongText(Object(utils["c" /* getRelativeTime */])(n.metadata.displayDuration))," to vote on the abrogation proposal"]})];case'proposal-abrogated':return['file-failed',colorPairs.red,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:["Proposal ",getProposalLink(n.metadata.proposalId)," has been abrogated"]})];case'delegate-start':return['delegated',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:[getStrongText("".concat((_getHumanValue=Object(web3_utils["e" /* getHumanValue */])(new bignumber_default.a((_n$metadata$amount=n.metadata.amount)!==null&&_n$metadata$amount!==void 0?_n$metadata$amount:0),knownTokens.projectToken.decimals))===null||_getHumanValue===void 0?void 0:_getHumanValue.toFixed()," v").concat(knownTokens.projectToken.symbol)),' ',"has been delegated to you from",' ',/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["b" /* ExplorerAddressLink */],{address:n.metadata.from,className:"link-blue",children:Object(web3_utils["f" /* shortenAddr */])(n.metadata.from)})]})];case'smart-yield-token-bought':{var _formatToken,_BigNumber$from,_erc20Contract$symbol;var erc20Contract=SYContractsMap.get(n.metadata.syPoolAddress);if(!erc20Contract){erc20Contract=getContract(n.metadata.syPoolAddress,function(){return new web3_erc20Contract["a" /* default */]([],n.metadata.syPoolAddress);});SYContractsMap.set(n.metadata.syPoolAddress,erc20Contract);erc20Contract.loadCommon().then(function(){return reload();}).catch(Error);}return['stake',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsxs"])(jsx_runtime["Fragment"],{children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",className:"mb-16",children:["Stake your",' ',getStrongText("".concat((_formatToken=Object(web3_utils["b" /* formatToken */])((_BigNumber$from=bignumber_default.a.from(n.metadata.amount))===null||_BigNumber$from===void 0?void 0:_BigNumber$from.unscaleBy(erc20Contract.decimals)))!==null&&_formatToken!==void 0?_formatToken:'-'," ").concat((_erc20Contract$symbol=erc20Contract.symbol)!==null&&_erc20Contract$symbol!==void 0?_erc20Contract$symbol:'')),' ',"to earn extra yield"]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router_dom["b" /* Link */],{to:"/smart-yield/pool?m=".concat(n.metadata.protocolId,"&t=").concat(n.metadata.underlyingSymbol),className:"button-primary",children:"Stake now"})]})];}default:console.log("Unsupported notification type: ".concat(JSON.stringify(n)));return['bell',colorPairs.blue,/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:n.message})];}}function getIcon(name,colors,bubble){return/*#__PURE__*/Object(jsx_runtime["jsx"])(icon_notification,{width:40,height:40,className:"mr-16",bubble:bubble,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(notification_icon,{rgbVarName:colors[1],children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:name,size:"24",style:{color:"var(".concat(colors[0],")")}})})});}function formatTime(date){if(Object(isToday["a" /* default */])(date)){return Object(format["a" /* default */])(date,'HH:mm');}if(Object(isThisWeek["a" /* default */])(date)){return Object(format["a" /* default */])(date,'EEEEEE');}return Object(format["a" /* default */])(date,'dd MMM yyyy');}var notification_Notification=function Notification(_ref){var n=_ref.n;var _useNotifications=useNotifications(),notificationsReadUntil=_useNotifications.notificationsReadUntil;var _useGetData=useGetData(n),_useGetData2=Object(slicedToArray["a" /* default */])(_useGetData,3),iconName=_useGetData2[0],colors=_useGetData2[1],content=_useGetData2[2];var date=new Date(n.startsOn*1000);var isUnread=notificationsReadUntil?notificationsReadUntil<n.startsOn:false;return/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:s_module_default.a.n,children:[getIcon(iconName,colors,isUnread),/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{style:{flexGrow:1},children:content}),/*#__PURE__*/Object(jsx_runtime["jsx"])("time",{className:s_module_default.a.time,dateTime:date.toJSON(),title:date.toJSON(),children:formatTime(date)})]});};var notification_Toast=function Toast(_ref2){var n=_ref2.n,onClose=_ref2.onClose,timeout=_ref2.timeout;var _useGetData3=useGetData(n),_useGetData4=Object(slicedToArray["a" /* default */])(_useGetData3,3),iconName=_useGetData4[0],colors=_useGetData4[1],content=_useGetData4[2];Object(react["useEffect"])(function(){if(timeout&&timeout!==Infinity){setTimeout(onClose,timeout,n.id);}},[timeout]);return/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:classnames_default()(s_module_default.a.n,s_module_default.a.toast),children:[getIcon(iconName,colors,false),/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{style:{flexGrow:1},children:content}),/*#__PURE__*/Object(jsx_runtime["jsx"])("button",{type:"button",onClick:function onClick(){return onClose(n.id);},className:s_module_default.a.close,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"close",size:"24"})})]});};
// EXTERNAL MODULE: ./src/wallets/walletProvider.tsx + 16 modules
var walletProvider = __webpack_require__(80);

// EXTERNAL MODULE: ./src/utils/context.ts
var context = __webpack_require__(62);

// CONCATENATED MODULE: ./src/components/providers/notificationsProvider.tsx
var Context=/*#__PURE__*/Object(react["createContext"])(Object(context["a" /* InvariantContext */])('NotificationsProvider'));var notificationsNode=document.querySelector('#notifications-root');var notificationsProvider_NotificationsProvider=function NotificationsProvider(_ref){var children=_ref.children;var config=Object(configProvider["b" /* useConfig */])();var wallet=Object(walletProvider["c" /* useWallet */])();var _useState=Object(react["useState"])([]),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),notifications=_useState2[0],setNotifications=_useState2[1];var _useState3=Object(react["useState"])([]),_useState4=Object(slicedToArray["a" /* default */])(_useState3,2),toasts=_useState4[0],setToasts=_useState4[1];var _useState5=Object(react["useState"])(1),_useState6=Object(slicedToArray["a" /* default */])(_useState5,2),notificationsReadUntil=_useState6[0],setNotificationsReadUntil=_useState6[1];var _useLocalStorage=Object(esm["a" /* useLocalStorage */])('bb_notifications_read_until'),_useLocalStorage2=Object(slicedToArray["a" /* default */])(_useLocalStorage,3),storedReadUntil=_useLocalStorage2[0],setStoredReadUntil=_useLocalStorage2[1],removeStoredReadUntil=_useLocalStorage2[2];var addToast=Object(react["useCallback"])(function(notification){setToasts(function(ns){return[].concat(Object(toConsumableArray["a" /* default */])(ns),[notification]);});},[]);var removeToast=Object(react["useCallback"])(function(id){setToasts(function(prevNotifications){return prevNotifications.filter(function(n){return n.id!==id;});});},[]);Object(react["useEffect"])(function(){if(storedReadUntil){setNotificationsReadUntil(Number(storedReadUntil));}},[]);function fetchNotifications(_ref2){var target=_ref2.target,timestamp=_ref2.timestamp;var url=new URL('/api/notifications/list',config.api.baseUrl);if(target){url.searchParams.set('target',target);}if(timestamp){url.searchParams.set('timestamp',String(timestamp));}return fetch(url.toString()).then(function(result){return result.json();}).then(function(result){var _result$data;return(_result$data=result.data)!==null&&_result$data!==void 0?_result$data:[];});}var setNotificationsReadUntilHandler=Object(react["useCallback"])(function(value){if(value){setStoredReadUntil(value);setNotificationsReadUntil(value);}else{removeStoredReadUntil();setNotificationsReadUntil(0);}},[]);var lastNotificationTimestamp=(notifications===null||notifications===void 0?void 0:notifications.length)?Math.max.apply(Math,Object(toConsumableArray["a" /* default */])(notifications.map(function(n){return n.startsOn;}))):null;var timestampRef=Object(react["useRef"])(lastNotificationTimestamp);timestampRef.current=lastNotificationTimestamp;Object(react["useEffect"])(function(){var intervalId;if(wallet.initialized){fetchNotifications({target:wallet.account}).then(setNotifications).catch(console.error);intervalId=setInterval(function(){fetchNotifications({target:wallet.account,timestamp:timestampRef.current}).then(function(ns){if(Array.isArray(ns)){setNotifications(function(prevNs){return[].concat(Object(toConsumableArray["a" /* default */])(prevNs.filter(function(prevN){return prevN.expiresOn*1000>Date.now();})),Object(toConsumableArray["a" /* default */])(ns));});ns.forEach(function(n){return addToast(n);});}}).catch(console.error);},30000);}return function(){if(intervalId)clearInterval(intervalId);};},[wallet.initialized,wallet.account,addToast]);return/*#__PURE__*/Object(jsx_runtime["jsxs"])(Context.Provider,{value:{notifications:notifications,notificationsReadUntil:notificationsReadUntil,setNotificationsReadUntil:setNotificationsReadUntilHandler},children:[children,notificationsNode&&/*#__PURE__*/Object(react_dom["createPortal"])(/*#__PURE__*/Object(jsx_runtime["jsx"])(jsx_runtime["Fragment"],{children:toasts.map(function(n){return/*#__PURE__*/Object(jsx_runtime["jsx"])(notification_Toast,{n:n,onClose:removeToast,timeout:10000},n.id);})}),notificationsNode)]});};/* harmony default export */ var notificationsProvider = (notificationsProvider_NotificationsProvider);function useNotifications(){return Object(react["useContext"])(Context);}
// EXTERNAL MODULE: ./src/components/providers/web3Provider.tsx + 1 modules
var web3Provider = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(56);

// EXTERNAL MODULE: ./node_modules/antd/lib/spin/index.js
var spin = __webpack_require__(263);
var spin_default = /*#__PURE__*/__webpack_require__.n(spin);

// EXTERNAL MODULE: ./src/components/antd/button/index.tsx
var antd_button = __webpack_require__(79);

// EXTERNAL MODULE: ./src/components/custom/grid/index.tsx
var grid = __webpack_require__(51);

// EXTERNAL MODULE: ./src/components/providers/warning-provider/s.module.scss
var warning_provider_s_module = __webpack_require__(334);
var warning_provider_s_module_default = /*#__PURE__*/__webpack_require__.n(warning_provider_s_module);

// CONCATENATED MODULE: ./src/components/providers/warning-provider/index.tsx
var warning_provider_Context=/*#__PURE__*/react_default.a.createContext(Object(context["a" /* InvariantContext */])('WarningProvider'));function useWarning(){return react_default.a.useContext(warning_provider_Context);}var warning_provider_Warn=function Warn(props){var storageIdentity=props.storageIdentity,text=props.text,closable=props.closable,onClose=props.onClose;var _useLocalStorage=Object(esm["a" /* useLocalStorage */])(storageIdentity!==null&&storageIdentity!==void 0?storageIdentity:''),_useLocalStorage2=Object(slicedToArray["a" /* default */])(_useLocalStorage,2),storageState=_useLocalStorage2[0],setStorageState=_useLocalStorage2[1];function handleClose(){onClose===null||onClose===void 0?void 0:onClose();if(storageIdentity){setStorageState(false);}}if(storageIdentity&&storageState===false){return null;}return/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:classnames_default()(warning_provider_s_module_default.a.warning,'grid flow-col col-gap-16 sm-col-gap-12 align-center justify-space-between pv-12 ph-64 sm-ph-24'),children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])(grid["a" /* default */],{flow:"col",gap:16,align:"center",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"danger",color:"red"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p2",weight:"semibold",className:warning_provider_s_module_default.a.text,children:text})]}),closable&&/*#__PURE__*/Object(jsx_runtime["jsx"])(antd_button["a" /* default */],{type:"link",onClick:handleClose,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"close",className:warning_provider_s_module_default.a.closeIcon})})]});};var warning_provider_WarningProvider=function WarningProvider(props){var _React$useState=react_default.a.useState([]),_React$useState2=Object(slicedToArray["a" /* default */])(_React$useState,2),warns=_React$useState2[0],setWarns=_React$useState2[1];function removeWarm(warn){setWarns(function(prevState){return prevState.filter(function(w){return w!==warn;});});}function addWarn(warn){setWarns(function(prevState){return[].concat(Object(toConsumableArray["a" /* default */])(prevState),[warn]);});return function(){removeWarm(warn);};}return/*#__PURE__*/Object(jsx_runtime["jsxs"])(warning_provider_Context.Provider,{value:{addWarn:addWarn},children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(grid["a" /* default */],{flow:"row",children:warns.map(function(warn,idx){return/*#__PURE__*/Object(jsx_runtime["jsx"])(warning_provider_Warn,Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({},warn),{},{onClose:function onClose(){return removeWarm(warn);}}),idx);})}),props.children]});};/* harmony default export */ var warning_provider = (warning_provider_WarningProvider);
// EXTERNAL MODULE: ./src/components/custom/icon/index.tsx + 1 modules
var custom_icon = __webpack_require__(69);

// EXTERNAL MODULE: ./src/layout/components/layout-footer/s.module.scss
var layout_footer_s_module = __webpack_require__(102);
var layout_footer_s_module_default = /*#__PURE__*/__webpack_require__.n(layout_footer_s_module);

// CONCATENATED MODULE: ./src/layout/components/layout-footer/index.tsx
var layout_footer_LayoutFooter=function LayoutFooter(){var _useConfig=Object(configProvider["b" /* useConfig */])(),links=_useConfig.links;return/*#__PURE__*/Object(jsx_runtime["jsxs"])("footer",{className:layout_footer_s_module_default.a.footer,children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_footer_s_module_default.a.footerTop,children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_footer_s_module_default.a.footerTopLeft,children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])(react_router_dom["b" /* Link */],{to:"/",className:layout_footer_s_module_default.a.logo,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(custom_icon["a" /* default */],{name:"bond-square-token",className:"mr-12"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(custom_icon["a" /* default */],{name:"barnbridge",width:"113",color:"primary"})]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"small",weight:"semibold",color:"secondary",className:"mb-24",children:"A fluctuations derivatives protocol for hedging yield sensitivity and market price."}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_footer_s_module_default.a.socialLinks,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["d" /* ExternalLink */],{href:links.twitter,variation:"ghost-alt",icon:"twitter",iconPosition:"only"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["d" /* ExternalLink */],{href:links.discord,variation:"ghost-alt",icon:"discord",iconPosition:"only"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["d" /* ExternalLink */],{href:links.github,variation:"ghost-alt",icon:"github",iconPosition:"only"})]})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_footer_s_module_default.a.footerTopRight,children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("section",{className:layout_footer_s_module_default.a.navSection,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb2",weight:"bold",tag:"h3",className:"mb-16 color-icon",children:"DAO"}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("ul",{children:[/*#__PURE__*/Object(jsx_runtime["jsx"])("li",{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["e" /* Link */],{variation:"text-alt",to:"/yield-farming",children:"Yield Farming"})}),/*#__PURE__*/Object(jsx_runtime["jsx"])("li",{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["e" /* Link */],{variation:"text-alt",to:"/governance",children:"Governance"})}),/*#__PURE__*/Object(jsx_runtime["jsx"])("li",{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["d" /* ExternalLink */],{variation:"text-alt",href:links.forum,children:"Forum"})}),/*#__PURE__*/Object(jsx_runtime["jsx"])("li",{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["d" /* ExternalLink */],{variation:"text-alt",href:links.signal,children:"Signal"})})]})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("section",{className:layout_footer_s_module_default.a.navSection,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb2",weight:"bold",tag:"h3",className:"mb-16 color-icon",children:"SMART Products"}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("ul",{children:[/*#__PURE__*/Object(jsx_runtime["jsx"])("li",{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["e" /* Link */],{variation:"text-alt",to:"/smart-alpha",children:"SMART Alpha"})}),/*#__PURE__*/Object(jsx_runtime["jsx"])("li",{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["e" /* Link */],{variation:"text-alt",to:"/smart-exposure",children:"SMART Exposure"})})]})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("section",{className:layout_footer_s_module_default.a.navSection,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb2",weight:"bold",tag:"h3",className:"mb-16 color-icon",children:"INFO"}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("ul",{children:[/*#__PURE__*/Object(jsx_runtime["jsx"])("li",{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["d" /* ExternalLink */],{variation:"text-alt",href:links.website,children:"Website"})}),/*#__PURE__*/Object(jsx_runtime["jsx"])("li",{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["d" /* ExternalLink */],{variation:"text-alt",href:links.whitepaper,children:"Whitepaper"})}),/*#__PURE__*/Object(jsx_runtime["jsx"])("li",{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["d" /* ExternalLink */],{variation:"text-alt",href:links.docs,children:"Docs"})})]})]})]})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_footer_s_module_default.a.footerBottom,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"small",weight:"semibold",className:layout_footer_s_module_default.a.copyright,children:"BarnBridge \xA9 2021"}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_footer_s_module_default.a.footerBottomLinks,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["d" /* ExternalLink */],{variation:"text-alt",href:links.uniswapSwap,children:"Uniswap v2 USDC/BOND market"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["d" /* ExternalLink */],{variation:"text-alt",href:links.uniswapLiquidity,children:"Uniswap v2 USDC/BOND add liquidity"})]})]})]});};/* harmony default export */ var layout_footer = (layout_footer_LayoutFooter);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(12);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/react-device-detect/main.js
var main = __webpack_require__(255);

// EXTERNAL MODULE: ./src/components/antd/popover/index.tsx
var popover = __webpack_require__(246);

// EXTERNAL MODULE: ./src/components/custom/badge/index.tsx
var badge = __webpack_require__(313);

// EXTERNAL MODULE: ./src/components/custom/identicon/index.tsx
var identicon = __webpack_require__(261);

// EXTERNAL MODULE: ./src/components/providers/tokensProvider.tsx
var tokensProvider = __webpack_require__(309);

// EXTERNAL MODULE: ./src/components/token-icon/index.tsx
var token_icon = __webpack_require__(431);

// EXTERNAL MODULE: ./src/utils/fetch.ts
var utils_fetch = __webpack_require__(77);

// CONCATENATED MODULE: ./src/modules/smart-alpha/api.ts
var api_excluded=["juniorTokenPrice","seniorTokenPrice"],_excluded2=["seniorWithSA","seniorWithoutSA","juniorWithSA","juniorWithoutSA","underlyingPrice"],_excluded3=["juniorValue","seniorValue","entryQueueValue","exitQueueValue"];function useFetchSaPools(){var _ref=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{},userAddress=_ref.userAddress,baseUrl=_ref.baseUrl;var config=Object(configProvider["b" /* useConfig */])();var url=new URL("/api/smartalpha/pools",baseUrl!==null&&baseUrl!==void 0?baseUrl:config.api.baseUrl);if(userAddress){url.searchParams.set('userAddress',userAddress);}return Object(utils_fetch["c" /* useFetch */])(url,{transform:function transform(_ref2){var data=_ref2.data;return data;}});}function useFetchPool(poolAddress){var config=Object(configProvider["b" /* useConfig */])();var url=new URL("/api/smartalpha/pools",config.api.baseUrl);url.searchParams.set('poolAddress',poolAddress);return Object(utils_fetch["c" /* useFetch */])(url,{transform:function transform(_ref3){var _data$;var data=_ref3.data;return(_data$=data===null||data===void 0?void 0:data[0])!==null&&_data$!==void 0?_data$:null;}});}function useFetchTokenPrice(poolAddress,periodFilter){var config=Object(configProvider["b" /* useConfig */])();var url=new URL("/api/smartalpha/pools/".concat(poolAddress,"/tokens-price-chart"),config.api.baseUrl);if(periodFilter){url.searchParams.set('window',periodFilter);}return Object(utils_fetch["c" /* useFetch */])(url,{transform:function transform(_ref4){var data=_ref4.data;return data.map(function(_ref5){var juniorTokenPrice=_ref5.juniorTokenPrice,seniorTokenPrice=_ref5.seniorTokenPrice,rest=Object(objectWithoutProperties["a" /* default */])(_ref5,api_excluded);return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({},rest),{},{juniorTokenPrice:Number(juniorTokenPrice),seniorTokenPrice:Number(seniorTokenPrice)});});}});}var EpochFilterTypeKey;(function(EpochFilterTypeKey){EpochFilterTypeKey["current"]="current";EpochFilterTypeKey["last"]="last";})(EpochFilterTypeKey||(EpochFilterTypeKey={}));function useFetchPoolPerformance(poolAddress,periodFilter){var config=Object(configProvider["b" /* useConfig */])();var url=new URL("/api/smartalpha/pools/".concat(poolAddress,"/pool-performance-chart"),config.api.baseUrl);if(periodFilter){url.searchParams.set('window',periodFilter);}return Object(utils_fetch["c" /* useFetch */])(url,{transform:function transform(_ref6){var data=_ref6.data;return data.map(function(_ref7){var seniorWithSA=_ref7.seniorWithSA,seniorWithoutSA=_ref7.seniorWithoutSA,juniorWithSA=_ref7.juniorWithSA,juniorWithoutSA=_ref7.juniorWithoutSA,underlyingPrice=_ref7.underlyingPrice,rest=Object(objectWithoutProperties["a" /* default */])(_ref7,_excluded2);return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({},rest),{},{seniorWithSA:Number(seniorWithSA),seniorWithoutSA:Number(seniorWithoutSA),juniorWithSA:Number(juniorWithSA),juniorWithoutSA:Number(juniorWithoutSA),underlyingPrice:Number(underlyingPrice)});});}});}function useFetchPortfolioValue(periodFilter){var config=Object(configProvider["b" /* useConfig */])();var _useWallet=Object(walletProvider["c" /* useWallet */])(),account=_useWallet.account;var url=new URL("/api/smartalpha/users/".concat(account,"/portfolio-value"),config.api.baseUrl);if(periodFilter){url.searchParams.set('window',periodFilter);}return Object(utils_fetch["c" /* useFetch */])(url,{transform:function transform(_ref8){var data=_ref8.data;return data.map(function(_ref9){var juniorValue=_ref9.juniorValue,seniorValue=_ref9.seniorValue,entryQueueValue=_ref9.entryQueueValue,exitQueueValue=_ref9.exitQueueValue,rest=Object(objectWithoutProperties["a" /* default */])(_ref9,_excluded3);return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({},rest),{},{juniorValue:Number(juniorValue),seniorValue:Number(seniorValue),entryQueueValue:Number(entryQueueValue),exitQueueValue:Number(exitQueueValue)});});}});}function useFetchTransactions(_ref10){var page=_ref10.page,limit=_ref10.limit,userAddress=_ref10.userAddress,poolAddress=_ref10.poolAddress,transactionType=_ref10.transactionType;var config=Object(configProvider["b" /* useConfig */])();var url=new URL("/api/smartalpha/transactions",config.api.baseUrl);if(userAddress){url.searchParams.set('userAddress',userAddress);}if(poolAddress){url.searchParams.set('poolAddress',poolAddress);}if(transactionType){url.searchParams.set('transactionType',transactionType);}if(page){url.searchParams.set('page',String(page));}if(limit){url.searchParams.set('limit',String(limit));}return Object(utils_fetch["c" /* useFetch */])(url);}function useFetchQueuePositions(){var config=Object(configProvider["b" /* useConfig */])();var _useWallet2=Object(walletProvider["c" /* useWallet */])(),account=_useWallet2.account;var fetchReturn=Object(utils_fetch["c" /* useFetch */])('',{lazy:true,transform:function transform(_ref11){var data=_ref11.data;return data;}});Object(react["useEffect"])(function(){if(account){var url=new URL("/api/smartalpha/users/".concat(account,"/queue-positions"),config.api.baseUrl);fetchReturn.load(url);}else{fetchReturn.reset();}},[account]);return fetchReturn;}// export type PreviousEpochsApiType = {
//   poolAddress: string;
//   poolName: string;
//   poolToken: {
//     address: string;
//     symbol: Tokens;
//     decimals: 18;
//   };
//   oracleAssetSymbol: Tokens;
//   epochs: EpochApiType[];
// };
function useFetchPreviousEpochs(_ref12){var limit=_ref12.limit,poolAddress=_ref12.poolAddress;// : UseFetchReturn<{ data: PreviousEpochsApiType; meta: { count: number } }>
var config=Object(configProvider["b" /* useConfig */])();// const [page, setPage] = useState(0);
var _useState=Object(react["useState"])(false),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),loading=_useState2[0],setLoading=_useState2[1];var _useState3=Object(react["useState"])(false),_useState4=Object(slicedToArray["a" /* default */])(_useState3,2),loaded=_useState4[0],setLoaded=_useState4[1];var _useState5=Object(react["useState"])(),_useState6=Object(slicedToArray["a" /* default */])(_useState5,2),data=_useState6[0],setData=_useState6[1];var _useState7=Object(react["useState"])(true),_useState8=Object(slicedToArray["a" /* default */])(_useState7,2),hasNewer=_useState8[0],setHasNewer=_useState8[1];var _useState9=Object(react["useState"])(true),_useState10=Object(slicedToArray["a" /* default */])(_useState9,2),hasOlder=_useState10[0],setHasOlder=_useState10[1];var _useState11=Object(react["useState"])(),_useState12=Object(slicedToArray["a" /* default */])(_useState11,2),error=_useState12[0],setError=_useState12[1];var fetchData=/*#__PURE__*/function(){var _ref14=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(_ref13){var direction,cursor,url,fetchedData;return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:direction=_ref13.direction,cursor=_ref13.cursor;setLoading(true);url=new URL("/api/smartalpha/pools/".concat(poolAddress,"/previous-epochs"),config.api.baseUrl);if(poolAddress){url.searchParams.set('poolAddress',poolAddress);}if(direction){url.searchParams.set('direction',direction);}if(cursor){url.searchParams.set('cursor',cursor);}if(limit){url.searchParams.set('limit',String(limit));}_context.prev=7;_context.next=10;return Object(utils_fetch["a" /* executeFetch */])(String(url));case 10:fetchedData=_context.sent;setLoaded(true);if(direction){setData(function(prevData){return[].concat(Object(toConsumableArray["a" /* default */])(direction==='up'?fetchedData.data:[]),Object(toConsumableArray["a" /* default */])(prevData!==null&&prevData!==void 0?prevData:[]),Object(toConsumableArray["a" /* default */])(direction==='down'?fetchedData.data:[]));});if(!fetchedData.meta.hasNewer){setHasNewer(fetchedData.meta.hasNewer);}if(!fetchedData.meta.hasOlder){setHasOlder(fetchedData.meta.hasOlder);}}else{setData(fetchedData.data);setHasNewer(fetchedData.meta.hasNewer);setHasOlder(fetchedData.meta.hasOlder);}_context.next=19;break;case 15:_context.prev=15;_context.t0=_context["catch"](7);setError(_context.t0);setData(undefined);case 19:setLoading(false);case 20:case"end":return _context.stop();}}},_callee,null,[[7,15]]);}));return function fetchData(_x){return _ref14.apply(this,arguments);};}();var loadNewer=function loadNewer(){var _data$2;var cursor=data===null||data===void 0?void 0:(_data$2=data[0])===null||_data$2===void 0?void 0:_data$2.id;fetchData({direction:'up',cursor:typeof cursor==='number'?String(cursor+1):cursor});};var loadOlder=function loadOlder(){var _data;var cursor=data===null||data===void 0?void 0:(_data=data[(data===null||data===void 0?void 0:data.length)-1])===null||_data===void 0?void 0:_data.id;fetchData({direction:'down',cursor:typeof cursor==='number'?String(cursor-1):cursor});};var load=function load(cursor){fetchData({cursor:cursor});};return{data:data,hasNewer:hasNewer,hasOlder:hasOlder,loaded:loaded,loading:loading,error:error,load:load,loadNewer:loadNewer,loadOlder:loadOlder};}function useFetchKpiOptions(){var config=Object(configProvider["b" /* useConfig */])();var url=new URL("/api/smartalpha/rewards/pools",config.api.baseUrl);return Object(utils_fetch["c" /* useFetch */])(url,{transform:function transform(_ref15){var data=_ref15.data;return data;}});}function useFetchKpiOption(poolAddress){var config=Object(configProvider["b" /* useConfig */])();var url=new URL('/api/smartalpha/rewards/pools',config.api.baseUrl);if(poolAddress){url.searchParams.set('poolAddress',poolAddress);}return Object(utils_fetch["c" /* useFetch */])(url,{transform:function transform(_ref16){var data=_ref16.data;return Array.isArray(data)?data[0]:undefined;}});}function useFetchKpiOptionTransactions(poolAddress){var page=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var limit=arguments.length>2&&arguments[2]!==undefined?arguments[2]:10;var userAddress=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'all';var transactionType=arguments.length>4&&arguments[4]!==undefined?arguments[4]:'all';var config=Object(configProvider["b" /* useConfig */])();var url=new URL("/api/smartalpha/rewards/pools/".concat(poolAddress,"/transactions"),config.api.baseUrl);if(page){url.searchParams.set('page',String(page));}if(limit){url.searchParams.set('limit',String(limit));}if(userAddress){url.searchParams.set('userAddress',userAddress);}if(transactionType){url.searchParams.set('transactionType',transactionType);}return Object(utils_fetch["c" /* useFetch */])(url);}
// CONCATENATED MODULE: ./node_modules/@svgr/webpack/lib?-svgo,+titleProp,+ref!./src/resources/svg/zero-notifications-dark.svg
var _defs, _g;

var zero_notifications_dark_excluded = ["title", "titleId"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



function SvgZeroNotificationsDark(_ref, svgRef) {
  var title = _ref.title,
      titleId = _ref.titleId,
      props = _objectWithoutProperties(_ref, zero_notifications_dark_excluded);

  return /*#__PURE__*/react["createElement"]("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    viewBox: "0 0 113.46 107.78",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/react["createElement"]("title", {
    id: titleId
  }, title) : null, _defs || (_defs = /*#__PURE__*/react["createElement"]("defs", null, /*#__PURE__*/react["createElement"]("style", null, ".cls-1,.cls-14{fill:none;}.cls-2{fill:url(#radial-gradient);}.cls-3{clip-path:url(#clip-path);}.cls-4{clip-path:url(#clip-path-2);}.cls-5{clip-path:url(#clip-path-3);}.cls-6{clip-path:url(#clip-path-4);}.cls-7{fill:url(#radial-gradient-2);}.cls-8{opacity:0.2;}.cls-9{fill:#ff4339;}.cls-10{fill:url(#linear-gradient);}.cls-11{fill:url(#linear-gradient-2);}.cls-12{fill:url(#linear-gradient-3);}.cls-13{fill:url(#linear-gradient-4);}.cls-14{stroke:#ff4339;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.cls-15{fill:url(#radial-gradient-3);}.cls-16{fill:#36393d;}.cls-17{fill:#fff;}"), /*#__PURE__*/react["createElement"]("radialGradient", {
    id: "radial-gradient",
    cx: 58.71,
    cy: 85.47,
    r: 9.66,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    offset: 0,
    stopColor: "#ffcecb"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#ff938c"
  })), /*#__PURE__*/react["createElement"]("clipPath", {
    id: "clip-path"
  }, /*#__PURE__*/react["createElement"]("path", {
    className: "cls-1",
    d: "M64.62,15.91v0A6.32,6.32,0,0,0,60.72,10a6.26,6.26,0,0,0-2.42-.48A6.32,6.32,0,0,0,52,15.88v0"
  })), /*#__PURE__*/react["createElement"]("clipPath", {
    id: "clip-path-2"
  }, /*#__PURE__*/react["createElement"]("rect", {
    className: "cls-1",
    x: 46.98,
    y: 4.56,
    width: 22.64,
    height: 16.35
  })), /*#__PURE__*/react["createElement"]("clipPath", {
    id: "clip-path-3"
  }, /*#__PURE__*/react["createElement"]("path", {
    className: "cls-1",
    d: "M94.85,73.74a5.53,5.53,0,0,1,0,.71A6.25,6.25,0,0,1,88.61,80H28.27a6.24,6.24,0,0,1-1.71-12.24A7.32,7.32,0,0,0,30,65.66a6.85,6.85,0,0,0,1.33-2.11,6.61,6.61,0,0,0,.45-2.4V41.37A26.65,26.65,0,0,1,61.67,14.89a25.79,25.79,0,0,1,6.17,1.51,26.66,26.66,0,0,1,17.28,25V61.15a6.55,6.55,0,0,0,1.38,4,7,7,0,0,0,1.37,1.35l.13.09a7.24,7.24,0,0,0,2.32,1.12,6.26,6.26,0,0,1,4.53,6Z"
  })), /*#__PURE__*/react["createElement"]("clipPath", {
    id: "clip-path-4"
  }, /*#__PURE__*/react["createElement"]("rect", {
    className: "cls-1",
    x: 17.03,
    y: 9.69,
    width: 82.82,
    height: 75.29
  })), /*#__PURE__*/react["createElement"]("radialGradient", {
    id: "radial-gradient-2",
    cx: 58.58,
    cy: 406.14,
    r: 36.06,
    gradientTransform: "translate(0 8.83) scale(1 0.22)",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    offset: 0,
    stopOpacity: 0.5
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#282c30",
    stopOpacity: 0
  })), /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "linear-gradient",
    x1: 93.61,
    y1: 11.17,
    x2: 93.61,
    y2: -44.02,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    offset: 0,
    stopColor: "#36393d"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#ffd9d7"
  })), /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "linear-gradient-2",
    x1: 11.02,
    y1: 51.27,
    x2: 11.02,
    y2: -4,
    xlinkHref: "#linear-gradient"
  }), /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "linear-gradient-3",
    x1: 102.45,
    y1: 40.03,
    x2: 102.45,
    y2: -1.25,
    xlinkHref: "#linear-gradient"
  }), /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "linear-gradient-4",
    x1: 47.34,
    y1: 46.26,
    x2: 86.5,
    y2: 46.26,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    offset: 0,
    stopColor: "#ff4339",
    stopOpacity: 0.1
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#ff4339",
    stopOpacity: 0.3
  })), /*#__PURE__*/react["createElement"]("radialGradient", {
    id: "radial-gradient-3",
    cx: 85.23,
    cy: 30.24,
    fx: 77.90478264033204,
    fy: 21.565186029460097,
    r: 13.45,
    xlinkHref: "#radial-gradient"
  }))), _g || (_g = /*#__PURE__*/react["createElement"]("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, /*#__PURE__*/react["createElement"]("g", {
    id: "Layer_1-2",
    "data-name": "Layer 1"
  }, /*#__PURE__*/react["createElement"]("path", {
    className: "cls-2",
    d: "M71.21,80a12.61,12.61,0,0,1-25,0Z"
  }), /*#__PURE__*/react["createElement"]("g", {
    className: "cls-3"
  }, /*#__PURE__*/react["createElement"]("g", {
    className: "cls-4"
  }, /*#__PURE__*/react["createElement"]("image", {
    width: 48,
    height: 35,
    transform: "translate(46.67 4.2) scale(0.48)",
    xlinkHref: "data:image/png;base64,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"
  }))), /*#__PURE__*/react["createElement"]("g", {
    className: "cls-5"
  }, /*#__PURE__*/react["createElement"]("g", {
    className: "cls-6"
  }, /*#__PURE__*/react["createElement"]("image", {
    width: 173,
    height: 158,
    transform: "translate(16.91 9.48) scale(0.48)",
    xlinkHref: "data:image/png;base64,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"
  }))), /*#__PURE__*/react["createElement"]("ellipse", {
    className: "cls-7",
    cx: 58.58,
    cy: 99.69,
    rx: 36.27,
    ry: 8.09
  }), /*#__PURE__*/react["createElement"]("g", {
    className: "cls-8"
  }, /*#__PURE__*/react["createElement"]("path", {
    className: "cls-9",
    d: "M71.21,80a12.52,12.52,0,0,1-3.89,7.58C67.32,82.64,46.2,80,46.2,80Z"
  })), /*#__PURE__*/react["createElement"]("path", {
    className: "cls-10",
    d: "M98.73,2l-.19,0a3.25,3.25,0,0,0-6.28,1.2,3.41,3.41,0,0,0,.2,1.11l-.2,0a4.47,4.47,0,0,0-3.8,2.12,3.79,3.79,0,0,0-2-.57,3.86,3.86,0,1,0,2.93,6.34,4.46,4.46,0,0,0,2.87,1.06,4.42,4.42,0,0,0,2.66-.9A5.89,5.89,0,1,0,98.73,2Z"
  }), /*#__PURE__*/react["createElement"]("path", {
    className: "cls-11",
    d: "M20.28,44.16a3.52,3.52,0,1,0-6-3.62A4.38,4.38,0,0,0,7.13,44a4.75,4.75,0,0,0,0,.53h0a3.88,3.88,0,0,0-3.26,1.79h0a3.86,3.86,0,0,0,0,7.72,3.81,3.81,0,0,0,2.93-1.38,4.42,4.42,0,0,0,2.87,1.07,4.51,4.51,0,0,0,2.67-.9,5.82,5.82,0,0,0,3.8,1.43,5.9,5.9,0,0,0,4.15-10.09Z"
  }), /*#__PURE__*/react["createElement"]("path", {
    className: "cls-12",
    d: "M93.18,33a3.5,3.5,0,0,1-.55-1.87,3.52,3.52,0,0,1,6.59-1.75,4.35,4.35,0,0,1,2.7-.95,4.41,4.41,0,0,1,4.41,4.41,4.75,4.75,0,0,1,0,.53h0a3.88,3.88,0,0,1,3.26,1.79h0a3.86,3.86,0,1,1-2.93,6.34,4.42,4.42,0,0,1-5.53.17,5.89,5.89,0,0,1-8-8.66Z"
  }), /*#__PURE__*/react["createElement"]("path", {
    className: "cls-13",
    d: "M86.5,65.18l-39.16.45C63,64.28,86.5,65.18,80.86,26.9a26.53,26.53,0,0,1,4.26,14.47V61.15A6.55,6.55,0,0,0,86.5,65.18Z"
  }), /*#__PURE__*/react["createElement"]("path", {
    className: "cls-14",
    d: "M46.26,44.13s3.16-4.37,6.23,0"
  }), /*#__PURE__*/react["createElement"]("path", {
    className: "cls-14",
    d: "M64.39,44.13s3.17-4.37,6.23,0"
  }), /*#__PURE__*/react["createElement"]("path", {
    className: "cls-14",
    d: "M52.49,55h0a10.77,10.77,0,0,0,12.7,0h0"
  }), /*#__PURE__*/react["createElement"]("circle", {
    className: "cls-15",
    cx: 85.23,
    cy: 30.24,
    r: 13.3
  }), /*#__PURE__*/react["createElement"]("path", {
    className: "cls-16",
    d: "M85.23,18a12.3,12.3,0,1,1-12.3,12.29A12.3,12.3,0,0,1,85.23,18m0-2a14.3,14.3,0,1,0,14.3,14.29A14.31,14.31,0,0,0,85.23,16Z"
  }), /*#__PURE__*/react["createElement"]("path", {
    className: "cls-17",
    d: "M83.07,34.69A4.09,4.09,0,0,1,81.58,33a6.47,6.47,0,0,1-.53-2.72,6.42,6.42,0,0,1,.53-2.71,4.09,4.09,0,0,1,1.49-1.73,4.19,4.19,0,0,1,4.32,0,4,4,0,0,1,1.48,1.73,6.27,6.27,0,0,1,.54,2.71A6.31,6.31,0,0,1,88.87,33a4,4,0,0,1-1.48,1.73,4.19,4.19,0,0,1-4.32,0Zm3.56-2.08a4.35,4.35,0,0,0,.51-2.37,4.39,4.39,0,0,0-.51-2.37,1.6,1.6,0,0,0-1.4-.76,1.58,1.58,0,0,0-1.39.76,4.39,4.39,0,0,0-.51,2.37,4.35,4.35,0,0,0,.51,2.37,1.57,1.57,0,0,0,1.39.77A1.58,1.58,0,0,0,86.63,32.61Z"
  })))));
}

var ForwardRef = /*#__PURE__*/react["forwardRef"](SvgZeroNotificationsDark);
/* harmony default export */ var zero_notifications_dark = (__webpack_require__.p + "static/media/zero-notifications-dark.dcc42aed.svg");

// CONCATENATED MODULE: ./node_modules/@svgr/webpack/lib?-svgo,+titleProp,+ref!./src/resources/svg/zero-notifications.svg
var _image;

var zero_notifications_excluded = ["title", "titleId"];

function zero_notifications_extends() { zero_notifications_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return zero_notifications_extends.apply(this, arguments); }

function zero_notifications_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = zero_notifications_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function zero_notifications_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



function SvgZeroNotifications(_ref, svgRef) {
  var title = _ref.title,
      titleId = _ref.titleId,
      props = zero_notifications_objectWithoutProperties(_ref, zero_notifications_excluded);

  return /*#__PURE__*/react["createElement"]("svg", zero_notifications_extends({
    width: 139,
    height: 128,
    viewBox: "0 0 139 128",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/react["createElement"]("title", {
    id: titleId
  }, title) : null, _image || (_image = /*#__PURE__*/react["createElement"]("image", {
    width: 139,
    height: 128,
    xlinkHref: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjkAAAIOCAYAAABalBx4AAAACXBIWXMAADddAAA3XQEZgEZdAAAgAElEQVR4nOy9CbBd13UduO/HB8BR+JwnkficIFKiBGi2BgugI8mOJ0KxnaTTnRCu7qQ7g03Ylt2O40RwOtUup6sssKs7le6qLoGVdCVOJRHYHbutyQQkWRJFUQREigPmTxIkZgKcMHz8f7vOHd47d5+999nnvvf+f+/9vQoP995zz3zfv2e9tfc5J8vzHAwGg8FgMAwAe55fBwAbAWBDlfn66ngGAHYBwCEA2FF81txzyB5Bf2Ekx2AwGAyGfmLP81MAsBkANgHA6oScdwLAFlhzzw57Hv2BkRyDwWAwGPqFvS9sLogKwKoectxZkKS737XLnktvMJJjMBgMBkOv2LvHqTfbPXNUP/CrcPeabfZs2sNIjsFgMBgMvWBfQXCciWntAPrxEbhrzSZ7Pu1gJMdgMBgMhrbYv3eQBKfGw3Dn3ZvtGaVjYtQqbDAYDAbDEGHQBMfhIdi/19ScFjAlx2AwGAyGNjiwzzkYf2GB+s5NOV8Hd9xl08wTYCTHYDAYDIZUHNg/DQAHF7jfHoE77jRFJwFmrjIYDAaDIRUZbIGsOC7k50E4WJArgxKm5BgMBoPBkIKDB5yz8WuL1Gcz1SrJDqerVZOh8g06BLffYeYsD0ZyDAaDwWBIwaEDzmT0pSHts5mK8GyH6Tu2D0F9FhVGcgwGg8FgSMGhg448PDACfXamWqBwC0zfviQVHiM5BoPBYDCkYObgocQ9qYYB5VYRq29fUltFGMkxGAwGgyEFLx4a5YHzkYLs3DZ9egjqMnAYyTEYDAaDIQUvzoz6wHmm2CH9ttVj77NjU8gNBoPBYEjBwk8d7/dnFWTwZXhpZuu4P3dTcgwGg8FgSMFLL47TwLkbADbArbeNpfnKlByDwWAwGFIw+kqO/1kLGeyAl1+cGsfvgJEcg8FgMBiSkO0eM6azFiDbAS+/NHZEx0iOwWAwGAwpyGDXmKk5XUXn8HgRHSM5BoPBYDBocPjlaTj88gaAbNe4MRxP0RkrZ2RzPDYYDAaDAeOVw+sAYGPhlAvgzlctoT76Vbj5lm1DUI+eYSTHYDAYDAaHVw9PF+vHlJ9RW9G4nzhTELubbhn5rSAmh6AOBoPBYDAsHl59xfmhbAXIHrSnUMCpVtsqFWukYUqOwWAwGJYujryyudjAcmmZo7S4H268ecdoVJWGkRyDwWAwLD0ceXWqUitGYTfxxcIM3HjT9Cg3wEiOwWAwGJYWjh5xBMcpFGvtyUfxObjhxpHd48qmkBsMBoNh6cAITio2j1Z1mzAlx2AwGAyjg2NH3XTuqWpad71wndt3aRcAHILrb+BnBB07agSnHW4X+3WIYbOrDAaDwTC8KInJRm/NGtlB+NhRN/15e/G5/gZsZtluBKcVNpazz0YPpuQYDAaDYfhw/NhUZSrZ3MPMp5nKuXhrtfbNF+1Jt8JuuO76dSNYbyM5BoPBYBgyHD/W72ndM0t8cb9+4Cq47vrTo1ZpM1cZDAaDYThw4vhUYVLKsvV9ro8RnN6xoTL3jRSM5BgMBoNh8XHyxDrIsu1GSIYW64zkGAwGg8GQCkdwyllPturw8GIkfXKM5BgMBoNh8XDq5FSl4BjBGW5MjWKlbTFAg8FgMCwmzEQ1GjAlx2AwGAwGNV47tXkATsaGwWAklTabQm4wGAyGhcdrp6aKFYrNTDU6uOrqbNSqbEqOwWAwGBYeWdbLIn8Ggwqm5BgMBoNh4XH69GkjOSOGqSlTcgwGg8FgEHHm9CbIjOCMGGZGsdJGcgwGg8GwsMiyjdbjI4eR3IXcppAbDAaDYaGxwXp85DCSJMeUHIPBYDAsHN54fRqyzExVowcjOQaDwWAwyMimrYNGEjtGsdJGcgwGw3Dgm4+tg9nZKfgrnx3Jl6lBiQyM5IwirrjSSI7BYDCI2PP8Opif3wAXZ9fB7MVpuDi7Hi5eBJidBbjoPhcBvvKnAOfP12EzcPHiIZif3wEXL+6Cixd3wN/9B6etk0cZpuSMIHaOasWN5BgMhsHi5Rc3wsW5jTB3cSPk+SoAYm2uLCs/ExnAxTmAYv2u3B1Xw/z8asjzcul/t0rHv3p4N8zPb4P5+e3w6781kn4CSxojt9KKodpfbCRhiwEaDIb+49iRaZif3wTz85thfn4VzM1B53PhAsD8fHk+P1cqNi7MHWcvlGqOu++rO+4zVx1nq6MjQfPzj8L8/Fb4zd81E9eo4K23NgHAl5Z6N4wYroLLLx9JBdVIjsFg6B9OHJ+CPN8C8/MPFUSlICcVmcnzLnkpCE9lpqo/8xUBqklQTXDmKiJUnxdkpzq6eOU7bGdR7ud/z8jOsOPtt9z08ceWejeMEB6Byy7fNKqVN5JjMBj6g+PHNlcEp5we7EjL3HxXwZn31ByfqLhr3y+nPl6YLe87/5xa+ZmdbaZx6Ji2ivNHIc83w+/8vpmxhhVvv+18cg4u9W4YIdwPl102sj8ejOQYDIbecPLENOT5tsJvJp8viU1NPHwzVf2p45w7W8ab9UxSHdNURXZqolMTnyCv6v2V593z+fkzkMFm+O3f32ZPdkhx9qztWzUa2AmXXjrSCzcayTEYDO1x9NWNkMM2mJhY1SA2eXV0zsRzlaLjKznO96ZWZpxKc/5cmaY2V9Vqj1NxasWmUHS8vGpTFf4A1PceKVSd3/1nNhtr2HDurHNkfWCpd8MI4P1wyaW7RrkBtq2DwWBoh1df2QJz818uZkzVCk09M2q+Ih4XKzIyT6gvdZyCDE1072XV9Jv6fIJ5TdUzsvxz/xrgwWIBsz/cMmVPeNiQbS+nWdlniD8PjzrBAVNyDAZDK7xyeFtJIrz3hzt1RKWYBn6x62ic501fHBfPnzXVMVfNlsTHxSnUHG8mVR1/3lNx3AfAU3SgJFrF+XxFoorjDOT5RvgnfzDyL+yxwvlzZrIaXrgdx9fByktGXgU1JcdgMKRh5uA2mL3wYIdozFc+NvUMqQ4ZQZ+O2Wq+q+L4JieAbvpCBaqmjbswH3mt3Ex01Z4ML76S+cfVAPkO+Bf/dJ096WFCttWUnKH9bBoHggOm5BgMhiQcOuAcjB/sKCeTyyoxp3YAhnr9mqbaMus5DUPuzayqlJzaz+bChe5U8QvnkaNxNSOrVmvm825+AF3S1FB4PEKVz8/AfL4O/tm/MB+dYcCF81PVpo+m5gwXfgNWrNw6Lo0xJcdgMOiwb69b3O/BripTOQYXZMQL852HHWplp/bbqclHTUDcL8d65lRNUhzxAainhVdKT7UicsdnZ75b7cAB2TNhQR3mFJ3R3GRwLLFi5WmAbIupJkP1eWScCA6YkmMwGFR44bl1kGVPFYRlcrKpkDgsW9bNxc2cmqdmPHkzowqTVG3mutCcPu5fA3irI3v+OAVx8sgMeL45HRLllV8Trrlq1tUf/OHILm42dpidtZlWw4FHYPnysfu7MJJjMBhk7H5qCiYnd0EGqzvTwpdNds1CnXdI3iUxAL7jL8CyiSZR8RcJrKeT12aqi94qyOCTpvmuiQqTGEDmqqJuuef/0zBbuePn4J//0cjuxzNWcDvPlwrb2gVu1kzpr2UYV4IDRnIMBkMUT35/K2TZQ6WCA6XJaLZSWSbrPX4r09C8p5jMe6RmYll5fvbtLumYXF4SFhdWkxC3QGDtyJz720IQa+PMeyqOM5M5ub3OJ/THqUxjHWJ0BvJ8Gv6nf2n+OcOAixfdKsi7FtA/ZzcAbChmEJWbTw663DMVkRtGxephmJzcPAT1GAjMJ8dgMPB4/DvrGvtQOZXl7NlqSvdsU3V5+63m9gz1dgw5lPfctb9y8VtvlvHdOjg5dPei6jgZe7O08vlw8/Ka6Mx5+2I1Zm1B7dTjkZ5OHLd44Vj5How0JicPVYRj9wI0oyQ4k5OnYXLSEY/pQskYHB4typic3AgAv1oRnmHAmaI+Y0xwwJQcg8Eg4jvf2gHLlq1vTNGuzUjgKTnO0di9S9y1My/h14pTaGpFxkfttFwoQFl5HUw/nwvDGtPPPZMUZE1zFlRms3qD0DoddJyVb4c//GPb52pYMDfnTFfbBqh4ODKzGZYtCxW8uTmn7GwBgPV9Kmtnkd+yZU1n97m5dVUbF9o858PVbRMsWzb2330jOQaDgca3d2yAPH+so44sX16qMMUsjLxcp6b2fYHq0DFPTXgL9OXdbRtqh+Pap6czTZwwR9XKUW3q6pCdvHvuyJdPhqBWeDwzVSdO3lVzoJqt5ZyQ//CPzQl52DA/557J1j6akWYKcjOxLO6HNT83XcQF2NjCZ2emMn9thYkIgZif21yRqoWcQn+m6ocls6+bkRyDwUDjq3+2A7JsfeE7A5U5yc2iqhffc5tnFgJP1j3mOdptfK5UdxyZcaTImaxyRDjwLCg8C2vOWwzQV4Nq5SavVkmu0VFsSF+cahsJf3r6/O3wRw+bmjNsmJ+fqsjG5h6IwEylmmyFiYl0/6v5+XWVGa3+UNjV+UxMpK2q3Z82anCmIo3t+mGEYSTHYDCE+OqfTcPsxYNQW6l8c5VTaeYqNaReedgdnVozOdn0o4Gsq944suHITg1/6vfZs900Lg9HRApChGZPUTOoGuvhVM7PWYamj2feIoLzXRWozPsR+JcPm5ozzHDbcpTKykYFGZipnHy3Q5aNxgy6PJ+q2ra5z2asnQXJy7IluyP/pCKOwWBYarhwoXRGnPcIRn10JMQRG+ebUxCSCyWJcL44jpgUs7A8FaUwLVXXvj+Pw7lz5arJDSJ0obznk5liN/OL3a0c8I8zXw2q1aF6B3Q8xb3eLb2r8Gy07/eQoyQrJWFxs+JKZ+EpT11xCsrpYgXlLBs9VS7LTleK07aqfRur2V8bEhWemaovthdEbxT7os8wJcdgMITY/h8Pwezs6sI8VS/0589QWr6iDPPNUrVSMjHRJRj1Z1nlV+NIUG3aqk1Xc3NN4lLvXeXS+FPC68+Ep9I0NuWEroMxEMSn9s3JPfMVdIjc5+CP/3dbN8cwjJhGH4ya4NVHgwdTcgwGQxP/9yPrYCJb3XEerveUWrGiudifC3POyP6aNHXcmth0yE61QrFTe5wj8ewF2tdmHvvp1AsAXuyqM7O1UjPRJCz1QoVAbPMANQGCrlmrdpQurzd2lAKDYbhwqPoYWsBIjsFgwNjYVTzmShNTQS5mS6Lj+9A4QuPIxkSlzCyf7M6Kml9WkiLHO2ar9XDqqebgmcBc3HpncZ+0zF5oOhDXKlFNaHJP8SlIEDTj1NtGZBnhu+OrQEWYmawMhjGELQZoMBiamL2woSA09Uab/gynN14vr2uyUhCdcwBvvlmGueNcpeYUu4tfBHj77cpf51yZR70Bp3NCdsTo4lx3gcDOOjlz3Xj+Fg6+CawmYvW2D/4Ky74fUK0i1YqQP528u83DKvi1v8vNnjEYDCMKU3IMBkMTs7PlYD/rmaP8Kd/nKufi2sEYqllTNRGpzVU1ESp8dCYALllR7WNV+eesWIk2+5zvbhuBnYhrUgTQLaNWk3wURCiv8oDuLLB8vmumgvnuWj818s504bQpwAaDYahhJMdgMHTx8P8yDcuXryrWwHEjf2GCWtE18dR+OE6VOet8YCrH5EsuLQmLu+eOtbPyZZeXR2yi8mc85TgcTQmPHZ0689ZbJW95/fUyn3qLiTde75ZT559XxKgzzbwuI6ecOg0GwwjDSI7BYOhibm66nBq+PPSfcerM5VcAXHllSWKcEnPFFU0/F2AITU0o8LEfcHVxdXK4nKjPxcpk9vabAOcvlATorTeb08tL5WiDfRMMhvGCkRyDwdDF/Px0QRDcXlNOhXnHO8rjZZeVpMZXVaAmMPUuCRoCgwlQat8jBahz9PNCmdYkyH18UuPUKEd+zpwuj6/b7FuDYdxg6+QYDAaAx74+VSgZp0/9Lkwu/2ihiJBmIoqk4FWJubhoET/JNBU1W1F5R+LiOmCTWXncCZDvgBx2wH/395sbKxoMhpGDkRyDYali5zfWlevD5BsgdzsvJ/rCxExUwJAKjd+NOq5ULhM3Vt9mOY9WpGc7/L1/aGuVGAwjBiM5BsNSwjcfK/f/Kf1PVicTEIgQiGSyoyl7QKSLNHlJ9/OZguxAvg3++1+zWVgLA8pP6rTNgjNoYSTHYBh3fHvnxs4Gh249GBBmOaUSCc09jkQkKzu9kpu6Pig/FfkKyp0ByLdDDtvg7/+6DbjpqLcq2ID2oFrfIq8zHunZ4ZEg2+bAYCTHYBhLfOdb6yDPNwfEpg3BUCk5oCcbuNwURQfHUxGxlDoBUy+PqPEKz1b4B5vNpBViyttscl1LItMWZyris6s6mp/VEoORHINhXPDdbzvn4U0AsJk3RbUgNoGTMQ5v6Wws1Se5rsq6aI4qVYm5D7AbcthaqDz/8DeWsoqwwdtJe+0Q1MfHzs4u3Wb2GnsYyTEYRh3f+0s3kGyCPH+waEnbwb0NoYgdxTRastPWdKasr5bw1XUBivAFxzMF0QHYAv/oN5eKurPR+6wagvpoMFMRnm1GeMYTRnIMhlHF49/ZVAyieb66aEEweDMDe8/KDj5qyE6M3ETq0Q+fnFj5Yr248pj6NNM75WAr/NpvjeMu5+sq5XCUiA2HmeI5laTHzI5jAiM5BsMo4YnvTVW+NptZJ+IYyWljhgkGdW2cBNWIrBtTXhA3lWi1PYq+ORGyUzgrbykG0V///Kibsmqz6LCZovqFRyp1x3x4RhxGcgyGUcATj09XA2Q4QwqYQRy0A3mf1RuK7JB1TCxXIjb9VHRUfYTLY+pN5leYsrYWqsFDvz1KZGeqIjabCp+vpYHdlbqzbYm0d+xgJMdgGGb84Ps1uXkwGFAhQY3wB+cO2cCDMQBPKLhjW+WkBwdjiXA12jCf1ketfHSU8Rv5d87PVE7KW2Hz7wwz2anJzeYxMEm1xUxhGjayM3IwkmMwDCOefCJObiSy0zknFIh+Ewtcn6CeArkR1RStX46yXlz+HMmJ1cl/JmlKTvdeGX6mUguGkexsrgb3pUpuMGYqJcvMWCMCIzkGwzDhhz+YAqh9btzAohxUIVWxiKgTpP+JUJ6orrQlGH02V6UqN6lkkHo+0nMIz88UhOI3/setQ/CN3FCpFkvFLJWKnRXZMQflIYeRHINhWPDUk5sL9YYkN8wAmWLCCtScHkxGnfKZe0H9YgRHq9rEFB0FweuFBGrJjUh2iLDm+UzhXP6bv7sYs7GmK1XpgQUr8eirABcuAJw6WR5fO9m958LOn+9euz664sryU/fvTTdVx5vLnfKvvmbBqg4Af1D1l62sPKQwkmMwLDZ2/XBDsR9S7n41pygEdZiW3Ch9TFIHedF0FSEXnHkt1TSVouSQZWmPiSQH16/xXKLnOwtF7zd/d6HWbxm8aeq1UwBHjwAcexXg1CmAt94M4/h9BYr+oo5XX1uSHUd83KcgRQODmbCGGEZyDIbFwu6npqtZNg/0rAS0USdUcev4qcqOUkkhzVRSfSPlquqRQm5SyJ72WRFh8vnDBfn4rX88KLVgujJN9X+7BUdijh4FOPwiwLEjABdmhcg5OmUIJCieHX7Gl19Rkp3VtwPcdAvAihV9bGQHD1ck0VSdIYKRHINhMfCjp5xZypmnVjXJBOjVgeQjNldFyERdXGPgkEgOvmaITeM4j+qUqiolhHH91Vdyo4lDEBx8HZ6fKdSC3/rH/TZhbawITv/Um9kLAAf3Axw8AHD6VBmWZXIav3+AI4Qg96mGrNZht00DTN8OcPc9/Wixj92VqmOrJw8JjOQYDAuJp3etK3auhnytSG4w0VCTHC6upF6kmLPamq9SiI9AvKSytGFcXyQTrMixkTc3cAvx8HlZZunw+vnf64fDq1MRH+pDPiUOvwRw6ADA4ZcBCk6TdY8s/D4BPWkE/MzrYyKJdYrO6mmAD3yknyatM5Xpz6abDwGM5BgMC4Fndk9BXkjZD4Uvbehx0NQSBz9dhPQAM8B00uKBBpjw1IFHMqn1YCqT7uHyubbHiB05OPdIbEKSA9UgugU+/3ttZ2FNVf4j/Vmt2BGbZ58GePvtUrHxiU2H39QnmNSA/u8AOGIDqK+Z71nsvjNnObLjjv3BI5WqY1hEGMkxGAaNZ360rtisMa+n4ypJDgDzQgf+pd7zUTOAawcYKY5HYlLUJU0dU0nOIJSbqLLWE8mp75Wqzm//kxRVZ11FcHozT83OAux9HmDfXoCLsxW5qYlNxDQFXLu89qmfifJZx563f37lFQDv/wjAmr6YsnZX0/HNT2eRYCTHYBgkfvz0FoD8C72RGm6QZO5F1ZyIWoLzDgYaza/sFAVHGHCi5Eaok/aXvab81iQH9Sf5PFqTHOioOr/9TzSqzqbKRNUbwZk56HzKAObmGHKThRYqv/3AtFHz3cDPqL7fK9mhvuM33gLwwQ+Xjsq9wfx0FhFGcgyGQeDZp6chL3YzLk0C5MAJyrAIuYkRDogNIAnEgiRKPZINkmylkh1qcOtH+S1Ij/SspGfQ+Uq0IDyQPwo5bILf+X1OMXCD7JeYezocPwbwwycAzp2tyM1ESWZ8olMAmabAv0z5PkrPR6HiRe8rCY+bkfWxn+zVZ+dMpegY0VlgGMkxGPqNZ5+pfjHXM6cIGT5GeACIFzMQgwSVl0LNUROKfpCNNgMYQyI0io6m/GSSk0B2yLTCPS4suKa+K4145Xotv/P7eL2W3giOM005cuMW7XPEZiLrEpuC3GD/m24V+Xr3i4xy34s+khx3vXwlwH3vA/jgR1p3oxGdxYGRHIOhX3jux1PFujc5PNjJUUtqpEHAzyc2sMYG1dhAriE44iDihanKFgiGqmyh3CjhSSE3QnniM5GepUB2qGst4YH8D+B3/umW6qK3GVSvHgbY9WRpmpqY6JIcyEIn42bFu3US+w/C5xJ7lr0SGzY8UoY7v+YagPWfBrjm2rY9akRngWEkx2DoB577sVtQrTRPkYOR8qXfOSgJkIZcSEecRxK5IcrUhuGjVK44mFFhKX3gldFWuWk8HyVJpeqDz8V7Islx/x6FX//843Dppf8ztIFTb556AuDYUYCJZSXBKUhOFpqnKOtU8P3Sfqc0ZCfyvUghP6nKTn3uZmG1V3WM6CwgjOQYDL3i+Wc3VtsydB06qcFJUnWSFB+lMpA6yHP32EEF1UGr6OBjrD7JJEdRh5S+EY+pz0aIg8/FexGSc99agJ/9RWiFM6cBfvC9cs8oR3CW1QrOhDyDSqXYSN8/pRLTOGcUlyAv7jujzDuoc146JH/259qunmxEZ4FgJMdg6AXPP+sW/fpimQMz8KSSm86BUAn8NNEBmEuX0+WlEBtyAFKUyxKNlAHQCwvKTiRarcmNIq70rKj6SOeYyEj3nO9IW4Lz0ozbbgRg2bLqM1ESHUdqHMkBRHAkMp/8XFuoLzEikppfEolym4W+A+CzP9vWfGVEZwFgJMdgaIsXnnMrmj4YHaQCIgPo5c6F4QEykdxQdWAJQ+RedGCPER/UL0kDYdvBUVGfXkiOSKSYZ0Z+L7hzhjTj+P6921YD/M2/Da3w1A8AXjkMMOnIzWRJcrCZCkNNIDmyQBCKfhORXkhUtKzKKfnjnwRYc2+bXp+p1i6ydXQGhMmxbJXBMEjseX4K8ly/YmxWj2+dk+bNLA+Dg/TMtFw/W3yMV6i6zMqXdXGEqj5VvSBrDqiduijb0alT1hw0/LY00sR+dOXiJdU8sT59A+78hLxZspNYt+tvAPjcX09vUOF/8wOAE8cAlk92CU79qWdQNfo1974rebw/c8Y/mbrRCaq/h0TUuswgHLzvLQ7HeXLnOH9cFsp/9jzAjm8AXLhQmgnTsLpanNEWDBwQJsayVQbDoLDn+XLF2Czrvs0oJ8zGOXWfWDDN3+uHmrWC70kLy2LfCXIVWsXKtBj1OMbWIbLyLbWeSic+V6c8TMM2genrIEtqQGYG6Vy6zShoXAXb8ipWxamw8pLSRLVyZVq+juB855sAJ44DTC4vP8u9z7LJUNWZqNfIqZ2QuXPmU39voucZOgcUDsy5lD/Ohzun8o/k+Z1vAez4epunu7aaBWcYAEzJMRi02PvCOoBsR7H+DYsMMYEcnVKKR1R6EYAUhFqN4fJTKRhY6fHUG/xrXlXFWJmUSYeuSt/QUa/87mMK4xSyNvUii+hDIx3BcUpOCmqC89ZbAJOT4cf54nSQh/3jX3Lqiw+1+sKdE/mrFZf6exVTcaT8FXXb83wZd8OnU5/gg5VvjpGdPsOUHINBg70vbCwVHG8GVUPB4c6DEyUiOzhn/hHHlcwGNemiVBQuDTRZR9AmRtFJaStAsw3kCrotsm5UU1KzqPKoezgap6wl1LlRdMp3qsInPgVw9xqhAAIdgvMmQXAqRadWb0hlBbwwQSmp656sjuBzoPNvo7iozpUqEXh1q+85otNO0fli5Z9j6COM5BgMMezbswkg+3Jnzx/NBoT+Pj6ATwly4N9LHcSxPYUqO6gXV2/iAg/iLIcSfsGn1gMXEhC+jO6z5L5D5Yn8RpN5iwpwPjlcHL8Mp958/FNp5TmC85c7Ad58I/S/qYkNLpMjEP7gzhEIP4+AuAnkBoQ8G8++BREh85HyRHWm+sI/3/NcW6Kzvdol3tAnGMkxGCQUBAe+xI5d3K/tnkD45uAjEEdcPlYweq4fQ3qiybTlU/kLaaLO1S2A/W96NZWpqsF9hwiS4Yc7P5zP/Up6nb69IyQ4E9Unm4g8J0waOILOkIa6LY3vBJMnR6b8PDkypSEiXD4xgib6/nh1dUTnye9HHweCc0TelprIwMNIjsHAYd9e3Z4/MaLjKyuscqMgDSThaaE2aMw2jUvPX4FNxwVH6oPNZTFiEwyusX6TngcRj+zTGi0YT08kiSE8dZs/8ZMA70jcUNwNugXBqdfAmUDTxL3p0sFsuEhdo2RH+FuRyA5FIKj8RdWFISLk32GEoIl1RsTnycdLspOGBwBgY2oiAzM0UyEAACAASURBVA0jOQYDhf17N0HmCI70gotA9M1RkAOVooHzSxhVk8UOhlAEYUS7qb6jyBmevYXPxbpT/S1ARfaEOjTQA5tJfg4AcOvq9G0FnnsG4PBLTdWmsVWDFxeTm1yStjL+XE1w/KwIc5OfH0dG/PwC8xpFRHA+nMKD82T8fwBoMuXMVm4PsDRsM7NVf2Akx2DAOLCvq+C0GYC0oAhNr3lh01BgKkIvYzYurhMx2JBhFKHzo3lh5HiZCfeEMrk+lOqCy2xEYQZ1lnjGSGuv8DJyZqq/+gtp+b3yslu8sqncUAQn9wgNpeZozHhRAqpQRhpJCdXFzxeTESo/kjRr1KcEJYcjUw5//qcAb7xBdQyHVTbTqj8wkmMw+OgQHGYAU/0alRQC5cCrBaWG+Igs26L306EW4UswZeDCsWkBl6NWUKjiEtvUWJUY13mAaOsj9cEPp5mp3n6rNFOR5IZ5DoGZKhfUHG65Au+EJSE4LqXmoEwzFKcTriQjKrKjcXAW8s9Q/m7BwK/8F7qfeDxYLRJo6AFGcgyGGgf20z440lgUIzrqgUzpm9PgC5TKgsLFeEQSKpBSL1jyQQ1c3uDYOWVm7jQkhVQyJcSNto+LG3l+3O2YmgEtSJXrp1WrAD7+k/G4Pr77LYC5uYrcCAQnh6Zy0/DN8SKlrpOkQuR7RZEa/2bjsiXZwSY7IMJZZ2SUv1+vOv9TJ8pp+2kwNadHGMkxGBwO7t/YIDjimCORBe4F7d9jXppUQopg4PLZLFKmCjEDPhuVIkBM8RTxabRbUFKoQU8tgFDPQiBmgUnPv5SIIjbV4biIuJHmMQ1ygPs/k5bk2acBXj+jIzgNMprXrMeLIOyl5SOV+zSeiUBwcBzqu5fs90OUSfroCPnhOlHmtfr86d2p/jluNeRNKQkMTRjJMRgO7l/XnbbJvHA5aZ0OQMFUWipvSc0hCE995ExSeNDGg7nkAKwmO8LNoHiOdGCSkQrOARWXS/Q5LpPqC1V7/QjcKJ8Jt4UVqms4Z+O7Ehb9O360dDYmt1pgqoA3OPXDODUnR8dIk4J2dcLwOUUspe9nAsEh8+NMqBFTGKVEds4JsvPY18p9rvTYak7I7WEkx7C0cfDAumqDvFXBL7ukMVdQCBqnEllqCUlNAWas0NY9SjzQgKFqk1ZhScwj6T5TfmNgTjB9pZieSFLJpPHNeqlmql1PegQH7ySOy8ubn44DMg5Xqjn9AvWbg1JIWKLLEBzu3E8X/F31ye/HOSD/4HspHeQcsDanJDB0YSTHsHRx6MBUucJoxntxauXvLJYmQnj4CugeT0y9CQZTgWgEt7LuS5wcEKj4QcWE+Apoyw0b5Z0TI7Lvf8KmjeWb8ijRc4hytSrCrbcBvPM2RSEVfvwjgDNnaAUHEyrf8RqTG8xz/IhRNaeXFRVjfc6Ra4loRwhO8DeE0kb/xjVEqsrn6V0ArySZrTabmtMORnIMSxMlwXF7Ua0O2o8HVM5nIFV9kAgPRU5SFBjWZMXkIb7QY+VqI2ucqfEUbX8wTq1ELpcnmq2Ya9ye4FIgbxkVj/I/4urpIUXFcRtu7nmBIDdUJetqYWLjExZK5QFEdqjZd9J1IvFR8MzwPvecib9n8ocH9/2VfvgkEKk0J2RTc1rCSI5hiSLbWjn1pQ2mUjSN6hPkI90TKoEH0EYbYkcPooIh1Cdl0OEGCClRjqOgAQP/Mu6O4kz2/j1Fm4NBia5mUD//2VCmrxQSVSNVxXlmN8DFWeRgzPRPjkxOWJHJKTUnR2SNmgnHkLlUchMFRUpA92MkeLYaRUg7HT6i5jicPF6uXaSHqTktYCTHsPRw6OCWag0KBOZFBYkEBqMxXTo4Ie7hAM4/gC0wcvSLyNBRrFCswgQBEwY2qezGdFxqcAYIRmdq0KKqGpQbZTDoMoUQo0qJYzxDDD6QsLLxsaMAMwcAJhDBoarsr3uTezOqAoLDKDkcwSH9mgYw3byXtJyiU59HiY/0DlCqOVBt+3DhvLbyq2y7h3QYyTEsLcwc3AgZfKFsMzUIage8FNWGS4fvE2oAS3wkp09GyZH8cXDaXsaRYFyT2kyUzWXIKjoobR6cyGNs7ufPlE1WlVDQgvqgvCUFhyJ7btG/u+4WKo/gpijXakFjJhUuGPkiYX8cbK7KEREiTVf4XGGa8+O1hfarpJqqzkH5AyPFLObO33gd4Ee7Uhq+JSWywUiOYSlh5lB3qjj7a7/HF240OTXwEr922Xyw3wk1VZs5Ag6XCE3k1yhJNjzHVmrKvdaHSa3oeEQv+mubylwqOBH4u0OWx7Sj0cfo+IEP6+tx7Eg5bRz3P4WGCEb44wDQjsdJpiuAxgV28g72x9I3lYRKZaEeiUbR4aJwZRHh3HfUOSHr1ZzVtgpyGozkGJYGZg5NVQQHzaTiPHYjIH8da16AlE2fGPwoBadTJrVmTtY8shUT7knqCiYxOIzti8go4ZeZU4Nl4DDi5cH5v2hA1YFSdDRkIWBauuQxIuLuv+e96hYVKk4mfb9qeH3b2JcKEZ0GiWFZDjJpSc8vBf323YkgxkVF0iqQHfbv2Dt3BCfNN8cWB0zA5MjU1GDoBRlshdw5GmfNwSzP+Bcqvk9et6kTkQc++gEZNk0JC7B1isjKAaZzxOVkgq8Mrkt6szoBQd1RffH2Dp3rrKta5ajvqb4qyvEr4JdNPTOqYVLDmc4gv0OR61j2dT/ceTfAypVEPQm89Wbpj7NswiO7dT+g6EUT63b65jr/u4KfHVIjKJMgAEGa0Dk7Zb+6nlwGMHU1wJVXlkeHq67uRjt7FuDs26Vj9euvA5w8UW6XkPRlRd8T9Tn6TpHfbVyM/50VynJqznvXKetf+BM6J+TT2gRLGUZyDOOPF2c20Y7GNWLER3qB1i+xLBwsgnMqG5blCIOhN6gHg7uUtxdN/IWdeQQKgSUIETKjGkz4IL4usUgMMMmjSB9JFGN9LjSkcUl8b3D8lNWNnV9HQ1njUH0faqKDCS8mxZ380PcHA38vOLITpKvuXXs9wE03l0cJl15afhyuv7HsI0d4jhwB2Pt8uRkpBfL5Krls7FFzf+/U95wj6843x6k577pXbn8XG7urtBskmLnKMN54cWZdZ5O7jDChkDI0EPf9a06OjpgfGlEF0wYlcafm3wAaaBvlC3lSbWsMpIx0T2XERQ3qw0SIZN9RL/BAn2GTHsoMP4eUtY8afUCQC7avpPwqOAXn3ffp6jF7AeDgvmZZGdUWpPxRhLexOWedhplKnkP3XmC6iuRdY+oqgI/9ZKlixAgOh8nlAO+8tdzX60MfBbjssnb5dBD7Xrecqk6GeTfTTFY2y0oJIzmGcUflh4OJiUB0yPuJgxQ9kkcccoljMC4Le1gFAzzKX7MYITU7hHJQphQdjpw1+jcygDRuU3Xx2tjwP2J2x+YELj9/CsEigXzU4LmL3xeKtBFxU1Scl2bkcgOVBTxigmdO+SSE2MYh+CDCo1VzJicB7lsL8P4PAVxyib6tMdxwE8BPfRZgjVoRqdD2BwSXnfDdJcvMAF59udzyQYcHbM0cHYzkGMYXL810F/zzgf0MKEgDVexlJd0m68H4ejROvExy/6jwz9GU17nFmCU6bWYUHZaEoUEzScWhgJUXbTqC+CQ7xXKLLiqqSyYRCE/K4n/P/Zjo14CRMmTHj4aIDrWODvXBGZEOzd75FVcCfOgnAK69Tt/GVKy5B+DDHwNYvlxISPV/8xb3WyUIS4GU/umnUnIyNUcBIzmG8cRLM26a5UOyVIzCkogN0C/J2C90P1hSVgJCQix2xyk5YSSmAtQtRr3xB0iyPAzsj5MIVZKcKYboT5V6pSi0QRQIJqh5FtLU/TrsTuXaOM7h+PRrVZmUPw42TYFHSpCSA0CrOloySJEbiuCs+2B/1RsON94E8PFPRYiOh6DvEhhObCp57IdRfXnwgL59RnJUMJJjGD+89OIUQEY45UUGPxISUYm8/BvvsUg5DH9qDpgJCoJUBqmgxNJm4eAdKEeMr0JQAea+StGhytOsSovLoPIXbVteemIvo5aPJCA+UKk42llVhamKATeDibA4dcgOYL8cgvywio5fFEF2aoIzuYDzXdxiip9Yryc6CwnqO/NmNWNMB1svRwEjOYZxxJZq0awSbQegaDrhl1nnlDqXyJakkMQUBE1dY+SCS0eYPKLKF6ob2UURMuOTCmmLAr4AMluR0IiLJMYUKoXPlFQ/SDRV7d/L9AlBcCQVx3cyBoHgSKDi1eeO2Nzz7oUlODUc0bkvtFr3DPLxE3/v/nOPKToOLzyrrdkqIzpxGMkxjBdefrE0UxXQqiesjCIHi+8qjSoREYOoTf/wQEkqCtK2EMryULbBS1rMl6ofR/yosBiZAaIvhGpIpFI0VSGyQ5EUilzEfKPIOnq49VZd2jffBHjtVPwZSysYd8KJ2VQANGnRKjl+2D3vKZWcxcKtq8sp6s1K9qkyLX5FUa+H+vjKyyk5GcmJwEiOYdywTbaUaImPNgJHZnI6OMhO84LMFIMrlw6dUqSCq1N9pMaCQNCgTEcJ9dPG9YmGdoYXS3YEVYs0nUmkB0ePEGUqTl3mLUqSc/QV/h5lqaKUHN+vKUcETSI3QXnMfXe+aqp3J+OLF3tL7/D+D7c3W1Hfq54zYs5PnEiZZWUkJwJbDNAwPnj5xaaZqkCm/MWG42VdZ1/tqseNc2FFYe5+Jz2Tf2sImeAF78Q4IKzgWsPrDGp12E45VJjUb4y5LFgYUeijurqdMpjBGtAAj82EHcXDzzeySGCjv/w+hObzue4GoQEIbgE8Crk3Zvp9DXUdcN2IZwPEd4LagoODf/9e5Xo/GE7RmDkE8PqZutCynjfcALD6DoCrr0nLzxEctx7PD59ohvdL0GGBn7cH7k/TtV23MKB6meSlClNyDOOBl1+aBsi+0GmLVs3JiLjktVbBaQGNWcU/JZUTjS+Iop7c4nh+H/j5BntldUZXZA6pT33TSWx0IfIN2kSlYRySveo02+r3MVJySMUF583dUy4E6N9+p1LFcTj6qnwfm6nqc40/TueoNFVxSo6b4ZQ6k+rcWYDvfhvgmR8BvIEIjvvPkbvH/xLgye+Xqx2n4LZpfrHAfpKdFKf+ZsLy+6A3WTm/nOmWhS0JGMkxjAuq2VQiu0kMi5gcyHvEgNkrcDac/7EEn4uoVjuuTUK+ekGV7zshI3LGnUv9QxGfjLoQSAjZHi4/ZcJGOZh4emRG8sfBJLWRf3V8xyoqZQjnj/OmZNJgHI8pfxzARMc/+v41KV+4Ks3tdyakqQjOd75dbnMAEWXu6BGA7/1lOtG5c02niouHyBfy5PGUmpmaI8BIjmH08fJLbr2I9ap2iAMcZ3rh8vEHwFi5aDBrnEcUHHxTnP1DJyEDAtIj1ZsLo3a9RuVRZIfc1iKj+4nsZ8J8xTcirDt1m1sjqFGHCLmKkq7IveuUviunmGnGmAAHZjfCH6dhfkO7kPvkxic8DeJDqTlQOhpfcqmuPTV2PVmRFkoJxEcoTVl7Xkgr4zZK+IiZ3xT59vKjBic9YSSnXzCSYxgHbCXbkPzOEZQcPHipBtcWlcBuQY0TPIJJ5MS/r2RDJMEglBwufce/RFFeJz+/T1OlKc48xBbmJRfqSKlXpF+OpooJe1c5XKfcv+nUSeEmriu395RPUKBJIgAENSdvFhX0RRV462p8Q4Yz0bidxf0miGpOdcPt26VfW6b0zbnpFtRXQv59AyLPosCcAbxyWFuwkRwBRnIMo43DL22BjHI2xqcRk5XGUhWIC5zkHPPBUKgJDWBSg6eIa31AKCUFEyh8nqoe+eYr1CekouOHKYkAafbB96WNORVO4UHW2Lwk9D3VpbE61ocVykUAKZLTICo+kfEjcCoOoeTg80YWkk9OFeeqq3RtqVGs+YN8ify6k0Ssun1wf1pZN98i318UUxb6LutNVraHlQCbXWUYXRx+yf1xbxbrT72sMqwk4EGduda++IokVTr/PMgbwhktfIZ09XpFJz8/47ru0owrCGcSBXWT0gIiG34+xGyrWD+ywE63qAyx/1E/kHXhwMz2EopRTx13wP44RRPy7kBZ17c+7xTkJeiQMTQTrtNmQLOy8jCbgGRWca58R5qp6thRgLNvh8+KIjaNKFXYkVfK9JcqdyCvp7TjZ4HLialIjaA+M6Pz57UxeVP9vj0bqmnm6yoHZWpVxJ0AcMgZCwFgB9y1ZlfbKg8jjOQYRhlbq9kFPERC0wYM4QgGPspEQr1UpXg9khsNJ6AIAL4Z7UNmujgHikPGptxDpG+ldJ0p5uCRFKD7V6xHItkNqo8eSIMMK1WsGk7JmSCEeJ/s1G0lpSXPSbquR2cquV/NWmXyB35ElihMXZ3WnmNHIgQHmmFBvGp9mVuVq0Vfdnn5cXt/BflSWARpp5hh9dH0dPv3Tlc//jZBlmk82ddXnwer9DPVRI5tcOfdh9IrMFwwc5VhNHH45enOHyXoXR4apoFYYo0JSzINkVGw+UcyISFzjvZImnH8PCmzF6oXWRbVjuoyGAPQhpGUqYoCO9j7KgJh5iHNUz1AdD6OmaoiWziQzydh+viFC3z/UOYcdpq34HgMlNnKJwORT+q08doXhyU4jJnKD0ubkQQwVVt5FoHAdKB898SxriA3+/c6cnKwWvVdOVUvgDP/f6HIx+W3f+9Im8OM5BhGFVt6rjfLA1Tspj9lQg/vWI73kJEoCT5RcpfyJwd38BlBt0zKekKVT85kUhIGHM4+Wy6MiVLnq31msay5+kvAM6sogSumTDQIjIbgeKRGwXEKc1UK/CnjLMGh2uaRnjOn08pcpRm78d+NxpTVJ6Rs73D82GaA7CBA9mD3b64vH5ffIdi/T3YLGGIYyTGMHrCKQyKiCETD2uStiEIVJTkiUwN1r5xLVI6w0iSkL4AaFPzazlF8fxHB+po4jyk61C95ChKJoFQmLhImEpQzs9++4NiS0KiAK6dUccAnFJRjL6fm4JlWxCeF5BRO1BypoXyqmO9AZ2VkJZy5ykfQflQsi8VUgipcnH2wv9ym8VkFGXwRDuzbAQf2jZyqYyTHMIqoVBzlgEGZHPgI8i3pOsiGuOkP8NxaMThtX8ZFQmXRKDqNW1hFycJ8qfPcSx8IS75yQ1Wb6fBWxCG2Tg+6x+0oLfAbsWy/vlQ/aaeP++Yq/JxyRFI4YPICFBny8gnITUTJSd1tHJdVB+LvSaO9hIQ1m7AwYEFyGKdmJkgMb8RZYOIzuXxgDMf7rAfIdsGB/SM1Zd1IjmG0IKk4/SAD7K96LbuJqAZsucKgGwS0GGUp1SIY8KlBnSJkiKmo1BQUIKonHjozn4AxX8VA+QAR7UzJjzIPtQFuh3b6eL0mDB7wMTnAxIT0x8FEhzhi0oQVIpLlJKA2VQEqKyiX+L75Rbn7ryearFTohe30Eh/0a+W4tX8GznGKz2rIYAccHB2iYyTHMGro3RenVySMh81rKaH0AlQUiJUNSjGAiC+JWD2UsKFECIoOSaqoMIp4cH1GkJ2gDim7oUdA1dGHeuxC6WPkUERjdO8eG8oHY3IJFBmB6GC/nYDUEPzmikR/HKe+5Kg/ApMRR3AQAUrBihU8uQs6jQkPoiwA8WGxMCwHwM3YynbAwQMjsWeWkRzD6IBUcfo9kilEnLb5ktPFKRVFqFOCeBPCm1IsKilEGFZ0Gk3hFB3G9ECOz8SAJrWDqwPbjtisrvqo6A9W5Ur8ogSkMAHc+NtQceprrOLUUb1rznRFqTkNUkOoOMvbrExCleWXoSQ4KZxBcjzG31W2v1ugn7zGx4JxnOLj/HS2w6EDQ++jYyTHMEpIVHFashP2JZSgqJCZtZCARDKSijqPyDo2MeXCv6dVbxr150YOqU6IsOAsAyKSmH+nalixUvZ7g+cIzsfA9Flb+IspBioO9ZwZstM55mGeMTWH2jIiCYJZLHbeaNqg2INfBhMgls3c62t1F5bhVJ+1ANniK+sRGMkxjAZeedn9Ytg4NHXlBi36JhEsqCVcQdwAGmQu1LUOCJIlDrSkAyh4YUR5AXlSmKuIrIILTDDoyLHMmmXjOsRmfUUHLGb9Im7A1iDHA2zeJBkN9cV3JoZuOj+PnDiSCgtFbHpgORS5oWaAUf0V9EFyJ3rqFeDOEyQcRXm4TlHlsQcsCscpPg/BzMEN/W1Mf2EkxzAayIsVPNsubpUGauAnxzYFMaAIRhAUCdOO1RwJ0rxPJbITJWRCBRsDCKpsKwEDEZtY+QEhpNQVBVEM8s3oY2pePvFJ6g88gPqDL2VqQvca5AarQdhshdNiYoLyffvtlIY0mxTM3mLIjt/mtgTn+DG+HsGRUo6YfPuhKLXKYtGYDr1B8pDASI5hNJDBJr6eCkKgHRT7AeoXewcDkNnxL3dMLNjm9tIPeTOLYLBG5wGxoIgPJneCeiL9KpaaFXAQQtXSrBXEAo+QDJkTvyMpxaBBHwspeEq4T3gw0WmYq/DaOYQ5jDJTuU8qyXH7TeWo4li9wY7SFMFp83eUouLERByufLWCQ9xbuUKIj7B4as5aePGQ8H5eXBjJMQw/Xnl5I+R4p3Ef+OVIXHDhWvJDDshSGr/AFoNZnpBeVHK8SGR4AiT1hvq1G/QPIjaS6CGpRxnR5jAyEdaSTGqTif3P1c2Lr92Q8eprmhVrfFewWsOoLT558fPA5iuS7DD+P41PAi69FFVfod5w5/XGm20hqjjMUUWuInG429co23NhdlFZDkBmJMdgaI1c2mlc+hWvknX4vGJJ/BdgMNhiMiRklOyfwx3bgqirZsFCv80U2QiID1JyiFMRDT8gVBZVflB1LwCrXNK6QOKaQbi9YgXYr0iBE8q9l+r1dHIISQnVlwH3UBId/x6l5lAqUf05m6DmuDVeKHITqDuK8xScfk2v4lB9qgKjBjWuW/wtBPWZX2SOA+vhpZmhXDvHSI5huPFKMW18vbqO3EsiYyIlv1RwAo7MMBWI8RGtA65UBjBOrjhua27E/MruFImIj09sWEUsVt/IbfY5alUebX5+Nhz5qY8JA2XqsyAHfF+t8c06WMkBHdEJzFl+Osbfp/6kmKzesSpObjQEJ1XFmb3QfAYSv4lxH5YoSumk70cOsFK5OGSBxWU41Wd4JoZ4MJJjGG6IKk4CGu+TBJUlgBAnGLQy5mYdh8iLHbwi1cEkjiIgXGVT1Bs/gd9GSt5nlZyM6Rqhj+rF/hphYZV4RUeYxk0B90kS8HpEWbP+uM41tOaqm26uTpjBHt+rL3PvJPfSBeRFckzmfHMQ8UndR+rKVTpyI5Ed59uTgmNHUV+ho6jwMGQGgyM3GhKtNVU5zF8cBp5jJMdgaAH9H05bqZeCVl3woSE2jV+OSuLTpg7kkWoXztsngAlkJ2rC4mY1EdPIRbKFL7h2pEAor1VWGd1e/EwA9ZHWXFWAILKYpGA1B8+MovxvAGiCQ5IdYlp6XUDq9grXXhu2o5Gtguxo9/6q8dabiNAwik2iJStESsKWKvPFuUVnOOW6OcMHIzmG4cXhlx3B0Tkcx5Ax6YIXND4lFA+xOpwNglIfIhlKt1uNx5pEkZkrgZMrbjcavAPOh5WAOhlRN4oEUs+rLS/EcTpNIIgTR8BY8qj5embipYibbumWQZGC+mbuxeFMVgBNUgQQEpxOllRZhAqURNgA4NbVPLnh1BtAxKvuEw3efgvgrbc6SdPYDUEGqSOlplHgVNdb3qlry/yi++N0P4dfGro1c4zkGIYZ/ZM/G++QjDylwxMGrYZyQXOchUMflI1GkJBfo92cqYoiPtSu5JEyuefFVyxSX0kM0pBoihApqhfcyxypV5RXYfkK3rzTMDnlzWcSmKzw1HFo5hv45RDXFMFyPjkpzsfOL+eyy+iy/LBuQJMs33Z76cCsxeGXGPMU+u72ouKIaQSTch10pXIPsNlFn1nlf4ZumwcjOYbhxOFihWN6t/ECyl9JPYP41cpdky8tpcygNVOpuUtqh1CDNFItGmGNiGFYfR5Ug/FHEAkBwRYpsoPJix/WOWIFRiJvGXPk4gttiEasOuWC0i/nmmu7yVglB5pxfHKT582BNiA8jKrjX3Nh9efVV3RtqfGud8eVnIYS5dX93veklVX741DEBqgwRsWJgkgvKjoerrxSV8Tc3BBxHBi6GVZGcgzDiv46sTXGFe1bJkhIkAFhZAtenMIAHQlKEmaCgZ2IgNWGDPCJ1w6l2UhSb6iy/TBpzGBNZGRl0vqqkzQhkdoM5R2l74p/T2vmKUwzDCGg1BxsthKJDja9MGoOVaaPl2Z0banhTFbOqZrMj5vC7gjOfQCXXa4vx5mqnJJDkRg2jHnuWlOVCijtzUpz1dxQ+ON4n+GCkRzDsEIgOVoVh7vR809xIXtCEQH88owVKbEcYQBtDKR48IqAejlzfh4cYqSPRe41hyJ9SiUHYmGaZrDsL6xPmxWRKYLnQ0tynJKDFRqMxi2G3FBEBxOcRjnQvSf50LiPW4cm1Tfn/R9Gu4MTzs3+9erpdBXn4H5kkiIIDqnwJKg4jAAUROLeCykzq5z6ZxyHhZEcw/ChNFU9MBpPBr+gcv4WFR57YbZ+aUgJc+LlGyMXCjSaoliHh1KPpO6giE2Di2jrS80240YlDUPEhFPmSEEyH+oFAVcAXHNNt4o5EKoKIkDBIJ7z6Tgi1Mi7AqsgAcALz+raU8P51Xxyg6fo+DcRqbprDcAHP5qWv/NfeeF5WaWR1JxGdWIqDnHkfnjgqFoVB4ZOyTmkr/jCYHLYKmQw9EfFkZP1DxmfuX+LPc8iREfIPwY2qRuMqxdtHacTl0jUqGPWVV5w3o28qPheuVzlOnlQ/UKVncm/iDtR/LJxYV552mPKQyjKxeWj9td1TFE+rr4W4NRJ1B4Ev1/qMoLnIRz9uOCt/4Pzpcp3/eQ2wXRtSlmozxGdj36iTDdzEODEse5Mg/bjlwAAIABJREFUKKfyuKnijuCkmKhq7HkOYLbyewq+MwyxIVUf4TvQhifjxDcrZ4o5gjM/N0wKyhQceaWeYXUIbrx50UmPkRzDMIIhOSlvCylun0gDeZ2FL0npvJF/ZADFhITkCSlmKiKjVE6F2xzkHcsMEZ+UQSRWD7JuFMFLJS5Ems6116cBqcLtJeroBnZnflihWO12+g6AvS94AQxp9ElJKtEBIn6D3Pj+VKjvazz9FMD9n423B8MRo173ovLhiNILz3lV5RQuRs2h0FrFwcQclaGdPn5xNiSXi4svNko/8qpbFXIHAGwvPjfelLiAUu8wc5VhGNHjWgsJag+Ww4NTKky6VgyWmneSZCoS36eEvSRqOvHNV71IXqigRn0UZQPhmxPdOwuVXQ+8Ke/9hroiHXE9Is8pCj+t51OlnUrecT5myGRguoLmABtzPM79gZjwzfHj4Tr4QadPA+zf20M/9Qnf/0tvKweO4DBqTt2f1LHR5xCmiwGncf44GpIL1cacWTbMn1WQZQ9Aln0Jsuw1OHpkGxw9Mj3gJ92AkRzDcKFcAHBVWCfhhSIFciRGl5kMPL5lgAIZKactj9CmI0kNNRhTv7yFQTs6fRzlG2QVmz6eNaKWRyoBMQClENtGWSn+OXQ1qCzpAGbGG+6nV5Qkx/nl3HiLRyiEmU54plVAdLxjEI8hOz654epQf3b/EODMgv+I72LP8+W0cQ3BIR2RFWoO9X1p87f+rnv1cS9caFHAosItC3IQjh7ZCkePLMiaOkZyDMMGT8VhfiEC9/LQEBzFC4hScdh4OD8/jTSS6YroP/C2CqhuWElp1FX6dUs0pg7zy8ODfGN1YYJ0SesHSSQuIJwciAfAro+Dj7hoTGY0D5eo9+HDinQVpm9HfyeIrPiEh1NvKJMLRXAw2aHIDfU3W+Obf7E4ROfQfoCnnlASHAjDfEhqTvCKofoTHamEt9+pa5cre+7isCs53OchyLJdcOzowNfVMZJjGDZsJF+SOfUSwRH4y57BEh+JvDBKDnvOgBtUuaMWkrijNVtJZbJEg5rdldMmqp7MZylkRwHcN0HV8IAXMRUGYVWA88t543VdnZxfDsFxmtUSZks1lBngSU0OYTgmPPgSEy2nOuxcYKLjCM7j36FNdtJ541kShCYAQVg0X12czJmqtCsdnz+nize8WF346xw7ummQNTSSYxgeHH5pGiAP96qKvixiBEcgTGwB2sGViSeOqxwxIl6sjfOoc40A/CuSMNeQCotfba0vDDLZBV0U8Znx44tr0VDkj1l4D98jlSRAjrR0cby/UMpzoernQWuyuuLKaldyQc2p0RjoCaKDFRzwwhokCVAZ0IwjsS7nE7PzGwtDdJyJ6nvfIdSWGNmJEBxW+WLUnBQVJ8VUNTv0/jiaz6rCX+f4sYERHSM5hmFC11TF/SptRIAwQoybaAgQG4W62atK4JuKmPNO8ZpflEI5jfGcmoWFB4NUUFO5KUIT+ZUrqkMKSSSog1A+9X1IfqRZewdkjpAdOKDPY829PK8ITFboXCI4kuMxp+Y0SA+j6jhF52v/H8Czz7Trsxjc4P/tHQA/fKJJYtoSHB+SmYr/UtGgeI7WVOVwXrkFyGjAEZ2BbO5pU8gNw4TySy6+I3L6nEzTlgC1GuGbbiVt2tCmHCpb9tc5V6T0wvajCYNCzlUsMo06E9JS6/PkVN/lzUsNiuyINWzaTCen6uxPKSenaPtVJ76nB/fpp5KvuQfgu98qVRKcXU2+6jb51526AvMs0PT+xpRy6BLCThpohsfw7I8AZvYDvPu9AKvvUHcxC0du3Do4bpq4vwcY/k6nEhzxx4X3IIO/r8Rp447gaE1Vdft6mt03dNgOJ46vg2uv6+vaOkZyDMODXJo6njrwxAhODwMZEC9OnGUwZvsB3nkvgypHWsgBnDiS9anHN6JeFOkgCRfKOygvRk4FNEgEoEXr/EGbKhfXTyKAKM+giZjMtAFTx7r+bvsBt2mlBo7oPPOjbvq6MblXX0BkJ2cWPwRMxhiyAwThaTxXxQD85lsA3/8ewI+fBrj7XQC33Jq+yJ/bPsL1lfsUs40w6eXIi3cvheBIZiqK9FBo3Ksu3pfggzt6s6o0WFURHbemzi73ZIvjtdf1ZNvM8l4d+wyGfuBl548DB8OchO8ne6slwYkRl5jigX+VR31shHOgXrCSD0Xs6OUVxEXlkGlwnIjZI+boisuP1qnHOvTaZ/08xp5lfbjlFoAHfhlUePMNgH/3SNcHAnx/CGheAzTPA18l5NdE+WyRM9yIgBShoe6eqavKz+VXAFx/fRjPDfCO2Lx2qjy+9Sbxt4dO+vW3KZIdZPoVny+q1xXvAPhvfjXWQ920jZWuxx4z1YKC2+Caa3ekNtaUHMOwAP2MaUNuiJvJBKdVoeHtNr8d1KoAZ69KTcPlwbzopXSNX7ToflB08PNXhrYOuKCoojNgYDOQWAWinm5RQDfLSmPCcA7Id98LsPf5Kjt/wK3ICVZx6nNgzGkdkSZDefqmK0CEh/r70zAdL93pU+XH4cfMDwpgwmM/Prhz6JXgoLID0kM3tXPx4YQ9uMZTxZGwulpf50E4ecIRni1wzbXbtInN8dgwLKhMVTk/iDK3mpES70t5prxcVeVTiM20ol6m9UkbezwzgyooTtuWerBEZbDlIgVBSiICzXAismxW0dt3iZhQ1Uw7KDJEOWEzM83quv7oKX32H/pIV4FqDLiCKte5xkfw8sm7378c5dm4jx2SvTpEP1R0r06YtOBwv26NMHTdVtkhfcGodwHDanIiTn3pVBytWdLh3LlxmFXV9rO6mI116uQhOHVS5ahsJMcwJMjXJZOQRgTmRSllEgSheOyACcSLTqiklpjlVNnC6J1kahZewg2ThhfGlisUEyUrEV8FMk9uynasEj4B8nxHWpenLJ96dqnkpsbzCbt4F2rOPc2/CUx2gCA63LFBaIAgO/79PPx7y1t+SFKDSQ/+04+QG47s+G3nzkkzI/ohEnAgRs3JURxIVHHcXlVuAUCDU3ceg1Mnt8R6wkiOYViwPqiHitwwt5LBkSTpVxtDcGKkh0NjUFUMqDF/iNg96cenlCVZT8oXI2Fwl6Ca3UJdUvFZ+UZTkcSKM+VqyE0NN034hQSi86GPNkkBJilaokMRHFK54QiPdy+Vi5OkhiA9uAANuWlc530mOJKZCv+xVcdUFef8haWs4lCfL8Brp7bDa6fYLSKM5BgWHy+/2PTHib4YU1QTIm6QPzdQKgZV8jaOk8oiqJesZqRg6otfvGxWTF9xSHS1aNYnlqdvyhIlNeIydVSN3cKmsciRNMMlM8nu0c0+0sKpOe9d2+3ngKBgMkMRHIYcUXlRhAffC8iP8KGYESY+5H0iTLxG51Kf1BlS74WA4ACRJm/G9Y+f+JT+2c7PN6fGG2o8UDgmM0THSI5hGFCSHJHcCD8L2VvEQBgMhkqCw/Id4UXKpeMiqMxPxAuW5FQtzEKx8nCYlD9J9oD2iZHtgl5SyvxE+eZg85tG4SKOlBoVM5lRAlErVcubku2cj930aC0++FGA5Ss8glFnKZCahn8OVirQeYPsEISHIj0MfxHjBKSGIDak+QqH4bSJ55jgYLJI3mdMWOAdb74lbfG/c2eXumojfdZClm2lus1IjmHxkcM0PWAKxAbkW2TcWMJcuIczYQdxsWCZyFADqEgEJPRohokSmEigRC7akq/OAJyQaV+IHpFfoObgiB7bSe1Lqu9SHJDd7uQds5VHOuoCNf449ZE6B4LckE7HAnsJTFERNuQTGEq1IR2RCXIzCIITxA3YTbNe9fGnPgtqFCrOkptVlYoH4fRrm3EaIzmGYQDyklcQG3bgYF6Q9EW0uO69yGhJxUkdYCkClOMTgQglD+ia8iLxE7LugPXnpUxUbWaQCWUlA/U7m19KQamzyrJyOnmKmnPfWoCbb25+fznfHO5ImW1yIp+o03HCD5KA50RmWImEB9VZuqbOtQQnx3HR+yDPwzDnbKxd3RiqzThNrdF8vghnTk/7XWckxzAMmI6+CaMvSe1blEhGpQ9+keI0mERF4gBBYvA1peTgKgS/IOtBhAjvN8gsU4kPYUbTEitRPYmQotZkJ0ZuOORyldrU51s70+Kv/0yp6gQOw+ARHUKtEX11amjVHK/cgPxQpjL8wVkIxKYNuek7wWH8cPyLa64F+NBPgBqm4qSisYaOkRzDEIDYeRzod50qAvmeVJIYKQ1A8wUmVasV4SIGlkb9ELHBL9ReSJ5INFLzYwaCNvWSps6nZNm2WclkRKlAUfWhzFT+5Zuvp00pv/LK0j/HJzc5OseEB5jvIUWEwEvbIDccoSH+NtkPR368/qOIDa5v8jUib/i8Uzj1vaYIDu7LRDMVLPl1cdp81sPrZzrWASM5hsXFizMbGmOiSGyECCSpAT4ud08MZ6Lily+VNqbi+MCKRXz1OnRN+Qb0AKmujXZz7QHG4ZiMiE6JjEVFp0/odCUxSCWDmD6eNP3fw7d3ps2wcTOt3OaXmNz4g2+Ojp1wQtWRyENAbnB/pbAcKhkmPX4cTL6o+sX+DgllijrvHNA57orG/eroZlNdcx2o4dbEcWvjGFLR8c0xkmNYbJTT/tjBQ2Q9zC30QiLjUkREqEhO3NcSieDFGomj8Zeg8u28aLNGUIP09In3BC9wNaTBnMosgcE0CETWVEYKQpSQV6cqCkIVkC5pKnlbVBm4dXNSppQ73P+Z0v/D/w5wJqnOkQjj1ByKYAAQpEej6kgmLJw9U64mjLz26s2ddw4cwRHI0O13ALzv/cQDEnDu/FJXZdp+HoA3Xi/GFiM5hkVGvdJxjl4QArEBL1oQwBCK4BcllYwhPjmEeVPxSRKkqDj5S1nBHjJgCEwsLUV2mEGkNQiTWgrREslo5Bk3jiiQnGIuoFdyIs26IqeoQ0jQcPLdTwGcOK6vg/PL+ezPMc8iZ44RglODu2aJTyci8xEg5aslPJT6pCU7gL5T3N9dTsR1fjipZiqn2M3PpaUx+NgIRnIMQwC0gJPwosPvxTAgjAeAiAMzQIrERzvYawZkgeBQWQX3vWOuJCtidev41ICaOsL7ZeNBXGOuUgLXS7TiKQuLWQKpyMn90wYMEfvGV9LycoPshk8ryCdBcPzBW6PmSASklw9GCuHhyE2Orhvx/XuI1KQQnBUrS4LjjloUzsaz1XfNPi0/RnIMQ4HuascUnwg4DEFqWDSYDp0vR5CkMhrkoI5KkRSOUNXXXP4SsfGPzACoGcQgR2nz8FTq4py9SAMeLDjSKYHopsECD2hEgRr+00nGKDdSHk7JeSLRbLXm3nJqeSrByb3zOpwiEFyYqOgoEctPbbpiyA1JdvLmd1M6B7/f/DAA+JmfT/PDgWrKeP03ap+2n2JsmWz9pTMY+gHq3ce+D4UXpXbQVcXr9YXM5aEpr3qx5dA9SgUFvygF4HyjpCDp4TAVJuookYNOVll1n8gTp6/j4vZF+xGlj2aAjp1yM6ItQiWCIO33DTXk+98tV8y9NmEA/finSjPInue9OjiSlXePAM17ne+kdw6ozbWqRYXV6JXoaPMi7zGqJ0lgoElSGudEOr9MHP+nPgNw8zt1baoxO1sqOQuiFI41ilm7puQMCnuen4Y9z6u2gl/i8DbmzL2PFIaixohLEI/ID9ALigL+RcumoerKDNTUixaTD+5INUBqg08yGvESBp8Y6QKvT7TEizpKBWIH38YAk9Bf2kEkyZRVlylUQtXdSlXn619J389ow2cA1tzTrWfwAe+7mMvnnTYp1ZxUVUebnr1HmXUp9QbfpwiO1xf+H6pEcFI23wTbn6rveOvNqSzvJ7teqtjzvJPFNlWml3A37RK7AWBXsZEYwHZYc8/ppd5tBWYO6r+A0uAuBkWKwL/KUu5zL1ztNUl2mHDKjBAcqTDiGOTHHSkThrYuxEDZGGC8PIJ0KXXU1JVTlPrRR9LziilYXLlCGL5/77sB/spPQxLc4nL/z38COHmC8Z3yTaH+zDLiHN/DGIQiIY5biPRKYWIcSrFRnrchOK5NzkzliI6hX7jfSE4v2PO8IzZbalksEY8Uadfcc2gUm94XzBx0y28fVGcVfFVbkJKUeNx9MTxCejTn0sAYDKaRwTH1iMtqQy5YclMfBSIhkZ1oHyhJF65DT6SmDQGKENLgOQr368OnfxrgnsRB1RGdx74GcOgAM+0e0skOFxaDT4RajUkUsQGCyFBhBLnB1ylkpw3BgcoPZ85mU/UZRnJaYe8LG6qlo9uQG4yHC7Jz97uWnrIzc9D142PkvcZLJaNu0OCIBpucIzDcPYkQRQgOvlYrOoJfizSQ+/WiSIefT3Cs0wnxuDq0UncU5UWPUlnKPqPqSJWrqRMuXyQ3Un2E5+qf/82/neafU2PH1wBeeL5JZiTS40VTqTmYJPUM/xlQeWkJj4LcsNd9JjgXL9rWDYPBVeaTk4q9e7YCZI8BZKv75Pb+EEC2C/buWdffio4IcurjBwKKQCByu5FFUCAXEb1Ic6l84h7lH9AY7Diyg+tCXXKDNVm5bhzsU5JzR6kjuXqhQVgc0KR9nVIGQoJ4tAbRp2RVFPULlI8UZ55YvkIeX/4PAG+8np6v89F51z0MCcybBNL/2+Su8d9v5zIPP/QLoPkJ0uE/0RzFQ/f88EZ8icD49zHZ7TPBcerN7AWbRTWIz2WXnR4/JWdfQRY2VP4x09XHV1ycb8zpyj+m9JG5a03cZLRvz1ThS8P73PSKM4Vfz11rtg8o/+HDIV/JEb6HuSTm+Dc5UhDJH4iXXeeSSFcXmRPxqTRt1Bzw8g/Ih9bnBt9DpGCgx4ipqK5fiqKjVWQoUxrbJ9q+8fNIuefXtcVzDcqO3HdKzl/762lrstR44blS1cEmKk7NoRQaSbXpi6KTk6dknOA+FY7DpGvm79YttvjAL6dPEy/yqTbfNIvKIDADl1w6PR4kZ9/e6Wqvio0tTUiO+GwtSMxdd9Nmo317HSFa23Nd47gf7rp7xwKUs/g4dMA9sy8G9eBeThyZEdNHyBNHkjgCAwzx4cKTCQ6+VpowRJLTJ/8Ttb+L9ijUZxBmq16OnXop+o8iMJo43DNuPEsiDN+/7rrSdNUGrxwG+Mp/KWf4YAWKIzgNzoIITN9NVRQ4UoMCcZ9SYWwcps+vvRbgZ36h3DYjudq5EZzB4hG45JJNo22u2r93Gvbv3QYZHIQMHoIMVreUvNZCBl+CDA7B/r1bYP/eKVTOtirOQkhs22H/3qViumr2c+6/RPxPEIFHkB6hc8u/n/MvtUb9CBOUf08KC9Jy55FBTyI4gLP0wtB41TNwfXKmXJFcEF2Q9L7nKtGmkVwF0OAnZa0xS/Wl/yP5Hz8O8PU/b5f1zbcA/PLfKlWJBqkjfKkwWaX+9vy/t8CUlfKwUTrKfEXFbRSlCAvqjq798/etA/iV/7odwYFqPRwjOINEIRaMrpKzf5+b1fSFAeU+UyhDd961Hfbvo9WGwWI33HnX+BOdgwe8Z6j4HubE+z1IxpGQyP3G7QhhSYrP+MuoFJ0+qTh+vmIa4RhTUMj6JKo6XL2TylQcqYErVp9Y/4j1YsJU8aVny9yv8773PQCf/hlojR88DvDk41XqyCyrxikVFlz0CdTfHnNBvQPYMOHamQLdpqduIca2MAVnIXAVrFx5evRWPD6wb10xsykbqOnImby+DAf2PQJZucnXAmMtHNi3Be64a8silL2A0BAOdFEcFGYrLakJ0uTtwjp5cISlus5QUlbdkarOECcyTl1ghvrQG2D9elADNpNNWFc8WNcr6Ur1w/eJyHhFYxyVO5LxxJvhfa69VCR25eS0ryFfNgrwL4vzrNmfz/24PP9MS6LzoY+WA7mbZn7yePOZAqAVkOtrYMJQeL8Q9Kv0N9QjucmrncRT96HCMIKzEHjUERwYOSXnwP4NlfPvqiGozaBxpnCavuPO8Z1afnB/V8mJvay0SP0+S2RI42PD3ZN8ceryJLLTecFmOuUCgL8npkk8xvJlfWP64Q+kPbZRjvrRNxGyGJC61DDFM/fDatzznvZEp4ZTddwn5osTVXPIgJag/j6FAJHwUOTIC3POxfd/tjf1BsxEtYC4H1asKMxVo6PkHNy/qfCbWTpYVTlTj6+aIxGMWDp2tlUfyiR/8QsERyI3mMx0iAtZqeZlji6CQVJRZyCEBZU6wdSPaB5ZV6oSrKrTKzCx0GQX6QTyFupAce+qNuWm9I9S1YFK0XnjDMDPb2yvQDhVx02PfuyrAK8e9upak5267yk1B+g/2F65DtlXzN8Sey8S5k4//FGA972/N/XGfT8cwTEsBHbWBAdGRsk5eMCZqJ4agposNM7A7XdMDVeV+ogDSr8q9kWlGK1jpKbxUmPy4wayVLWGGsRIBcc/9wZVUXVg7iUpEyhuWx+YhpqC72vr0ouq0tJXJ9pvLerj9wPpp4UUMO65cueauHXZ110P8Et/o7fBGqoZWD/4XnnEao6k2pCkpi3Tkf6ehQDqfcCF3XMvwId+or1jcSevvFzsz7BQuB2WL+8sCzP8JOfQgelqPZulYKKicD9M3zGeU8olkiP9AuMQIzSN24o8taapKHnh8hJMVtKAyA1u+/YCHNgLcPgwwLmz4N0scdMt5cf5FVx1dUvCIA3kEdJTVydKRFJJRb9JjXSvmvb76isAp04CHHmFeK4AcMONAFNXA9xwA8DyFZH+ioUJdWz0BXre1PfpHasAfv4BgGuvp+udAonsQAKpSeU57J9ljPhQhIcI6xe5gWrDTduqYSHxG7B8+Va/vBEwV2VLxQeHw4Z6KtzYIad8iBNId45fkD0SF00c0k9HisOoORlEBjNAAxszEjhi43wlnvmRR2wYHNjfDb/pZoCP/yTA+z9EtwubfqTnoyEOwAwqdCF8WVJ8HMxlSwE/DwxHbGYOATz7dEluYjh6pBvhjjsBbr+rJDxF1p7ZK9mER6mNngNwHtitmuevnwH4j38CsP5+gHvvSyk4hJtu/ou/VJKcp59yLgXIMdmvHzTNWj5wPBGav9/gJH7PqVuO/PeL3EBFcNxnEBuUDjfOVLVb6HH7EZic3IoDh1vJmTk4yGnio4KdsPr2DWPZMrcmEWRfSCY2jfhKBxPWnwbnl5BeExZTfEgShAcJQmF4ZjfAV/+sHGB6wdRV5WyR93+wWd9kU1UvqkpMrdHGS62zwkzlyI0jkI7c9Lq30PU3ALx3bXls9BnqR5boEoSSC/PD8Xldrnvmn/qp3trk4403SrLzwrMA588z5qsaktqTAPy3Q4EjNnm1mJ/zNXKbm/ZqxvPh1JvhGlvdhtAPLkA5u6tFeaeqH+cLRXR2w+QkuezK8JKcmUOukw4tcRUHijV7Vk9PD0E9+o+C5AgkVktA2LRM+pR8teSGCo8pOrie0UEuAzh1AuDf/1vXd7r6a3HjTeV2ADfeLM8WSiEI1P2G6aqfxx7MaVwbDh0EePw7AG++0d++fte9AO95XzljR1Vv7pwgMJpzvwznp/PznwN4R5/UixpuZ3On7Bza3yU8MKClcjBif/tOqXGqjSM2bbZikLET5uaeA4D/od8Zt8RMQTqWLdsFc3MbqpX9B7H8ypki72XLuhNl5ubWLRDReaSYpLNsGTkTeXhJzouHTMWpcdv0eOqd+/ZsgSz7Qj1+iy8nCRrSooqTd6VlLZEJyAsTpiY8wsD2zccAHv1Pcht6xed+BWAdUnU40qU5atUdv7xWTsa9kBoU5gblb/5FaZ4aFC6/HOCTGwCuukqui/i9aEls8PnKlQAf/URXzes3nNroyM4rLwOcOI4yjzkmM6D+5qS4zrTmpn/f8s5BEBuoBvktFYlwA/zGYj23xf2R/mixHyIe/OfmNlV1bbMFEoVHivyWLQv/YObmpqtlXwa1rt0fNIgVgeEkOS/OmIrj47bV40tyUolsqroT+35rv/9RsxN3L6LYkDOn0PnZtwH+3b8B+PGPdHXtFY7kOLITnSmU6sjbwlzUj6OmnPr6xIlyS4R+qzcUli8H+MCHAKbrtVci5Mvvy0a/emFcHOm87oN33gbw2Z/tv6rjw+2J5Rzj3eKCjvS4XdPb7JzOIa82Kb3yyvJ48zvLz2CxsyAT5ZjVxfz8VEUmHhp0BRBmivpMTMi+nPPzGyvT0sYWY+3uisRtg4mJ+Fpu8/NbqiVR+jWm7y7yi7VxaEnOSzPuC7OU1sSRcesSJTmtlZ0+ERuSzLQNww7Hktrj3Tv8EsC//ze9+96kwhGdjb/crFev5p8U0tJLelx+tN7V+QvPlwrOQuMjHytVBr+enUMPhEdLfvy+c6qOc0b/iU8sbCe477dT0E5WSo8jPq9HyI8jMStXlL40xfnKQak0HM5UA/c2Mdb8/HRFdgbtEzNTlDMxIdeHwvz8hmqSy3T1obCjInI7YGIiXebsTz8kt3FISc6LrjPXD0FNhgFn4NbbxnOtnL0vVCQneXU6Gj2Rm5qEMAu7aaaAs+Et/XEcwflXD8dnTQ0K6z5QEh082PaT7LDxYyqSVk1S1nfP8wA7F4Hg1CiIzh39ITQp6o1XXOP5uKnmP/1zAO+8dSDNHQM8XA3Y+hXp83y6Unw29dFUBJVZahtkxUzk4UeeT3kK0gOK+s5UJi/Xxl2p7Rs+kvPyi64DXhuCmgwLdsI7bxvP2VUdktMjJP+Z6Gq0kunJyyeaBis1XFyC4AAeuIaA4NRYWxOdVGJTnzMDM+fczJGcnmd9CXH2PLe4BKfGJz8FcHNNKgbgowOY2DDn/j1nwvrpny1JjwEqQrE5ME2lIs/XVYP8hhY/6GcqVWVHMfhn2Whv/VP2hRv36yN4y6bs6rV9Q7hOTjb+u2+nIZm5jjTql6u/tgR+UWsQDIYYCnLDKSxsHAXBacTN6XvDQnAcdv+wnHn10Y8r+6yG0F+NS+454U0vU6FUBxdbwfEet3ZIAAAgAElEQVTx+HcB7r+inNbPgSLXWrDfUwEvvwjwf/1rgHffB/CxTy5lsrOzUm76s2ZZqUj47/baTOQP9D52VarRriT1aBTQVWcGsh7c8JGcDMZTtWiP8VwIEPyBjRiQUge2aPwExSaqxghhxGmo3jBmGIezZwG+9H+2JziXXALw7vcCvOc+gJWXdsMP7AP44RMAp1uIpF/5U4AbbgLwVzJIeTyB8hCNHPYZ3icqymGImzjITXPe+Q1NpWhccQXAnWvK1Y3rAtxaOi/OOJM7wGziujpub6Nv7yyVE+eUzLUjhmBRwD7g2WcAfvw0wHveW36cwrM08Eg1Y2rQPzYPdfxdDH3FMCo547tXUzssgS99y5exhghJcThzlqjeaMO4+Jw6VJ186f8AeO1UvF0Yjtx8cj3AJz4FcMmlyGSRl/4ebtE/R3T+4qvpZOdP/i3Ar3++LAcwQWN8bzgkPW7CVNgAt/uot5owtTHpyRMAO1oSHEduPrG+VLiwOQ4qE48jO25jzKcTx8a33wL4/nfL50iRlYC7EKsa+3Xx8+AWQwbCFy34u6jOHdFxn1tvq8j0e9PaNxo4UxGbbT2bpQyLjmFUcsxc1cUjcPM7x0ua1KCVeSLBlCL5ItSjodYPB6hBmwrn/CW8vL/1WLtF/pwp4Vf+VkluOCWkvnBTlu99D8B//pNyENbi/DmAr/5puYw/KqI1ktQg1J5ey/7Ot9qtYOycsd3MM6xCYtLgFvp737qSDHztz9NUncMvAxw7CnDdDehGjPD44QTh6QU4C6dUOcXqsa8D3PfecnHD6/qwH9bi4tGOg6thbDCMSs4Q1GFoIC5yNPLol9O7Kp+I2gKIdIjpUggPhIMNLqe+fuJ7sUaE+PmNpYJD5s+EOTXmv/o7AP/5PwDselJf1u6nSpJTIwPPWRiBHFwxQ2GIS+eofK7kURjb3fTkVxOn5DvS8ld/odzY1Ae5lZRHkl38jb8E8PWvpCl0e19obv8Qg4bwdANSWi7Dkd8nnyg/zl/nrjUA940U4amJzfax83UxFBhGJcdQ4hG46ZYlLpV6A2hjk7sU85CiDKDe+0J4CukBNOBzBMedpKyF44jK3/lvy40fpanAALxy5bZxcEghOjMHAG673WtzZJNJlZIgEBVcZy5pB4pB/I3Ehf6uvqYkOI7o1O3ROETXcdw6Lp/+6TSi01CZqD7uB1kJbFZ8npr2us0/n/x++Vm1qtyF3fmG3XF3ZeYcCsx0ZiWVRyM2Y45hVHIO2Ro5BdbBq69MwU03j/Efobc2TSeIeZH2Og08Nb6oyEhhsTgxsqOAGzD+3j8CuOkWRKYiKgZFetzKxs7J+flndWWvxIOVsu+xOtMvsxPlJI6PObT4jlQoCM4vAqxAjsCpeTmC9Kn7Af7s/013SMaFBcJMhPC05UMxYkPdr8s6eRJg/76S8LgAt62C+77ecVepbrnj4HGmchjeVRGaXeZjs/QwHCTnyCv1HHlTcrpYW/3aGN/ZZklmCS4P1lai/pFKp8u9L2NsrRshTIyDynNOnM6pUwJFcLB6k2XNa7a51T1HdNyMriOvymU7guNmWflt8NuSa46o7Zp64vqKD5JzQPbUELfztAaO4PzsL1YKDjL3tCEOl19REp1vfEUXN2iT33zi2Qf1I8xUEkHq56ys+Tm/sqVK6bZz+MH3u+GO+Dg/Mqf0ONzpER8dCTrjzXo6jaZZHzJCY4BFIzlHXp32FkLaAJDZSlM01sORV7fBjTdtGsbKDR4pZCXyC1ttjoLmQB1Nw+WTot5UJ27DxhjJ+YXPIYJDKDmSmYpaTM+Rl42/AvCv/1e57I9+rFlf/5gyLkpcRUV2vJOgKjElJwdYvhLgvrUAz+zmy3DEpkNwyMJDdJQNKk71xXXTzWNlOzhHXrYchoyI/CSZ8feGizXJEZyFHPFxt5zi4/A1VF8/2cTE/wZ/tPXXBltpwzhiYkHbdPTIBjh6xC3NfBCy7IuQZQ9Alq0qXg724T4PwtEjY0xycjQwVde1QyvDM8L4HJHx8ovGh/DligtWKTqY4EjypJfHnXeXJIaD8+v4wEfochvnworC/tFPd+ONAA/8Ml/2+94P8KmfItqL2tIgh5Gj2C0ahacH2fdDHwa4hlF0OgRnZbx+sbBugu7pe9eWe1VxcFs8uF3KSaA2Z6DsB+TTNjBU5Vy8qCvAlHvDgLEwSs7RI1PVugOD3qBsXLEVjh7ZATfcOF7yqziVO4isCmrEFQkSEUgpLeQPUQ3h4cwJnMLjqTlu1+QfPN51UnWSvlvy/467ZJVGOiebjtrupke7Bf92/EV3HR1nHnvXvSXJIdshza6KqTZy9QYKR2B+6W+Um3K6bR1qOOLjVJQrrujWsaGcCCsxd8LIKVdNcuc2wHT7Qh3Y3/XRuezycmaSIzh5mCwZ7KQqbKKiq9lsk9L5uEbHXGUwLC4GT3KOHdkIWbHugJmk2mNVRRI3jmoDktHaT0ehxGTNIDG9SrnBp5SSQ5AgjuzccWf5Sz/z+iHnlBglwZGUEf/eqqsAHvhrTD2VKg6p5jBpYlFSoSEFPmlZcw/Amnc16xwQU+KaJG0a9cmDWzTwFmavqm5Fu+fiDCvCF0d8bn0yWXHEZ06p5JBYTPZrGDcM1lx17OgWgOzLpc9NBvbp6fMAHDs6Xk7Iec5/UtICMnE1I3Zf+HkziI3XuM7pPPyLRt7+IJ83w3KqHC87qo1UNclzgeyIphXtgMJsCJk6HkkENDVhchuAcCYX0krZSmYWf7Zg57TXgRv1dYbPJYImxMf1DSK3gJrgcOVkfamGwQADVXKOH9tW+JMY+omtnVloSxLML39ObYk5KZNBRBlaNQcPMKKaQyg71L3MC0tVcFhlh6sjEaYiMxE2wDrjJsAnkVI9sJoU8CB/7SUIHXhjxEeCuEUI82XsBFP3cyYuus+lF8Ua6WaPz2oOm6qksiLrLBkMPWIwSs7xY5vN/2YgWAvHjy2BDUzz5idwRGbuU4pN4wTF8T+AFReiHJx/I8xXbnA9AaXFhEZaTM9rYyMs4RxnHhCGXA7Dz4UiPphcAGorLhyvl9MIQ8d+QKsKRB15GaINQNeXVHXC7OgMA/kFnROKR1B/7lwoCys7GboX60vS6ViRjqqPqTmGHtF/JefE8Q3FzCnDoLBlfNbOQRsoqpIIEclBWfp1HvklyxZFqDDUL2wcJ4iC8uFWLu4ZxLo55MKBTB8JfEmuI2Kb3DjeqpmaRG0zl9II6+SQSg7Vz4Ljr6pOg5A9EvIM2o3CtDOrtDCiY+gBvZOcE8enkAlluz2QgWI9nDg+DddeN/ozrRq//rk3mWYQRZeiYzEQgy4RUXUPqSFJ6RkCRpGfxv0+nVONYUkbDmMUG5K4MWUJQapIVF1YEpGwv1aUCyuUHL+fpdl5OB+1eakleROz6OPaObOzvdXNYOgj2pGckyc2dhbzy7LV9kAWHBsr/5zRRmMwYF78DcQUFi59JG+pPHJQwAkiqkhnMI34f3DkhxyM25KdnCGU2hFGSwqEeJIpTSqSIpRkci9eTaApvw/KJycy+ztpzyqcmPK/IX1yUvxUhMX2QFj5WEybiqxLJjsqTkrekTYA85U1GBTQk5yTJ5xi43xt3MJ0RmwWF5vGguT4EN+Hih3EqSBS0eEyQgMnJjUkr9GQG/9Eq94oiRC0IDiN9BHHXLHffTAzlXBZOEpOtHkQ/jjJoExSAhmqSU3KOjJqDoAIT8b0DUXYQEGW2foIFZTq7qs4VJ5tnYwX8+tgGGnoSM6pkxshy7YauRkarIVTJ6fg6mtGfPNOTCy4lzR5QdzH93Ka6QRphAG4UT+BDATZcWGCmkMOQsK9VgQnzJqVYziyk0LSgsshH62CdqILsqu0xCwmE8UqJKTJmds++eGIUDKykGzV521MVRqYkmNoCXl2lRtIT510C/l92QjO0GH0nY9z7wPQnN2UAxqE8zANSVZQXCotjp/juERZvlpBroVTf1AhQVgehovpqHttZluhdnOOx422cu3202kG6BiJ1JKEGpEZS41643MNUklAPRMoYgZUO3sTeVPRtROnNFlHm4wLYBL0tAigplyDIQ28kvPaqSnIsh3VbtiG4cO60Xfypn7VEuHiC5i76Q+cgicyqUoweYs+IW3DqDoxg35AAjDpoAZUabDn+o5ZXTfDJEh4MH0TbIT+gZi5jciLImlsWwhyJsaj7rWZSSWgnw66mDBJ1wGw+S4r/XGCNXIi6QyGAYMmOY7gABjBGW6M/qKAAcfRDira96Q3gHE8hyIO7KXil7j4Cz1Sac22DOS1QMbYaAThYVUcKj6RJ0UWqP5jFR0iTKV49HvQrAdihW9OI1nMJydGeBQEgLzd0pm4H77BPi5iUxWTSOFnHN4wGNohJDmnXzMFZzQwNT5N8Qc/4oXWRskhB3DuLcopPOpKoCjUQB8J4wbHJLIj5IPZCK6rto/xoofUOZVhjLgupqNx4KvSh7rECI9PmlJmUmXK77La/6aPs60Cf5yUvEzhMQwGlJKzzQjOSGD96DeB+MVOTiVXvvykgdRXdKLqDJcHMxjEyE2DAMSmkefNI1m+4horPSp1RrEWDtVULl4jjYZMRdqrT9g8b0NY2eh9Gog5TuVPKQ9mVSVkTBHrWD698ozz5/ucocHQO5ok58xpN4vqAetXw4IgKqpIaoAEYWDD4RoiRZGLDA/ifjaSQsORhoiqwxIcatZUKsHBfSMRHEGt4dpHDuIxEsO0QeuPEyWsTF2p+7HqkfcjX26uT/wIXFdrlr0RZ1Up/YQCNUqI7Pxx2KntRKDtV2VYIHRJzpnTU5WKYzAsEJi3XPTlF4nADVD+O14TjxyU6oExosgAJi7Vf9Gl/yMqRIwM4YbEOElwT5hBlXNhCSpN1AdnAEoJFRAz5/Q63dp/zuIigEIDfNNUJhG4HkAREO55Bs7JXhudqSplnSCuzaLMZDCko0tysswt9LfK+tAwvNCSIuolzfyKZt/Jwjo4kKDmpCg24mAvzKSi7rOqjXRP6JieBlaJSCqStClbpYykVCLlniZqii8Mqns/rUD9Ml9dwKaqNpkwe4LV9wyGFvDNVZusAw0LijYvM00aaQDjiE8srajuMGlZZ2KqznnzSN0j89TuM0XF5XxwMqaeghmrcc4RymRZqcfBrYe00aQRkqJR2dSF9dm8I6lcbQiUa6u0CGCKycq4jKHPKEnOG69vtD2oRg5nRr8JWrUgxzYmITspz8S0jSDmHqXmUKsls6RLS2AkgoLqGCU4sby0G3By50S7U1Zk5sZ/cWq5dhNO5Sga+LRIkYmbpLkqKEBXl0bb1A45zfOY+a4XBA7HyjYFkMicmasM7VArORut/0YOu0a+BVoCAtAcMNjoLWfSkOoJkzYgNEJeWnITXGtJCHeN42jMU941R1RUBCdCfDhE4zBERTVOJ5qG2tS/J8Tq1FLJ6QuxUaS5cCESnQq0mVeGhUFFcrLR3yJg6WHE962C+GBFTfeOjk8aUsNe8PmwpKd2JgZ6gMRxyfpwBCeVzMTy4GZUKYhZHrkvIoGUqLalSADeYwn3l4rMUPdTKkQN6CnqUsvGa76TySBWOvb9cbgijNMYFgmT8OYbU5DZvlQjiNFXciCmdghvRk7JiQajgbNRREvCE9ugUVwUzmMPLLmh8hC2aGhDcGLkh6y7lFekL3uZUSVGp0gMNbPKP1eapRrpYjOJmPaR6+AI5+GXNBE9sotYcuxw3PMMK4Ohv5iELBv97QGWJsbAXCUoBsAtDMgE1GNBcDsyEFG3Y2pGUHaiauMPBLEp44NQcwC1UYrnxxWJTCLBjILJW0sKcXquqiolJzLSkwM748wr1gPXtUeywJE5KR4ZIDgmnzunyM9gWDxMjtf2AEsKO0a+sbEBMFc4G4OvpGjLIwZwbHIi0yrJjHaGVMqaOGQcSs3JIBgo+6bmCMStEYVIo1FuogQmZeQU1BtVXpF2N24n1ItzSI6udCysm9OXnRlaJHTt8P1x+pW/kSRDHzEJYErOCGI3XH75ePnkkLfzpjpDJkEDrEbNoQhLivMxGz9B0SHVCe9elMwQgzZFMPpBcHC+nPoRxFOQzxSCkDTwUc+8bTmYODL322UuoF+jPZFPkrLD1CFpbRxtO4zhGPqLSZuZN5IYv5WpuZdqTrIWdInjCy9JkuBAXM3REiM/AUXI+qHWaAgPMP1DxqfiacIFsM+TU0gGMLC1zTIwL/nKC+G/o1m9uGfZhesrTd5E/UUCL9Xfw7mUqePaGVZGcAz9hVNyxsOBdWlh+1i0llNa6EgoWDkgk0SIybfNpph+eJbxcWJ7GQlBaZBIUBvVBvebEFdNpqi2KgZ/Mjjmm8MWyN8Xv1qUgqXMN4irJRmgJEca0kgQHqkorrj5eYDZylSlcjZWfv9NyTH0GU7JGQOzx5LCo3DpZYfGo8HSS75+GWfNQYzNIvZWrqNpVBomfZt9lzhyE1V5UkxU3nnGxdcSnLDIIB55TZEhKg0RP0jPpfFO1OOgEFFqOwWWZyRMy9KM4b2O84Hi1BenHS//DODs220q1Vu5BkMLuNlVYzJgLhlsHZuGNgZcxslYu7genTGfVr0DtoLI1GlykNUcjpSI5IYKqwdmSlXw70Ozb1nCQ5UlERrqmqhfI0jb35rzPkEkAxU0oommbr4DcT8JB1VImyyjZAhdqx2OI4XabuSGAWMSLrn0EJw7d8Y25xwJ7IRLLhn9WVUdROT1ejCNyeF40OV8a2KSumo9G6JwSaHgBp3cj88NTpG9pvx8grZSddKqOQnEUkzLpCO3vWhzrhkge3QK5uqWyk84QkmiRyLUD+4kOR+fPwcwN9djAdCekBkMCZiooo7RwDnW2DL2LczrT+4Nnszg48L9eJ17XJiQhzQgk8Sl/hDhjThMOv8+Gw91Ch7cOcJDkgCJ4PhBEcVGIjWNJnBkh+hL7tz3OY9OkGihAAVtiaDhA9+P0ZlrIKEmDQzazL14xdo4/ahUNuC2GQz1tg5Z4cj6gPXHUONRWDlOKk5MOfHOs8iAivMTTUaxAYr7dSkpLtKgTuRJ3SdO42mJdOTArVBpNARHIijaQT+B4zQucFtieSdzHkWkRnC/TU0EsQmy16yVQ6hAnFkua0HWLl6sdhyPpOupe8yMZegfSpKz8pJtcP78VjNZDS2cOXHTkmhpbBXkRlhOv021M6Ji98jyUCBHSjLBBBVL77epQ16IQRgTAb7iDLlQ3KOucX0inFF1U1J7ovxD8wyV+auRmIgk6hyx0TCECAlQkwwpIuEwffZsda0xIbetk8HQP0x2csoyR3K+YH07lNgEK1aM3yw4za/zII0kBXhxkqdza8oCWemJKS45EzeIwxEKilhEVCAqz7ZqD9W2IL5S7ZHMWRJ5I5Z/YcvTfq9azUDipl8zKxr76bg9q1oTJ4ro///tvQ3QJdlZ3/f0ndldSburHaGVsAV4R3wZgx0NsQsSiLOv7LhcMWU0OAQVFmZHlsHYrM3gTXAkl+ORXKnCZRtGhihGIHnWSIhltdIsdoidmGgmsQPYBGYC2NjIaJZCkICEZ7S7+tjdeTvVt7vve/rp53nOc06fvl/v/1/77u0+36fvnXt+939On04tw6HmtvHPCI9xIAF68AwraEu0CJpxsXMMoO3S2+nOO/djX5yR6uHgGq6P0f5GRQjpwnApTaxNg3RsMOYD8Gp9jdY3vn5GcmCkNTZ1UD6x60TxsBi01GGcck2kvBpIjYL5tfaCJTsZgKExbaVVldGEdAULS6K3v5dqX2Qxi3etS1hnFcmYsvmf5KaK/ataIKq8DYagNB05OY1T8PzzzcLW78U13Bo9SXfccX5vezfll16JKSjL8o8tlh1F145beK2FwFa4J0xzQ4R0ojsjpc90dGJTjq5dj71rMjyJIvWN+rYhYiqyP86EPPw6DOJqok8n7I3jdnacO4NDUKYWg2x33HFxeZsytA26fmzW4YRSnRnyuTEuwJHufGLx6rnxpSw5PaEjEw4YknOjhsegh7k83KGpWVmiO8MrKQk41vulHJuSIDOxMBVurUyO271CR0I71or0KumuM6GykWNTDV5ENWtxDtdIHjB2oEI6OSqmqs4SUfOohwfWfJGf2kCd26oGcA7o5Mn93o160tqYVaQ8MIXrcrLKiKwNyfoFqky3WPV4XBdvmMudGTfZDTiSUlw19VR7dEPMMXJW7VahAqPriiJKyhPeSeVJLjguzXnyDsfOsjXByYEKaTEqph1Yz655fU4zqDdPQ/+6NdV7a4sdq0fp5Mkzew84HknrOkZOj1GO6fwYZYjlWm5OLYet9usJ62EOC3dtwsOaxufqImTu3CjtHiRNdXSUPYPC+EGUcO5ap7MlI1wMWKVjz/5AYXCl2TIb2kNm1OeqdXFyppZH7U8oA04OVEhjyKEl6FyjqjqgqnpqtShsvr/ry7qaQf3kyctUVWeoqp6csb6ryzpOnmz6951r6F/K33fSyZPHb4qql7ZA2IQRa4GytDmfBUcWVEntCOBGCludCjBRsxMONiEcDTIG5XFYCc9H4dzNMSBJOBWlDuiOc2J9VesqtD7D6/CYU0EGkKwOKzmJVkxy50L48cxb8fddAFxLh7ePXJzJ4CEUsOWcC+2+ZMhpdOLEtc5dmdPxeHI5LXPixJFrceLEDTpxonGSXlu47utLp+jEiYNlHW1dzRqkL+/iNqnry3a07Tk+ct31JDgHnrukpDUwUtkj8NFASHA4RiBgrJ+RAEoqduTISM4Pc4nCagZ05RjcxLARcdnQkgo4sfc7BXhEUNKIxjFyut0bJVy7u2oSIaS6Otp6G21NjqFPflJ/r6J3RPF49c2DoNmkQw4tIeDmEgpax+NWQcfi1rLMBmZCwBnWfaWr+7VUVY9m1n+ry/taOnHiDJ04Mb4Vu4G5Jq6q3lq4j972vbVr27Xj+TE3IGbkoAguSuh4iMDEwyNujgQcgwXBBgCNyhOcFBFMhHA+NltuiwZDoavDYWbVJimM1y2BkXS9MjW5jK6A6LgdDvL8PYgsyh0dB41OXWxsOTBilsg6JE3W9fBAT7O78aeVfXHEMlOhB3NS0PwaLzyWtFhcpMPDS0R0vvvL3Rn5Vrcfz0VaLHxrThaLK6tnax0eHiydn9ZhOkVEp4PFys3C5cahudktnL7S5fVpsbhAh4cXu/adnXn35+Y6XF5eS+912EdJ60sspawL0NIuw/svVw02tCbV3aZxVjqlzB4yrAcfqu2IpOkPpV111fxGmlW4JyzRxeGEFHNOkl0d4frzPmvvrViG8j4MsipOjirWuOiiYM+mgQHoef5Zefr27DOOvliKOTdwcqD55YMcWkLAzeUDIuu6h4CzCc+7erIb1Js1N/mDegg8c6jt4zmq61Pd7dvnC9/x9VQHUZcmXYe9Ext8+l+ESYsdo9/o8V/D5qLa4CAFVMTzys4zOPQAilSX5sDkhjmAJ/l8VKATaqx0AgQ4n1xQRIM7iDTLi+2urE5xpSin38azrZ77TPuMKl5Gyh1ScqWRBgJ8oLLyQ06vdnC+1P01H/jeVTlgKa8sXZWq2r1pmLaPravT9u9s178HM0q72gHelZ28FnPKdFvECPFQTWsNmCtJX9oeNycDUsKwQRHa4G9MU1jApv7Qd7g3n/4U0S/9AtGHf6U9f+Urib78DxG9lBmbyQuNY2+YBoQxOQHWqHaQ5zd/g+jDv0z09NNEd95F9HtOE33RF0cKCZ81ZsBMWI8WVQy6IgXFnKkcF2f0njs6A86BZlY65HAdDdz79YTsXm3/QjjRoC7UlWDaDCoiCzy4jIXGo1MP4Ahw4HJzjLLUL3YHiEQBJ+L+aPqt/4/ox95L9Jlg+/5f/zWin/vZFnQO/mhXlMPlUduc0J4wbRbEhNc68vlpnIurHyL6tRvD8Ob8X/8C0X/2INFnvdyuhyI7+2qnxQZ1Ya4q5thIlX/yWaLbt+UqrLbmuDwAGmhmTYec46f9hrq1KvZL0yOHoyKWF/507gbqpGmoiJuT1BatPmffpPSDsCqetllgygEn1M//bAs8f/xriO5/hdaBrnzHT3PRrVLS6hWNy3IVweCncW/+jw8RPfO0nPx3Pk70z68Sfe2fUsrTnBzN1dGzu7XKE67XEepLLbdZbNw/aXwdKj1dCEFM9t1VEDSnauNvpS5ReHdUeB6WIWQbx7GA8G6smmUa5Q/Da6G4IJ5nHpxqHedptDy8j8IFGAx6Bjz1pz/1f+qA0+u3f4voPf+A6Kf/xVFazzTVCAAjoxq/pskQ40zUuDf/7J8S/cSP64DTqwGdD/+7eF3q5n5OoPcO+PyahPXlPPahv8Mqdh2svYOSpygzf8xAUILg5EAblGOwG4UJzoTqeFDCwCg5CpG7sFQ3R0mvngp1rQ4jLognTiuHgoHpt35LjpfUQE4zhfOVX030pb9/XFZYsTnuxVyc7jx0LTi4xQBI6nYDN7/4/7R/zz3n63Oj//c3ib4wsj4nx8khLZlxV5XrmiSyQTNN1Tg5fCrLOw01SlfSpsHt5lCeADnQ5pT6i5wPaOZ3qOP2ZPE0rE+krOBFmOJSB7kI9Fj9nBSuwY0R59EnPkH0v/0vLfD8Jwx2VGX8sjehKFKIVNa/+2Win/tXccdCUnIe5/3cHGzCPEnMUI0/k948Ddx8MuP5VNYC+uTzyL9nCMoQIAfaXpm/Hms2MJAPFNRgh/silR3+4p3svDj27/GUSZFrJ8XddZee3tLTIex8FdHnf9FRWbEBK8fVWclxX3if5LlPE/1C49xcT3NuuH7X75abMqi6YtOfSnvV5rM8lQR2ibeLx/I07Wyg1S2tstgt4o5byLFGByosQA60QVkDsXqiA4oU5v3lr9UnhrOFphUb0GKgFPvlOwlutLAI9HzBFxH9+1/R08S0hJ1/QnTnh4i+4AuJXvMfE73ilUcNiDk0UiTvqwpFSvqP/CrRU7dbVCMAACAASURBVB9p3ZsSik1VEfscWNM8WZ9LpmywYeHPPNM+o2oOZXCOeB0wXQVlCpADbU6uL7eEdJEgNT2HgChk1MOAfhdkN9wo8SQM1FPiPHDT68v+QAs5U0CHuvUu/+aX2r97X0r0+V9I9AVfQPSqz7PzxYwbr2786tHfFNeGq5mOu+feeDp1M0Cv2Doc7uQkOR31+Jjnbe6q+8ynM8rWZN11OOF9hrsDZQqQA22JUkAlxQFSvrkN80cNUN2eOv5DM9fdGXTBAiOeT0tbyw5Dc/4nv47o6k8S/fz/bXbFrcbduf5z7V+zsd4rXkH0qs8l+pzPa29DX05rxTYBVFwa6sr/+MeIPvbbRL/xUaLf/GiZdnN9xX86XHNkwcAg3HvbuLEOxyo/OvALi3PCoGYdTrjp3wimlMU9sbVwWhM854AZqLAAOdAGFXNqcq1+BiCeQizI4CcSDEWhyQk2ozHFKjvx+ohrRdj5g3+U6HN/D9H/+hPxW8pT1Dg8H/319u9f/XSbsQGfHnbuv/+o7Z/zuUcdadrwsY8dVfQbv969zgQ0oZrN//7wQfvqffSC1w1RPxvaOhwhTrzDytmApj8NJHo37/P2KwYtsXNpIXON2SooX4AcaHOKTSll2fKSgeNxfrRBLDa4MfCxNhS06iSKD6T1qGNCuVp9CT+Rm/U5f/bPE/3UvyC6VsjVkdSATw8tH/n3Rwl+9mfmq9OrM3+Q6Mv/YJvYHIiZvJdZdXK80B+hjhj3NAuNV7saO3ZB9vYrdq1S1uQAbqACAuRAm5M1zRMDBSO4BSRrDxthkzYX2OS4PA7YikHIIN4JMdEyI3GNy/LgH2mB5+r/TvSxhH10dlnNHVR/+LVE99xz1Alzm4DRxdOjXHdUpSzGNeq08je3wjcP3+R1RWFYIyfvVJYg/m8ogeMgyCNADrRBSbeB9/K4L0rkkmM4dITgIsGVBjCJA1rIUFYZqpvT/W+5bsaoP+bqmPkM8fjP/TyiP/3NRP/mF4l++v9qpzj2Uc2i4mZq6ne/anzdR5csa04qb1rJVa/3VuyqfQBrs9hYKmfk5NQsTgMrjwulNAwgA80sQA60WYWDvWCwDOX4Nlx9P4u0ocTz/B7A0lwiD3dwsJEgyAMpiVNTqXvnhOG/7/e3fz/T7Hb8S/sDOw3cNA8fjT5pXJH5keRuovbeJUw98cBwXY64O3Jw3NxFlbKhYc4DN6ON95aX8dwtCBIEyIE2J/4lNpr+ESCFaxQV+4XJ4geGiDWdJMS73B5v2bn5I66P6wnhCVD0lV9F9BVf1d4i/jM77Oz8rlcRffHvJfqi3+uYpjE/qENZYGCtw1HjHJsemurimzupnn46yObIOwdkWNNTMYcWgjIEyIE2KOcXtHIqRpo/kJWpoWTnRQgT0ycuEh6FOfOnOEGueO2OriDw931Z+/fRX2udnV/+13Z926A77yR64NVEX/YfEb385QkNMlbLJq3Xydn12NEcM11F9MLzRJ+46cgww/TRZCeI2A8eCEoTIAfaDiV9FzrBYWTd8+wxp8dRhxYmlSW2L8VBcEw5mbvsOm0j98Bbt5v8NX/NYt1f/XD7F94ptQ1qwOaB00Rf/CVBVyzHL+bcFKIAtRjrNvLE8hsH59bNRNgQ9tQh5/RVTh4t7yACgvIEyIE2J3FAcUxRkZZEgIrRAuTgxAKbGPREp6A80w3OL/+UtTSxc70g+Xqq2VlEs9fN0t35UqJPf4boIx8+2hdn3VNazTqbV72K6IHPbwHHgphEMzE5flBWgsszOR0R3e4BJ6GNbUPldrk+S951SClTV8Gu4hCUKEAOtEEZ7kfICGR9r2sDVl+OVYAFN0al5vOIHL/6NUCKOjvOdnjj+2mAUTrHE9w1wKw74PmSL2v/qHv4YwM7zc7E/d9zhTYabKagXn4/0as+h+iz7id6+SuI7g1u/1adganuQnpRI1djjjuL+jIHDo4ALdaOxlrDwvZrx6X7AUETBciBNic3uHgXIHunjBLCjaJWYdbC5XqUyNHmiKJTVh4Hok8QAz0h0m1MdWmbZ1h9yZcOo5o7fRrYafTRXz8Kb1wf7vw0EHNn8JT0Bmjq7lWEXMm9c7hzrj5NUOpUTxhhTV/xfKMpqpy7twS5p500AEogFwAOVEiAHGiDcnyT1cGUEw+3AhTH3RwUtfq1ND2kiPBjODqpv3q96VePbTAT2fFiXUG54qxBylRXF9hAy6u6xzcsX6W28zDNtbPep8Kj5ZTis90Jt1VE9NyniT7x9LRuq6ZOpbxPlsKExrHqoNbG5w6C4gLkQNsldZCLbBaofklKA1NsmsfKnDndFFsU7GnXpHwTp6BYkBpv1hWxgJIBJwgTn+PEzsUtWyZCUAq4ZFflrKTZ6O8ZA3By9zCU8rv7bUyJifv6CPmlHzkQ5BQgB9qccgZCVU5XyBUnQVIMjCTo4eU40rjlvfsmsni41sYY5y/2VMCJOXCuSq0sMTjiYBTbrC5yzqOnrE8ZleUBju6geZr4pz6VV2+sro0KgANNEyAH2qA010Npkbo0R5vGUH7Rm+nCIC84JcDLpAWaDjemf4kOtkFZ/FpYULQqvyDgRLk24uJIYR6J713KEySF/NY1T1rE7NwEsD5sN/mb+sT4EJg8mwUWZY/YDwhMV0H5AuRA26OkaSQp3DEYWfASA5s+3vVcqYRwtb6EeZCR4aA4JDFI8gAOSV1PBRxnPZOkQe2Wyg2bnQ4PiT5xq93sL1TUlRH2wYltnKkUMUna5wXmDVRQgBxoc0r5Uu2TaAtfzWBjPYzHseFpciAmdfGwV5P2wXHGUewS5QCOFKeA2egwF15yIHqNI24KODS34C8XGEesIWvdiweEkhs2RcICZAAPNFGAHGiDUr50rV+Vqy9sinxpR6YRcuAmJ12RRcFT8yRs6pdSf3Z8pmNnpksEH/U9i2VOnc6y8kbSareNL9fffDK/GVPyFCtAeb+wPw5UWIAcaPMSAcSSNqB53ZJIWs+U1pQ7pZLX5dRH3/7ua+NJH3NpHC5OzP2QprXEuIizI7k4ZiN43tyRk982zctZ44h8eLvdWLHZB2et0vo4gU609xOAAxUWIAfanNy/uM0Av1xrfpyOTNKUVa7tXkcGdxbnBj7nFJSaJmHtjivOCzhytCs8Jo/T5RnHi+3+y65xc+fUs8+W31k4lNY/tU9hhqx/zEalmKqCygiQA21Q3l9xid92qe5O1NnxlBFzhjyN8Lo1FIGJ3DyeKZ/cqa8I4LiKzJleEtKo73fk8+iqqtTI3E1X3b7d3j31/PMFPmMRpYLjYNmOA+5irl9aRghyCZADbVZTB4UUoHG5Ijy9kLbf2I8c7Y/dxp3arqzr5XBX+kPTrXBu8pfjvqWCqVkGhzWpUw5bZtPrQwbujfW4DmGB8TrW6IRp1c9lBCbD9yz13ycEOQTIgTanKYDjvltpdJBfdhg+FW5SHZhkxya2Bb/i2iRNMwmBFuBMmqbyuEyaMh0g/h6WgB6+F04V1tPByvMvtIuLn3/OqC/hqeWunYWl4oV9c9QNjK27F2P1WG0D8EDTBMiBtkvmd9oEF8OKXt2s5YCbaHWRX7TuoqzdiB3lWw90TGpLBihF804BFqUcNVqCMEdYRnVLTdrx2Nq5WPggTIIuzy3lAv1qQDznWiEImiBADrRZlfxy9Lg26iCnpZ/qyOS4MEGbvNDH06ms5W2Mw4GJtq/TaDzNHJ01Z4es9947VeV6dLujjREQ0a5l81T2Z55pdzDelLR1xK63KnQOM/9Nm64OIArKEyAH2pzWMV2VmtabZ+pi5HHiwYsrXRIrpNx+rgV54TB1isrKk+KweKc7HGFitQUWuvAimgXFzcLiZoGxlFd15GYe9JOnq1KalPioDAiaIEAOtL2a9KDDDAjyTjUUA5zMKSyWfVodGeCipivghLjkcJK8bDO7lEobuPnkJ7t1NwbgpbR5azbSy2mI8RR8CJogQA60SZ0pPpc/BUCyN/BjP2c9U0xTprDMNviCk6bsXNNTKeV5y0+cFptdGX3kaZ4L4EZSzkM6PZpqQqW6hma0w+mDoEIC5ECbU12fyq7bnKKw8pVMLzxrx2ps7iCRMs209rRTp7AyfvEnhc+olIF/6dw8276m9HV0Nxb7zFnrWLwP6nQ2JSdbMYF9oEwBcqDdUirc5DzAMvolnrC+pYijsYn0pQDHCTc1f/iqx5GbnMBfeG5RzYLixrk57NbcTNmLRvrcWf8eSoJBSbDJms2q/0Ch2qFjJkAOtDnV9YOrTfUoYy2NpBKLjCctLelG61RI8dTLE80GUBnzMDHA8RSlDdhRsJXCMxwKS+INP0rmZhHxZz7TAs7h4YQF9pZzI6RNdnIi2hb3pP0n9dItaAm0gwLkQJvR//xkO1VVYk1O8V2AjTzWYO52mXJAZYLL4whW8yW5M0age4rKCTipDkaKA5jLTM1U1Kc/1QJOUkavSs8TJZRVK8dF6ne8h3X9xaVqhY6XFni/oQ3pzKRqG7Dp/3wZhnnq2DRMXzbLI6bzuiMsfQrguPIYiTz95fBSAnCsekdxJYA3JzLDuerVODXNdNR/+B2iT9xigJPTpcqRJkibkjy1rko5nirPNRnVV99N33X+Swq2AjomgpMDbUZ1fTBvvalOjeLSuJwbRzvM8hz5UtPm1qP2t8oDHHejrD6kTl9NVaTcBnife651bZIWEnvE696a+8KnPRdLkvX5GJg8PeQf/pdE9MsFaoaOkeDkQJvSjJCT6K6ILo2WxVM2s+GTnJs6MZ/gvqTWI5yOyy8MOLE2TjFdvHXVViRPW7cuzdOfIPqdjxM98/QYcCRXsXJYIJV6kk4TJR2XkVJ/OJSuvn7thmqGdlhwcqD16x9fbtbjPJhfb+qjEqQiEqYoBCMjns37izfXhckZcJSOmNNYiemSASgWlzBqZ01VSequUTMV1YBM49o0i4ij2YTNJHPWi7n3yplS7oyaq57Dw69YQ+uhPROcHGgTOptUZy2sp8lS4NzYFY7doBRXKAyKpQ8PTRemHtbhdmx4YzzuTWa6rHhvu1PrzSz2hReIPvUs0a1bRDf/w9HTwF1lZraJg50FgcWVuAaIHFk8oJul+rPpv/3LXz3zBYH2THByoPWrrtMgJ0n813+K45HqjniBZkq+xGmeWMKU+ia3Lbftvur8eQxQ6t2aFzrHxruYvSR7mBv+xc4TnJPZ4CNFE+s7PPyrRPS1a240tMOqajwiH1qn/tEHTxPRR8rVOGWdQO6Uj34aTR8JFhNMaV9SGSkuVCzIc51yIck5/SWl76Gm/ztkD8aUoEgCH+l7U/wurcdl1jyt4N64z/lnONLWQymultPy8+Xh4bC+WsgrhYXXgb+O8vPrMHh9lk6eeDX97e/7bYIgh+DkQOvWhen1TZ2yyoGidbgvVKZ9YVDuuqCUdMUBxwNRzvY100/NdNPt5vWF5g6dIPmUH3jS5nvSmhxHUSUgdqtkrPtKcSIHELQ6v5sO679MRH99By4EtAUC5EDr049/4BRVzXocNhik3hGyFmhgZRR1Qoy8pV0btbwUxycFoDIAJ6YYAPVqgKaBmRduH71aLoVb4nbHQrcyyx8VX/DBnMUAN6HqzIeQi699WAg8h4ffAsiBvMLCY2idukg13Sf+2k35MxUUlLVAV2iQmT9MS876hM4mtVNJnFQ3CyIpr1GPml4/jZanNZefNI9N6HcXfvoZols32834mtu7m435nvtMBziJ4tMnrgYWUOw6mhLWnyVpznvONXKJtXPk3rDo+rPpkW//mwUbCu2xsCYHWo9+/AOF1+KEmuKgKBlncW6EOtzTSSm3fjvqNvOnuDxCZIp7o7k0zfdSAzO3D9t1M81x/xrqUBk45cExcm6Uk7smp2btq4W0o3zWmhzl7qtBPH8vgvNSa3L6c60f4Tqm0Vodfh5eZ8/rUs/SicWr6e/+j1ibA5nCdBW0Ll2K11M7f1nyL/YpygGklPojcOEFh6kQlhDlT+8FJ6WyJbh0MLOEmhfa1xeeF7IlNDjnc6G6OFMklDd5Dxnh7qpI8kHaaP3OBpa8VAOwcWe6mw4P34U7raCY4ORA8+vJJ84T0fcOd3+NDJAW66zVrcnNl+OGlMifOB2UnT+SrgeX5pd/P3W0hBhqHRnuKPBf9x7AWTkJDkcmLFs6V/PQBCdHuAtq0G4pXca5xyHptY67q/pjr5OjuTdqXBC/WLyOvucdP04QpAiQA82rJ59oHsR5hYjuW9bTw8taPnYKnCT/mk6BnFzImOq6zJQ/DG7gpB+gD28fDVLNgl/qBtDBLdnCoKtWlQg5g0F2Rsjp0805XaVCixDnOjfaOgVylue5kCPACw/XHoK7yldJoPQsnTj5avoeTFtBsjBdBc2nJ5841U1T3beqoyjcZBaWOuhH0zsAIacx7u5lgFWzX0z4lPVwrUu4aDeEmVXZlmOR2tRY2614AXBKa1LxzsxmsozNAXstFkQnTgjOCD/n4BGkqflxTXTiJPuxIsDsAHL6MAWQ+s/hyTtkRyeEoFE+upsWi/dPe0wMtM+CkwPNpyefuFLuy8fxOS01INUT95eZFYqEDCtg6d2UfjAJjqmbLpIqq3mw1hDJZVEcDMkdkACnGYgXi2E2C2IsAAqTn1iMH4456psw0I+ayMKbgVj7zvS4OxIgNh+2kyeHYcnujXJMpMfFgGeVToo3wvpjbboq5TV0mmoFfNrjR+mt332OIIgJkAPNo8vvbxych8Zra7y3rJb4FexVimtjJJzd8emu3eouo/AXeJC0+fWe2oZYOxq3YMHKVdN7+znVxbHq0PImhGt5kqeqrDBrisZzngM8AshYcWuBnIiDI4XxMmp6K73tuwtsNgrtkwA5UHn1gKOpMOf4FRaYe0t2DtywREn9yoSS1IRiktq2tNQ8sSBPnwoDUEn48QKNBDBZ4BMBGWL9i0IOP3cep0KOCS7Cq7pGRwAtHXzeSG/7W447OaHjImwGCJVVDHAocB5if0XFIaMet8XVYKHNrs560zsalVxOTpKavabksYI8fZrrh1dquQnp+dRYTnUuJQLcJsU/QuJrCDgcqJTpxlF/B/3+B/TXv+vidl0IaJOCkwOV0eXHm0XGl4drcObcTdWjXPeEZapT7wrLdXsiCUs5QGZ0Tr6UNhuQY6UpEm/VXSekn+DuFJ+u4ueaK2PFzeTkmNNSknMTvIaL4uPujfT6KNX1efof/s5NfnWh4yU4OdB0ffDxM1TTFarpwfFglGR7RKSVI9UzBXCY+0Ke5ht9LOG6lACc6NuQCjipbVauTQxgYhoM4on5LZgR00/5DHvyOoAmpRoX/AhaQv2c+z0I/744SKntMgN6PbTcuuItj5wu2GhoBwXIgabpg4+f7/bBec2qHDcMpP5p5USKdysXjozBO1qGAxSS2uEBCS2vUaQHWMxoD/wZbfDWq+YvNFBL01L+zI6wigUJ5wMpGw562hHdcLM20jvKsOrmpxWPU26LD/fJibk57XfSNXrLI7jr6hgL01VQnj74+OluDxz/LeLaGta1L0QOv7xznRcl4ZS8pcuZrR+JboK7/BjkZMS78gqgrKaX6piSNmNqatS83FvDY+mkYyss/IEQma7y3FmlTVnxMqW48fGTy+mr7/7eGwQdKwFyoDR9cLn2prlN8zt258qlDspagtQ7jRLbkFTOlLZEEuYCjhdcsgAnVlYuAKUAilbOBMhJhh4elnPnVSScSEinrMkJj7nLknKreHQNTmQ9jg+obhHVF6mmi/S3LmKtzjERIAfy6YM/1jg3je17/mgH400vLPaKf3ln5MtOUqIMdyJH0lRIcdafDS5GoDS4q0FWXYlx1nfilNvHPQATLYsDihCvHRPrswdswnZp8db+N8mgIwFKYeAJYedv/z3Azp4LkAPZ+sCPHXRw89BoHaLKOHPBj/RZFdYoxLLk1BX2eSqU1IXKcSedClqbBpxYWRnxWfCjheeGpbo2qeeF77oSwUYKy4SdOdycuLNzeQk7f+f7rvErD+2HADnQWB/4sbNE1MBN8/qAeYVcPJP8RMw4vHiVnG0KJOXAQGYGN3RNbZOjDd7IbBjKhZhYXi3O6vM2Q44AL944fj28kBMeR6eMlNvH++M+PAo4BtD4AYfD0lNUN1tg1Jfoe94B4NkjAXKgVh94rHdszk6ejiq1kJjdbBFNl/VRrifsfuxInN2mKeU5Ek2BGzM6pe0lAEdJkws5yeFeUPJMTTmhh4T+RcEmcuxNpy0yjr0mrZ9JXXjsODbLJ1YPHTk8F/8nAM+OC5Bz3PXEY+e6hcQPyHCyK+tuPCo1+Dupam1AkpHYTJbTptRr4YEXT7pEiJkU54UcjyMjhc3g7HiBZxQnhIuwI4XNMT2lHFv1ZUPO4PXq0t15+w/gURE7KkDOcdUTjzWOzcXRdFR0nU0dS7hFcg7WbieoBEAkJMr6pzkVvIwEtTY9VghwRlEeECoIMqmAkxrOw5KdHOF80GTh3As5GvCo6bXXPp8GGArwrCDDAJs+rzVFJaVRocYCHd42uk5Un6e/984rBO2UADnHTU88dnr5y4Qqe3+bLIbZBPho0KUNYlPqKJHMAQSloatEWWa0F1oi6b0wFIMcPrCL8XNCjtPJKQE9JPR3BCY8ryefETaIT3nVYEcDHu24y39YD9uW6+JIoBNej+Frs9/OOfr+H8JdWTsi7Hh8nPTEj54jqq+1G/j1XxDGQJAMBTxT7fjzlqn9aenkoLz68pPp10ZJ4kqa0KGpZbnyp0SlvOdT0hT88ZZalMI9doCzEnP340gx4m8QC4xyZPzQGQFTHbyN3GHpjxWXpTmugmNzrZDST0sy4DT/vY6IbtC3v+lgylWC1idAznHREz96afmE3tWi4lBO2PGwxihTTF6IcRSTrcR6soBpapkJ1ySaNOP6qmUY0b5AVpQTBCfFa4Ukhrtd8LmAS3KMcspJTD/odzV8rVyEF6nHC/D1ESzx8NS6BjAjtSH8Emy+Q6sP0be/6YKvImiTwnTVvuv9P3pq+WypKni2lKmJU07aVEupmawiH9d1wJP312LBBpQszwVd3qgUcPGk9dRtAJUUZ5Wr5lEGdKn/ozFTGESjAJMyfVUPgsQBXB3kpXgjbBAvvQbTQu4pozDMMXU1eaGxsS7H7t+j9I5349lYWyw4OfusHnCaB9WFP97NcWTiL3wtO69f+4ulz26Qo5Ds+qSGO+pwtduZzPWeJpQ3tZxBHm+047pNqTMGSKnleZNO+Oc0KMS8VhxqBHl+aMTSxKbLpAeYjtoUqST6PjniNFiLVTyAmyjg0HKT1L/wRtx5tcUC5OyrQsCRFB2veGSRb+q4JjFWAmxYWbMa64SbnVUOIBWEoVi6ydd2298c/jTyFGkApAGBnKw9jnwnSO7O6rgWjunogzOCkYijMjp2fkaJOzdWegVwhgLobLEAOXur+rIKOFymeyEN5JOslRmUABtS15IcggxXJKv8EuVmXIvcMrQB1JUnxe2JpctwcbTya3VQ06eqcsM87yVPE8ujvp9WU1PdD+laCKBTUbBuJ0hajQ5YEXyxsUV6VfCe8Tu5eN9YZVp9xMtQ4hrQ+bZzAJ0tFCBnH/X+911s76DKVNLgrCVeBwhllD9nszI4KwuayiWMJM29SJuC30SIiSVIdU5cjDNhsbBaKB+EIxClDfhqfxOhbNS8eui21EEbwmOS3By+83k9dogkd8fbWAsE09WADtbnbJmw8Hjf9P73NZv8fXDYq34Ht0KLimcroMBnkX9pJxfZZ0h4VkR2HaWTJ5RrJp1STqork5I+BjGxwUwbrFPcGi3OueDYFVbyXAAgEXKURceau+NddBxdBJyyEFhbeGwtbNbqjZUt9d+4DsPXL6cfeBSPg9gSwcnZJ73/fc06HMEy5RZDJkwU+QVq/RUoNqu9UgGR65R8KTOuvSv5xPd0ikYAUrgNHsDxxFsgk1GcCD+JBkI5pXzoNRepFk4zOzSAFwMueFtGsMV/E/EppVrIG+sbO5bqHMVnXQdMW22RADn7pUvyPjiSMgclziibVJE2ZEBHcp1z1DHx/ZtaZpH33lvIRABeh6S1IrNsAJ7SIcF58IRHiw3KFTfh40WydtTseBDfhwfOyqpsz1QVz6O1Kaw/DFSuk7nZ4Cjva+hbvxl76GyJMF21L3r/+5odOD+U15tC38aeGR7H0xfWo7kH8zpvvswFNxOaNLVMjxPgShLJ43VxYi7NaBDj8Vp4Yp4pe+aMwjzTTVPyCvCjHhuDundvHOmYAohJOuZQExxrwBMrf5WHxnli18AOezW98x/eIGijgpOzL6rpQr6z4bYPfMV4q5oVcHglCRVPbp/0q9DZ3PwEmVmnAI6zTbMCTkq9KfGJUJRTv5Yudp6ecBxX82MJ3MJjYXC3ZJavTRVpU1JOB4efj/4ZandRGR3XbokfhYnQAzdnCwTI2Qc9vnRxju6mmjxAa3/bJm9bnQNxseuWkS2aKLMp5gA5w4BdKl9RaQN4AZBRJZUh3Qae8VldyeHAjmAjUszguhhgo16jSIVJl1a817w75X2v2GEVtNOx/obHWe+TNUU3hJ6H6Fv+zGm1e9BaBMjZD8m/GGJjf7KKFRSRBS+F2lCsKGcB2V1IBJHSZarJZ6KecDBy1RFLswbK8i5ElqQurpUKyQUiDTzqcZC3mFVYradJeWtqKZAl9l6bFaixClS4kepXbkdPvUWd4OZsWoCcXdfj7zudtCdOMUaZQgj8260oic2kevgFmNJWd5cyr0XSZVsj4KS+lSnpiwB7apbSn00+8PJdjROdGqvs0KExw5lLIYFFdPDXQCqSZnTK1tqIaSw51sS5ODq3jOV7cJb+3Ded8rQWmkeAnN3X+aweFGUKr/MigcJM8jQhu6+Jl8SdeK7m1Ox1StlTAGeKZSBFG+lGg2pGM1xKKIwDg+QsxNKkuCOhtB2Hkwp3KtpGa28aWAVkFQAAIABJREFUM6Ox+JiOpqaIvf+uf161eDhqN69Xih/2pbnb9Wysdmg+AXJ2X9P/AWkmxbabK1zF2jvhAiS7KhMam5R1TYAjdsnRTw+4eGUBTrT9c10nHpb6LKoY7TBnhF9PPuibgCi4LNagLu6Nw/4kV0aFPCmt9b7wMmsWzOFDgSu+0JkDlVSvuT5nFQLI2aBOHtue74Me/5FmquqBticFbgN3fo+sNMs+IM76s3Yz9hY+dzET65uzHjWLE3BylJKvJAypZUtxuY6NkSjq7ITKmXrhg70BO+OB2Xe7tDitFWnbCLKMhcEe0OHliaAThKtwFbg0njZYgDsExdfJDYfWITg5u62Do9ZvwHLxVikZI1kDWyQsWROuWZjVVUxOx5ViyiZ0lJ0LOI7+8oE+uQ4pTcqIm1pBLL2zDM/nJeXaRNMlXhOxa7nXlSn244jznAZZ2vSUWH7EifFcbxF22GdcuwRvesOBEgPNLEDObkv4h8P/8U2hC6esqsxfx86/2Ro4oZgwzJWxgNx1JdZnZpkCOCn5vIAz8TNsZk20JlOAk6fNcUF5GZr7MUoTAR/xfZDi+qhaeRXqlI5rdsz7kDRlGK4z6m8bN/q3qjdytxXvqxY2+LHDrl1/3J4CcjYkTFfttpQ9GFJ+cY02yVjzPNScWidcFM2YUW9J5yahzFzAyZYxbRNzcaIuT4F2e0GUg4WZT6AbEXAsMGERaholsPRbGp198yxEJgGmeHuNXyR9G9TpKOVYLE+6toM+nPH0BiovQM5uy3/ruCr3t90OwM9MLlVy4okLhpKzzgEVMwNOlouTUH5JJW2GV0JSfdELw4KkAb0KBl7BafHU5doEMCbPjsesTOuuqjC5BrKaY5TsHimgqF33owS4jXxDAuRACYp9EZSGoDUMaMWqMH4xztqOzIxJzsG2KObSTJC6qDVx8E6WMrCrRXkdDjbgR12sMN7h3vCpmb788LUW6va4h6l3VUX30kkE79EGh0FfR2mkh3zy8KUK/CCFcgTI2VU9/iNbOMebO9JIcDTzQFu0+HW6NhPq8www61AWN3gyeQfxmbqtOSAcYgbnza3kYVhlbKxn1enMo4FPriunOkEKBA1ASHgY5lIZTugoixeqEqp1f7xyF41DcwiQs6uq92jpzE45NoUKTM4+d32J5U8aFCfUm6t1OFfSQOtyLrxtiYBMiW5IZWgLjTlI9MASTo1Jha6iQsBr4O5Qhp7RcVCvezdkx4NAY/viTJmFBudsTICcXVb/D2dvYKeQZnFpCm3Ms3Vwk1FHLuAUybMFUjeGS+2ycwFy9qUVHBupYMl5cdfBVclPAg+P66DO0M3h0ONuSzg9ZrlU2tRSqNjC9lSBbjYt3EK+D6qVPwq/UPa87/y4aME0reCM8aNIZ0oDjtokZxmpFn50QEqpXhu4jMxTFxdHswvPqor9YBE/ktrndMKvH/cmf4rLE97SLbVFjFIcllW5FrRpDbXeXyGsb0v/lPPYXVUuaII2KTg5+6zYd1+h78PZlDLGbCPIJTNSoU6460p409UyN3zhPSA0i7MXC/ZYMpaT43UhIs7FqHqWRswntFmdsjLSjtomrccR4Fd9v0KXpTk+VNpd4A0PYS31x0kqzEOzCpCzu7qZ3XLP92+vdcPPRr4TCle6KVs7GaRyHJjEvP4ClSSeeqJ2Q3q2pMc4CGlLfKQmlWG4HqITEsZ7PxccfKQmaADVQUoIPbG2DNycWiYQzelKdaSkMlxhUtmRuqFZhemqXdU3/Olra2l5HfnT0k0tb3bNUGl2cRPb4K43o55SgJMELall5qZxDKw5dWq/IkzHIuHWcF6Fh1tjYCNlVnc2tn4lifbMOKn3gZsjBb+6PDA2Ap2EJ5+Lz6mKhOn9uBVvLDSHADm7rc3/w9EG2I1DTKxBMxSbXcA6VApw1tDFoi7OzJrFxZkw5SFtYM7DxSojroxXA3gIFxWzY3HXCKebM3J02MJjD9BV7FVqUCXM6+fD+np+lEIjAXJ2W90/nK2giA1L6v9M18XxY9XOXKhdriIy61EdnMSycgdrV7lr/ry7pnG0gTqSx22yJKzNGYXH0kppFPdGhKKEvvM9ckb/dI2Fxx6N4Mrupts98iSX093wNx4qKUDOTqu+Zg/s+ww9Wj9nBJuw2GzAKdiWuepTAWfHZA68ieFueTa2TJmaiiSMwRNPM7V70Wc4cTeHRYgPxlRuhlATsfdWA7upMvfMSbkNbik4ORsSIGe3dSXe+hgM7JrW2O6ivLTua10ScDLLSXVxBnmM9KUAYbIcA34v9wL+yB1WVrmjgV9qlwAGk8A9JstN4U6N0Aht9+fwFvXR7eqapDu6jE6PQGYKSNWO72poDuHuqt1Wxj8cyfmxlHN7VVimlj9mD28QwIpWPYOjtO1SB9iS/ZoAQSVBbnLa3AXHDFa08dcEH56BORfRBccSJLHKl6cVa2M9KsKlmuTpMa2PmmNUmwFBfudnLOyXnOUWvft9cHI2JDg5u6xveENzG/n1eXvAnSDJDdLivWmkOtes4q5NYcfJXdyEetVf2+t8PyL1zeniWE/Y9q7HkQAv9XdFtowRfgQgU6qRoEmDLunfgvLDZwVLhpuTu6WF6uAI10SdyhwdOD+r9eW0xkIlBcjZfV1afw/WPfDNpGIsEn5hzuDczA03JbWWJkytJDW/tPBUGhyn1p24GaAELprDYaax3JqYYukroQ/1cHpKOh4wUSX3SQJK7bif0uI7Gpt3VRUTIGeDAuTsvjYAOTuuyTwguVIzjO7rghu1iBJ9cpQh/kKeSTlVeBeeJo+Nsd19M8p3rU+JQBBZbgp7HTg3msOTM1XFH5apLTrWgIeE6+tck6OBXh77PEXvfh8gZ4MC5Oy62imrR4/7ZRhJYpBJPFDM9vFX52rPXPVklG3+si5QjSetNXBbhSTfbeVxcqZs+Ge5OkYXo+5OogOl7gAcUx18RCuljBB4hOMQJPkt5WqjtFvSrTxKX9UsxjO5xsKP0A0LkLMfunBse85NFWns3wWwsdovJi5UZ6ny18R+kyoq2cYcoIsVaLoLUlzMkTHaNMhjuSFWfoeqLnGl9EEDtx5qRvvjCH0euEkUTEtJDzwV6p60bYCZt9ms9eKEwqECAuTsg77hDTeOjZuTBANTK1mDkqsq5N7MOuCrgamFFFapOkqU43V1PO6CNPDntJG7NrX8qsHRCLbY9NBqKs0x79O7OFWQXj2mI6AZAI90jSvhcLYH9F2kd/9I/jMGoSIC5OyP9sfNCb8Y1wI1YcXbDDeFAGdagu2V6mj00u7q8UyDOMpx5XVqCjiOjA8OK5GyvNM2tRSoNVXMNJT2qIcBbEnHdAQ06pokoX7LOTPlSg8XZ0sEyNkXtW7OW3eyN7XwHbTWsXab4YbW1LbMa1BkMHakjwJMUoUTk2fARqw8q0ixHCmDEaZyHHdjuBMU+4cpwY0yjZRy+VOcqBBs1GvDFy6nNihZ5+HibIeqevI25tBW6bH3XqOKXjNbk+oMd1fKs/GP3ZobkFVd4TaaxZUAnIQyLBdATZswdSPGK3HaowpiYGCGKc9jEuMTbh0X00l3NylhYTvEMOdrXz53WUZP+JZetSeCB2Vpx4N6lQdzxspe1WHESa+jOtTjq/Su9x4QtBWCk7N/Orf6US79OOdx2g94K50Wl5JnLYo1ag3Kqm6GNs4OOLlyFOSeHbIARwvXwCeloLneq1oKZEHe9pRsI3/SNwczIZ0EB2LRkT5LqoL0FoTw1+xrYn4gm2mqs5kFQzMIkLNvev0bmu3D3zjolWds3xADzKMt6cS2XMfS7RDLS6gkdZCJAcw65eIHZedjMT7xsQ5JihS8eiimSoDKq5RMigs33+NlkuCQaA20pD3003oPMi+4L9tZetd7MU21RQLk7KNe/4ZLx3PvnC2Am8mguG4Hp0R9M17zVdFT74CZq5+ecr1Qo7k1kcAQMgZR0k7N4TEvJ+Jqia+1ECc4KtL7WEl3OlF8qmrUF+lWcQmwSt1Fpb2B1RvpXe/Fgzi3TICcfdXr33Buf0Fnw1NQs2gvLLS45oC/3KmqbZTL5aqE08wBXOQ2CZgirs4AKKy2SE6OAVjaHVcDuIo4OZOnp1x6O/3Qe7Dx3xYKkLPP2jvQ2XIQ2Bb3xlXspq+jo37v4JQysLoUcTTc7Z5LXkfJgJU+zM1G3BaxHrIp2S2Ou6yk9Tixa5kKeMXfm2XdDeCcL10yVEaAnH1XCzpv3/5extyZLYWbbZueIk97JtSprnPIyVsok+XkWNlTFx1Lu+fytEl3q0bScsjTAGLKR8h9Z5HSOD49FcarTkoY577YRjOUeq2wiDHlV/1GAM52C5BzHPT6N5zvFiPf2o7epkw1bbF7M6lZM/XrGMx4DRSbqip5QaJFKW6Kq3nedhqDf3gtailswo+GEfw42uldEyNNW4lhGe3mVcde/YU136VfRz+IKaptFyDnuKhdjNzs3XA9vceay5L7t+OazCebcG8K1D3FxSnVBq7o4DTblv0ZKnEnlQQb3bHU1Uo9yag6aHz/TCqrnTkuiffp7irwKIuQB/mmqr5KRGfoB38YTxffAWEzwOOox97bPALib8g9x+dhpKKXZKbrOyfgqNlyp6q8U1COtNGpKiP/1M0BoxsActdDOE+Oszb5C48d8bkbAJqvyqZ8qzqFOLUtsc3+WJ2uTQH5NZCumdr/W1TTBXrnP8TjGnZIcHKOo17/hgtE9auJ6kfHbgw0ULFLMuP1ndvBOVZyAo73egocFE8rJIpVN4IZo4LUH7aj6SZmlQwAwq56YO8MnCHtdncLYFm0ZVTxptfsPK7mBo7TAJzdE5yc467H3nO6e7jnQ8f9UoxUamphbq19miqjvNmcnAynxopzhwuujQRCZprURzsY7kzM0QmPpzo4g3ApLuLm9K+xsJGbozg9YvsUJ2fUBiW8fW3W3Vyiur5IP/DoDYJ2UoAcqNVj7znVbUfe/L3uWF+VSf8k1vjvyV3VxDYVhZwUByQGOJE0pSDHFRaDnJR4A2bC4xjYWPEpz2fygIUHMCTwcUOQBDuOugfXyw13TxLRZarry/T3L2H34h0XIAcaqwWeg+XiuqPX+/byShX7+K/531FSdRPaVgJwBll2EHJGgJLwGAE1X8J6HPPYCzmJrzGYcUNO/yq4JxrQeOGmPx6VK9SttYfoKarrxqW5QnV9hd7xbuxYvGcC5EB+tfBzZqev2Gwf9xkKvnXza+j55/4beuF2+6V8+zbRYfN3WK5dy7UQFdtiP1yo0N2tMth0rRqv05Du4hkUwxc/uJ+6GUnC0tRG3JE1IbgV7Jy0AVYrO9pQZ5Lq43T//V9fFGxI6IPq4MTSOqDG46iI7krC1JTLMTLAh+gafd8PwqU5BgLkQNC26vv/buOifUhs3e0OdvrX5u+F59M6UoVwExxXEvyE+55UR9DD4YcMuJFAJ/euZsnF0SBk5JhIg2dYpnTnThhXZ0COU1X1L+mv/c2vnKdwCDp+wt1VELStevgR3To/cYLojjuIXvQiope8hOiee4hOvYzovlNE99xL9OKXEN31IqKTd8h3rgyUCzi9xVMdpRmkY3/Ew2iYP+WvYnWEdY6OiQYHVSX3M2xPmKdiZVSV45rmqvrFLf5EQtDO6STeMgjaaj1FRA+4G9gMvidPtn+h+umulfPTvbZTJF3ecOBfFWgADsvbpwlf+bFm3STPXkkPqezSiGX17k3Yrj5x99pcoypI029415xXQZqwX6UdnYp+vmyBEHS8BciBoO3WtSTI0RTCT+hE9FMvL7xAdLuDn/pw7Ghwl6Q9cMKNZxdbB+VIu+zWg8gARrrIHkSqEGLC9D3jcNBhZY7qyVmX49KvzlEoBB1XAXIgaLt1bbZb+puBf7FoR+w77hw6ObdfOHJ+evihIJ4M90aDG3OxsrvR7UvPFxVfeyPAzqie0NXpAYiDTvjKAKuvZ+UeFYSdt7ztJ8oVBkEQIAeCtltX9EdwZIivY6FgKczKvana9T5L8AnSNm7PcoHzCy30NK+jxcs0pIrYXVg5oDOAjgB6KgYhZIFLODUVwAxxJ4dPYQnTVqXULDqGIKiosPAYgrZZ1uLjqRoAT7DANlx3E7o1d97ZLnS+9952kfP9r2gXOt99N9FddxGdWLD1PcHBqNxKOHf8he0atV1YAB2CG6+LwjZK5UntF8ottgi5+uezvdcQdEwFJweCtl/NU48fnNxKDjXccQnDJSgJy+iPG8engZ8+z2HdTnU9/zwt9/d54Tnm2ESeEh3tAykODlt5LDk73NUhkh2dVR7m4gzqn2FrpIp+snCJEHTsBciBoO3X5SKQE6oSwEZ0MNhC4sG6G7ZfThN2ovm7q3V2+vAGeJbQ83w7xTUZDqTpMH5nFYOd0WJjC3SCtOFCZD6Nxafgpk5hYT0OBBUXIAeCtl/Tp6yiLo4AN5WUl08LSdAThFM3zRW6PQ3oPN/8PdfCT30YNMSStMFfkI8vNl4BTiW4OhboUAA7bI3Pqh6pHRNUVf+sUEkQBAXCmhwI2nY9/Mi1br+cMtJcHA430poTcQ0Md3V4WQywmimuZgPDZj1Ps67ns15OdO9LWxAK19qEa3dGa3CsdTIUxAvrdcK+EY37GPaBuzWDtT7ErtuEtTlV9ST+HUJQeQFyIGg3dHmWVgrGjgo34WJdbboqfCUJVoTjZlfmZofmZjHzKz+b6L77iF7yYqI7TipTanzBNF/nw+FLaGvYT2LtGhTDNz5k03oTuGb4PizeV6gkCIICAXIgaDd0KbuV2l1LoovDB3pt4bEAOEQMPAw3ZwBGLK55HEXj7DQOz8vvJ7r3vjas2dNHLFOBFA5fMdAhlnYwRSW5OYXUTFW9+cLH8e8QgsoLkANBu6B2yup60ZaqboRwqzWFjgoNYcF0TLjrIoCSBWAnThK9+MVEp04RveKV7RTXixvgOaE4OsKU2wiGaAw6HHb4deDTU7zMKVNWmKqCoNkEyIGg3VG+m7OU4N6IU0A8mwAl0rHlzkj5xGmsyN+L7mqdnX4tTzOttQIeGrcl7PvAjWJpRtNrxuUjkuPz3pNn6C1v+/5SpUEQNBQgB4J2Rw3k3EpqrbiA13JxFEghkkHFcmwkp0edMnOADrF6mgXM97z0CHiadT3N09ktV0cCHQraOrgOQr+OLoRxAZPen3dOKwCCIEuAHAjaFT38yM3yC5AjLg4xuDFdmaA8/sqndkiCKQN0YumbRcrNOp777++A50XNYl55aqpiYMPjYtNOFTuW1vB4tVj8/fRMEAS5/4nhSkHQTulCfmMdNo7ptIQDOhvcB4BDQ6iJuTkSWGjnEuBQWHfn8DRTWs0anub1RcHGhGHawbl0uQSXatBGGh+nrMupFk/Qmy/8ii8xBEE5AuRA0C7p4UduENGjSS0euC7Gn5iXOzl82kpwcwbTVgxuiOTjGOx4/ohYG6hdtPzSU63D85J7uqeuk7D+RpgOsy/q9OmqxeLN+ZkhCHL9M8NVgqCdk9/NqQIwGUcO/1QXR5iaGkz1GG4Of42ts4k6PQ5QIt7Gql2cfM/d7fqdl76U6OQJVreDV/iynEFEouDiQNBaBMiBoF2T181R3QinAzGa2Yq4OaKz4wEbfm4AjuQUWVBFQv4XvZjoZS9vNx+8845hh8W2sIvBp6z4NJ5HcHEgaC0C5EDQbipjbQ6DlDCYaAwUfEpmBDvaOhcDPCwQskBHdZIca31IykdEd9xJdN/LOti5M8OQqYRTDzzCxYGgdQmQA0G7qNbNeau/5cKCWQ4JPLno4lTjcMmRIQGaTKgJ2iL9me6Q0I8R3NC4jhXs3NFuMtj83XHX8AJE1+cIcXb6Z+DiQND6BMiBoN3VxaR9c0azVAnWhQo8gptD0poZGoNQWFa4LkaDmBGgCKDEYYp4XgF2+jyNm3PqvvbZWScWw8szajcN++2+jtU74eJA0PoEyIGgXVW7b865eOsrNg6PaCeI4mtPNFeFDfIiVHCHxbsGh1cp5FenrBQXh0iBHeFS3HkX0cs+q91c0HU9SShEzPdv6a+97RFHQgiCCgmQA0G7rIcfaTYHvJrdg5Urwad1aHjMoUabzhEBR3JxlKkm79+gbj5Vpk2ZMXDSpsb6fC+5u12z0zw/S71w2nUV4hfVX/G8JRAElRMgB4J2X+fUaauKuw7V+NBcQ8LLUxwQaYpInVYSpq1M6BCcGhGaBJji7eMNNzhn+drspPyyl7V3ZMWuiXndFu+mt7ztJ/wXGoKgEgLkQNCuq12E7Ji2kiSNzg7g0Jwc0gCHxo5LsoND43pHUKMAEG/fCHoipHLPPUT33pv5QVlOU70pMzMEQRMEyIGgfVA7beXbCXk1niuA42WcQTZrYTCNwURKkzJdJbk4o7rCPinAM+q+0cm77mqfj7VIcL6Wd1NVmQAKQdBUAXIgaH90noiuZ/dmNLU1SiC7ONaaF3F6SZjC8sCV6ABJ4Swsxawi/soyN3dg3X0PK8jQonozveVtP53zdkAQNF2AHAjaFx3dbXW0PqeuC3TOs+iEuzkhJGhTSiHYaNNgPCxIP1hkLLlHNC5PnabiU1rE+hBoBDqCmuvebPr3lrd9f+5VhyBougA5ELRPeviRa1nrc0bTOGzwV10Pac0Ld2qIQYq1IJlPe2nhYT2Cc8TT+S6CM3HVTl01sKOnadbhfL23ZgiC5hEgB4L2Te36nDeuejXFzBmN+wxAVsEGiIxgh8ZA4lqTI9QjQhOb4tKAqeJpwz7qpys1t5jLa3z+LZ048dUTrjoEQYUEyIGgfdTDj1wiorfn9awavIzCPdlVN4cCQNKAJbbQmJdBY2gaTW/FGhvpngQziwXRXZ2b04NkRc1jG/4kvfnCx30XC4KgOQXIgaB91bf/lfPtHVf10M3JcnYUAuBQwee0wrUx1rTVYC2PdDeU4eyEZVPILY61N7x/g7yaggvYQE4IOFX1x+i/w2MbIGhbBMiBoH3WX/zOc8Nby+vBi0/Kmht+RxVJLOFwYohPQ/HyFeDRprxG63b4n7COSJQjzdFuyD3g4E4qCNoiAXIgaN/1F86fI6qFPXQyLB3T5eAujrUuR3FtOIBY8SroOGfWVu0ZdE5WeJdaHRzUy6eYP02L6o/RX/0bABwI2jIBciDoOOjbvuMc1fRoO0ALbs6kW81j00AC7JDh3sTARgUdGoOWa6pKk+s63aJ77vnP6bv+ewAOBG2hADkQdFz05//SucFdV0tJcGMBDwcFa1qITVtJgEMOuLFghwLQ4etqeBtEF0oDnxj0LV2c60T1afrWv3QtkhiCoA0JkANBx0nf+vAlqhvQqdsNA4u5OaGkaatgasiz3obfKi6lldYFSYufyWAZl3pHZzBl9SQRHdC3PHyz0EWDIGgGVXWxLzYIgnZGP/SOM7SoLlO1eGAJBs3t0EtoWLTPZpKOl+mC40E+Fp7lxvQKgCicXqMANJpXfmz+HR7FH/Lz/vhwHD84XqV7O73x287jww5B2y84ORB0HPXn/uI1qukM0dKRCFyKyfeat4othxHX1XD3RgiTAInXSSnOTS2cCtegvT63iOqvA+BA0O4ITg4EHXddeud5qqoLtFjcN3ZoFoKbw9wbHr9yfCLuDllujqAkFyd0YqSwwL05rNnxoeT2XKW6PkcPfcuN4/5xgaBdEiAHgiCiR3/wDFXVJVosXqNPW0lTVpHprZSpK239zOCWbe8UlQU5ylSVNE3Vvr6V/sybLuBTAkG7J0AOBEFH+uF3nadqcYEW1X026EjrciKQE+YZ7KMT3AYersfp1U8hrV674+V3F4cV9meut9EAZ5X2KtWH5+ib/izcGwjaUQFyIAga6j3vPt2BzkMyxHDQsZwe4Vy6e6pS3By+8V4INibUaIuKBRdnDDu3qK7P0zc+dAmfDAjabQFyIAiS9SOPHtCiukDV4kEVYhYC8IycHg1yFuwREYGbM5Di4tSSeyOtsbHcmgHg3KL68CId1hfpG78Zt4ZD0B4IkANBkK3HfvigW5j8oA43zNHRprn47eijfXQE0JHW4VA9BBh1jY0LcG4twaYBnG/4JsANBO2RADkQBPn0+HsPummsFnak6aqY4zNauyPcIj6AnMg0lbjGxrhTagg4t+jw8CLV9UX6+m8E3EDQHgqQA0FQmp740dPdNNZZqqr7WoBJAR0OOWwqi4Q1OebdU+YUlBR/fQk2Z/9rrLmBoD0XIAeCoHw9+f5zVFVnabF43RHA8Cktx2Jl6bbyXuYt4gbYDF+fosP6MtWHl+hr/ys8awqCjokAORAETdc/+sCppbOzqA661/t0d0dbrNwdE9sYMHanlA461+mwvrIEmz/xOoANBB1DAXIgCCqvf/KPm80FD2ixaBYtn6EFe0ZWbD1PDznSXVNLmBEB5zodHl6hur6yfP3jX4N1NhB0zAXIgSBofv3kPz1Fi+oMVYsGfk618LMEmwdN0BlAzBJ0nqL68AYd1jepPrxGh4fXqK5v0MF/AacGgqCRADkQBG2P/uVPHaxcHlo6OTfoD30ldhyGIChLgBwIgiAIgvZSC7ytEARBEATtowA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpQA5EARBEATtpU7ibYUgyKHT3R/XgZH1DBGdWvPFvWLEXSOimyzsZhcOQdAeqqrrGu8rBB0PnerAo1cIKBxImvP7sq/KNnyvVFVuzqvsPASnEJRudH8QBG2pADkQtPvqXZYQYkJoeTDaw6TvgXrwMl3egrKhRSkmobw4MF0P4KeHoh6C4BZB0IYEyIGg7VcPLL3z0r/abov5b7t2sIUnjZJPOFyLBiySAUUeAKpi8Wa9vUt0LYB39KrpAAANJklEQVSfm5FpNgiCMgXIgaDt0JnOjTkTODM6xKj/bjUw8bgvXoemNk+3ViP2cEBQDGisNFZeHYSuBvDTO0EAIAjKFCAHgtarMwHIHHSvD4xakAQxluMSiRMO1XTurwol4VxfNSovpExHRdJ7HCITapQ4NXwUdqsDnx5+rgF+ICguQA4EzaN+fcxB4Mq8ZlST+O8vBWRynJup4GN8ZxT5OgkLKbAOJxWCigCNEJ8KQZLbMw57KoCfEIIg6NiLADkQVEwHAdSc8bkzHDZSQEaDmEzoEQ7VNDlpM5KYcrOPB2SMwNgUl7WGZ7p7kws/twKn54py6zwEHQsBciAoXf0i4B5oxncv8X9XUcCRwlJARkprwYu1rsaz5ibyvTF1akuVk26iyRKBxg07Wj6Hq6OmdQBRHIauM/CB2wMdCwFyIMinswHYDKedchyaYtCjgcyEcDXIu9Ym8ztFyzZpxsoCFaOSHKixprkkgPFCjQpEsXzm+VMB8FyG0wPtqwA5ECTrdAc2Z0dOTQxQZoEeL+BEwqwyYnFi0BRHZ8p3T8o0lJEgtl4nx91JASAVfiJQEzsX00SdnsvdH/b0gfZGgBwIOlIz9XSuA5vhmprBv5OpUOM4JwU4OLikQI8r3MojxHnK3pg0UOGy0kWgxgU6UrhyLqUhL+TwMANqbAC6FQDPZd4TCNolAXKg467GsTkfBRsLcuY4JwtoMhycVBhaBXmcGud3iBeW3PJORbFEsWkrC3amujdmWAL4xKarUp0fHYh64LmEW9ahXRQgBzqOOtVBzXlzfY0bbAQImeTcCGXz+MHhlGmrRLhxgc+WfKdEH8UQcXDc4aWgJpYmAXryocaKe6qDnUtYuAztigA50HFS49pc6ADnaCdhFWZKgY3DmfHAiRtoOMw4QcaEm4JgU+o7J+UBnJ60YhoFalwA5ISaVHcn5vwkA5A3btDQJ4noItwdaNsFyIGOgw66tTYPDfqquTbm7d8TIIgYSKSk9cSLbXek0cJywr3551Q20KSGC4ASBSIH1MTSp0CMlTZajgt+rgbuDgRtnQA50D7rdPdr83WrPloA44UZKx3lgI3ixKSk9fRPOk8J09KGDXJ9nfD+JUqCBE3S2pVB9gTYcYUxKInFZzszVt6iECOUKaa73k3/wtmBtkqAHGgfdaqblvqOQd9czk0m3KRMRU2CIAvSqAz0iOGpj5UYNCofaLziA7okDXjUcEdY7DwGPYPzRADKhR9+7oMYb7qrnWuKNTvQVgiQA+2bDjrr/OhOqbXDTSK8lASbVKjJ2pRQC+NtkeLNiETFgIbkNF6okdKlQs4UqCkBOC5XKBV2ose3uh8ZFwmCNixADrRPauzy7131JwdikiFoKtxYU1Vau4w4sw8zQ49wGI+bqNjUlQY7IsA4wqZATW6cBS6TYKeQe6Pnf7T7N4ndlKGNCZAD7YsuDRYWTwWXnKmobAjKgJlssCmwkSFrVjr0RCMiUhwcC3jE6Rp2IgGR5e6kAFAWxGwQdsq5Otc7dxWgA21EgBxoH5QOOMVgJ/XYkcfd7pz+ReJMqFPSS2mEw6KOzohzJIBJhBoLAGLnucAzJ+yUBBq32wPQgbZLgBxo19XsefPBVR/WDThTwSerzVP7Fkk3aJ4Denh66Vw5zaMdDV6IDdZamANqosCTAzHJLshm4GYe0Hl7N3UFQWsVIAfaZZ3q7uJoN/bTBu6pUDMX4EyFHRV8CiyijkGLlVZKL/V30HY5eKURzLCIVKhJBp7Ugd5KNxPQzAU65fr1WtxiDq1bJ3HFoR3WcOfiUFEngQ/+UriQYDRQT4CaUoAzFe7CtnlhxgVBEcDR3iNJqyQcSmqZgKo+T3fAz4nH9eX27edxwnHzvzo87tpTsWPq3ouU4+U17mEl7CML9xyHeft2VpFwz/Ho+mvHK50D5EDrFiAH2mUdrNrOB3ThUB9MjUFWKVY9dhY7XmAshU8AHN7AKY5V9Dgxj3QeKgwejZMK1ISqhDJ6wNEgZhCeONjzgT8VaLRjUspUoSeMMsLD6+e4nGY6F++s2n4glABBswqQA+2yTottT4UOh5HgzqgN3tagnt8AvZgohEXaMsqfCjGR8Fj+QRq+CJc5O1U9TFfXQR7D7dDckWzngzfcQw8ReeAiWmdmeGq2uB7IygVBE7TAxYMgSaVIqRDAlNI6mumuQ3Pf6sjdYQXaGCsr6zpt2XudpD39vEPHXoAcaJclz+9rvzKTwjMLGUVr4TPI02S+IDUWbhWSs2h1OW3Rn1dH51Xwt1i0f1Wl/FGQP2iTdxHuqFupfYvk1erKUerHsGRFo/5FwuMNezK3dRCUK0AOtMs6evKx+qDFgr1zA0wknB/zu2qkcO8dObFwLwzw40o4pvC4T8eOK34s/C06sKmUvyX08HwLBkesPmLHvB9UOfqkAU7FXvl7Qkq49hlNotNxmiS4c5bpCEotgoguK6khaDbhFnJo13Vx9SDOdeyRk7poN3sxb2Jfij2aYkI6Hjc4ZN8z5hqlmPgzn0gHEevclTZyTDkwGpy79tExNgYM04j908I9aVL7GJY1StNsCHiGIGjNAuRAu65T3bTVa5b9EAf4Kc+q8gCAMsCngk7YhhzQSe6b1T5HnOecHeqLix0S3QHFQcmBHuIDtRFH1gBvpXM6ciKUaODjARnt2HMdHP1Uj5evt7o7q64RBK1ZgBxoH6SAjmdTPM9meQlOR45zw+stCjRe2LHar6RlXfCHiQGJ4g6IcCJN16hhXrCJ5Z3g6pjpnJv9JYHPzIDT5gfgQBsVIAfaF01zdMK4Yk8f144d6dQ+pEBMBGpS0moAo7k0HqiZ8tUzcnUc0EPSIOxNkwE2/Hw2uPGmSwYUpc/uawHAgTYuQA60b0pbo+N1ZbxTOkkQ5Eg3arsRZ/YzFWqE9DlQI369lPrOGZFOBG60cAmQUqDHgBd+7o6bCjTedHOAz/L4arcjOR7KCW1UgBxoH3XQ3Xn1QJEHVm4KdkbtmgAx0r/zWH4JfLQwcgJN6a+bmKNDNB7cB6dS+hj0RPKkQA8Zi4pTAMaK88LNqB/edCP35kL3YwOCNi5ADrTPutA9+fi+jT2120pHVBB4Imlj+dUwL+h44gaN9UULPOGM1CFGi/NCDw+LxXOQMc8jcYMmegDGiisKN83/H+3+vcG9gbZGgBxo33Wq++LNhx1aF8RkpvWcj/qohGnfB+r3xFTgKSwLbMiIT9nDZjLUTIQgojKgw9sxDW6aHxQ3CIK2TIAc6Lioh51zo2ks9+LcQu4Oj1PPlTgeL52P2udMY4XHvivc3yUTprD44O/KE3N8SgIO+aCGNACR8nuhxwIWJa2Vj7d7PC11GXADbbsAOdBx1Lnu70H3dJUbYhxpKQIxMajxQM/UMIpASzHgmUm5YGPGxeBFCxMghSKQ4z63ACUlrdvReapbb3MJ01LQLgiQAx1nnQ6Ax+/uzAI8CeckAIyahgT4SXFvhPyesmKa+r0Tg5isfNJOyqnhMaDxpFkD9JBwLfR1Rreoqi53cIPbwaGdEiAHglqd6WDnLNX1A4Nr4gYe4ZznpZKQkxlGBrxYUKOVlZpmbdKgJZSVxoAeEsBlFCaV4cnrPKcIuCRDkAg2l/HMKWiXBciBoLHOdHt8nF1uLjhlQz2iCdCTmEYqSwuzyrDyeOPNPBl5R5IG84S8Ftio5WpxBrhE0yrnSWmmnA8a91QHNlcANtC+CJADQbZOdbBzsPxLcnkc0ONxhqQ8o0NvutGJDSxeMLHK35j4dIzWjlg6w6UR8xigkhxmTSlpZbvPG7fmSgA1WEAM7Z0AORCUptMr4MmBnijUKGlIAQkNQibBjliwP00kKjNhJ6dtYybzuECxNBnuDSUADklrZjLS6FBzBetroOMgQA4ETdPpbnrrYPla1w8OSysFNd68kfzCYVKcI3hrnZxIsNvRGcVp+VLCZ4Ge61RV1wKgAdRAx06AHAgqr4MOfM4sISgLfLQ7kFJ2IM6BHSHQkyYSnJHIIYer4wUaMSiWxgkxpAGJVU6SQ0Md0NzoQKaHGtziDR17AXIgaD06gp52muv08rb1UK5HKkTCyYCSGKx4YSb6lZH4nZKSPGmRcSSxNQ2lBlnukJXXATJaOJ9yagCmdWhCqIEgSPqnCciBoI3qoAOf091016nlJoUDlXx+lAVCnniWTjmNa+r3TvItVT6nZhTtmfJywooVJzkzjRPTrqG5GUw3wZ2BoAQBciBoO3UqcH5CADqzfAbXQKmOT0K8cWor5hDNJI/rwpUCPxa8WPFy+NU2bgAyN3CXEwSVEyAHgnZTp9lfM9110PUkAYS88SwtlYQXb0EZ7o1ZTAoEJYPN1e61mVq6GUDMTSwAhqD1CZADQfutHnx6F6g9ruszQa8flK9AKsxsyL2RlOPokAk014OpohvdIl9izgumkyBoywTIgSAoVAhDJJxTMG0mSXCRNqarSsU3OlAZh+nnEATtoAA5EARtShYsSQJ4QBDkFxH9/2mehFGsX8KEAAAAAElFTkSuQmCC"
  })));
}

var zero_notifications_ForwardRef = /*#__PURE__*/react["forwardRef"](SvgZeroNotifications);
/* harmony default export */ var zero_notifications = (__webpack_require__.p + "static/media/zero-notifications.3df14b57.svg");

// EXTERNAL MODULE: ./src/wallets/components/notifications/s.module.scss
var notifications_s_module = __webpack_require__(653);
var notifications_s_module_default = /*#__PURE__*/__webpack_require__.n(notifications_s_module);

// CONCATENATED MODULE: ./src/wallets/components/notifications/index.tsx
var notifications_Notifications=function Notifications(){var _useGeneral=Object(generalProvider["b" /* useGeneral */])(),theme=_useGeneral.theme;var _useNotifications=useNotifications(),notifications=_useNotifications.notifications;if(!notifications.length){return/*#__PURE__*/Object(jsx_runtime["jsxs"])(grid["a" /* default */],{flow:"row",gap:24,align:"center",padding:48,children:[theme==='dark'?/*#__PURE__*/Object(jsx_runtime["jsx"])(ForwardRef,{width:138,height:128}):/*#__PURE__*/Object(jsx_runtime["jsx"])(zero_notifications_ForwardRef,{width:138,height:128}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",color:"secondary",align:"center",children:"There are no notifications to show"})]});}return/*#__PURE__*/Object(jsx_runtime["jsx"])("ul",{className:notifications_s_module_default.a.list,children:notifications.sort(function(a,b){return b.startsOn-a.startsOn;}).map(function(n){return/*#__PURE__*/Object(jsx_runtime["jsx"])("li",{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(notification_Notification,{n:n})},n.id);})});};/* harmony default export */ var components_notifications = (notifications_Notifications);
// EXTERNAL MODULE: ./src/wallets/connectors/gnosis-safe/index.ts
var gnosis_safe = __webpack_require__(254);

// EXTERNAL MODULE: ./src/wallets/connectors/metamask/index.ts + 2 modules
var metamask = __webpack_require__(165);

// EXTERNAL MODULE: ./src/layout/components/layout-header/s.module.scss
var layout_header_s_module = __webpack_require__(84);
var layout_header_s_module_default = /*#__PURE__*/__webpack_require__.n(layout_header_s_module);

// CONCATENATED MODULE: ./src/layout/components/layout-header/index.tsx
var layout_header_LayoutHeader=function LayoutHeader(){var _useGeneral=Object(generalProvider["b" /* useGeneral */])(),navOpen=_useGeneral.navOpen,setNavOpen=_useGeneral.setNavOpen;var _useNetwork=Object(networkProvider["b" /* useNetwork */])(),activeNetwork=_useNetwork.activeNetwork;var title=!main["isMobile"]?"Governance":"";return/*#__PURE__*/Object(jsx_runtime["jsxs"])("header",{className:layout_header_s_module_default.a.component,children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("button",{type:"button",className:layout_header_s_module_default.a.burger,onClick:function onClick(){return setNavOpen(!navOpen);},children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(custom_icon["a" /* default */],{name:"burger",className:"hidden-desktop"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"arrow",rotate:navOpen?180:0,size:12,className:"hidden-mobile hidden-tablet"})]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"h3",weight:"semibold",color:"primary",className:layout_header_s_module_default.a.title,children:/*#__PURE__*/Object(jsx_runtime["jsxs"])(react_router["d" /* Switch */],{children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router["b" /* Route */],{path:"/yield-farming",children:"Yield Farming"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router["b" /* Route */],{path:"/governance",children:title}),/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router["b" /* Route */],{path:"/smart-exposure",children:"SMART Exposure"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router["b" /* Route */],{path:"/smart-alpha",children:"SMART Alpha"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router["b" /* Route */],{path:"/faucets",children:"Faucets"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router["b" /* Route */],{path:"*",children:"BarnBridge"})]})}),!main["isMobile"]?/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"flex align-center col-gap-16 ml-auto",children:[activeNetwork.config.features.addBondToken&&/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_header_AddTokenAction,{}),/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_header_NetworkAction,{}),/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_header_NotificationsAction,{}),/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_header_WalletAction,{})]}):/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"flex align-center col-gap-8 ml-auto",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_header_NetworkAction,{}),/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_header_NotificationsAction,{}),/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_header_WalletAction,{})]})]});};/* harmony default export */ var layout_header = (layout_header_LayoutHeader);var layout_header_PositionsAction=function PositionsAction(){var _useFetchQueuePositio=useFetchQueuePositions(),data=_useFetchQueuePositio.data;var _useTokens=Object(tokensProvider["b" /* useTokens */])(),getToken=_useTokens.getToken,getAsset=_useTokens.getAsset;var _useState=Object(react["useState"])(false),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),visible=_useState2[0],setVisible=_useState2[1];if(!Array.isArray(data)||!data.length){return null;}return/*#__PURE__*/Object(jsx_runtime["jsx"])(popover["a" /* default */],{placement:"bottomRight",trigger:"click",noPadding:true,visible:visible,onVisibleChange:setVisible,content:/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:classnames_default()('card',layout_header_s_module_default.a.notifications),children:[/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:"card-header flex",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"primary",children:"Queued positions"})}),/*#__PURE__*/Object(jsx_runtime["jsx"])("ul",{className:layout_header_s_module_default.a.queuedPositions,children:data.map(function(item,idx){var poolToken=getToken(item.poolToken.symbol);var oracleToken=getAsset(item.oracleAssetSymbol);return/*#__PURE__*/Object(jsx_runtime["jsxs"])("li",{className:layout_header_s_module_default.a.queuedPosition,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(token_icon["a" /* TokenIcon */],{name:poolToken===null||poolToken===void 0?void 0:poolToken.icon,bubble2Name:oracleToken===null||oracleToken===void 0?void 0:oracleToken.icon,size:40,className:"mr-16"}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"mr-16",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"primary",className:"mb-4",children:item.poolName}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"small",weight:"semibold",color:"secondary",children:"".concat(item.tranche==='SENIOR'?'Senior':'Junior'," ").concat(item.queueType," queue")})]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["e" /* Link */],{variation:"text",to:"/smart-alpha/portfolio/".concat(item.tranche==='SENIOR'?'senior':'junior',"?poolAddress=").concat(item.poolAddress),onClick:function onClick(){return setVisible(false);},children:"View position"})]},idx);})})]}),children:/*#__PURE__*/Object(jsx_runtime["jsxs"])("button",{type:"button",className:layout_header_s_module_default.a.actionButton,children:[data.length?/*#__PURE__*/Object(jsx_runtime["jsx"])(badge["b" /* SquareBadge */],{color:"red",className:"mr-8",children:data.length}):null,"Queued positions"]})});};var layout_header_AddTokenAction=function AddTokenAction(){var wallet=Object(walletProvider["c" /* useWallet */])();var _useKnownTokens=Object(knownTokensProvider["b" /* useKnownTokens */])(),projectToken=_useKnownTokens.projectToken;function handleAddProjectToken(){return _handleAddProjectToken.apply(this,arguments);}function _handleAddProjectToken(){_handleAddProjectToken=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(){return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!(wallet.connector instanceof metamask["a" /* MetamaskConnector */])){_context.next=9;break;}_context.prev=1;_context.next=4;return wallet.connector.addToken({type:'ERC20',options:{address:projectToken.address,symbol:projectToken.symbol,decimals:projectToken.decimals,image:"".concat(window.location.origin,"/android-chrome-192x192.png")}});case 4:_context.next=9;break;case 6:_context.prev=6;_context.t0=_context["catch"](1);console.error(_context.t0);case 9:case"end":return _context.stop();}}},_callee,null,[[1,6]]);}));return _handleAddProjectToken.apply(this,arguments);}return wallet.meta===metamask["b" /* default */]?/*#__PURE__*/Object(jsx_runtime["jsx"])("button",{type:"button",onClick:handleAddProjectToken,className:layout_header_s_module_default.a.actionButton,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(custom_icon["a" /* default */],{name:"bond-add-token"})}):null;};var layout_header_NetworkAction=function NetworkAction(){var _useNetwork2=Object(networkProvider["b" /* useNetwork */])(),activeNetwork=_useNetwork2.activeNetwork;var _useWeb=Object(web3Provider["d" /* useWeb3 */])(),showNetworkSelect=_useWeb.showNetworkSelect;return/*#__PURE__*/Object(jsx_runtime["jsxs"])("button",{type:"button",onClick:function onClick(){return showNetworkSelect();},className:layout_header_s_module_default.a.actionButton,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(custom_icon["a" /* default */],{name:activeNetwork.meta.logo,width:24,height:24,className:"mr-8"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:activeNetwork.meta.name})]});};var layout_header_NotificationsAction=function NotificationsAction(){var _useNotifications=useNotifications(),setNotificationsReadUntil=_useNotifications.setNotificationsReadUntil,notifications=_useNotifications.notifications,notificationsReadUntil=_useNotifications.notificationsReadUntil;var markAllAsRead=function markAllAsRead(){if(notifications.length){setNotificationsReadUntil(Math.max.apply(Math,Object(toConsumableArray["a" /* default */])(notifications.map(function(n){return n.startsOn;}))));}};var hasUnread=notificationsReadUntil?notifications.some(function(n){return n.startsOn>notificationsReadUntil;}):false;return/*#__PURE__*/Object(jsx_runtime["jsx"])(popover["a" /* default */],{placement:"bottomRight",trigger:"click",noPadding:true,content:/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:classnames_default()('card',layout_header_s_module_default.a.notifications),children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"card-header flex",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"primary",children:"Notifications"}),hasUnread&&/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["a" /* Button */],{type:"button",variation:"link",className:"ml-auto",onClick:markAllAsRead,children:"Mark all as read"})]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(components_notifications,{})]}),children:/*#__PURE__*/Object(jsx_runtime["jsx"])("button",{type:"button",className:layout_header_s_module_default.a.actionButton,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon_notification,{width:24,height:24,notificationSize:8,bubble:hasUnread,className:layout_header_s_module_default.a.notificationIcon,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"bell"})})})});};var layout_header_WalletAction=function WalletAction(){var _wallet$meta;var _useNetwork3=Object(networkProvider["b" /* useNetwork */])(),activeNetwork=_useNetwork3.activeNetwork;var wallet=Object(walletProvider["c" /* useWallet */])();if(wallet.connecting){var _wallet$connecting;return/*#__PURE__*/Object(jsx_runtime["jsx"])(popover["a" /* default */],{placement:"bottomRight",noPadding:true,content:/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"card",children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"card-header flex align-center",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(identicon["a" /* default */],{address:wallet.account,width:40,height:40,className:"mr-16"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["b" /* ExplorerAddressLink */],{address:wallet.account,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"blue",children:Object(web3_utils["f" /* shortenAddr */])(wallet.account,8,8)})})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"pv-24 ph-32",children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"flex align-center mb-32",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"status",className:"mr-16",color:"secondary"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",color:"secondary",className:"mr-16",children:"Status"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(badge["a" /* Badge */],{color:"green",className:"ml-auto",children:"Connecting"})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"flex align-center mb-32",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"wallet",className:"mr-16",color:"secondary"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",color:"secondary",className:"mr-16",children:"Wallet"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"primary",className:"ml-auto",children:(_wallet$connecting=wallet.connecting)===null||_wallet$connecting===void 0?void 0:_wallet$connecting.name})]})]}),wallet.meta!==gnosis_safe["a" /* default */]&&/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:"card-footer grid",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["a" /* Button */],{type:"button",variation:"ghost",onClick:function onClick(){return wallet.disconnect();},children:"Disconnect"})})]}),trigger:"click",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["a" /* Button */],{size:"small",variation:"primary",children:"Connecting..."})});}if(!wallet.isActive){return/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["a" /* Button */],{size:"small",variation:"primary",onClick:function onClick(){return wallet.showWalletsModal();},children:"Connect Wallet"});}return/*#__PURE__*/Object(jsx_runtime["jsx"])(popover["a" /* default */],{placement:"bottomRight",trigger:"click",noPadding:true,className:layout_header_s_module_default.a.popover,content:/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"card",children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"card-header flex align-center",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(identicon["a" /* default */],{address:wallet.account,width:40,height:40,className:"mr-16"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["b" /* ExplorerAddressLink */],{address:wallet.account,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"blue",children:Object(web3_utils["f" /* shortenAddr */])(wallet.account,8,8)})})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"pv-24 ph-32",children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"flex align-center mb-32",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"status",className:"mr-16",color:"secondary"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",color:"secondary",className:"mr-16",children:"Status"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(badge["a" /* Badge */],{color:"green",className:"ml-auto",children:"Connected"})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"flex align-center mb-32",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"wallet",className:"mr-16",color:"secondary"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",color:"secondary",className:"mr-16",children:"Wallet"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"primary",className:"ml-auto",children:(_wallet$meta=wallet.meta)===null||_wallet$meta===void 0?void 0:_wallet$meta.name})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"flex align-center",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"network",className:"mr-16",color:"secondary"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",color:"secondary",className:"mr-16",children:"Network"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"primary",className:"ml-auto",children:activeNetwork.meta.name})]})]}),wallet.meta!==gnosis_safe["a" /* default */]&&/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:"card-footer grid",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_button["a" /* Button */],{type:"button",variation:"ghost",onClick:function onClick(){return wallet.disconnect();},children:"Disconnect"})})]}),children:/*#__PURE__*/Object(jsx_runtime["jsxs"])("button",{type:"button",className:layout_header_s_module_default.a.actionButton,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(identicon["a" /* default */],{address:wallet.account,width:24,height:24,className:"mr-8"}),Object(web3_utils["f" /* shortenAddr */])(wallet.account,4,3)]})});};
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(39);

// EXTERNAL MODULE: ./src/components/antd/tooltip/index.tsx
var tooltip = __webpack_require__(115);

// EXTERNAL MODULE: ./src/layout/components/layout-side-nav/s.module.scss
var layout_side_nav_s_module = __webpack_require__(27);
var layout_side_nav_s_module_default = /*#__PURE__*/__webpack_require__.n(layout_side_nav_s_module);

// CONCATENATED MODULE: ./src/layout/components/layout-side-nav/index.tsx
/* eslint-disable jsx-a11y/no-static-element-interactions */ /* eslint-disable jsx-a11y/click-events-have-key-events */var layout_side_nav_LayoutSideNav=function LayoutSideNav(){var _cn2;var _useGeneral=Object(generalProvider["b" /* useGeneral */])(),navOpen=_useGeneral.navOpen,setNavOpen=_useGeneral.setNavOpen;var _useConfig=Object(configProvider["b" /* useConfig */])(),features=_useConfig.features;var location=Object(react_router["h" /* useLocation */])();react_default.a.useEffect(function(){setNavOpen(false);},[location.pathname,setNavOpen]);react_default.a.useEffect(function(){if(navOpen){document.body.style.overflow='hidden';}else{document.body.style.overflow='';}},[navOpen]);var displayTooltip=!main["isMobile"]&&!navOpen;return/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_side_nav_s_module_default.a.wrap,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:classnames_default()('hidden-desktop',layout_side_nav_s_module_default.a.mask,Object(defineProperty["a" /* default */])({},layout_side_nav_s_module_default.a.open,navOpen)),onClick:function onClick(){return setNavOpen(false);}}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("aside",{className:classnames_default()(layout_side_nav_s_module_default.a.aside,(_cn2={},Object(defineProperty["a" /* default */])(_cn2,layout_side_nav_s_module_default.a.expanded,navOpen),Object(defineProperty["a" /* default */])(_cn2,layout_side_nav_s_module_default.a.open,navOpen),_cn2)),children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_side_nav_s_module_default.a.logoContainer,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])("button",{type:"button",className:layout_side_nav_s_module_default.a.closeButton,onClick:function onClick(){return setNavOpen(false);},children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"close"})}),/*#__PURE__*/Object(jsx_runtime["jsxs"])(react_router_dom["b" /* Link */],{to:"/",className:layout_side_nav_s_module_default.a.logo,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(custom_icon["a" /* default */],{name:"bond-square-token"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(custom_icon["a" /* default */],{name:"barnbridge",width:"113",color:"primary",className:layout_side_nav_s_module_default.a.logoLabel})]})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("nav",{className:layout_side_nav_s_module_default.a.top,children:[features.faucets&&/*#__PURE__*/Object(jsx_runtime["jsxs"])(react_router_dom["c" /* NavLink */],{to:"/faucets",className:layout_side_nav_s_module_default.a.button,activeClassName:layout_side_nav_s_module_default.a.active,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(tooltip["a" /* default */],{title:displayTooltip&&'Faucets',placement:"right",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"menu-faucet",size:40})}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_side_nav_s_module_default.a.btnContent,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb2",weight:"bold",className:layout_side_nav_s_module_default.a.btnLabel,color:"blue",children:"DAO"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb1",weight:"semibold",className:layout_side_nav_s_module_default.a.btnText,children:"Faucets"})]})]}),features.yieldFarming&&/*#__PURE__*/Object(jsx_runtime["jsxs"])(react_router_dom["c" /* NavLink */],{to:"/yield-farming",className:layout_side_nav_s_module_default.a.button,activeClassName:layout_side_nav_s_module_default.a.active,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(tooltip["a" /* default */],{title:displayTooltip&&'Yield Farming',placement:"right",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"menu-yf",size:40})}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_side_nav_s_module_default.a.btnContent,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb2",weight:"bold",className:layout_side_nav_s_module_default.a.btnLabel,color:"blue",children:"DAO"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb1",weight:"semibold",className:layout_side_nav_s_module_default.a.btnText,children:"Yield Farming"})]})]}),features.dao&&/*#__PURE__*/Object(jsx_runtime["jsxs"])(react_router_dom["c" /* NavLink */],{to:"/governance",className:layout_side_nav_s_module_default.a.button,activeClassName:layout_side_nav_s_module_default.a.active,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(tooltip["a" /* default */],{title:displayTooltip&&'Governance',placement:"right",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"menu-dao",size:40})}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_side_nav_s_module_default.a.btnContent,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb2",weight:"bold",className:layout_side_nav_s_module_default.a.btnLabel,color:"blue",children:"DAO"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb1",weight:"semibold",className:layout_side_nav_s_module_default.a.btnText,children:"Governance"})]})]}),features.smartAlpha&&/*#__PURE__*/Object(jsx_runtime["jsxs"])(react_router_dom["c" /* NavLink */],{to:"/smart-alpha",className:layout_side_nav_s_module_default.a.button,activeClassName:layout_side_nav_s_module_default.a.active,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(tooltip["a" /* default */],{title:displayTooltip&&'SMART Alpha',placement:"right",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"menu-sa",size:40})}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_side_nav_s_module_default.a.btnContent,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb2",weight:"bold",className:layout_side_nav_s_module_default.a.btnLabel,color:"red",children:"SMART"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb1",weight:"semibold",className:layout_side_nav_s_module_default.a.btnText,children:"Alpha"})]})]}),features.smartExposure&&/*#__PURE__*/Object(jsx_runtime["jsxs"])(react_router_dom["c" /* NavLink */],{to:"/smart-exposure",className:layout_side_nav_s_module_default.a.button,activeClassName:layout_side_nav_s_module_default.a.active,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(tooltip["a" /* default */],{title:displayTooltip&&'SMART Exposure',placement:"right",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"menu-se",size:40})}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_side_nav_s_module_default.a.btnContent,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb2",weight:"bold",className:layout_side_nav_s_module_default.a.btnLabel,color:"red",children:"SMART"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb1",weight:"semibold",className:layout_side_nav_s_module_default.a.btnText,children:"Exposure"})]})]})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_side_nav_s_module_default.a.bottom,children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("a",{rel:"noopener noreferrer",target:"_blank",href:"https://docs.barnbridge.com/",className:layout_side_nav_s_module_default.a.button,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(tooltip["a" /* default */],{title:displayTooltip&&'Docs',placement:"right",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:"menu-docs",size:40})}),/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:layout_side_nav_s_module_default.a.btnContent,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb1",weight:"semibold",className:layout_side_nav_s_module_default.a.btnLabel,color:"primary",children:"Docs"})})]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_side_nav_ToggleThemeButton,{displayTooltip:displayTooltip})]})]})]});};/* harmony default export */ var layout_side_nav = (layout_side_nav_LayoutSideNav);var layout_side_nav_ToggleThemeButton=function ToggleThemeButton(_ref){var displayTooltip=_ref.displayTooltip;var _useGeneral2=Object(generalProvider["b" /* useGeneral */])(),toggleTheme=_useGeneral2.toggleTheme,selectedTheme=_useGeneral2.selectedTheme;var text;var iconName;if(selectedTheme==='light'){text='Light Theme';iconName='menu-theme-light';}else if(selectedTheme==='dark'){text='Dark Theme';iconName='menu-theme-dark';}else{text='Auto Theme (OS)';iconName='menu-theme-auto';}return/*#__PURE__*/Object(jsx_runtime["jsxs"])("button",{type:"button",onClick:toggleTheme,className:layout_side_nav_s_module_default.a.button,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(tooltip["a" /* default */],{title:displayTooltip&&text,placement:"right",children:/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* Icon */],{name:iconName,size:40})}),/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:layout_side_nav_s_module_default.a.btnContent,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"lb1",weight:"semibold",className:layout_side_nav_s_module_default.a.btnLabel,children:text})})]});};
// EXTERNAL MODULE: ./src/layout/s.module.scss
var layout_s_module = __webpack_require__(427);
var layout_s_module_default = /*#__PURE__*/__webpack_require__.n(layout_s_module);

// CONCATENATED MODULE: ./src/layout/index.tsx
var GovernanceView=/*#__PURE__*/Object(react["lazy"])(function(){return Promise.all(/* import() */[__webpack_require__.e(4), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, 1973));});var layout_LayoutView=function LayoutView(){var _useNetwork=Object(networkProvider["b" /* useNetwork */])(),activeNetwork=_useNetwork.activeNetwork;var _useConfig=Object(configProvider["b" /* useConfig */])(),features=_useConfig.features;return/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:layout_s_module_default.a.layout,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_side_nav,{}),/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:"flex flow-row flex-grow",children:/*#__PURE__*/Object(jsx_runtime["jsxs"])(warning_provider,{children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_header,{}),/*#__PURE__*/Object(jsx_runtime["jsx"])("main",{className:layout_s_module_default.a.main,children:/*#__PURE__*/Object(jsx_runtime["jsx"])(error_boundary_ErrorBoundary,{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(react["Suspense"],{fallback:/*#__PURE__*/Object(jsx_runtime["jsx"])(spin_default.a,{className:"pv-24 ph-64"}),children:/*#__PURE__*/Object(jsx_runtime["jsxs"])(react_router["d" /* Switch */],{children:[features.dao&&/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router["b" /* Route */],{path:"/governance/:vt(\\w+)",component:GovernanceView}),features.dao&&/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router["b" /* Route */],{path:"/governance",component:GovernanceView}),/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router["a" /* Redirect */],{from:"/",to:"/governance"})]})})})}),/*#__PURE__*/Object(jsx_runtime["jsx"])(layout_footer,{})]})})]});};/* harmony default export */ var layout = (layout_LayoutView);
// CONCATENATED MODULE: ./node_modules/@svgr/webpack/lib?-svgo,+titleProp,+ref!./src/resources/svg/static-sprite.svg
var static_sprite_defs, _symbol, _symbol2, _symbol3, _symbol4, _rect, _path, _rect2, _path2, _linearGradient, _rect3, _filter, _filter2, static_sprite_g, _rect4, _path3, _rect5, _path4, _linearGradient2, _rect6, _filter3, _filter4, _g2, _rect7, _path5, _rect8, _path6, _linearGradient3, _rect9, _filter5, _filter6, _g3, _rect10, _path7, _rect11, _path8, _linearGradient4, _rect12, _filter7, _filter8, _g4, _rect13, _path9, _rect14, _path10, _linearGradient5, _rect15, _filter9, _filter10, _g5, _rect16, _path11, _rect17, _path12, _linearGradient6, _rect18, _filter11, _filter12, _g6, _rect19, _path13, _rect20, _path14, _linearGradient7, _rect21, _filter13, _filter14, _g7, _rect22, _path15, _linearGradient8, _rect23, _filter15, _filter16, _g8, _rect24, _path16, _linearGradient9, _rect25, _filter17, _filter18, _g9, _rect26, _path17, _rect27, _path18, _linearGradient10, _rect28, _filter19, _filter20, _g10;

var static_sprite_excluded = ["title", "titleId"];

function static_sprite_extends() { static_sprite_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return static_sprite_extends.apply(this, arguments); }

function static_sprite_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = static_sprite_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function static_sprite_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



function SvgStaticSprite(_ref, svgRef) {
  var title = _ref.title,
      titleId = _ref.titleId,
      props = static_sprite_objectWithoutProperties(_ref, static_sprite_excluded);

  return /*#__PURE__*/react["createElement"]("svg", static_sprite_extends({
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      position: "absolute",
      width: 0,
      height: 0
    },
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/react["createElement"]("title", {
    id: titleId
  }, title) : null, static_sprite_defs || (static_sprite_defs = /*#__PURE__*/react["createElement"]("defs", null, /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__static/token-bond__mask",
    width: 36,
    height: 36,
    x: 4,
    y: 4,
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("circle", {
    cx: 22,
    cy: 22,
    r: 17.6,
    fill: "white"
  })), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__static/token-uniswap__mask",
    width: 30,
    height: 30,
    x: 5,
    y: 7,
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("circle", {
    cx: 20,
    cy: 22,
    r: 15,
    fill: "white"
  })), /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__static/aave__gradient",
    x1: 34.912,
    x2: 5.152,
    y1: 7.453,
    y2: 32.493,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#B6509E"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#2EBAC6"
  })), /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__static/token-staked-aave_c",
    width: 292,
    height: 292,
    x: -18,
    y: -17,
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    result: "b",
    stdDeviation: 6
  }), /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0.161
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "b",
    operator: "in"
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in: "SourceGraphic"
  })), /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__static/token-staked-aave_d",
    width: 186.926,
    height: 215.014,
    x: 35,
    y: 26,
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feOffset", null), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    result: "e",
    stdDeviation: 6
  }), /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0.2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "e",
    operator: "in"
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in: "SourceGraphic"
  })), /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__static/token-staked-aave_e",
    width: 105.037,
    height: 113.047,
    x: 76,
    y: 67,
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feOffset", null), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    result: "h",
    stdDeviation: 3
  }), /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0.161
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "h",
    operator: "in"
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in: "SourceGraphic"
  })), /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__static/token-staked-aave_a",
    x1: 0.907,
    x2: 0.163,
    y1: 0.227,
    y2: 0.853,
    gradientUnits: "objectBoundingBox"
  }, /*#__PURE__*/react["createElement"]("stop", {
    offset: 0,
    stopColor: "#b6509e"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#2ebac6"
  })), /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__static/token-staked-aave_f",
    x1: 0.699,
    x2: 0.059,
    y1: 0.251,
    y2: 1,
    xlinkHref: "#icon__static/token-staked-aave_a"
  }), /*#__PURE__*/react["createElement"]("clipPath", {
    id: "icon__static/token-staked-aave_b"
  }, /*#__PURE__*/react["createElement"]("path", {
    d: "M0 0h256v256H0z"
  })))), _symbol || (_symbol = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__static/token-bond",
    viewBox: "0 0 44 44",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("rect", {
    rx: 22,
    width: 44,
    height: 44,
    fill: "#ff4339"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M22.084 19.631h-.169c-2.284 0-4.061 1.862-4.061 4.231v4.57L22 25.3l4.146 3.13v-4.569c0-2.285-1.862-4.146-4.062-4.23z"
  }), /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__static/token-bond__mask)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M4.4 4.4v34.016l10.577-7.87v-8.969l-1.946-1.523L22 13.284l8.97 6.77-1.947 1.523v8.97L39.6 38.415V4.4H4.4z"
  })))), _symbol2 || (_symbol2 = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__static/token-uniswap",
    viewBox: "0 0 42 44",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("rect", {
    y: 2,
    width: 40,
    height: 40,
    rx: 20,
    fill: "#FF4339"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M20.0731 19.9805H19.9288C17.9817 19.9805 16.4673 21.567 16.4673 23.5862V27.4805L20.0009 24.8122L23.5346 27.4805V23.5862C23.5346 21.6391 21.9481 20.0526 20.0731 19.9805Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__static/token-uniswap__mask)"
  }, /*#__PURE__*/react["createElement"]("path", {
    d: "M5 7V35.9904L14.0144 29.2837V21.6394L12.3558 20.3413L20 14.5721L27.6442 20.3413L25.9856 21.6394V29.2837L35 35.9904V7H5Z",
    fill: "white"
  })), /*#__PURE__*/react["createElement"]("rect", {
    x: 23,
    y: 1,
    width: 18,
    height: 18,
    rx: 9,
    fill: "#FF4339",
    stroke: "white",
    strokeWidth: 2
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M30.1107 4.85275C29.9698 4.82925 29.9638 4.82649 30.0301 4.81553C30.1572 4.79451 30.4572 4.82316 30.664 4.87603C31.1466 4.99944 31.5858 5.31557 32.0546 5.87702L32.1792 6.02617L32.3573 5.99536C33.1079 5.86562 33.8715 5.96874 34.5102 6.28609C34.6859 6.3734 34.9629 6.5472 34.9975 6.59186C35.0086 6.60609 35.0288 6.69771 35.0425 6.79548C35.0899 7.13372 35.0662 7.39298 34.97 7.58663C34.9177 7.692 34.9148 7.7254 34.95 7.81558C34.9781 7.88755 35.0564 7.94081 35.1339 7.9407C35.2926 7.94046 35.4634 7.66449 35.5426 7.2805L35.5741 7.12798L35.6363 7.20386C35.978 7.62021 36.2463 8.18802 36.2924 8.59219L36.3044 8.69757L36.247 8.60177C36.1482 8.43693 36.0488 8.32471 35.9217 8.2342C35.6924 8.07105 35.4501 8.01554 34.8082 7.97915C34.2285 7.94629 33.9004 7.89303 33.575 7.77892C33.0215 7.58479 32.7425 7.32625 32.0849 6.39832C31.7929 5.98617 31.6124 5.75813 31.4328 5.57449C31.0248 5.15721 30.6239 4.93837 30.1107 4.85275Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M35.1284 5.77278C35.143 5.4966 35.1778 5.31443 35.2478 5.14806C35.2755 5.08222 35.3015 5.02832 35.3055 5.02832C35.3095 5.02832 35.2974 5.07692 35.2787 5.13632C35.2278 5.29778 35.2194 5.51861 35.2545 5.77555C35.299 6.10155 35.3243 6.14859 35.6447 6.50074C35.7949 6.66592 35.9697 6.87424 36.033 6.96368L36.1482 7.12631L36.033 7.01009C35.8921 6.86796 35.5682 6.59077 35.4966 6.55115C35.4486 6.52458 35.4415 6.52504 35.4119 6.55673C35.3846 6.58592 35.3788 6.6298 35.3751 6.83722C35.3692 7.16051 35.3282 7.36801 35.2294 7.57549C35.1759 7.6877 35.1674 7.66375 35.2158 7.53709C35.2519 7.44252 35.2556 7.40095 35.2554 7.08799C35.2548 6.45918 35.1854 6.30801 34.7784 6.04905C34.6754 5.98345 34.5054 5.88884 34.4009 5.83879C34.2964 5.78875 34.2134 5.74516 34.2164 5.7419C34.2279 5.72957 34.6248 5.85417 34.7846 5.92028C35.0222 6.0186 35.0614 6.03135 35.0903 6.01949C35.1097 6.01153 35.119 5.95093 35.1284 5.77278Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M30.3845 6.84829C30.0984 6.42474 29.9215 5.77534 29.9598 5.28988L29.9716 5.13965L30.0367 5.15243C30.159 5.17641 30.3698 5.26081 30.4685 5.3253C30.7394 5.50225 30.8567 5.73523 30.976 6.33348C31.0109 6.50872 31.0568 6.70702 31.0779 6.77415C31.1118 6.88221 31.2402 7.13462 31.3445 7.29854C31.4197 7.4166 31.3698 7.47255 31.2036 7.45641C30.9499 7.43178 30.6062 7.17663 30.3845 6.84829Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M34.781 10.0008C33.4444 9.42189 32.9736 8.91941 32.9736 8.07158C32.9736 7.94681 32.9776 7.84473 32.9825 7.84473C32.9874 7.84473 33.0391 7.8859 33.0974 7.93624C33.3685 8.17008 33.672 8.26995 34.5122 8.40181C35.0067 8.47941 35.2849 8.54208 35.5416 8.63364C36.3574 8.92468 36.8622 9.51529 36.9826 10.3197C37.0175 10.5535 36.997 10.9918 36.9403 11.2229C36.8956 11.4053 36.7589 11.7342 36.7227 11.7469C36.7126 11.7504 36.7028 11.7089 36.7002 11.6526C36.6865 11.3505 36.5446 11.0564 36.3063 10.8361C36.0353 10.5857 35.6712 10.3863 34.781 10.0008Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M33.8429 10.2416C33.8262 10.1344 33.7971 9.99754 33.7784 9.93742L33.7443 9.82812L33.8076 9.9046C33.8953 10.0104 33.9646 10.1459 34.0233 10.3263C34.0681 10.4639 34.0731 10.5049 34.0728 10.7286C34.0725 10.9483 34.0669 10.9943 34.0255 11.1182C33.9602 11.3136 33.8793 11.4522 33.7434 11.6009C33.4992 11.8682 33.1853 12.0162 32.7323 12.0776C32.6536 12.0882 32.4241 12.1062 32.2223 12.1175C31.7138 12.1459 31.3792 12.2047 31.0785 12.3183C31.0352 12.3346 30.9966 12.3446 30.9927 12.3404C30.9805 12.3273 31.1853 12.196 31.3544 12.1084C31.5928 11.9848 31.8302 11.9175 32.362 11.8222C32.6247 11.7751 32.896 11.718 32.9649 11.6953C33.6155 11.4807 33.95 10.927 33.8429 10.2416Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M34.4558 11.4118C34.2782 11.0012 34.2374 10.6047 34.3347 10.2349C34.3451 10.1954 34.3618 10.1631 34.3719 10.1631C34.382 10.1631 34.4239 10.1875 34.465 10.2172C34.5469 10.2765 34.711 10.3763 35.1482 10.6327C35.6939 10.9527 36.005 11.2005 36.2166 11.4836C36.4019 11.7315 36.5165 12.0139 36.5717 12.3583C36.603 12.5533 36.5846 13.0226 36.5381 13.219C36.3914 13.8383 36.0504 14.3247 35.5641 14.6085C35.4929 14.6501 35.4289 14.6843 35.422 14.6844C35.415 14.6846 35.441 14.6136 35.4797 14.5266C35.6432 14.1588 35.6619 13.801 35.5382 13.4027C35.4625 13.1588 35.308 12.8612 34.9963 12.3583C34.6338 11.7736 34.5449 11.618 34.4558 11.4118Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M29.4353 13.6276C29.9313 13.1771 30.5484 12.857 31.1106 12.7588C31.3529 12.7164 31.7565 12.7332 31.9809 12.795C32.3405 12.894 32.6622 13.1158 32.8295 13.3799C32.993 13.6381 33.0631 13.8631 33.1362 14.3637C33.165 14.5612 33.1963 14.7595 33.2058 14.8044C33.2607 15.0639 33.3674 15.2712 33.4996 15.3754C33.7097 15.5408 34.0714 15.551 34.4273 15.4017C34.4877 15.3763 34.5401 15.3588 34.5438 15.3628C34.5567 15.3766 34.3775 15.5056 34.2511 15.5735C34.081 15.6649 33.9458 15.7003 33.766 15.7003C33.4401 15.7003 33.1696 15.522 32.9438 15.1583C32.8994 15.0867 32.7995 14.8724 32.7219 14.682C32.4835 14.0971 32.3658 13.919 32.089 13.724C31.8481 13.5544 31.5375 13.5239 31.3038 13.6472C30.9968 13.8091 30.9112 14.2311 31.131 14.4985C31.2184 14.6048 31.3814 14.6964 31.5146 14.7142C31.7639 14.7476 31.9781 14.5436 31.9781 14.2729C31.9781 14.0971 31.9153 13.9968 31.7572 13.92C31.5412 13.8152 31.3091 13.9378 31.3102 14.156C31.3107 14.2491 31.3483 14.3074 31.4351 14.3497C31.4907 14.3768 31.492 14.3789 31.4466 14.3687C31.2485 14.3246 31.2021 14.0676 31.3614 13.897C31.5527 13.6923 31.9482 13.7826 32.084 14.0622C32.1411 14.1796 32.1477 14.4134 32.098 14.5546C31.9866 14.8706 31.662 15.0368 31.3326 14.9464C31.1084 14.8847 31.0171 14.8181 30.7467 14.5186C30.277 13.998 30.0946 13.8972 29.4174 13.7835L29.2876 13.7617L29.4353 13.6276Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M27.231 4.31134C28.7998 6.35946 29.8803 7.20447 30.0004 7.383C30.0996 7.53042 30.0622 7.66294 29.8924 7.76681C29.798 7.82456 29.6038 7.88307 29.5065 7.88307C29.3966 7.88307 29.3588 7.83744 29.3588 7.83744C29.2951 7.77239 29.2592 7.78376 28.9317 7.1586C28.4772 6.39988 28.0967 5.77049 28.0864 5.75995C28.0624 5.73558 28.0628 5.7364 28.8854 7.31961C29.0183 7.64959 28.9118 7.77072 28.9118 7.81771C28.9118 7.91332 28.8876 7.96357 28.7779 8.09513C28.5951 8.31446 28.5134 8.56091 28.4545 9.07096C28.3883 9.64272 28.2024 10.0466 27.6871 10.7378C27.3855 11.1425 27.3362 11.2166 27.26 11.3797C27.1642 11.5851 27.1378 11.7001 27.1271 11.9594C27.1158 12.2337 27.1378 12.4108 27.2157 12.673C27.2839 12.9025 27.3551 13.054 27.537 13.3571C27.694 13.6187 27.7844 13.8131 27.7844 13.8892C27.7844 13.9497 27.7952 13.9498 28.0385 13.8906C28.6207 13.7492 29.0935 13.5005 29.3594 13.1956C29.524 13.0069 29.5626 12.9027 29.5639 12.6443C29.5647 12.4751 29.5592 12.4397 29.5167 12.3424C29.4475 12.184 29.3215 12.0524 29.0439 11.8483C28.6802 11.5808 28.5249 11.3655 28.482 11.0694C28.4468 10.8264 28.4876 10.655 28.6888 10.2014C28.8971 9.73183 28.9487 9.53174 28.9836 9.05847C29.0061 8.7527 29.0374 8.63211 29.119 8.53532C29.2042 8.43438 29.2809 8.4002 29.4917 8.36922C29.8354 8.31872 30.0542 8.22308 30.2341 8.04478C30.3902 7.8901 30.4555 7.74106 30.4655 7.5167L30.4731 7.34664L30.3859 7.23728C30.0701 6.84121 27.0196 4 27.0001 4C26.996 4 27.0999 4.14011 27.231 4.31134ZM27.9617 12.2697C28.0331 12.1337 27.9952 11.9589 27.8757 11.8734C27.7629 11.7927 27.5876 11.8308 27.5876 11.9359C27.5876 11.968 27.6041 11.9914 27.6413 12.012C27.7039 12.0466 27.7084 12.0856 27.6592 12.1652C27.6093 12.2459 27.6133 12.3168 27.6705 12.365C27.7628 12.4427 27.8933 12.4 27.9617 12.2697Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M30.6902 8.45861C30.5288 8.51197 30.372 8.69607 30.3234 8.88912C30.2938 9.00689 30.3106 9.21347 30.355 9.27727C30.4267 9.38032 30.496 9.40747 30.6837 9.40605C31.0511 9.40329 31.3705 9.23362 31.4076 9.02152C31.4381 8.84766 31.2978 8.6067 31.1046 8.50092C31.0048 8.44636 30.7928 8.42471 30.6902 8.45861ZM31.1197 8.82023C31.1764 8.73355 31.1516 8.63986 31.0552 8.5765C30.8717 8.45585 30.5942 8.55569 30.5942 8.74235C30.5942 8.83526 30.7389 8.93664 30.8716 8.93664C30.9599 8.93664 31.0807 8.87995 31.1197 8.82023Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M32 43C36.9856 43 41 38.9856 41 34C41 29.0144 36.9856 25 32 25C27.0144 25 23 29.0144 23 34C23 38.9856 27.0144 43 32 43Z",
    fill: "#FF4339",
    stroke: "white",
    strokeWidth: 2
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M34.2 35.2664C34.2 34.0998 33.5 33.6998 32.1 33.5331C31.1 33.3998 30.9 33.1331 30.9 32.6664C30.9 32.1997 31.2334 31.8998 31.9 31.8998C32.5 31.8998 32.8334 32.0998 33 32.5998C33.0334 32.6998 33.1334 32.7664 33.2334 32.7664H33.7667C33.9 32.7664 34 32.6664 34 32.5331V32.4998C33.8667 31.7664 33.2667 31.1998 32.5 31.1331V30.3331C32.5 30.1998 32.4 30.0998 32.2334 30.0664H31.7334C31.6 30.0664 31.5 30.1664 31.4667 30.3331V31.0998C30.4667 31.2331 29.8334 31.8998 29.8334 32.7331C29.8334 33.8331 30.5 34.2664 31.9 34.4331C32.8334 34.5998 33.1334 34.7998 33.1334 35.3331C33.1334 35.8665 32.6667 36.2331 32.0334 36.2331C31.1667 36.2331 30.8667 35.8664 30.7667 35.3664C30.7334 35.2331 30.6334 35.1664 30.5334 35.1664H29.9667C29.8334 35.1664 29.7334 35.2664 29.7334 35.3998V35.4331C29.8667 36.2664 30.4 36.8664 31.5 37.0331V37.8331C31.5 37.9664 31.6 38.0664 31.7667 38.0998H32.2667C32.4 38.0998 32.5 37.9998 32.5334 37.8331V37.0331C33.5334 36.8664 34.2 36.1664 34.2 35.2664Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M30.3002 38.7663C27.7002 37.833 26.3668 34.933 27.3335 32.3663C27.8335 30.9663 28.9335 29.8996 30.3002 29.3996C30.4335 29.333 30.5002 29.233 30.5002 29.0663V28.5996C30.5002 28.4663 30.4335 28.3663 30.3002 28.333C30.2668 28.333 30.2002 28.333 30.1668 28.3663C27.0002 29.3663 25.2668 32.733 26.2668 35.8996C26.8668 37.7663 28.3002 39.1996 30.1668 39.7996C30.3002 39.8663 30.4335 39.7996 30.4668 39.6663C30.5002 39.633 30.5002 39.5996 30.5002 39.533V39.0663C30.5002 38.9663 30.4002 38.833 30.3002 38.7663ZM33.8335 28.3663C33.7002 28.2996 33.5668 28.3663 33.5335 28.4996C33.5002 28.533 33.5002 28.5663 33.5002 28.633V29.0996C33.5002 29.233 33.6002 29.3663 33.7002 29.433C36.3002 30.3663 37.6335 33.2663 36.6668 35.833C36.1668 37.233 35.0668 38.2996 33.7002 38.7996C33.5668 38.8663 33.5002 38.9663 33.5002 39.133V39.5996C33.5002 39.733 33.5668 39.833 33.7002 39.8663C33.7335 39.8663 33.8002 39.8663 33.8335 39.833C37.0002 38.833 38.7335 35.4663 37.7335 32.2996C37.1335 30.3996 35.6668 28.9663 33.8335 28.3663Z",
    fill: "white"
  }))), _symbol3 || (_symbol3 = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__static/aave",
    fill: "none",
    viewBox: "0 0 40 40"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "url(#icon__static/aave__gradient)",
    d: "M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M28.753 27.97L21.99 11.618c-.382-.846-.949-1.258-1.696-1.258h-.598c-.748 0-1.315.412-1.696 1.258l-2.943 7.123H12.83a1.22 1.22 0 00-1.211 1.212v.015a1.223 1.223 0 001.211 1.211h1.196l-2.81 6.79c-.051.149-.082.303-.082.463 0 .381.119.68.33.912.211.232.515.346.897.346a1.2 1.2 0 00.696-.232c.216-.15.366-.366.484-.614l3.093-7.67h2.144a1.22 1.22 0 001.212-1.211v-.031a1.223 1.223 0 00-1.212-1.211h-1.144l2.36-5.882 6.434 16c.119.248.268.464.485.614.2.15.448.226.695.232.382 0 .68-.114.897-.346.217-.232.33-.53.33-.912a1.081 1.081 0 00-.082-.459z"
  }))), _symbol4 || (_symbol4 = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__static/token-staked-aave",
    viewBox: "0 0 256 256",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    clipPath: "url(#icon__static/token-staked-aave_b)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__static/token-staked-aave_c)"
  }, /*#__PURE__*/react["createElement"]("circle", {
    cx: 128,
    cy: 128,
    r: 128,
    fill: "#fff"
  })), /*#__PURE__*/react["createElement"]("circle", {
    cx: 128,
    cy: 128,
    r: 128,
    fill: "url(#icon__static/token-staked-aave_a)"
  }), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__static/token-staked-aave_d)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M200.186 65.287l-70.217-21.066a5.243 5.243 0 00-3.015 0L56.735 65.287a5.244 5.244 0 00-3.737 5.023v77.24c0 10.046 4.067 20.331 12.088 30.567 6.126 7.818 14.6 15.668 25.19 23.333a225.982 225.982 0 0036.042 21.105 5.242 5.242 0 004.286 0 226.01 226.01 0 0036.041-21.105c10.589-7.665 19.064-15.515 25.19-23.333 8.021-10.236 12.088-20.52 12.088-30.567V70.31a5.244 5.244 0 00-3.737-5.023z"
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__static/token-staked-aave_e)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "url(#icon__static/token-staked-aave_f)",
    d: "M88.828 86.576L55.566 6.19C53.686 2.036 50.908 0 47.23 0h-2.942c-3.678 0-6.456 2.036-8.336 6.19L21.487 41.211H10.536a5.989 5.989 0 00-5.966 5.945v.081a5.989 5.989 0 005.966 5.945h5.884L2.609 86.576a7.044 7.044 0 00-.409 2.28 6.286 6.286 0 001.634 4.479 5.736 5.736 0 004.413 1.71 5.975 5.975 0 003.432-1.14 7.253 7.253 0 002.37-3.013l15.2-37.709h10.544a5.989 5.989 0 005.966-5.945v-.163a5.989 5.989 0 00-5.966-5.945h-5.639l11.6-28.913 31.632 78.675a7.253 7.253 0 002.37 3.013 5.975 5.975 0 003.432 1.14 5.736 5.736 0 004.413-1.71 6.286 6.286 0 001.634-4.479 5.385 5.385 0 00-.407-2.28z",
    transform: "translate(82.8 76)"
  }))))), /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__menu-faucet",
    viewBox: "0 0 40 40",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__light, none)"
    }
  }, _rect || (_rect = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#F8F8F9"
  })), _path || (_path = /*#__PURE__*/react["createElement"]("path", {
    d: "M16.739 32.8H12.2867V32.7999H9.80078C8.69621 32.7999 7.76153 31.8605 8.24427 30.867C8.96699 29.3797 10.4969 28.3521 12.2643 28.3521H12.2867V16.286C12.2867 11.2668 16.368 7.19995 21.3937 7.19995H22.0008C26.5992 7.19995 30.4219 10.617 31.029 15.0424C31.119 15.7034 30.6018 16.286 29.9385 16.286H27.6449C27.1164 16.286 26.6667 15.9051 26.5655 15.3897C26.1495 13.261 24.2607 11.6589 22.0008 11.6589H21.3937C18.8302 11.6589 16.739 13.7316 16.739 16.2972V28.3521H16.7728C18.5417 28.3521 20.0669 29.3756 20.7856 30.8659C21.2654 31.8608 20.3297 32.7999 19.2251 32.7999H16.739V32.8ZM27.6561 20.0615C23.9346 24.9239 25.5087 27.3102 27.1164 28.3969C28.2183 29.1476 29.5787 29.1476 30.6805 28.3969C32.277 27.3102 33.8511 24.9239 30.1408 20.0615C29.4775 19.2101 28.297 19.2101 27.6561 20.0615Z",
    fill: "#AAAFB3"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__dark, none)"
    }
  }, _rect2 || (_rect2 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#202529"
  })), _path2 || (_path2 = /*#__PURE__*/react["createElement"]("path", {
    d: "M16.739 32.8H12.2867V32.7999H9.80078C8.69621 32.7999 7.76153 31.8605 8.24427 30.867C8.96699 29.3797 10.4969 28.3521 12.2643 28.3521H12.2867V16.286C12.2867 11.2668 16.368 7.19995 21.3937 7.19995H22.0008C26.5992 7.19995 30.4219 10.617 31.029 15.0424C31.119 15.7034 30.6018 16.286 29.9385 16.286H27.6449C27.1164 16.286 26.6667 15.9051 26.5655 15.3897C26.1495 13.261 24.2607 11.6589 22.0008 11.6589H21.3937C18.8302 11.6589 16.739 13.7316 16.739 16.2972V28.3521H16.7728C18.5417 28.3521 20.0669 29.3756 20.7856 30.8659C21.2654 31.8608 20.3297 32.7999 19.2251 32.7999H16.739V32.8ZM27.6561 20.0615C23.9346 24.9239 25.5087 27.3102 27.1164 28.3969C28.2183 29.1476 29.5787 29.1476 30.6805 28.3969C32.277 27.3102 33.8511 24.9239 30.1408 20.0615C29.4775 19.2101 28.297 19.2101 27.6561 20.0615Z",
    fill: "#606268"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__hover, none)"
    }
  }, /*#__PURE__*/react["createElement"]("defs", null, _linearGradient || (_linearGradient = /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__menu-faucet/gradient0",
    x1: 20,
    x2: 20,
    y1: 0,
    y2: 40,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#7288EA"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#4F6AE5"
  }))), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__menu-faucet/mask0",
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _rect3 || (_rect3 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-faucet/gradient0)",
    rx: 12
  }))), _filter || (_filter = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-faucet/filter0",
    width: 40,
    height: 46,
    x: 0,
    y: -4,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 2
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.964706 0 0 0 0 0.972549 0 0 0 0 0.996078 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect1_innerShadow_10032:194841"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.964706 0 0 0 0 0.972549 0 0 0 0 0.996078 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_innerShadow_10032:194841",
    result: "effect2_innerShadow_10032:194841"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.0941176 0 0 0 0 0.12549 0 0 0 0 0.270588 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect2_innerShadow_10032:194841",
    result: "effect3_innerShadow_10032:194841"
  }))), _filter2 || (_filter2 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-faucet/filter1",
    width: 40.307,
    height: 41.6,
    x: -3.887,
    y: 3.2,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.0941176 0 0 0 0 0.12549 0 0 0 0 0.270588 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_10032:194841"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dx: -4,
    dy: 4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.0941176 0 0 0 0 0.12549 0 0 0 0 0.270588 0 0 0 0.64 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_dropShadow_10032:194841",
    result: "effect2_dropShadow_10032:194841"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "effect2_dropShadow_10032:194841",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.309804 0 0 0 0 0.415686 0 0 0 0 0.898039 0 0 0 0.4 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect3_innerShadow_10032:194841"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect3_innerShadow_10032:194841",
    result: "effect4_innerShadow_10032:194841"
  })))), static_sprite_g || (static_sprite_g = /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__menu-faucet/mask0)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-faucet/filter0)"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-faucet/gradient0)",
    rx: 12
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-faucet/filter1)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M16.739 32.8H9.801c-1.105 0-2.04-.94-1.557-1.933a4.47 4.47 0 0 1 4.02-2.515h.023V16.286c0-5.02 4.081-9.086 9.107-9.086H22c4.598 0 8.42 3.417 9.028 7.842a1.098 1.098 0 0 1-1.09 1.244h-2.294c-.529 0-.978-.38-1.08-.896a4.643 4.643 0 0 0-4.564-3.731h-.607c-2.564 0-4.655 2.073-4.655 4.638v12.055h.034a4.446 4.446 0 0 1 4.013 2.514c.48.995-.456 1.934-1.56 1.934h-2.487Zm10.917-12.738c-3.721 4.862-2.147 7.248-.54 8.335 1.102.75 2.463.75 3.564 0 1.597-1.087 3.171-3.473-.54-8.335-.663-.852-1.843-.852-2.484 0Z",
    clipRule: "evenodd"
  })))))), /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__menu-yf",
    viewBox: "0 0 40 40",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__light, none)"
    }
  }, _rect4 || (_rect4 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#F8F8F9"
  })), _path3 || (_path3 = /*#__PURE__*/react["createElement"]("path", {
    d: "M24.3043 12.2634C24.4786 12.2001 24.6561 12.1357 24.8369 12.0688L20.0038 7.19995L15.1527 12.0688C15.3361 12.1364 15.5162 12.2014 15.6929 12.2652C17.4422 12.8969 18.8604 13.409 19.9948 15.1448C21.1304 13.4154 22.5578 12.8973 24.3043 12.2634ZM18.971 22.5163L14.862 20.9692C13.26 20.3685 12.2011 18.8305 12.1921 17.1014V13.1517L16.3011 14.6988C17.9121 15.2995 18.971 16.8466 18.971 18.5666V22.5163ZM25.1357 20.9692L21.0267 22.5163V18.5666C21.0267 16.8466 22.0856 15.2995 23.6966 14.6988L27.8056 13.1517V17.1014C27.8056 18.8305 26.7377 20.3685 25.1357 20.9692ZM26.5385 30.725L21.0267 32.7999V27.4397C21.0267 25.7197 22.0856 24.1726 23.6966 23.5719L29.2085 21.5061V26.8663C29.1994 28.5864 28.1405 30.1244 26.5385 30.725ZM13.4688 30.725L18.9806 32.7908V27.4306C18.9806 25.7106 17.9217 24.1635 16.3107 23.5628L10.7988 21.5061V26.8663C10.7988 28.5864 11.8578 30.1244 13.4688 30.725Z",
    fill: "#AAAFB3"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__dark, none)"
    }
  }, _rect5 || (_rect5 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#202529"
  })), _path4 || (_path4 = /*#__PURE__*/react["createElement"]("path", {
    d: "M24.3043 12.2634C24.4786 12.2001 24.6561 12.1357 24.8369 12.0688L20.0038 7.19995L15.1527 12.0688C15.3361 12.1364 15.5162 12.2014 15.6929 12.2652C17.4422 12.8969 18.8604 13.409 19.9948 15.1448C21.1304 13.4154 22.5578 12.8973 24.3043 12.2634ZM18.971 22.5163L14.862 20.9692C13.26 20.3685 12.2011 18.8305 12.1921 17.1014V13.1517L16.3011 14.6988C17.9121 15.2995 18.971 16.8466 18.971 18.5666V22.5163ZM25.1357 20.9692L21.0267 22.5163V18.5666C21.0267 16.8466 22.0856 15.2995 23.6966 14.6988L27.8056 13.1517V17.1014C27.8056 18.8305 26.7377 20.3685 25.1357 20.9692ZM26.5385 30.725L21.0267 32.7999V27.4397C21.0267 25.7197 22.0856 24.1726 23.6966 23.5719L29.2085 21.5061V26.8663C29.1994 28.5864 28.1405 30.1244 26.5385 30.725ZM13.4688 30.725L18.9806 32.7908V27.4306C18.9806 25.7106 17.9217 24.1635 16.3107 23.5628L10.7988 21.5061V26.8663C10.7988 28.5864 11.8578 30.1244 13.4688 30.725Z",
    fill: "#606268"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__hover, none)"
    }
  }, /*#__PURE__*/react["createElement"]("defs", null, _linearGradient2 || (_linearGradient2 = /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__menu-yf/gradient0",
    x1: 20,
    x2: 20,
    y1: 0,
    y2: 40,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#7288EA"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#4F6AE5"
  }))), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__menu-yf/mask0",
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _rect6 || (_rect6 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-yf/gradient0)",
    rx: 12
  }))), _filter3 || (_filter3 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-yf/filter0",
    width: 40,
    height: 46,
    x: 0,
    y: -4,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 2
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.964706 0 0 0 0 0.972549 0 0 0 0 0.996078 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect1_innerShadow_9892:253078"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.964706 0 0 0 0 0.972549 0 0 0 0 0.996078 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_innerShadow_9892:253078",
    result: "effect2_innerShadow_9892:253078"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.0941176 0 0 0 0 0.12549 0 0 0 0 0.270588 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect2_innerShadow_9892:253078",
    result: "effect3_innerShadow_9892:253078"
  }))), _filter4 || (_filter4 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-yf/filter1",
    width: 34.41,
    height: 41.6,
    x: -1.201,
    y: 3.2,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.0941176 0 0 0 0 0.12549 0 0 0 0 0.270588 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_9892:253078"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dx: -4,
    dy: 4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.0941176 0 0 0 0 0.12549 0 0 0 0 0.270588 0 0 0 0.64 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_dropShadow_9892:253078",
    result: "effect2_dropShadow_9892:253078"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "effect2_dropShadow_9892:253078",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.309804 0 0 0 0 0.415686 0 0 0 0 0.898039 0 0 0 0.4 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect3_innerShadow_9892:253078"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect3_innerShadow_9892:253078",
    result: "effect4_innerShadow_9892:253078"
  })))), _g2 || (_g2 = /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__menu-yf/mask0)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-yf/filter0)"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-yf/gradient0)",
    rx: 12
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-yf/filter1)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M24.304 12.263c.175-.063.352-.127.533-.194l-4.833-4.87-4.851 4.87.54.196c1.75.632 3.167 1.144 4.302 2.88 1.135-1.73 2.563-2.248 4.31-2.882Zm-5.333 10.253-4.109-1.547a4.138 4.138 0 0 1-2.67-3.868v-3.95l4.11 1.548a4.121 4.121 0 0 1 2.669 3.868v3.95Zm6.165-1.547-4.11 1.547v-3.95a4.121 4.121 0 0 1 2.67-3.867l4.11-1.547v3.95a4.125 4.125 0 0 1-2.67 3.867Zm1.402 9.756L21.027 32.8v-5.36a4.121 4.121 0 0 1 2.67-3.868l5.512-2.066v5.36a4.135 4.135 0 0 1-2.67 3.859Zm-13.07 0 5.513 2.066v-5.36a4.121 4.121 0 0 0-2.67-3.868l-5.512-2.057v5.36a4.11 4.11 0 0 0 2.67 3.859Z",
    clipRule: "evenodd"
  })))))), /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__menu-dao",
    viewBox: "0 0 40 40",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__light, none)"
    }
  }, _rect7 || (_rect7 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#F8F8F9"
  })), _path5 || (_path5 = /*#__PURE__*/react["createElement"]("path", {
    d: "M22.0436 7.8359L30.4469 13.822C31.4928 14.5658 30.9638 16.2213 29.6775 16.2213H10.4305C9.14414 16.2213 8.61518 14.5778 9.66108 13.822L18.0644 7.8359C19.2545 6.98416 20.8534 6.98416 22.0436 7.8359ZM15.1431 18.9445V25.9863C13.6043 26.0462 12.1497 26.1302 10.8152 26.2502V18.9445H15.1431ZM22.1158 25.9143V18.9445H17.7879V25.9143C18.4972 25.9023 19.2185 25.9023 19.9518 25.9023C20.6852 25.9023 21.4065 25.9023 22.1158 25.9143ZM29.0884 18.9445V26.2382C27.754 26.1302 26.2994 26.0342 24.7606 25.9743V18.9445H29.0884ZM27.0448 32.7881C29.1366 32.9201 30.9038 31.2526 30.9038 29.1652C25.506 28.4455 14.3978 28.4455 9 29.1652C9 31.2526 10.7672 32.9081 12.847 32.7881C17.1749 32.5362 22.7169 32.5362 27.0448 32.7881Z",
    fill: "#AAAFB3"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__dark, none)"
    }
  }, _rect8 || (_rect8 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#202529"
  })), _path6 || (_path6 = /*#__PURE__*/react["createElement"]("path", {
    d: "M22.0436 7.8359L30.4469 13.822C31.4928 14.5658 30.9638 16.2213 29.6775 16.2213H10.4305C9.14414 16.2213 8.61518 14.5778 9.66108 13.822L18.0644 7.8359C19.2545 6.98416 20.8534 6.98416 22.0436 7.8359ZM15.1431 18.9445V25.9863C13.6043 26.0462 12.1497 26.1302 10.8152 26.2502V18.9445H15.1431ZM22.1158 25.9143V18.9445H17.7879V25.9143C18.4972 25.9023 19.2185 25.9023 19.9518 25.9023C20.6852 25.9023 21.4065 25.9023 22.1158 25.9143ZM29.0884 18.9445V26.2382C27.754 26.1302 26.2994 26.0342 24.7606 25.9743V18.9445H29.0884ZM27.0448 32.7881C29.1366 32.9201 30.9038 31.2526 30.9038 29.1652C25.506 28.4455 14.3978 28.4455 9 29.1652C9 31.2526 10.7672 32.9081 12.847 32.7881C17.1749 32.5362 22.7169 32.5362 27.0448 32.7881Z",
    fill: "#606268"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__hover, none)"
    }
  }, /*#__PURE__*/react["createElement"]("defs", null, _linearGradient3 || (_linearGradient3 = /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__menu-dao/gradient0",
    x1: 20,
    x2: 20,
    y1: 0,
    y2: 40,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#7288EA"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#4F6AE5"
  }))), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__menu-dao/mask0",
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _rect9 || (_rect9 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-dao/gradient0)",
    rx: 12
  }))), _filter5 || (_filter5 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-dao/filter0",
    width: 40,
    height: 46,
    x: 0,
    y: -4,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 2
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.964706 0 0 0 0 0.972549 0 0 0 0 0.996078 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect1_innerShadow_9890:252913"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.964706 0 0 0 0 0.972549 0 0 0 0 0.996078 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_innerShadow_9890:252913",
    result: "effect2_innerShadow_9890:252913"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.0941176 0 0 0 0 0.12549 0 0 0 0 0.270588 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect2_innerShadow_9890:252913",
    result: "effect3_innerShadow_9890:252913"
  }))), _filter6 || (_filter6 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-dao/filter1",
    width: 38.002,
    height: 41.598,
    x: -3,
    y: 3.197,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.0941176 0 0 0 0 0.12549 0 0 0 0 0.270588 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_9890:252913"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dx: -4,
    dy: 4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.0941176 0 0 0 0 0.12549 0 0 0 0 0.270588 0 0 0 0.64 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_dropShadow_9890:252913",
    result: "effect2_dropShadow_9890:252913"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "effect2_dropShadow_9890:252913",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.309804 0 0 0 0 0.415686 0 0 0 0 0.898039 0 0 0 0.4 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect3_innerShadow_9890:252913"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect3_innerShadow_9890:252913",
    result: "effect4_innerShadow_9890:252913"
  })))), _g3 || (_g3 = /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__menu-dao/mask0)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-dao/filter0)"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-dao/gradient0)",
    rx: 12
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-dao/filter1)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m22.044 7.836 8.403 5.986c1.046.744.517 2.4-.77 2.4H10.43c-1.286 0-1.815-1.644-.769-2.4l8.403-5.986a3.418 3.418 0 0 1 3.98 0Zm-6.9 11.108v7.042a86.56 86.56 0 0 0-4.329.264v-7.306h4.328Zm6.972 6.97v-6.97h-4.328v6.97c.71-.012 1.43-.012 2.164-.012.733 0 1.454 0 2.164.012Zm6.972-6.97v7.294a103.719 103.719 0 0 0-4.327-.264v-7.03h4.327Zm-2.043 13.844a3.634 3.634 0 0 0 3.859-3.623c-5.398-.72-16.506-.72-21.904 0a3.638 3.638 0 0 0 3.847 3.623c4.328-.252 9.87-.252 14.198 0Z",
    clipRule: "evenodd"
  })))))), /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__menu-sy",
    viewBox: "0 0 40 40",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__light, none)"
    }
  }, _rect10 || (_rect10 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#F8F8F9"
  })), _path7 || (_path7 = /*#__PURE__*/react["createElement"]("path", {
    d: "M24.1554 10.433L30.3996 7.19995L29.0426 14.0675L27.4948 12.9158C27.1344 13.3068 19.5649 21.5055 9.59961 22.2874C9.59961 22.2874 19.1091 19.7939 25.6608 11.5529L24.1554 10.433ZM29.4452 17.3745V30.3699C29.4452 31.7117 28.3532 32.8 27.0068 32.8H24.7487V18.5472C25.9573 17.6386 26.9644 16.7722 27.7171 16.0855L29.4452 17.3745ZM22.3424 20.206C20.7946 21.1886 19.2256 22.0127 17.646 22.6889V32.8H22.3424V20.206ZM15.2393 23.5869C13.6703 24.0941 12.0906 24.4322 10.5428 24.6118V30.3699C10.5428 31.7117 11.6348 32.8 12.9812 32.8H15.2393V23.5869Z",
    fill: "#AAAFB3"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__dark, none)"
    }
  }, _rect11 || (_rect11 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#202529"
  })), _path8 || (_path8 = /*#__PURE__*/react["createElement"]("path", {
    d: "M24.1554 10.433L30.3996 7.19995L29.0426 14.0675L27.4948 12.9158C27.1344 13.3068 19.5649 21.5055 9.59961 22.2874C9.59961 22.2874 19.1091 19.7939 25.6608 11.5529L24.1554 10.433ZM29.4452 17.3745V30.3699C29.4452 31.7117 28.3532 32.8 27.0068 32.8H24.7487V18.5472C25.9573 17.6386 26.9644 16.7722 27.7171 16.0855L29.4452 17.3745ZM22.3424 20.206C20.7946 21.1886 19.2256 22.0127 17.646 22.6889V32.8H22.3424V20.206ZM15.2393 23.5869C13.6703 24.0941 12.0906 24.4322 10.5428 24.6118V30.3699C10.5428 31.7117 11.6348 32.8 12.9812 32.8H15.2393V23.5869Z",
    fill: "#606268"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__hover, none)"
    }
  }, /*#__PURE__*/react["createElement"]("defs", null, _linearGradient4 || (_linearGradient4 = /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__menu-sa/gradient0",
    x1: 20,
    x2: 20,
    y1: 0,
    y2: 40,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#FF6961"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#FF4339"
  }))), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__menu-sa/mask0",
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _rect12 || (_rect12 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-sa/gradient0)",
    rx: 12
  }))), _filter7 || (_filter7 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-sa/filter0",
    width: 40,
    height: 46,
    x: 0,
    y: -4,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 2
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect1_innerShadow_9892:253112"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_innerShadow_9892:253112",
    result: "effect2_innerShadow_9892:253112"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect2_innerShadow_9892:253112",
    result: "effect3_innerShadow_9892:253112"
  }))), _filter8 || (_filter8 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-sa/filter1",
    width: 36.801,
    height: 41.6,
    x: -2.4,
    y: 3.2,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_9892:253112"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dx: -4,
    dy: 4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.64 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_dropShadow_9892:253112",
    result: "effect2_dropShadow_9892:253112"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "effect2_dropShadow_9892:253112",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.262745 0 0 0 0 0.223529 0 0 0 0.4 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect3_innerShadow_9892:253112"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect3_innerShadow_9892:253112",
    result: "effect4_innerShadow_9892:253112"
  })))), _g4 || (_g4 = /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__menu-sa/mask0)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-sa/filter0)"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-sa/gradient0)",
    rx: 12
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-sa/filter1)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M24.155 10.433 30.4 7.2l-1.357 6.868-1.548-1.152c-.36.39-7.93 8.59-17.895 9.371 0 0 9.51-2.493 16.06-10.734l-1.505-1.12Zm5.29 6.942V30.37a2.435 2.435 0 0 1-2.438 2.43h-2.258V18.547a40.879 40.879 0 0 0 2.968-2.462l1.728 1.29Zm-7.103 2.831a32.967 32.967 0 0 1-4.696 2.483V32.8h4.696V20.206Zm-7.103 3.38a24.464 24.464 0 0 1-4.696 1.026v5.758a2.435 2.435 0 0 0 2.438 2.43h2.258v-9.213Z",
    clipRule: "evenodd"
  })))))), /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__menu-sa",
    viewBox: "0 0 40 40",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__light, none)"
    }
  }, _rect13 || (_rect13 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#F8F8F9"
  })), _path9 || (_path9 = /*#__PURE__*/react["createElement"]("path", {
    d: "M29.3748 25.4749L27.9646 22.4816C27.2415 23.9509 26.3375 26.132 25.2618 27.3549C26.8347 29.4722 29.5646 29.7734 32.8008 28.7786C31.255 28.2311 30.0528 26.9351 29.3748 25.4749ZM29.5375 11.3019C27.0968 10.8274 25.09 12.534 24.3759 14.7973C23.6708 16.4035 21.89 20.4373 21.2211 21.9796H21.2302C19.2053 27.1268 11.2234 25.4293 11.5398 19.7893C11.6121 15.8285 16.5206 13.5014 19.585 15.9472C20.1364 16.367 20.6064 16.8963 20.9409 17.4986L22.8934 13.0542C17.4607 7.68796 7.48101 11.6944 7.2279 19.4151C6.47762 29.6091 20.6607 33.3783 24.9002 24.1151C26.2652 21.505 29.2573 14.3957 30.5138 11.6122C30.1974 11.4662 29.872 11.3658 29.5375 11.3019Z",
    fill: "#AAAFB3"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__dark, none)"
    }
  }, _rect14 || (_rect14 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#202529"
  })), _path10 || (_path10 = /*#__PURE__*/react["createElement"]("path", {
    d: "M29.3748 25.4749L27.9646 22.4816C27.2415 23.9509 26.3375 26.132 25.2618 27.3549C26.8347 29.4722 29.5646 29.7734 32.8008 28.7786C31.255 28.2311 30.0528 26.9351 29.3748 25.4749ZM29.5375 11.3019C27.0968 10.8274 25.09 12.534 24.3759 14.7973C23.6708 16.4035 21.89 20.4373 21.2211 21.9796H21.2302C19.2053 27.1268 11.2234 25.4293 11.5398 19.7893C11.6121 15.8285 16.5206 13.5014 19.585 15.9472C20.1364 16.367 20.6064 16.8963 20.9409 17.4986L22.8934 13.0542C17.4607 7.68796 7.48101 11.6944 7.2279 19.4151C6.47762 29.6091 20.6607 33.3783 24.9002 24.1151C26.2652 21.505 29.2573 14.3957 30.5138 11.6122C30.1974 11.4662 29.872 11.3658 29.5375 11.3019Z",
    fill: "#606268"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__hover, none)"
    }
  }, /*#__PURE__*/react["createElement"]("defs", null, _linearGradient5 || (_linearGradient5 = /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__menu-sa/gradient0",
    x1: 20,
    x2: 20,
    y1: 0,
    y2: 40,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#FF6961"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#FF4339"
  }))), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__menu-sa/mask0",
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _rect15 || (_rect15 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-sa/gradient0)",
    rx: 12
  }))), _filter9 || (_filter9 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-sa/filter0",
    width: 40,
    height: 46,
    x: 0,
    y: -4,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 2
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect1_innerShadow_9893:192905"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_innerShadow_9893:192905",
    result: "effect2_innerShadow_9893:192905"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect2_innerShadow_9893:192905",
    result: "effect3_innerShadow_9893:192905"
  }))), _filter10 || (_filter10 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-sa/filter1",
    width: 41.602,
    height: 34.803,
    x: -4.801,
    y: 6.596,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_9893:192905"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dx: -4,
    dy: 4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.64 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_dropShadow_9893:192905",
    result: "effect2_dropShadow_9893:192905"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "effect2_dropShadow_9893:192905",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.262745 0 0 0 0 0.223529 0 0 0 0.4 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect3_innerShadow_9893:192905"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect3_innerShadow_9893:192905",
    result: "effect4_innerShadow_9893:192905"
  })))), _g5 || (_g5 = /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__menu-sa/mask0)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-sa/filter0)"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-sa/gradient0)",
    rx: 12
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-sa/filter1)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "m29.375 25.475-1.41-2.993c-.724 1.469-1.628 3.65-2.703 4.873 1.573 2.117 4.303 2.418 7.539 1.424-1.546-.548-2.748-1.844-3.426-3.304Zm.163-14.173c-2.441-.475-4.448 1.232-5.162 3.495-.705 1.607-2.486 5.64-3.155 7.183h.01c-2.026 5.147-10.008 3.45-9.691-2.19.072-3.961 4.98-6.289 8.045-3.843.551.42 1.021.95 1.356 1.552l1.952-4.445c-5.432-5.366-15.412-1.36-15.665 6.361-.75 10.194 13.433 13.963 17.672 4.7 1.365-2.61 4.357-9.72 5.614-12.503a4.194 4.194 0 0 0-.976-.31Z"
  })))))), /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__menu-se",
    viewBox: "0 0 40 40",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__light, none)"
    }
  }, _rect16 || (_rect16 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#F8F8F9"
  })), _path11 || (_path11 = /*#__PURE__*/react["createElement"]("path", {
    d: "M15.0681 26.4109L11.6888 29.8017C13.6338 31.4589 16.0677 32.5383 18.7407 32.7999V27.9918C17.3825 27.7846 16.1221 27.2286 15.0681 26.4109ZM21.2073 7.19995V12.0081C25.0755 12.5969 28.0419 15.955 28.0419 20C28.0419 24.0449 25.0755 27.403 21.2073 27.9918V32.7999C27.7051 32.1785 32.7903 26.6834 32.7903 20C32.7903 13.3165 27.7159 7.82142 21.2073 7.19995ZM7.2555 18.5063H12.0582C12.6776 15.1482 15.3723 12.5206 18.7516 12.0081V7.19995C12.7428 7.7778 7.94005 12.5097 7.2555 18.5063ZM11.9713 20.9812H7.20117C7.39676 23.6415 8.40728 26.0729 9.97197 28.0354L13.3621 24.6337C12.6232 23.5652 12.1343 22.3223 11.9713 20.9812Z",
    fill: "#AAAFB3"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__dark, none)"
    }
  }, _rect17 || (_rect17 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#202529"
  })), _path12 || (_path12 = /*#__PURE__*/react["createElement"]("path", {
    d: "M15.0681 26.4109L11.6888 29.8017C13.6338 31.4589 16.0677 32.5383 18.7407 32.7999V27.9918C17.3825 27.7846 16.1221 27.2286 15.0681 26.4109ZM21.2073 7.19995V12.0081C25.0755 12.5969 28.0419 15.955 28.0419 20C28.0419 24.0449 25.0755 27.403 21.2073 27.9918V32.7999C27.7051 32.1785 32.7903 26.6834 32.7903 20C32.7903 13.3165 27.7159 7.82142 21.2073 7.19995ZM7.2555 18.5063H12.0582C12.6776 15.1482 15.3723 12.5206 18.7516 12.0081V7.19995C12.7428 7.7778 7.94005 12.5097 7.2555 18.5063ZM11.9713 20.9812H7.20117C7.39676 23.6415 8.40728 26.0729 9.97197 28.0354L13.3621 24.6337C12.6232 23.5652 12.1343 22.3223 11.9713 20.9812Z",
    fill: "#606268"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__hover, none)"
    }
  }, /*#__PURE__*/react["createElement"]("defs", null, _linearGradient6 || (_linearGradient6 = /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__menu-se/gradient0",
    x1: 20,
    x2: 20,
    y1: 0,
    y2: 40,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#FF6961"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#FF4339"
  }))), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__menu-se/mask0",
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _rect18 || (_rect18 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-se/gradient0)",
    rx: 12
  }))), _filter11 || (_filter11 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-se/filter0",
    width: 40,
    height: 46,
    x: 0,
    y: -4,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 2
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect1_innerShadow_9893:192910"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_innerShadow_9893:192910",
    result: "effect2_innerShadow_9893:192910"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect2_innerShadow_9893:192910",
    result: "effect3_innerShadow_9893:192910"
  }))), _filter12 || (_filter12 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-se/filter1",
    width: 41.59,
    height: 41.6,
    x: -4.799,
    y: 3.2,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_9893:192910"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dx: -4,
    dy: 4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.64 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_dropShadow_9893:192910",
    result: "effect2_dropShadow_9893:192910"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "effect2_dropShadow_9893:192910",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.262745 0 0 0 0 0.223529 0 0 0 0.4 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect3_innerShadow_9893:192910"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect3_innerShadow_9893:192910",
    result: "effect4_innerShadow_9893:192910"
  })))), _g6 || (_g6 = /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__menu-se/mask0)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-se/filter0)"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-se/gradient0)",
    rx: 12
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-se/filter1)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "m15.068 26.41-3.38 3.392a12.766 12.766 0 0 0 7.053 2.998v-4.808a7.952 7.952 0 0 1-3.673-1.581Zm6.14-19.21v4.808c3.868.589 6.834 3.947 6.834 7.992s-2.966 7.403-6.835 7.992V32.8c6.498-.621 11.583-6.117 11.583-12.8 0-6.684-5.074-12.179-11.583-12.8ZM7.255 18.506h4.802c.62-3.358 3.314-5.985 6.694-6.498V7.2c-6.01.578-10.812 5.31-11.496 11.306Zm4.715 2.475h-4.77a12.803 12.803 0 0 0 2.771 7.054l3.39-3.401a8.134 8.134 0 0 1-1.39-3.653Z"
  })))))), /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__menu-docs",
    viewBox: "0 0 40 40",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__light, none)"
    }
  }, _rect19 || (_rect19 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#F8F8F9"
  })), _path13 || (_path13 = /*#__PURE__*/react["createElement"]("path", {
    d: "M31.4016 27.7204V17.2201C31.4016 15.8807 30.8771 14.5919 29.9282 13.6442L25.0335 8.67833C24.0846 7.73065 22.811 7.19995 21.4874 7.19995H13.6086C10.8491 7.19995 8.60156 9.47438 8.60156 12.2669V27.733C8.60156 30.5255 10.8491 32.7999 13.6086 32.7873H26.3946C29.154 32.7873 31.4016 30.5255 31.4016 27.7204ZM21.5638 17.9909H26.5833C27.32 17.9909 27.6821 17.0938 27.1577 16.5631L22.1382 11.4835C21.6262 10.9655 20.7397 11.3319 20.7397 12.0774V17.157C20.7397 17.6245 21.1143 17.9909 21.5638 17.9909Z",
    fill: "#AAAFB3",
    fillRule: "evenodd"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__dark, none)"
    }
  }, _rect20 || (_rect20 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#202529"
  })), _path14 || (_path14 = /*#__PURE__*/react["createElement"]("path", {
    d: "M31.4016 27.7204V17.2201C31.4016 15.8807 30.8771 14.5919 29.9282 13.6442L25.0335 8.67833C24.0846 7.73065 22.811 7.19995 21.4874 7.19995H13.6086C10.8491 7.19995 8.60156 9.47438 8.60156 12.2669V27.733C8.60156 30.5255 10.8491 32.7999 13.6086 32.7873H26.3946C29.154 32.7873 31.4016 30.5255 31.4016 27.7204ZM21.5638 17.9909H26.5833C27.32 17.9909 27.6821 17.0938 27.1577 16.5631L22.1382 11.4835C21.6262 10.9655 20.7397 11.3319 20.7397 12.0774V17.157C20.7397 17.6245 21.1143 17.9909 21.5638 17.9909Z",
    fill: "#606268",
    fillRule: "evenodd"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__hover, none)"
    }
  }, /*#__PURE__*/react["createElement"]("defs", null, _linearGradient7 || (_linearGradient7 = /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__menu-docs/gradient0",
    x1: 20,
    x2: 20,
    y1: 0,
    y2: 40,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#B58BE9"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#A26EE3"
  }))), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__menu-docs/mask0",
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _rect21 || (_rect21 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "#fff",
    rx: 12
  }))), _filter13 || (_filter13 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-docs/filter0",
    width: 40,
    height: 46,
    x: 0,
    y: -4,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 2
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect1_innerShadow_9893:192920"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_innerShadow_9893:192920",
    result: "effect2_innerShadow_9893:192920"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect2_innerShadow_9893:192920",
    result: "effect3_innerShadow_9893:192920"
  }))), _filter14 || (_filter14 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-docs/filter1",
    width: 38.801,
    height: 41.587,
    x: -3.398,
    y: 3.2,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.192157 0 0 0 0 0.129412 0 0 0 0 0.266667 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_9893:192920"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dx: -4,
    dy: 4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.192157 0 0 0 0 0.129412 0 0 0 0 0.266667 0 0 0 0.64 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_dropShadow_9893:192920",
    result: "effect2_dropShadow_9893:192920"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "effect2_dropShadow_9893:192920",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.635294 0 0 0 0 0.431373 0 0 0 0 0.890196 0 0 0 0.4 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect3_innerShadow_9893:192920"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect3_innerShadow_9893:192920",
    result: "effect4_innerShadow_9893:192920"
  })))), _g7 || (_g7 = /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__menu-docs/mask0)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-docs/filter0)"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-docs/gradient0)",
    rx: 12
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-docs/filter1)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M31.402 27.72v-10.5a5.05 5.05 0 0 0-1.474-3.576l-4.895-4.966A5.02 5.02 0 0 0 21.488 7.2H13.61c-2.76 0-5.007 2.274-5.007 5.067v15.466c0 2.793 2.247 5.067 5.007 5.054h12.786c2.759 0 5.007-2.261 5.007-5.067Zm-9.838-9.73h5.02c.736 0 1.098-.896.574-1.427l-5.02-5.08c-.512-.518-1.398-.151-1.398.594v5.08c0 .468.374.834.824.834Z",
    clipRule: "evenodd"
  })))))), /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__menu-theme-light",
    viewBox: "0 0 40 40",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__light, none)"
    }
  }, _rect22 || (_rect22 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#F8F8F9"
  })), _path15 || (_path15 = /*#__PURE__*/react["createElement"]("path", {
    d: "M19.9992 12.0971C19.12 12.0971 18.4043 11.3814 18.4043 10.5022V8.79484C18.4043 7.91561 19.12 7.19995 19.9992 7.19995C20.8784 7.19995 21.5941 7.91561 21.5941 8.79484V10.492C21.5941 11.3814 20.8784 12.0971 19.9992 12.0971ZM19.9994 25.5923C23.0879 25.5923 25.5917 23.0885 25.5917 20C25.5917 16.9114 23.0879 14.4076 19.9994 14.4076C16.9108 14.4076 14.407 16.9114 14.407 20C14.407 23.0885 16.9108 25.5923 19.9994 25.5923ZM21.5941 29.5079C21.5941 28.6287 20.8784 27.913 19.9992 27.913C19.12 27.913 18.4043 28.6287 18.4043 29.5079V31.2051C18.4043 32.0843 19.12 32.7999 19.9992 32.7999C20.8784 32.7999 21.5941 32.0843 21.5941 31.2051V29.5079ZM25.5916 14.4076C24.9679 13.784 24.9679 12.7718 25.5916 12.1482L26.798 10.9418C27.4216 10.3182 28.4337 10.3182 29.0574 10.9418C29.681 11.5654 29.681 12.5776 29.0574 13.2012L27.851 14.4076C27.2273 15.0313 26.2152 15.0313 25.5916 14.4076ZM14.407 27.8517C15.0306 27.2281 15.0306 26.2159 14.407 25.5923C13.7833 24.9687 12.7712 24.9687 12.1476 25.5923L10.9412 26.7987C10.3175 27.4223 10.3175 28.4345 10.9412 29.0581C11.5648 29.6817 12.577 29.6817 13.2006 29.0581L14.407 27.8517ZM27.9125 20C27.9125 19.1207 28.6282 18.4051 29.5074 18.4051H31.2045C32.0837 18.4051 32.7994 19.1207 32.7994 20C32.7994 20.8792 32.0837 21.5949 31.2045 21.5949H29.5074C28.6282 21.5949 27.9125 20.8792 27.9125 20ZM10.5015 21.5949C11.3807 21.5949 12.0963 20.8792 12.0963 20C12.0963 19.1207 11.3807 18.4051 10.4912 18.4051H8.79411C7.91487 18.4051 7.19922 19.1207 7.19922 20C7.19922 20.8792 7.91487 21.5949 8.79411 21.5949H10.5015ZM25.5916 25.5923C26.2152 24.9687 27.2273 24.9687 27.851 25.5923L29.0574 26.7987C29.681 27.4223 29.681 28.4345 29.0574 29.0581C28.4337 29.6817 27.4216 29.6817 26.798 29.0581L25.5916 27.8517C24.9679 27.2281 24.9679 26.2159 25.5916 25.5923ZM12.1475 14.4076C12.7711 15.0312 13.7833 15.0312 14.4069 14.4076C15.0306 13.784 15.0306 12.7718 14.4171 12.1584L13.2108 10.952C12.5871 10.3284 11.575 10.3284 10.9513 10.952C10.3277 11.5757 10.3277 12.5878 10.9513 13.2114L12.1475 14.4076Z",
    fill: "#AAAFB3"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__hover, none)"
    }
  }, /*#__PURE__*/react["createElement"]("defs", null, _linearGradient8 || (_linearGradient8 = /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__menu-theme-light/gradient0",
    x1: 20,
    x2: 20,
    y1: 0,
    y2: 40,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#B58BE9"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#A26EE3"
  }))), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__menu-theme-light/mask0",
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _rect23 || (_rect23 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-theme-light/gradient0)",
    rx: 12
  }))), _filter15 || (_filter15 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-theme-light/filter0",
    width: 40,
    height: 46,
    x: 0,
    y: -4,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 2
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect1_innerShadow_9910:192959"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_innerShadow_9910:192959",
    result: "effect2_innerShadow_9910:192959"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect2_innerShadow_9910:192959",
    result: "effect3_innerShadow_9910:192959"
  }))), _filter16 || (_filter16 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-theme-light/filter1",
    width: 41.6,
    height: 41.6,
    x: -4.801,
    y: 3.2,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.192157 0 0 0 0 0.129412 0 0 0 0 0.266667 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_9910:192959"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dx: -4,
    dy: 4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.192157 0 0 0 0 0.129412 0 0 0 0 0.266667 0 0 0 0.64 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_dropShadow_9910:192959",
    result: "effect2_dropShadow_9910:192959"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "effect2_dropShadow_9910:192959",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.635294 0 0 0 0 0.431373 0 0 0 0 0.890196 0 0 0 0.4 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect3_innerShadow_9910:192959"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect3_innerShadow_9910:192959",
    result: "effect4_innerShadow_9910:192959"
  })))), _g8 || (_g8 = /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__menu-theme-light/mask0)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-theme-light/filter0)"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-theme-light/gradient0)",
    rx: 12
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-theme-light/filter1)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M20 12.097c-.88 0-1.596-.716-1.596-1.595V8.795c0-.88.716-1.595 1.595-1.595.88 0 1.595.716 1.595 1.595v1.697A1.6 1.6 0 0 1 20 12.097Zm0 13.495a5.592 5.592 0 1 0 0-11.184 5.592 5.592 0 0 0 0 11.184Zm1.594 3.916c0-.88-.716-1.595-1.595-1.595s-1.595.716-1.595 1.595v1.697c0 .88.716 1.595 1.595 1.595.88 0 1.595-.716 1.595-1.595v-1.697Zm3.998-15.1a1.598 1.598 0 0 1 0-2.26l1.206-1.206a1.598 1.598 0 0 1 2.26 2.26l-1.207 1.206a1.598 1.598 0 0 1-2.26 0ZM14.407 27.852a1.598 1.598 0 0 0-2.26-2.26L10.942 26.8a1.598 1.598 0 0 0 2.26 2.26l1.206-1.207ZM27.913 20c0-.88.715-1.595 1.594-1.595h1.697c.88 0 1.595.716 1.595 1.595 0 .88-.715 1.595-1.595 1.595h-1.697c-.879 0-1.595-.716-1.595-1.595ZM10.5 21.595c.88 0 1.595-.716 1.595-1.595a1.6 1.6 0 0 0-1.605-1.595H8.794c-.88 0-1.595.716-1.595 1.595 0 .88.716 1.595 1.595 1.595h1.707Zm15.09 3.997a1.598 1.598 0 0 1 2.26 0l1.206 1.207a1.598 1.598 0 0 1-2.259 2.26l-1.206-1.207a1.598 1.598 0 0 1 0-2.26ZM12.148 14.408a1.598 1.598 0 0 0 2.27-2.25l-1.206-1.206a1.598 1.598 0 0 0-2.26 2.26l1.197 1.196Z",
    clipRule: "evenodd"
  })))))), /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__menu-theme-dark",
    viewBox: "0 0 40 40",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__dark, none)"
    }
  }, _rect24 || (_rect24 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#202529"
  })), _path16 || (_path16 = /*#__PURE__*/react["createElement"]("path", {
    d: "M31.2325 24.375C29.4325 27.977 25.6881 30.445 21.377 30.4005C15.3547 30.3338 10.4992 25.3311 10.5992 19.3168C10.677 15.1034 13.1325 11.4682 16.6881 9.72278C17.5658 9.28922 18.5325 10.0896 18.2992 11.0346C18.1103 11.7906 18.0103 12.591 18.0214 13.4025C18.077 18.4385 22.2325 22.5296 27.2658 22.5185C28.0436 22.5185 28.7992 22.4184 29.5214 22.2406C30.777 21.9293 31.8103 23.2189 31.2325 24.375Z",
    fill: "#606268"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__hover, none)"
    }
  }, /*#__PURE__*/react["createElement"]("defs", null, _linearGradient9 || (_linearGradient9 = /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__menu-theme-dark/gradient0",
    x1: 20,
    x2: 20,
    y1: 0,
    y2: 40,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#B58BE9"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#A26EE3"
  }))), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__menu-theme-dark/mask0",
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _rect25 || (_rect25 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-theme-dark/gradient0)",
    rx: 12
  }))), _filter17 || (_filter17 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-theme-dark/filter0",
    width: 40,
    height: 46,
    x: 0,
    y: -4,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 2
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect1_innerShadow_9910:192990"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_innerShadow_9910:192990",
    result: "effect2_innerShadow_9910:192990"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect2_innerShadow_9910:192990",
    result: "effect3_innerShadow_9910:192990"
  }))), _filter18 || (_filter18 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-theme-dark/filter1",
    width: 36.799,
    height: 36.799,
    x: -1.402,
    y: 5.602,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.192157 0 0 0 0 0.129412 0 0 0 0 0.266667 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_9910:192990"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dx: -4,
    dy: 4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.192157 0 0 0 0 0.129412 0 0 0 0 0.266667 0 0 0 0.64 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_dropShadow_9910:192990",
    result: "effect2_dropShadow_9910:192990"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "effect2_dropShadow_9910:192990",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.635294 0 0 0 0 0.431373 0 0 0 0 0.890196 0 0 0 0.4 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect3_innerShadow_9910:192990"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect3_innerShadow_9910:192990",
    result: "effect4_innerShadow_9910:192990"
  })))), _g9 || (_g9 = /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__menu-theme-dark/mask0)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-theme-dark/filter0)"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-theme-dark/gradient0)",
    rx: 12
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-theme-dark/filter1)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M31.233 24.375a10.888 10.888 0 0 1-9.856 6.026c-6.022-.067-10.878-5.07-10.778-11.084a10.903 10.903 0 0 1 6.09-9.594c.877-.434 1.843.367 1.61 1.312a9.275 9.275 0 0 0-.278 2.367c.056 5.037 4.212 9.128 9.245 9.117.778 0 1.533-.1 2.255-.278 1.256-.312 2.29.978 1.712 2.134Z"
  })))))), /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__menu-theme-auto",
    viewBox: "0 0 40 40",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__light, none)"
    }
  }, _rect26 || (_rect26 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#F8F8F9"
  })), _path17 || (_path17 = /*#__PURE__*/react["createElement"]("path", {
    d: "M19.9999 11.9736C19.107 11.9736 18.3801 11.2468 18.3801 10.3538V8.61981C18.3801 7.72684 19.107 7 19.9999 7C20.8929 7 21.6198 7.72684 21.6198 8.61981V10.3435C21.6198 11.2468 20.8929 11.9736 19.9999 11.9736ZM19.9999 28.0367C20.8929 28.0367 21.6198 28.7636 21.6198 29.6565V31.3802C21.6198 32.2731 20.8929 33 19.9999 33C19.107 33 18.3801 32.2731 18.3801 31.3802V29.6565C18.3801 28.7636 19.107 28.0367 19.9999 28.0367ZM25.6797 12.0256C25.0464 12.6589 25.0464 13.6869 25.6797 14.3203C26.3131 14.9537 27.3411 14.9537 27.9745 14.3203L29.1997 13.095C29.8331 12.4617 29.8331 11.4337 29.1997 10.8003C28.5663 10.1669 27.5384 10.1669 26.905 10.8003L25.6797 12.0256ZM14.3204 25.6797C14.9538 26.3131 14.9538 27.3411 14.3204 27.9745L13.0952 29.1997C12.4618 29.8331 11.4338 29.8331 10.8004 29.1997C10.167 28.5663 10.167 27.5384 10.8004 26.905L12.0257 25.6797C12.659 25.0463 13.687 25.0463 14.3204 25.6797ZM29.6567 18.3802C28.7638 18.3802 28.0369 19.107 28.0369 20C28.0369 20.8929 28.7638 21.6198 29.6567 21.6198H31.3804C32.2734 21.6198 33.0002 20.8929 33.0002 20C33.0002 19.107 32.2734 18.3802 31.3804 18.3802H29.6567ZM11.9736 20C11.9736 20.8929 11.2468 21.6198 10.3538 21.6198H8.61981C7.72684 21.6198 7 20.8929 7 20C7 19.107 7.72684 18.3802 8.61981 18.3802H10.3435C11.2468 18.3802 11.9736 19.107 11.9736 20ZM27.9745 25.6797C27.3411 25.0463 26.3131 25.0463 25.6797 25.6797C25.0464 26.3131 25.0464 27.3411 25.6797 27.9745L26.905 29.1997C27.5384 29.8331 28.5663 29.8331 29.1997 29.1997C29.8331 28.5663 29.8331 27.5384 29.1997 26.905L27.9745 25.6797ZM14.3203 14.3203C13.6869 14.9537 12.6589 14.9537 12.0256 14.3203L10.8107 13.1054C10.1773 12.472 10.1773 11.4441 10.8107 10.8107C11.4441 10.1773 12.472 10.1773 13.1054 10.8107L14.3307 12.0359C14.9537 12.6589 14.9537 13.6869 14.3203 14.3203ZM14.3205 20C14.3205 16.8642 16.8644 14.3203 20.0002 14.3203C23.136 14.3203 25.6799 16.8642 25.6799 20C25.6799 23.1358 23.136 25.6797 20.0002 25.6797C16.8644 25.6797 14.3205 23.1358 14.3205 20ZM16.8644 20.0104C16.8644 21.7444 18.2661 23.1462 20.0002 23.1462V16.8642C18.2661 16.8642 16.8644 18.2764 16.8644 20.0104Z",
    fill: "#AAAFB3"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__dark, none)"
    }
  }, _rect27 || (_rect27 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    rx: 12,
    fill: "#202529"
  })), _path18 || (_path18 = /*#__PURE__*/react["createElement"]("path", {
    d: "M19.9999 11.9736C19.107 11.9736 18.3801 11.2468 18.3801 10.3538V8.61981C18.3801 7.72684 19.107 7 19.9999 7C20.8929 7 21.6198 7.72684 21.6198 8.61981V10.3435C21.6198 11.2468 20.8929 11.9736 19.9999 11.9736ZM19.9999 28.0367C20.8929 28.0367 21.6198 28.7636 21.6198 29.6565V31.3802C21.6198 32.2731 20.8929 33 19.9999 33C19.107 33 18.3801 32.2731 18.3801 31.3802V29.6565C18.3801 28.7636 19.107 28.0367 19.9999 28.0367ZM25.6797 12.0256C25.0464 12.6589 25.0464 13.6869 25.6797 14.3203C26.3131 14.9537 27.3411 14.9537 27.9745 14.3203L29.1997 13.095C29.8331 12.4617 29.8331 11.4337 29.1997 10.8003C28.5663 10.1669 27.5384 10.1669 26.905 10.8003L25.6797 12.0256ZM14.3204 25.6797C14.9538 26.3131 14.9538 27.3411 14.3204 27.9745L13.0952 29.1997C12.4618 29.8331 11.4338 29.8331 10.8004 29.1997C10.167 28.5663 10.167 27.5384 10.8004 26.905L12.0257 25.6797C12.6591 25.0463 13.687 25.0463 14.3204 25.6797ZM29.6567 18.3802C28.7638 18.3802 28.0369 19.107 28.0369 20C28.0369 20.8929 28.7638 21.6198 29.6567 21.6198H31.3804C32.2734 21.6198 33.0002 20.8929 33.0002 20C33.0002 19.107 32.2734 18.3802 31.3804 18.3802H29.6567ZM11.9736 20C11.9736 20.8929 11.2468 21.6198 10.3538 21.6198H8.61981C7.72684 21.6198 7 20.8929 7 20C7 19.107 7.72684 18.3802 8.61981 18.3802H10.3435C11.2468 18.3802 11.9736 19.107 11.9736 20ZM27.9745 25.6797C27.3411 25.0463 26.3131 25.0463 25.6797 25.6797C25.0464 26.3131 25.0464 27.3411 25.6797 27.9745L26.905 29.1997C27.5384 29.8331 28.5663 29.8331 29.1997 29.1997C29.8331 28.5663 29.8331 27.5384 29.1997 26.905L27.9745 25.6797ZM14.3203 14.3203C13.6869 14.9537 12.6589 14.9537 12.0256 14.3203L10.8107 13.1054C10.1773 12.472 10.1773 11.4441 10.8107 10.8107C11.4441 10.1773 12.472 10.1773 13.1054 10.8107L14.3307 12.0359C14.9537 12.6589 14.9537 13.6869 14.3203 14.3203ZM14.3205 20C14.3205 16.8642 16.8644 14.3203 20.0002 14.3203C23.136 14.3203 25.6799 16.8642 25.6799 20C25.6799 23.1358 23.136 25.6797 20.0002 25.6797C16.8644 25.6797 14.3205 23.1358 14.3205 20ZM16.8644 20.0104C16.8644 21.7444 18.2661 23.1462 20.0002 23.1462V16.8642C18.2661 16.8642 16.8644 18.2764 16.8644 20.0104Z",
    fill: "#606268"
  }))), /*#__PURE__*/react["createElement"]("g", {
    display: "none",
    style: {
      display: "var(--icon-display__hover, none)"
    }
  }, /*#__PURE__*/react["createElement"]("defs", null, _linearGradient10 || (_linearGradient10 = /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__menu-theme-auto/gradient0",
    x1: 20,
    x2: 20,
    y1: 0,
    y2: 40,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#B58BE9"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#A26EE3"
  }))), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__menu-theme-auto/mask0",
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _rect28 || (_rect28 = /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-theme-auto/gradient0)",
    rx: 12
  }))), _filter19 || (_filter19 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-theme-auto/filter0",
    width: 40,
    height: 46,
    x: 0,
    y: -4,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 2
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect1_innerShadow_9894:192933"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_innerShadow_9894:192933",
    result: "effect2_innerShadow_9894:192933"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.301961 0 0 0 0 0.0784314 0 0 0 0 0.0666667 0 0 0 0.16 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect2_innerShadow_9894:192933",
    result: "effect3_innerShadow_9894:192933"
  }))), _filter20 || (_filter20 = /*#__PURE__*/react["createElement"]("filter", {
    id: "icon__menu-theme-auto/filter1",
    width: 42,
    height: 42,
    x: -5,
    y: 3,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: 1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.192157 0 0 0 0 0.129412 0 0 0 0 0.266667 0 0 0 0.32 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_9894:192933"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dx: -4,
    dy: 4
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 4
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.192157 0 0 0 0 0.129412 0 0 0 0 0.266667 0 0 0 0.64 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect1_dropShadow_9894:192933",
    result: "effect2_dropShadow_9894:192933"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in: "SourceGraphic",
    in2: "effect2_dropShadow_9894:192933",
    result: "shape"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 1.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 0.635294 0 0 0 0 0.431373 0 0 0 0 0.890196 0 0 0 0.4 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "shape",
    result: "effect3_innerShadow_9894:192933"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    in: "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feOffset", {
    dy: -1
  }), /*#__PURE__*/react["createElement"]("feGaussianBlur", {
    stdDeviation: 0.5
  }), /*#__PURE__*/react["createElement"]("feComposite", {
    in2: "hardAlpha",
    k2: -1,
    k3: 1,
    operator: "arithmetic"
  }), /*#__PURE__*/react["createElement"]("feColorMatrix", {
    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/react["createElement"]("feBlend", {
    in2: "effect3_innerShadow_9894:192933",
    result: "effect4_innerShadow_9894:192933"
  })))), _g10 || (_g10 = /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__menu-theme-auto/mask0)"
  }, /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-theme-auto/filter0)"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "url(#icon__menu-theme-auto/gradient0)",
    rx: 12
  })), /*#__PURE__*/react["createElement"]("g", {
    filter: "url(#icon__menu-theme-auto/filter1)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M20 11.974c-.893 0-1.62-.727-1.62-1.62V8.62c0-.893.727-1.62 1.62-1.62.893 0 1.62.727 1.62 1.62v1.724c0 .903-.727 1.63-1.62 1.63Zm0 16.063c.893 0 1.62.727 1.62 1.62v1.723c0 .893-.727 1.62-1.62 1.62-.893 0-1.62-.727-1.62-1.62v-1.723c0-.893.727-1.62 1.62-1.62Zm5.68-16.011a1.623 1.623 0 0 0 2.294 2.294l1.226-1.225a1.623 1.623 0 0 0-2.295-2.295l-1.225 1.226ZM14.32 25.68a1.623 1.623 0 0 1 0 2.294L13.095 29.2a1.623 1.623 0 0 1-2.295-2.295l1.226-1.225a1.623 1.623 0 0 1 2.294 0Zm15.337-7.3c-.893 0-1.62.727-1.62 1.62 0 .893.727 1.62 1.62 1.62h1.723c.893 0 1.62-.727 1.62-1.62 0-.893-.727-1.62-1.62-1.62h-1.723ZM11.974 20c0 .893-.727 1.62-1.62 1.62H8.62C7.727 21.62 7 20.893 7 20c0-.893.727-1.62 1.62-1.62h1.724c.903 0 1.63.727 1.63 1.62Zm16 5.68a1.623 1.623 0 0 0-2.294 2.294l1.225 1.226a1.623 1.623 0 0 0 2.295-2.295l-1.226-1.225ZM14.32 14.32a1.623 1.623 0 0 1-2.294 0l-1.215-1.215a1.623 1.623 0 0 1 2.294-2.294l1.226 1.225a1.62 1.62 0 0 1-.01 2.284Zm0 5.68A5.681 5.681 0 0 1 20 14.32 5.681 5.681 0 0 1 25.68 20 5.681 5.681 0 0 1 20 25.68 5.681 5.681 0 0 1 14.32 20Zm2.544.01A3.133 3.133 0 0 0 20 23.146v-6.282a3.142 3.142 0 0 0-3.136 3.146Z",
    clipRule: "evenodd"
  })))))));
}

var static_sprite_ForwardRef = /*#__PURE__*/react["forwardRef"](SvgStaticSprite);
/* harmony default export */ var static_sprite = (__webpack_require__.p + "static/media/static-sprite.899858de.svg");

// CONCATENATED MODULE: ./node_modules/@svgr/webpack/lib?-svgo,+titleProp,+ref!./src/resources/svg/token-icons-sprite-static.svg
var token_icons_sprite_static_symbol, token_icons_sprite_static_symbol2, token_icons_sprite_static_symbol3, token_icons_sprite_static_symbol4, _symbol5, _symbol6, _symbol7, _symbol8;

var token_icons_sprite_static_excluded = ["title", "titleId"];

function token_icons_sprite_static_extends() { token_icons_sprite_static_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return token_icons_sprite_static_extends.apply(this, arguments); }

function token_icons_sprite_static_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = token_icons_sprite_static_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function token_icons_sprite_static_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



function SvgTokenIconsSpriteStatic(_ref, svgRef) {
  var title = _ref.title,
      titleId = _ref.titleId,
      props = token_icons_sprite_static_objectWithoutProperties(_ref, token_icons_sprite_static_excluded);

  return /*#__PURE__*/react["createElement"]("svg", token_icons_sprite_static_extends({
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      position: "absolute",
      width: 0,
      height: 0
    },
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/react["createElement"]("title", {
    id: titleId
  }, title) : null, token_icons_sprite_static_symbol || (token_icons_sprite_static_symbol = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__aave",
    fill: "none",
    viewBox: "0 0 40 40"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "url(#icon__aave-a)",
    d: "M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M28.753 27.97L21.99 11.618c-.381-.846-.948-1.258-1.695-1.258h-.598c-.748 0-1.315.412-1.696 1.258l-2.944 7.123h-2.226a1.22 1.22 0 00-1.212 1.212v.015a1.223 1.223 0 001.212 1.211h1.196l-2.81 6.79a1.42 1.42 0 00-.082.463c0 .381.118.68.33.912.211.232.515.346.897.346.252-.005.494-.083.695-.232.217-.15.366-.366.485-.614l3.093-7.67h2.144a1.22 1.22 0 001.211-1.211v-.031a1.223 1.223 0 00-1.21-1.211h-1.145l2.36-5.882 6.434 16c.118.248.268.464.484.614.201.15.449.226.696.232.381 0 .68-.114.897-.346.216-.232.33-.53.33-.912a1.08 1.08 0 00-.083-.459z"
  }), /*#__PURE__*/react["createElement"]("defs", null, /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__aave-a",
    x1: 34.912,
    x2: 5.152,
    y1: 7.453,
    y2: 32.493,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#B6509E"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#2EBAC6"
  }))))), token_icons_sprite_static_symbol2 || (token_icons_sprite_static_symbol2 = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__stkaave",
    fill: "none",
    viewBox: "0 0 40 40"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "url(#icon__stkaave-a)",
    d: "M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M31.28 10.201L20.308 6.91a.818.818 0 00-.47 0L8.864 10.201a.82.82 0 00-.584.786v12.069a7.796 7.796 0 001.89 4.776 19.524 19.524 0 003.936 3.645 35.303 35.303 0 005.632 3.298.818.818 0 00.666 0 35.31 35.31 0 005.632-3.298 19.524 19.524 0 003.936-3.645 7.795 7.795 0 001.89-4.776v-12.07a.82.82 0 00-.583-.785z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "url(#paint1_linear)",
    d: "M26.818 25.403L21.621 12.84a1.397 1.397 0 00-1.303-.966h-.46a1.398 1.398 0 00-1.303.966l-2.266 5.467h-1.704a.933.933 0 00-.934.933v.014a.933.933 0 00.934.933h.92l-2.159 5.215a1.1 1.1 0 00-.064.356c-.01.258.082.509.256.7a.896.896 0 00.69.266.933.933 0 00.533-.178c.163-.121.291-.284.37-.471l2.378-5.892h1.646a.934.934 0 00.934-.933v-.02a.934.934 0 00-.934-.934h-.88l1.807-4.513 4.941 12.293c.08.188.207.35.371.471a.933.933 0 00.533.179.898.898 0 00.69-.267.982.982 0 00.256-.7.84.84 0 00-.055-.357z"
  }), /*#__PURE__*/react["createElement"]("defs", null, /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__stkaave-a",
    x1: 36.28,
    x2: 6.52,
    y1: 9.08,
    y2: 34.12,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#B6509E"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#2EBAC6"
  })), /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "paint1_linear",
    x1: 22.783,
    x2: 13.181,
    y1: 15.603,
    y2: 25.886,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#B6509E"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#2EBAC6"
  }))))), token_icons_sprite_static_symbol3 || (token_icons_sprite_static_symbol3 = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__cream",
    fill: "none",
    viewBox: "0 0 40 40"
  }, /*#__PURE__*/react["createElement"]("g", {
    clipPath: "url(#icon__cream-a)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#69E2DC",
    d: "M21.61 20.944l7.014 7.013a1.34 1.34 0 01-.133 2.006 12.673 12.673 0 11.048-19.894 1.325 1.325 0 01.085 1.968l-7.019 7.019a1.335 1.335 0 00-.389.965c-.002.184.034.365.107.534.065.162.163.309.288.432v-.043zM20 0a20 20 0 100 40 20 20 0 000-40z"
  })), /*#__PURE__*/react["createElement"]("defs", null, /*#__PURE__*/react["createElement"]("clipPath", {
    id: "icon__cream-a"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M0 0h40v40H0z"
  }))))), token_icons_sprite_static_symbol4 || (token_icons_sprite_static_symbol4 = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__bond",
    fill: "none",
    viewBox: "0 0 40 40"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "#FF4339",
    rx: 20
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M20.075 17.98h-.145c-1.947 0-3.461 1.587-3.461 3.607v3.894l3.533-2.668 3.534 2.668v-3.894c0-1.947-1.587-3.534-3.462-3.606z"
  }), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__bond-a",
    width: 30,
    height: 30,
    x: 5,
    y: 5,
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("circle", {
    cx: 20,
    cy: 20,
    r: 15,
    fill: "white"
  })), /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__bond-a)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M5 5v28.99l9.014-6.706v-7.645l-1.658-1.298L20 12.572l7.644 5.77-1.658 1.297v7.645L35 33.99V5H5z"
  })))), _symbol5 || (_symbol5 = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__uniswap",
    viewBox: "0 0 42 44",
    fill: "none"
  }, /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__uniswap__mask",
    width: 30,
    height: 30,
    x: 5,
    y: 7,
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("circle", {
    cx: 20,
    cy: 22,
    r: 15,
    fill: "white"
  })), /*#__PURE__*/react["createElement"]("rect", {
    y: 2,
    width: 40,
    height: 40,
    rx: 20,
    fill: "#FF4339"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M20.0731 19.9805H19.9288C17.9817 19.9805 16.4673 21.567 16.4673 23.5862V27.4805L20.0009 24.8122L23.5346 27.4805V23.5862C23.5346 21.6391 21.9481 20.0526 20.0731 19.9805Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__uniswap__mask)"
  }, /*#__PURE__*/react["createElement"]("path", {
    d: "M5 7V35.9904L14.0144 29.2837V21.6394L12.3558 20.3413L20 14.5721L27.6442 20.3413L25.9856 21.6394V29.2837L35 35.9904V7H5Z",
    fill: "white"
  })), /*#__PURE__*/react["createElement"]("rect", {
    x: 23,
    y: 1,
    width: 18,
    height: 18,
    rx: 9,
    fill: "#FF4339",
    stroke: "white",
    strokeWidth: 2
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M30.1107 4.85275C29.9698 4.82925 29.9638 4.82649 30.0301 4.81553C30.1572 4.79451 30.4572 4.82316 30.664 4.87603C31.1466 4.99944 31.5858 5.31557 32.0546 5.87702L32.1792 6.02617L32.3573 5.99536C33.1079 5.86562 33.8715 5.96874 34.5102 6.28609C34.6859 6.3734 34.9629 6.5472 34.9975 6.59186C35.0086 6.60609 35.0288 6.69771 35.0425 6.79548C35.0899 7.13372 35.0662 7.39298 34.97 7.58663C34.9177 7.692 34.9148 7.7254 34.95 7.81558C34.9781 7.88755 35.0564 7.94081 35.1339 7.9407C35.2926 7.94046 35.4634 7.66449 35.5426 7.2805L35.5741 7.12798L35.6363 7.20386C35.978 7.62021 36.2463 8.18802 36.2924 8.59219L36.3044 8.69757L36.247 8.60177C36.1482 8.43693 36.0488 8.32471 35.9217 8.2342C35.6924 8.07105 35.4501 8.01554 34.8082 7.97915C34.2285 7.94629 33.9004 7.89303 33.575 7.77892C33.0215 7.58479 32.7425 7.32625 32.0849 6.39832C31.7929 5.98617 31.6124 5.75813 31.4328 5.57449C31.0248 5.15721 30.6239 4.93837 30.1107 4.85275Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M35.1284 5.77278C35.143 5.4966 35.1778 5.31443 35.2478 5.14806C35.2755 5.08222 35.3015 5.02832 35.3055 5.02832C35.3095 5.02832 35.2974 5.07692 35.2787 5.13632C35.2278 5.29778 35.2194 5.51861 35.2545 5.77555C35.299 6.10155 35.3243 6.14859 35.6447 6.50074C35.7949 6.66592 35.9697 6.87424 36.033 6.96368L36.1482 7.12631L36.033 7.01009C35.8921 6.86796 35.5682 6.59077 35.4966 6.55115C35.4486 6.52458 35.4415 6.52504 35.4119 6.55673C35.3846 6.58592 35.3788 6.6298 35.3751 6.83722C35.3692 7.16051 35.3282 7.36801 35.2294 7.57549C35.1759 7.6877 35.1674 7.66375 35.2158 7.53709C35.2519 7.44252 35.2556 7.40095 35.2554 7.08799C35.2548 6.45918 35.1854 6.30801 34.7784 6.04905C34.6754 5.98345 34.5054 5.88884 34.4009 5.83879C34.2964 5.78875 34.2134 5.74516 34.2164 5.7419C34.2279 5.72957 34.6248 5.85417 34.7846 5.92028C35.0222 6.0186 35.0614 6.03135 35.0903 6.01949C35.1097 6.01153 35.119 5.95093 35.1284 5.77278Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M30.3845 6.84829C30.0984 6.42474 29.9215 5.77534 29.9598 5.28988L29.9716 5.13965L30.0367 5.15243C30.159 5.17641 30.3698 5.26081 30.4685 5.3253C30.7394 5.50225 30.8567 5.73523 30.976 6.33348C31.0109 6.50872 31.0568 6.70702 31.0779 6.77415C31.1118 6.88221 31.2402 7.13462 31.3445 7.29854C31.4197 7.4166 31.3698 7.47255 31.2036 7.45641C30.9499 7.43178 30.6062 7.17663 30.3845 6.84829Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M34.781 10.0008C33.4444 9.42189 32.9736 8.91941 32.9736 8.07158C32.9736 7.94681 32.9776 7.84473 32.9825 7.84473C32.9874 7.84473 33.0391 7.8859 33.0974 7.93624C33.3685 8.17008 33.672 8.26995 34.5122 8.40181C35.0067 8.47941 35.2849 8.54208 35.5416 8.63364C36.3574 8.92468 36.8622 9.51529 36.9826 10.3197C37.0175 10.5535 36.997 10.9918 36.9403 11.2229C36.8956 11.4053 36.7589 11.7342 36.7227 11.7469C36.7126 11.7504 36.7028 11.7089 36.7002 11.6526C36.6865 11.3505 36.5446 11.0564 36.3063 10.8361C36.0353 10.5857 35.6712 10.3863 34.781 10.0008Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M33.8429 10.2416C33.8262 10.1344 33.7971 9.99754 33.7784 9.93742L33.7443 9.82812L33.8076 9.9046C33.8953 10.0104 33.9646 10.1459 34.0233 10.3263C34.0681 10.4639 34.0731 10.5049 34.0728 10.7286C34.0725 10.9483 34.0669 10.9943 34.0255 11.1182C33.9602 11.3136 33.8793 11.4522 33.7434 11.6009C33.4992 11.8682 33.1853 12.0162 32.7323 12.0776C32.6536 12.0882 32.4241 12.1062 32.2223 12.1175C31.7138 12.1459 31.3792 12.2047 31.0785 12.3183C31.0352 12.3346 30.9966 12.3446 30.9927 12.3404C30.9805 12.3273 31.1853 12.196 31.3544 12.1084C31.5928 11.9848 31.8302 11.9175 32.362 11.8222C32.6247 11.7751 32.896 11.718 32.9649 11.6953C33.6155 11.4807 33.95 10.927 33.8429 10.2416Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M34.4558 11.4118C34.2782 11.0012 34.2374 10.6047 34.3347 10.2349C34.3451 10.1954 34.3618 10.1631 34.3719 10.1631C34.382 10.1631 34.4239 10.1875 34.465 10.2172C34.5469 10.2765 34.711 10.3763 35.1482 10.6327C35.6939 10.9527 36.005 11.2005 36.2166 11.4836C36.4019 11.7315 36.5165 12.0139 36.5717 12.3583C36.603 12.5533 36.5846 13.0226 36.5381 13.219C36.3914 13.8383 36.0504 14.3247 35.5641 14.6085C35.4929 14.6501 35.4289 14.6843 35.422 14.6844C35.415 14.6846 35.441 14.6136 35.4797 14.5266C35.6432 14.1588 35.6619 13.801 35.5382 13.4027C35.4625 13.1588 35.308 12.8612 34.9963 12.3583C34.6338 11.7736 34.5449 11.618 34.4558 11.4118Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M29.4353 13.6276C29.9313 13.1771 30.5484 12.857 31.1106 12.7588C31.3529 12.7164 31.7565 12.7332 31.9809 12.795C32.3405 12.894 32.6622 13.1158 32.8295 13.3799C32.993 13.6381 33.0631 13.8631 33.1362 14.3637C33.165 14.5612 33.1963 14.7595 33.2058 14.8044C33.2607 15.0639 33.3674 15.2712 33.4996 15.3754C33.7097 15.5408 34.0714 15.551 34.4273 15.4017C34.4877 15.3763 34.5401 15.3588 34.5438 15.3628C34.5567 15.3766 34.3775 15.5056 34.2511 15.5735C34.081 15.6649 33.9458 15.7003 33.766 15.7003C33.4401 15.7003 33.1696 15.522 32.9438 15.1583C32.8994 15.0867 32.7995 14.8724 32.7219 14.682C32.4835 14.0971 32.3658 13.919 32.089 13.724C31.8481 13.5544 31.5375 13.5239 31.3038 13.6472C30.9968 13.8091 30.9112 14.2311 31.131 14.4985C31.2184 14.6048 31.3814 14.6964 31.5146 14.7142C31.7639 14.7476 31.9781 14.5436 31.9781 14.2729C31.9781 14.0971 31.9153 13.9968 31.7572 13.92C31.5412 13.8152 31.3091 13.9378 31.3102 14.156C31.3107 14.2491 31.3483 14.3074 31.4351 14.3497C31.4907 14.3768 31.492 14.3789 31.4466 14.3687C31.2485 14.3246 31.2021 14.0676 31.3614 13.897C31.5527 13.6923 31.9482 13.7826 32.084 14.0622C32.1411 14.1796 32.1477 14.4134 32.098 14.5546C31.9866 14.8706 31.662 15.0368 31.3326 14.9464C31.1084 14.8847 31.0171 14.8181 30.7467 14.5186C30.277 13.998 30.0946 13.8972 29.4174 13.7835L29.2876 13.7617L29.4353 13.6276Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M27.231 4.31134C28.7998 6.35946 29.8803 7.20447 30.0004 7.383C30.0996 7.53042 30.0622 7.66294 29.8924 7.76681C29.798 7.82456 29.6038 7.88307 29.5065 7.88307C29.3966 7.88307 29.3588 7.83744 29.3588 7.83744C29.2951 7.77239 29.2592 7.78376 28.9317 7.1586C28.4772 6.39988 28.0967 5.77049 28.0864 5.75995C28.0624 5.73558 28.0628 5.7364 28.8854 7.31961C29.0183 7.64959 28.9118 7.77072 28.9118 7.81771C28.9118 7.91332 28.8876 7.96357 28.7779 8.09513C28.5951 8.31446 28.5134 8.56091 28.4545 9.07096C28.3883 9.64272 28.2024 10.0466 27.6871 10.7378C27.3855 11.1425 27.3362 11.2166 27.26 11.3797C27.1642 11.5851 27.1378 11.7001 27.1271 11.9594C27.1158 12.2337 27.1378 12.4108 27.2157 12.673C27.2839 12.9025 27.3551 13.054 27.537 13.3571C27.694 13.6187 27.7844 13.8131 27.7844 13.8892C27.7844 13.9497 27.7952 13.9498 28.0385 13.8906C28.6207 13.7492 29.0935 13.5005 29.3594 13.1956C29.524 13.0069 29.5626 12.9027 29.5639 12.6443C29.5647 12.4751 29.5592 12.4397 29.5167 12.3424C29.4475 12.184 29.3215 12.0524 29.0439 11.8483C28.6802 11.5808 28.5249 11.3655 28.482 11.0694C28.4468 10.8264 28.4876 10.655 28.6888 10.2014C28.8971 9.73183 28.9487 9.53174 28.9836 9.05847C29.0061 8.7527 29.0374 8.63211 29.119 8.53532C29.2042 8.43438 29.2809 8.4002 29.4917 8.36922C29.8354 8.31872 30.0542 8.22308 30.2341 8.04478C30.3902 7.8901 30.4555 7.74106 30.4655 7.5167L30.4731 7.34664L30.3859 7.23728C30.0701 6.84121 27.0196 4 27.0001 4C26.996 4 27.0999 4.14011 27.231 4.31134ZM27.9617 12.2697C28.0331 12.1337 27.9952 11.9589 27.8757 11.8734C27.7629 11.7927 27.5876 11.8308 27.5876 11.9359C27.5876 11.968 27.6041 11.9914 27.6413 12.012C27.7039 12.0466 27.7084 12.0856 27.6592 12.1652C27.6093 12.2459 27.6133 12.3168 27.6705 12.365C27.7628 12.4427 27.8933 12.4 27.9617 12.2697Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M30.6902 8.45861C30.5288 8.51197 30.372 8.69607 30.3234 8.88912C30.2938 9.00689 30.3106 9.21347 30.355 9.27727C30.4267 9.38032 30.496 9.40747 30.6837 9.40605C31.0511 9.40329 31.3705 9.23362 31.4076 9.02152C31.4381 8.84766 31.2978 8.6067 31.1046 8.50092C31.0048 8.44636 30.7928 8.42471 30.6902 8.45861ZM31.1197 8.82023C31.1764 8.73355 31.1516 8.63986 31.0552 8.5765C30.8717 8.45585 30.5942 8.55569 30.5942 8.74235C30.5942 8.83526 30.7389 8.93664 30.8716 8.93664C30.9599 8.93664 31.0807 8.87995 31.1197 8.82023Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M32 43C36.9856 43 41 38.9856 41 34C41 29.0144 36.9856 25 32 25C27.0144 25 23 29.0144 23 34C23 38.9856 27.0144 43 32 43Z",
    fill: "#FF4339",
    stroke: "white",
    strokeWidth: 2
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M34.2 35.2664C34.2 34.0998 33.5 33.6998 32.1 33.5331C31.1 33.3998 30.9 33.1331 30.9 32.6664C30.9 32.1997 31.2334 31.8998 31.9 31.8998C32.5 31.8998 32.8334 32.0998 33 32.5998C33.0334 32.6998 33.1334 32.7664 33.2334 32.7664H33.7667C33.9 32.7664 34 32.6664 34 32.5331V32.4998C33.8667 31.7664 33.2667 31.1998 32.5 31.1331V30.3331C32.5 30.1998 32.4 30.0998 32.2334 30.0664H31.7334C31.6 30.0664 31.5 30.1664 31.4667 30.3331V31.0998C30.4667 31.2331 29.8334 31.8998 29.8334 32.7331C29.8334 33.8331 30.5 34.2664 31.9 34.4331C32.8334 34.5998 33.1334 34.7998 33.1334 35.3331C33.1334 35.8665 32.6667 36.2331 32.0334 36.2331C31.1667 36.2331 30.8667 35.8664 30.7667 35.3664C30.7334 35.2331 30.6334 35.1664 30.5334 35.1664H29.9667C29.8334 35.1664 29.7334 35.2664 29.7334 35.3998V35.4331C29.8667 36.2664 30.4 36.8664 31.5 37.0331V37.8331C31.5 37.9664 31.6 38.0664 31.7667 38.0998H32.2667C32.4 38.0998 32.5 37.9998 32.5334 37.8331V37.0331C33.5334 36.8664 34.2 36.1664 34.2 35.2664Z",
    fill: "white"
  }), /*#__PURE__*/react["createElement"]("path", {
    d: "M30.3002 38.7663C27.7002 37.833 26.3668 34.933 27.3335 32.3663C27.8335 30.9663 28.9335 29.8996 30.3002 29.3996C30.4335 29.333 30.5002 29.233 30.5002 29.0663V28.5996C30.5002 28.4663 30.4335 28.3663 30.3002 28.333C30.2668 28.333 30.2002 28.333 30.1668 28.3663C27.0002 29.3663 25.2668 32.733 26.2668 35.8996C26.8668 37.7663 28.3002 39.1996 30.1668 39.7996C30.3002 39.8663 30.4335 39.7996 30.4668 39.6663C30.5002 39.633 30.5002 39.5996 30.5002 39.533V39.0663C30.5002 38.9663 30.4002 38.833 30.3002 38.7663ZM33.8335 28.3663C33.7002 28.2996 33.5668 28.3663 33.5335 28.4996C33.5002 28.533 33.5002 28.5663 33.5002 28.633V29.0996C33.5002 29.233 33.6002 29.3663 33.7002 29.433C36.3002 30.3663 37.6335 33.2663 36.6668 35.833C36.1668 37.233 35.0668 38.2996 33.7002 38.7996C33.5668 38.8663 33.5002 38.9663 33.5002 39.133V39.5996C33.5002 39.733 33.5668 39.833 33.7002 39.8663C33.7335 39.8663 33.8002 39.8663 33.8335 39.833C37.0002 38.833 38.7335 35.4663 37.7335 32.2996C37.1335 30.3996 35.6668 28.9663 33.8335 28.3663Z",
    fill: "white"
  }))), _symbol6 || (_symbol6 = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__rai",
    fill: "none",
    viewBox: "0 0 760 760"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#192123",
    d: "M760 380c0 209.868-170.132 380-380 380S0 589.868 0 380 170.132 0 380 0s380 170.132 380 380z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "url(#icon__rai-g)",
    fillRule: "evenodd",
    d: "M380 730c193.3 0 350-156.7 350-350S573.3 30 380 30 30 186.7 30 380s156.7 350 350 350zm0 30c209.868 0 380-170.132 380-380S589.868 0 380 0 0 170.132 0 380s170.132 380 380 380z",
    clipRule: "evenodd"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M207.719 338.344l14.63-43.89a9.996 9.996 0 014.253-5.359l204.606-125.657c14.988-9.205 33.703 4.027 30.024 21.226l-8.036 37.569a55.012 55.012 0 01-8.02 19.004L296.299 464.552c-8.559 12.838-27.816 11.56-34.603-2.297l-52.914-108.034a20.998 20.998 0 01-1.063-15.877z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M207.719 338.344l14.63-43.89a9.996 9.996 0 014.253-5.359l204.606-125.657c14.988-9.205 33.703 4.027 30.024 21.226l-8.036 37.569a55.012 55.012 0 01-8.02 19.004L296.299 464.552c-8.559 12.838-27.816 11.56-34.603-2.297l-52.914-108.034a20.998 20.998 0 01-1.063-15.877z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M207.719 338.344l14.63-43.89a9.996 9.996 0 014.253-5.359l204.606-125.657c14.988-9.205 33.703 4.027 30.024 21.226l-8.036 37.569a55.012 55.012 0 01-8.02 19.004L296.299 464.552c-8.559 12.838-27.816 11.56-34.603-2.297l-52.914-108.034a20.998 20.998 0 01-1.063-15.877z"
  }), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__rai-a",
    width: 256,
    height: 314,
    x: 206,
    y: 160,
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M207.719 338.344l14.63-43.89a9.996 9.996 0 014.253-5.359l204.606-125.657c14.988-9.205 33.703 4.027 30.024 21.226l-8.036 37.569a55.012 55.012 0 01-8.02 19.004L296.299 464.552c-8.559 12.838-27.816 11.56-34.603-2.297l-52.914-108.034a20.998 20.998 0 01-1.063-15.877z"
  })), /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__rai-a)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#26CEAE",
    d: "M277 490.5l-54-203 142.5-85 120 12-208.5 276z"
  })), /*#__PURE__*/react["createElement"]("path", {
    fill: "#A5E9DC",
    d: "M328 413l-33-142 30.5-18L351 361.5 328 413zM371 342.5L351.5 258l15-10.5 14 59.5-9.5 35.5z"
  }), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__rai-b",
    width: 256,
    height: 314,
    x: 206,
    y: 160,
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M207.719 338.344l14.63-43.89a9.996 9.996 0 014.253-5.359l204.606-125.657c14.988-9.205 33.703 4.027 30.024 21.226l-8.036 37.569a55.012 55.012 0 01-8.02 19.004L296.299 464.552c-8.559 12.838-27.816 11.56-34.603-2.297l-52.914-108.034a20.998 20.998 0 01-1.063-15.877z"
  })), /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__rai-b)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#19898A",
    d: "M428.5 242.5l-207 48.5-10-6.5L394 163l80-12.5-45.5 92z"
  })), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__rai-c",
    width: 256,
    height: 314,
    x: 206,
    y: 160,
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M207.719 338.344l14.63-43.89a9.996 9.996 0 014.253-5.359l204.606-125.657c14.988-9.205 33.703 4.027 30.024 21.226l-8.036 37.569a55.012 55.012 0 01-8.02 19.004L296.299 464.552c-8.559 12.838-27.816 11.56-34.603-2.297l-52.914-108.034a20.998 20.998 0 01-1.063-15.877z"
  })), /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__rai-c)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M283 483.5L459.5 163l81.5 4.5-209.5 284-48.5 32z"
  })), /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M551.281 419.156l-14.63 43.89a9.996 9.996 0 01-4.253 5.359L327.792 594.062c-14.988 9.205-33.703-4.027-30.024-21.226l8.036-37.569a55.012 55.012 0 018.02-19.004l148.877-223.315c8.559-12.838 27.816-11.56 34.603 2.297l52.914 108.034a20.993 20.993 0 011.063 15.877z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M551.281 419.156l-14.63 43.89a9.996 9.996 0 01-4.253 5.359L327.792 594.062c-14.988 9.205-33.703-4.027-30.024-21.226l8.036-37.569a55.012 55.012 0 018.02-19.004l148.877-223.315c8.559-12.838 27.816-11.56 34.603 2.297l52.914 108.034a20.993 20.993 0 011.063 15.877z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M551.281 419.156l-14.63 43.89a9.996 9.996 0 01-4.253 5.359L327.792 594.062c-14.988 9.205-33.703-4.027-30.024-21.226l8.036-37.569a55.012 55.012 0 018.02-19.004l148.877-223.315c8.559-12.838 27.816-11.56 34.603 2.297l52.914 108.034a20.993 20.993 0 011.063 15.877z"
  }), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__rai-d",
    width: 256,
    height: 314,
    x: 297,
    y: 284,
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M551.281 419.156l-14.63 43.89a9.996 9.996 0 01-4.253 5.359L327.792 594.062c-14.988 9.205-33.703-4.027-30.024-21.226l8.036-37.569a55.012 55.012 0 018.02-19.004l148.877-223.315c8.559-12.838 27.816-11.56 34.603 2.297l52.914 108.034a20.993 20.993 0 011.063 15.877z"
  })), /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__rai-d)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#26CEAE",
    d: "M482 267l54 203-142.5 85-120-12L482 267z"
  })), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__rai-e",
    width: 256,
    height: 314,
    x: 297,
    y: 284,
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M551.281 419.156l-14.63 43.89a9.996 9.996 0 01-4.253 5.359L327.792 594.062c-14.988 9.205-33.703-4.027-30.024-21.226l8.036-37.569a55.012 55.012 0 018.02-19.004l148.877-223.315c8.559-12.838 27.816-11.56 34.603 2.297l52.914 108.034a20.993 20.993 0 011.063 15.877z"
  })), /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__rai-e)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#19898A",
    d: "M330.5 515l207-48.5 10 6.5L365 594.5 285 607l45.5-92z"
  })), /*#__PURE__*/react["createElement"]("path", {
    fill: "#A5E9DC",
    d: "M434.5 343.5L444 326l64 36 7.5 25.5-81-44zM407.5 391l16-24L524 421l10.5 39-127-69z"
  }), /*#__PURE__*/react["createElement"]("mask", {
    id: "icon__rai-f",
    width: 256,
    height: 314,
    x: 297,
    y: 284,
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M551.281 419.156l-14.63 43.89a9.996 9.996 0 01-4.253 5.359L327.792 594.062c-14.988 9.205-33.703-4.027-30.024-21.226l8.036-37.569a55.012 55.012 0 018.02-19.004l148.877-223.315c8.559-12.838 27.816-11.56 34.603 2.297l52.914 108.034a20.993 20.993 0 011.063 15.877z"
  })), /*#__PURE__*/react["createElement"]("g", {
    mask: "url(#icon__rai-f)"
  }, /*#__PURE__*/react["createElement"]("path", {
    fill: "#68FEE2",
    d: "M476 274L299.5 594.5 218 590l209.5-284 48.5-32z"
  })), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M251 271c16.372-3.684 21.488-16.202 22-22v22h-22zM251 271c16.372 3.684 21.488 16.202 22 22v-22h-22zM295 271c-16.372-3.684-21.488-16.202-22-22v22h22zM295 271c-16.372 3.684-21.488 16.202-22 22v-22h22zM337 291c8.186-1.842 10.744-8.101 11-11v11h-11zM337 291c8.186 1.842 10.744 8.101 11 11v-11h-11zM359 291c-8.186-1.842-10.744-8.101-11-11v11h11zM359 291c-8.186 1.842-10.744 8.101-11 11v-11h11zM399 512c8.186-1.842 10.744-8.101 11-11v11h-11zM399 512c8.186 1.842 10.744 8.101 11 11v-11h-11zM421 512c-8.186-1.842-10.744-8.101-11-11v11h11zM421 512c-8.186 1.842-10.744 8.101-11 11v-11h11z"
  }), /*#__PURE__*/react["createElement"]("defs", null, /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__rai-g",
    x1: 0,
    x2: 760,
    y1: 0,
    y2: 760,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#192123"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#399886"
  }))))), _symbol7 || (_symbol7 = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__xsushi",
    fill: "none",
    viewBox: "0 0 40 40"
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: 40,
    height: 40,
    fill: "#000",
    rx: 20
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    stroke: "#fff",
    d: "m33.028 24.037-.002.002-5.022 7c-.934 1.314-2.682 1.863-4.764 1.692-2.688-.222-6.18-1.629-9.495-4.006-3.314-2.379-5.768-5.236-6.852-7.706l-.001-.003c-.826-1.915-.87-3.739.076-5.053l5.011-7.001.001-.001c.945-1.31 2.69-1.861 4.762-1.69l16.286 16.766Zm0 0c.93-1.31.902-3.133.062-5.053-1.073-2.472-3.527-5.329-6.84-7.706-3.315-2.377-6.82-3.785-9.507-4.007l16.285 16.766ZM16.53 9.914c2.225.183 5.229 1.41 8.169 3.519 2.939 2.106 5.068 4.56 5.964 6.607.503 1.176.552 1.974.206 2.454l-5.024 7.002-.002.003c-.336.476-1.106.695-2.38.589-2.226-.183-5.241-1.411-8.181-3.518-2.94-2.108-5.07-4.563-5.952-6.607l-.001-.002c-.513-1.17-.552-1.972-.206-2.451l.001-.002 5.01-7 .001-.001c.348-.482 1.123-.698 2.395-.593Z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M13.067 9.905c1.639-2.288 7.193-1.113 12.404 2.62 5.212 3.734 8.113 8.624 6.474 10.911l-5.011 7.002c-1.64 2.288-7.205 1.113-12.417-2.621s-8.112-8.623-6.473-10.91l5.023-7.002Z",
    clipRule: "evenodd"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#0E0F23",
    fillRule: "evenodd",
    d: "M12.702 9.48c.73-1.02 2.139-1.47 3.961-1.324 2.516.207 5.846 1.556 9.054 3.84 3.196 2.297 5.541 5.031 6.538 7.34.729 1.677.753 3.16.024 4.18l-5.007 7c-.729 1.02-2.15 1.47-3.961 1.324-2.516-.218-5.858-1.555-9.053-3.852-3.209-2.284-5.542-5.018-6.55-7.327-.73-1.677-.754-3.16-.025-4.18l5.019-7Zm18.884 13.526c.584-.802.462-1.993-.11-3.33-.96-2.2-3.207-4.788-6.27-6.975-3.05-2.187-6.221-3.488-8.615-3.682-1.459-.122-2.613.146-3.196.96l-.025.049c-.546.814-.425 1.968.146 3.28.96 2.212 3.208 4.8 6.259 6.988 3.05 2.187 6.221 3.488 8.615 3.682 1.434.11 2.564-.146 3.16-.911l.036-.061Zm-7.801-8.324c1.53 1.094 2.66 2.394 3.135 3.5.28.62.352 1.166.073 1.543-.268.377-.814.486-1.483.425-1.203-.097-2.783-.753-4.314-1.847-1.53-1.094-2.661-2.382-3.135-3.488-.267-.62-.34-1.166-.073-1.543s.814-.486 1.495-.437c1.19.11 2.783.753 4.302 1.847Z",
    clipRule: "evenodd"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "url(#icon__xsushi-a)",
    fillRule: "evenodd",
    d: "M11.324 25.557c-1.7-1.65-2.951-3.364-3.617-4.897-.728-1.677-.753-3.158-.024-4.176l5.018-7.002c.729-1.018 2.14-1.47 3.961-1.32 2.515.208 5.85 1.548 9.051 3.842 3.202 2.294 5.542 5.022 6.547 7.336.087.2.165.399.231.593a2.404 2.404 0 0 0-.875-.246c-.05-.005-.1-.009-.148-.01-.96-2.206-3.207-4.788-6.256-6.973-3.052-2.188-6.223-3.486-8.62-3.683-1.454-.12-2.61.15-3.192.963l-.035.048c-.543.811-.421 1.972.148 3.284.958 2.207 3.207 4.792 6.26 6.98 2.482 1.778 5.043 2.97 7.203 3.458-.877 1.229-1.82 2.32-3.06 2.567-1.081.216-2.15-.27-3.129-1.376-1.017-1.148-1.843-2.784-3.007-3.048-2.088-.473-3.95 3.12-6.016 3.587a3.707 3.707 0 0 1-.44.073Zm12.465-10.868c1.528 1.094 2.656 2.385 3.136 3.49.27.622.344 1.17.073 1.549-.27.378-.814.484-1.49.428-1.2-.099-2.785-.752-4.313-1.847-1.527-1.094-2.655-2.385-3.135-3.49-.27-.622-.344-1.17-.073-1.549.27-.378.814-.484 1.49-.428 1.2.099 2.785.752 4.312 1.847Z",
    clipRule: "evenodd"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M27.181 24.94c.948.157 1.823.194 2.552.072a.189.189 0 0 0 .158-.207c-.024-.097-.11-.17-.206-.157-.705.121-1.531.085-2.443-.073a.189.189 0 0 0-.206.158c-.012.097.048.194.145.206Zm-1.434-.317c.243.061.474.122.717.17.098.025.195-.036.207-.133a.181.181 0 0 0-.134-.22c-.23-.048-.461-.109-.692-.17a.178.178 0 0 0-.231.122c-.024.098.036.195.133.231ZM12.174 13.115c.68 2.783 3.354 5.384 5.505 7.23.073.074.194.062.255-.011.06-.085.06-.195-.025-.256-2.09-1.81-4.714-4.338-5.37-7.048-.025-.097-.134-.158-.232-.133a.181.181 0 0 0-.133.218Zm-.158-1.118c0 .122.012.255.024.377.012.097.11.17.207.158a.177.177 0 0 0 .158-.194c-.012-.122-.025-.243-.025-.353 0-.11-.085-.182-.194-.182a.196.196 0 0 0-.17.194Z",
    clipRule: "evenodd"
  }), /*#__PURE__*/react["createElement"]("defs", null, /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__xsushi-a",
    x1: 22.796,
    x2: 22.594,
    y1: 28.035,
    y2: -6.442,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    stopColor: "#FFCE66"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#FF6650"
  }))))), _symbol8 || (_symbol8 = /*#__PURE__*/react["createElement"]("symbol", {
    id: "icon__sushi",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react["createElement"]("defs", null, /*#__PURE__*/react["createElement"]("path", {
    id: "icon__sushi-a",
    d: "M0 0h24v24H0z"
  })), /*#__PURE__*/react["createElement"]("clipPath", {
    id: "icon__sushi-b"
  }, /*#__PURE__*/react["createElement"]("use", {
    xlinkHref: "#icon__sushi-a",
    overflow: "visible"
  })), /*#__PURE__*/react["createElement"]("g", {
    clipPath: "url(#icon__sushi-b)"
  }, /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__sushi-c",
    x1: 20.644,
    x2: 24.333,
    y1: 1011.506,
    y2: 998.84,
    gradientTransform: "matrix(1 0 0 -1 -12 1012)",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    offset: 0,
    stopColor: "#03b8ff"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#fa52a0"
  })), /*#__PURE__*/react["createElement"]("path", {
    fill: "url(#icon__sushi-c)",
    d: "M5 2.3 23.6 15 19 21.8.4 9 5 2.3z"
  }), /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__sushi-d",
    x1: 23.682,
    x2: 27.37,
    y1: 1012.39,
    y2: 999.724,
    gradientTransform: "matrix(1 0 0 -1 -12 1012)",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    offset: 0,
    stopColor: "#03b8ff"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#fa52a0"
  })), /*#__PURE__*/react["createElement"]("path", {
    fill: "url(#icon__sushi-d)",
    d: "M23.6 15c-1.6 2.3-7 1.4-12.1-2.2C6.3 9.3 3.5 4.6 5 2.3 6.6 0 12 .9 17.1 4.5c5.2 3.4 8 8.2 6.5 10.5z"
  }), /*#__PURE__*/react["createElement"]("linearGradient", {
    id: "icon__sushi-e",
    x1: 17.616,
    x2: 21.305,
    y1: 1010.624,
    y2: 997.958,
    gradientTransform: "matrix(1 0 0 -1 -12 1012)",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react["createElement"]("stop", {
    offset: 0,
    stopColor: "#03b8ff"
  }), /*#__PURE__*/react["createElement"]("stop", {
    offset: 1,
    stopColor: "#fa52a0"
  })), /*#__PURE__*/react["createElement"]("path", {
    fill: "url(#icon__sushi-e)",
    d: "M19 21.7c-1.6 2.3-7 1.4-12.1-2.2s-8-8.2-6.4-10.6c1.6-2.3 7-1.4 12.1 2.2s7.9 8.3 6.4 10.6z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#0e0f23",
    d: "M23.6 15 19 21.8c-1.6 2.3-7 1.3-12.1-2.2-1-.7-1.9-1.4-2.8-2.2.7-.1 1.6-.5 2.5-1.5 1.6-1.7 2.4-2.1 3.1-2 .7 0 1.5.7 2.8 2.4 1.3 1.7 3.1 2.2 4.2 1.3.1-.1.2-.1.3-.2.9-.7 1.2-1 2.9-4.2.4-.8 1.8-2.1 3.7-1.5.5 1.3.5 2.4 0 3.3z"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M22.9 14.6c-1.4 2-6.3 1-11-2.3C7.1 9 4.3 4.8 5.7 2.8s6.3-1 11 2.3 7.5 7.5 6.2 9.5zm-4.4-3c-.7 1-3.1.5-5.5-1.1-2.3-1.6-3.7-3.7-3-4.7.7-1 3.1-.5 5.5 1.1 2.3 1.6 3.7 3.7 3 4.7z",
    clipRule: "evenodd"
  }), /*#__PURE__*/react["createElement"]("path", {
    fill: "#fff",
    d: "M4.6 4.6c0-.1-.1-.2-.2-.1s-.2.1-.2.2c.1.3.2.5.2.7 0 .1.1.2.2.1.1 0 .2-.1.1-.2 0-.2 0-.4-.1-.7zm.5 1.6c0-.1-.1-.2-.2-.1s-.1.1-.1.2c1.1 2.5 3.4 5.2 6.4 7.2.1.1.2 0 .3 0 .1-.1 0-.2 0-.3-3.1-2-5.3-4.6-6.4-7zM17.2 16c-.1 0-.2 0-.2.1s0 .2.1.2c.3.1.7.2 1 .3.1 0 .2 0 .2-.1s0-.2-.1-.2c-.3-.1-.7-.2-1-.3zm1.8.4c-.1 0-.2.1-.2.2s.1.2.2.2c.8.1 1.7.2 2.4.1.1 0 .2-.1.2-.2s-.1-.2-.2-.2c-.8.1-1.6 0-2.4-.1z"
  })))));
}

var token_icons_sprite_static_ForwardRef = /*#__PURE__*/react["forwardRef"](SvgTokenIconsSpriteStatic);
/* harmony default export */ var token_icons_sprite_static = (__webpack_require__.p + "static/media/token-icons-sprite-static.f96351c9.svg");

// CONCATENATED MODULE: ./src/checkFlexGap.tsx
function checkFlexGapSupport(){// create flex container with row-gap set
var flex=document.createElement('div');flex.style.display='flex';flex.style.flexDirection='column';flex.style.rowGap='1px';// create two, elements inside it
flex.appendChild(document.createElement('div'));flex.appendChild(document.createElement('div'));// append to the DOM (needed to obtain scrollHeight)
document.body.appendChild(flex);var isSupported=flex.scrollHeight===1;// flex container should be 1px high from the row-gap
document.body.removeChild(flex);return isSupported;}
// CONCATENATED MODULE: ./src/serviceWorker.ts
var isLocalhost=Boolean(window.location.hostname==='localhost'||// [::1] is the IPv6 localhost address.
window.location.hostname==='[::1]'||// 127.0.0.0/8 are considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function registerValidSW(swUrl,config){navigator.serviceWorker.register(swUrl).then(function(registration){registration.onupdatefound=function(){var installingWorker=registration.installing;if(installingWorker==null){return;}installingWorker.onstatechange=function(){if(installingWorker.state==='installed'){if(navigator.serviceWorker.controller){console.log('New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA.');if(config&&config.onUpdate){config.onUpdate(registration);}}else{console.log('Content is cached for offline use.');if(config&&config.onSuccess){config.onSuccess(registration);}}}};};}).catch(function(error){console.error('Error during service worker registration:',error);});}function checkValidServiceWorker(swUrl,config){fetch(swUrl,{headers:{'Service-Worker':'script'}}).then(function(response){var contentType=response.headers.get('content-type');if(response.status===404||contentType!=null&&contentType.indexOf('javascript')===-1){navigator.serviceWorker.ready.then(function(registration){registration.unregister().then(function(){window.location.reload();});});}else{registerValidSW(swUrl,config);}}).catch(function(){console.log('No internet connection found. App is running in offline mode.');});}function register(config){if( true&&'serviceWorker'in navigator){var publicUrl=new URL("",window.location.href);if(publicUrl.origin!==window.location.origin){return;}window.addEventListener('load',function(){var swUrl="".concat("","/service-worker.js");if(isLocalhost){checkValidServiceWorker(swUrl,config);navigator.serviceWorker.ready.then(function(){console.log('This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA');});}else{registerValidSW(swUrl,config);}});}}function unregister(){if('serviceWorker'in navigator){navigator.serviceWorker.ready.then(function(registration){return registration.unregister();}).catch(function(error){return console.error(error.message);});}}
// CONCATENATED MODULE: ./src/index.tsx
var ProviderTree=Object(dist["createProviderTreeFromList"])([generalProvider["a" /* default */],{}],[networkProvider["a" /* default */],{}],[configProvider["a" /* default */],{}],[walletProvider["b" /* default */],{}],[web3Provider["c" /* default */],{}],[contractManagerProvider["a" /* default */],{}],[knownTokensProvider["a" /* default */],{}],[notificationsProvider,{}]);var src_App=function App(){return/*#__PURE__*/Object(jsx_runtime["jsx"])(error_boundary_ErrorBoundary,{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(react_router_dom["a" /* BrowserRouter */],{children:/*#__PURE__*/Object(jsx_runtime["jsxs"])(ProviderTree,{children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(static_sprite_ForwardRef,{}),/*#__PURE__*/Object(jsx_runtime["jsx"])(token_icons_sprite_static_ForwardRef,{}),/*#__PURE__*/Object(jsx_runtime["jsx"])(layout,{})]})})});};Object(react_dom["render"])(/*#__PURE__*/Object(jsx_runtime["jsx"])(src_App,{}),document.getElementById('root'));unregister();document.body.addEventListener('mousedown',function(){document.body.classList.add('using-mouse');});document.body.addEventListener('keydown',function(event){if(event.key==='Tab'){document.body.classList.remove('using-mouse');}});if(checkFlexGapSupport()){// document.documentElement.classList.add('flexbox-gap');
}else{document.documentElement.classList.add('no-flexbox-gap');}

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"dialog":"s_dialog__3Z-Ls","inner":"s_inner__30alv","fullscreen":"s_fullscreen__1zr6Y","closeButton":"s_closeButton__XT6_J","header":"s_header__2dUKO","heading":"s_heading__3AIxP","content":"s_content__186sS"};

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MAINNET_CHAIN_ID */
/* unused harmony export MainnetConfig */
/* unused harmony export MainnetMetamaskChain */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainnetNetwork; });
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web3_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71);
/* harmony import */ var networks_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(323);
var RPC_KEY='f35c2a4f3d0941a38a3edb62ed10c847';var RPC_HTTPS_URL="https://mainnet.infura.io/v3/".concat(RPC_KEY);var RPC_WSS_URL="wss://mainnet.infura.io/ws/v3/".concat(RPC_KEY);var EXPLORER_KEY='4RSJUUZQFMXUAUUJP5FI5UR5U59N7UIA32';var EXPLORER_URL='https://etherscan.io';var EXPLORER_API_URL='https://api.etherscan.io';var MAINNET_CHAIN_ID=1;var MainnetConfig={title:utils__WEBPACK_IMPORTED_MODULE_1__[/* isDevelopmentMode */ "e"]?'Swingby DAO':'Swingby DAO',features:{yieldFarming:true,dao:true,smartYield:true,smartYieldReward:true,smartExposure:true,smartAlpha:true,gasFees:true,addBondToken:true,smartAlphaKPIOptions:true},wallets:{portisId:'b0b0f776-bbf6-458c-a175-6483e0c452b7',walletConnectBridge:'https://bridge.walletconnect.org',coinbaseAppName:'barnbridge',trezorEmail:'bogdan@barnbridge.com',trezorAppUrl:'https://app.barnbridge.com/'},api:{baseUrl:utils__WEBPACK_IMPORTED_MODULE_1__[/* isDevelopmentMode */ "e"]?'https://alpha-v2.api.barnbridge.com':'https://api-v2.barnbridge.com'},dao:{activationThreshold:400000},tokens:{wbtc:'0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',weth:'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',swingby:'0x0391D2021f89DC339F60Fff84546EA23E337750f',univ2:'0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244',usdc:'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',usdt:'0xdac17f958d2ee523a2206206994597c13d831ec7',susd:'0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',gusd:'0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',dai:'0x6B175474E89094C44Da98b954EedeAC495271d0F',rai:'0x03ab458634910aad20ef5f1c8ee96f1d6ac54919',stkaave:'0x4da27a545c0c5b758a6ba100e3a049001de870f5',wmatic:'',ausdc:'0xBcca60bB61934080951369a648Fb03DF4F96263C',ausdt:'0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',agusd:'0xD37EE7e4f452C6638c96536e68090De8cBcdb583',adai:'0x028171bCA77440897B824Ca71D1c56caC55b68A3',bb_cusdc:'0x4B8d90D68F26DEF303Dcb6CFc9b63A1aAEC15840',bb_cdai:'0x673f9488619821aB4f4155FdFFe06f6139De518F',bb_ausdc:'0x3cf46DA7D65E9aa2168a31b73dd4BeEA5cA1A1f1',bb_ausdt:'0x660dAF6643191cF0eD045B861D820F283cA078fc',bb_agusd:'0x6324538cc222b43490dd95CEBF72cf09d98D9dAe',bb_adai:'0x6c9DaE2C40b1e5883847bF5129764e76Cb69Fc57',bb_crusdc:'0x62e479060c89C48199FC7ad43b1432CC585BA1b9',bb_crusdt:'0xc45F49bE156888a1C0C93dc0fE7dC89091E291f5',bb_crdai:'0x89d82FdF095083Ded96B48FC6462Ed5dBD14151f'},feeds:{btc:'0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',eth:'0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',swingby:'0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244',univ2:'0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244',usdc:'0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',usdt:'0x4e58ab12d2051ea2068e78e4fcee7ddee6785848',susd:'0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757',dai:'0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',stkaave:'0x547a514d5e3769680Ce22B2361c10Ea13619e8a9',wmatic:'0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676'},contracts:{yf:{staking:'0xb0Fa2BeEe3Cf36a7Ac7E99B885b48538Ab364853',stable:'0xB3F7abF8FA1Df0fF61C5AC38d35e20490419f4bb',unilp:'0xC25c37c387C5C909a94055F4f16184ca325D3a76',swingby:'0x3FdFb07472ea4771E1aD66FD3b87b265Cd4ec112'},dao:{governance:'0x4cAE362D7F227e3d306f70ce4878E245563F3069',barn:'0x10e138877df69Ca44Fdc68655f86c88CDe142D7F',reward:'0x9d0CF50547D848cC4b6A12BeDCF7696e9b334a22'},se:{ePoolPeriphery:'0x33c8d6f8271675eda1a0e72558d4904c96c7a888',ePoolHelper:'0x8a63822d8c1be5590bbf72fb58e69285a776a5df'},sa:{loupe:'0xb7D7E8F3526187e065bc674b19E0BBa42B569f6d'}}};var MainnetMetamaskChain={chainId:Object(web3_utils__WEBPACK_IMPORTED_MODULE_0__["toHex"])(MAINNET_CHAIN_ID),chainName:'Ethereum',nativeCurrency:{name:'Ethereum',symbol:'ETH',decimals:18},rpcUrls:['https://mainnet.infura.io'],blockExplorerUrls:[EXPLORER_URL]};var MainnetNetwork={id:'mainnet',type:'Ethereum',meta:{chainId:MAINNET_CHAIN_ID,name:utils__WEBPACK_IMPORTED_MODULE_1__[/* isDevelopmentMode */ "e"]?'Ethereum':'Ethereum',logo:'mainnet-logo'},rpc:{httpsUrl:RPC_HTTPS_URL,wssUrl:RPC_WSS_URL,poolingInterval:networks_types__WEBPACK_IMPORTED_MODULE_2__[/* DEFAULT_RPC_POOLING_INTERVAL */ "a"]},explorer:{name:'Etherscan',key:EXPLORER_KEY,url:EXPLORER_URL,apiUrl:EXPLORER_API_URL},metamaskChain:MainnetMetamaskChain,config:MainnetConfig};

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ROPSTEN_CHAIN_ID */
/* unused harmony export RopstenConfig */
/* unused harmony export RopstenMetamaskChain */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RopstenNetwork; });
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web3_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var networks_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(323);
var RPC_KEY='f35c2a4f3d0941a38a3edb62ed10c847';var RPC_HTTPS_URL="https://ropsten.infura.io/v3/".concat(RPC_KEY);var RPC_WSS_URL="wss://ropsten.infura.io/ws/v3/".concat(RPC_KEY);var EXPLORER_KEY='4RSJUUZQFMXUAUUJP5FI5UR5U59N7UIA32';var EXPLORER_URL='https://ropsten.etherscan.io';var EXPLORER_API_URL='https://api-ropsten.etherscan.io';var ROPSTEN_CHAIN_ID=3;var RopstenConfig={title:'Swingby DAO',features:{yieldFarming:false,dao:true,smartYield:false,smartYieldReward:false,smartExposure:false,smartAlpha:false,gasFees:true,addBondToken:true,smartAlphaKPIOptions:false},wallets:{portisId:'b0b0f776-bbf6-458c-a175-6483e0c452b7',walletConnectBridge:'https://bridge.walletconnect.org',coinbaseAppName:'barnbridge',trezorEmail:'bogdan@barnbridge.com',trezorAppUrl:'https://app.barnbridge.com/'},api:{baseUrl:'https://dev-v2.api.barnbridge.com'},dao:{activationThreshold:400000},tokens:{wbtc:'0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',weth:'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',swingby:'0x02ce048c863b76ed7397f18da654475e123503ac',univ2:'0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',usdc:'0x4A69d0F05c8667B993eFC2b500014AE1bC8fD958',usdt:'0xdac17f958d2ee523a2206206994597c13d831ec7',susd:'0xED159a31184ADADC5c28CE5D9e4822ea2b0B6ef9',gusd:'0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',dai:'0xEa8BE82DF1519D4a25E2539bcA0342a1203CD591',rai:'',stkaave:'0x4da27a545c0c5b758a6ba100e3a049001de870f5',wmatic:'',ausdc:'0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0',ausdt:'0xFF3c8bc103682FA918c954E84F5056aB4DD5189d',agusd:'0xD37EE7e4f452C6638c96536e68090De8cBcdb583',adai:'0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8',bb_cusdc:'0x2327c862e8770e10f63eef470686ffd2684a0092',bb_cdai:'0xebf32075b5ee6e9aff265d3ec6c69a2b381b61b1',bb_ausdc:'0xEBc8cfd1A357BF0060f72871E96bEfaE5A629eCC',bb_ausdt:'0xe3d9c0ca18e6757e975b6f663811f207ec26c2b3',bb_agusd:'',bb_adai:'0xdfcb1c9d8209594cbc39745b274e9171ba4fd343',bb_crusdc:'0x378630f9e1968Aa76b299636A837E737fa476037',bb_crusdt:'',bb_crdai:''},feeds:{btc:'0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',eth:'0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',swingby:'0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',univ2:'0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',usdc:'0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',usdt:'0x4e58ab12d2051ea2068e78e4fcee7ddee6785848',susd:'0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757',dai:'0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',stkaave:'0x547a514d5e3769680Ce22B2361c10Ea13619e8a9',wmatic:'0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676'},contracts:{yf:{staking:'0x618bB8f9e76f2982B8783e6AA09bC930c65f0AC8',stable:'0xf865D61e3791ef6C202c62b79f42de3f9e9AC8b3',unilp:'0x4e600bd65AE29d12ab22EE0384bD472F24d7aEa6',swingby:'0x82B568C2E5159ba20358aF425E92ac96345c9C9a'},dao:{governance:'0xb7EAB16427009dae4e063cb723c6a1450C874996',barn:'0x9170f8d749dCF64467793325512a5e34B2B189Eb',reward:'0xbCED010B27DC675c46F2526D21e4f1b01EAc669F'},se:{ePoolPeriphery:'0x5fa08f7817844e38ee8f54a24b65f6dc1ae23785',ePoolHelper:'0xc1442ac5d2631bd9369b42b35bfe12b88ee8daaf'},sa:{loupe:'0xA408F3f26ebe1768512c9977108633CEF84c17a7'}}};var RopstenMetamaskChain={chainId:Object(web3_utils__WEBPACK_IMPORTED_MODULE_0__["toHex"])(ROPSTEN_CHAIN_ID),chainName:'Ropsten Testnet',nativeCurrency:{name:'Ethereum',symbol:'ETH',decimals:18},rpcUrls:['https://ropsten.infura.io'],blockExplorerUrls:[EXPLORER_URL]};var RopstenNetwork={id:'ropsten',type:'Ethereum',meta:{chainId:ROPSTEN_CHAIN_ID,name:'Ropsten',logo:'testnet-logo'},rpc:{httpsUrl:RPC_HTTPS_URL,wssUrl:RPC_WSS_URL,poolingInterval:networks_types__WEBPACK_IMPORTED_MODULE_1__[/* DEFAULT_RPC_POOLING_INTERVAL */ "a"]},explorer:{name:'Etherscan',key:EXPLORER_KEY,url:EXPLORER_URL,apiUrl:EXPLORER_API_URL},metamaskChain:RopstenMetamaskChain,config:RopstenConfig};

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ metamask_MetamaskConnector; });

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper.js + 2 modules
var createSuper = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@web3-react/injected-connector/dist/injected-connector.esm.js
var injected_connector_esm = __webpack_require__(324);

// EXTERNAL MODULE: ./node_modules/antd/es/notification/index.js + 11 modules
var notification = __webpack_require__(1378);

// CONCATENATED MODULE: ./src/resources/svg/wallets/metamask-logo-dark.svg
/* harmony default export */ var metamask_logo_dark = (__webpack_require__.p + "static/media/metamask-logo-dark.54270af6.svg");
// CONCATENATED MODULE: ./src/resources/svg/wallets/metamask-logo.svg
/* harmony default export */ var metamask_logo = (__webpack_require__.p + "static/media/metamask-logo.bfd66b2a.svg");
// CONCATENATED MODULE: ./src/wallets/connectors/metamask/index.ts
var metamask_MetamaskConnector=/*#__PURE__*/function(_InjectedConnector){Object(inherits["a" /* default */])(MetamaskConnector,_InjectedConnector);var _super=Object(createSuper["a" /* default */])(MetamaskConnector);function MetamaskConnector(){Object(classCallCheck["a" /* default */])(this,MetamaskConnector);return _super.apply(this,arguments);}Object(createClass["a" /* default */])(MetamaskConnector,[{key:"addChain",value:function addChain(){for(var _len=arguments.length,infos=new Array(_len),_key=0;_key<_len;_key++){infos[_key]=arguments[_key];}return this.getProvider().then(function(provider){return provider.request({method:'wallet_addEthereumChain',params:infos});});}},{key:"switchChain",value:function switchChain(info){return this.getProvider().then(function(provider){return provider.request({method:'wallet_switchEthereumChain',params:[info]});});}},{key:"addToken",value:function addToken(info){return this.getProvider().then(function(provider){return provider.request({method:'wallet_watchAsset',params:info});});}}]);return MetamaskConnector;}(injected_connector_esm["a" /* InjectedConnector */]);function handleErrors(error){switch(error===null||error===void 0?void 0:error.code){case-32602:notification["a" /* default */].error({message:error===null||error===void 0?void 0:error.message});break;default:break;}}var MetamaskWalletConfig={id:'metamask',logo:[metamask_logo,metamask_logo_dark],name:'MetaMask',factory:function factory(network){return new metamask_MetamaskConnector({supportedChainIds:[network.meta.chainId]});},onConnect:function onConnect(connector,args){connector===null||connector===void 0?void 0:connector.getProvider().then(function(provider){provider.addListener('send::error',handleErrors);});},onDisconnect:function onDisconnect(connector){connector===null||connector===void 0?void 0:connector.getProvider().then(function(provider){provider.removeListener('send::error',handleErrors);});},onError:function onError(error){switch(error===null||error===void 0?void 0:error.code){case-32002:return new Error('MetaMask is already processing. Please verify MetaMask extension.');default:break;}return undefined;}};/* harmony default export */ var metamask = __webpack_exports__["b"] = (MetamaskWalletConfig);

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"grid":"s_grid__2kvw7","row":"s_row__1gz8H","align-start":"s_align-start__1sRC3","align-self-start":"s_align-self-start__1VbT2","align-center":"s_align-center___MzKZ","align-self-center":"s_align-self-center__19HlO","align-end":"s_align-end__CBxEm","align-self-end":"s_align-self-end__k0yn7","justify-start":"s_justify-start__2114G","justify-self-start":"s_justify-self-start__3GZ8_","justify-center":"s_justify-center__wyiqU","justify-self-center":"s_justify-self-center__xFG-J","justify-end":"s_justify-end__3mNTL","justify-self-end":"s_justify-self-end__2x48R","justify-space-between":"s_justify-space-between__a9Kwe","justify-self-space-between":"s_justify-self-space-between__1iGg3","col":"s_col__1o9xC","row-gap-4":"s_row-gap-4__1YcdT","col-gap-4":"s_col-gap-4__fJKDo","row-gap-8":"s_row-gap-8__28-zk","col-gap-8":"s_col-gap-8__3rOGP","row-gap-12":"s_row-gap-12__y0t-j","col-gap-12":"s_col-gap-12__cjT8x","row-gap-16":"s_row-gap-16__5xZyQ","col-gap-16":"s_col-gap-16__Wn_7k","row-gap-24":"s_row-gap-24__RkUY1","col-gap-24":"s_col-gap-24__1Ouvk","row-gap-32":"s_row-gap-32__28ouf","col-gap-32":"s_col-gap-32__1idoB","row-gap-48":"s_row-gap-48__1rwkI","col-gap-48":"s_col-gap-48__1rU8v","row-gap-64":"s_row-gap-64__3yqmG","col-gap-64":"s_col-gap-64__3Qf4k"};

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export KnownTokens */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useKnownTokens; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(296);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(75);
/* harmony import */ var web3_erc20Contract__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(94);
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(68);
/* harmony import */ var web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(40);
/* harmony import */ var components_providers_configProvider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(49);
/* harmony import */ var components_providers_networkProvider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(54);
/* harmony import */ var components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(37);
/* harmony import */ var hooks_useReload__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(127);
/* harmony import */ var wallets_walletProvider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(80);
/* harmony import */ var _tokensProvider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(309);
/* harmony import */ var utils_context__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(62);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(71);
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(77);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__);
var KnownTokens;/* eslint-disable @typescript-eslint/no-redeclare */(function(KnownTokens){KnownTokens["ETH"]="ETH";KnownTokens["BTC"]="BTC";KnownTokens["WETH"]="WETH";KnownTokens["WBTC"]="WBTC";KnownTokens["SWINGBY"]="SWINGBY";KnownTokens["USDC"]="USDC";KnownTokens["DAI"]="DAI";KnownTokens["RAI"]="RAI";KnownTokens["SUSD"]="sUSD";KnownTokens["GUSD"]="GUSD";KnownTokens["UNIV2"]="UNI-V2";KnownTokens["USDT"]="USDT";KnownTokens["STK_AAVE"]="stkAAVE";KnownTokens["WMATIC"]="wMATIC";})(KnownTokens||(KnownTokens={}));(function(_KnownTokens){var bbcUSDC=_KnownTokens.bbcUSDC='bb_cUSDC';var bbcDAI=_KnownTokens.bbcDAI='bb_cDAI';var bbaUSDC=_KnownTokens.bbaUSDC='bb_aUSDC';var bbaDAI=_KnownTokens.bbaDAI='bb_aDAI';var bbaUSDT=_KnownTokens.bbaUSDT='bb_aUSDT';var bbaGUSD=_KnownTokens.bbaGUSD='bb_aGUSD';var bbcrUSDC=_KnownTokens.bbcrUSDC='bb_crUSDC';var bbcrDAI=_KnownTokens.bbcrDAI='bb_crDAI';var bbcrUSDT=_KnownTokens.bbcrUSDT='bb_crUSDT';})(KnownTokens||(KnownTokens={}));/* eslint-enable @typescript-eslint/no-redeclare */var Context=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_4__["createContext"])(Object(utils_context__WEBPACK_IMPORTED_MODULE_16__[/* InvariantContext */ "a"])('KnownTokensProvider'));/**
 * @deprecated
 */function useKnownTokens(){return Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(Context);}var PRICE_FEED_ABI=[Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('decimals',[],['int8']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('latestAnswer',[],['int256'])];var BOND_PRICE_FEED_ABI=[Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('decimals',[],['uint8']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('totalSupply',[],['uint256']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('getReserves',[],['uint112','uint112']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('token0',[],['address'])];var J_PRICE_FEED_ABI=[Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('price',[],['uint256'])];function getGusdPrice(){return _getGusdPrice.apply(this,arguments);}function _getGusdPrice(){_getGusdPrice=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee8(){var query,url,result;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee8$(_context8){while(1){switch(_context8.prev=_context8.next){case 0:query=Object(_utils_fetch__WEBPACK_IMPORTED_MODULE_18__[/* queryfy */ "b"])({ids:['gemini-dollar'],vs_currencies:'usd'});url=new URL("/api/v3/simple/price?".concat(query),'https://api.coingecko.com');_context8.next=4;return fetch(String(url)).then(function(response){return response.json();});case 4:result=_context8.sent;return _context8.abrupt("return",bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.from(result['gemini-dollar'].usd));case 6:case"end":return _context8.stop();}}},_callee8);}));return _getGusdPrice.apply(this,arguments);}function getRaiPrice(){return _getRaiPrice.apply(this,arguments);}function _getRaiPrice(){_getRaiPrice=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee9(){var query,url,result;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee9$(_context9){while(1){switch(_context9.prev=_context9.next){case 0:query=Object(_utils_fetch__WEBPACK_IMPORTED_MODULE_18__[/* queryfy */ "b"])({ids:['rai'],vs_currencies:'usd'});url=new URL("/api/v3/simple/price?".concat(query),'https://api.coingecko.com');_context9.next=4;return fetch(String(url)).then(function(response){return response.json();});case 4:result=_context9.sent;return _context9.abrupt("return",bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.from(result['rai'].usd));case 6:case"end":return _context9.stop();}}},_callee9);}));return _getRaiPrice.apply(this,arguments);}var KnownTokensProvider=function KnownTokensProvider(props){var children=props.children;var network=Object(components_providers_networkProvider__WEBPACK_IMPORTED_MODULE_11__[/* useNetwork */ "b"])();var config=Object(components_providers_configProvider__WEBPACK_IMPORTED_MODULE_10__[/* useConfig */ "b"])();var wallet=Object(wallets_walletProvider__WEBPACK_IMPORTED_MODULE_14__[/* useWallet */ "c"])();var web3=Object(components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* useWeb3 */ "d"])();var _useContractManager=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useContractManager */ "c"])(),getContract=_useContractManager.getContract;var _useReload=Object(hooks_useReload__WEBPACK_IMPORTED_MODULE_13__[/* useReload */ "a"])(),_useReload2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useReload,1),reload=_useReload2[0];var wbtcContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.wbtc);var wethContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.weth);var usdcContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.usdc);var swingbyContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.swingby);var usdtContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.usdt);var susdContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.susd);var gusdContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.gusd);var daiContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.dai);var raiContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.rai);var univ2Contract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.univ2);var stkaaveContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.stkaave);var wmaticContract=Object(web3_components_contractManagerProvider__WEBPACK_IMPORTED_MODULE_6__[/* useErc20Contract */ "d"])(config.tokens.wmatic);var tokens=Object(react__WEBPACK_IMPORTED_MODULE_4__["useMemo"])(function(){return[{symbol:KnownTokens.BTC,name:'BTC',address:'0x',decimals:0,icon:'wbtc',priceFeed:config.feeds.btc// BTC -> $
},{symbol:KnownTokens.WBTC,name:'Wrapped BTC',address:config.tokens.wbtc.toLowerCase(),decimals:8,icon:'wbtc',pricePath:[KnownTokens.BTC],contract:wbtcContract},{symbol:KnownTokens.ETH,name:'Ether',address:'0x',decimals:18,icon:'eth',priceFeed:config.feeds.eth// ETH -> $
},{symbol:KnownTokens.WETH,name:'Wrapped Ether',address:config.tokens.weth.toLowerCase(),decimals:18,icon:'weth',pricePath:[KnownTokens.ETH],contract:wethContract},{symbol:KnownTokens.USDC,name:'USD Coin',address:config.tokens.usdc.toLowerCase(),decimals:6,icon:'usdc',color:'#4f6ae5',priceFeed:config.feeds.usdc,// USDC -> $
contract:usdcContract},{symbol:KnownTokens.SWINGBY,name:'SWINGBY',address:config.tokens.swingby.toLowerCase(),decimals:18,icon:'bond',priceFeed:config.feeds.swingby,// BOND -> USDC
pricePath:[KnownTokens.USDC],contract:swingbyContract},{symbol:KnownTokens.USDT,name:'Tether USD',address:config.tokens.usdt.toLowerCase(),decimals:6,icon:'usdt',priceFeed:config.feeds.usdt,// USDT -> $
contract:usdtContract},{symbol:KnownTokens.SUSD,name:'Synth sUSD',address:config.tokens.susd.toLowerCase(),decimals:18,icon:'susd',color:'#1e1a31',priceFeed:config.feeds.susd,// sUSD -> ETH
pricePath:[KnownTokens.ETH],contract:susdContract},{symbol:KnownTokens.GUSD,name:'Gemini dollar',address:config.tokens.gusd.toLowerCase(),decimals:2,icon:'gusd',price:bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.ZERO,priceFeed:undefined,pricePath:undefined,contract:gusdContract},{symbol:KnownTokens.DAI,name:'Dai Stablecoin',address:config.tokens.dai.toLowerCase(),decimals:18,icon:'dai',color:'#ffd160',priceFeed:config.feeds.dai,// DAI -> $
contract:daiContract},{symbol:KnownTokens.RAI,name:'Rai Reflex Index',address:config.tokens.rai.toLowerCase(),decimals:18,icon:'rai',price:bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.ZERO,priceFeed:undefined,pricePath:undefined,contract:raiContract},{symbol:KnownTokens.UNIV2,name:'Uniswap V2',address:config.tokens.univ2.toLowerCase(),decimals:18,icon:'uniswap',priceFeed:config.feeds.univ2,// UNIV2 -> USDC
pricePath:[KnownTokens.USDC],contract:univ2Contract},{symbol:KnownTokens.STK_AAVE,name:'Staked AAVE',address:config.tokens.stkaave.toLowerCase(),decimals:18,icon:'stkaave',priceFeed:config.feeds.stkaave,// stkAAVE -> USD
pricePath:[],contract:stkaaveContract},{symbol:KnownTokens.WMATIC,name:'wMATIC',address:config.tokens.wmatic.toLowerCase(),decimals:18,icon:'wmatic',priceFeed:config.feeds.wmatic,// WMATIC -> USD
pricePath:[],contract:wmaticContract},{symbol:KnownTokens.bbcUSDC,name:'BarnBridge cUSDC',address:config.tokens.bb_cusdc.toLowerCase(),decimals:6,icon:'usdc',priceFeed:config.tokens.bb_cusdc,// bb_cUSDC -> USDC
pricePath:[KnownTokens.USDC]},{symbol:KnownTokens.bbcDAI,name:'BarnBridge cDAI',address:config.tokens.bb_cdai.toLowerCase(),decimals:18,icon:'dai',priceFeed:config.tokens.bb_cdai,// bb_cDAI -> DAI
pricePath:[KnownTokens.DAI]},{symbol:KnownTokens.bbaUSDC,name:'BarnBridge aUSDC',address:config.tokens.bb_ausdc.toLowerCase(),decimals:6,icon:'usdc',priceFeed:config.tokens.bb_ausdc,// bb_aUSDC -> USDC
pricePath:[KnownTokens.USDC]},{symbol:KnownTokens.bbaDAI,name:'BarnBridge aDAI',address:config.tokens.bb_adai.toLowerCase(),decimals:18,icon:'dai',priceFeed:config.tokens.bb_adai,// bb_aDAI -> DAI
pricePath:[KnownTokens.DAI]},{symbol:KnownTokens.bbaUSDT,name:'BarnBridge aUSDT',address:config.tokens.bb_ausdt.toLowerCase(),decimals:6,icon:'usdt',priceFeed:config.tokens.bb_ausdt,// bb_aUSDT -> USDT
pricePath:[KnownTokens.USDT]},{symbol:KnownTokens.bbaGUSD,name:'BarnBridge aGUSD',address:config.tokens.bb_agusd.toLowerCase(),decimals:2,icon:'gusd',priceFeed:config.tokens.bb_agusd,// bb_aGUSD -> GUSD
pricePath:[KnownTokens.GUSD]},{symbol:KnownTokens.bbcrUSDC,name:'BarnBridge crUSDC',address:config.tokens.bb_crusdc.toLowerCase(),decimals:6,icon:'usdc',priceFeed:config.tokens.bb_crusdc,// bb_crUSDC -> USDC
pricePath:[KnownTokens.USDC]},{symbol:KnownTokens.bbcrDAI,name:'BarnBridge crDAI',address:config.tokens.bb_crdai.toLowerCase(),decimals:18,icon:'dai',priceFeed:config.tokens.bb_crdai,// bb_crDAI -> DAI
pricePath:[KnownTokens.DAI]},{symbol:KnownTokens.bbcrUSDT,name:'BarnBridge crUSDT',address:config.tokens.bb_crusdt.toLowerCase(),decimals:6,icon:'usdt',priceFeed:config.tokens.bb_crusdt,// bb_crUSDT -> USDT
pricePath:[KnownTokens.USDT]}];},[]);var getTokenBySymbol=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function(symbol){var fSymbol=symbol;if(_utils__WEBPACK_IMPORTED_MODULE_17__[/* isDevelopmentMode */ "e"]){if(fSymbol==='bbcUSDC'){fSymbol=KnownTokens.bbcUSDC;}}return tokens.find(function(token){return token.symbol===fSymbol;});},[tokens]);var getTokenByAddress=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function(address){return tokens.find(function(token){return token.address.toLowerCase()===address.toLowerCase();});},[tokens]);var getTokenIconBySymbol=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function(symbol){var _foundToken;var foundToken;if(_utils__WEBPACK_IMPORTED_MODULE_17__[/* isDevelopmentMode */ "e"]&&symbol===KnownTokens.bbcUSDC){foundToken=tokens.find(function(token){return token.symbol==='bb_cUSDC';});}else{foundToken=tokens.find(function(token){return token.symbol===symbol;});}return((_foundToken=foundToken)===null||_foundToken===void 0?void 0:_foundToken.icon)||'unknown';},[tokens]);var getFeedPrice=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(/*#__PURE__*/function(){var _ref=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(symbol){var token,priceFeedContract,_yield$priceFeedContr,_yield$priceFeedContr2,decimals,latestAnswer;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:token=getTokenBySymbol(symbol);if(!(!token||!token.priceFeed)){_context.next=3;break;}return _context.abrupt("return",Promise.reject());case 3:priceFeedContract=getContract(token.priceFeed,function(){return new web3_erc20Contract__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"](PRICE_FEED_ABI,token.priceFeed);});priceFeedContract.setCallProvider(components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]);// TODO: Re-think about mainnet provider
_context.next=7;return priceFeedContract.batch([{method:'decimals',transform:Number},{method:'latestAnswer',transform:bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.parse}]);case 7:_yield$priceFeedContr=_context.sent;_yield$priceFeedContr2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_yield$priceFeedContr,2);decimals=_yield$priceFeedContr2[0];latestAnswer=_yield$priceFeedContr2[1];return _context.abrupt("return",latestAnswer.unscaleBy(decimals));case 12:case"end":return _context.stop();}}},_callee);}));return function(_x){return _ref.apply(this,arguments);};}(),[]);var getBondPrice=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(/*#__PURE__*/Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(){var usdcToken,bondToken,priceFeedContract,_yield$priceFeedContr3,_yield$priceFeedContr4,decimals,_yield$priceFeedContr5,reserve0,reserve1,token0,bond,usdc,bondReserve,usdcReserve;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:usdcToken=getTokenBySymbol(KnownTokens.USDC);bondToken=getTokenBySymbol(KnownTokens.SWINGBY);if(!(!usdcToken||!bondToken||!bondToken.priceFeed)){_context2.next=4;break;}return _context2.abrupt("return",Promise.reject());case 4:priceFeedContract=new web3_erc20Contract__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"](BOND_PRICE_FEED_ABI,bondToken.priceFeed);priceFeedContract.setCallProvider(web3.activeProvider);_context2.next=8;return priceFeedContract.batch([{method:'decimals',transform:Number},{method:'getReserves',transform:function transform(_ref3){var reserve0=_ref3[0],reserve1=_ref3[1];return[bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.parse(reserve0),bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.parse(reserve1)];}},{method:'token0',transform:function transform(value){return value.toLowerCase();}}]);case 8:_yield$priceFeedContr3=_context2.sent;_yield$priceFeedContr4=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_yield$priceFeedContr3,3);decimals=_yield$priceFeedContr4[0];_yield$priceFeedContr5=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_yield$priceFeedContr4[1],2);reserve0=_yield$priceFeedContr5[0];reserve1=_yield$priceFeedContr5[1];token0=_yield$priceFeedContr4[2];bond=token0===bondToken.address.toLowerCase()?reserve0:reserve1;usdc=token0===bondToken.address.toLowerCase()?reserve1:reserve0;bondReserve=bond.unscaleBy(decimals);usdcReserve=usdc.unscaleBy(usdcToken.decimals);return _context2.abrupt("return",usdcReserve.dividedBy(bondReserve));case 20:case"end":return _context2.stop();}}},_callee2);})),[getTokenBySymbol]);var getUniV2Price=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(/*#__PURE__*/Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(){var usdcToken,univ2Token,priceFeedContract,_yield$priceFeedContr6,_yield$priceFeedContr7,decimals,totalSupply,_yield$priceFeedContr8,reserve0,reserve1,token0,usdcAmount,usdcReserve,supply;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:usdcToken=getTokenBySymbol(KnownTokens.USDC);univ2Token=getTokenBySymbol(KnownTokens.UNIV2);if(!(!usdcToken||!univ2Token||!univ2Token.priceFeed)){_context3.next=4;break;}return _context3.abrupt("return",Promise.reject());case 4:priceFeedContract=new web3_erc20Contract__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"](BOND_PRICE_FEED_ABI,univ2Token.priceFeed);priceFeedContract.setCallProvider(web3.activeProvider);_context3.next=8;return priceFeedContract.batch([{method:'decimals',transform:Number},{method:'totalSupply',transform:bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.parse},{method:'getReserves',transform:function transform(_ref5){var reserve0=_ref5[0],reserve1=_ref5[1];return[bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.parse(reserve0),bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.parse(reserve1)];}},{method:'token0',transform:function transform(value){return value.toLowerCase();}}]);case 8:_yield$priceFeedContr6=_context3.sent;_yield$priceFeedContr7=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_yield$priceFeedContr6,4);decimals=_yield$priceFeedContr7[0];totalSupply=_yield$priceFeedContr7[1];_yield$priceFeedContr8=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_yield$priceFeedContr7[2],2);reserve0=_yield$priceFeedContr8[0];reserve1=_yield$priceFeedContr8[1];token0=_yield$priceFeedContr7[3];usdcAmount=token0===usdcToken.address.toLowerCase()?reserve0:reserve1;usdcReserve=usdcAmount.unscaleBy(usdcToken.decimals);supply=totalSupply.unscaleBy(decimals);return _context3.abrupt("return",usdcReserve.dividedBy(supply).multipliedBy(2));case 20:case"end":return _context3.stop();}}},_callee3);})),[getTokenBySymbol]);var getJTokenPrice=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(/*#__PURE__*/function(){var _ref6=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(symbol){var token,priceFeedContract,price;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:token=getTokenBySymbol(symbol);if(!(!token||!token.priceFeed)){_context4.next=3;break;}return _context4.abrupt("return",Promise.reject());case 3:priceFeedContract=new web3_erc20Contract__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"](J_PRICE_FEED_ABI,token.priceFeed);priceFeedContract.setCallProvider(web3.activeProvider);_context4.next=7;return priceFeedContract.call('price');case 7:price=_context4.sent;return _context4.abrupt("return",new bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a(price).dividedBy(1e18));case 9:case"end":return _context4.stop();}}},_callee4);}));return function(_x2){return _ref6.apply(this,arguments);};}(),[getTokenBySymbol]);var getJATokenPrice=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(/*#__PURE__*/function(){var _ref7=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5(symbol){var token,priceFeedContract,price;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:token=getTokenBySymbol(symbol);if(!(!token||!token.priceFeed)){_context5.next=3;break;}return _context5.abrupt("return",Promise.reject());case 3:priceFeedContract=new web3_erc20Contract__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"](J_PRICE_FEED_ABI,token.priceFeed);priceFeedContract.setCallProvider(components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]);// TODO: Re-think about mainnet provider
_context5.next=7;return priceFeedContract.call('price');case 7:price=_context5.sent;return _context5.abrupt("return",new bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a(price).dividedBy(1e18));case 9:case"end":return _context5.stop();}}},_callee5);}));return function(_x3){return _ref7.apply(this,arguments);};}(),[getTokenBySymbol]);var getTokenPrice=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function(symbol){var _getTokenBySymbol;return(_getTokenBySymbol=getTokenBySymbol(symbol))===null||_getTokenBySymbol===void 0?void 0:_getTokenBySymbol.price;},[getTokenBySymbol]);var getTokenPriceIn=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function(source,target){var sourcePrice=getTokenPrice(source);var targetPrice=getTokenPrice(target);if(!sourcePrice||!targetPrice){return undefined;}return sourcePrice.dividedBy(targetPrice);},[getTokenPrice]);var convertTokenIn=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function(amount,source,target){if(amount===undefined||amount===null){return undefined;}if(amount===0||bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.ZERO.eq(amount)){return bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.ZERO;}var bnAmount=new bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a(amount);if(bnAmount.isNaN()){return undefined;}if(source===target){return bnAmount;}var price=getTokenPriceIn(source,target);if(!price){return undefined;}return bnAmount.multipliedBy(price);},[getTokenPriceIn]);var convertTokenInUSD=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function(amount,source){return convertTokenIn(amount,source,KnownTokens.USDC);},[convertTokenIn]);var _useMemo=Object(react__WEBPACK_IMPORTED_MODULE_4__["useMemo"])(function(){return[getTokenBySymbol(KnownTokens.SWINGBY),getTokenBySymbol(KnownTokens.SWINGBY),getTokenBySymbol(KnownTokens.ETH),getTokenBySymbol(KnownTokens.DAI),getTokenBySymbol(KnownTokens.GUSD),getTokenBySymbol(KnownTokens.SUSD),getTokenBySymbol(KnownTokens.UNIV2),getTokenBySymbol(KnownTokens.USDC),getTokenBySymbol(KnownTokens.USDT)];},[getTokenBySymbol]),_useMemo2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useMemo,10),projectToken=_useMemo2[0],bondToken=_useMemo2[1],ethToken=_useMemo2[2],stkAaveToken=_useMemo2[3],daiToken=_useMemo2[4],gusdToken=_useMemo2[5],susdToken=_useMemo2[6],univ2Token=_useMemo2[7],usdcToken=_useMemo2[8],usdtToken=_useMemo2[9];Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function(){Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee7(){return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee7$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:_context7.next=2;return Promise.allSettled(tokens.map(/*#__PURE__*/function(){var _ref9=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee6(token){return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:_context6.t0=token.symbol;_context6.next=_context6.t0===KnownTokens.SWINGBY?3:_context6.t0===KnownTokens.UNIV2?7:_context6.t0===KnownTokens.bbcUSDC?11:_context6.t0===KnownTokens.bbcDAI?11:_context6.t0===KnownTokens.bbcrDAI?11:_context6.t0===KnownTokens.bbcrUSDC?11:_context6.t0===KnownTokens.bbcrUSDT?11:_context6.t0===KnownTokens.bbaDAI?15:_context6.t0===KnownTokens.bbaUSDC?15:_context6.t0===KnownTokens.bbaUSDT?15:_context6.t0===KnownTokens.bbaGUSD?15:_context6.t0===KnownTokens.GUSD?19:_context6.t0===KnownTokens.RAI?23:27;break;case 3:_context6.next=5;return getBondPrice();case 5:token.price=_context6.sent;return _context6.abrupt("break",31);case 7:_context6.next=9;return getUniV2Price();case 9:token.price=_context6.sent;return _context6.abrupt("break",31);case 11:_context6.next=13;return getJTokenPrice(token.symbol);case 13:token.price=_context6.sent;return _context6.abrupt("break",31);case 15:_context6.next=17;return getJATokenPrice(token.symbol);case 17:token.price=_context6.sent;return _context6.abrupt("break",31);case 19:_context6.next=21;return getGusdPrice();case 21:token.price=_context6.sent;return _context6.abrupt("break",31);case 23:_context6.next=25;return getRaiPrice();case 25:token.price=_context6.sent;return _context6.abrupt("break",31);case 27:_context6.next=29;return getFeedPrice(token.symbol);case 29:token.price=_context6.sent;return _context6.abrupt("break",31);case 31:case"end":return _context6.stop();}}},_callee6);}));return function(_x4){return _ref9.apply(this,arguments);};}()));case 2:tokens.forEach(function(token){if(token.priceFeed&&token.price===undefined){token.price=bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.ZERO;}else if(token.pricePath){var _iterator=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(token.pricePath),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var _token$price$multipli,_token$price;var path=_step.value;var tk=getTokenBySymbol(path);if(!tk||!tk.price){token.price=undefined;break;}token.price=(_token$price$multipli=(_token$price=token.price)===null||_token$price===void 0?void 0:_token$price.multipliedBy(tk.price))!==null&&_token$price$multipli!==void 0?_token$price$multipli:tk.price;}}catch(err){_iterator.e(err);}finally{_iterator.f();}}console.log("[Token Price] ".concat(token.symbol," = ").concat(Object(web3_utils__WEBPACK_IMPORTED_MODULE_8__[/* formatUSD */ "c"])(token.price)));});reload();case 4:case"end":return _context7.stop();}}},_callee7);}))();},[getBondPrice,getFeedPrice,getJATokenPrice,getJTokenPrice,getTokenBySymbol,getUniV2Price,reload,tokens]);Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function(){if(projectToken===null||projectToken===void 0?void 0:projectToken.contract){projectToken.contract.loadCommon().catch(Error);}},[projectToken]);Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function(){if((projectToken===null||projectToken===void 0?void 0:projectToken.contract)&&wallet.account){projectToken.contract.loadBalance().then(reload);}},[projectToken,reload,wallet.account]);var value={tokens:tokens,projectToken:projectToken,bondToken:bondToken,ethToken:ethToken,stkAaveToken:stkAaveToken,daiToken:daiToken,gusdToken:gusdToken,susdToken:susdToken,univ2Token:univ2Token,usdcToken:usdcToken,usdtToken:usdtToken,getTokenBySymbol:getTokenBySymbol,getTokenByAddress:getTokenByAddress,getTokenIconBySymbol:getTokenIconBySymbol,getTokenPriceIn:getTokenPriceIn,convertTokenIn:convertTokenIn,convertTokenInUSD:convertTokenInUSD};return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__["jsx"])(Context.Provider,{value:value,children:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__["jsx"])(_tokensProvider__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"],{children:children})});};/* harmony default export */ __webpack_exports__["a"] = (KnownTokensProvider);

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"n":"s_n__z_Fz2","toast":"s_toast__2RERX","close":"s_close__gLYPU","time":"s_time__2A8pV"};

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"badge":"s_badge__2EUir","green":"s_green__2V3DG","red":"s_red__1OUcg","blue":"s_blue__2spcL","purple":"s_purple__2szXV","small":"s_small__2Goy6","medium":"s_medium__1Nz0o","large":"s_large__1UQhe","squareBadge":"s_squareBadge__3d658"};

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_popover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(629);
/* harmony import */ var antd_lib_popover__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_popover__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(425);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
var _excluded=["noPadding","children","className"];var Popover=function Popover(props){var noPadding=props.noPadding,children=props.children,className=props.className,popoverProps=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props,_excluded);return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])(antd_lib_popover__WEBPACK_IMPORTED_MODULE_3___default.a,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({overlayClassName:classnames__WEBPACK_IMPORTED_MODULE_4___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.overlay,className,noPadding&&_s_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.noPadding),trigger:"click",placement:"bottom"},popoverProps),{},{children:children}));};/* harmony default export */ __webpack_exports__["a"] = (Popover);

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
/* harmony import */ var _gnosis_pm_safe_apps_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(644);
/* harmony import */ var _gnosis_pm_safe_apps_provider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_gnosis_pm_safe_apps_provider__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _gnosis_pm_safe_apps_sdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(414);
/* harmony import */ var _gnosis_pm_safe_apps_sdk__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_gnosis_pm_safe_apps_sdk__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _web3_react_abstract_connector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(93);
var GnosisAppsSDK=new _gnosis_pm_safe_apps_sdk__WEBPACK_IMPORTED_MODULE_5___default.a({// whitelistedDomains: [/gnosis-safe\\.io/],
});var GnosisSafeConnector=/*#__PURE__*/function(_AbstractConnector){Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(GnosisSafeConnector,_AbstractConnector);var _super=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(GnosisSafeConnector);function GnosisSafeConnector(){var _this;Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this,GnosisSafeConnector);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=_super.call.apply(_super,[this].concat(args));_this._provider=void 0;_this._chainId=void 0;_this._account=void 0;return _this;}Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(GnosisSafeConnector,[{key:"activate",value:function activate(){var _this2=this;return GnosisAppsSDK.safe.getInfo().then(function(safe){var _this2$_provider;_this2._provider=new _gnosis_pm_safe_apps_provider__WEBPACK_IMPORTED_MODULE_4__["SafeAppProvider"](safe,GnosisAppsSDK);_this2._chainId=(_this2$_provider=_this2._provider)===null||_this2$_provider===void 0?void 0:_this2$_provider.chainId;_this2._account=safe.safeAddress;return{provider:_this2._provider,chainId:_this2._chainId,account:_this2._account};});}},{key:"deactivate",value:function deactivate(){var _this$_provider;(_this$_provider=this._provider)===null||_this$_provider===void 0?void 0:_this$_provider.disconnect();this._provider=undefined;this._chainId=undefined;this._account=undefined;}},{key:"getProvider",value:function getProvider(){return this._provider?Promise.resolve(this._provider):Promise.reject();}},{key:"getChainId",value:function getChainId(){return this._chainId?Promise.resolve(this._chainId):Promise.reject();}},{key:"getAccount",value:function getAccount(){return this._account?Promise.resolve(this._account):Promise.reject();}}]);return GnosisSafeConnector;}(_web3_react_abstract_connector__WEBPACK_IMPORTED_MODULE_6__[/* AbstractConnector */ "a"]);var GnosisSafeConfig={id:'gnosis-safe',logo:['',''],name:'Gnosis Safe',factory:function factory(){return new GnosisSafeConnector();}};/* harmony default export */ __webpack_exports__["a"] = (GnosisSafeConfig);

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var identicon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(651);
/* harmony import */ var identicon_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(identicon_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(652);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
var EMPTY_ADDRESS='000000000000000';var Identicon=function Identicon(props){var _props$address=props.address,address=_props$address===void 0?EMPTY_ADDRESS:_props$address,className=props.className,_props$width=props.width,width=_props$width===void 0?24:_props$width,_props$height=props.height,height=_props$height===void 0?24:_props$height,alt=props.alt;var icon=react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function(){return new identicon_js__WEBPACK_IMPORTED_MODULE_2___default.a(address,{format:'svg'}).toString();},[address]);return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("img",{className:classnames__WEBPACK_IMPORTED_MODULE_1___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.component,className),src:"data:image/svg+xml;base64,".concat(icon),alt:alt!==null&&alt!==void 0?alt:address,width:width,height:height});};/* harmony default export */ __webpack_exports__["a"] = (Identicon);

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"wrap":"s_wrap__3dITN","aside":"s_aside__3wngp","expanded":"s_expanded__29TAL","logoLabel":"s_logoLabel__3WxJ8","btnContent":"s_btnContent__3Ox7o","open":"s_open__11wDJ","logoContainer":"s_logoContainer__3z9mD","logo":"s_logo__1p_LE","button":"s_button__23flO","active":"s_active__32LsS","btnLabel":"s_btnLabel__1K6ZY","btnText":"s_btnText__2Rwnh","top":"s_top__3clKU","bottom":"s_bottom__2Bbro","mask":"s_mask__2hRax","closeButton":"s_closeButton__1ZIB6"};

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Tokens */
/* unused harmony export ProjectToken */
/* unused harmony export Assets */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useTokens; });
/* unused harmony export isEthAsset */
/* unused harmony export isUsdAsset */
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var web3_erc20Contract__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94);
/* harmony import */ var web3_web3Contract__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(40);
/* harmony import */ var components_providers_networkProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(54);
/* harmony import */ var hooks_useReload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(127);
/* harmony import */ var networks_mainnet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(147);
/* harmony import */ var networks_ropsten__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(164);
/* harmony import */ var _web3Provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(37);
/* harmony import */ var utils_context__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(62);
/* harmony import */ var utils_fetch__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(77);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__);
// import { ArbitrumNetwork } from 'networks/arbitrum';
// import { ArbitrumTestnetNetwork } from 'networks/arbitrum-testnet';
// import { AvalancheNetwork } from 'networks/avalanche';
// import { AvalancheTestnetNetwork } from 'networks/avalanche-testnet';
// import { BinanceNetwork } from 'networks/binance';
// import { BinanceTestnetNetwork } from 'networks/binance-testnet';
// import { KovanNetwork } from 'networks/kovan';
// import { PolygonNetwork } from 'networks/polygon';
// import { TestnetNetwork } from 'networks/testnet';
var Tokens;(function(Tokens){Tokens["WBTC"]="WBTC";Tokens["WETH"]="WETH";Tokens["USDC"]="USDC";Tokens["USDT"]="USDT";Tokens["SUSD"]="sUSD";Tokens["GUSD"]="GUSD";Tokens["DAI"]="DAI";Tokens["RAI"]="RAI";Tokens["STK_AAVE"]="stkAAVE";Tokens["WMATIC"]="WMATIC";Tokens["WAVAX"]="WAVAX";Tokens["BOND"]="BOND";Tokens["UNIV2"]="UNI-V2";Tokens["BTC"]="BTC";Tokens["USD"]="USD";Tokens["XSUSHI"]="xSUSHI";Tokens["SUSHI"]="SUSHI";Tokens["LINK"]="LINK";Tokens["UNI"]="UNI";Tokens["FEI"]="FEI";Tokens["BNB"]="BNB";Tokens["CAKE"]="CAKE";Tokens["AAVE"]="AAVE";Tokens["DPI"]="DPI";})(Tokens||(Tokens={}));var WBTC={// address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
symbol:Tokens.WBTC,name:'Wrapped BTC',decimals:8,icon:'wbtc'};var WETH={// address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
symbol:Tokens.WETH,name:'Wrapped Ether',decimals:18,icon:'weth'};var USDC={// address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
symbol:Tokens.USDC,name:'USD Coin',decimals:6,icon:'usdc'};var USDT={// address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
symbol:Tokens.USDT,name:'Tether USD',decimals:6,icon:'usdt'};var SUSD={// address: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
symbol:Tokens.SUSD,name:'Synth sUSD',decimals:18,icon:'susd'};var GUSD={// address: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
symbol:Tokens.GUSD,name:'Gemini dollar',decimals:2,icon:'gusd'};var DAI={// address: '0x6b175474e89094c44da98b954eedeac495271d0f',
symbol:Tokens.DAI,name:'Dai Stablecoin',decimals:18,icon:'dai'};var RAI={// address: '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919',
symbol:Tokens.RAI,name:'Rai Reflex Index',decimals:18,icon:'rai'};var AAVE={// address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
symbol:Tokens.AAVE,name:'Aave',decimals:18,icon:'aave'};var STK_AAVE={// address: '0x4da27a545c0c5b758a6ba100e3a049001de870f5',
symbol:Tokens.STK_AAVE,name:'Staked Aave',decimals:18,icon:'stkaave'};var MATIC={// address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
symbol:Tokens.WMATIC,name:'Polygon (MATIC)',decimals:18,icon:'wmatic'};var WAVAX={// address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
symbol:Tokens.WAVAX,name:'Avalanche',decimals:18,icon:'wavax'};var BOND={// address: '0x0391d2021f89dc339f60fff84546ea23e337750f',
symbol:Tokens.BOND,name:'BarnBridge Governance Token',decimals:18,icon:'bond'};var UNIV2={// address: '0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244',
symbol:Tokens.UNIV2,name:'Uniswap V2',decimals:18,icon:'uniswap'};var SUSHI={// address: '0x8798249c2e607446efb7ad49ec89dd1865ff4272',
symbol:Tokens.SUSHI,name:'SUSHI',decimals:18,icon:'sushi'};var XSUSHI={// address: '0x8798249c2e607446efb7ad49ec89dd1865ff4272',
symbol:Tokens.XSUSHI,name:'xSUSHI',decimals:18,icon:'xsushi'};var LINK={// address: '0x514910771af9ca656af840dff83e8264ecf986ca',
symbol:Tokens.LINK,name:'Chainlink',decimals:18,icon:'link'};var UNI={// address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
symbol:Tokens.UNI,name:'Uniswap',decimals:18,icon:'uni'};var FEI={// address: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
symbol:Tokens.FEI,name:'Fei Protocol',decimals:18,icon:'fei'};var BNB={symbol:Tokens.BNB,name:'Binance Coin',decimals:18,icon:'bnb'};var CAKE={symbol:Tokens.CAKE,name:'PancakeSwap',decimals:18,icon:'cake'};var DPI={symbol:Tokens.DPI,name:'DeFiPulse Index',decimals:18,icon:'dpi'};var ProjectToken=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({},BOND),{},{address:'0x0391d2021f89dc339f60fff84546ea23e337750f'});var Assets;(function(Assets){Assets["BTC"]="BTC";Assets["ETH"]="ETH";Assets["USD"]="USD";})(Assets||(Assets={}));var BTC={symbol:Assets.BTC,decimals:WBTC.decimals,icon:'wbtc'};var ETH={symbol:Assets.ETH,decimals:WETH.decimals,icon:'eth'};var USD={symbol:Assets.USD,decimals:2,icon:'usd'};var Context=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_4__["createContext"])(Object(utils_context__WEBPACK_IMPORTED_MODULE_13__[/* InvariantContext */ "a"])('TokensProvider'));function useTokens(){return Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(Context);}var CHAINLINK_PRICE_FEED_ABI=[Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_7__[/* createAbiItem */ "b"])('decimals',[],['int8']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_7__[/* createAbiItem */ "b"])('latestAnswer',[],['int256'])];var UNISWAP_V2_BOND_USDC_ABI=[Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_7__[/* createAbiItem */ "b"])('totalSupply',[],['uint256']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_7__[/* createAbiItem */ "b"])('getReserves',[],['uint112','uint112'])];function getChainlinkFeedPrice(_x){return _getChainlinkFeedPrice.apply(this,arguments);}function _getChainlinkFeedPrice(){_getChainlinkFeedPrice=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(feedAddress){var provider,contract,_yield$contract$batch,_yield$contract$batch2,decimals,latestAnswer,_args4=arguments;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:provider=_args4.length>1&&_args4[1]!==undefined?_args4[1]:_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"];contract=new web3_erc20Contract__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"](CHAINLINK_PRICE_FEED_ABI,feedAddress);contract.setCallProvider(provider);_context4.next=5;return contract.batch([{method:'decimals',transform:Number},{method:'latestAnswer',transform:bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.from}]);case 5:_yield$contract$batch=_context4.sent;_yield$contract$batch2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_yield$contract$batch,2);decimals=_yield$contract$batch2[0];latestAnswer=_yield$contract$batch2[1];return _context4.abrupt("return",latestAnswer===null||latestAnswer===void 0?void 0:latestAnswer.unscaleBy(decimals));case 10:case"end":return _context4.stop();}}},_callee4);}));return _getChainlinkFeedPrice.apply(this,arguments);}function getGeckoPrice(_x2){return _getGeckoPrice.apply(this,arguments);}function _getGeckoPrice(){_getGeckoPrice=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(symbol){var query,url,result;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:query=Object(utils_fetch__WEBPACK_IMPORTED_MODULE_14__[/* queryfy */ "b"])({ids:[symbol],vs_currencies:'usd'});url=new URL("/api/v3/simple/price?".concat(query),'https://api.coingecko.com');_context5.next=4;return fetch(String(url)).then(function(response){return response.json();});case 4:result=_context5.sent;return _context5.abrupt("return",bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.from(result[symbol].usd));case 6:case"end":return _context5.stop();}}},_callee5);}));return _getGeckoPrice.apply(this,arguments);}function getBondPrice(_x3){return _getBondPrice.apply(this,arguments);}function _getBondPrice(){_getBondPrice=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(poolAddress){var contract,_yield$contract$batch3,_yield$contract$batch4,_yield$contract$batch5,reserve0,reserve1,bondReserve,usdcReserve;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:contract=new web3_erc20Contract__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"](UNISWAP_V2_BOND_USDC_ABI,poolAddress);contract.setCallProvider(_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]);_context6.next=4;return contract.batch([{method:'getReserves',transform:function transform(_ref6){var reserve0=_ref6[0],reserve1=_ref6[1];return[bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.from(reserve0),bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.from(reserve1)];}}]);case 4:_yield$contract$batch3=_context6.sent;_yield$contract$batch4=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_yield$contract$batch3,1);_yield$contract$batch5=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_yield$contract$batch4[0],2);reserve0=_yield$contract$batch5[0];reserve1=_yield$contract$batch5[1];bondReserve=reserve0.unscaleBy(18);usdcReserve=reserve1.unscaleBy(6);return _context6.abrupt("return",usdcReserve===null||usdcReserve===void 0?void 0:usdcReserve.dividedBy(bondReserve));case 12:case"end":return _context6.stop();}}},_callee6);}));return _getBondPrice.apply(this,arguments);}function getUniV2Price(_x4){return _getUniV2Price.apply(this,arguments);}function _getUniV2Price(){_getUniV2Price=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(poolAddress){var contract,_yield$contract$batch6,_yield$contract$batch7,reserve1,totalSupply,usdcReserve,supply;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:contract=new web3_erc20Contract__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"](UNISWAP_V2_BOND_USDC_ABI,poolAddress);contract.setCallProvider(_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]);_context7.next=4;return contract.batch([{method:'getReserves',transform:function transform(_ref7){var reserve1=_ref7[1];return bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.from(reserve1);}},{method:'totalSupply',transform:bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a.from}]);case 4:_yield$contract$batch6=_context7.sent;_yield$contract$batch7=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_yield$contract$batch6,2);reserve1=_yield$contract$batch7[0];totalSupply=_yield$contract$batch7[1];usdcReserve=reserve1.unscaleBy(6);supply=totalSupply.unscaleBy(18);return _context7.abrupt("return",usdcReserve===null||usdcReserve===void 0?void 0:usdcReserve.dividedBy(supply).multipliedBy(2));case 11:case"end":return _context7.stop();}}},_callee7);}));return _getUniV2Price.apply(this,arguments);}function getPriceFor(_x5){return _getPriceFor.apply(this,arguments);}function _getPriceFor(){_getPriceFor=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(symbol){var network,_args8=arguments;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8){while(1){switch(_context8.prev=_context8.next){case 0:network=_args8.length>1&&_args8[1]!==undefined?_args8[1]:networks_mainnet__WEBPACK_IMPORTED_MODULE_10__[/* MainnetNetwork */ "a"];if(!(symbol.toUpperCase()==='USD')){_context8.next=3;break;}return _context8.abrupt("return",new bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a(1));case 3:if(!(network===networks_mainnet__WEBPACK_IMPORTED_MODULE_10__[/* MainnetNetwork */ "a"]||network===networks_ropsten__WEBPACK_IMPORTED_MODULE_11__[/* RopstenNetwork */ "a"])){_context8.next=29;break;}_context8.t0=symbol.toUpperCase();_context8.next=_context8.t0==='BTC'?7:_context8.t0==='WBTC'?7:_context8.t0==='ETH'?8:_context8.t0==='WETH'?8:_context8.t0==='USDC'?9:_context8.t0==='USDT'?10:_context8.t0==='SUSD'?11:_context8.t0==='DAI'?12:_context8.t0==='AAVE'?13:_context8.t0==='STKAAVE'?13:_context8.t0==='MATIC'?14:_context8.t0==='WMATIC'?14:_context8.t0==='AVAX'?15:_context8.t0==='WAVAX'?15:_context8.t0==='LINK'?16:_context8.t0==='UNI'?17:_context8.t0==='FEI'?18:_context8.t0==='BNB'?19:_context8.t0==='DPI'?20:_context8.t0==='GUSD'?21:_context8.t0==='RAI'?22:_context8.t0==='CAKE'?23:_context8.t0==='XSUSHI'?24:_context8.t0==='SUSHI'?25:_context8.t0==='BOND'?26:_context8.t0==='UNI-V2'?27:28;break;case 7:return _context8.abrupt("return",getChainlinkFeedPrice('0xf4030086522a5beea4988f8ca5b36dbc97bee88c',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 8:return _context8.abrupt("return",getChainlinkFeedPrice('0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 9:return _context8.abrupt("return",getChainlinkFeedPrice('0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 10:return _context8.abrupt("return",getChainlinkFeedPrice('0x3e7d1eab13ad0104d2750b8863b489d65364e32d',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 11:return _context8.abrupt("return",getChainlinkFeedPrice('0xad35bd71b9afe6e4bdc266b345c198eadef9ad94',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 12:return _context8.abrupt("return",getChainlinkFeedPrice('0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 13:return _context8.abrupt("return",getChainlinkFeedPrice('0x547a514d5e3769680ce22b2361c10ea13619e8a9',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 14:return _context8.abrupt("return",getChainlinkFeedPrice('0x7bac85a8a13a4bcd8abb3eb7d6b4d632c5a57676',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 15:return _context8.abrupt("return",getChainlinkFeedPrice('0xff3eeb22b5e3de6e705b44749c2559d704923fd7',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 16:return _context8.abrupt("return",getChainlinkFeedPrice('0x2c1d072e956affc0d435cb7ac38ef18d24d9127c',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 17:return _context8.abrupt("return",getChainlinkFeedPrice('0x553303d460ee0afb37edff9be42922d8ff63220e',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 18:return _context8.abrupt("return",getChainlinkFeedPrice('0x31e0a88fecb6ec0a411dbe0e9e76391498296ee9',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 19:return _context8.abrupt("return",getChainlinkFeedPrice('0x14e613ac84a31f709eadbdf89c6cc390fdc9540a',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 20:return _context8.abrupt("return",getChainlinkFeedPrice('0x68f1b8317c19ff02fb68a8476c1d3f9fc5139c0a',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 21:return _context8.abrupt("return",getGeckoPrice('gemini-dollar'));case 22:return _context8.abrupt("return",getGeckoPrice('rai'));case 23:return _context8.abrupt("return",getGeckoPrice('pancakeswap-token'));case 24:return _context8.abrupt("return",getGeckoPrice('xsushi'));case 25:return _context8.abrupt("return",getChainlinkFeedPrice('0x7213536a36094cd8a768a5e45203ec286cba2d74',_web3Provider__WEBPACK_IMPORTED_MODULE_12__[/* MainnetHttpsWeb3Provider */ "a"]));case 26:return _context8.abrupt("return",getBondPrice('0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244'));case 27:return _context8.abrupt("return",getUniV2Price('0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244'));case 28:return _context8.abrupt("return",undefined);case 29:return _context8.abrupt("return",undefined);case 30:case"end":return _context8.stop();}}},_callee8);}));return _getPriceFor.apply(this,arguments);}var ALL_TOKENS=[WBTC,WETH,USDC,USDT,SUSD,GUSD,DAI,RAI,AAVE,STK_AAVE,MATIC,WAVAX,BOND,UNIV2,XSUSHI,SUSHI,LINK,UNI,BNB,CAKE,FEI,DPI];var ALL_ASSETS=[BTC,ETH,USD];var TokensProvider=function TokensProvider(props){var children=props.children;var _useNetwork=Object(components_providers_networkProvider__WEBPACK_IMPORTED_MODULE_8__[/* useNetwork */ "b"])(),activeNetwork=_useNetwork.activeNetwork;var _useReload=Object(hooks_useReload__WEBPACK_IMPORTED_MODULE_9__[/* useReload */ "a"])(),_useReload2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_useReload,2),reload=_useReload2[0],version=_useReload2[1];var tokensRef=Object(react__WEBPACK_IMPORTED_MODULE_4__["useRef"])(new Map());var assetsRef=Object(react__WEBPACK_IMPORTED_MODULE_4__["useRef"])(new Map());Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function(){var promises=ALL_TOKENS.map(/*#__PURE__*/function(){var _ref=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(token){var newToken;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;newToken=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({},token);tokensRef.current.set(token.symbol.toUpperCase(),newToken);_context.next=5;return getPriceFor(token.symbol,activeNetwork);case 5:newToken.price=_context.sent;reload();_context.next=12;break;case 9:_context.prev=9;_context.t0=_context["catch"](0);console.error(_context.t0);case 12:case"end":return _context.stop();}}},_callee,null,[[0,9]]);}));return function(_x6){return _ref.apply(this,arguments);};}());ALL_ASSETS.forEach(/*#__PURE__*/function(){var _ref2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(asset){var newAsset;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.prev=0;newAsset=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({},asset);assetsRef.current.set(asset.symbol.toUpperCase(),newAsset);_context2.next=5;return getPriceFor(asset.symbol,activeNetwork);case 5:newAsset.price=_context2.sent;reload();_context2.next=12;break;case 9:_context2.prev=9;_context2.t0=_context2["catch"](0);console.error(_context2.t0);case 12:case"end":return _context2.stop();}}},_callee2,null,[[0,9]]);}));return function(_x7){return _ref2.apply(this,arguments);};}());Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(){var usdcToken,usdcPrice;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.next=2;return Promise.all(promises);case 2:usdcToken=tokensRef.current.get(Tokens.USDC);if(usdcToken&&usdcToken.price){usdcPrice=usdcToken.price;// convert USDC -> USD
[Tokens.BOND,Tokens.UNIV2].forEach(function(symbol){var token=tokensRef.current.get(symbol);if(token){var _token$price;token.price=(_token$price=token.price)===null||_token$price===void 0?void 0:_token$price.multipliedBy(usdcPrice);}});}Array.from(tokensRef.current).forEach(function(_ref4){var _t$price$toFixed,_t$price;var _ref5=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref4,2),k=_ref5[0],t=_ref5[1];console.log("[New Token Price] ".concat(t.symbol," = $").concat((_t$price$toFixed=(_t$price=t.price)===null||_t$price===void 0?void 0:_t$price.toFixed(3))!==null&&_t$price$toFixed!==void 0?_t$price$toFixed:'-'));});case 5:case"end":return _context3.stop();}}},_callee3);}))();},[]);var getToken=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function(symbol){var network=arguments.length>1&&arguments[1]!==undefined?arguments[1]:activeNetwork;return symbol?tokensRef.current.get(symbol.toUpperCase()):undefined;},[]);var getAsset=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function(symbol){return symbol?assetsRef.current.get(symbol.toUpperCase()):undefined;},[]);var getAmountInUSD=Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function(amount,source,network){if(!amount||!source){return undefined;}var token=getToken(source,network);if(!token||!token.price){return undefined;}return amount.multipliedBy(token.price);},[]);var value={version:version,getToken:getToken,getAsset:getAsset,getAmountInUSD:getAmountInUSD};return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__["jsx"])(Context.Provider,{value:value,children:children});};/* harmony default export */ __webpack_exports__["a"] = (TokensProvider);/** @deprecated */function isEthAsset(symbol){return symbol.toUpperCase()==='ETH';}/** @deprecated */function isUsdAsset(symbol){return symbol.toUpperCase()==='USD';}

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Badge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SquareBadge; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(222);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
var _excluded=["color","size","children","className"],_excluded2=["children","className","color"];var Badge=function Badge(_ref){var _ref$color=_ref.color,color=_ref$color===void 0?'grey':_ref$color,_ref$size=_ref.size,size=_ref$size===void 0?'medium':_ref$size,children=_ref.children,className=_ref.className,rest=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref,_excluded);if(!children)return null;return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__["jsx"])("div",Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({className:classnames__WEBPACK_IMPORTED_MODULE_3___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.badge,className,_s_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a[color],_s_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a[size])},rest),{},{children:children}));};var SquareBadge=function SquareBadge(_ref2){var children=_ref2.children,className=_ref2.className,_ref2$color=_ref2.color,color=_ref2$color===void 0?'grey':_ref2$color,rest=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref2,_excluded2);if(!children)return null;return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__["jsx"])("div",Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({className:classnames__WEBPACK_IMPORTED_MODULE_3___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.squareBadge,_s_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a[color],className)},rest),{},{children:children}));};

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_RPC_POOLING_INTERVAL; });
var DEFAULT_RPC_POOLING_INTERVAL=12000;

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"component":"s_component__1KdqM","select":"s_select__1yB_R","light":"s_light__2lM1U"};

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"component":"s_component__7Beq7","dropdown":"s_dropdown__3b64J","option":"s_option__2nbnD"};

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"warning":"s_warning__3SFqN","text":"s_text__2nLiY","closeIcon":"s_closeIcon__1MDw3"};

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Icon; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(418);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
var _excluded=["name","size","rotate","color","className","style"];var staticNamesList=['menu-faucet','menu-yf','menu-dao','menu-sy','menu-sa','menu-se','menu-docs','menu-theme-light','menu-theme-dark','menu-theme-auto'];var Icon=function Icon(props){var name=props.name,_props$size=props.size,size=_props$size===void 0?24:_props$size,_props$rotate=props.rotate,rotate=_props$rotate===void 0?0:_props$rotate,color=props.color,className=props.className,_props$style=props.style,style=_props$style===void 0?{}:_props$style,rest=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(props,_excluded);return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__["jsx"])("svg",Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({className:classnames__WEBPACK_IMPORTED_MODULE_3___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.component,className,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({},_s_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a["color-".concat(color)],Boolean(color))),width:size,height:size,style:Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({},rotate%360!==0?{transform:"rotate(".concat(rotate,"deg)")}:{}),style)},rest),{},{children:staticNamesList.includes(name)?/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__["jsx"])("use",{href:"#icon__".concat(name)}):/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__["jsx"])("use",{href:"".concat("","/icons-sprite.svg#icon__").concat(name)})}));};

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ MainnetHttpsWeb3Provider; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ WEB3_ERROR_VALUE; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ useWeb3; });

// UNUSED EXPORTS: RopstenHttpsWeb3Provider

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(12);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/web3/lib/index.js
var lib = __webpack_require__(109);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/wolfy87-eventemitter/EventEmitter.js
var EventEmitter = __webpack_require__(219);
var EventEmitter_default = /*#__PURE__*/__webpack_require__.n(EventEmitter);

// EXTERNAL MODULE: ./src/components/custom/icon/index.tsx + 1 modules
var icon = __webpack_require__(69);

// EXTERNAL MODULE: ./src/components/custom/typography/index.tsx
var typography = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(53);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(7);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./src/components/icon/index.tsx
var components_icon = __webpack_require__(35);

// EXTERNAL MODULE: ./src/components/modal/s.module.scss
var s_module = __webpack_require__(137);
var s_module_default = /*#__PURE__*/__webpack_require__.n(s_module);

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(1);

// CONCATENATED MODULE: ./src/components/modal/index.tsx
var rootNode=document.querySelector('#root');var modalsNode=document.querySelector('#modal-root');var modal_Modal=function Modal(_ref){var children=_ref.children,heading=_ref.heading,closeHandler=_ref.closeHandler,_ref$fullscreen=_ref.fullscreen,fullscreen=_ref$fullscreen===void 0?false:_ref$fullscreen;Object(react["useEffect"])(function(){var keyboardHandler=function keyboardHandler(event){if(event.key==='Escape'){closeHandler===null||closeHandler===void 0?void 0:closeHandler();}};document.addEventListener('keydown',keyboardHandler,false);if(rootNode){rootNode.setAttribute('inert','true');rootNode.setAttribute('aria-hidden','true');}document.body.style.overflow='hidden';return function(){document.removeEventListener('keydown',keyboardHandler,false);document.body.style.overflow='';if(rootNode){rootNode.removeAttribute('inert');rootNode.removeAttribute('aria-hidden');}};},[]);if(!modalsNode)return null;return/*#__PURE__*/Object(react_dom["createPortal"])(/*#__PURE__*/Object(jsx_runtime["jsx"])("section",{className:s_module_default.a.dialog,children:/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:classnames_default()(s_module_default.a.inner,Object(defineProperty["a" /* default */])({},s_module_default.a.fullscreen,fullscreen)),children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("header",{className:s_module_default.a.header,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:s_module_default.a.heading,children:heading}),/*#__PURE__*/Object(jsx_runtime["jsx"])("button",{className:classnames_default()(s_module_default.a.closeButton,Object(defineProperty["a" /* default */])({},s_module_default.a.fullscreen,fullscreen)),onClick:function onClick(){return closeHandler();},children:/*#__PURE__*/Object(jsx_runtime["jsx"])(components_icon["a" /* Icon */],{name:"close",size:fullscreen?32:24})})]}),/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:classnames_default()(s_module_default.a.content,Object(defineProperty["a" /* default */])({},s_module_default.a.fullscreen,fullscreen)),children:children})]})}),modalsNode);};
// EXTERNAL MODULE: ./src/components/providers/generalProvider.tsx
var generalProvider = __webpack_require__(98);

// EXTERNAL MODULE: ./src/components/providers/networkProvider.tsx
var networkProvider = __webpack_require__(54);

// EXTERNAL MODULE: ./src/networks/mainnet.ts
var mainnet = __webpack_require__(147);

// EXTERNAL MODULE: ./src/networks/ropsten.ts
var ropsten = __webpack_require__(164);

// EXTERNAL MODULE: ./src/wallets/connectors/metamask/index.ts + 2 modules
var metamask = __webpack_require__(165);

// EXTERNAL MODULE: ./src/wallets/walletProvider.tsx + 16 modules
var walletProvider = __webpack_require__(80);

// EXTERNAL MODULE: ./src/utils/context.ts
var context = __webpack_require__(62);

// CONCATENATED MODULE: ./src/components/providers/web3Provider.tsx
var _CacheHttpsWeb3Provid;// import { ArbitrumNetwork } from 'networks/arbitrum';
// import { AvalancheNetwork } from 'networks/avalanche';
// import { BinanceNetwork } from 'networks/binance';
// import { PolygonNetwork } from 'networks/polygon';
var MainnetHttpsWeb3Provider=new lib_default.a.providers.HttpProvider(mainnet["a" /* MainnetNetwork */].rpc.httpsUrl);var RopstenHttpsWeb3Provider=new lib_default.a.providers.HttpProvider(ropsten["a" /* RopstenNetwork */].rpc.httpsUrl);// export const PolygonHttpsWeb3Provider = new Web3.providers.HttpProvider(PolygonNetwork.rpc.httpsUrl);
// export const AvalancheHttpsWeb3Provider = new Web3.providers.HttpProvider(AvalancheNetwork.rpc.httpsUrl);
// export const BinanceHttpsWeb3Provider = new Web3.providers.HttpProvider(BinanceNetwork.rpc.httpsUrl);
// export const ArbitrumHttpsWeb3Provider = new Web3.providers.HttpProvider(ArbitrumNetwork.rpc.httpsUrl);
var CacheHttpsWeb3Provider=(_CacheHttpsWeb3Provid={},Object(defineProperty["a" /* default */])(_CacheHttpsWeb3Provid,mainnet["a" /* MainnetNetwork */].rpc.httpsUrl,MainnetHttpsWeb3Provider),Object(defineProperty["a" /* default */])(_CacheHttpsWeb3Provid,ropsten["a" /* RopstenNetwork */].rpc.httpsUrl,RopstenHttpsWeb3Provider),_CacheHttpsWeb3Provid);var WEB3_ERROR_VALUE=3.9638773911973445e75;var Context=/*#__PURE__*/Object(react["createContext"])(Object(context["a" /* InvariantContext */])('Web3Provider'));function useWeb3(){return Object(react["useContext"])(Context);}var web3Provider_Web3Provider=function Web3Provider(props){var children=props.children;var _useGeneral=Object(generalProvider["b" /* useGeneral */])(),windowState=_useGeneral.windowState;var _useNetwork=Object(networkProvider["b" /* useNetwork */])(),networks=_useNetwork.networks,activeNetwork=_useNetwork.activeNetwork,changeNetwork=_useNetwork.changeNetwork,findNetwork=_useNetwork.findNetwork,findNetworkByChainId=_useNetwork.findNetworkByChainId,defaultNetwork=_useNetwork.defaultNetwork;var wallet=Object(walletProvider["c" /* useWallet */])();var event=Object(react["useMemo"])(function(){return new EventEmitter_default.a();},[]);var _useState=Object(react["useState"])(),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),blockNumber=_useState2[0],setBlockNumber=_useState2[1];var _useState3=Object(react["useState"])(false),_useState4=Object(slicedToArray["a" /* default */])(_useState3,2),networkSelectVisible=_useState4[0],_showNetworkSelect=_useState4[1];var httpsWeb3=Object(react["useMemo"])(function(){var provider=CacheHttpsWeb3Provider[activeNetwork.rpc.httpsUrl];if(!provider){provider=new lib_default.a.providers.HttpProvider(activeNetwork.rpc.httpsUrl);CacheHttpsWeb3Provider[activeNetwork.rpc.httpsUrl]=provider;}return new lib_default.a(provider);},[activeNetwork]);var wssWeb3=Object(react["useMemo"])(function(){if(!activeNetwork.rpc.wssUrl){return undefined;}var provider=new lib_default.a.providers.WebsocketProvider(activeNetwork.rpc.wssUrl);return new lib_default.a(provider);},[activeNetwork]);function tryCall(to,from,data,value){return httpsWeb3.eth.call({to:to,from:from,data:data,value:value});}var getContractAbi=Object(react["useCallback"])(function(address){var _activeNetwork$explor=activeNetwork.explorer,apiUrl=_activeNetwork$explor.apiUrl,key=_activeNetwork$explor.key;var url="".concat(apiUrl,"/api?module=contract&action=getabi&address=").concat(address,"&apikey=").concat(key);return fetch(url).then(function(result){return result.json();}).then(function(_ref){var status=_ref.status,result=_ref.result;if(status==='1'){return JSON.parse(result);}return Promise.reject(result);});},[activeNetwork.explorer]);Object(react["useEffect"])(function(){if(wallet.connector instanceof metamask["a" /* MetamaskConnector */]){wallet.connector.getProvider().then(function(provider){provider.on('chainChanged',function(chainId){var _findNetworkByChainId;var network=(_findNetworkByChainId=findNetworkByChainId(Number(chainId)))!==null&&_findNetworkByChainId!==void 0?_findNetworkByChainId:defaultNetwork;changeNetwork(network.id);});});}},[wallet.connector]);var switchNetwork=Object(react["useCallback"])(/*#__PURE__*/function(){var _ref2=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(networkId){var network,canSetNetwork,error;return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:network=findNetwork(networkId);if(network){_context.next=3;break;}return _context.abrupt("return");case 3:canSetNetwork=true;if(!(wallet.connector instanceof metamask["a" /* MetamaskConnector */]&&network.metamaskChain)){_context.next=18;break;}_context.prev=5;_context.next=8;return wallet.connector.switchChain({chainId:network.metamaskChain.chainId});case 8:error=_context.sent;if(error){canSetNetwork=false;}_context.next=18;break;case 12:_context.prev=12;_context.t0=_context["catch"](5);canSetNetwork=false;// @ts-ignore
if(!(_context.t0.code===4902)){_context.next=18;break;}_context.next=18;return wallet.connector.addChain(network.metamaskChain);case 18:if(canSetNetwork){changeNetwork(network.id);}case 19:case"end":return _context.stop();}}},_callee,null,[[5,12]]);}));return function(_x){return _ref2.apply(this,arguments);};}(),[wallet.connector]);Object(react["useEffect"])(function(){if(!windowState.isVisible||!wssWeb3){return undefined;}wssWeb3.eth.getBlockNumber().then(function(value){if(value){setBlockNumber(value);}}).catch(Error);var subscription=wssWeb3.eth.subscribe('newBlockHeaders');subscription.on('data',function(blockHeader){if(blockHeader&&blockHeader.number){setBlockNumber(blockHeader.number);}}).on('error',function(){setTimeout(function(){subscription.subscribe();},1000);});return function(){var _subscription$unsubsc;(_subscription$unsubsc=subscription.unsubscribe)===null||_subscription$unsubsc===void 0?void 0:_subscription$unsubsc.call(subscription);};},[windowState.isVisible]);function getEtherscanTxUrl(txHash){return txHash?"".concat(activeNetwork.explorer.url,"/tx/").concat(txHash):undefined;}function getEtherscanAddressUrl(address){return address?"".concat(activeNetwork.explorer.url,"/address/").concat(address):undefined;}var value={event:event,blockNumber:blockNumber,activeProvider:httpsWeb3,showNetworkSelect:function showNetworkSelect(){_showNetworkSelect(true);},tryCall:tryCall,getContractAbi:getContractAbi,getEtherscanTxUrl:getEtherscanTxUrl,getEtherscanAddressUrl:getEtherscanAddressUrl};return/*#__PURE__*/Object(jsx_runtime["jsxs"])(Context.Provider,{value:value,children:[children,networkSelectVisible&&/*#__PURE__*/Object(jsx_runtime["jsx"])(modal_Modal,{heading:/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"h3",weight:"bold",color:"primary",children:"Select network"}),closeHandler:_showNetworkSelect,children:/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:"flex flow-row row-gap-16 p-24",children:networks.map(function(network){return/*#__PURE__*/Object(jsx_runtime["jsxs"])("button",{className:"button-ghost-monochrome p-16",style:{height:'inherit'},onClick:function onClick(){return switchNetwork(network.id);},children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* default */],{name:network.meta.logo,width:40,height:40,className:"mr-12"}),/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"flex flow-row align-start",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"primary",children:network.meta.name}),network===activeNetwork&&/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"small",weight:"semibold",color:"secondary",children:"Connected"})]})]},network.id);})})})]});};/* harmony default export */ var web3Provider = __webpack_exports__["c"] = (web3Provider_Web3Provider);

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbiTuple; });
/* unused harmony export AbiTupleArray */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createAbiItem; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(390);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_uniqueId__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(648);
/* harmony import */ var lodash_uniqueId__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqueId__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(109);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(68);
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(219);
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(37);
var AbiTuple=function AbiTuple(items){Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(this,AbiTuple);this.items=[];this.items=items;};var AbiTupleArray=function AbiTupleArray(items){Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(this,AbiTupleArray);this.items=[];this.items=items;};function createAbiItem(name){var inputs=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var outputs=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];return{name:name,type:'function',stateMutability:'view',inputs:inputs.map(function(type){if(type instanceof AbiTuple){return{name:'',type:'tuple',components:type.items.map(function(t){return{name:'',type:t};})};}else if(type instanceof AbiTupleArray){return{name:'',type:'tuple[]',components:type.items.map(function(t){return{name:'',type:t};})};}return{name:'',type:type};}),outputs:outputs.map(function(type){if(type instanceof AbiTuple){return{name:'',type:'tuple',components:type.items.map(function(t){return{name:'',type:t};})};}else if(type instanceof AbiTupleArray){return{name:'',type:'tuple[]',components:type.items.map(function(t){return{name:'',type:t};})};}return{name:'',type:type};})};}var BatchRequestManager=/*#__PURE__*/function(){function BatchRequestManager(){Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(this,BatchRequestManager);}Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(BatchRequestManager,null,[{key:"addRequest",value:function addRequest(source,request){var currentProvider=source.currentProvider;if(!currentProvider){return;}var requests=this.requests;var state=requests.get(currentProvider);if(!state){state={busy:false,collected:[]};requests.set(currentProvider,state);}state.collected.push(request);this.run();}}]);return BatchRequestManager;}();BatchRequestManager.requests=new Map();BatchRequestManager.run=lodash_debounce__WEBPACK_IMPORTED_MODULE_6___default()(function(){var requests=BatchRequestManager.requests;requests.forEach(/*#__PURE__*/function(){var _ref2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(state,provider){var web3,extractCount,delay,_loop;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:if(!state.busy){_context3.next=2;break;}return _context3.abrupt("return");case 2:web3=new web3__WEBPACK_IMPORTED_MODULE_8___default.a(provider);extractCount=0;delay=0;// if (provider === PolygonHttpsWeb3Provider) {
//   extractCount = 20;
//   delay = 250;
// }
state.busy=true;_loop=/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _loop(){var toExtract,items,batch;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _loop$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:toExtract=extractCount>0?extractCount:state.collected.length;items=state.collected.splice(0,toExtract);batch=new web3.BatchRequest();items.forEach(function(method){return batch.add(method);});_context2.next=6;return batch.execute();case 6:if(!(delay>0)){_context2.next=9;break;}_context2.next=9;return new Promise(function(resolve){return setTimeout(resolve,delay);});case 9:case"end":return _context2.stop();}}},_loop);});case 7:if(!(state.collected.length>0)){_context3.next=11;break;}return _context3.delegateYield(_loop(),"t0",9);case 9:_context3.next=7;break;case 11:state.busy=false;case 12:case"end":return _context3.stop();}}},_callee2);}));return function(_x3,_x4){return _ref2.apply(this,arguments);};}());},250);var Web3Contract=/*#__PURE__*/function(){function Web3Contract(abi,address,name){Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(this,Web3Contract);this._events=void 0;this._abi=void 0;this._callContract=void 0;this._sendContract=void 0;this.address=void 0;this.name=void 0;this.account=void 0;if(!address){throw new Error("Invalid contract address (".concat(name,")"));}this._events=new wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_10___default.a();this._abi=abi;this.address=address;this.name=name!==null&&name!==void 0?name:address;var web3=new web3__WEBPACK_IMPORTED_MODULE_8___default.a();this._callContract=new web3.eth.Contract(abi,address);this._sendContract=new web3.eth.Contract(abi,address);}/// GETTERS
Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(Web3Contract,[{key:"writeFunctions",get:function get(){return this._abi.filter(function(r){return r.type==='function'&&!r.constant;});}},{key:"callProvider",get:function get(){return this._callContract.currentProvider;}},{key:"provider",get:function get(){return this._sendContract.currentProvider;}/// SETTERS
},{key:"setCallProvider",value:function setCallProvider(provider){if(this._callContract.currentProvider!==provider){this._callContract.setProvider(provider);}}},{key:"setProvider",value:function setProvider(provider){if(this._sendContract.currentProvider!==provider){this._sendContract.setProvider(provider);}}},{key:"setAccount",value:function setAccount(account){if(this.account!==account){this.account=account;this.emit(Web3Contract.UPDATE_ACCOUNT,account);}}/// ASSERTION METHODS
},{key:"assertAccount",value:function assertAccount(){if(!this.account){throw new Error('This operation requires wallet to be connected!');}}/// REQUEST METHODS
},{key:"batch",value:function batch(methods){var _this=this;if(methods.length===0){return Promise.reject(new Error("Empty list of methods for batch."));}var promises=methods.map(function(batchMethod){return new Promise(function(resolve){var _batchMethod$methodAr,_batchMethod$callArgs;_this.call(batchMethod.method,(_batchMethod$methodAr=batchMethod.methodArgs)!==null&&_batchMethod$methodAr!==void 0?_batchMethod$methodAr:[],(_batchMethod$callArgs=batchMethod.callArgs)!==null&&_batchMethod$callArgs!==void 0?_batchMethod$callArgs:{}).then(function(value){var _batchMethod$transfor;return resolve(((_batchMethod$transfor=batchMethod.transform)!==null&&_batchMethod$transfor!==void 0?_batchMethod$transfor:function(x){return x;})(value));}).catch(function(err){var _batchMethod$onError,_batchMethod$onError2;return resolve((_batchMethod$onError=(_batchMethod$onError2=batchMethod.onError)===null||_batchMethod$onError2===void 0?void 0:_batchMethod$onError2.call(batchMethod,err))!==null&&_batchMethod$onError!==void 0?_batchMethod$onError:undefined);});});});return Promise.all(promises);}},{key:"call",value:function call(method){var _this2=this;var methodArgs=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var callArgs=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var contractMethod=this._callContract.methods[method];if(!contractMethod){return Promise.reject(new Error("Unknown method \"".concat(method,"\". (Ref. ").concat(this.name,".").concat(method,")")));}if(!this._callContract.currentProvider){return Promise.reject(new Error("Contract call failure. Missing call provider. (Ref. ".concat(this.name,".").concat(method,")")));}return new Promise(function(resolve,reject){var req=contractMethod.apply(void 0,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(methodArgs)).call.request(callArgs,function(err,value){if(err){console.error(err);return reject(err);}if(+value===components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_11__[/* WEB3_ERROR_VALUE */ "b"]){return Promise.reject(new Error("Contract call failure. (Ref. ".concat(_this2.name,".").concat(method,")")));}resolve(value);});BatchRequestManager.addRequest(_this2._callContract,req);});}},{key:"send",value:function send(method){var _this3=this;var methodArgs=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var sendArgs=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var gasPrice=arguments.length>3?arguments[3]:undefined;this.assertAccount();var contractMethod=this._sendContract.methods[method];if(!contractMethod){return Promise.reject(new Error("Unknown method \"".concat(method,"\". (Ref. ").concat(this.name,".").concat(method,")")));}if(!this._sendContract.currentProvider){return Promise.reject(new Error("Contract send failure. Missing send provider. (Ref. ".concat(this.name,".").concat(method,")")));}var _sendArgs=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({from:this.account,gasPrice:gasPrice!==undefined?Object(web3_utils__WEBPACK_IMPORTED_MODULE_9__[/* getGasValue */ "d"])(gasPrice):undefined},sendArgs);var meta={id:lodash_uniqueId__WEBPACK_IMPORTED_MODULE_7___default()("".concat(method,":")),sender:this,method:method,methodArgs:methodArgs,sendArgs:_sendArgs};return contractMethod.apply(void 0,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(methodArgs)).send(_sendArgs,/*#__PURE__*/function(){var _ref=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(err,txHash){return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!err){_context.next=2;break;}return _context.abrupt("return");case 2:_this3.emit('tx:hash',txHash,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({},meta),{},{state:'progress',txHash:txHash}));case 3:case"end":return _context.stop();}}},_callee);}));return function(_x,_x2){return _ref.apply(this,arguments);};}()).then(function(result){_this3.emit('tx:success',result,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({},meta),{},{state:'success',result:result}));return result;}).catch(function(error){var _this3$_sendContract$;(_this3$_sendContract$=_this3._sendContract.currentProvider)===null||_this3$_sendContract$===void 0?void 0:_this3$_sendContract$.emit('send::error',error);_this3.emit('tx:fail',error,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({},meta),{},{state:'fail',error:error}));return Promise.reject(error);});}/// EVENT METHODS
},{key:"on",value:function on(event,listener){return this._events.on(event,listener);}},{key:"once",value:function once(event,listener){return this._events.once(event,listener);}},{key:"off",value:function off(event,listener){return this._events.off(event,listener);}},{key:"emit",value:function emit(event){var _this$_events;for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}return(_this$_events=this._events).emit.apply(_this$_events,[event].concat(args));}},{key:"onUpdateAccount",value:function onUpdateAccount(listener){return this.on('update:account',listener);}},{key:"onUpdateData",value:function onUpdateData(listener){return this.on('update:data',listener);}}]);return Web3Contract;}();Web3Contract.UPDATE_ACCOUNT='update:account';Web3Contract.UPDATE_DATA='update:data';/* harmony default export */ __webpack_exports__["c"] = (Web3Contract);

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"component":"s_component__2CMUI","color-icon":"s_color-icon__ckOSt","color-primary":"s_color-primary__z8Ai9","color-secondary":"s_color-secondary__jkPIN","color-red":"s_color-red__1yAiS","color-green":"s_color-green__2vVg2","color-blue":"s_color-blue__ekFeq"};

/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"component":"s_component__G1voW"};

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"component":"s_component__1jtAD","primary-color":"s_primary-color__2C42L","secondary-color":"s_secondary-color__yFDKv","red-color":"s_red-color__2NSIJ","green-color":"s_green-color__3IQMA","blue-color":"s_blue-color__1fbN4","inherit-color":"s_inherit-color__EMk5J"};

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"overlay":"s_overlay__3d_WK","noPadding":"s_noPadding__3wp4X"};

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"tokenIcon":"s_tokenIcon__34gjx","tokenIconPair":"s_tokenIconPair__1q_lH"};

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"layout":"s_layout__4ytQl","main":"s_main__1HiJ4"};

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export mergeState */
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
function mergeState(state){return function(prevState){return Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({},prevState),state);};}function useMergeState(initialState,callback){var _React$useState=react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(initialState),_React$useState2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_React$useState,2),state=_React$useState2[0],set=_React$useState2[1];var setState=react__WEBPACK_IMPORTED_MODULE_2___default.a.useCallback(function(updater){set(function(prev){var next=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({},prev),typeof updater==='function'?updater(prev):updater);if(typeof callback==='function'){callback(next);}return next;});},[callback]);return[state,setState];}/* harmony default export */ __webpack_exports__["a"] = (useMergeState);

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ExternalLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ExplorerAddressLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ExplorerTxLink; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(64);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var components_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(35);
/* harmony import */ var components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(37);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(101);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
var _excluded=["children","variation","size","icon","iconPosition","iconRotate","loading","className"],_excluded2=["children","variation","size","icon","iconPosition","iconRotate","className"],_excluded3=["children","variation","size","icon","iconPosition","iconRotate","className"],_excluded4=["children","address","query"],_excluded5=["children","address"];var ButtonContent=function ButtonContent(_ref){var size=_ref.size,icon=_ref.icon,iconPosition=_ref.iconPosition,iconRotate=_ref.iconRotate,loading=_ref.loading,children=_ref.children;var iconSize=24;switch(size){case'small':iconSize=16;break;case'normal':iconSize=24;break;case'big':iconSize=24;break;}var iconToDisplay=loading?'loader':icon;return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["Fragment"],{children:[iconToDisplay&&iconPosition==='left'?/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(components_icon__WEBPACK_IMPORTED_MODULE_6__[/* Icon */ "a"],{name:iconToDisplay,rotate:iconRotate,size:iconSize,style:{marginRight:8},className:classnames__WEBPACK_IMPORTED_MODULE_5___default()(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({},_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a.spinner,loading))}):null,iconToDisplay&&iconPosition==='only'?/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(components_icon__WEBPACK_IMPORTED_MODULE_6__[/* Icon */ "a"],{name:iconToDisplay,rotate:iconRotate,size:iconSize,className:classnames__WEBPACK_IMPORTED_MODULE_5___default()(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({},_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a.spinner,loading))}):children,iconToDisplay&&iconPosition==='right'?/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(components_icon__WEBPACK_IMPORTED_MODULE_6__[/* Icon */ "a"],{name:iconToDisplay,rotate:iconRotate,size:iconSize,style:{marginLeft:8},className:classnames__WEBPACK_IMPORTED_MODULE_5___default()(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({},_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a.spinner,loading))}):null]});};var Button=function Button(_ref2){var children=_ref2.children,variation=_ref2.variation,_ref2$size=_ref2.size,size=_ref2$size===void 0?'normal':_ref2$size,icon=_ref2.icon,_ref2$iconPosition=_ref2.iconPosition,iconPosition=_ref2$iconPosition===void 0?'only':_ref2$iconPosition,iconRotate=_ref2.iconRotate,loading=_ref2.loading,className=_ref2.className,rest=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref2,_excluded);return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])("button",Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({},rest),{},{className:classnames__WEBPACK_IMPORTED_MODULE_5___default()(variation?_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a[variation]:null,_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a[size],Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({},_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a.iconOnly,icon&&iconPosition==='only'),className),children:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(ButtonContent,{icon:icon,iconPosition:iconPosition,iconRotate:iconRotate,loading:loading,children:children})}));};var Link=function Link(_ref3){var children=_ref3.children,variation=_ref3.variation,_ref3$size=_ref3.size,size=_ref3$size===void 0?'normal':_ref3$size,icon=_ref3.icon,_ref3$iconPosition=_ref3.iconPosition,iconPosition=_ref3$iconPosition===void 0?'only':_ref3$iconPosition,iconRotate=_ref3.iconRotate,className=_ref3.className,rest=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref3,_excluded2);return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[/* Link */ "b"],Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({},rest),{},{className:classnames__WEBPACK_IMPORTED_MODULE_5___default()(variation?_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a[variation]:null,_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a[size],Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({},_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a.iconOnly,icon&&iconPosition==='only'),className),children:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(ButtonContent,{icon:icon,iconPosition:iconPosition,iconRotate:iconRotate,children:children})}));};var ExternalLink=function ExternalLink(_ref4){var children=_ref4.children,variation=_ref4.variation,_ref4$size=_ref4.size,size=_ref4$size===void 0?'normal':_ref4$size,icon=_ref4.icon,_ref4$iconPosition=_ref4.iconPosition,iconPosition=_ref4$iconPosition===void 0?'only':_ref4$iconPosition,iconRotate=_ref4.iconRotate,className=_ref4.className,rest=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref4,_excluded3);return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])("a",Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({rel:"noopener noreferrer",target:"_blank"},rest),{},{className:classnames__WEBPACK_IMPORTED_MODULE_5___default()(variation?_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a[variation]:null,_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a[size],Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({},_s_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a.iconOnly,icon&&iconPosition==='only'),className),children:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(ButtonContent,{icon:icon,iconPosition:iconPosition,iconRotate:iconRotate,children:children})}));};var ExplorerAddressLink=function ExplorerAddressLink(props){var children=props.children,address=props.address,_props$query=props.query,query=_props$query===void 0?'':_props$query,rest=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props,_excluded4);var _useWeb=Object(components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_7__[/* useWeb3 */ "d"])(),getEtherscanAddressUrl=_useWeb.getEtherscanAddressUrl;if(!address){return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["Fragment"],{children:children});}return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(ExternalLink,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({href:"".concat(getEtherscanAddressUrl(address)).concat(query)},rest),{},{children:children}));};var ExplorerTxLink=function ExplorerTxLink(props){var children=props.children,address=props.address,rest=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props,_excluded5);var _useWeb2=Object(components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_7__[/* useWeb3 */ "d"])(),getEtherscanTxUrl=_useWeb2.getEtherscanTxUrl;if(!address){return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["Fragment"],{children:children});}return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(ExternalLink,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({href:getEtherscanTxUrl(address)},rest),{},{children:children}));};

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenIcon; });
/* unused harmony export TokenIconPair */
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(251);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(426);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
var _excluded=["name","size","className","style","bubble1Name","bubble2Name","outline"];var staticNames=['aave','stkaave','cream','bond','uniswap','rai','xsushi','sushi'];var svgPath="".concat("","/token-icons-sprite.svg");var TokenIcon=function TokenIcon(props){var _props$name=props.name,name=_props$name===void 0?'unknown':_props$name,_props$size=props.size,size=_props$size===void 0?24:_props$size,className=props.className,style=props.style,bubble1Name=props.bubble1Name,bubble2Name=props.bubble2Name,outline=props.outline,rest=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props,_excluded);var bubble1NameDefined=props.hasOwnProperty('bubble1Name')?bubble1Name!==null&&bubble1Name!==void 0?bubble1Name:'unknown':undefined;var bubble2NameDefined=props.hasOwnProperty('bubble2Name')?bubble2Name!==null&&bubble2Name!==void 0?bubble2Name:'unknown':undefined;var id=Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(nanoid__WEBPACK_IMPORTED_MODULE_4__[/* nanoid */ "a"],[]);return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])("svg",Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({className:classnames__WEBPACK_IMPORTED_MODULE_3___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.tokenIcon,className),width:size,height:size,style:style},rest),{},{children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])("mask",{id:id,children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("circle",{cx:"50%",cy:"50%",r:"50%",fill:"white"}),bubble1NameDefined&&/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("circle",{cx:"80%",cy:"20%",r:"25%",fill:"black"}),bubble2NameDefined&&/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("circle",{cx:"80%",cy:"80%",r:"25%",fill:"black"})]}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])("mask",{id:"".concat(id,"-outline"),children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("circle",{cx:"50%",cy:"50%",r:"50%",fill:"black"}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("circle",{cx:"50%",cy:"50%",r:"42%",fill:"white"})]}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])("g",{mask:bubble1NameDefined||bubble2NameDefined?"url(#".concat(id,")"):'',children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("g",{mask:outline?"url(#".concat(id,"-outline)"):'',children:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("use",{xlinkHref:"".concat(staticNames.includes(name)?'':svgPath,"#icon__").concat(name)})}),outline?/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["Fragment"],{children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("defs",{children:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("linearGradient",{id:"".concat(id,"-gradient"),gradientTransform:"rotate(90)",children:getOutlineColor(outline)})}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("circle",{cx:"50%",cy:"50%",r:"48%",fill:"none",strokeWidth:"4%",stroke:"url(#".concat(id,"-gradient)")})]}):null]}),bubble1NameDefined&&/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("use",{xlinkHref:"".concat(staticNames.includes(bubble1NameDefined)?'':svgPath,"#icon__").concat(bubble1NameDefined),width:"40%",height:"40%",x:"60%",y:"0"}),bubble2NameDefined&&/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("use",{xlinkHref:"".concat(staticNames.includes(bubble2NameDefined)?'':svgPath,"#icon__").concat(bubble2NameDefined),width:"40%",height:"40%",x:"60%",y:"60%"})]}));};function getOutlineColor(outline){if(Array.isArray(outline)){return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["Fragment"],{children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("stop",{offset:"0%",stopColor:"var(--theme-".concat(outline[0],"-color)")}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("stop",{offset:"50%",stopColor:"var(--theme-".concat(outline[0],"-color)")}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("stop",{offset:"50%",stopColor:"var(--theme-".concat(outline[1],"-color)")}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("stop",{offset:"100%",stopColor:"var(--theme-".concat(outline[1],"-color)")})]});}return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["Fragment"],{children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("stop",{offset:"0%",stopColor:"var(--theme-".concat(outline,"-color)")}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("stop",{offset:"100%",stopColor:"var(--theme-".concat(outline,"-color)")})]});}var TokenIconPair=function TokenIconPair(props){var _props$name2=props.name1,name1=_props$name2===void 0?'unknown':_props$name2,_props$name3=props.name2,name2=_props$name3===void 0?'unknown':_props$name3,_props$size2=props.size,size=_props$size2===void 0?40:_props$size2,_props$gap=props.gap,gap=_props$gap===void 0?2:_props$gap,className=props.className,style=props.style;var id=Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(nanoid__WEBPACK_IMPORTED_MODULE_4__[/* nanoid */ "a"],[]);var iconSize=size*0.75;var iconIndent=size-iconSize;var cutSize=iconSize/2+gap;return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])("svg",{width:size,height:size,className:classnames__WEBPACK_IMPORTED_MODULE_3___default()(className,_s_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.tokenIconPair),style:style,children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxs"])("mask",{id:id,children:[/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("rect",{width:size,height:size,fill:"white"}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("circle",{cx:iconSize/2,cy:iconSize/2+iconIndent,r:cutSize,fill:"black"})]}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("use",{xlinkHref:"".concat(staticNames.includes(name1)?'':svgPath,"#icon__").concat(name1),width:iconSize,height:iconSize,x:"0",y:iconIndent}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("g",{mask:"url(#".concat(id,")"),children:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])("use",{xlinkHref:"".concat(staticNames.includes(name2)?'':svgPath,"#icon__").concat(name2),width:iconSize,height:iconSize,x:iconIndent,y:"0"})})]});};

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(389);
/* harmony import */ var antd_lib_select__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_select__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var antd_lib_spin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(263);
/* harmony import */ var antd_lib_spin__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd_lib_spin__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var components_custom_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(51);
/* harmony import */ var components_custom_typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var components_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(35);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(333);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
var _excluded=["className","label","loading","options","fixScroll"];var Select=function Select(props){var className=props.className,label=props.label,loading=props.loading,options=props.options,fixScroll=props.fixScroll,selectProps=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props,_excluded);return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_3___default.a,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({className:classnames__WEBPACK_IMPORTED_MODULE_5___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_9___default.a.component,className),dropdownClassName:_s_module_scss__WEBPACK_IMPORTED_MODULE_9___default.a.dropdown,suffixIcon:loading?/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_4___default.a,{size:"small"}):/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(components_icon__WEBPACK_IMPORTED_MODULE_8__[/* Icon */ "a"],{name:"dropdown"}),optionLabelProp:"label",getPopupContainer:fixScroll?function(trigger){return trigger.parentNode;}:undefined},selectProps),{},{children:options.map(function(option){return/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_3___default.a.Option,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({},option),{},{className:_s_module_scss__WEBPACK_IMPORTED_MODULE_9___default.a.option,key:option.value,label:/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(components_custom_grid__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"],{flow:"col",gap:12,children:[label&&/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(components_custom_typography__WEBPACK_IMPORTED_MODULE_7__[/* Text */ "b"],{type:"p2",color:"secondary",children:label}),/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(components_custom_typography__WEBPACK_IMPORTED_MODULE_7__[/* Text */ "b"],{type:"p2",weight:"semibold",color:"primary",children:option.label})]}),value:option.value}),option.label);})}));};/* harmony default export */ __webpack_exports__["a"] = (Select);

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useConfig; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_providers_networkProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);
/* harmony import */ var utils_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(62);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
var Context=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])(Object(utils_context__WEBPACK_IMPORTED_MODULE_3__[/* InvariantContext */ "a"])('ConfigProvider'));function useConfig(){return Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(Context);}var ConfigProvider=function ConfigProvider(props){var _config$tokens,_config$tokens2,_config$tokens3,_config$tokens4;var children=props.children;var _useNetwork=Object(components_providers_networkProvider__WEBPACK_IMPORTED_MODULE_2__[/* useNetwork */ "b"])(),activeNetwork=_useNetwork.activeNetwork;var config=activeNetwork.config;var value=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({},activeNetwork.config),{},{links:{website:'http://www.barnbridge.com',discord:'https://discord.com/invite/FfEhsVk',twitter:'https://twitter.com/barn_bridge',whitepaper:'https://github.com/BarnBridge/BarnBridge-Whitepaper',docs:'https://docs.barnbridge.com/',github:'https://github.com/BarnBridge',forum:'https://forum.barnbridge.com',signal:'https://signal.barnbridge.com',uniswapLiquidity:"https://app.uniswap.org/#/add/v2/".concat((_config$tokens=config.tokens)===null||_config$tokens===void 0?void 0:_config$tokens.swingby,"/").concat((_config$tokens2=config.tokens)===null||_config$tokens2===void 0?void 0:_config$tokens2.usdc),uniswapSwap:"https://app.uniswap.org/#/swap?use=V2&inputCurrency=".concat((_config$tokens3=config.tokens)===null||_config$tokens3===void 0?void 0:_config$tokens3.swingby,"&outputCurrency=").concat((_config$tokens4=config.tokens)===null||_config$tokens4===void 0?void 0:_config$tokens4.usdc)}});return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(Context.Provider,{value:value,children:children});};/* harmony default export */ __webpack_exports__["a"] = (ConfigProvider);

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(187);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
var Grid=function Grid(props){var className=props.className,flow=props.flow,gap=props.gap,rowsTemplate=props.rowsTemplate,colsTemplate=props.colsTemplate,align=props.align,alignSelf=props.alignSelf,justify=props.justify,justifySelf=props.justifySelf,wrap=props.wrap,padding=props.padding,width=props.width,children=props.children;var _concat=[].concat(gap!==null&&gap!==void 0?gap:0),_concat2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_concat,2),_concat2$=_concat2[0],rowGap=_concat2$===void 0?0:_concat2$,_concat2$2=_concat2[1],columnGap=_concat2$2===void 0?rowGap:_concat2$2;var _concat3=[].concat(padding!==null&&padding!==void 0?padding:0),_concat4=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_concat3,4),paddingTop=_concat4[0],_concat4$=_concat4[1],paddingRight=_concat4$===void 0?paddingTop:_concat4$,_concat4$2=_concat4[2],paddingBottom=_concat4$2===void 0?paddingTop:_concat4$2,_concat4$3=_concat4[3],paddingLeft=_concat4$3===void 0?paddingRight:_concat4$3;return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div",{className:classnames__WEBPACK_IMPORTED_MODULE_2___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.grid,flow&&_s_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a[flow],align&&_s_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a["align-".concat(align)],alignSelf&&_s_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a["align-self-".concat(alignSelf)],justify&&_s_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a["justify-".concat(justify)],justifySelf&&_s_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a["justify-self-".concat(justifySelf)],wrap&&'text-wrap',className),style:{gridTemplateRows:rowsTemplate,gridTemplateColumns:colsTemplate,rowGap:rowGap>0?rowGap:undefined,columnGap:columnGap>0?columnGap:undefined,paddingTop:paddingTop>0?paddingTop:undefined,paddingRight:paddingRight>0?paddingRight:undefined,paddingBottom:paddingBottom>0?paddingBottom:undefined,paddingLeft:paddingLeft>0?paddingLeft:undefined,width:width},children:children});};/* harmony default export */ __webpack_exports__["a"] = (Grid);

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useNetwork; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_use_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(133);
/* harmony import */ var networks_ropsten__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(164);
/* harmony import */ var networks_mainnet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(147);
/* harmony import */ var utils_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(62);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(71);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
var Context=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])(Object(utils_context__WEBPACK_IMPORTED_MODULE_5__[/* InvariantContext */ "a"])('NetworkProvider'));function useNetwork(){return Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(Context);}var networks=function(){if(_utils__WEBPACK_IMPORTED_MODULE_6__[/* isDevelopmentMode */ "e"]){return[networks_ropsten__WEBPACK_IMPORTED_MODULE_3__[/* RopstenNetwork */ "a"],networks_mainnet__WEBPACK_IMPORTED_MODULE_4__[/* MainnetNetwork */ "a"]];}if(_utils__WEBPACK_IMPORTED_MODULE_6__[/* isProductionMode */ "f"]){return[networks_ropsten__WEBPACK_IMPORTED_MODULE_3__[/* RopstenNetwork */ "a"],networks_mainnet__WEBPACK_IMPORTED_MODULE_4__[/* MainnetNetwork */ "a"]];}return[];}();var NetworkProvider=function NetworkProvider(props){var children=props.children;var _useSessionStorage=Object(react_use_storage__WEBPACK_IMPORTED_MODULE_2__[/* useSessionStorage */ "b"])('last_network'),_useSessionStorage2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useSessionStorage,2),lastNetwork=_useSessionStorage2[0],setLastNetwork=_useSessionStorage2[1];var initialNetwork=Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function(){var _network;var network;try{if(lastNetwork){var _networkId=lastNetwork===null||lastNetwork===void 0?void 0:lastNetwork.toLowerCase();network=networks.find(function(n){return n.id.toLowerCase()===_networkId;});}}catch(_unused){}return(_network=network)!==null&&_network!==void 0?_network:networks[0];},[lastNetwork]);var _useState=Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(initialNetwork),_useState2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState,1),activeNetwork=_useState2[0];var findNetwork=Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function(networkId){return networks.find(function(n){return n.id.toLowerCase()===networkId.toLowerCase();});},[]);var findNetworkByChainId=Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function(chainId){return networks.find(function(n){return n.meta.chainId===chainId;});},[]);var changeNetwork=Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function(networkId){var network=findNetwork(networkId);if(network){setLastNetwork(network.id.toLowerCase());window.location.reload();}return network;},[]);Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function(){window.document.title=activeNetwork.config.title;},[activeNetwork]);var value={networks:networks,defaultNetwork:networks[0],activeNetwork:activeNetwork,findNetwork:findNetwork,findNetworkByChainId:findNetworkByChainId,changeNetwork:changeNetwork};return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__["jsx"])(Context.Provider,{value:value,children:children});};/* harmony default export */ __webpack_exports__["a"] = (NetworkProvider);

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvariantContext; });
function InvariantContext(contextName){return new Proxy({},{get:function get(target,name){// throw new Error(`${contextName}.${name} is not implemented yet.`); /// TODO
return undefined;}});}

/***/ }),

/***/ 633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(33);

// EXTERNAL MODULE: ./src/components/antd/button/index.tsx
var antd_button = __webpack_require__(79);

// EXTERNAL MODULE: ./src/components/antd/modal/index.tsx
var modal = __webpack_require__(104);

// EXTERNAL MODULE: ./src/components/button/index.tsx
var components_button = __webpack_require__(43);

// EXTERNAL MODULE: ./src/components/custom/icon/index.tsx + 1 modules
var icon = __webpack_require__(69);

// EXTERNAL MODULE: ./src/components/custom/typography/index.tsx
var typography = __webpack_require__(11);

// EXTERNAL MODULE: ./src/components/providers/networkProvider.tsx
var networkProvider = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(1);

// CONCATENATED MODULE: ./src/web3/components/tx-status-modal/index.tsx
var _excluded=["state","txHash","renderProgress","renderSuccess"];var tx_status_modal_TxStatusModal=function TxStatusModal(props){var state=props.state,txHash=props.txHash,renderProgress=props.renderProgress,renderSuccess=props.renderSuccess,modalProps=Object(objectWithoutProperties["a" /* default */])(props,_excluded);var _useNetwork=Object(networkProvider["b" /* useNetwork */])(),activeNetwork=_useNetwork.activeNetwork;return/*#__PURE__*/Object(jsx_runtime["jsx"])(modal["a" /* default */],Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({width:560,title:"Transaction status"},modalProps),{},{children:/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"grid flow-row pv-8 ph-8",children:[state==='progress'&&/*#__PURE__*/Object(jsx_runtime["jsxs"])(jsx_runtime["Fragment"],{children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* default */],{name:"tx-progress",width:180,height:160,className:"mb-32 mh-auto"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"h3",weight:"semibold",color:"primary",className:"mb-16 text-center",children:"Your transaction is being processed ..."}),/*#__PURE__*/Object(jsx_runtime["jsx"])("div",{className:"mb-64",children:renderProgress===null||renderProgress===void 0?void 0:renderProgress()}),/*#__PURE__*/Object(jsx_runtime["jsxs"])(components_button["c" /* ExplorerTxLink */],{address:txHash,variation:"primary",className:"full-width",children:["View on ",activeNetwork.explorer.name]})]}),state==='success'&&/*#__PURE__*/Object(jsx_runtime["jsxs"])(jsx_runtime["Fragment"],{children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* default */],{name:"tx-success",width:180,height:160,className:"mb-32 mh-auto"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"h3",weight:"semibold",color:"primary",className:"mb-16 text-center",children:"Congratulations!"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"small",weight:"semibold",color:"secondary",className:"mb-16 text-center",children:"Your transaction was successful."}),renderSuccess===null||renderSuccess===void 0?void 0:renderSuccess()]}),state==='fail'&&/*#__PURE__*/Object(jsx_runtime["jsxs"])(jsx_runtime["Fragment"],{children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* default */],{name:"tx-failure",width:180,height:160,className:"mb-32 mh-auto"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"h3",weight:"semibold",color:"primary",className:"mb-16 text-center",children:"Failed!"}),/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"small",weight:"semibold",color:"secondary",className:"mb-64 text-center",children:["Your transaction failed to execute.",/*#__PURE__*/Object(jsx_runtime["jsx"])("br",{}),"Please try again."]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(antd_button["a" /* default */],{htmlType:"submit",type:"primary",onClick:props===null||props===void 0?void 0:props.onCancel,children:"Dismiss"})]})]})}));};/* harmony default export */ var tx_status_modal = (tx_status_modal_TxStatusModal);
// CONCATENATED MODULE: ./src/web3/components/user-rejected-modal/index.tsx
var user_rejected_modal_UserRejectedModal=function UserRejectedModal(props){var modalProps=Object.assign({},props);return/*#__PURE__*/Object(jsx_runtime["jsx"])(modal["a" /* default */],Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({width:315},modalProps),{},{children:/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"flex flow-row",children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])("div",{className:"flex flow-row align-center mb-32",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(icon["a" /* default */],{name:"warning-outlined",width:40,height:40,color:"red",className:"mb-16"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"h3",weight:"semibold",color:"primary",className:"mb-8",children:"Error"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p2",weight:"semibold",color:"secondary",children:"Transaction rejected"})]}),/*#__PURE__*/Object(jsx_runtime["jsx"])("button",{className:"button-primary",onClick:modalProps.onCancel,children:"Dismiss"})]})}));};/* harmony default export */ var user_rejected_modal = (user_rejected_modal_UserRejectedModal);
// CONCATENATED MODULE: ./src/web3/components/contract-listener/index.tsx
var contract_listener_ContractListener=function ContractListener(props){var contract=props.contract,_renderProgress=props.renderProgress,_renderSuccess=props.renderSuccess;var _useState=Object(react["useState"])(false),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),userRejectedVisible=_useState2[0],setUserRejected=_useState2[1];var _useState3=Object(react["useState"])({visible:false,state:undefined,meta:undefined}),_useState4=Object(slicedToArray["a" /* default */])(_useState3,2),txStatus=_useState4[0],setTxStatus=_useState4[1];Object(react["useEffect"])(function(){if(!contract){return;}function onHash(txHash,meta){setTxStatus(function(prevState){return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({},prevState),{},{visible:true,state:meta.state,meta:meta});});}function onSuccess(result,meta){setTxStatus(function(prevState){var _prevState$meta;return((_prevState$meta=prevState.meta)===null||_prevState$meta===void 0?void 0:_prevState$meta.id)===meta.id?Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({},prevState),{},{state:meta.state}):prevState;});}function onFail(error,meta){if(error.code===4001){setUserRejected(true);}else{setTxStatus(function(prevState){var _prevState$meta2;return((_prevState$meta2=prevState.meta)===null||_prevState$meta2===void 0?void 0:_prevState$meta2.id)===meta.id?Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({},prevState),{},{state:meta.state}):prevState;});}}contract.on('tx:hash',onHash);contract.on('tx:success',onSuccess);contract.on('tx:fail',onFail);return function(){contract.off('tx:hash',onHash);contract.off('tx:success',onSuccess);contract.off('tx:fail',onFail);};},[contract]);var handleUserRejectedCancel=Object(react["useCallback"])(function(){setUserRejected(false);},[]);var handleStatusModalCancel=Object(react["useCallback"])(function(){setTxStatus(function(prevState){return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({},prevState),{},{visible:false,state:undefined,txHash:undefined});});},[]);if(userRejectedVisible){return/*#__PURE__*/Object(jsx_runtime["jsx"])(user_rejected_modal,{onCancel:handleUserRejectedCancel});}if(txStatus.visible){var _txStatus$meta;return/*#__PURE__*/Object(jsx_runtime["jsx"])(tx_status_modal,{state:txStatus.state,txHash:(_txStatus$meta=txStatus.meta)===null||_txStatus$meta===void 0?void 0:_txStatus$meta.txHash,renderProgress:function renderProgress(){return _renderProgress===null||_renderProgress===void 0?void 0:_renderProgress(txStatus.meta);},renderSuccess:function renderSuccess(){return _renderSuccess===null||_renderSuccess===void 0?void 0:_renderSuccess(txStatus.meta);},onCancel:handleStatusModalCancel});}return null;};/* harmony default export */ var contract_listener = __webpack_exports__["a"] = (contract_listener_ContractListener);

/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"overlay":"s_overlay__2MGzS"};

/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"component":"s_component__3Gx76"};

/***/ }),

/***/ 653:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"list":"s_list__1XShg"};

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getExponentValue */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getHumanValue; });
/* unused harmony export getNonHumanValue */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getGasValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatBigValue; });
/* unused harmony export formatNumber */
/* unused harmony export formatPercent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return formatToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return formatUSD; });
/* unused harmony export formatUSDValue */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return shortenAddr; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
function getExponentValue(){var decimals=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;return new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(10).pow(decimals);}function getHumanValue(value){var decimals=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;return value===null||value===void 0?void 0:value.div(getExponentValue(decimals));}function getNonHumanValue(value){var decimals=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;return new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(value).multipliedBy(getExponentValue(decimals));}function getGasValue(price){return getNonHumanValue(price,9).toNumber();}function formatBigValue(value){var decimals=arguments.length>1&&arguments[1]!==undefined?arguments[1]:4;var defaultValue=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'-';var minDecimals=arguments.length>3&&arguments[3]!==undefined?arguments[3]:undefined;if(value===undefined){return defaultValue;}var bnValue=new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(value);if(bnValue.isNaN()){return defaultValue;}return new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(bnValue.toFixed(decimals)).toFormat(minDecimals);}function formatNumber(value,options){if(value===undefined||Number.isNaN(value)){return undefined;}var _ref=options!==null&&options!==void 0?options:{},decimals=_ref.decimals;var val=bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a.isBigNumber(value)?value.toNumber():value;return Intl.NumberFormat('en',{maximumFractionDigits:decimals}).format(val);}function formatPercent(value){var decimals=arguments.length>1&&arguments[1]!==undefined?arguments[1]:2;if(value===undefined||Number.isNaN(value)){return undefined;}var rate=bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a.isBigNumber(value)?value.toNumber():value;return Intl.NumberFormat('en',{style:'percent',maximumFractionDigits:decimals}).format(rate);}function formatToken(value,options){if(value===undefined||value===null||Number.isNaN(value)){return undefined;}var val=new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(value);if(val.isNaN()){return undefined;}if(options){if(options.hasOwnProperty('scale')&&options.scale===undefined){return undefined;}}var _ref2=options!==null&&options!==void 0?options:{},tokenName=_ref2.tokenName,_ref2$compact=_ref2.compact,compact=_ref2$compact===void 0?false:_ref2$compact,_ref2$decimals=_ref2.decimals,decimals=_ref2$decimals===void 0?4:_ref2$decimals,minDecimals=_ref2.minDecimals,_ref2$scale=_ref2.scale,scale=_ref2$scale===void 0?0:_ref2$scale,_ref2$hasLess=_ref2.hasLess,hasLess=_ref2$hasLess===void 0?false:_ref2$hasLess;if(scale>0){val=val.unscaleBy(scale);}var str='';if(hasLess){if(val.gt(bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a.ZERO)&&val.lt(1/Math.pow(10,decimals))){str+='> ';}}if(compact&&val.gt(1000)){str+=Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:2}).format(val.toNumber());}else{str+=new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(val.toFixed(decimals)).toFormat(minDecimals);}if(tokenName){str+=" ".concat(tokenName);}return str;}function formatUSD(value,options){var val=value;if(val===undefined||val===null){return undefined;}if(typeof val==='string'){val=Number(val);}if(bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a.isBigNumber(val)){if(val.isNaN()){return undefined;}}else if(typeof val==='number'){if(!Number.isFinite(val)){return undefined;}}var _ref3=options!==null&&options!==void 0?options:{},_ref3$decimals=_ref3.decimals,decimals=_ref3$decimals===void 0?2:_ref3$decimals,_ref3$compact=_ref3.compact,compact=_ref3$compact===void 0?false:_ref3$compact;if(0>decimals||decimals>20){console.trace("Decimals value is out of range 0..20 (value: ".concat(decimals,")"));return undefined;}var str='';if(compact){str=Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:decimals!==0?decimals:undefined}).format(bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a.isBigNumber(val)?val.toNumber():val);}else{str=new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(val.toFixed(decimals)).toFormat(decimals);}return"$".concat(str);}function formatUSDValue(value){var decimals=arguments.length>1&&arguments[1]!==undefined?arguments[1]:2;var minDecimals=arguments.length>2&&arguments[2]!==undefined?arguments[2]:decimals;if(value===undefined){return'-';}var val=bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a.isBigNumber(value)?value:new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(value);var formattedValue=formatBigValue(val.abs(),decimals,'-',minDecimals);return val.isPositive()?"$".concat(formattedValue):"-$".concat(formattedValue);}function shortenAddr(addr){var first=arguments.length>1&&arguments[1]!==undefined?arguments[1]:6;var last=arguments.length>2&&arguments[2]!==undefined?arguments[2]:4;return addr?[String(addr).slice(0,first),String(addr).slice(-last)].join('...'):undefined;}

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(7);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./src/resources/svg/icons-sprite.svg
/* harmony default export */ var icons_sprite = (__webpack_require__.p + "static/media/icons-sprite.b5ebf55d.svg");
// EXTERNAL MODULE: ./src/components/custom/icon/s.module.scss
var s_module = __webpack_require__(421);
var s_module_default = /*#__PURE__*/__webpack_require__.n(s_module);

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(1);

// CONCATENATED MODULE: ./src/components/custom/icon/index.tsx
var _excluded=["name","width","height","rotate","color","className","style"];var icon_Icon=function Icon(props){var name=props.name,_props$width=props.width,width=_props$width===void 0?24:_props$width,_props$height=props.height,height=_props$height===void 0?24:_props$height,rotate=props.rotate,color=props.color,className=props.className,style=props.style,rest=Object(objectWithoutProperties["a" /* default */])(props,_excluded);return/*#__PURE__*/Object(jsx_runtime["jsx"])("svg",Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({className:classnames_default()(s_module_default.a.component,className,rotate&&"rotate-".concat(rotate),color&&s_module_default.a["".concat(color,"-color")]),width:width,height:height!==null&&height!==void 0?height:width,style:style},rest),{},{children:name&&/*#__PURE__*/Object(jsx_runtime["jsx"])("use",{xlinkHref:"".concat(name.indexOf('static/')===0?'':icons_sprite,"#icon__").concat(name)})}));};/* harmony default export */ var icon = __webpack_exports__["a"] = (icon_Icon);

/***/ }),

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isDevelopmentMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isProductionMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getNowTs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return inRange; });
/* unused harmony export DateUtils */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getFormattedDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isValidAddress; });
/* unused harmony export doSequential */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getRelativeTime; });
/* unused harmony export numberFormat */
/* harmony import */ var date_fns_add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(304);
/* harmony import */ var date_fns_formatDuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(248);
/* harmony import */ var date_fns_intervalToDuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(217);
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65);
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(web3_utils__WEBPACK_IMPORTED_MODULE_3__);
var env="production";var isDevelopmentMode=env==='development';var isProductionMode=env==='production';function getNowTs(){return Math.floor(Date.now()/1000);}function inRange(value,min,max){return min<value&&value<max;}var DateUtils;(function(_DateUtils){var FORMAT_DURATION_FORMATS=['years','months','days','hours','minutes','seconds'];var FORMAT_DURATION_SHORTS=['y','mo','d','h','m','s'];function formatDurationNew(value){if(value===undefined){return undefined;}var start=new Date().getTime();var duration=Object(date_fns_intervalToDuration__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({start:start,end:start+value});return FORMAT_DURATION_FORMATS.map(function(key,index){var val=duration[key];return val>0?"".concat(val).concat(FORMAT_DURATION_SHORTS[index]):undefined;}).filter(Boolean).join(' ');}_DateUtils.formatDurationNew=formatDurationNew;})(DateUtils||(DateUtils={}));function getFormattedDuration(value,endValue){var _ref=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{},_ref$format=_ref.format,format=_ref$format===void 0?['months','days','hours','minutes','seconds']:_ref$format;if(value===undefined){return undefined;}var start=new Date().getTime();var end=endValue!==undefined?endValue:Object(date_fns_add__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(start,{seconds:value}).valueOf();var duration=Object(date_fns_intervalToDuration__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({start:start,end:start>end?start:end});return Object(date_fns_formatDuration__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(duration,{format:format,delimiter:' ',zero:true,locale:{formatDistance:function formatDistance(token,val){var _duration$months,_duration$months2,_duration$days,_duration$months3,_duration$days2,_duration$hours,_duration$months4,_duration$days3,_duration$hours2,_duration$minutes;var v;switch(token){case'xMonths':return val>0?"".concat(val,"mo"):'';case'xDays':v=(_duration$months=duration.months)!==null&&_duration$months!==void 0?_duration$months:0;return val>0||v>0?"".concat(val,"d"):'';case'xHours':v=((_duration$months2=duration.months)!==null&&_duration$months2!==void 0?_duration$months2:0)+((_duration$days=duration.days)!==null&&_duration$days!==void 0?_duration$days:0);return val>0||v>0?"".concat(val,"h"):'';case'xMinutes':v=((_duration$months3=duration.months)!==null&&_duration$months3!==void 0?_duration$months3:0)+((_duration$days2=duration.days)!==null&&_duration$days2!==void 0?_duration$days2:0)+((_duration$hours=duration.hours)!==null&&_duration$hours!==void 0?_duration$hours:0);return val>0||v>0?"".concat(val,"m"):'';case'xSeconds':v=((_duration$months4=duration.months)!==null&&_duration$months4!==void 0?_duration$months4:0)+((_duration$days3=duration.days)!==null&&_duration$days3!==void 0?_duration$days3:0)+((_duration$hours2=duration.hours)!==null&&_duration$hours2!==void 0?_duration$hours2:0)+((_duration$minutes=duration.minutes)!==null&&_duration$minutes!==void 0?_duration$minutes:0);return val>0||v>0?"".concat(val,"s"):'';default:}return undefined;}}});}function isValidAddress(value){return!!value&&Object(web3_utils__WEBPACK_IMPORTED_MODULE_3__["isAddress"])(value)&&value!=='0x0000000000000000000000000000000000000000';}function doSequential(tasks,callback){var results=[];return tasks.reduce(function(p,task,index){return p.then(function(){return callback(task,index);}).then(function(result){return results.push(result);}).catch(function(){return results.push(undefined);});},Promise.resolve()).then(function(){return results;});}function getRelativeTime(seconds){return Object(date_fns_formatDuration__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Object(date_fns_intervalToDuration__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({start:0,end:seconds*1000}));}function numberFormat(number,options){return new Intl.NumberFormat(navigator.language,options).format(number);}

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return useContractManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return useErc20Contract; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var web3_components_contract_listener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(633);
/* harmony import */ var web3_erc20Contract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(94);
/* harmony import */ var web3_web3Contract__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40);
/* harmony import */ var components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(37);
/* harmony import */ var hooks_useReload__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(127);
/* harmony import */ var wallets_walletProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(80);
/* harmony import */ var utils_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(62);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
var Context=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])(Object(utils_context__WEBPACK_IMPORTED_MODULE_8__[/* InvariantContext */ "a"])('ContractManagerProvider'));function useContractManager(){return Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(Context);}function useContract(address,factory){var _useReload=Object(hooks_useReload__WEBPACK_IMPORTED_MODULE_6__[/* useReload */ "a"])(),_useReload2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useReload,1),reload=_useReload2[0];var manager=useContractManager();var contract=manager.getContract(address,factory);contract.on(web3_web3Contract__WEBPACK_IMPORTED_MODULE_4__[/* default */ "c"].UPDATE_DATA,reload);return contract;}function useErc20Contract(address){var abi=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var _useReload3=Object(hooks_useReload__WEBPACK_IMPORTED_MODULE_6__[/* useReload */ "a"])(),_useReload4=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useReload3,1),reload=_useReload4[0];var manager=useContractManager();if(!address){return undefined;/// TODO: re-think
}var contract=manager.getContract(address,function(){return new web3_erc20Contract__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"](abi,address);});contract.on(web3_web3Contract__WEBPACK_IMPORTED_MODULE_4__[/* default */ "c"].UPDATE_DATA,reload);return contract;}var ContractManagerProvider=function ContractManagerProvider(props){var children=props.children;var wallet=Object(wallets_walletProvider__WEBPACK_IMPORTED_MODULE_7__[/* useWallet */ "c"])();var web3=Object(components_providers_web3Provider__WEBPACK_IMPORTED_MODULE_5__[/* useWeb3 */ "d"])();var contractsRef=Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(new Map());var _useReload5=Object(hooks_useReload__WEBPACK_IMPORTED_MODULE_6__[/* useReload */ "a"])(),_useReload6=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useReload5,1),reload=_useReload6[0];var web3ProviderRef=Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(web3.activeProvider);if(web3ProviderRef.current!==web3.activeProvider){web3ProviderRef.current=web3.activeProvider;contractsRef.current.forEach(function(contract){contract.setCallProvider(web3.activeProvider);});reload();}var walletProviderRef=Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(wallet.provider);if(walletProviderRef.current!==wallet.provider){walletProviderRef.current=wallet.provider;contractsRef.current.forEach(function(contract){contract.setProvider(wallet.provider);});reload();}var walletAccountRef=Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(wallet.account);if(walletAccountRef.current!==wallet.account){walletAccountRef.current=wallet.account;contractsRef.current.forEach(function(contract){contract.setAccount(wallet.account);});reload();}/**
   * @param address - Contract address
   * @param factory - Creates Contract entity in case when contract is not found
   */function getContract(address,factory){var contract;if(!contractsRef.current.has(address)){var _factory;contract=(_factory=factory===null||factory===void 0?void 0:factory())!==null&&_factory!==void 0?_factory:new web3_web3Contract__WEBPACK_IMPORTED_MODULE_4__[/* default */ "c"]([],address,'');contract.setCallProvider(web3ProviderRef.current);contract.setProvider(walletProviderRef.current);contract.setAccount(walletAccountRef.current);contractsRef.current.set(address,contract);reload();}else{contract=contractsRef.current.get(address);}return contract;}var value={getContract:getContract};return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxs"])(Context.Provider,{value:value,children:[children,Array.from(contractsRef.current).map(function(_ref){var _ref2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_ref,2),address=_ref2[0],contract=_ref2[1];return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__["jsx"])(web3_components_contract_listener__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],{contract:contract},address);})]});};/* harmony default export */ __webpack_exports__["a"] = (ContractManagerProvider);

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export processResponse */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return executeFetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return useFetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return queryfy; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(628);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_4__);
function processResponse(_x){return _processResponse.apply(this,arguments);}function _processResponse(){_processResponse=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(response){return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:if(response.ok){_context2.next=4;break;}_context2.next=3;return response.json();case 3:throw _context2.sent;case 4:return _context2.abrupt("return",response.json());case 5:case"end":return _context2.stop();}}},_callee2);}));return _processResponse.apply(this,arguments);}function executeFetch(_x2){return _executeFetch.apply(this,arguments);}function _executeFetch(){_executeFetch=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(query){var response;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.prev=0;_context3.next=3;return fetch(String(query));case 3:response=_context3.sent;if(response.ok){_context3.next=8;break;}_context3.next=7;return response.json();case 7:throw _context3.sent;case 8:_context3.next=10;return response.json();case 10:return _context3.abrupt("return",_context3.sent);case 13:_context3.prev=13;_context3.t0=_context3["catch"](0);return _context3.abrupt("return",Promise.reject(_context3.t0));case 16:case"end":return _context3.stop();}}},_callee3,null,[[0,13]]);}));return _executeFetch.apply(this,arguments);}function useFetch(query,options){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),_useState2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_useState,2),loading=_useState2[0],setLoading=_useState2[1];var _useState3=Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),_useState4=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_useState3,2),loaded=_useState4[0],setLoaded=_useState4[1];var _useState5=Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(),_useState6=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_useState5,2),data=_useState6[0],setData=_useState6[1];var _useState7=Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(),_useState8=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_useState7,2),error=_useState8[0],setError=_useState8[1];var optionsRef=Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(options);optionsRef.current=options;var strQuery=String(query);var fetchData=Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(/*#__PURE__*/function(){var _ref=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(query){var _optionsRef$current$t,_optionsRef$current,_data;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(query){_context.next=2;break;}return _context.abrupt("return");case 2:setLoading(true);_context.prev=3;_context.next=6;return executeFetch(query);case 6:_data=_context.sent;setData(((_optionsRef$current$t=(_optionsRef$current=optionsRef.current)===null||_optionsRef$current===void 0?void 0:_optionsRef$current.transform)!==null&&_optionsRef$current$t!==void 0?_optionsRef$current$t:function(v){return v;})(_data));setLoaded(true);_context.next=15;break;case 11:_context.prev=11;_context.t0=_context["catch"](3);setError(_context.t0);setData(undefined);case 15:setLoading(false);case 16:case"end":return _context.stop();}}},_callee,null,[[3,11]]);}));return function(_x3){return _ref.apply(this,arguments);};}(),[]);var load=Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function(){var query=arguments.length>0&&arguments[0]!==undefined?arguments[0]:strQuery;setLoaded(false);return fetchData(String(query));},[strQuery]);var reset=Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function(){setLoading(false);setLoaded(false);setData(undefined);setError(undefined);},[]);Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function(){var _optionsRef$current2;if(((_optionsRef$current2=optionsRef.current)===null||_optionsRef$current2===void 0?void 0:_optionsRef$current2.lazy)!==true){fetchData(strQuery).catch(Error);}},[strQuery]);return{loading:loading,loaded:loaded,data:data,error:error,load:load,reset:reset};}function queryfy(obj){return query_string__WEBPACK_IMPORTED_MODULE_4___default.a.stringify(obj,{skipEmptyString:true,skipNull:true,arrayFormat:'comma',encode:true});}

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(262);
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(331);
/* harmony import */ var _s_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_s_module_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
var _excluded=["children","className","type"];var Button=function Button(props){var children=props.children,className=props.className,type=props.type,btnProps=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props,_excluded);var btnType;if(type==='light'){btnType='link';}else if(type==='select'){btnType='ghost';}else{btnType=type;}return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_3___default.a,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({className:classnames__WEBPACK_IMPORTED_MODULE_4___default()(_s_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.component,className,type==='light'&&_s_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.light,type==='select'&&_s_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.select),type:btnType},btnProps),{},{children:props.children}));};/* harmony default export */ __webpack_exports__["a"] = (Button);

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ WalletConnectors; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ useWallet; });

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(12);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-use-storage/lib/esm/index.js
var esm = __webpack_require__(133);

// EXTERNAL MODULE: ./node_modules/@gnosis.pm/safe-apps-react-sdk/dist/index.js
var dist = __webpack_require__(422);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./node_modules/@web3-react/core/dist/core.esm.js
var core_esm = __webpack_require__(332);

// EXTERNAL MODULE: ./node_modules/@web3-react/injected-connector/dist/injected-connector.esm.js
var injected_connector_esm = __webpack_require__(324);

// EXTERNAL MODULE: ./node_modules/antd/es/notification/index.js + 11 modules
var notification = __webpack_require__(1378);

// EXTERNAL MODULE: ./node_modules/bignumber.js/bignumber.js
var bignumber = __webpack_require__(16);
var bignumber_default = /*#__PURE__*/__webpack_require__.n(bignumber);

// EXTERNAL MODULE: ./node_modules/web3/lib/index.js
var lib = __webpack_require__(109);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/wolfy87-eventemitter/EventEmitter.js
var EventEmitter = __webpack_require__(219);
var EventEmitter_default = /*#__PURE__*/__webpack_require__.n(EventEmitter);

// EXTERNAL MODULE: ./src/components/providers/networkProvider.tsx
var networkProvider = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(8);

// EXTERNAL MODULE: ./src/components/antd/button/index.tsx
var antd_button = __webpack_require__(79);

// EXTERNAL MODULE: ./src/components/antd/modal/index.tsx
var modal = __webpack_require__(104);

// EXTERNAL MODULE: ./src/components/custom/grid/index.tsx
var grid = __webpack_require__(51);

// EXTERNAL MODULE: ./src/components/custom/typography/index.tsx
var typography = __webpack_require__(11);

// EXTERNAL MODULE: ./src/components/providers/generalProvider.tsx
var generalProvider = __webpack_require__(98);

// EXTERNAL MODULE: ./src/hooks/useMergeState.ts
var useMergeState = __webpack_require__(429);

// EXTERNAL MODULE: ./src/components/antd/select/index.tsx
var antd_select = __webpack_require__(458);

// EXTERNAL MODULE: ./node_modules/@web3-react/ledger-connector/dist/ledger-connector.esm.js
var ledger_connector_esm = __webpack_require__(641);

// CONCATENATED MODULE: ./src/resources/svg/wallets/ledger-logo-dark.svg
/* harmony default export */ var ledger_logo_dark = (__webpack_require__.p + "static/media/ledger-logo-dark.702f73f1.svg");
// CONCATENATED MODULE: ./src/resources/svg/wallets/ledger-logo.svg
/* harmony default export */ var ledger_logo = (__webpack_require__.p + "static/media/ledger-logo.5d3ead06.svg");
// CONCATENATED MODULE: ./src/wallets/connectors/ledger/index.ts
var LEDGER_BASE_DERIVATION_PATH='base_derivation_path';var LedgerWalletConfig={id:'ledger',logo:[ledger_logo,ledger_logo_dark],name:'Ledger',factory:function factory(network,args){var baseDerivationPath=args===null||args===void 0?void 0:args.baseDerivationPath;if(!baseDerivationPath){var _sessionStorage$getIt;baseDerivationPath=(_sessionStorage$getIt=sessionStorage.getItem(LEDGER_BASE_DERIVATION_PATH))!==null&&_sessionStorage$getIt!==void 0?_sessionStorage$getIt:undefined;}return new ledger_connector_esm["a" /* LedgerConnector */]({chainId:network.meta.chainId,url:network.rpc.httpsUrl,pollingInterval:network.rpc.poolingInterval,baseDerivationPath:baseDerivationPath});},onConnect:function onConnect(connector,args){var _window=window,sessionStorage=_window.sessionStorage;if(args===null||args===void 0?void 0:args.baseDerivationPath){var _args$baseDerivationP;sessionStorage.setItem(LEDGER_BASE_DERIVATION_PATH,(_args$baseDerivationP=args===null||args===void 0?void 0:args.baseDerivationPath)!==null&&_args$baseDerivationP!==void 0?_args$baseDerivationP:'');}},onDisconnect:function onDisconnect(){var _window2=window,sessionStorage=_window2.sessionStorage;sessionStorage.removeItem(LEDGER_BASE_DERIVATION_PATH);},onError:function onError(error){return error;}};/* harmony default export */ var ledger = (LedgerWalletConfig);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(1);

// CONCATENATED MODULE: ./src/wallets/components/ledger-deriviation-path-modal/index.tsx
var WEB3_LEDGER_DERIVATION_PATHS=[{value:"m/44'/60'/0'",label:"Ethereum - m/44'/60'/0'"},{value:"m/44'/60'/0'/0",label:"Ethereum - Ledger Live - m/44'/60'/0'/0"}];var ledger_deriviation_path_modal_LedgerDerivationPathModal=function LedgerDerivationPathModal(props){var modalProps=Object.assign({},props);var wallet=useWallet();var _React$useState=react_default.a.useState(String(WEB3_LEDGER_DERIVATION_PATHS[0].value)),_React$useState2=Object(slicedToArray["a" /* default */])(_React$useState,2),derivationPath=_React$useState2[0],setDerivationPath=_React$useState2[1];function handleSelect(value){setDerivationPath(value);}function handleConnect(){var _modalProps$onCancel;(_modalProps$onCancel=modalProps.onCancel)===null||_modalProps$onCancel===void 0?void 0:_modalProps$onCancel.call(modalProps);setTimeout(function(){wallet.connect(ledger,{baseDerivationPath:derivationPath}).catch(Error);});}return/*#__PURE__*/Object(jsx_runtime["jsx"])(modal["a" /* default */],Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({width:568},modalProps),{},{children:/*#__PURE__*/Object(jsx_runtime["jsxs"])(grid["a" /* default */],{flow:"row",gap:32,align:"center",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(antd_select["a" /* default */],{options:WEB3_LEDGER_DERIVATION_PATHS,value:derivationPath,onSelect:handleSelect,style:{width:'352px'}}),/*#__PURE__*/Object(jsx_runtime["jsx"])(antd_button["a" /* default */],{type:"primary",onClick:handleConnect,children:"Connect"})]})}));};/* harmony default export */ var ledger_deriviation_path_modal = (ledger_deriviation_path_modal_LedgerDerivationPathModal);
// CONCATENATED MODULE: ./src/wallets/components/connect-wallet-modal/index.tsx
var InitialState={showLedgerModal:false};var connect_wallet_modal_ConnectWalletModal=function ConnectWalletModal(props){var modalProps=Object.assign({},props);var _useGeneral=Object(generalProvider["b" /* useGeneral */])(),theme=_useGeneral.theme;var wallet=useWallet();var _useMergeState=Object(useMergeState["a" /* default */])(InitialState),_useMergeState2=Object(slicedToArray["a" /* default */])(_useMergeState,2),state=_useMergeState2[0],setState=_useMergeState2[1];function handleConnectorSelect(connector){if(wallet.isActive){return;}if(connector.id==='ledger'){setState({showLedgerModal:true});return;}wallet.connect(connector).catch(Error);}return/*#__PURE__*/Object(jsx_runtime["jsxs"])(modal["a" /* default */],Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({width:568},modalProps),{},{children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])(grid["a" /* default */],{flow:"row",gap:32,children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])(grid["a" /* default */],{flow:"row",gap:4,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"h2",weight:"bold",color:"primary",children:"Connect Wallet"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",color:"secondary",children:"Please select the wallet of your liking"})]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(grid["a" /* default */],{gap:24,colsTemplate:"repeat(auto-fit, minmax(120px, 240px))",children:WalletConnectors.map(function(connector){return/*#__PURE__*/Object(jsx_runtime["jsx"])(antd_button["a" /* default */],{type:"select",style:{height:'96px'},onClick:function onClick(){return handleConnectorSelect(connector);},children:/*#__PURE__*/Object(jsx_runtime["jsx"])("img",{src:Array.isArray(connector.logo)?connector.logo[theme==='dark'?1:0]:connector.logo,alt:connector.name,height:32})},connector.id);})})]}),state.showLedgerModal&&/*#__PURE__*/Object(jsx_runtime["jsx"])(ledger_deriviation_path_modal,{onCancel:function onCancel(){setState({showLedgerModal:false});}})]}));};/* harmony default export */ var connect_wallet_modal = (connect_wallet_modal_ConnectWalletModal);
// CONCATENATED MODULE: ./src/wallets/components/install-metamask-modal/index.tsx
var METAMASK_CHROME_EXT_URL='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';var install_metamask_modal_InstallMetaMaskModal=function InstallMetaMaskModal(props){var modalProps=Object.assign({},props);return/*#__PURE__*/Object(jsx_runtime["jsx"])(modal["a" /* default */],Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({width:568},modalProps),{},{children:/*#__PURE__*/Object(jsx_runtime["jsxs"])(grid["a" /* default */],{flow:"row",gap:24,children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])(grid["a" /* default */],{flow:"row",gap:16,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"h2",weight:"bold",color:"primary",children:"Install MetaMask"}),/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"secondary",children:["You need to have",' ',/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",tag:"span",weight:"bold",color:"primary",children:"MetaMask"}),' ',"installed to continue.",/*#__PURE__*/Object(jsx_runtime["jsx"])("br",{}),"Once you have installed it, please refresh the page"]})]}),/*#__PURE__*/Object(jsx_runtime["jsxs"])(grid["a" /* default */],{flow:"col",justify:"space-between",children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(antd_button["a" /* default */],{type:"primary",href:METAMASK_CHROME_EXT_URL,rel:"noopener noreferrer",target:"_blank",children:"Install MetaMask"}),/*#__PURE__*/Object(jsx_runtime["jsx"])(antd_button["a" /* default */],{type:"ghost",onClick:props.onCancel,children:"Go Back"})]})]})}));};/* harmony default export */ var install_metamask_modal = (install_metamask_modal_InstallMetaMaskModal);
// CONCATENATED MODULE: ./src/wallets/components/unsupported-chain-modal/index.tsx
var unsupported_chain_modal_UnsupportedChainModal=function UnsupportedChainModal(props){var modalProps=Object.assign({},props);var _useNetwork=Object(networkProvider["b" /* useNetwork */])(),activeNetwork=_useNetwork.activeNetwork;var wallet=useWallet();return/*#__PURE__*/Object(jsx_runtime["jsx"])(modal["a" /* default */],Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({width:568},modalProps),{},{children:/*#__PURE__*/Object(jsx_runtime["jsxs"])(grid["a" /* default */],{flow:"row",gap:24,align:"start",children:[/*#__PURE__*/Object(jsx_runtime["jsxs"])(grid["a" /* default */],{flow:"row",gap:16,children:[/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"h2",weight:"bold",color:"primary",children:"Wrong network"}),/*#__PURE__*/Object(jsx_runtime["jsxs"])(typography["b" /* Text */],{type:"p1",weight:"semibold",color:"secondary",children:["Please switch your wallet network to ",activeNetwork.meta.name," to use the app"]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(typography["b" /* Text */],{type:"p1",color:"secondary",children:"If you still encounter problems, you may want to switch to a different wallet"})]}),/*#__PURE__*/Object(jsx_runtime["jsx"])(antd_button["a" /* default */],{type:"ghost",onClick:function onClick(){var _props$onCancel;(_props$onCancel=props.onCancel)===null||_props$onCancel===void 0?void 0:_props$onCancel.call(props);wallet.showWalletsModal();},children:"Switch wallet"})]})}));};/* harmony default export */ var unsupported_chain_modal = (unsupported_chain_modal_UnsupportedChainModal);
// EXTERNAL MODULE: ./node_modules/@web3-react/walletlink-connector/dist/walletlink-connector.esm.js
var walletlink_connector_esm = __webpack_require__(643);

// CONCATENATED MODULE: ./src/resources/svg/wallets/coinbase-logo.svg
/* harmony default export */ var coinbase_logo = (__webpack_require__.p + "static/media/coinbase-logo.a0ef4d40.svg");
// CONCATENATED MODULE: ./src/wallets/connectors/coinbase/index.ts
var CoinbaseWalletConfig={id:'coinbase',logo:coinbase_logo,name:'Coinbase Wallet',factory:function factory(network,args){var _args$darkMode;var darkMode=(_args$darkMode=args===null||args===void 0?void 0:args.darkMode)!==null&&_args$darkMode!==void 0?_args$darkMode:false;return new walletlink_connector_esm["a" /* WalletLinkConnector */]({url:network.rpc.httpsUrl,appName:network.config.wallets.coinbaseAppName,appLogoUrl:'',darkMode:darkMode});},onDisconnect:function onDisconnect(connector){connector===null||connector===void 0?void 0:connector.close();},onError:function onError(error){var _ref=error,code=_ref.code;if(code===4001){// USER_DENIED_REQUEST_ACCOUNTS
return undefined;}return error;}};/* harmony default export */ var coinbase = (CoinbaseWalletConfig);
// EXTERNAL MODULE: ./src/wallets/connectors/gnosis-safe/index.ts
var gnosis_safe = __webpack_require__(254);

// EXTERNAL MODULE: ./src/wallets/connectors/metamask/index.ts + 2 modules
var metamask = __webpack_require__(165);

// EXTERNAL MODULE: ./node_modules/@web3-react/portis-connector/dist/portis-connector.esm.js
var portis_connector_esm = __webpack_require__(645);

// CONCATENATED MODULE: ./src/resources/svg/wallets/portis-logo.svg
/* harmony default export */ var portis_logo = (__webpack_require__.p + "static/media/portis-logo.759c7e8c.svg");
// CONCATENATED MODULE: ./src/wallets/connectors/portis/index.ts
var PortisWalletConfig={id:'portis',logo:portis_logo,name:'Portis',factory:function factory(network){return new portis_connector_esm["a" /* PortisConnector */]({dAppId:network.config.wallets.portisId,networks:[network.meta.chainId]});},onError:function onError(error){if(typeof error==='string'){if(error==='User denied login.'){return undefined;}}return error;}};/* harmony default export */ var portis = (PortisWalletConfig);
// EXTERNAL MODULE: ./node_modules/@web3-react/trezor-connector/dist/trezor-connector.esm.js
var trezor_connector_esm = __webpack_require__(646);

// CONCATENATED MODULE: ./src/resources/svg/wallets/trezor-logo-dark.svg
/* harmony default export */ var trezor_logo_dark = (__webpack_require__.p + "static/media/trezor-logo-dark.1cfb8ddb.svg");
// CONCATENATED MODULE: ./src/resources/svg/wallets/trezor-logo.svg
/* harmony default export */ var trezor_logo = (__webpack_require__.p + "static/media/trezor-logo.aa8e796d.svg");
// CONCATENATED MODULE: ./src/wallets/connectors/trezor/index.ts
var TrezorWalletConfig={id:'trezor',logo:[trezor_logo,trezor_logo_dark],name:'Trezor',factory:function factory(network){return new trezor_connector_esm["a" /* TrezorConnector */]({chainId:network.meta.chainId,url:network.rpc.httpsUrl,pollingInterval:network.rpc.poolingInterval,manifestEmail:network.config.wallets.trezorEmail,manifestAppUrl:network.config.wallets.trezorAppUrl,config:{networkId:network.meta.chainId}});},onError:function onError(error){if(error.message==='Cancelled'){return undefined;}if(error.message==='Popup closed'){return undefined;}return error;}};/* harmony default export */ var trezor = (TrezorWalletConfig);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/@web3-react/walletconnect-connector/dist/walletconnect-connector.esm.js
var walletconnect_connector_esm = __webpack_require__(647);

// CONCATENATED MODULE: ./src/resources/svg/wallets/walletconnect-logo.svg
/* harmony default export */ var walletconnect_logo = (__webpack_require__.p + "static/media/walletconnect-logo.af2f1a97.svg");
// CONCATENATED MODULE: ./src/wallets/connectors/wallet-connect/index.ts
var WalletConnectConfig={id:'walletconnect',logo:walletconnect_logo,name:'WalletConnect',factory:function factory(network){return new walletconnect_connector_esm["a" /* WalletConnectConnector */]({rpc:Object(defineProperty["a" /* default */])({},network.meta.chainId,network.rpc.httpsUrl),pollingInterval:network.rpc.poolingInterval,bridge:network.config.wallets.walletConnectBridge,qrcode:true});},onDisconnect:function onDisconnect(connector){connector===null||connector===void 0?void 0:connector.close();},onError:function onError(error){return error;}};/* harmony default export */ var wallet_connect = (WalletConnectConfig);
// EXTERNAL MODULE: ./src/utils/context.ts
var context = __webpack_require__(62);

// CONCATENATED MODULE: ./src/wallets/walletProvider.tsx
var WalletConnectors=[metamask["b" /* default */],ledger,portis,trezor,coinbase,wallet_connect];var Context=/*#__PURE__*/Object(react["createContext"])(Object(context["a" /* InvariantContext */])('Web3WalletProvider'));function useWallet(){return Object(react["useContext"])(Context);}var walletProvider_Web3WalletProvider=function Web3WalletProvider(props){var _web3React$account;var _useNetwork=Object(networkProvider["b" /* useNetwork */])(),activeNetwork=_useNetwork.activeNetwork;var web3React=Object(core_esm["c" /* useWeb3React */])();var safeApps=Object(dist["useSafeAppsSDK"])();var _useSessionStorage=Object(esm["b" /* useSessionStorage */])('wallet_provider'),_useSessionStorage2=Object(slicedToArray["a" /* default */])(_useSessionStorage,3),sessionProvider=_useSessionStorage2[0],setSessionProvider=_useSessionStorage2[1],removeSessionProvider=_useSessionStorage2[2];var event=Object(react["useMemo"])(function(){return new EventEmitter_default.a();},[]);var _useState=Object(react["useState"])(false),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),initialized=_useState2[0],setInitialized=_useState2[1];var _useState3=Object(react["useState"])(undefined),_useState4=Object(slicedToArray["a" /* default */])(_useState3,2),connecting=_useState4[0],setConnecting=_useState4[1];var connectingRef=Object(react["useRef"])(connecting);connectingRef.current=connecting;var _useState5=Object(react["useState"])(),_useState6=Object(slicedToArray["a" /* default */])(_useState5,2),activeMeta=_useState6[0],setActiveMeta=_useState6[1];var _useState7=Object(react["useState"])(),_useState8=Object(slicedToArray["a" /* default */])(_useState7,2),ethBalance=_useState8[0],setEthBalance=_useState8[1];var _useState9=Object(react["useState"])(false),_useState10=Object(slicedToArray["a" /* default */])(_useState9,2),connectWalletModal=_useState10[0],setConnectWalletModal=_useState10[1];var _useState11=Object(react["useState"])(false),_useState12=Object(slicedToArray["a" /* default */])(_useState11,2),unsupportedChainModal=_useState12[0],setUnsupportedChainModal=_useState12[1];var _useState13=Object(react["useState"])(false),_useState14=Object(slicedToArray["a" /* default */])(_useState13,2),installMetaMaskModal=_useState14[0],setInstallMetaMaskModal=_useState14[1];var prevConnectedAccount=Object(react["useRef"])(web3React.account);if(prevConnectedAccount.current!==web3React.account){prevConnectedAccount.current=web3React.account;event.emit('UPDATE_ACCOUNT',web3React.account);}var disconnect=Object(react["useCallback"])(function(){var _activeMeta$onDisconn;web3React.deactivate();activeMeta===null||activeMeta===void 0?void 0:(_activeMeta$onDisconn=activeMeta.onDisconnect)===null||_activeMeta$onDisconn===void 0?void 0:_activeMeta$onDisconn.call(activeMeta,web3React.connector);setConnecting(undefined);setActiveMeta(undefined);setEthBalance(undefined);removeSessionProvider();},[web3React,activeMeta,removeSessionProvider,setConnecting]);var connect=Object(react["useCallback"])(/*#__PURE__*/function(){var _ref=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(walletConfig,args){var connector,onError,onSuccess;return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:onSuccess=function _onSuccess(){var _walletConfig$onConne;if(!connectingRef.current){return;}(_walletConfig$onConne=walletConfig.onConnect)===null||_walletConfig$onConne===void 0?void 0:_walletConfig$onConne.call(walletConfig,connector,args);setActiveMeta(walletConfig);setSessionProvider(walletConfig.id);};onError=function _onError(error){console.error('WalletProvider::Connect().onError',{error:error});if(error instanceof injected_connector_esm["b" /* NoEthereumProviderError */]){setInstallMetaMaskModal(true);disconnect();}else if(error instanceof core_esm["a" /* UnsupportedChainIdError */]){setUnsupportedChainModal(true);disconnect();}else{var _walletConfig$onError;var err=(_walletConfig$onError=walletConfig.onError)===null||_walletConfig$onError===void 0?void 0:_walletConfig$onError.call(walletConfig,error);if(err){notification["a" /* default */].error({message:err.message});}}};if(!connectingRef.current){_context.next=4;break;}return _context.abrupt("return");case 4:connectingRef.current=walletConfig;setConnecting(walletConfig);setConnectWalletModal(false);connector=walletConfig.factory(activeNetwork,args);_context.next=10;return web3React.activate(connector,undefined,true).then(onSuccess).catch(onError);case 10:setConnecting(undefined);case 11:case"end":return _context.stop();}}},_callee);}));return function(_x,_x2){return _ref.apply(this,arguments);};}(),[web3React,connectingRef,setConnecting,setSessionProvider,disconnect]);Object(react["useEffect"])(function(){if(web3React.account){var ethWeb3=new lib_default.a(web3React.library);ethWeb3.eth.getBalance(web3React.account).then(function(value){setEthBalance(value?new bignumber_default.a(value):undefined);}).catch(Error);}else{setEthBalance(undefined);}},[web3React.account]);Object(react["useEffect"])(function(){Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee2(){var walletConnector;return regenerator_default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:if(!sessionProvider){_context2.next=5;break;}walletConnector=WalletConnectors.find(function(c){return c.id===sessionProvider;});if(!walletConnector){_context2.next=5;break;}_context2.next=5;return connect(walletConnector);case 5:setInitialized(true);case 6:case"end":return _context2.stop();}}},_callee2);}))();},[]);Object(react["useEffect"])(function(){if(safeApps.connected){connect(gnosis_safe["a" /* default */]).catch(Error);}},[safeApps.connected]);var value={initialized:initialized,connecting:connecting,isActive:web3React.active,account:(_web3React$account=web3React.account)!==null&&_web3React$account!==void 0?_web3React$account:undefined,meta:activeMeta,connector:web3React.connector,provider:web3React.library,ethBalance:ethBalance,showWalletsModal:function showWalletsModal(){setConnectWalletModal(true);},connect:connect,disconnect:disconnect,event:event};return/*#__PURE__*/Object(jsx_runtime["jsxs"])(Context.Provider,{value:value,children:[props.children,connectWalletModal&&/*#__PURE__*/Object(jsx_runtime["jsx"])(connect_wallet_modal,{onCancel:function onCancel(){return setConnectWalletModal(false);}}),installMetaMaskModal&&/*#__PURE__*/Object(jsx_runtime["jsx"])(install_metamask_modal,{onCancel:function onCancel(){return setInstallMetaMaskModal(false);}}),unsupportedChainModal&&/*#__PURE__*/Object(jsx_runtime["jsx"])(unsupported_chain_modal,{onCancel:function onCancel(){return setUnsupportedChainModal(false);}})]});};var walletProvider_WalletProvider=function WalletProvider(props){var children=props.children;return/*#__PURE__*/Object(jsx_runtime["jsx"])(core_esm["b" /* Web3ReactProvider */],{getLibrary:function getLibrary(library){return library;},children:/*#__PURE__*/Object(jsx_runtime["jsx"])(dist_default.a,{children:/*#__PURE__*/Object(jsx_runtime["jsx"])(walletProvider_Web3WalletProvider,{children:children})})});};/* harmony default export */ var walletProvider = __webpack_exports__["b"] = (walletProvider_WalletProvider);

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"component":"s_component__1I0Y0","burger":"s_burger__1_Dr0","logo":"s_logo__2Pi5A","title":"s_title__2BOuD","addToken":"s_addToken__8uRIj","actionButton":"s_actionButton__1PUTR","queuedPositions":"s_queuedPositions__1mi_h","queuedPosition":"s_queuedPosition__2Q5bA"};

/***/ }),

/***/ 848:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 850:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 923:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 925:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Erc20Contract; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30);
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(31);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(16);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(40);
var ERC20ABI=[Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('name',[],['string']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('symbol',[],['string']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('decimals',[],['uint8']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('totalSupply',[],['uint256']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('balanceOf',['address'],['uint256']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('allowance',['address','address'],['uint256']),Object(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* createAbiItem */ "b"])('approve',['address','uint256'],['bool'])];var Erc20Contract=/*#__PURE__*/function(_Web3Contract){Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(Erc20Contract,_Web3Contract);var _super=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(Erc20Contract);function Erc20Contract(abi,address){var _this;Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(this,Erc20Contract);_this=_super.call(this,[].concat(ERC20ABI,Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(abi)),address,'');_this.symbol=void 0;_this.decimals=void 0;_this.totalSupply=void 0;_this.balances=void 0;_this.allowances=void 0;_this.balances=new Map();_this.allowances=new Map();_this.on(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* default */ "c"].UPDATE_ACCOUNT,function(){_this.balances.clear();_this.allowances.clear();_this.emit(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* default */ "c"].UPDATE_DATA);});return _this;}Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Erc20Contract,[{key:"balance",get:function get(){return this.getBalanceOf(this.account);}},{key:"getBalanceOf",value:function getBalanceOf(){var address=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.account;return address?this.balances.get(address):undefined;}},{key:"getAllowanceOf",value:function getAllowanceOf(spenderAddress){return spenderAddress?this.allowances.get(spenderAddress):undefined;}},{key:"isAllowedOf",value:function isAllowedOf(spenderAddress){var _this$getAllowanceOf;return(_this$getAllowanceOf=this.getAllowanceOf(spenderAddress))===null||_this$getAllowanceOf===void 0?void 0:_this$getAllowanceOf.gt(bignumber_js__WEBPACK_IMPORTED_MODULE_8___default.a.ZERO);}},{key:"loadCommon",value:function(){var _loadCommon=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(){var _yield$this$batch,_yield$this$batch2,name,symbol,decimals,totalSupply;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return this.batch([{method:'name'},{method:'symbol'},{method:'decimals'},{method:'totalSupply'}]);case 2:_yield$this$batch=_context.sent;_yield$this$batch2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_yield$this$batch,4);name=_yield$this$batch2[0];symbol=_yield$this$batch2[1];decimals=_yield$this$batch2[2];totalSupply=_yield$this$batch2[3];this.name=name;this.symbol=symbol;this.decimals=Number(decimals);this.totalSupply=bignumber_js__WEBPACK_IMPORTED_MODULE_8___default.a.from(totalSupply);this.emit(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* default */ "c"].UPDATE_DATA);case 13:case"end":return _context.stop();}}},_callee,this);}));function loadCommon(){return _loadCommon.apply(this,arguments);}return loadCommon;}()},{key:"loadBalance",value:function(){var _loadBalance=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(){var address,balance,value,_args2=arguments;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:address=_args2.length>0&&_args2[0]!==undefined?_args2[0]:this.account;if(address){_context2.next=3;break;}return _context2.abrupt("return",Promise.reject(new Error('Invalid owner address!')));case 3:_context2.next=5;return this.call('balanceOf',[address]);case 5:balance=_context2.sent;value=bignumber_js__WEBPACK_IMPORTED_MODULE_8___default.a.from(balance);if(value){this.balances.set(address,value);this.emit(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* default */ "c"].UPDATE_DATA);}case 8:case"end":return _context2.stop();}}},_callee2,this);}));function loadBalance(){return _loadBalance.apply(this,arguments);}return loadBalance;}()},{key:"loadAllowance",value:function(){var _loadAllowance=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(spenderAddress){var address,allowance,value;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:address=this.account;if(address){_context3.next=3;break;}return _context3.abrupt("return",Promise.reject(new Error('Invalid owner address!')));case 3:_context3.next=5;return this.call('allowance',[address,spenderAddress]);case 5:allowance=_context3.sent;value=bignumber_js__WEBPACK_IMPORTED_MODULE_8___default.a.from(allowance);if(value){this.allowances.set(spenderAddress,value);this.emit(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* default */ "c"].UPDATE_DATA);}case 8:case"end":return _context3.stop();}}},_callee3,this);}));function loadAllowance(_x){return _loadAllowance.apply(this,arguments);}return loadAllowance;}()},{key:"approve",value:function(){var _approve=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(spenderAddress,enable){var value;return _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:if(spenderAddress){_context4.next=2;break;}return _context4.abrupt("return",Promise.reject(new Error('Invalid spender address!')));case 2:value=enable?bignumber_js__WEBPACK_IMPORTED_MODULE_8___default.a.MAX_UINT_256:bignumber_js__WEBPACK_IMPORTED_MODULE_8___default.a.ZERO;_context4.next=5;return this.send('approve',[spenderAddress,value]);case 5:_context4.next=7;return this.loadAllowance(spenderAddress).catch(function(){return undefined;});case 7:case"end":return _context4.stop();}}},_callee4,this);}));function approve(_x2,_x3){return _approve.apply(this,arguments);}return approve;}()}]);return Erc20Contract;}(web3_web3Contract__WEBPACK_IMPORTED_MODULE_9__[/* default */ "c"]);

/***/ }),

/***/ 958:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 963:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 965:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 972:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useGeneral; });
/* harmony import */ var _Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_use_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(133);
/* harmony import */ var _rooks_use_window_event_listener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(639);
/* harmony import */ var utils_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
var Context=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])(Object(utils_context__WEBPACK_IMPORTED_MODULE_4__[/* InvariantContext */ "a"])('GeneralProvider'));var mqlDark=window.matchMedia('(prefers-color-scheme: dark)');var defaultTheme=mqlDark.matches?'dark':'light';function useGeneral(){return Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(Context);}var GeneralProvider=function GeneralProvider(props){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),_useState2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState,2),navOpen=_useState2[0],setNavOpen=_useState2[1];var _useState3=Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(window.document.visibilityState),_useState4=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState3,2),visibilityState=_useState4[0],setVisibilityState=_useState4[1];var _useState5=Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(defaultTheme),_useState6=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState5,2),osColorScheme=_useState6[0],setOsColorScheme=_useState6[1];var _useLocalStorage=Object(react_use_storage__WEBPACK_IMPORTED_MODULE_2__[/* useLocalStorage */ "a"])('bb_theme'),_useLocalStorage2=Object(_Users_shoekure_Dev_Swingby_barnbridge_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useLocalStorage,3),selectedTheme=_useLocalStorage2[0],setSelectedTheme=_useLocalStorage2[1],removeSelectedTheme=_useLocalStorage2[2];var theme=selectedTheme||osColorScheme;Object(_rooks_use_window_event_listener__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])('visibilitychange',function(){setVisibilityState(window.document.visibilityState);});Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function(){setOsColorScheme(defaultTheme);mqlDark.addEventListener('change',function(e){setOsColorScheme(e.matches?'dark':'light');});},[]);Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function(){if(theme){document.body.setAttribute('data-theme',theme);}else{document.body.removeAttribute('data-theme');}},[theme]);function toggleTheme(){if(selectedTheme==='light'){setSelectedTheme('dark');}else if(selectedTheme==='dark'){removeSelectedTheme();}else{setSelectedTheme('light');}}var value={navOpen:navOpen,setNavOpen:setNavOpen,theme:theme,selectedTheme:selectedTheme,toggleTheme:toggleTheme,windowState:{visibilityState:visibilityState,isVisible:visibilityState==='visible'}};return/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__["jsx"])(Context.Provider,{value:value,children:props.children});};/* harmony default export */ __webpack_exports__["a"] = (GeneralProvider);

/***/ }),

/***/ 985:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[1365,2,3]]]);