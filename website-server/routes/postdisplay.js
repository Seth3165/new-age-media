const express = require("express");
const router = express.Router({mergeParams: true});

const { 
  showPost,
  getPosts,
  getMyPosts,
  getMyFavorites,
  countPosts
} = require("../handlers/posts");

router.route("/:id/favorites/page/:pageNumber").get(getMyFavorites);

router.route("/:id/page/:pageNumber").get(getMyPosts);

router.route("/page/:pageNumber").get(getPosts);

router.route("/count").get(countPosts);

router
  .route("/show/:post_id")
  .get(showPost);

module.exports = router;