const mongoose = require("mongoose");
const User = require("./user");

var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
     type: String,
     default: "No description provided",
     maxLength: 640
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }],
  file: {
    type: String
  }
}, {
  timestamps:true
});

postSchema.pre("remove", async function(next){
  try {
    let user = await User.findById(this.user);
    user.posts.remove(this.id);
    await user.save();
    return next();
  } catch(err) {
    return next(err);
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;