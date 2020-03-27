const db = require('../models');

exports.createComment = async function (req, res, next) {
  try {
    let comment = await db.Comment.create({
      text: req.body.text,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.comments.push(comment.id);
    await foundUser.save();
    let foundComment = db.Comment.findById(comment._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundComment);
  } catch(err) {
    return next(err);
  }
};

exports.getComment = async function (req, res, next) {
  try {
    let comment = await db.Comment.find(req.params.comment_id);
    return res.status(200).json(comment);
  } catch(err) {
    return next(err);
  }
};

exports.deleteComment = async function (req, res, next) {
  try {
    let foundComment = await db.Comment.findById(req.params.comment_id);
    await foundComment.remove();
    return res.status(200).json(foundComment);
  } catch(err) {
    return next(err);
  }
};

module.exports = exports;