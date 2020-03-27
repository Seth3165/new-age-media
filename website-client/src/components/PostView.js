import React from "react";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const PostView = ({id, date, profileImageUrl, title, description, file, username, authorID, currentUser, addFavorite, addArtist, removePost, isCorrectUser}) => (
  <div className="viewArea">
    <h2 className="viewTitle">{title}</h2>
    <div className="viewControl">
      <p className="viewInfo">{description}</p>
      <div className="viewPoster">
        <div className="posterBy">Posted by: </div>
        <Link to={`/users/${currentUser}/profile/${authorID}`} className="posterLink">
          {username}
          <img 
            src={profileImageUrl || DefaultProfileImg} 
            alt={username}
            className="viewPosterImage"
          />
        </Link>
      </div>
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
    {isCorrectUser && (
      <a className="" onClick={removePost}>
        Delete
      </a>
    )}
  </div>
);

export default PostView;

