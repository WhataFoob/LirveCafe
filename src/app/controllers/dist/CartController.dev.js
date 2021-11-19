"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Book = _interopRequireDefault(require("../models/Book.js"));

var _Cart = _interopRequireDefault(require("../models/Cart.js"));

var _Promo = _interopRequireDefault(require("../models/Promo.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _mongoose = require("../../support_lib/mongoose.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CartController = {
  addBookToCart: function addBookToCart(req, res, next) {
    var itemId = req.body.itemId;
    var username = req.body.username;
    var userCart = [];
    var data = {};
    Promise.all([_Cart["default"].findOne({
      username: username
    }), _Book["default"].findOne({
      _id: itemId
    }), _User["default"].findOne({
      username: username
    })]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          cart = _ref2[0],
          book = _ref2[1],
          user = _ref2[2];

      user = (0, _mongoose.singleMongooseDocumentToObject)(user);

      if (!cart) {
        userCart.push({
          book: (0, _mongoose.singleMongooseDocumentToObject)(book),
          quantity: 1
        });
        data = {
          username: username,
          itemList: userCart,
          level: user.level
        };
        console.log(data);
        cart = new _Cart["default"](data);
        return cart.save(data);
      } else {
        cart = (0, _mongoose.singleMongooseDocumentToObject)(cart);
        userCart = cart.itemList;
        var flag = false;

        for (var i = 0; i < userCart.length; i++) {
          if (userCart[i].book._id.toString() === itemId) {
            userCart[i].quantity = userCart[i].quantity + 1;
            flag = true;
            break;
          }
        }

        data = {
          username: username,
          itemList: userCart,
          level: user.level
        };
        console.log(data);

        if (!flag) {
          userCart.push({
            book: (0, _mongoose.singleMongooseDocumentToObject)(book),
            quantity: 1
          });
        }

        return _Cart["default"].updateOne({
          username: username
        }, {
          itemList: userCart
        });
      }
    }).then(function () {
      res.send(data);
    })["catch"](next);
  },
  showCart: function showCart(req, res, next) {
    var username = req.params.username;
    var level = parseInt(req.query.level);

    _Cart["default"].findOne({
      username: username
    }).then(function (cart) {
      cart = (0, _mongoose.singleMongooseDocumentToObject)(cart);
      if (!cart) cart = {
        username: username,
        itemList: []
      };
      var total = cart.itemList.reduce(function (acc, item) {
        return acc + parseInt(item.book.price) * parseInt(item.quantity);
      }, 0);
      return Promise.all([_Promo["default"].find({
        condition: {
          $lte: total
        }
      }), _Cart["default"].findOne({
        username: username
      })]);
    }).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          promoList = _ref4[0],
          cart = _ref4[1];

      if (!promoList) promoList = [];else promoList = (0, _mongoose.mongooseDocumentsToObject)(promoList);
      promoList.sort(function (a, b) {
        if (!a.discountAmount) a.disCountAmount = 0;
        if (!b.disCountAmount) b.disCountAmount = 0;
        if (!a.discountPercentage) a.disCountPercentage = 0;
        if (!b.disCountPercentage) b.disCountPercentage = 0;

        if (a.discountAmount && b.discountAmount) {
          if (a.discountAmount == b.discountAmount) return b.condition - a.condition;
          return a.discountAmount - b.discountAmount;
        }

        if (a.discountPercentage && b.discountPercentage) {
          if (a.discountPercentage == b.discountPercentage) return b.condition - a.condition;
          return a.discountPercentage - b.discountPercentage;
        }

        if (a.discountPercentage && b.discountAmount) return 1;
        return -1;
      });
      var limitPromo = parseInt(level * promoList.length / 6);
      promoList = promoList.slice(0, limitPromo);
      cart = (0, _mongoose.singleMongooseDocumentToObject)(cart);
      res.render('carts/index.hbs', {
        cart: cart,
        promoList: promoList
      });
    });
  },
  addByOne: function addByOne(req, res, next) {
    var data = req.body;
    var userCart = [];

    _Cart["default"].findOne({
      username: data.username
    }).then(function (cart) {
      cart = (0, _mongoose.singleMongooseDocumentToObject)(cart);
      userCart = cart.itemList;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = userCart[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.book._id.toString() === data.bookId) {
            item.quantity += 1;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _Cart["default"].updateOne({
        username: data.username
      }, {
        itemList: userCart
      });
    }).then(function () {
      res.locals.cart = userCart;
      console.log(res.locals.cart, "herererererer");
      res.send(userCart);
    })["catch"](next);
  },
  subtractByOne: function subtractByOne(req, res, next) {
    var data = req.body;
    var userCart = [];

    _Cart["default"].findOne({
      username: data.username
    }).then(function (cart) {
      cart = (0, _mongoose.singleMongooseDocumentToObject)(cart);
      userCart = cart.itemList;

      for (var i = 0; i < userCart.length; i++) {
        var item = userCart[i];

        if (item.book._id.toString() === data.bookId) {
          item.quantity -= 1;
        }

        if (item.quantity == 0) userCart.splice(i, 1);
      }

      return _Cart["default"].updateOne({
        username: data.username
      }, {
        itemList: userCart
      });
    }).then(function () {
      res.locals.cart = userCart;
      console.log(res.locals.cart, "herererererer");
      res.send({
        itemList: userCart
      });
    })["catch"](next);
  },
  addPromoToCart: function addPromoToCart(req, res, next) {
    var data = req.body;
    Promise.all([_Cart["default"].findOne({
      _id: data.cartId
    }), _Promo["default"].findOne({
      _id: data.promoId
    })]).then(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          cart = _ref6[0],
          promo = _ref6[1];
    })["catch"](next);
  }
};
var _default = CartController;
exports["default"] = _default;