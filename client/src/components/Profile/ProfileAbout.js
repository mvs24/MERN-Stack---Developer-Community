import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";

export class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const skills =
      profile.skills.length > 0
        ? profile.skills.map((skill, index) => (
            <div key={index} className="p-3">
              <i className="fa fa-check" />
              {skill}
            </div>
          ))
        : null;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">
              {profile.user.name.trim().split(" ")[0]}'s Bio
            </h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>
                  {profile.user.name.trim().split(" ")[0]} doesn't have a Bio
                </span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ProfileAbout);
