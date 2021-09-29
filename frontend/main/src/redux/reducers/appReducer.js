import {
  GET_CHANNELMESSAGES,
  GET_USERS,
  GET_CHANNELS,
  CREATE_CHANNELS,
  GET_SOCKETS,
  GET_RENDEREDMESSAGES,
  SET_NOTIFICATION
} from "../actions/types";

const initialState = {
  // STEP TWO
  // Default State
  users: [],
  channelMessages: [],
  sockets: [],
  renderedMessages: [],
  notificationSettings: []
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
    case GET_RENDEREDMESSAGES:
      return {
        ...state,
        renderedMessages: payload,
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
    case SET_NOTIFICATION:
      return {
        ...state,
        notificationSettings: payload,
      };

    default:
      return state;
  }
};

export default appReducer;
