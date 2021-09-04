import { Switch, Route } from 'react-router-dom';
import Home from '../components/home/Home';
import Admin from '../components/admin/index';
import CreateChannel from '../components/createChannel/index';
import MessageBoardIndex from '../components/MessageBoard/MessageBoardIndex/';
import ChannelDetailsAndSetting from '../components/channelDetailsAndSetting/index';
import userProfile from '../components/UserProfile/UserProfile';
import Index from '../components/thread/Index';

const routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/create-channel'>
        <CreateChannel />
      </Route>
      <Route path='/admin'>
        <Admin />
      </Route>
      <Route path='/message-board'>
        <MessageBoardIndex />
      </Route>
      <Route path='/channel-detail'>
        <ChannelDetailsAndSetting />
      </Route>
      <Route path='/user-profile'>
        <userProfile />
      </Route>
      <Route path='/thread'>
        <Index />
      </Route>
    </Switch>
  );
};

export default routes;
