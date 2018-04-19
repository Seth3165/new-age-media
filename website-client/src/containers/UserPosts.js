import React, {Component} from "react";
import {connect} from "rect-redux";
import { fetchPosts, removePost } from "../store/action/posts";
import PostItem from "../components/PostItem"

class UserPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
}