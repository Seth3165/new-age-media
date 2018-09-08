import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const UserAside = ({profileImageUrl, username}) => (
  <aside>
      <div className="portrait">
        <img 
          src={profileImageUrl || DefaultProfileImg} 
          alt={username}
          width="200"
          height="200"
        />
        <h2>{username}</h2>
      </div>
  </aside>
);

export default UserAside;