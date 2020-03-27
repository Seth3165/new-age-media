import React from "react";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const MessageItem = ({id, text, profileImageUrl, username, currentUser}) => (
  <div className="messageItem">
    <div className="messageItemText">{text}</div>
    <Link to={`/users/${currentUser}/profile/${id}`} className="messageItemLink">
      <div className="messageItemUser">
        <img 
          src={profileImageUrl || DefaultProfileImg} 
          alt={username} 
          height="20" 
          width="20" 
          className="messageItemPortrait"
        />
        <div>{username}</div>
      </div>
    </Link>
  </div>
);

export default MessageItem;