import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import TextField from "../Elements/TextField";

class Login extends Component {
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
    this.props.loginUser(user);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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

  render() {
    const { errors } = this.state;

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
                <TextField
                  error={errors.email}
                  onChange={this.onChangeHandler}
                  value={this.state.email}
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email
                  })}
                />

                <TextField
                  error={errors.password}
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
                  onChange={this.onChangeHandler}
                  value={this.state.password}
                  type="password"
                  placeholder="Password"
                  name="password"
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
  { loginUser }
)(Login);
