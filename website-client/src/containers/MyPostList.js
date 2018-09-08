import React, {Component} from "react";
import {connect} from "react-redux";
import { fetchMyPosts, removePost, refreshPosts } from "../store/actions/posts";
import PostItem from "../components/PostItem";

class MyPostList extends Component {
  componentWillMount() {
    this.props.refreshPosts();
  }
  
  componentDidMount() {
    const {id} = this.props.match.params;
    
    this.props.fetchMyPosts(id);
  }
  
  render() {
    const {posts, removePost, currentUser} = this.props;
    let postList = posts.map(p => (
      <PostItem 
        key={p._id}
        id={p._id}
        date={p.createAt} 
        title={p.title}
        description={p.description}
        file={p.file}
        username={p.user.username}
        profileImageUrl={p.user.profileImageUrl}
        currentUser={currentUser}
        removePost={removePost.bind(this, p.user._id, p._id)}
        isCorrectUser={currentUser === p.user._id}
      />
    ));
    return (
      <div className="myPosts">
        <h1>My Posts</h1>
        <div className="postList">
          {postList}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, {fetchMyPosts, removePost, refreshPosts})(MyPostList);