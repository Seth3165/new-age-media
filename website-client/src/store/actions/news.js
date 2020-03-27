import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_NEWS, REMOVE_NEWS, REINSTANCE_NEWS} from "../actionTypes";

export const loadNews = news => ({
  type: LOAD_NEWS,
  news
});

export const remove = id => ({
  type: REMOVE_NEWS,
  id
});

export const reinstanceNews = news => ({
  type: REINSTANCE_NEWS,
  news
});

export const removeNews = (user_id, news_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/news/${news_id}`)
      .then(() => dispatch(remove(news_id)))
      .catch(err => dispatch(addError(err.message)));
  };
};

export const fetchNews = () => {
  return dispatch => {
    return apiCall("get", "/api/news")
      .then(res => {
        dispatch(loadNews(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
}; 

export const refreshNews = () => {
  return dispatch => dispatch(reinstanceNews());
};

export const createNewNews = (title, description, newstype, filename) => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/news`, {title, description, newstype, filename})
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};