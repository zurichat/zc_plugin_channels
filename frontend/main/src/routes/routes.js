import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/home/Home";
import Admin from "../components/admin/index";
import CreateChannel from "../components/createChannel/index";
import MessageBoardIndex from "../components/MessageBoard/MessageBoardIndex";
import ChannelDetailsAndSetting from "../components/channelDetailsAndSetting/index";
import UserProfile from "../components/UserProfile/UserProfile";
import Thread from "../components/thread/Thread";
import ChannelBrowser from "../components/ChannelBrowser";
import MessageBoardEmpty from "../components/MessageBoard/subs/EmptyMessageBoard/MessageBoardEmpty";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from "../redux/actions/app";


const routes = () => {

  const dispatch = useDispatch();
  const { _getUsers } = bindActionCreators(appActions, dispatch);

  const loadData = async () => {
    await _getUsers();
  };

  useEffect( async () => {
    loadData()
  }, [])


  return (
    <Switch>
      <Route exact path="/">
        <ChannelBrowser />
      </Route>
      <Route path="/create-channel">
        <CreateChannel />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route exact path="/message-board/">
        <MessageBoardEmpty />
      </Route>
      <Route exact path="/message-board/:channelId">
        <MessageBoardIndex />
      </Route>
      <Route path="/channel-detail">
        <ChannelDetailsAndSetting />
      </Route>
      <Route path="/user-profile">
        <UserProfile />
      </Route>
      <Route path="/thread">
        <Thread />
      </Route>
      <Route path="/channel-browser">
        <ChannelBrowser />
      </Route>
    </Switch>
  );
};

export default routes;
