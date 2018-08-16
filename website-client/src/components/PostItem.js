import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

// <img 
//   src={profileImageUrl || DefaultProfileImg} 
//   alt={username} 
//   height="100" 
//   width="100" 
//   className="timeline-image"
// />

const PostItem = ({id, date, profileImageUrl, title, description, file, username, currentUser, removePost, isCorrectUser}) => (
  <Link to={`/users/${currentUser}/posts/${id}`} className="postItem">
    <p>{title}</p>
    <span>
      Created: 
      <Moment format="Do MMM YYYY">
        {date}
      </Moment>
    </span>
    <div>@{username} &nbsp;</div>
  </Link>
);

// {isCorrectUser && (
//   <a className="btn btn-danger" onClick={removePost}>
//   Delete
//   </a>
// )}

export default PostItem;