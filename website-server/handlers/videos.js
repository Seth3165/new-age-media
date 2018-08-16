require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const S3S = require('s3-streams');
const S3ReadableStream = require('s3-readable-stream');
const request = require('request');
const fs = require('fs');
const downloader = require('s3-download-stream');
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// AWS.config.update({
//   accessKeyId: AWS_ACCESS_KEY,
//   secretAccessKey: AWS_SECRET_KEY
// });

// const auth = {
//   secretAccessKey: AWS_SECRET_KEY,
//   accessKeyId: AWS_ACCESS_KEY
// };

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'us-east-1'
});


exports.streamVideo = async function (req, res, next) {
  try {
      let file = req.params.filename;
      console.log(file);
    // request(`https://s3.amazonaws.com/namtestbucket//${req.params.filename}`).pipe(res);
    // let config = {
    //   client: new AWS.S3(auth),
    //   concurrency: 6,
      let params= {
        Key: file,
        Bucket: 'namtestbucket',
        Range: req.headers.range
      };
    // };
    
    res.setHeader('Content-Disposition', `attachment; filename=${file}`);
      let stream = new S3ReadableStream(s3, params);
      // s3.getObject(params, function (err, data) {
      //   if (err) {
      //         console.error(err);
      //         return next(err);
      //     }
      // }).createReadStream().pipe(res);
      
      // .createReadStream(file);
      // s3.headObject(params, function (err, data) {
      //     if (err) {
      //         console.error(err);
      //         return next(err);
      //     }
      //     res.set('Content-Type', data.ContentType);
      //     res.set('Content-Length', data.ContentLength);
      //     res.set('Last-Modified', data.LastModified);
      //     res.set('ETag', data.ETag);
      //     var stream = s3.getObject(params).createReadStream();
  
      //     stream.on('error', function error(err) {
      //         return next(err);
      //     });
          // console.log(data);
         
          console.log(stream);
      //     stream.on('end', () => {
      //         console.log('Served by Amazon S3');
      //     });
      //     stream.pipe(res);
      // });
    // downloader(config).pipe(fs.createWriteStream("/tmp/" + file));
    // let stream = s3.getObject({Bucket: 'namtestbucket', Key: req.params.filename}).createReadStream();
    // let src = S3S.ReadStream(new S3({accessKeyId: AWS_ACCESS_KEY,
    //   secretAccessKey: AWS_SECRET_KEY}), {
    //   Bucket: 'namtestbucket',
    //   Key: req.params.filename
    // });
    // console.log(src);
    // stream.pipe(res);
    // src.pipe(res);
    stream.on('error', next);
    stream.pipe(res);
  }catch(err){
    return next(err);
  }
};

module.exports = exports;