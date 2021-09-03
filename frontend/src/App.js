import './App.css'
<<<<<<< HEAD
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//import { Provider } from 'react-redux'
//import routes from './routes/routes'
//import store from './redux/store'
import UserProfile from './components/UserProfile/OnclickuserProfile'


function App() {
  return (
   <div className="App">

   </div>
=======
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './routes/routes'
import store from './redux/store'
import Home from './components/home/Home'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route component={routes} />
      </Router>
    </Provider>
>>>>>>> cecc93c8c47a74f2759ea9ad5e8a55f6d165f002
  )
}

export default App
