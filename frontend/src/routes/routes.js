<<<<<<< HEAD
import { Switch, Route } from "react-router-dom";
import Home from "../components/home/Home";
import Admin from "../components/admin/index";
import CreateChannel from "../components/createChannel/index";
import MessageBoardIndex from "../components/MessageBoard/MessageBoardIndex";
import ChannelDetailsAndSetting from "../components/channelDetailsAndSetting/index";
import userProfile from "../components/UserProfile/UserProfile";
import Index from "../components/thread/Thread";
=======

import { Switch, Route } from 'react-router-dom';
import Home from '../components/home/Home';
import Admin from '../components/admin/index';
import CreateChannel from '../components/createChannel/index';
import MessageBoardIndex from '../components/MessageBoard/MessageBoardIndex';
import ChannelDetailsAndSetting from '../components/channelDetailsAndSetting/index';
import UserProfile from '../components/UserProfile/UserProfile';
import Thread from '../components/thread/Thread';

>>>>>>> 7d333c776b2b4bd3baa3f590894592f5c626e249

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
<<<<<<< HEAD
      <Route path="/user-profile">
        <userProfile />
      </Route>
      <Route path="/thread">
        <Index />
=======
      <Route path='/user-profile'>
        <UserProfile />
      </Route>
      <Route path='/thread'>
        <Thread />
>>>>>>> 7d333c776b2b4bd3baa3f590894592f5c626e249
      </Route>
    </Switch>
  );
};

export default routes;
