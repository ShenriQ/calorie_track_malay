import { ADD_USER, API_ERROR } from "./action-type";

const initialState = {
  user: null,
};

function userReducer(state = initialState, action) {
  if (action.type === ADD_USER) {
    return Object.assign({}, state, {
      user: action.payload
    });
  }
  
  return state;
}

export default userReducer;
