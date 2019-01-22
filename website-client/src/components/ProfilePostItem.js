import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Fade } from 'react-animation-components'
import DefaultProfileImg from "../images/default-profile-image.jpg";

// <img 
//   src={profileImageUrl || DefaultProfileImg} 
//   alt={username} 
//   height="100" 
//   width="100" 
//   className="timeline-image"
// />

const ProfilePostItem = ({id, date, profileImageUrl, title, description, file, username, currentUser, isCorrectUser}) => (
  // <Fade in>
  <Link to={`/users/${currentUser}/posts/${id}`} className="profilePostItem">
    <h1>{title}</h1>
    <div>
      Created: 
      <Moment format="Do MMM YYYY">
        {date}
      </Moment>
    </div>
  </Link>
  // </Fade>
);

// {isCorrectUser && (
//   <a className="btn btn-danger" onClick={removePost}>
//   Delete
//   </a>
// )}

export default ProfilePostItem;