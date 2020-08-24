import React from "react";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const ArtistInfo = ({id, profileImageUrl, username, bio, currentUser, addArtist, isProfileUser}) => (
  <div className="artistInfo">
    <div className="artistInfoPortrait">
      <h2>{username}</h2>
      <img className="artistProfileImage" 
        src={profileImageUrl || DefaultProfileImg}
      />
    </div>
    <p className="profileDescription">{bio || "Add a Profile Description"}</p>
    {isProfileUser && <Link to={`/users/${id}/profile/edit`} className="editProfileButton">Edit Profile</Link>}
  </div>
);

export default ArtistInfo;