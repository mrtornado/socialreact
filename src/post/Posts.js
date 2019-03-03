import React, { Component } from "react";
import { Link } from "react-router-dom";
import { list } from "./apiPost";
import DefaultPosts from "../images/loading.jpg";
import { truncate } from "lodash";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  }

  renderPosts = (posts) => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id} ` : "";
          const posterName = post.postedBy ? post.postedBy.name : "Unknown";

          return (
            <div className="card col-md-4 mb-3" key={i}>
              <div className="card-body">
                <img
                  src={`${process.env.REACT_APP_API_URL}/post/photo/${
                    post._id
                  }`}
                  alt={post.title}
                  onError={(i) => (i.target.src = `${DefaultPosts}`)}
                  className="img-thumbnail mb-3"
                  style={{ height: "200px", width: "100%" }}
                />
                <Link to={`/post/${post._id}`}>
                  <h5 className="card-title">
                    {truncate(post.title, { length: 25, separator: /,?\.* +/ })}
                  </h5>
                </Link>
                <p className="card-text">
                  {truncate(post.body, { length: 80, separator: /,?\.* +/ })}
                </p>
                <br />
                <p className="font-italic mark">
                  Posted by <Link to={`${posterId}`}>{posterName} </Link>
                  on {new Date(post.created).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-sm btn-primary"
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          {posts.lenght ? "Loading..." : "Recent posts"}
        </h2>
        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
