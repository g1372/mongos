var express = require("express");
const { Users } = require("../model/model");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// 注册
router.post("/register", function (req, res, next) {
  let userDate = {
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2,
  };
  res.send(userDate);

  var userInfo = new Users(userDate);
  userInfo.save(function (err, user) {
    if (err) return console.error(err);
    console.log("注册成功");
  });
});
// 登录
router.post("/login", function (req, res, next) {
  let userDate = {
    username: req.body.username,
    password: req.body.password,
  };

  Users.find(userDate, function (err, doc) {
    if (err) return console.error(err);
    if (doc.length > 0) {
      req.session.username = userDate.username;
      res.redirect("/");
    } else {
      console.log("登录失败");
      res.redirect("/login");
    }
  });
});

module.exports = router;
