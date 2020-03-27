import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {removeError} from "../store/actions/errors";
// import {countTotalPosts} from "../store/actions/posts";
// import {editUser} from "../store/actions/profiles";
import withAuth from "../hocs/withAuth";
import FrontDisplay from "../components/FrontDisplay";
import NewsForm from "./NewsForm"
import PostForm from "./PostForm";
import PostList from "./PostList";
import MyPostList from "./MyPostList";
import MyFavoriteList from "./MyFavoriteList";
import ArtistList from "./ArtistList";
import PostDisplay from "../components/PostDisplay";
import ProfileEdit from "../components/ProfileEdit";
import EditPage from "./EditPage";
import ProfileDisplay from "./ProfileDisplay";

// onProfileEdit={editUser}

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
        <Route path="/users/:id/news/addnews" render={props => <NewsForm currentUser={currentUser}   {...props}/>}/>
        <Route
          path="/users/:id/posts/new"
          currentUser={currentUser}
          component={withAuth(PostForm)}/>
        <Route path="/users/:id/posts/favorites" render={props => <MyFavoriteList currentUser={currentUser} {...props}/>}/>
        <Route path="/users/:id/posts/:post_id" render={props => <PostDisplay currentUser={currentUser} {...props}/>}/>
        <Route path="/users/:id/posts" render={props => <MyPostList currentUser={currentUser} {...props}/>}/>
        <Route path="/users/:id/artists" render={props => <ArtistList currentUser={currentUser} {...props}/>}/>
        <Route path="/users/:id/profile/edit" render={props => <ProfileEdit currentUser={currentUser}   {...props}/>}/>
        <Route path="/users/:id/profile/:artist_id" render={props => <ProfileDisplay key={props.match.params.artist_id} currentUser={currentUser} isProfileUser={currentUser.user.id === props.match.params.artist_id} {...props}/>}/>
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

// editUser,

export default withRouter(
  connect(mapStateToProps, {  removeError  })(MainDisplay)
);