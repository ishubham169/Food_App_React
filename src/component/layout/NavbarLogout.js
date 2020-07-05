import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavbarLogout extends Component {
  onLogoutClick = e => {
    localStorage.removeItem("token");
    localStorage.removeItem("order");
    localStorage.removeItem("user_type");
  };

  render() {
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a href="/login" onClick={this.onLogoutClick} className="nav-link">
            Logout
          </a>
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
            {authLinks}
          </div>
        </div>
      </nav>
    );
  }
}
export default NavbarLogout;
