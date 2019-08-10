import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import { setAuthToken } from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Landing from "./components/Layout/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { clearCurrentProfile } from "./actions/profileActions";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  let currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser);
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
}

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
              <Route path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
