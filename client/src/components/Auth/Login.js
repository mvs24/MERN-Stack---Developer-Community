import React, { Component } from "react";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Login to your Developer account
              </p>
              <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                  <input
                    onChange={this.onChangeHandler}
                    value={this.state.email}
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeHandler}
                    value={this.state.password}
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
