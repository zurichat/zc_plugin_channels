import { v4 } from "uuid";
import { GET_CHANNEL_DETAILS } from "../actions/types";

const initialState = {
  channelDetails: {},
};

const channelsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CHANNEL_DETAILS:
      return {
        ...state,
        channelDetails: { ...payload },
      };

    default:
      return state;
  }
};

export default channelsReducer;
