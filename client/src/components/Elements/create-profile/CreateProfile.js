import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "../TextField";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    errros: {}
  };

  render() {
    return(
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Create Your Profile</h1>
                        <small className="d-block pb-3">* = required fields</small>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};

export default connect(mapStateToProps)(CreateProfile);
