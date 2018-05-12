const express = require("express");
const router = express.Router({mergeParams: true});
const multiparty = require("connect-multiparty");
const multipartyMiddleware = multiparty();

router.use(multipartyMiddleware);

const {
  sendUpload
} = require("../handlers/uploads");

router.route("/").post(sendUpload);

module.exports = router;