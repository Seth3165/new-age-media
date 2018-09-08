require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const methodOverride = require("method-override");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const postsRoutes = require("./routes/posts");
const postDisplayRoutes = require("./routes/postdisplay");
const messagesRoutes = require("./routes/messages");
const uploadsRoutes = require("./routes/uploads");
const videoRoutes = require("./routes/videos");
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");
const db = require("./models");
const PORT = 8081;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/profile",
  loginRequired, 
  ensureCorrectUser,
  profileRoutes
);
app.use(
  "/api/users/:id/posts",
  loginRequired, 
  ensureCorrectUser,
  postsRoutes
);
app.use(
  "/api/users/:id/messages",
  loginRequired, 
  ensureCorrectUser, 
  messagesRoutes
);
  
// app.get('/aws/sign', uploadsRoutes.signedRequest);
// app.get('/aws/files', uploadsRoutes.listFiles);
// app.get('/aws/files/:fileName'. uploadsRoutes.getFileSignedRequest);
// app.delete('/aws/files/:fileName', uploadsRoutes.deleteFile);

// (req, res) => {
//     bucket: "namtestbucket",
//     region: 'us-east-1',
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
//     },
//     signatureVersion: 'v4',
//     headers: {'Access-Control-Allow-Origin': '*'}, // optional
//     ACL: 'private', // this is default
//     uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
// }));

app.use("/api/posts", loginRequired, postDisplayRoutes);

app.use("/video", videoRoutes);

app.get("/api/messages", loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.use(function(req, res, next){
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
  console.log(`Server is starting on port ${PORT}`);
});