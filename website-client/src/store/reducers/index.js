import {combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import posts from "./posts";

const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  posts
});

export default rootReducer;