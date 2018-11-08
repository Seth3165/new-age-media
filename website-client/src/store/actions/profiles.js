import {apiCall} from "../../services/api";
import {addError} from "./errors";
import { ADD_FAVORITE, ADD_ARTIST, SHOW_ARTIST, EDIT_USER, LOAD_ARTISTS } from "../actionTypes";

export const show = artist => ({
  type: SHOW_ARTIST,
  artist
});

export const editUser = (artist) => ({ type: EDIT_USER, artist });

export const loadArtists = artists => ({
  type: LOAD_ARTISTS,
  artists
});

export const addFavorite = (post_id) => (dispatch, getState) => {
    let {currentUser} = getState();
    const id = currentUser.user.id;
    return apiCall("put", `/api/users/${id}/profile/addfav/${post_id}`)
    .then(res => {})
    .catch(err => {
        dispatch(addError(err.message));
      });
};

export const addArtist = (artist_id) => (dispatch, getState) => {
    let {currentUser} = getState();
    const id = currentUser.user.id;
    return apiCall("put", `/api/users/${id}/profile/addartist/${artist_id}`)
    .then(res => {})
    .catch(err => {
        dispatch(addError(err.message));
      });
};

export const fetchArtist = (id, artist_id) => {
  return dispatch => {
    return apiCall("get", `/api/users/${id}/profile/show/${artist_id}`)
      .then(res => {
        dispatch(show(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const retrieveUser = (artist_id) => {
  return dispatch => {
    return apiCall("get", `/api/users/${artist_id}/profile/show/${artist_id}`)
      .then(res => {
        dispatch(editUser(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

// export const editArtist = (id) => {
//   return dispatch => {
//     return apiCall("get", `/api/users/${id}/profile/show/${id}`)
//       .then(res => {
//         dispatch(editUser(res));
//       })
//       .catch(err => {
//         dispatch(addError(err.message));
//       });
//   };
// };

export const fetchArtists = (id) => {
  return dispatch => {
    return apiCall("get", `/api/users/${id}/profile/artists`)
      .then(res => {
        dispatch(loadArtists(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};