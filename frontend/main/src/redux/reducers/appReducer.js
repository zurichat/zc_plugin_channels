import {
  GET_CHANNELMESSAGES,
  GET_USERS,
  GET_CHANNELS,
  CREATE_CHANNELS,
  GET_SOCKETS,
  GET_RENDEREDMESSAGES,
  SET_NOTIFICATION,
  USER_CAN_INPUT,
  GET_FILES,
  GET_WORKSPACE_USERS,
  GET_NOTIFICATION_SETTINGS,
  UPDATE_CHANNELMESSAGES,
  DELETE_CHANNELMESSAGES,
  ADD_CHANNELMESSAGES
} from "../actions/types"

const initialState = {
  // STEP TWO
  // Default State
  users: {},
  workspaceUsers: [],
  workspaceUsersObject: {},
  channelMessages: null,
  channels: [],
  sockets: [],
  renderedMessages: [],
  notificationSettings: [],
  userNotificationSettings: [],
  userCanInput: true,
  channelsFiles: []
}

const appReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    // STEP THREE
    // A new state is returned with the data from the endpoint
    // The GET USERS case is handled here
    case GET_USERS:
      return {
        ...state,
        users: payload
      }

    case GET_WORKSPACE_USERS: {
      const workspaceUsers = payload
      const workspaceUsersObject = {}
      Object.values(workspaceUsers).forEach(user => {
        workspaceUsersObject[user._id] = user
      })
      return {
        ...state,
        workspaceUsers,
        workspaceUsersObject
      }
    }
    case GET_CHANNELMESSAGES:
      return {
        ...state,
        channelMessages: payload
      }
    case ADD_CHANNELMESSAGES:
      return {
        ...state,
        channelMessages: [...state.channelMessages, payload]
      }
    case UPDATE_CHANNELMESSAGES: {
      const channelMessages = [...state.channelMessages]
      channelMessages.find((o, i) => {
        if (o._id === payload._id) {
          channelMessages[i] = payload
          return true
        }
        return false
      })
      return {
        ...state,
        channelMessages
      }
    }
    case DELETE_CHANNELMESSAGES: {
      const channelMessages = [...state.channelMessages]
      channelMessages.find((o, i) => {
        if (o._id === payload._id) {
          channelMessages.splice(i, 1)
          return true
        }
        return false
      })
      return {
        ...state,
        channelMessages
      }
    }
    case GET_RENDEREDMESSAGES:
      return {
        ...state,
        renderedMessages: payload
      }
    case USER_CAN_INPUT:
      return {
        ...state,
        userCanInput: payload
      }

    case GET_FILES:
      return {
        ...state,
        channelsFiles: payload
      }

    // Default state is returned

    case GET_CHANNELS:
      return {
        ...state,
        channels: payload
      }
    case CREATE_CHANNELS:
      return {
        ...state,
        newChannel: payload
      }
    case GET_SOCKETS:
      return {
        ...state,
        sockets: payload
      }
    case SET_NOTIFICATION:
      return {
        ...state,
        notificationSettings: payload
      }
    case GET_NOTIFICATION_SETTINGS:
      return {
        ...state,
        userNotificationSettings: payload
      }

    default:
      return state
  }
}

export default appReducer
