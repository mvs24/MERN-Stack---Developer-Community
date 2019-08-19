import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileGithub extends Component {
  state = {
    clientId: "a7838f7d3fdbab51c537",
    clientSecret: "7848070792b695c95e89baf0d9a874d49f81efe9",
    count: 5,
    sort: "created: asc",
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    const repoItems =
      repos.length > 0
        ? repos.map(repo => {
            return (
              <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <h4>
                      <a
                        href={repo.svn_url}
                        className="text-info"
                        target="_blank"
                      >
                        {repo.name}
                      </a>
                    </h4>
                    <p>{repo.description}</p>
                  </div>
                </div>
              </div>
            );
          })
        : null;
    if (repoItems) {
      return (
        <div>
          <hr />
          <h3 className="mb-4">Latest Github Repos</h3>
          {repoItems}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ProfileGithub;
