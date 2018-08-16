import React from "react";
import PostList from "../containers/PostList"

const FrontDisplay = ({currentUser}) => {
  if(!currentUser.isAuthenticated){
    return (
      <div className="home-hero">
      </div>
    );
  }
  return (
    <div>
      <PostList 
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}
      />
    </div>
  );
};

export default FrontDisplay;