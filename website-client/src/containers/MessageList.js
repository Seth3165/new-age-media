import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { fetchMessages, refreshMessages} from "../store/actions/messages";
import MessageItem from "../components/MessageItem";

class MessageList extends Component {
  constructor(){
    super();
  }
  
  componentWillMount() {
    this.props.refreshMessages();
  }
  
  componentDidMount() {
    const {post_id} = this.props.match.params;
    
    this.props.fetchMessages(post_id);
  }
  render() {
    const {messages, posts, currentUser} = this.props;
    let messageList = messages.map(m => (
      <MessageItem 
        key={m._id}
        id={m._id}
        date={m.createAt} 
        text={m.text}
        username={m.user.username}
        profileImageUrl={m.user.profileImageUrl}
        currentUser={currentUser}
        isCorrectUser={currentUser === m.user._id}
      />
    ));
    let {post_id} = this.props.match.params;
    return (
      <div className="messageNav">
        <h2 className="messageListTitle">Messages</h2>
        <div className="messageList">
          {messageList}
        </div>
        <Link to={`/users/${this.props.currentUser}/posts/${post_id}/add`} className="addMessageButton">Add Message</Link>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    messages: state.messages,
    posts: state.posts,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, {fetchMessages, refreshMessages})(MessageList);