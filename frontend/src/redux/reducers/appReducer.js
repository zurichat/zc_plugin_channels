import { GET_USERS, GET_CHANNELS } from "../actions/types";

const initialState = {
  // STEP TWO
  // Default State
  users: [],
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
    // Default state is returned

    case GET_CHANNELS:
      return {
        ...state,
        channels: payload,
      };

    default:
      return state;
  }
};

export default appReducer;
