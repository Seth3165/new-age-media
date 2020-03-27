import {LOAD_NEWS, REMOVE_NEWS} from "../actionTypes";

const news = (state= [], action) => {
  switch(action.type) {
    case LOAD_NEWS:
      return [...action.news];
    case REMOVE_NEWS:
        return state.filter(news => news._id !== action.id);
    default:
      return state;
  }
};

export default news;