import React from "react";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const ArtistItem = ({id,  profileImageUrl, username, currentUser}) => (
  <Link to={`/users/${currentUser}/profile/${id}`} className="artistItem">
    <div>
      <img 
        src={profileImageUrl || DefaultProfileImg} 
        alt={username} 
        height="100" 
        width="100" 
        className="artist-image"
      />
      <div>{username}</div>
    </div>
  </Link>
);

export default ArtistItem;