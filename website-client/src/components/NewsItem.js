import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const NewsItem = ({id, date, profileImageUrl, title, description, file, username, currentUser, isCorrectUser}) => (
  // <Fade in>
  <Link to={`/users/${currentUser}/posts/${id}`} >
    <div className="newsItem">{title}</div>
    
  </Link>
  // </Fade>
);

export default NewsItem;

// <div>
//       Created: 
//       <Moment format="Do MMM YYYY">
//         {date}
//       </Moment>
//       <div>By: {username}</div>
//     </div>