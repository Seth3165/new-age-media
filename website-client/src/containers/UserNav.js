import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../store/actions/auth";
import UserAside from "../components/UserAside";
import UserPosts from "./UserPosts";

class UserNav extends Component {
  constructor(props){
    super(props);
  }
  
  logout = e => {
    e.preventDefault();
    this.props.logout();
  }
  
  render(){
    const{currentUser} = this.props;
    if(!currentUser.isAuthenticated){
      return (
        <div className="strtNav">
          <header>Welcome To New Age Media!</header>
          <dialog></dialog>
          <nav className="authbtnDiv">
            <Link className="suBtn" to="/signup">Sign up</Link>
            <Link className="siBtn" to="/signin">Log in</Link>
          </nav>
        </div>
      );
    }
    return (
      <div className="controlNav">
        <UserAside
          profileImageUrl={currentUser.user.profileImageUrl}
          username={currentUser.user.username}
          myid={currentUser.user.id}
        />
        <Link to={"/"} className="recpostButton">Recent Posts</Link>
        <Link to={`/users/${this.props.currentUser.user.id}/posts`} className="mypostButton">My Posts</Link>
        <Link to={`/users/${this.props.currentUser.user.id}/posts/favorites`} className="myfavButton">My Favorites</Link>
        <Link to={`/users/${this.props.currentUser.user.id}/artists`} className="artistsButton">Artists</Link>
        <Link to={`/users/${this.props.currentUser.user.id}/posts/new`} className="cpostButton">New Post</Link>
        <a className="loButton" onClick={this.logout}>Log out</a>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {logout})(UserNav);