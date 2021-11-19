"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _OwnController = _interopRequireDefault(require("../app/controllers/OwnController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/stored/coffee', _OwnController["default"].storedCoffee);
router.get('/stored/books', _OwnController["default"].storedBooks);
router.get('/stored/users', _OwnController["default"].storedUsers);
router.get('/stored/news', _OwnController["default"].storedNews);
router.get('/stored/promos', _OwnController["default"].storedPromos);
router.get('/stored/orders', _OwnController["default"].storedOrders);
router.get('/trash/coffee', _OwnController["default"].trashCoffee);
router.get('/trash/books', _OwnController["default"].trashBooks);
router.get('/trash/users', _OwnController["default"].trashUsers);
router.get('/trash/news', _OwnController["default"].trashNews);
router.get('/trash/promos', _OwnController["default"].trashPromos);
router.get('/trash/orders', _OwnController["default"].trashOrders);
var _default = router;
exports["default"] = _default;