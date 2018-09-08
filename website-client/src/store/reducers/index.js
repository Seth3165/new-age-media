import {combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import posts from "./posts";
import artists from "./profiles";

const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  posts,
  artists
});

export default rootReducer;