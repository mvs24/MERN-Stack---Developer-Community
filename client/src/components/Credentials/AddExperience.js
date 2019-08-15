import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { TextField } from "../Elements/TextField";
import { TextArea } from "../Elements/TextArea";
import { connect } from "react-redux";

class AddExperience extends Component {
  state = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: "",
    disabled: ""
  };

  render() {
    return <div className="s" />;
  }
}

const mapStateToProps = () => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};

export default connect(mapStateToProps)(withRouter(AddExperience));
