import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

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
                <div className="form-group">
                  <input
                    onChange={this.onChangeHandler}
                    value={this.state.name}
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback text-center">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeHandler}
                    value={this.state.email}
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback text-center">
                      {errors.email}
                    </div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeHandler}
                    value={this.state.password}
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback text-center">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeHandler}
                    value={this.state.password2}
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback text-center">
                      {errors.password2}
                    </div>
                  )}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

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
