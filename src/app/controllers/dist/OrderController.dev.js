"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Orders = _interopRequireDefault(require("../models/Orders.js"));

var _mongoose = require("../../support_lib/mongoose.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OrderController = {
  // GET /orders/list/:username
  index: function index(req, res, next) {
    var username = req.params.username;

    _Orders["default"].find({
      username: username
    }).then(function (orders) {
      res.render('orders/list/list.hbs', {
        orders: (0, _mongoose.mongooseDocumentsToObject)(orders),
        user: res.locals.user,
        cart: res.locals.cart
      });
    })["catch"](next);
  },
  // GET /orders/detail/:orderId
  show: function show(req, res, next) {
    var orderId = req.params.orderId;

    _Orders["default"].findOne({
      _id: orderId
    }).then(function (order) {
      order = (0, _mongoose.singleMongooseDocumentToObject)(order);
      console.log(order, "Lalala");
      res.render("orders/item/order_info.hbs", {
        order: order,
        user: res.locals.user
      });
    })["catch"](next);
  }
};
var _default = OrderController;
exports["default"] = _default;