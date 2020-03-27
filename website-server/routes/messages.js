const express = require("express");
const router = express.Router({mergeParams: true});

const {
  createMessage, 
  getMessages,
  deleteMessage
} = require("../handlers/messages");

router.route("/");

router
  .route("/:post_id")
  .post(createMessage)
  .get(getMessages)
  .delete(deleteMessage);

module.exports = router;