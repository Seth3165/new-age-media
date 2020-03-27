const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/namdevdb", {
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Post = require("./post");
module.exports.Message = require("./message");
module.exports.News = require("./news");