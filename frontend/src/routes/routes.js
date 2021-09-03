import { Switch, Route } from 'react-router-dom'
import Home from '../components/home/Home'
import Admin from '../components/admin/index'
import CreateChannel from '../components/createChannel/index'
import MessageBoardIndex from '../components/MessageBoard/MessageBoardIndex'
<<<<<<< HEAD
=======
// import TempSidebar from '../components/TempSidebar/index'
import { Box, HStack } from '@chakra-ui/layout'
>>>>>>> 2576487887c997322b9f2015fd98313d1d01a1a8

const routes = () => {
  return (
    <Switch>
<<<<<<< HEAD
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
=======
      <HStack>
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
      </HStack>
>>>>>>> 2576487887c997322b9f2015fd98313d1d01a1a8
    </Switch>
  )
}

export default routes
