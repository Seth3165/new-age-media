import {combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import posts from "./posts";
import artists from "./profiles";
import { reducer as formReducer } from "redux-form";
// import editformPluginReducer from "./formReducers.js";

const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  posts,
  artists,
  form: formReducer
});

export default rootReducer;