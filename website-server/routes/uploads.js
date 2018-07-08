require("dotenv").config();
const express = require("express");
// const router = express.Router({mergeParams: true});
// const multer  = require("multer");
// const multerS3 = require("multer-s3");
// const path = require('path');
// const autoReap  = require("multer-autoreap");
const AWS = require("aws-sdk");
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
});

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'us-east-1'
});

exports.signedRequest = function(req, res) {
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: 'namtestbucket',
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'private'
  };
  
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://namtestbucket.s3.amazonaws.com/${fileName}`
    };
    return res.json(returnData);
  });
};

exports.getFileSignedRequest = function(req, res) {
  const s3Params = {
    Bucket: 'namtestbucket',
    Key: req.params.fileName,
    Expires: 60
  };
  
  s3.getSignedUrl('getObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    return res.json(data);
  });
};

exports.listFiles = function(req, res) {
  const s3Params = {
    Bucket: 'namtestbucket',
    Delimiter: '/'
  };
  
  s3.listObjects(s3Params, (err, data) => {
    if(err){
     console.log(err);
     return res.end();
    }
    return res.json(data);
  });
};

exports.deleteFile = function (req, res) {
  const s3Params = {
    Bucket: 'namtestbucket',
    Key: req.params.fileName
  };
  
  s3.deleteObject(s3Params, (err, data) => {
    if(err){
     console.log(err);
     return res.end();
    }
    return res.status(200).send({'msg' : 'File deleted'});
  });
};



// const storageDir = path.join(__dirname, '..', 'storage');

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'namtestbucket',
//     metadata: function(req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function(req, file, cb) {
      
//       const filename = `${Date.now().toString()}-${file.originalname}`;
//       cb(null, filename);
//     }
//   })
// });

// router.post('/uploads', upload.array('files'), (req, res, next) => {
//   const files = req.files;
//   return res.json({
//     files: files
//   });
// });

// router.get('/download/:name', (req, res, next) => {
  
//   const fileName = req.params.name;
//   const filePath = path.join(uploadDir, fileName);
  
//   return res.download(filePath, fileName, (err) => {
    
//     if(err){
//       return res.status(404).json({
//         error: {
//           message: "file not found"
//         }
//       });
//     } else {
//       console.log("file is downloaded");
//     }
//   });
// });

// router.post('/', upload.single('video'), (req, res) => {
//   s3.putObject({
//       Bucket: 'namtestbucket',
//       Key: req.params.id + req.file.fieldname, 
//       Body: req.file.buffer,
//       ACL: 'public-read',  
//     }, (err) => { 
//       if (err) return res.status(400).send(err);
//       res.send('File uploaded to S3');
//   });
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'namtestbucket',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, req.params.id + Date.now().toString() + req.body);
//     },
//     contentType: function (req, file, cb) {
//       cb(null, file.mimetype);
//     },
//     body: function (req, file, cb) {
//       cb(null, file.buffer);
//     },
//     acl: 'public-read'
//   })
// }).single('upload');
  

// router.use(autoReap);
// autoReap.options = {
// 	reapOnError: true
// };

// router.post('/', (req, res, next) => {
//   upload(req, res, function(err){
//     if (err) {
//       console.log(err);
//     }
//     console.log('File uploaded successfully.');
//   });
// });

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

// const options = {
//   Bucket: 'namtestbucket',
//   region: 'us-east-1',
//   signatureVersion: 'v4',
//   ACL: 'public-read',
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   }
// };
// const s3 = new AWS.S3(options);

// router.get('/', (req, res) => {
//   const fileName = req.query['file-name'];
//   const fileType = req.query['file-type'];
//   var s3 = new AWS.S3();

//         var params = {
//             Bucket: 'namtestbucket',
//             Key: fileName,
//             Expires: 60,
//             ContentType: fileType,
//             ACL: 'public-read'
//         };

//         s3.getSignedUrl('putObject', params, function(err, data) {
//             if(err){
//               console.log(err);
//               return res.end();
//             }
//             const returnData = {
//               signedRequest: data,
//               url: `https://namtestbucket.s3.amazonaws.com/${fileName}`
//             };
//             res.write(JSON.stringify(returnData));
//             res.end();
//         });
  // s3.getSignedUrl('putObject', params, (err, data) => {
  //   if(err){
  //     console.log(err);
  //     return res.end();
  //   }
  //   const returnData = {
  //     signedRequest: data,
  //     url: `https://namtestbucket.s3.amazonaws.com/${fileName}`
  //   };
  //   res.write(JSON.stringify(returnData));
  //   res.end();
  
  // upload().then(url => {
  //   res.json({url: url});
  // }).catch(e => {
  //   console.log(e);
  // });
// });
// function upload(file) {
  
//   const s3 = new AWS.S3();

//   const params = {
//     Bucket: 'namtestbucket',
//     Key: file.filename,
//     Expires: 60,
//     ContentType: file.filetype,
//     ACL: 'public-read'
//   };
  
//   return new Promise((resolve, reject) => {
//     s3.getSignedUrl('putObject', params, (err, url) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(url);
//     });
//   });
// }

// router.get('/sign', (req, res) => {
//     let s3 = new AWS.S3({accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
//       region: 'us-east-1',
//       bucket: 'namtestbucket',
//       signatureVersion: 'v4',
//       ACL: 'public-read'
//     });f
    
//     const originalFilename = req.query.objectName;
//     const filename = `${originalFilename.split('.').pop()}`;

//     let params = {
//         Bucket: 'namtestbucket',
//         Key: filename,
//         ContentType: req.query.contentType,
//         ACL: 'public-read'
//     };
    
//     const signedUrl = s3.getSignedUrl('putObject', params);
    
    
//     if (signedUrl) {
//     // you may also simply return the signed url, i.e. `return { signedUrl }`
//     return {signedUrl};
//     } else {
//       console.log("error");
    // }
    // s3.getSignedUrl('putObject', params, function(err, data) {
    //   if (err) {
    //       console.log(err);
    //   } else {
    //     const returnData = {
    //       signedRequest: data,
    //       url: `https://namtestbucket.s3.amazonaws.com/${fileName}`
    //     };
    //       res.write(JSON.stringify(returnData));
    //       res.end();
    //     }
    // });
// });