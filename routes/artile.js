// 1.创建写文章路由，并导出
// 2.在app.js中引入，app.use方法使用
// 3.
var express = require("express");
const { artiles } = require("../model/model");
var router = express.Router();
var fs = require("fs");
var multiparty = require("multiparty");
// 富文本上传
router.post("/write", async function (req, res, next) {
  var id = parseInt(req.body.id);
  if (id) {
    var page = req.body.page;
    var title = req.body.title;
    var content = req.body.content;
    const artile = await artiles.findOne({ id });
    artile.set({
      title: title,
      content: content,
    });
    artile.save();
    res.redirect("/?page=" + page);
  } else {
    let userDate = {
      title: req.body.title,
      content: req.body.content,
      username: req.session.username,
      id: Date.now(),
    };
    res.send(userDate);
    var userInfo = new artiles(userDate);
    userInfo.save(function (err, user) {
      if (err) return console.error(err);
      console.log("上传成功");
    });
    res.redirect("/");
  }
});
// 文件上传
router.post("/upload", function (req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log("上传失败");
    } else {
      let file = files.upload[0];
      let rs = fs.createReadStream(file.path);
      let newRs = "/upload/" + file.originalFilename;
      let ws = fs.createWriteStream("./public" + newRs);
      rs.pipe(ws);
      ws.on("close", function () {
        res.send({ uploaded: 1, url: newRs });
      });
    }
  });
});
router.get("/delete", async function (req, res, next) {
  var id = parseInt(req.query.id);
  var page = req.query.page;
  artiles.deleteMany({ id }, function (err) {
    console.log(err);
  });
  res.redirect("/?page=" + page);
});

module.exports = router;
