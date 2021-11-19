"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../models/User.js"));

var _mongoose = require("../../support_lib/mongoose.js");

var _avatar_processing = require("../../support_lib/avatar_processing.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UserController = {
  // GET /users/list
  index: function index(req, res, next) {
    _User["default"].find({}).then(function (users) {
      res.render('own/users/list/store.hbs', {
        users: (0, _mongoose.mongooseDocumentsToObject)(users),
        user: res.locals.user
      });
    })["catch"](next);
  },
  // GET: /users/:slug
  show: function show(req, res, next) {
    _User["default"].findOne({
      _id: req.params.id
    }).then(function (user) {
      res.render('users/item/user_info.hbs', _defineProperty({
        user: (0, _mongoose.singleMongooseDocumentToObject)(user)
      }, "user", res.locals.user));
    })["catch"](next);
  },
  // GET: /users/create
  create: function create(req, res, next) {
    res.render('users/info/item/create.hbs', {
      user: res.locals.user
    });
  },
  // POST : /users/save
  save: function save(req, res, next) {
    req.body.avatar = (0, _avatar_processing.getAvatar)(req);

    if (!req.body.avatar || req.body.avatar == '') {
      var name = req.body.firstname + ' ' + req.body.lastname;
      req.body.avatar = '/img/' + name + '-default.jpg';
    }

    var user = new _User["default"](req.body);
    user.save().then(function () {
      return res.render('/home/home.hbs', {
        user: user
      });
    })["catch"](next);
  },
  // [GET] /users/:id/edit
  edit: function edit(req, res, next) {
    _User["default"].findById(req.params.id).then(function (user) {
      res.render('users/item/edit.hbs', {
        user: (0, _mongoose.singleMongooseDocumentToObject)(user)
      });
    })["catch"](next);
  },
  // PATCH /users/:id
  update: function update(req, res, next) {
    _User["default"].updateOne({
      _id: req.params.id
    }, req.body).then(function () {
      return res.redirect('back');
    })["catch"](next);
  },
  // SOFT DELETE /users/:id
  softDelete: function softDelete(req, res, next) {
    _User["default"]["delete"]({
      _id: req.params.id
    }).then(function () {
      return res.redirect('back');
    })["catch"](next);
  },
  // DEEP DELETE /users/:id/force
  deepDelete: function deepDelete(req, res, next) {
    _User["default"].deleteOne({
      _id: req.params.id
    }).then(function () {
      return res.redirect('back');
    })["catch"](next);
  },
  // RESTORE User (PATCH) /users/:id/restore
  restore: function restore(req, res, next) {
    _User["default"].restore({
      _id: req.params.id
    }).then(function () {
      return res.redirect('back');
    })["catch"](next);
  }
};
var _default = UserController;
exports["default"] = _default;