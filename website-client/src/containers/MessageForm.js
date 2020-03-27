import React, {Component} from "react";
import {connect} from "react-redux";
import {postNewMessage} from "../store/actions/messages";

class MessageForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: ""
    };
  }
  
  handleNewMessage = event => {
    event.preventDefault();
    let {post_id} = this.props.match.params;
    this.props.postNewMessage(this.state.message, post_id);
    this.setState({message: ""});
    this.props.history.push("/");
  }
  
  render(){
    return(
      <form onSubmit={this.handleNewMessage} className="messageForm">
        <h2>Add Message</h2>
        <textarea
          type="text" 
          className="form-control" 
          value={this.state.message}
          onChange={e => this.setState({message: e.target.value})}
        />
        <button type="submit" className="submitMessageButton">
        Add
        </button>
      </form>
    );
  }
}

// {this.props.errors.message && (
//           <div className="alert alert-danger">{this.props.errors.message}</div>
//         )}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, {postNewMessage})(MessageForm);