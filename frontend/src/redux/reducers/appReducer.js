import { GET_CHANNELMESSAGES, GET_USERS } from "../actions/types";

const initialState = {
  // STEP TWO
  // Default State
  users: [],
  channelMessages: [],
};

const appReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // STEP THREE
    // A new state is returned with the data from the endpoint
    // The GET USERS case is handled here
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_CHANNELMESSAGES:
      return {
        ...state,
        channelMessages: payload,
      };  

    // Default state is returned
    default:
      return state;
  }
};

export default appReducer;
