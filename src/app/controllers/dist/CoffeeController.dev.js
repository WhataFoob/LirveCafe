"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Coffee = _interopRequireDefault(require("../models/Coffee.js"));

var _Comment = _interopRequireDefault(require("../models/Comment.js"));

var _Reply = _interopRequireDefault(require("../models/Reply.js"));

var _mongoose = require("../../support_lib/mongoose.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CoffeeController = {
  // GET /coffee/list
  index: function index(req, res, next) {
    _Coffee["default"].find({}).then(function (coffee) {
      res.render('drink/list/list.hbs', {
        coffee: (0, _mongoose.mongooseDocumentsToObject)(coffee)
      });
    })["catch"](next);
  },
  // GET /coffee/:slug
  show: function show(req, res, next) {
    _Coffee["default"].findOne({
      slug: req.params.slug
    }).then(function (coffee) {
      coffee = (0, _mongoose.singleMongooseDocumentToObject)(coffee);

      _Comment["default"].find({
        itemId: coffee._id
      }).then(function (commentList) {
        res.render('drink/item/coffee_info.hbs', {
          coffee: coffee,
          commentList: (0, _mongoose.mongooseDocumentsToObject)(commentList)
        });
      });
    })["catch"](next);
  },
  // GET: /coffee/create
  create: function create(req, res, next) {
    res.render('own/drink/item/create.hbs');
  },
  // POST /coffee/save
  save: function save(req, res, next) {
    req.body.image = '/' + req.file.path.split('\\').slice(2).join('/');
    var coffee = new _Coffee["default"](req.body);
    coffee.save().then(function () {
      return res.redirect('/own/stored/coffee');
    })["catch"](next);
  },
  // GET /coffee/:id/edit
  edit: function edit(req, res, next) {
    _Coffee["default"].findOne({
      _id: req.params.id
    }).then(function (coffee) {
      res.render('own/drink/item/edit.hbs', {
        coffee: (0, _mongoose.singleMongooseDocumentToObject)(coffee)
      });
    })["catch"](next);
  },
  // PATCH /coffee/:id
  update: function update(req, res, next) {
    if (req.file) req.body.image = '/' + req.file.path.split('\\').slice(2).join('/');

    _Coffee["default"].updateOne({
      _id: req.params.id
    }, req.body).then(function () {
      return res.redirect('back');
    })["catch"](next);
  },
  // SOFT DELETE /coffee/:id
  softDelete: function softDelete(req, res, next) {
    _Coffee["default"]["delete"]({
      _id: req.params.id
    }).then(function () {
      return res.redirect('back');
    })["catch"](next);
  },
  // DEEP DELETE /coffee/:id/force
  deepDelete: function deepDelete(req, res, next) {
    _Coffee["default"].deleteOne({
      _id: req.params.id
    }).then(function () {
      return res.redirect('back');
    })["catch"](next);
  },
  // PATCH /coffee/:id/restore
  restore: function restore(req, res, next) {
    _Coffee["default"].restore({
      _id: req.params.id
    }).then(function () {
      return res.redirect('back');
    })["catch"](next);
  },
  // POST /coffee/do-comment
  doComment: function doComment(req, res, next) {
    var comment = new _Comment["default"](req.body);
    comment.save().then(function () {
      return res.send((0, _mongoose.singleMongooseDocumentToObject)(comment));
    })["catch"](next);
  },
  // POST /coffee/reply-comment
  replyComment: function replyComment(req, res, next) {
    var reply = new _Reply["default"](req.body);

    _Comment["default"].findOne({
      _id: req.body.parentCommentId
    }).then(function (comment) {
      var replyList = comment.replyList;
      replyList.push(reply);
      comment.replyList = replyList;
      return new Promise(function (resolve) {
        comment.save();
        resolve();
      });
    }).then(function () {
      return new Promise(function (resolve) {
        reply.save();
        resolve();
      });
    }).then(function () {
      res.send("Reply comment Successfully");
    })["catch"](next);
  }
};
var _default = CoffeeController;
exports["default"] = _default;