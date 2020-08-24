import React from "react";
import { Link } from "react-router-dom";

const ImageItem = ({filename, username}) => (
  <Link className="viewImageFrame">
    <img 
      className="viewImage" 
      src={`/images/${username}/${filename.split(' ').join('%20')}`}
      >
    </img>
  </Link>
);

export default ImageItem;