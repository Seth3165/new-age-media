import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {removeError} from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import FrontDisplay from "../components/FrontDisplay";
import PostForm from "../containers/PostForm";
import PostList from "../containers/PostList";
import MyPostList from "./MyPostList";
import MyFavoriteList from "./MyFavoriteList";
import ArtistList from "./ArtistList";
import PostDisplay from "../components/PostDisplay";

const MainDisplay = props => {
  const {errors, removeError, currentUser} = props;
  
  if(!currentUser.isAuthenticated){
    return (
      <div className="displayContainer"></div>
    );
  }
  return(
    <div className="displayContainer">
      <Switch>
        <Route
          path="/users/:id/posts/new"
          currentUser={currentUser}
          component={withAuth(PostForm)}/>
        <Route path="/users/:id/posts/favorites" render={props => <MyFavoriteList currentUser={currentUser} {...props}/>}/>
        <Route path="/users/:id/posts/:post_id" render={props => <PostDisplay currentUser={currentUser} {...props}/>}/>
        <Route path="/users/:id/posts" render={props => <MyPostList currentUser={currentUser} {...props}/>}/>
        <Route path="/users/:id/artists" render={props => <ArtistList currentUser={currentUser} {...props}/>}/>
        <Route path="/" render={props => <PostList currentUser={currentUser} {...props}/>}/>
      </Switch>
    </div>
  );
};


function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(
  connect(mapStateToProps, {removeError})(MainDisplay)
);