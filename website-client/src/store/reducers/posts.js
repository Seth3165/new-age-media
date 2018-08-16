import {SHOW_POST, LOAD_POSTS, REMOVE_POST, REINSTANCE_POSTS} from "../actionTypes";

const post = (state= [], action) => {
  switch(action.type) {
    case SHOW_POST:
      return [action.post];
    case LOAD_POSTS:
      return [...action.posts];
    case REMOVE_POST:
      return state.filter(post => post._id !== action.id);
    case REINSTANCE_POSTS:
      return [];
    default:
      return state;
  }
};

export default post;