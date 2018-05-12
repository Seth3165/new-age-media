import React, {Component} from "react";
import {connect} from "react-redux";
import { fetchPosts, removePost } from "../store/actions/posts";
import PostItem from "../components/PostItem";

class UserPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, {fetchPosts, removePost})(UserPosts);