require("dotenv").config();
const express = require("express");
// const fs = require('fs');
const router = express.Router({mergeParams: true});
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS = require("aws-sdk");
// const s3 = require('s3-storage')('namtestbucket', {
//   secretAccessKey: AWS_SECRET_KEY,
//   accessKeyId: AWS_ACCESS_KEY
// });
// const S3S = require('s3-streams');
const S3ReadableStream = require('s3-readable-stream');
// const MediaConverter = require("html5-media-converter");
// const mp4 = require('mp4-stream');

// const {streamVideo} = require("../handlers/videos");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
// const Transcoder = require('stream-transcoder');

const s3Client = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'us-east-1'
});

router.get('/:username/:filename', (req, res, next) => {
  
  // let file = req.params.filename.split(' ').join('');
  // let stream = s3.createReadStream(file);
  // stream.pipe(res);
  // let src = S3S.ReadStream(new AWS.S3({accessKeyId: AWS_ACCESS_KEY,
  //     secretAccessKey: AWS_SECRET_KEY}), {
  //     Bucket: 'namtestbucket',
  //     Key: file
  // });
  
  // console.log(src);
  
  // src.pipe(res);
  
  // const path = `https://s3.amazonaws.com/namtestbucket/${file}`;
  // const stat = fs.statSync(path);
  // const fileSize = stat.size;
  // const range = req.headers.range;
  // if (range) {
  //   const parts = range.replace(/bytes=/, "").split("-");
  //   const start = parseInt(parts[0], 10);
  //   const end = parts[1] 
  //     ? parseInt(parts[1], 10)
  //     : fileSize-1;
  //   const chunksize = (end-start)+1;
  //   const file = fs.createReadStream(path, {start, end});
  //   const head = {
  //     'Content-Range': `bytes ${start}-${end}/${fileSize}`,
  //     'Accept-Ranges': 'bytes',
  //     'Content-Length': chunksize,
  //     'Content-Type': 'video/mp4',
  //   };
  //   res.writeHead(206, head);
  //   file.pipe(res);
  // } else {
  //   const head = {
  //     'Content-Length': fileSize,
  //     'Content-Type': 'video/mp4',
  //   };
  //   res.writeHead(200, head);
  //   fs.createReadStream(path).pipe(res);
  // }
  // let file = req.params.filename;
  const fileOptions = {
      Bucket: 'namtestbucket',
      Key: req.params.filename
  };
  // res.setHeader('Content-Disposition', `attachment; filename="${file}"`);
  
  const stream = new S3ReadableStream(s3Client, fileOptions);
  
  // console.log(stream);
  
  stream.on('error', next);
  // res.writeHead(200, {'Content-Type': 'video/mp4'});
  
  
  
  // let mc = new MediaConverter({ videoFormats: ['mp4'] });
  
  // let converter = mc.asStream();
  
  // new Transcoder(stream)
  //   .maxSize(1280, 720)
  //   .videoCodec('libx264')
  //   .videoBitrate(800 * 1000)
  //   .fps(25)
  //   .audioCodec('aac')
  //   .sampleRate(44100)
  //   .channels(2)
  //   .audioBitrate(128 * 1000)
  //   .format('mp4')
  //   .on('finish', function() {
  //       console.log("finished");
  //   })
  //   .stream().pipe(res);
  
  // console.log(converter);
  
  
  // const encode = mp4.encode();
  
  
  // .pipe(converter).pipe(encode)
  
  // res.set('Content-Type', 'video/mp4');
  
  stream.pipe(res);
  
  // const proc = new ffmpeg(stream).pipe();
  
  // ffmpeg(stream)
  // .videoCodec('libx264')
  // .audioCodec('aac')
  // .outputOptions('-movflags frag_keyframe+empty_moov')
  // .format('mp4')
  // .on('error', function(err, stdout, stderr) {
  //   console.log('An error occurred: ' + err.message);
  //   console.log("ffmpeg stdout:\n" + stdout);
  //   console.log("ffmpeg stderr:\n" + stderr);
  // })
  // .on('end', function() {
  //   console.log('Processing finished !');
  // }).pipe(res, {end: true});

  // let ffstream = command.pipe(res, {end: true});
  
  res.on('close', stream.destroy);
});

module.exports = router;