require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer  = require('multer');
const upload = multer();
const autoReap  = require('multer-autoreap');
const methodOverride = require("method-override");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const messagesRoutes = require("./routes/messages");
const uploadsRoutes = require("./routes/uploads");
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");
const db = require("./models");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(autoReap);
autoReap.options = {
	reapOnError: true
};

app.use("/api/auth", authRoutes);
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
app.use(
  "/api/users/:id/uploads",
  loginRequired,
  ensureCorrectUser,
  upload.single('upload'),
  uploadsRoutes
);

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