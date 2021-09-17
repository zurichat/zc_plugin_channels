import { v4 } from "uuid";
import { GET_CHANNEL_DETAILS } from "../actions/types";

const initialState = {
  channelDetails: {
    id: v4(),
    name: "General",
    members: 500,
    owner: "Abibola",
    created_on: "2014-09-08T08:02:17-05:00",
  },
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
