import React, {Component} from "react";
import {connect} from "react-redux";
import {createNewPost} from "../store/actions/posts";
import {getSigPut} from "../store/actions/uploads";

class PostForm extends Component {
  constructor(props){
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      title: "",
      description: ""
    };
    
    this.handleNewPost = this.handleNewPost.bind(this);
  }
  
  handleNewPost = event => {
    event.preventDefault();
    let data = new FormData();
    data.append('file', this.fileInput.files[0]);
    // this.props
    //   .createNewPost(
    //     this.state.title, 
    //     this.state.description,
    //     this.state.file.filename);
    this.props.getSigPut(data);
    this.setState({title: ""});
    this.setState({description: ""});
    this.props.history.push("/");
  }
  
  render(){
    return(
      <form encType="multipart/form-data" onSubmit={this.handleNewPost}>
        {this.props.errors.message && (
          <div className="errorMessage">{this.props.errors.message}</div>
        )}
        <input 
          type="text" 
          className="form-control" 
          value={this.state.title}
          onChange={e => this.setState({title: e.target.value})}
        />
        <input 
          type="text" 
          className="form-control" 
          value={this.state.description}
          onChange={e => this.setState({description: e.target.value})}
        />
        <input 
          type="file" 
          name="file"
          id="file"
          className="form-control" 
          ref={input => {
            this.fileInput = input;
          }}
        />
        <button type="submit" className="btn btn-success pull-right">
        Create a post!
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, {createNewPost, getSigPut})(PostForm);