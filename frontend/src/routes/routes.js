import { Switch, Route } from "react-router-dom";
import Home from "../components/home/Home";
import Admin from "../components/admin/index";
import CreateChannel from "../components/createChannel/index";
import MessageBoardIndex from "../components/MessageBoard/MessageBoardIndex";
import ChannelDetailsAndSetting from "../components/channelDetailsAndSetting/index";
import UserProfile from "../components/UserProfile/UserProfile";
import Thread from "../components/thread/Thread";
import ChannelBrowser from "../components/ChannelBrowser";

const routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/create-channel">
        <CreateChannel />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/message-board">
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
