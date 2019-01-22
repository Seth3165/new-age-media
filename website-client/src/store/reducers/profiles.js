import { SHOW_ARTIST, LOAD_ARTISTS, REINSTANCE_ARTISTS } from "../actionTypes";

const artist = (state= [], action) => {
  switch(action.type) {
    case SHOW_ARTIST:
      return [action.artist];
    case LOAD_ARTISTS:
      return [...action.artists];
    case REINSTANCE_ARTISTS:
      return [];
    default:
      return state;
  }
};

export default artist;