import React from "react";
import {Link} from "react-router-dom";

const PostView = ({id, date, profileImageUrl, title, description, file, username, authorID, currentUser, addFavorite, addArtist, removePost, isCorrectUser}) => (
  <div className="viewArea">
    <h2 className="viewTitle">{title}</h2>
    <div className="viewControl">
      <p className="viewInfo">{description}</p>
      <p>Posted by: <Link to={`/users/${currentUser}/profile/${authorID}`} className="posterLink">{username}</Link></p>
      <button className="addArtistButton" onClick={addArtist}>Add Artist</button>
      <button className="addFavButton" onClick={addFavorite}>Add to Favorites</button>
    </div>
    <video controls
      className="viewPlayer"
      src= {`/video/${username}/${file.split(' ').join('%20')}`}
      width="300"
      height="200"
      preload={"none"}
      >
    </video>
  </div>
);

export default PostView;

