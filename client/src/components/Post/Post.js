import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../Elements/Spinner";
import { getPost } from "../../actions/postActions";
import PostItem from "../Posts/PostItem";
import { Link } from "react-router-dom";
import CommentPost from "./CommentPost";

export class Post extends Component {
  componentDidMount = () => {
    this.props.getPost(this.props.match.params.id);
  };

  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (!post || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem showActions={false} post={post} />
          <CommentPost postId={post._id} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="continer">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back to Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
