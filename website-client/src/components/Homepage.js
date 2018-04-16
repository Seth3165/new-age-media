import React from "react";
import {Link} from "react-router-dom";

const Homepage = ({currentUser}) => {
  if(!currentUser.isAuthenticated){
    return (
      <div>
        <h1>New Age Media</h1>
        <h4>Development Client</h4>
        <Link to="/signup">
          Sign up here
        </Link>
      </div>
    );
  }
  return (
    <div>
      <MessageTimeline 
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}
      />
    </div>
  );
};

export default Homepage;