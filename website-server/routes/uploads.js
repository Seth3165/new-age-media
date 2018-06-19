require("dotenv").config();
const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require("multer");
// const multerS3 = require("multer-s3");
// const autoReap  = require("multer-autoreap");
const AWS = require("aws-sdk");

let upload = multer();
//   storage: multerS3({
//     s3: s3,
//     bucket: 'namtestbucket',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, req.params.id + Date.now().toString() + req.body);
//     },
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: 'public-read'
//   })
// });

// router.use(autoReap);
// autoReap.options = {
// 	reapOnError: true
// };

// router.get("/", upload.single('file'), (req, res, next) => {
  // let params = {
  //   Bucket: 'namtestbucket', 
  //   Key: req.file.fieldname, 
  //   Body: req.file.buffer,
  //   ContentType: req.file.mimetype,
  //   ACL: 'public-read'
  // };
  
  // s3.putObject(params, function(err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Successfully uploaded data to myBucket/myKey");
  //   }
//   // });
//   res.send('Success!');
// });

router.get('/', upload.single('file'), (req, res) => {
  const s3 = new AWS.S3({
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
    }
  });
  AWS.config.update({region: 'us-east-1'});
  const s3Params = {
    Bucket: 'namtestbucket',
    Key: req.file.fieldname,
    ContentType: req.file.mimetype,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return err;
    } else {
      return data;
    }
  });
});

module.exports = router;