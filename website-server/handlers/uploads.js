const db = require("../models");
const AWS = require("aws-sdk");
const zlib = require("zlib");
const fs = require("fs");
const s3Stream = require("s3-upload-stream")(new AWS.S3());
const aKI = process.env.ACCESS_KEY_ID;
const sAK = process.env.SECRET_ACCESS_KEY;

AWS.config.update({accessKeyId: aKI, secretAccessKey: sAK});

exports.sendUpload = async function (req, res, next) {
  try{
    let file = req.file;
    let read = fs.createReadStream(file.path);
    let compress = zlib.createGzip();
    let uStream = s3Stream.upload({
      Bucket: 'namtestbucket',
      Key: file.originalname
    });
    
    uStream.on('uploaded', function (details) {
      console.log(details);
    });
    
   read.pipe(compress).pipe(uStream);
  } catch (err) {
    return next(err);
  }
};

// exports.sendUpload = async function (req, res, next) {
//   try{
//     let file = req.files.file;
//     let stream = fs.createReadStream(file.path);
    
//     return s3fsImpl.writeFile(file.originalFilename, stream).then(function(){
//       fs.unlink(file.path, function(err){
//         if(err){console.error(err)}
//       });
//     });
//   } catch(err) {
//     return next(err);
//   }
// };

module.exports = exports;