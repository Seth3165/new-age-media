import React, {Component} from "react";
import {connect} from "react-redux";
import { fetchPosts, removePost, refreshPosts } from "../store/actions/posts";
import PostItem from "../components/PostItem";
// import PostItem from "../components/MessageItem";
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from "../keys";
const AWS = require("aws-sdk");

const config = {
  bucketName: 'namtestbucket',
  albumName: 'videos',
  region: 'us-east-1',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
};

class PostList extends Component {
  componentWillMount() {
    this.props.refreshPosts();
  }
  
  componentDidMount() {
    this.props.fetchPosts();
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
      <div className="recentPosts">
        <h1>Recent Posts</h1>
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

export default connect(mapStateToProps, {fetchPosts, removePost, refreshPosts})(PostList);