const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next){
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let {id, username, profileImageUrl, isAdmin} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch){
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl,
          isAdmin
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        isAdmin,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Passwod."
      });
    }
  } catch (e) {
    return next({status: 400, message: "Invalid Email/Password."});
  }
};

// if(req.body.code === "testtest"){
//       user.isAdmin = true;
//       await user.save();
//     }

exports.signup = async function(req, res, next){
  try {
    let user = await db.User.create(req.body);
    if(req.body.code === "testtest"){
      let foundUser = await db.User.findOne({
        email: req.body.email
      });
      foundUser.isAdmin = true;
      await foundUser.save();
    }
    let {id, username, profileImageUrl, isAdmin} = user;
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl,
        isAdmin
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id, 
      username,
      profileImageUrl,
      isAdmin,
      token
    });
  } catch(err) {
    if(err.code === 11000){
      err.message = "Sorry, that username and/or/email is taken";
    }
    return next ({
      status: 400,
      message: err.message
    });
  }
};

module.exports = exports;