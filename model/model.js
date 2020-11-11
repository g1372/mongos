var mongoose = require("./index");

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  password2: String,
});
var artileSchema = mongoose.Schema({
  title: String,
  content: String,
  username: String,
  id: Number,
});

var Users = mongoose.model("User", userSchema);
var artiles = mongoose.model("Tel", artileSchema);
module.exports = {
  Users,
  artiles,
};
