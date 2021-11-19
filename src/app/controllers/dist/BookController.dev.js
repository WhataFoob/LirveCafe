"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Book = _interopRequireDefault(require("../models/Book.js"));

var _Order = _interopRequireDefault(require("../models/Order.js"));

var _Cart = _interopRequireDefault(require("../models/Cart.js"));

var _Orders = _interopRequireDefault(require("../models/Orders.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _Promo = _interopRequireDefault(require("../models/Promo.js"));

var _userRank = _interopRequireDefault(require("../constants/user.rank.js"));

var _Comment = _interopRequireDefault(require("../models/Comment.js"));

var _Reply = _interopRequireDefault(require("../models/Reply.js"));

var _mongoose = require("../../support_lib/mongoose.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var calculateUserLevel = function calculateUserLevel(_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      singleOrderList = _ref2[0],
      multiOrderList = _ref2[1],
      user = _ref2[2];

  if (!singleOrderList) singleOrderList = [];else singleOrderList = (0, _mongoose.mongooseDocumentsToObject)(singleOrderList);
  if (!multiOrderList) multiOrderList = [];else multiOrderList = (0, _mongoose.mongooseDocumentsToObject)(multiOrderList);
  var total = singleOrderList.reduce(function (acc, item) {
    return acc + item.total;
  }, 0) + multiOrderList.reduce(function (acc, item) {
    return acc + item.total;
  }, 0);
  var level = 0;

  for (var i = _userRank["default"].totalAmountPurchased.length - 1; i >= 0; i--) {
    if (total >= _userRank["default"].totalAmountPurchased[i]) {
      level = i + 1;
      break;
    }
  }

  user.level = level;
  return user.save();
};

var BookController = {
  // GET /books/list
  index: function index(req, res, next) {
    _Book["default"].find({}).then(function (books) {
      res.render('books/list/list.hbs', {
        books: (0, _mongoose.mongooseDocumentsToObject)(books),
        user: res.locals.user,
        cart: res.locals.cart
      });
    })["catch"](next);
  },
  // GET: /books/:slug
  show: function show(req, res, next) {
    _Book["default"].findOne({
      slug: req.params.slug
    }).then(function (book) {
      res.render('books/item/book_info.hbs', {
        book: (0, _mongoose.singleMongooseDocumentToObject)(book),
        user: res.locals.user,
        cart: res.locals.cart
      });
    })["catch"](next);
  },
  // GET: /books/buy/:id
  showPayForm: function showPayForm(req, res, next) {
    _Book["default"].findOne({
      _id: req.params.id
    }).then(function (book) {
      book = (0, _mongoose.singleMongooseDocumentToObject)(book);
      res.render('buy/buyOneItem.hbs', {
        book: book,
        user: res.locals.user,
        cart: res.locals.cart
      });
    });
  },
  // GET: /books/buys/:id
  showAllCartPayForm: function showAllCartPayForm(req, res, next) {
    var promoId = req.query.promoId;
    Promise.all([_Cart["default"].findOne({
      _id: req.params.id
    }), _Promo["default"].findOne({
      _id: promoId
    })]).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          cart = _ref4[0],
          promo = _ref4[1];

      cart = (0, _mongoose.singleMongooseDocumentToObject)(cart);
      var total = cart.itemList.reduce(function (acc, item) {
        return acc + parseInt(item.book.price) * parseInt(item.quantity);
      }, 0);
      res.render('buy/buyAllCart.hbs', {
        cart: cart,
        user: res.locals.user,
        total: total,
        promo: (0, _mongoose.singleMongooseDocumentToObject)(promo)
      });
    });
  },
  // POST: /book/buy
  buy: function buy(req, res, next) {
    var order = new _Order["default"](req.body);
    order.save().then(function () {
      return Promise.all([_Order["default"].find({
        username: order.username
      }), _Orders["default"].find({
        username: order.username
      }), _User["default"].findOne({
        username: order.username
      })]);
    }).then(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 3),
          singleOrderList = _ref6[0],
          multiOrderList = _ref6[1],
          user = _ref6[2];

      calculateUserLevel([singleOrderList, multiOrderList, user]);
    }).then(function () {
      res.send({
        order: (0, _mongoose.singleMongooseDocumentToObject)(order),
        user: res.locals.user,
        cart: res.locals.cart
      });
    })["catch"](next);
  },
  // POST: /books/buys
  buyAllCart: function buyAllCart(req, res, next) {
    var data = req.body;
    var itemId = data.itemId;
    delete data.itemId;
    data.itemList = [];
    var orders = new _Orders["default"](data);

    _Cart["default"].findOne({
      _id: itemId
    }).then(function (cart) {
      data.itemList = (0, _mongoose.singleMongooseDocumentToObject)(cart).itemList;
      orders = new _Orders["default"](data);
      return Promise.all([orders.save(), _Cart["default"].deleteOne({
        _id: itemId
      })]);
    }).then(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          x = _ref8[0],
          y = _ref8[1];

      return Promise.all([_Order["default"].find({
        username: data.username
      }), _Orders["default"].find({
        username: data.username
      }), _User["default"].findOne({
        username: data.username
      })]);
    }).then(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 3),
          singleOrderList = _ref10[0],
          multiOrderList = _ref10[1],
          user = _ref10[2];

      calculateUserLevel([singleOrderList, multiOrderList, user]);
    }).then(function () {
      return res.send("OK");
    })["catch"](next);
  },
  // GET: /books/create
  create: function create(req, res, next) {
    res.render('own/books/item/create.hbs', {
      user: res.locals.user
    });
  },
  // POST : /books/save
  save: function save(req, res, next) {
    req.body.image = '/' + req.file.path.split('\\').slice(2).join('/');
    var book = new _Book["default"](req.body);
    book.save().then(function () {
      return res.redirect('/own/stored/books');
    })["catch"](next);
  },
  // [GET] /books/:id/edit
  edit: function edit(req, res, next) {
    _Book["default"].findById(req.params.id).then(function (book) {
      res.render('own/books/item/edit.hbs', {
        book: (0, _mongoose.singleMongooseDocumentToObject)(book),
        user: res.locals.user,
        cart: res.locals.cart
      });
    })["catch"](next);
  },
  // PATCH /books/:id
  update: function update(req, res, next) {
    _Book["default"].updateOne({
      _id: req.params.id
    }, req.body).then(function () {
      return res.redirect('back');
    })["catch"](next);
  },
  // SOFT DELETE /books/:id
  softDelete: function softDelete(req, res, next) {
    _Book["default"]["delete"]({
      _id: req.params.id
    }).then(function () {
      return res.redirect('back');
    })["catch"](next);
  },
  // DEEP DELETE /books/:id/force
  deepDelete: function deepDelete(req, res, next) {
    _Book["default"].deleteOne({
      _id: req.params.id
    }).then(function () {
      return res.redirect('back');
    })["catch"](next);
  },
  // RESTORE BOOK (PATCH) /books/:id/restore
  restore: function restore(req, res, next) {
    _Book["default"].restore({
      _id: req.params.id
    }).then(function () {
      return res.redirect('back');
    })["catch"](next);
  }
};
var _default = BookController;
exports["default"] = _default;