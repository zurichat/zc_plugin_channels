import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './routes/routes'
import store from './redux/store'
import MessageCard from './components/MessageBoard/subs/MessageCard/MessageCard'
import EachMessage from './components/admin/subs/MessageBoardTop/EachMessage'
import MessageBoardTop from './components/admin/subs/MessageBoardTop/MessageBoardTop'
import MessageCardContainer from './components/MessageBoard/subs/MessageCardContainer/MessageCardContainer'

function App() {
  return (
    // <Provider store={store}>
    //   <Router>
    //     <Switch>
    //       <Route component={routes} />
    //     </Switch>
    //   </Router>
    // </Provider>
    // <MessageCard />
    // <EachMessage />
    // <MessageBoardTop />
    <MessageCardContainer />
  )
}

export default App
