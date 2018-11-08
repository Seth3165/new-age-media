// import { reducer as formReducer } from "redux-form";
import { EDIT_USER } from "../actionTypes";


const artist = (state= {}, action) => {
  switch(action.type) {
    case EDIT_USER:
      return {
        artist: action.artist
      };
    default:
      return state;
  }
};

export default artist;

// const formPluginReducer = {
//   form: formReducer.plugin({
//       // this would be the name of the form you're trying to populate
//       artist: (state, action) => {
//          switch (action.type) {
//              case EDIT_USER:
//                 return {
//                   ...state,
//                   values: {
//                       ...state.values,
//                       ...action.payload.artist
//                   }
//               }
//             default:
//               return state;
//          }
//       }
//   })
// };

// export default formPluginReducer;