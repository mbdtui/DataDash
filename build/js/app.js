/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRouter = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LoginPage = function (_React$Component) {
	  _inherits(LoginPage, _React$Component);
	
	  function LoginPage() {
	    _classCallCheck(this, LoginPage);
	
	    return _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).apply(this, arguments));
	  }
	
	  _createClass(LoginPage, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        'Test'
	      );
	    }
	  }]);
	
	  return LoginPage;
	}(_react2.default.Component);
	
	var App = function (_React$Component2) {
	  _inherits(App, _React$Component2);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	  }
	
	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        'Test'
	      );
	    }
	  }]);
	
	  return App;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: LoginPage }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'login', component: LoginPage }),
	    '//Page routes go here'
	  )
	), document.getElementById('index'));

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGRiMDRlNDc4ODljZGMxMDZmZWUiLCJ3ZWJwYWNrOi8vLy4vQzovVXNlcnMvV0xpYW8vRGVza3RvcC9EYXRhRGFzaC1tYXN0ZXIvRGF0YURhc2ggLSBDb3B5L2FwcC9hcHAuanMiXSwibmFtZXMiOlsiTG9naW5QYWdlIiwiQ29tcG9uZW50IiwiQXBwIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztLQUVNQSxTOzs7Ozs7Ozs7Ozs4QkFDSztBQUNQLGNBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQURGO0FBR0Q7Ozs7R0FMcUIsZ0JBQU1DLFM7O0tBUXhCQyxHOzs7Ozs7Ozs7Ozs4QkFDSztBQUNQLGNBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQURGO0FBR0Q7Ozs7R0FMZSxnQkFBTUQsUzs7QUFReEIsb0JBQVNFLE1BQVQsQ0FDRTtBQUFBO0FBQUEsS0FBUSxvQ0FBUjtBQUNFO0FBQUE7QUFBQSxPQUFPLE1BQUssR0FBWixFQUFnQixXQUFXRCxHQUEzQjtBQUVFLDhEQUFZLFdBQVdGLFNBQXZCLEdBRkY7QUFHRSx5REFBTyxNQUFLLE9BQVosRUFBb0IsV0FBV0EsU0FBL0IsR0FIRjtBQUFBO0FBQUE7QUFERixFQURGLEVBU0VJLFNBQVNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FURixFIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRkYjA0ZTQ3ODg5Y2RjMTA2ZmVlIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEluZGV4Um91dGUsIFJvdXRlciwgUm91dGUsIGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xyXG5cclxuY2xhc3MgTG9naW5QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlRlc3Q8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+VGVzdDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuUmVhY3RET00ucmVuZGVyKChcclxuICA8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cclxuICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17QXBwfT5cclxuICAgICAgey8qIFNob3cgdGhlIEZlZWQgYXQgLyAqL31cclxuICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtMb2dpblBhZ2V9IC8+XHJcbiAgICAgIDxSb3V0ZSBwYXRoPVwibG9naW5cIiBjb21wb25lbnQ9e0xvZ2luUGFnZX0gLz5cclxuICAgICAgLy9QYWdlIHJvdXRlcyBnbyBoZXJlXHJcbiAgICA8L1JvdXRlPlxyXG4gIDwvUm91dGVyPlxyXG4pLGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmRleCcpKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQzovVXNlcnMvV0xpYW8vRGVza3RvcC9EYXRhRGFzaC1tYXN0ZXIvRGF0YURhc2ggLSBDb3B5L2FwcC9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9