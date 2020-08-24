const db = require('../models');

exports.createPost = async function (req, res, next) {
  try {
    let post = await db.Post.create({
      title: req.body.title,
      description: req.body.description,
      gallerytype: req.body.gallerytype,
      files: req.body.filenames,
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

exports.showPost = async function (req, res, next) {
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

exports.getPosts = async function (req, res, next) {
  try {
    let posts = await db.Post.find()
      .sort({ createdAt: "desc" })
      .skip( req.params.pageNumber > 1 ? ( ( req.params.pageNumber - 1 ) * 5 ) : 0)
             .limit( 5 )
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

exports.getMyPosts = async function (req, res, next) {
  try {
    let posts = await db.Post.find({user: req.params.id})
      .sort({ createdAt: "desc" })
      .skip( req.params.pageNumber > 1 ? ( ( req.params.pageNumber - 1 ) * 5 ) :0 )
             .limit( 5 )
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

exports.getMyFavorites = async function (req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    let favs = foundUser.favorites;
    let posts = await db.Post.find({_id: {$in: favs}})
      .sort({ createdAt: "desc" })
      .skip( req.params.pageNumber > 1 ? ( ( req.params.pageNumber - 1 ) * 5 ) : 0)
             .limit( 5 )
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
  } catch (err) {
    return next(err);
  }
};

exports.countPosts = async function (req, res, next) {
  try {
    let count = await db.Post.count();
    console.log(count)
    return res.status(200).json(count);
  } catch (err) {
    return next(err);
  }
};

module.exports = exports;