import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'mobx-react'

import { RootStore } from './store/root'
import { HomePage } from './home/HomePage'
import { LoginPage } from './login/LoginPage'

import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'

const store = new RootStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
