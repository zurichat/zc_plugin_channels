import {
  GET_CHANNELMESSAGES,
  GET_USERS,
  GET_CHANNELS,
  CREATE_CHANNELS,
  GET_SOCKETS,
} from "../actions/types";

const initialState = {
  // STEP TWO
  // Default State
  users: [],
  channelMessages: [],
  sockets: []
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

    case GET_CHANNELS:
      return {
        ...state,
        channels: payload,
      };
    case CREATE_CHANNELS:
      return {
        ...state,
        newChannel: payload,
      };
    case GET_SOCKETS:
      return {
        ...state,
        sockets: payload,
      };

    default:
      return state;
  }
};

export default appReducer;
