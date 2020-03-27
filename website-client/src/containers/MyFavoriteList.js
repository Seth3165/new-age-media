import React, {Component} from "react";
import {connect} from "react-redux";
import { fetchMyFavorites, refreshPosts } from "../store/actions/posts";
import Pagination from "react-js-pagination";
import PostItem from "../components/PostItem";

class MyFavoriteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  
  componentWillMount() {
    this.props.refreshPosts();
  }
  
  componentDidMount() {
    const {id} = this.props.match.params;
    
    this.props.fetchMyFavorites(id, this.state.activePage);
  }
  
   handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.props.refreshPosts();
    this.props.fetchMyFavorites(this.state.activePage);
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
        isCorrectUser={currentUser === p.user._id}
      />
    ));
    return (
      <div className="myFavorites">
        <h1>Favorites</h1>
        <div className="postList">
          {postList}
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={5}
          totalItemsCount={postList.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
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

export default connect(mapStateToProps, {fetchMyFavorites, refreshPosts})(MyFavoriteList);