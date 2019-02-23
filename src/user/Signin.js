import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReffer: false
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  authenticate(jwt, next) {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
  }

  clickSumbit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email: email,
      password: password
    };

    // console.log(user);
    this.signin(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        // auth
        this.authenticate(data, () => {
          this.setState({ redirectToReffer: true });
        });
        // redirect
      }
    });
  };

  signin = (user) => {
    return fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
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
    const { email, password, error, redirectToReffer } = this.state;

    if (redirectToReffer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign in</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {this.signinForm(email, password)}
      </div>
    );
  }
}

export default Signin;
