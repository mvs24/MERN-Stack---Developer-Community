import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../Elements/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDelete = () => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboard;

    if (profile === null || loading) {
      dashboard = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboard = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>{" "}
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }} />
            <button className="btn btn-danger" onClick={this.onDelete}>
              Delete my account
            </button>
          </div>
        );
      } else {
        dashboard = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not created a profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboard}
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
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
