import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import SocialLogin from "./SocialLogin";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReffer: false,
      loading: false
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSumbit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email: email,
      password: password
    };

    // console.log(user);
    signin(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        // auth
        authenticate(data, () => {
          this.setState({ redirectToReffer: true });
        });
        // redirect
      }
    });
  };

  signinForm = (email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
          <button
            onClick={this.clickSumbit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );

  render() {
    const { email, password, error, redirectToReffer, loading } = this.state;

    if (redirectToReffer) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign in</h2>
        <hr />
        <SocialLogin />
        <hr />
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        {this.signinForm(email, password)}
        <p>
          <Link to="/forgot-password" className="text-danger">
            {" "}
            Forgot Password?
          </Link>
        </p>
      </div>
    );
  }
}

export default Signin;
