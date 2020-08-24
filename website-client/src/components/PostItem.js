import React, { useState } from "react";
import Moment from "react-moment";
import { Link, __RouterContext } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { Fade } from 'react-animation-components'
import DefaultProfileImg from "../images/default-profile-image.jpg";

// <img 
//   src={profileImageUrl || DefaultProfileImg} 
//   alt={username} 
//   height="100" 
//   width="100" 
//   className="timeline-image"
// />


const PostItem = ({id, date, profileImageUrl, title, description, file, username, currentUser, isCorrectUser}) => (
  <Link to={`/users/${currentUser}/posts/${id}`} className="postItem">
    <h1>{title}</h1>
    <div>
      Created: 
      <Moment format="Do MMM YYYY">
        {date}
      </Moment>
      <div>By: {username}</div>
    </div>
  </Link>
);


    // <animated.div key={key} style={props}>
// transition.map(({ item, key, props }) =>
//     item &&

    // 

// {isCorrectUser && (
//   <a className="btn btn-danger" onClick={removePost}>
//   Delete
//   </a>
// )}

export default PostItem;