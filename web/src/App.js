import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'mobx-react'

import { CompanyStore } from './store/companies'
import { HomePage } from './home/Home'

import "./App.css";

const TheApp = () => (
  <div>
    The app
    <Link to="/">Back</Link>
  </div>
)

const store = new CompanyStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <CssBaseline />
            <Route path="/" exact component={HomePage} />
            <Route path="/app" exact component={TheApp} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
