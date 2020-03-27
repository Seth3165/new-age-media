const db = require('../models');

exports.createNews = async function (req, res, next) {
  try {
    let news = await db.News.create({
      title: req.body.title,
      description: req.body.description,
      newstype: req.body.newstype,
      file: req.body.filename,
      user: req.params.id
    });
    let foundNews = db.News.findById(news._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundNews);
  } catch(err) {
    return next(err);
  }
};

exports.getNews = async function (req, res, next) {
  try {
    let news = await db.News.find()
      // .sort({ createdAt: "desc" })
      // .skip( req.params.pageNumber > 1 ? ( ( req.params.pageNumber - 1 ) * 5 ) : 0)
      //       .limit( 5 )
      // .populate("user", {
      //   username: true,
      //   profileImageUrl: true
      // });
    return res.status(200).json(news);
  } catch (err) {
    return next(err);
  }
};

module.exports = exports;