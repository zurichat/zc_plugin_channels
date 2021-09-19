import APIService from "../../utils/api";
import UtlilityService from "../../utils/utils";
import { GET_CHANNELMESSAGES, GET_USERS } from "./types";

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
const _getChannelMessages = (org_id, channel_id) => async (dispatch) => {
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

// Export functions here
const appActions = { _alert, _getUsers, _getChannelMessages };
export default appActions;
