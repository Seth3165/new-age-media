import {combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";
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
  artists,
  form: formReducer
});

export default rootReducer;