import { GET_USERS,SEND_MESSAGES } from "../actions/types";

const initialState = {
  // STEP TWO
  // Default State
  users: [],
  sendMessages:{}
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
      case SEND_MESSAGES:
        return{
          ...state,
          sendMessages:payload
        }
    // Default state is returned
    default:
      return state;
  }
};

export default appReducer;
