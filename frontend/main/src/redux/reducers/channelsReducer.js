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
  UPDATE_MESSAGE,
  EDIT_MESSAGE,
  DELETE_MESSAGE,
  EDIT_CHANNEL_DESCRIPTION,
  EDIT_CHANNEL_TOPIC,
} from "../actions/types";

const initialState = {
  channelDetails: {
    name : 'General',
    members:  '1',
    private: false,
    archived : false,
  },
  pinnedMessages: [],
  sendMessages: {},
  channelMember: {},
  editMessage: {},
  messages : [],
  isEditMode : false,
  editDescription: {},
  editTopic: {},
};

const channelsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CHANNEL_MEMBER:
      return {
        ...state,
        channelMember: { ...payload },
      };
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

    case DELETE_CHANNEL: {
      return {
        ...state,
        channelDetails: {  },
      };
    }

    case EDIT_CHANNEL_DESCRIPTION:
      return {
        ...state,
        editDescription: action.payload
      };

    case EDIT_CHANNEL_TOPIC:
      return {
        ...state,
        editTopic: action.payload
      };

    default:
      return state;
  }
};

export default channelsReducer;
