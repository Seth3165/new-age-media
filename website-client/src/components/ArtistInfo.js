import React from "react";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const ArtistInfo = ({id, profileImageUrl, username, bio, currentUser, addArtist, isCorrectUser}) => (
  <div className="artistInfo">
    <div className="artistInfoPotrait">
      <h2>{username}</h2>
      <img 
        src={profileImageUrl || DefaultProfileImg}
        width="15%"
        height="90em"
      />
    </div>
    <p>{bio || "Add a Profile Description"}</p>
    <Link to={`/users/${id}/profile/edit`} className="editProfileButton">Edit Profile</Link>
  </div>
);

export default ArtistInfo;