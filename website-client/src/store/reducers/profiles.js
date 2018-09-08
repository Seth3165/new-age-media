import {LOAD_ARTISTS} from "../actionTypes";

const artist = (state= [], action) => {
  switch(action.type) {
    case LOAD_ARTISTS:
      return [...action.artists];
    default:
      return state;
  }
};

export default artist;