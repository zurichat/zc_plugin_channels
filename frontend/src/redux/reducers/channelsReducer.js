// import { v4 } from "uuid";
import UtilityService from "../../utils/utils";
import {
  ARCHIVE_CHANNEL,
  GET_CHANNEL_DETAILS,
  GET_PINNED_MESSAGES,
  PIN_MESSAGE,
  SEND_MESSAGES,
  DELETE_CHANNEL,
  UPDATE_MESSAGE,
  EDIT_MESSAGE,
  DELETE_MESSAGE,
} from "../actions/types";

const initialState = {
  channelDetails: {},
  pinnedMessages: [],
  sendMessages: {},
  editMessage: {},
  messages : [],
  isEditMode : false,
};

const channelsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
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

    case UPDATE_MESSAGE:
      return {
        ...state,
        messages : [...state.messages.map(message => message.msg_id === payload.msg_id ? payload : message)]
      };

    case EDIT_MESSAGE:
      return {
        ...state,
        editMessage: action.payload
      };

    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(message => message.msg_id !== action.payload)
      };
    
    default:
      return state;
  }
};

export default channelsReducer;
