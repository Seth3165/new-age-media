import React, {Component} from "react";
import {connect} from "react-redux";
// import Uploader from "../components/Uploader";
import {createNewNews} from "../store/actions/news";
import Dropzone from 'react-dropzone';
import axios from 'axios';
import ReactS3 from 'react-s3';
import { uploadFile } from 'react-s3';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from "../keys";

class NewsForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      description: "",
      newstype: "",
      files: []
      // acceptedFiles: []
    };
  }
  
  handleNewNews = event => {
    event.preventDefault();
    // let files = this.state.acceptedFiles.slice();
    // console.log(files)
    // console.log(files[0].name);
    // files[0].name = files[0].name.split(' ').join('');
    // console.log(files[0].name);
    // this.setState({files});
    // console.log(this.state.files[0].name);
    let config = {
      bucketName: 'namnewstestbucket',
      // albumName: 'videos',
      region: 'us-east-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    };
    // // this.state.files[0].name.split(' ').join('');
    
    // let convert = new Mp4Convert(input, output);
    // try {
    // 	new ffmpeg(this.state.files[0], function (err, video) {
    // 		if (!err) {
    // 			console.log('The video is ready to be processed');
    // 			console.log(video);
    // 		// 	video.setVideoFormat('mp4');
    // 		} else {
    // 			console.log('Error: ' + err);
    // 		}
    // 	});
    // } catch (e) {
    // 	console.log(e.code);
    // 	console.log(e.msg);
    // }
    
    this.props
      .createNewNews(
        this.state.title,
        this.state.description,
        this.state.newstype,
        this.state.files[0].name);
    ReactS3.uploadFile(this.state.files[0] , config)
    .then( (data) => {
      console.log(data);
      console.log(data.location);
    })
    .catch( (err) => {
      alert(err);
    });
    this.setState({title: ""});
    this.setState({description: ""});
    this.setState({newstype: ""});
    this.setState({files: []});
    this.props.history.push("/");
  }
  
  _onDrop = (files) => {
    this.setState({files});
  }
  
   render(){
    return(
      <form className="postForm" encType="multipart/form-data" onSubmit={this.handleNewNews}>
        {this.props.errors.message && (
          <div className="errorMessage">{this.props.errors.message}</div>
        )}
        <div className="postFormOptions">
          <div className="postFormInfo">
            <label className="postFormTitle">Title</label>
            <input 
              type="text" 
              className="form-control" 
              value={this.state.title}
              onChange={e => this.setState({title: e.target.value})}
            />
            <label className="postFormDescription">Description</label>
            <input 
              type="text" 
              className="form-control" 
              value={this.state.description}
              onChange={e => this.setState({description: e.target.value})}
            />
          </div>
          <div className="postFormTypes">
            <div>
              <input type="radio" name="newsType" value="videoGallery" onChange={e => this.setState({newstype: e.target.value})}/> Video Gallery<br/>
            </div>
            <div>
              <input type="radio" name="newsType" value="imageGallery" onChange={e => this.setState({newstype: e.target.value})}/> Image Gallery<br/>
            </div>
            <div>
              <input type="radio" name="newsType" value="musicGallery" onChange={e => this.setState({newstype: e.target.value})}/> Music Gallery<br/>
            </div>
          </div>
        </div>
        {this.state.newstype === "videoGallery" && (
          <Dropzone maxfiles="1" accept="video/*" className="postFormDropzone" onDrop={ this._onDrop.bind(this) } size={ 150 }>
            {({isDragActive}) => (
                <div className="dropzoneText">
                  {isDragActive ? "Drop!" : 'Click me or drag a file to upload!'}
                </div>
            )}
          </Dropzone>
        )}
        {this.state.newstype === "imageGallery" && (
          <Dropzone maxfiles="10" multiple="true" accept="image/*" className="postFormDropzone" onDrop={ this._onDrop.bind(this) } size={ 150 }>
              {({isDragActive}) => (
                  <div className="dropzoneText">
                    {isDragActive ? "Drop!" : 'Click me or drag a file to upload!'}
                  </div>
              )}
          </Dropzone>
        )}
        {this.state.newstype === "musicGallery" && (
          <Dropzone maxfiles="1" accept="audio/*" className="postFormDropzone" onDrop={ this._onDrop.bind(this) } size={ 150 }>
              {({isDragActive}) => (
                  <div className="dropzoneText">
                    {isDragActive ? "Drop!" : 'Click me or drag a file to upload!'}
                  </div>
              )}
          </Dropzone>
        )}
        <ul>
          {this.state.files.map((file,id) => <li className='' key={id}>
                                <div>{file.name + ' : ' + file.size + ' bytes.'}</div>
                            </li> )}
        </ul>
        {this.state.files.length > 0 && (
          <button type="submit" className="postFormButton">
          Add News!
          </button>
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, {createNewNews})(NewsForm);