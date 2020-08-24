import React from "react";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import ImageGallery from "../containers/ImageGallery";

const PostView = ({id, date, profileImageUrl, title, description, gallerytype, files, username, authorID, currentUser, addFavorite, addArtist, removePost, isCorrectUser}) => (
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
    {gallerytype==="videoGallery" && (
      <video 
        controls
        className="viewPlayer"
        src= {`/video/${username}/${files[0].split(' ').join('%20')}`}
        preload={"none"}
        >
      </video>
    )}
    {gallerytype==="imageGallery" && (
        <ImageGallery 
          files={files}
          username={username}
        />
    )}
    <div className="viewPaths">
      {isCorrectUser && (
        <a className="deletePostButton" onClick={removePost}>
          Remove Post
        </a>
      )}
      <p>placeholder</p>
      <p>placeholder</p>
    </div>
  </div>
);

export default PostView;

