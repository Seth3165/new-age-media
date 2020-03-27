import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_MESSAGES, REMOVE_MESSAGE, REINSTANCE_MESSAGES} from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const reinstanceMessages = messages => ({
  type: REINSTANCE_MESSAGES,
  messages
});

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch(err => dispatch(addError(err.message)));
  };
};

export const fetchMessages = (post_id) => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return apiCall("get", `/api/users/${id}/messages/${post_id}`)
    .then(res => {
      dispatch(loadMessages(res));
    })
    .catch(err => {
      dispatch(addError(err.message));
  });
};

export const refreshMessages = () => {
  return dispatch => dispatch(reinstanceMessages());
};

export const postNewMessage = (text, post_id) => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  console.log(post_id)
  return apiCall("post", `/api/users/${id}/messages/${post_id}`, {text})
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};