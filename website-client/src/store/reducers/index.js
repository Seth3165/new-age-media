import {combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import news from "./news";
import messages from "./messages";
import posts from "./posts";
import count from "./count";
import artists from "./profiles";
import { reducer as formReducer } from "redux-form";
// import editformPluginReducer from "./formReducers.js";

const rootReducer = combineReducers({
  currentUser,
  errors,
  news,
  messages,
  posts,
  count,
  artists,
  form: formReducer
});

export default rootReducer;