import { Switch, Route } from 'react-router-dom'
import Home from '../components/home/Home'

const routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
    </Switch>
  )
}

export default routes
