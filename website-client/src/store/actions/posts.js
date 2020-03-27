import {apiCall} from "../../services/api";
import {addError} from "./errors";
import ReactS3 from 'react-s3';
// import { deleteFile } from 'react-s3';
import AWS from 'aws-sdk';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from "../../keys";
import {SHOW_POST, LOAD_POSTS, LOAD_MY_POSTS, LOAD_MY_FAVORITES, ADD_FAVORITE, REMOVE_POST, REINSTANCE_POSTS, COUNT_POSTS} from "../actionTypes";

// let config = {
//   bucketName: 'namtestbucket',
//   // albumName: 'videos',
//   region: 'us-east-1',
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY
// };

AWS.config.update({
    accessKeyId : AWS_ACCESS_KEY_ID,
    secretAccessKey : AWS_SECRET_ACCESS_KEY
});
AWS.config.region = 'us-east-1';

function deleteFile(filename) {
    var s3 = new AWS.S3({accessKeyId: AWS_ACCESS_KEY_ID,
                        secretAccessKey: AWS_SECRET_ACCESS_KEY,
                        region: 'us-east-1'});
    var params = {
        Bucket: 'namtestbucket',
        Key: filename
    };
    s3.deleteObject(params, function (err, data) {
        if (data) {
            console.log("File deleted successfully");
        }
        else {
            console.log("Check if you have sufficient permissions : "+err);
        }
    });
}


export const show = post => ({
  type: SHOW_POST,
  post
});

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const loadMyPosts = posts => ({
  type: LOAD_MY_POSTS,
  posts
});

export const loadMyFavorites = posts => ({
  type: LOAD_MY_FAVORITES,
  posts
});

export const remove = id => ({
  type: REMOVE_POST,
  id
});

export const reinstancePosts = posts => ({
  type: REINSTANCE_POSTS,
  posts
});

// export const count = num => ({
//   type: COUNT_POSTS,
//   num
// });

export const removePost = (user_id, post_id, file) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/posts/${post_id}`)
      .then(() => dispatch(remove(post_id)))
      .then(deleteFile(file))
            .then((response) => console.log(response))
            .catch((err) => console.error(err))
      .catch(err => dispatch(addError(err.message)));
  };
};

export const showPost = (post_id) => {
  return dispatch => {
    return apiCall("get", `/api/posts/show/${post_id}`)
      .then(res => {
        console.log(res);
        dispatch(show(res));
      })
      .catch(err => dispatch(addError(err.message)));
  };
};

export const fetchPosts = (pageNumber) => {
  return dispatch => {
    return apiCall("get", `/api/posts/page/${pageNumber}`)
      .then(res => {
        dispatch(loadPosts(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const fetchMyPosts = (id, pageNumber) => {
  return dispatch => {
    return apiCall("get", `/api/posts/${id}/page/${pageNumber}`)
      .then(res => {
        dispatch(loadMyPosts(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const fetchMyFavorites = (id, pageNumber) => {
  return dispatch => {
    return apiCall("get", `/api/posts/${id}/favorites/page/${pageNumber}`)
      .then(res => {
        dispatch(loadMyFavorites(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

// export const countTotalPosts = () => {
//   return dispatch => {
//     return apiCall("get", "/api/posts/count" )
//       .then(res => {
//         console.log(res)
//         dispatch(res);
//       })
//       .catch(err => {
//         dispatch(addError(err.message));
//       });
//   };
// };

export const refreshPosts = () => {
  return dispatch => dispatch(reinstancePosts());
};

export const createNewPost = (title, description, gallerytype, filename) => (dispatch, getState) => {
  let {currentUser} = getState();
  console.log(gallerytype)
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/posts`, {title, description, gallerytype, filename})
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};