var mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/zhuce")
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败，错误：" + err);
  });
module.exports = mongoose;
