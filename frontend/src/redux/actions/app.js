import APIService from "../../utils/api";
import UtlilityService from "../../utils/utils";
import { GET_USERS, GET_CHANNEL_DETAILS } from "./types";

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
    const res = await APIService.getUsers();

    // Result is sent to the store via dispatch (Pass payload if needed)
    dispatch({ type: GET_USERS, payload: res.data });
  } catch (error) {
    // Handle exceptions here
    console.log(error);
  }
};

const _getChannelDetails = (org_id, channel_id) => async (dispatch) => {
  try {
    const res = await APIService.channelDetail(org_id, channel_id);
    console.log(res.data);

    dispatch({ type: GET_CHANNEL_DETAILS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  } finally {
  }
};

// Export functions here
const appActions = { _alert, _getUsers, _getChannelDetails };
export default appActions;
