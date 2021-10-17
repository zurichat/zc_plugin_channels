// import { v4 } from "uuid";
import UtilityService from "../../utils/utils";
import {
  ARCHIVE_CHANNEL,
  GET_CHANNEL_DETAILS,
  GET_PINNED_MESSAGES,
  PIN_MESSAGE,
  SEND_MESSAGES,
  ADD_CHANNEL_MEMBER,
  DELETE_CHANNEL,
} from "../actions/types";

const initialState = {
  channelDetails: {
    name : 'General',
    members:  '1',
    private: false,
    archived : false,
    users:[],
  },
  pinnedMessages: [],
  sendMessages: {},
  channelMember: {},
};

const channelsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CHANNEL_MEMBER:
      return {
        ...state,
        channelMember: [...channelMember, ...payload ],
        channelDetails: {...channelDetails, users: [...channelMember] },

      };
    // case REMOVE_CHANNEL_MEMBER:
    //   return {
    //     ...state,
    //     channelMember: channelMember.filter(),
    //     channelDetails: {...channelDetails, users: [...channelMember] },

    //   };
    case GET_CHANNEL_DETAILS:
      return {
        ...state,
        channelDetails: { ...payload },
      };
    case GET_PINNED_MESSAGES: {
      return {
        ...state,
        pinnedMessages: payload,
      };
    }
    case SEND_MESSAGES:
      return {
        ...state,
        sendMessages: payload,
      };
    case PIN_MESSAGE: {
      const { pinnedMessages: formal } = state;
      const pinnedMessages = UtilityService.removeDuplicateObjectFromArray(
        [...formal, payload],
        "_id"
      );
      return {
        ...state,
        pinnedMessages,
      };
    }
    case ARCHIVE_CHANNEL: {
      return {
        ...state,
        channelDetails: { ...payload },
      };
    }

    case DELETE_CHANNEL: {
      return {
        ...state,
        channelDetails: {  },
      };
    }
    default:
      return state;
  }
};

export default channelsReducer;
