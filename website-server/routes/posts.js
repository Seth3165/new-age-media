const express = require("express");
const router = express.Router({mergeParams: true});

const {
  createPost,
  deletePost
} = require("../handlers/posts");

router.route("/").post(createPost);

router
  .route("/:post_id")
  .delete(deletePost);

module.exports = router;