var express = require("express");
var router = express.Router();
const { artiles } = require("../model/model");
var moment = require("moment");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let page = req.query.page;
  let data = {
    totle: "", //总页数
    currentPage: page, //当前页面
    list: [], //当前页面渲染的数据列表
  };
  let pageSize = 3; //每一页显示几条

  let datalist = await artiles
    .find()
    .limit(pageSize) //每一页显示5条数据
    .sort({ _id: -1 }) //倒序展示
    .skip(pageSize * (data.currentPage - 1)); //跳过本页之前的数据
  data.totle = Math.ceil((await artiles.find().count()) / pageSize); //页码数
  datalist.map((item) => {
    item["time"] = moment(item.id).format("MMM Do YY");
  });
  // console.log(datalist);
  data.list = datalist;
  let username = req.session.username || "";
  res.render("index", { username, title: "Express", data: data });
});
// 配置注册
router.get("/register", function (req, res, next) {
  res.render("register", {});
});
// 配置登录
router.get("/login", function (req, res, next) {
  res.render("login", {});
});
router.get("/write", async function (req, res, next) {
  var username = req.session.username || "";
  var id = parseInt(req.query.id);
  var page = req.query.page;
  var item = {
    title: "",
    content: "",
  };
  if (id) {
    item = await artiles.findOne({ id: id });
    item.page = page;
    res.render("write", { username, item });
  } else {
    res.render("write", { username, item });
  }
});
router.get("/detail", function (req, res, next) {
  res.render("detail", {});
});
module.exports = router;
