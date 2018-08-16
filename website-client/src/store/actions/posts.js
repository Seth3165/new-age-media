import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {SHOW_POST, LOAD_POSTS, REMOVE_POST, REINSTANCE_POSTS} from "../actionTypes";

export const show = post => ({
  type: SHOW_POST,
  post
});

export const loadPosts = posts => ({
  type: LOAD_POSTS,
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

export const removePost = (user_id, post_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/posts/${post_id}`)
      .then(() => dispatch(remove(post_id)))
      .catch(err => dispatch(addError(err.message)));
  };
};

export const showPost = (post_id) => {
  return dispatch => {
    return apiCall("get", `/api/posts/${post_id}`)
      .then(res => {
        console.log(res);
        dispatch(show(res));
      })
      .catch(err => dispatch(addError(err.message)));
  };
};

export const fetchPosts = () => {
  return dispatch => {
    return apiCall("get", "/api/posts")
      .then(res => {
        dispatch(loadPosts(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const refreshPosts = () => {
  return dispatch => dispatch(reinstancePosts());
};

export const createNewPost = (title, description, filename) => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/posts`, {title, description, filename})
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};