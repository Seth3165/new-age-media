import React from "react";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const ArtistItem = ({id,  profileImageUrl, username, currentUser}) => (
  <Link to={`/users/${currentUser}/profile/${id}`} className="artistItem">
    <img 
      src={profileImageUrl || DefaultProfileImg} 
      alt={username} 
      height="50" 
      width="50" 
      className="artistImage"
    />
    <div className="artistImageName">{username}</div>
  </Link>
);

export default ArtistItem;