import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { fetchNews, refreshNews} from "../store/actions/news";
import NewsItem from "../components/NewsItem";

class NewsList extends Component {
  constructor(){
    super();
  }
  
  componentDidMount() {

  this.props.fetchNews();
  }
  
  // profileImageUrl={n.user.profileImageUrl}
  //       currentUser={currentUser}
  //       isCorrectUser={currentUser === n.user._id}
  
  render() {
    const {news, currentUser, isAdmin} = this.props;
    let newsList = news.map(n => (
    <NewsItem 
        key={n._id}
        id={n._id}
        date={n.createAt} 
        title={n.title}
        description={n.description}
        
      />
    ));
    return (
      <div className="newsNav">
        <h1>News</h1>
        <div className="newsList">
        {newsList}
        </div>
        {isAdmin && (<Link to={`/users/${currentUser}/news/addnews`} className="createNewsButton">Add News</Link>)}
      </div>
    );
  }
}

// componentWillMount() {
//     this.props.refreshNews();
//   }
  


// {newsList}



function mapStateToProps(state){
  return {
    news: state.news,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, {fetchNews, refreshNews})(NewsList);

// fetchMyPosts, removePost, refreshPosts