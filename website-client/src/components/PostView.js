import React from "react";

const PostView = ({id, date, profileImageUrl, title, description, file, username, currentUser, removePost, isCorrectUser}) => (
  <div>
    <p>{title}</p>
    <p>{description}</p>
    <video controls
      src= {`/video/${username}/${file.split(' ').join('%20')}`}
      width="300"
      height="200"
      preload={"none"}
      >
    </video>
  </div>
);

export default PostView;

