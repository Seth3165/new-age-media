// const db = require("../models");
// const fs = require("fs");
// const stream = require("stream");

exports.sendUpload = async function (req, res, next) {
  try{
    // let file = req.file;
    
    // stream.pipe(uploadFromStream(s3));

    // function uploadFromStream(s3) {
    //   let pass = new stream.PassThrough();
    
    //   let params = {Bucket: BUCKET, Key: KEY, Body: pass};
    //   s3.upload(params, function(err, data) {
    //     console.log(err, data);
    //   });
    
    //   return pass;
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
}



// exports.sendUpload = async function (req, res, next) {
//   try{
//     let file = req.file;
//     let read = fs.createReadStream(file.path);
//     let compress = zlib.createGzip();
//     let uStream = s3Stream.upload({
//       Bucket: 'namtestbucket',
//       Key: file.originalname
//     });
    
//     uStream.on('uploaded', function (details) {
//       console.log(details);
//     });
    
//   read.pipe(compress).pipe(uStream);
//   } catch (err) {
//     return next(err);
//   }
// };

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