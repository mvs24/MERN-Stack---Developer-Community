import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from './store';

import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Landing from "./components/Layout/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route path="/" exact component={Landing} />
            <div className="container">
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;