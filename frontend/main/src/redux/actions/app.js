import APIService from "../../utils/api";
import UtlilityService from "../../utils/utils";
import { GetUserInfo, GetWorkspaceUsers } from "@zuri/control";

import {
  GET_CHANNELMESSAGES,
  GET_USERS,
  GET_CHANNEL_DETAILS,
  GET_PINNED_MESSAGES,
  PIN_MESSAGE,
  ARCHIVE_CHANNEL,
  SEND_MESSAGES,
  GET_CHANNELS,
  CREATE_CHANNELS,
  GET_SOCKETS,
  ADD_CHANNEL_MEMBER,
  REMOVE_CHANNEL_MEMBER,
  SET_NOTIFICATION,
  USER_CAN_INPUT,
  GET_FILES,
  DELETE_CHANNEL,
  GET_WORKSPACE_USERS,
} from "./types";

// Redux actions are called here with an underscore before the name (convention)

const _alert = (type, message) => {
  if (type === "success") {
    const title = message;
    const description = " ";
    const status = "info";
    const duration = 3000;

    UtlilityService.showAlert(title, description, status, duration);
  }

  if (type === "error") {
    const title = "Something went wrong.";
    const description = " ";
    const status = "error";
    const duration = 3000;

    UtlilityService.showAlert(title, description, status, duration);
  }
};

// STEP FOUR
// @desc This is a redux function to fetch users and update the redux state
// Pass params if needed
const _getUsers = (params) => async (dispatch) => {
  try {
    // Result comes from the endpoint
    // Let's assume an array of objects is returned from the endpoint
    const res = await GetUserInfo();
    dispatch({ type: GET_USERS, payload: res });
    // Result is sent to the store via dispatch (Pass payload if needed)
  } catch (error) {
    // Handle exceptions here
    console.log(error);
  }
};

const _getWorkspaceUsers = (params) => async (dispatch) => {
  try {
    // GetWorkspaceUsers().then((res) => {
    const res = await GetWorkspaceUsers();
    dispatch({ type: GET_WORKSPACE_USERS, payload: res });
    // });
  } catch (error) {
    console.log(error);
  }
};
const _addChannelMember = (org_id, channel_id, data) => async (dispatch) => {
  try {
    // Result comes from the endpoint
    // Let's assume an array of objects is returned from the endpoint
    const res = await APIService.addChannelMember(org_id, channel_id, data);
    console.log(res.data);
    dispatch({ type: ADD_CHANNEL_MEMBER, payload: res.data }); // Result is sent to the store via dispatch (Pass payload if needed)
  } catch (error) {
    console.log(error); // Handle exceptions here
  }
};
const _removeChannelMember = (org_id, channel_id, data) => async (dispatch) => {
  try {
    // Result comes from the endpoint
    // Let's assume an array of objects is returned from the endpoint
    const res = await APIService.removeChannelMember(org_id, channel_id, data);
    console.log(res.data);
    dispatch({ type: REMOVE_CHANNEL_MEMBER, payload: res.data }); // Result is sent to the store via dispatch (Pass payload if needed)
  } catch (error) {
    console.log(error); // Handle exceptions here
  }
};
const _getChannelMessages = (org_id, channel_id) => async (dispatch) => {
  try {
    // Result comes from the endpoint
    // Let's assume an array of objects is returned from the endpoint
    const res = await APIService.getMessages(org_id, channel_id);
    console.log(res.data);
    // Result is sent to the store via dispatch (Pass payload if needed)
    dispatch({ type: GET_CHANNELMESSAGES, payload: res.data });
    return res.data
  } catch (error) {
    // Handle exceptions here
    console.log(error);
  }
};
const _getSocket = (org_id, channel_id) => async (dispatch) => {
  try {
    // Result comes from the endpoint
    // Let's assume an array of objects is returned from the endpoint
    const res = await APIService.getSockets(org_id, channel_id);
    console.log(res.data);
    // Result is sent to the store via dispatch (Pass payload if needed)
    dispatch({ type: GET_SOCKETS, payload: res.data });
  } catch (error) {
    // Handle exceptions here
    console.log(error);
  }
};
const _setNotifications =
  (org_id, channel_id, member_id, data) => async (dispatch) => {
    try {
      // Result comes from the endpoint
      // Let's assume an array of objects is returned from the endpoint
      const res = await APIService.setNotification(
        org_id,
        channel_id,
        member_id,
        data
      );
      // Result is sent to the store via dispatch (Pass payload if needed)
      dispatch({ type: SET_NOTIFICATION, payload: res.data });
    } catch (error) {
      // Handle exceptions here
      console.log(error);
    }
  };
