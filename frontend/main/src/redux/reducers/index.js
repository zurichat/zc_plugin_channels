import { combineReducers } from "redux";
import appReducer from "./appReducer";
import channelsReducer from "./channelsReducer";

export default combineReducers({
  appReducer,
  channelsReducer,
});
