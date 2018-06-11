const express = require("express");
const router = express.Router({mergeParams: true});
// const multipart = require("connect-multiparty");
// const multipartMiddleware = multipart();

// router.use(multipartMiddleware);
// const multer  = require('multer')
// const upload = multer();

const {
  sendUpload
} = require("../handlers/uploads");

router.route("/").post(sendUpload);

module.exports = router;