import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './routes/routes'
import store from './redux/store'
import MessageBoardIndex from './components/MessageBoard/MessageBoardIndex'

function App() {
  return (
    // <Provider store={store}>
    //   <Router>
    //     <Switch>
    //       <Route component={routes} />
    //     </Switch>
    //   </Router>
    // </Provider>
    <MessageBoardIndex />
  )
}

export default App
