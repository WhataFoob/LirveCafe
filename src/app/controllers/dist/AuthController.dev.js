"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../models/User.js"));

var _mongoose = require("../../support_lib/mongoose.js");

var _serverSdk = _interopRequireDefault(require("@vonage/server-sdk"));

var _otpGenerator = _interopRequireDefault(require("otp-generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const vonage = new Vonage({
//   apiKey: "3784dde2",
//   apiSecret: "bYpbXqGawIqV9PIn"
// }, {debug: true})
var AuthController = {
  // GET auth/index
  index: function index(req, res, next) {
    if (req.signedCookies) {
      if (req.signedCookies.userId) {
        res.redirect('/');
        return true;
      }
    }

    res.render('auth/index');
  },
  // GET auth/logout
  logout: function logout(req, res, next) {
    res.clearCookie("userId");
    res.redirect('/');
  },
  // POST auth/login
  login: function login(req, res, next) {
    var _req$body = req.body,
        key = _req$body.key,
        password = _req$body.password;
    var errors = [];

    var checkLogin = function checkLogin(item) {
      if (password !== item.password) {
        return false;
      }

      if (key !== item.username && key !== item.phone && key !== item.email) return false;
      return true;
    };

    _User["default"].find({}).then(function (users) {
      users = (0, _mongoose.mongooseDocumentsToObject)(users);

      if (users.filter(checkLogin).length) {
        var user = users.filter(checkLogin)[0];
        res.cookie('userId', user._id, {
          signed: true
        }); // const from = 'Vonage APIs'
        // const to = '+84969973012'.replace(/\D/g,'')
        // let text = "Hello, you get 5 free milk teas on the opening day of new drinks from lirvecafehust Address: Alley 75 Giai Phong, Hanoi";
        // vonage.message.sendSms(from, to, text,
        //     (err, responseData) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         if(responseData.messages[0]['status'] === "0") {
        //             console.log("Message sent successfully.");
        //         } else {
        //             console.log(responseData);
        //         }
        //     }
        // })

        var data = {
          user: user // validToken: otpGenerator.generate(6, { upperCase: false, specialChars: false})

        }; // res.render('auth/2fa', {data: data});

        res.redirect('/');
        errors.push('username or phone or email or password is not correct');
        res.render('auth/index', {
          errors: errors,
          values: req.body
        });
      }
    })["catch"](next);
  }
};
var _default = AuthController;
exports["default"] = _default;