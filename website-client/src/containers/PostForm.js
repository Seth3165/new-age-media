import React, {Component} from "react";
import {connect} from "react-redux";
// import Uploader from "../components/Uploader";
import {createNewPost} from "../store/actions/posts";
import {getSigPut} from "../store/actions/uploads";
import Dropzone from 'react-dropzone';
import axios from 'axios';
import ReactS3 from 'react-s3';
import { uploadFile } from 'react-s3';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from "../keys";

const config = {
  bucketName: 'namtestbucket',
  albumName: 'videos',
  region: 'us-east-1',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
};

class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      description: ""
    };
    
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
    // this.fileUpload = this.fileUpload.bind(this);
    // this.handleOnDrop = this.handleOnDrop.bind(this);
  }
  
  // onFormSubmit(e){
  //   e.preventDefault();
  //   this.props.getSigPut(this.state.file);
    // .then((response)=>{
    //   console.log(response.data);
    // });
  // }
  
  // onChange(e) {
  //   this.setState({file:e.target.files[0]});
  // }
  
  // fileUpload(file){
    // return axios.get('/upload', {
    //   params: {
    //     filename: file.name,
    //     filetype: file.type
    //   }
    // }).then(res => {
    //   const options = {
    //     headers: {
    //       'Content-Type': file.type
    //     }
    //   };
    //   let url = res.data.url;
    //   let formData = new FormData(file);
      
    //   return axios.put(url, formData, options);
    // });
    
    // const url = 'http://example.com/file-upload';
    // let formData = new FormData(file);
    // const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // }
    // console.log(formData);
    
    // return  post(url, formData, config)
  // }
  
  
  
  // handleNewPost = event => {
    // event.preventDefault();
    // this.props
    //   .createNewPost(
    //     this.state.title, 
    //     this.state.description,
    //     this.state.file.filename);
    // this.setState({title: ""});
    // this.setState({description: ""});
    // this.props.history.push("/");
  // }
  
  _onDrop = (files) => {
    ReactS3.uploadFile(files[0] , config)
    .then( (data) => {
      console.log(data.location)
    })
    .catch( (err) => {
      alert(err);
    })
  }
  
  // _onDrop = (files) => {
    // upload.post(`/uploads`)
    //   .attach('video', files[0])
    //   .end((err, res) => {
    //     if (err) console.log(err);
    //     alert('File uploaded!');
    //   });
    // let file = files[0];
    // axios.get(`/sign-s3?file-name=${file.name}&file-type=${file.type}`)
    // .then(function (result) {
    //   var signedUrl = result.data.signedUrl;
      
    //   var options = {
    //     headers: {
    //       'Content-Type': file.type
    //     }
    //   };

    //   return axios.put(result.signedRequest, file, options);
    // })
    // .then(function (result) {
    //   console.log(result);
    // })
    // .catch(function (err) {
    //   console.log(err);
    // });
  //   .then(function (result) {
  //     console.log(result);
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });
  // }
  
  // handleOnDrop(files) {
  //   this.setState({isUploading: true});
    
  //   Promise.all(files.map(file => this.uploadVideo(file)))
  //     .then(videos => {
  //       console.log(videos);
  //       this.setState({
  //         isUploading: false,
  //         videos: this.state.videos.concat(videos)
  //       });
  //     }).catch(e => console.log(e));
  // }
  
  // handleFinishedUpload = info => {
  //   console.log(info);
  //   console.log('File uploaded with filename', info.filename);
  //   console.log('Access it on s3 at', info.fileUrl);
  // }
  
  // uploadVideo(file) {
  //   return axios.get('/upload', {
  //     params: {
  //       filename: file.name,
  //       filetype: file.type
  //     }
  //   }).then(res => {
  //     const options = {
  //       headers: {
  //         'Content-Type': file.type
  //       }
  //     };
  //     return axios.put(res.data.url, file, options);
  //   }).then(res => {
  //     const {name} = res.config.data;
  //     return {
  //       name,
  //       isUploading: true,
  //       url: `https://namtestbucket.s3.amazonaws.com/${file.name}`
  //     };
  //   });
  // }
  
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
        <Dropzone onDrop={ this._onDrop } size={ 150 }>
          <div>
            Drop some files here!
          </div>
        </Dropzone>
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