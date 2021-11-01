"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseDelete = _interopRequireDefault(require("mongoose-delete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var Reply = new Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  parentCommentId: {
    type: String,
    required: true
  },
  meta: {
    votes: {
      type: Number,
      "default": 0
    },
    favs: {
      type: Number,
      "default": 0
    }
  }
}, {
  timestamps: true
});
Reply.plugin(_mongooseDelete["default"], {
  deleteAt: true,
  overrideMethods: 'all'
});

var _default = _mongoose["default"].model('Reply', Reply);

exports["default"] = _default;