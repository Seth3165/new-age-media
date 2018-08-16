const db = require('../models');

exports.createPost = async function (req, res, next) {
  try {
    let post = await db.Post.create({
      title: req.body.title,
      description: req.body.description,
      file: req.body.filename,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.posts.push(post.id);
    await foundUser.save();
    let foundPost = db.Post.findById(post._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundPost);
  } catch(err) {
    return next(err);
  }
};

exports.getPost = async function (req, res, next) {
  try {
    let post = await db.Post.findById(req.params.post_id)
    .populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(post);
  } catch(err) {
    return next(err);
  }
};

exports.showPosts = async function (req, res, next) {
  try {
    let posts = await db.Post.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

exports.deletePost = async function (req, res, next) {
  try {
    let foundPost = await db.Post.findById(req.params.post_id);
    await foundPost.remove();
    return res.status(200).json(foundPost);
  } catch(err) {
    return next(err);
  }
};

module.exports = exports;