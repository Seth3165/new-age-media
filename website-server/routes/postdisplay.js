const express = require("express");
const router = express.Router({mergeParams: true});

const { 
  getPost,
  showPosts,
  showMyPosts,
  showMyFavorites
} = require("../handlers/posts");

router.route("/:id/favorites").get(showMyFavorites);

router.route("/:id").get(showMyPosts);

router.route("/").get(showPosts);

router
  .route("/show/:post_id")
  .get(getPost);

module.exports = router;