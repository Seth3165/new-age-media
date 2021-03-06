const db = require('../models');

exports.createMessage = async function (req, res, next) {
  try {
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id,
      post: req.params.post_id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    let foundPost = await db.Post.findById(req.params.post_id);
    foundPost.messages.push(message.id);
    await foundPost.save();
    let foundMessage = db.Message.findById(message._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundMessage);
  } catch(err) {
    return next(err);
  }
};

exports.getMessages = async function(req, res, next) {
  try {
    let messages = await db.Message.find({post: req.params.post_id})
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
};

// exports.getMessage = async function (req, res, next) {
//   try {
//     let message = await db.Message.find(req.params.message_id);
//     return res.status(200).json(message);
//   } catch(err) {
//     return next(err);
//   }
// };

exports.deleteMessage = async function (req, res, next) {
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch(err) {
    return next(err);
  }
};

module.exports = exports;