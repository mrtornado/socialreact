import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};

const Menu = ({ history }) => (
  <>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/users")}
          to="/users"
        >
          Users
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, `/post/create`)}
          to={`/post/create`}
        >
          Create Post
        </Link>
      </li>

      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              SignUp
            </Link>
          </li>
        </>
      )}

      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, `/findpeople`)}
              to={`/findpeople`}
            >
              Find People
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              to={`/user/${isAuthenticated().user._id}`}
            >
              {`${isAuthenticated().user.name}'s profile`}
            </Link>
          </li>

          {isAuthenticated() && isAuthenticated().user.role === "admin" && (
            <li className="nav-item">
              <Link
                to={`/admin`}
                style={isActive(history, `/admin`)}
                className="nav-link"
              >
                Admin
              </Link>
            </li>
          )}

          <li className="nav-item">
            <span
              className="nav-link"
              style={
                (isActive(history, "/signup"),
                { cursor: "pointer", color: "#fff" })
              }
              onClick={() => signout(() => history.push("/"))}
            >
              Sign Out
            </span>
          </li>
        </>
      )}
    </ul>
  </>
);

export default withRouter(Menu);
