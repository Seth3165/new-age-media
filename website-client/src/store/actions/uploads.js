import {apiCall} from "../../services/api";
import {addError} from "./errors";

export const sendUpload = file => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/uploads`, {file})
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};