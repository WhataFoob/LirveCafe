"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Coffee = _interopRequireDefault(require("../models/Coffee.js"));

var _Book = _interopRequireDefault(require("../models/Book.js"));

var _News = _interopRequireDefault(require("../models/News.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _Event = _interopRequireDefault(require("../models/Event.js"));

var _Promo = _interopRequireDefault(require("../models/Promo.js"));

var _Orders = _interopRequireDefault(require("../models/Orders.js"));

var _mongoose = require("../../support_lib/mongoose.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var OwnController = {
  // 1. coffee warehouse
  // GET own/stored/coffee
  storedCoffee: function storedCoffee(req, res, next) {
    Promise.all([_Coffee["default"].find({}), _Coffee["default"].countDocumentsDeleted()]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          coffee = _ref2[0],
          deletedCount = _ref2[1];

      res.render('own/drink/list/store.hbs', {
        deletedCount: deletedCount,
        coffee: (0, _mongoose.mongooseDocumentsToObject)(coffee),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // GET own/trash/coffee
  trashCoffee: function trashCoffee(req, res, next) {
    _Coffee["default"].findDeleted({}).then(function (coffee) {
      res.render('own/drink/list/trash.hbs', {
        coffee: (0, _mongoose.mongooseDocumentsToObject)(coffee),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // 2. book warehouse
  // GET own/stored/books
  storedBooks: function storedBooks(req, res, next) {
    Promise.all([_Book["default"].find({}), _Book["default"].countDocumentsDeleted()]).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          books = _ref4[0],
          deletedCount = _ref4[1];

      res.render('own/books/list/store.hbs', {
        deletedCount: deletedCount,
        books: (0, _mongoose.mongooseDocumentsToObject)(books),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // GET own/trash/books
  trashBooks: function trashBooks(req, res, next) {
    _Book["default"].findDeleted({}).then(function (books) {
      res.render('own/books/list/trash.hbs', {
        books: (0, _mongoose.mongooseDocumentsToObject)(books),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // 3. user
  // GET own/stored/users
  storedUsers: function storedUsers(req, res, next) {
    Promise.all([_User["default"].find({}), _User["default"].countDocumentsDeleted()]).then(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          users = _ref6[0],
          deletedCount = _ref6[1];

      res.render('own/users/list/store.hbs', {
        deletedCount: deletedCount,
        users: (0, _mongoose.mongooseDocumentsToObject)(users),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // GET own/trash/users
  trashUsers: function trashUsers(req, res, next) {
    _User["default"].findDeleted({}).then(function (users) {
      res.render('own/users/list/trash.hbs', {
        users: (0, _mongoose.mongooseDocumentsToObject)(users),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // 4. News warehouse
  // GET own/stored/news
  storedNews: function storedNews(req, res, next) {
    Promise.all([_News["default"].find({}), _News["default"].countDocumentsDeleted()]).then(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          news = _ref8[0],
          deletedCount = _ref8[1];

      res.render('own/news/list/store.hbs', {
        deletedCount: deletedCount,
        news: (0, _mongoose.mongooseDocumentsToObject)(news),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // GET own/trash/news
  trashNews: function trashNews(req, res, next) {
    _News["default"].findDeleted({}).then(function (news) {
      res.render('own/news/list/store.hbs', {
        news: (0, _mongoose.mongooseDocumentsToObject)(news),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // 5. Events warehouse
  // GET own/stored/events
  storedEvents: function storedEvents(req, res, next) {
    Promise.all([_Event["default"].find({}), _Event["default"].countDocumentsDeleted()]).then(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          events = _ref10[0],
          deletedCount = _ref10[1];

      res.render('users/list/store.hbs', {
        deletedCount: deletedCount,
        events: (0, _mongoose.mongooseDocumentsToObject)(events),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // GET own/trash/events
  trashEvents: function trashEvents(req, res, next) {
    _Event["default"].findDeleted({}).then(function (events) {
      res.render('users/list/trash.hbs', {
        events: (0, _mongoose.mongooseDocumentsToObject)(events),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // 6.Promotions warehouse
  // GET own/stored/promos
  storedPromos: function storedPromos(req, res, next) {
    Promise.all([_Promo["default"].find({}), _Promo["default"].countDocumentsDeleted()]).then(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
          promos = _ref12[0],
          deletedCount = _ref12[1];

      res.render('own/promos/list/store.hbs', {
        deletedCount: deletedCount,
        promos: (0, _mongoose.mongooseDocumentsToObject)(promos),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // GET own/trash/promos
  trashPromos: function trashPromos(req, res, next) {
    _Promo["default"].findDeleted({}).then(function (promos) {
      res.render('own/promos/list/trash.hbs', {
        promos: (0, _mongoose.mongooseDocumentsToObject)(promos),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // 7. Orders warehouse
  // GET own/stored/orders
  storedOrders: function storedOrders(req, res, next) {
    Promise.all([_Orders["default"].find({}), _Orders["default"].countDocumentsDeleted()]).then(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
          orders = _ref14[0],
          deletedCount = _ref14[1];

      res.render('own/orders/list/store.hbs', {
        deletedCount: deletedCount,
        orders: (0, _mongoose.mongooseDocumentsToObject)(orders),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // GET own/trash/orders
  trashOrders: function trashOrders(req, res, next) {
    _Orders["default"].findDeleted({
      username: res.locals.user.username
    }).then(function (orders) {
      res.render('orders/list/trash.hbs', {
        orders: (0, _mongoose.mongooseDocumentsToObject)(orders),
        user: res.locals.user
      });
    })["catch"](next);
  }
};
var _default = OwnController;
exports["default"] = _default;