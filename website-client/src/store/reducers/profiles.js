import { SHOW_ARTIST, LOAD_ARTISTS } from "../actionTypes";

const artist = (state= [], action) => {
  switch(action.type) {
    case SHOW_ARTIST:
      return [action.artist];
    case LOAD_ARTISTS:
      return [...action.artists];
    default:
      return state;
  }
};

export default artist;