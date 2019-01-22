import React, {Component} from "react";
import {connect} from "react-redux";
import { fetchMyPosts, removePost, refreshPosts } from "../store/actions/posts";
import ProfilePostItem from "../components/ProfilePostItem";

class MyPostList extends Component {
  constructor(){
    super();
  }
  
  componentWillMount() {
    this.props.refreshPosts();
  }
  
  componentDidMount() {
    const artistID = this.props.id;
    
    this.props.fetchMyPosts(artistID);
  }
  
  render() {
    const {posts, removePost, currentUser} = this.props;
    let postList = posts.map(p => (
      <ProfilePostItem 
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
      <div className="profilePostList">
        {postList}
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