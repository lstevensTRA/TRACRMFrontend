/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./TranscriptPanel/HelloWorld.tsx":
/*!****************************************!*\
  !*** ./TranscriptPanel/HelloWorld.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HelloWorld: () => (/* binding */ HelloWorld)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _fluentui_react_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fluentui/react-components */ \"@fluentui/react-components\");\n/* harmony import */ var _fluentui_react_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fluentui_react_components__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass HelloWorld extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.handleMessage = event => {\n      var _a;\n      console.log(\"TranscriptPanel: Received message\", event === null || event === void 0 ? void 0 : event.data);\n      var data = event.data;\n      if ((data === null || data === void 0 ? void 0 : data.type) === \"updateTranscript\") {\n        console.log(\"TranscriptPanel: Updating lead name\", data === null || data === void 0 ? void 0 : data.data);\n        var {\n          firstName,\n          lastName\n        } = (_a = data.data) !== null && _a !== void 0 ? _a : {};\n        this.setState({\n          leadName: \"\".concat(firstName, \" \").concat(lastName)\n        });\n      }\n    };\n    this.state = {\n      leadName: \"Loading...\"\n    };\n  }\n  componentDidMount() {\n    var _a;\n    console.log(\"TranscriptPanel: HelloWorld component mounted\");\n    (_a = window.parent) === null || _a === void 0 ? void 0 : _a.postMessage(\"transcript-panel-ready\", \"*\");\n    console.log(\"TranscriptPanel: Adding message event listener\");\n    window.addEventListener(\"message\", this.handleMessage);\n  }\n  componentWillUnmount() {\n    console.log(\"TranscriptPanel: Removing message event listener\");\n    window.removeEventListener(\"message\", this.handleMessage);\n  }\n  render() {\n    var {\n      userFullName\n    } = this.props;\n    var {\n      leadName\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fluentui_react_components__WEBPACK_IMPORTED_MODULE_1__.Label, null, \"Hello, my name is \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"strong\", null, userFullName), \". Nice to meet you1, \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"strong\", null, leadName), \". How can I help you?\");\n  }\n}\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./TranscriptPanel/HelloWorld.tsx?");

/***/ }),

/***/ "./TranscriptPanel/index.ts":
/*!**********************************!*\
  !*** ./TranscriptPanel/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TranscriptPanel: () => (/* binding */ TranscriptPanel)\n/* harmony export */ });\n/* harmony import */ var _HelloWorld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HelloWorld */ \"./TranscriptPanel/HelloWorld.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass TranscriptPanel {\n  constructor() {\n    this.userFullName = \"\";\n  }\n  init(context, notifyOutputChanged, state) {\n    this.userFullName = context.userSettings.userName;\n  }\n  updateView(context) {\n    var props = {\n      userFullName: this.userFullName\n    };\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_HelloWorld__WEBPACK_IMPORTED_MODULE_0__.HelloWorld, props);\n  }\n  getOutputs() {\n    return {};\n  }\n  destroy() {\n    // Cleanup if needed\n  }\n}\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./TranscriptPanel/index.ts?");

/***/ }),

/***/ "@fluentui/react-components":
/*!************************************!*\
  !*** external "FluentUIReactv940" ***!
  \************************************/
/***/ ((module) => {

module.exports = FluentUIReactv940;

/***/ }),

/***/ "react":
/*!***************************!*\
  !*** external "Reactv16" ***!
  \***************************/
/***/ ((module) => {

module.exports = Reactv16;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./TranscriptPanel/index.ts");
/******/ 	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = __webpack_exports__;
/******/ 	
/******/ })()
;
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('TRA.Controls.TranscriptPanel', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.TranscriptPanel);
} else {
	var TRA = TRA || {};
	TRA.Controls = TRA.Controls || {};
	TRA.Controls.TranscriptPanel = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.TranscriptPanel;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}