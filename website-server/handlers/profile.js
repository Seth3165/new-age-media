const db = require('../models');

exports.addFavorite = async function (req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    foundUser.favorites.push(req.params.post_id);
    await foundUser.save();
    console.log("success!");
    return res.status(200);
  } catch(err) {
    return next(err);
  }
};

exports.addArtist = async function (req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    foundUser.artists.push(req.params.artist_id);
    await foundUser.save();
    console.log("success!");
    return res.status(200);
  } catch(err) {
    return next(err);
  }
};

exports.showArtist = async function (req, res, next) {
  try {
    let user = await db.User.findById(req.params.artist_id);
    // .populate("posts", {
    //   title: true,
    // });
    return res.status(200).json(user);
  } catch(err) {
    return next(err);
  }
};

exports.showArtists = async function (req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    let artList = foundUser.artists;
    let artists = await db.User.find({_id: {$in: artList}});
    return res.status(200).json(artists);
  } catch(err) {
    return next(err);
  }
};

module.exports = exports;