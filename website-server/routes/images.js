require("dotenv").config();
const express = require("express");
// const fs = require('fs');
const router = express.Router({mergeParams: true});
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS = require("aws-sdk");
const S3ReadableStream = require('s3-readable-stream');

const s3Client = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'us-east-1'
});

router.get('/:username/:filename', (req, res, next) => {
  const fileOptions = {
      Bucket: 'namtestbucket',
      Key: req.params.filename
  };
  
  const stream = new S3ReadableStream(s3Client, fileOptions);
  
  
  stream.on('error', next);
  stream.pipe(res);
  res.on('close', stream.destroy);
});

module.exports = router;