import React, {Component} from "react";
import {connect} from "react-redux";
import ImageItem from "../components/ImageItem";

class ImageGallery extends Component {
    render() {
    const {files, username} = this.props;
    let galleryDis = files.map(f => (
      <ImageItem
        filename={f}
        username={username}
      />
    ));
    return (
        <div className="galleryControl">{galleryDis}</div>
      );
  }
}

// function mapStateToProps(state){
//   return {
//     currentUser: state.currentUser.user.id
//   };
// }

// mapStateToProps, {}

export default connect()(ImageGallery);