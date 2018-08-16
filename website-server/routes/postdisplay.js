const express = require("express");
const router = express.Router({mergeParams: true});

const { 
  getPost,
  showPosts
} = require("../handlers/posts");

router.route("/").get(showPosts);

router
  .route("/:post_id")
  .get(getPost);

module.exports = router;