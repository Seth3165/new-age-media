import React, {Component} from "react";
const ReactS3Uploader = require('react-s3-uploader');

export default class Uploader extends Component {
  constructor(props){
    super(props);
  }
  
  getSignedUrl = (file, accept) => {
    
  }
  
  render(){
    
    return(
      <ReactS3Uploader
        signingUrl="/s3/sign"
        getSignedUrl={this.getSignedUrl}
        accept='*'
        s3path="/uploads/"
      />
    );
  }
}