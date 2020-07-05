import React, { Component } from "react";

import { Link } from "react-router-dom";
export default class NavbarLogin extends Component {
  render() {
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Foodshala
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/menu">
                  {" "}
                  Menu
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/add_item">
                  {" "}
                  Add Item
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Orders">
                  {" "}
                  Orders
                </Link>
              </li>
            </ul>
            {guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
