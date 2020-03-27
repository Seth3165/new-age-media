const express = require("express");
const router = express.Router({mergeParams: true});

const {
  createNews,
  deleteNews
} = require("../handlers/news");

router.route("/").post(createNews);

module.exports = router;