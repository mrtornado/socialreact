import React, { Component } from "react";
import { Link } from "react-router-dom";
import { list } from "./apiPost";
import DefaultPosts from "../images/loading.jpg";
import { truncate } from "lodash";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1
    };
  }

  loadPosts = (page) => {
    list(page).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  loadMore = (number) => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };

  loadLess = (number) => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };

  componentDidMount() {
    this.loadPosts(this.state.page);
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
                <Link to={`/post/${post._id}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${
                      post._id
                    }`}
                    alt={post.title}
                    onError={(i) => (i.target.src = `${DefaultPosts}`)}
                    className="img-thumbnail mb-3"
                    style={{ height: "200px", width: "100%" }}
                  />
                </Link>
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
    const { posts, page } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          {posts.lenght ? "Loading..." : "Recent posts"}
        </h2>
        {this.renderPosts(posts)}

        {page > 1 ? (
          <div className="d-inline-block">
            <button
              className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
              onClick={() => this.loadLess(1)}
            >
              Previous ({this.state.page - 1})
            </button>
            <span className="mr-5">{page}</span>
          </div>
        ) : (
          ""
        )}

        {posts.length < 6 ? (
          ""
        ) : (
          <button
            className="btn btn-raised btn-success mt-5 mb-5"
            onClick={() => this.loadMore(1)}
          >
            Next Page ({page + 1})
          </button>
        )}
      </div>
    );
  }
}

export default Posts;
