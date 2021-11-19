"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _book = _interopRequireDefault(require("./book.js"));

var _coffee = _interopRequireDefault(require("./coffee.js"));

var _event = _interopRequireDefault(require("./event.js"));

var _news = _interopRequireDefault(require("./news.js"));

var _user = _interopRequireDefault(require("./user.js"));

var _own = _interopRequireDefault(require("./own.js"));

var _auth = _interopRequireDefault(require("./auth.js"));

var _test = _interopRequireDefault(require("./test.js"));

var _email = _interopRequireDefault(require("./email.js"));

var _promo = _interopRequireDefault(require("./promo.js"));

var _cart = _interopRequireDefault(require("./cart.js"));

var _AuthMiddleware = _interopRequireDefault(require("../app/middleware/AuthMiddleware.js"));

var _order = _interopRequireDefault(require("./order.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routeObj = {
  route: function route(app) {
    app.use('/books', _AuthMiddleware["default"].getCurrentUserInfo, _book["default"]);
    app.use('/coffee', _AuthMiddleware["default"].getCurrentUserInfo, _coffee["default"]);
    app.use('/events', _AuthMiddleware["default"].getCurrentUserInfo, _event["default"]);
    app.use('/news', _AuthMiddleware["default"].getCurrentUserInfo, _news["default"]);
    app.use('/users', _AuthMiddleware["default"].getCurrentUserInfo, _user["default"]);
    app.use('/own', _AuthMiddleware["default"].getCurrentUserInfo, _own["default"]);
    app.use('/auth', _auth["default"]);
    app.use('/email', _AuthMiddleware["default"].getCurrentUserInfo, _email["default"]);
    app.use('/promos', _AuthMiddleware["default"].getCurrentUserInfo, _promo["default"]);
    app.use('/carts', _cart["default"]);
    app.use('/', _AuthMiddleware["default"].getCurrentUserInfo, _test["default"]);
    app.use('/orders', _AuthMiddleware["default"].getCurrentUserInfo, _order["default"]);
  }
};
var _default = routeObj;
exports["default"] = _default;