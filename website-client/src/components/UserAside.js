import React from "react";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const UserAside = ({profileImageUrl, username, myid}) => (
  <aside>
    <div className="portrait">
      <img 
        src={profileImageUrl || DefaultProfileImg} 
        alt={username}
        width="200"
        height="200"
      />
      <div>
        <h2>{username}</h2>
        <Link to={`/users/${myid}/profile/${myid}`} className="profileButton">My Profile</Link>
      </div>
    </div>
  </aside>
);

export default UserAside;