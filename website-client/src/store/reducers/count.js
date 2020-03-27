import {COUNT_POSTS} from "../actionTypes";

const count = (state= [], action) => {
  switch(action.type) {
    case COUNT_POSTS:
      return [action.count];
    default:
      return state;
  }
};

export default count;