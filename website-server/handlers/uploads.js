const db = require('../models');
const fs = require("fs");
const S3FS = require("s3fs");
const aKI = process.env.ACCESS_KEY_ID;
const sAK = process.env.SECRET_ACCESS_KEY;
const s3fsImpl = new S3FS("newagemedia", {
  accessKeyId: aKI,
  secretAccessKey: sAK
});

exports.sendUpload = async function (req, res, next) {
  try{
    let file = req.files.file;
    let stream = fs.createReadStream(file.path);
    
    return s3fsImpl.writeFile(file.originalFilename, stream).then(function(){
      fs.unlink(file.path, function(err){
        if(err){console.error(err)}
      });
      res.redirect();
    });
  } catch(err) {}
};

module.exports = exports;