const _getNotifications =
  (org_id, channel_id, member_id, data) => async (dispatch) => {
    try {
      // Result comes from the endpoint
      // Let's assume an array of objects is returned from the endpoint
      const res = await APIService.getNotification(
        org_id,
        channel_id,
        member_id
      );
      // Result is sent to the store via dispatch (Pass payload if needed)
      dispatch({ type: SET_NOTIFICATION, payload: res.data });
    } catch (error) {
      // Handle exceptions here
      console.log(error);
    }
  };
const _getChannel_Thread_Messages =
  (org_id, channel_id) => async (dispatch) => {
    try {
      // Result comes from the endpoint
      // Let's assume an array of objects is returned from the endpoint
      const res = await APIService.getMessages(org_id, channel_id);
      console.log(res.data);
      // Result is sent to the store via dispatch (Pass payload if needed)
      dispatch({ type: GET_CHANNELMESSAGES, payload: res.data });
    } catch (error) {
      // Handle exceptions here
      console.log(error);
    }
  };
const _sendMessage = (org_id, channel_id, data) => async (dispatch) => {
  try {
    const res = await APIService.sendMessage(org_id, channel_id, data);
    // console.log(res.data)
    dispatch({ type: SEND_MESSAGES, payload: res.data });
  } catch (err) {
    console.log("Oops something went wrong", err.message);
  }
};

const _getChannelDetails = (org_id, channel_id) => async (dispatch) => {
  try {
    const res = await APIService.getChannelDetails(org_id, channel_id);
    console.log(res.data);

    dispatch({ type: GET_CHANNEL_DETAILS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  } finally {
  }
};

const _getChannels = (org_id) => async (dispatch) => {
  try {
    const res = await APIService.getChannels(org_id);
    dispatch({ type: GET_CHANNELS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

const _getPinnedMessages = (org_id, channel_id) => async (dispatch) => {
  try {
    const res = await APIService.getPinnedMessages(org_id, channel_id);
    const data = res.data.data || [];
    dispatch({ type: GET_PINNED_MESSAGES, payload: data });
  } catch (err) {
    console.log(err);
  }
};

const _pinMessage =
  (org_id, channel_id, user_id, message_id) => async (dispatch) => {
    try {
      const res = await APIService.updateMessage(
        org_id,
        channel_id,
        user_id,
        message_id,
        { pinned: "True" }
      );
      dispatch({ type: PIN_MESSAGE, payload: res.data });
    } catch (err) {
      _alert("error");
    }
  };

const _archiveChannel = (org_id, channel_id) => async (dispatch) => {
  try {
    const res = await APIService.updateChannel(org_id, channel_id, {
      archived: "True",
    });
    dispatch({ type: ARCHIVE_CHANNEL, payload: res.data });
    _alert("success", "Channel successfully archived");
  } catch (err) {
    _alert("error");
  }
};

const _createChannel = (org_id, ud, data) => async (dispatch) => {
  try {
    const res = await APIService.createChannel(org_id, ud,data);
    dispatch({ type: CREATE_CHANNELS, payload: res.data });
    _alert("success", "Channel successfully created");
  } catch (error) {
    _alert("error");
  }
};

const _userCanInput = (org_id, data) => async (dispatch) => {
  try {
    const res = await APIService.userCanInput(org_id, data);
    dispatch({ type: USER_CAN_INPUT, payload: res.data });
    console.log("can input?", res);
  } catch (error) {
    console.log("err", err);
  }
};

const _getFiles = (org_id, channel_id) => async (dispatch) => {
  try {
    const res = await APIService.getChannelFiles(org_id, channel_id);
    dispatch({ type: GET_FILES, payload: res.data });
    // _alert("success", "Channel successfully created");
  } catch (error) {
    _alert("slow connection");
  }
};

const _deleteChannel = (org_id, channel_id) => async (dispatch) => {
  try {
    const res = await APIService.deleteChannel(org_id, channel_id, {
      delete: "True",
    });
    dispatch({ type: DELETE_CHANNEL, payload: res.data });
    _alert("success", "Channel successfully deleted");
  } catch (err) {
    _alert("error");
  }
};

// Export functions here
const appActions = {
  _alert,
  _getUsers,
  _getChannelMessages,
  _getChannel_Thread_Messages,
  _getChannelDetails,
  _getPinnedMessages,
  _pinMessage,
  _archiveChannel,
  _sendMessage,
  _getChannels,
  _createChannel,
  _getSocket,
  _addChannelMember,
  _removeChannelMember,
  _setNotifications,
  _userCanInput,
  _deleteChannel,
  _getFiles,
  _getWorkspaceUsers,
  _getNotifications,
};
export default appActions;
