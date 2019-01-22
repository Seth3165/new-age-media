const express = require("express");
const router = express.Router({mergeParams: true});

const { 
  showPost,
  getPosts,
  getMyPosts,
  getMyFavorites
} = require("../handlers/posts");

router.route("/:id/favorites").get(getMyFavorites);

router.route("/:id").get(getMyPosts);

router.route("/page/num/:pageNumber").get(getPosts);

router
  .route("/show/:post_id")
  .get(showPost);

module.exports = router;