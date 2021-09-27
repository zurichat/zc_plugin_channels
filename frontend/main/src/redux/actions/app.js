import APIService from "../../utils/api";
import UtlilityService from "../../utils/utils";
import { GetUserInfo } from "@zuri/control";

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
    // const res = await GetUserInfo();

    GetUserInfo().then((res) => {
      dispatch({ type: GET_USERS, payload: res });
    })

    // Result is sent to the store via dispatch (Pass payload if needed)
  } catch (error) {
    // Handle exceptions here
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
    console.log(error);// Handle exceptions here
  }
};
const _getChannelMessages = (org_id, channel_id) => async (dispatch) => {
  try {
    // Result comes from the endpoint
    // Let's assume an array of objects is returned from the endpoint
    const res = await APIService.getMessages(org_id, channel_id);
    console.log(res.data);
    // Result is sent to the store via dispatch (Pass payload if needed)
    dispatch({ type: GET_CHANNELMESSAGES, payload: res.data.data });
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
    const data = res.data.data || []
    dispatch({ type: GET_PINNED_MESSAGES, payload: data });
  } catch (err) {
    _alert("error");
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

const _createChannel = (org_id, data) => async (dispatch) => {
  try {
    const res = await APIService.createChannel(org_id, data);
    dispatch({ type: CREATE_CHANNELS, payload: res.data });
    _alert("success", "Channel successfully created");
  } catch (error) {
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
};
export default appActions;
