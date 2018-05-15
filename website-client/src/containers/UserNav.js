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
        <div>
          <header>Welcome To New Age Media!</header>
          <dialog></dialog>
          <nav>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">Log in</Link>
          </nav>
        </div>
      );
    }
    return (
      <div>
        <UserAside
          profileImageUrl={currentUser.user.profileImageUrl}
          username={currentUser.user.username}
        />
         <Link to={`/users/${this.props.currentUser.user.id}/posts/new`}>New Post</Link>
        <a class="loButton" onClick={this.logout}>Log out</a>
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