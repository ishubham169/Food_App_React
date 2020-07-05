import React, { Component } from "react";
import { Link } from "react-router-dom";
import base64 from "base-64";
class Landing extends Component {
  render() {
    let bytes;
    if (localStorage.token)
      bytes = JSON.parse(base64.decode(localStorage.token));
    const guest = (
      <div>
        <h1 className="display-3 mb-4">FoodShala</h1>
        <p className="lead"> Order The food Which Love To Eat</p>
        <Link to="/register" className="btn btn-lg btn-info mr-2">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-lg btn-light">
          Login
        </Link>
      </div>
    );
    const customer = (
      <div>
        <hr />
        {localStorage.token ? (
          <h1 className="display-3 mb-4">Hi, {bytes.user_name}</h1>
        ) : null}
        <p className="lead"> Order The food Which Love To Eat</p>
      </div>
    );
    const restaurant = (
      <div>
        <hr />
        {localStorage.token ? (
          <h1 className="display-3 mb-4">Hi, {bytes.restaurant_name}</h1>
        ) : null}
        <p className="lead"> Add Your Delicious food Which Everyone Loves</p>
      </div>
    );
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                {bytes
                  ? bytes.user_type === "0"
                    ? customer
                    : restaurant
                  : guest}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
