import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {COUNT_POSTS} from "../actionTypes";

export const count = count => ({
  type: COUNT_POSTS,
  count
});

export const countTotalPosts = () => {
  return dispatch => {
    return apiCall("get", "/api/posts/count" )
      .then(res => {
        console.log(res);
        dispatch(count(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};