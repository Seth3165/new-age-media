import React, {Component} from "react";
import {connect} from "react-redux";
import { showPost, removePost, refreshPosts } from "../store/actions/posts";
import { addFavorite, addArtist } from "../store/actions/profiles";
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
    const {posts, addFavorite, addArtist, removePost, currentUser, isProfileUser} = this.props;
    console.log(posts);
    let postDis = posts.map(p => (
      <PostView
        key={p._id}
        id={p._id}
        date={p.createAt} 
        title={p.title}
        description={p.description}
        gallerytype={p.gallerytype}
        file={p.file}
        username={p.user.username}
        authorID={p.user._id}
        profileImageUrl={p.user.profileImageUrl}
        currentUser={currentUser}
        addFavorite={addFavorite.bind(this, p._id)}
        addArtist={addArtist.bind(this, p.user._id)}
        removePost={removePost.bind(this, p.user._id, p._id, p.file)}
        isCorrectUser={currentUser === p.user._id}
      />
    ));
    return (
        <div className="displayControl">{postDis}</div>
      );
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, {showPost, addFavorite, addArtist, removePost, refreshPosts})(PostDisplay);