import React, { Component } from "react";
import PostItem from "./PostItem";

export default class PostFeed extends Component {
  componentDidMount() {
    // console.log(this.props.posts);
  }
  render() {
    const { posts } = this.props;
    return posts.map(post => <PostItem key={post._id} post={post} />);
  }
}
