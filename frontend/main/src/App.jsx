import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { ChakraProvider } from "@chakra-ui/react"
import Routes from "./routes/routes"
import store from "./redux/store"
import { theme } from "./utils/theme"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Router basename="/channels">
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Router>
      </Provider>
    </ChakraProvider>
  )
}

export default App
