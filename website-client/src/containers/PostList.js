import React, {Component} from "react";
import {connect} from "react-redux";
import { fetchPosts, removePost, refreshPosts } from "../store/actions/posts";
import {countTotalPosts} from "../store/actions/count";
import PostItem from "../components/PostItem";
// import PostItem from "../components/MessageItem";
// import ReactCSSTransitionGroup from "react-transition-group";
import Pagination from "react-js-pagination";
// import ReactPaginate from 'react-paginate';
// @import "../../node_modules/bootstrap/scss/functions";
// @import "../../node_modules/bootstrap/scss/variables";
// @import "../../node_modules/bootstrap/scss/mixins";
// @import '../../node_modules/bootstrap/scss/_pagination';
// import { Fade, Stagger } from 'react-animation-components'
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
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  
  componentWillMount() {
    this.props.refreshPosts();
    this.props.countTotalPosts();
    // console.log(totalPostCount);
    // this.setState({itemCount: totalPostCount});
  }
  
  componentDidMount() {
    this.props.fetchPosts(this.state.activePage);
  }
  
  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    console.log(`active page is ${pageNumber}`);
    console.log(this.state.activePage);
    this.props.refreshPosts();
    this.props.fetchPosts(pageNumber);
  }
  
  render() {
    const {posts, count, removePost, currentUser} = this.props;
    console.log(count);
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
        removePost={removePost.bind(this, p.user._id, p._id, p.file)}
        isCorrectUser={currentUser === p.user._id}
        />
      ));
      // console.log(postList);
    return (
      <div className="recentPosts">
        <h1>Recent Posts</h1>
        <div className="postList">
          {postList}
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={5}
          totalItemsCount={count[0]}
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
    count: state.count,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, {fetchPosts, removePost, refreshPosts, countTotalPosts})(PostList);