import React, { Component } from "react";
import classnames from "classnames";
import TextField from "../Elements/TextField";

import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    let newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <p className="lead text-center">Create your Developer account</p>
              <form noValidate onSubmit={this.onSubmitHandler}>
                <TextField
                  error={errors.name}
                  onChange={this.onChangeHandler}
                  value={this.state.name}
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.name
                  })}
                  placeholder="Name"
                  name="name"
                  required
                />

                <TextField
                  error={errors.email}
                  onChange={this.onChangeHandler}
                  value={this.state.email}
                  type="email"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email
                  })}
                  placeholder="Email Address"
                  name="email"
                  info="This site uses Gravatar so if you want a profile image, use a gravatar email"
                />

                <TextField
                  error={errors.password}
                  onChange={this.onChangeHandler}
                  value={this.state.password}
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
                  placeholder="Password"
                  name="password"
                />

                <TextField
                  error={errors.password2}
                  onChange={this.onChangeHandler}
                  value={this.state.password2}
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password2
                  })}
                  placeholder="Confirm Password"
                  name="password2"
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
