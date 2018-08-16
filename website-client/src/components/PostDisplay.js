import React, {Component} from "react";
import {connect} from "react-redux";
import { showPost, removePost, refreshPosts } from "../store/actions/posts";
import PostView from "../components/PostView";

class PostDisplay extends Component {
  componentWillMount() {
    this.props.refreshPosts();
  }
  
  componentDidMount() {
    const {post_id} = this.props.match.params;
    
    console.log(post_id);
    this.props.showPost(post_id);
  }
  
  render() {
    const {posts, removePost, currentUser} = this.props;
    console.log(posts);
    let postDis = posts.map(p => (
      <PostView
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
        <div className="">
        <h1>hi</h1>
        <h1>{postDis}</h1>
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

export default connect(mapStateToProps, {showPost, removePost, refreshPosts})(PostDisplay);