const mongoose = require("mongoose");
// const User = require("./user");
// const Post = require("./post");

var newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
     type: String,
     default: "No description provided",
     maxLength: 640
  },
  newstype: {
    type: String,
    required: true
  },
  file: {
    type: String
  },
}, {
  timestamps: true
});

// newsSchema.pre("remove", async function(next){
//   try {
//     let user = await User.findById(this.user);
//     user.messages.remove(this.id);
//     await user.save();
//     let post = await Post.findById(this.post);
//     post.messages.remove(this.id);
//     await post.save();
//     return next();
//   } catch(err) {
//     return next(err);
//   }
// });

const News = mongoose.model('News', newsSchema);
module.exports = News;