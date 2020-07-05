import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import { Redirect } from "react-router-dom";

import validationRestaurantRegisterInput from "../../utils/validation/restaurantRegister";
import config from "../../config";
import Spinner from "../../utils/spinner";

class RestaurantRegister extends Component {
  state = {
    restaurant_name: "",
    email_id: "",
    restaurant_location: "",
    password: "",
    user_type: "1",
    phone_number: "",
    is_veg: "False",
    redirect: false,
    errors: {},
    valid: false
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const newUser = {
      restaurant_name: this.state.restaurant_name,
      restaurant_location: this.state.restaurant_location,
      email_id: this.state.email_id,
      password: this.state.password,
      user_type: this.state.user_type,
      phone_number: this.state.phone_number
    };
    const { errors, isValid } = validationRestaurantRegisterInput(newUser);
    if (!isValid) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        valid: true
      });

      axios
        .post(config.sign_up, newUser)
        .then(res => {
          localStorage.setItem("token", res.data.data.auth_token);
          localStorage.setItem("user_type", this.state.user_type);
          this.setState({ redirect: true, loading: false });
          window.location.reload(false);
        })
        .catch(err =>
          this.setState({ errors: { password: err.response.data.error } })
        );
    }
  };
  render() {
    const errors = this.state.errors;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/add_item" />;
    }
    const restaurantRegister = (
      <div>
        <h1 className="display-4 text-center">Restaurant Sign Up</h1>
        <p className="lead text-center">
          Create account and Start Selling Your Delicious Food...
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.restaurant_name
              })}
              placeholder="Restaurant Name"
              name="restaurant_name"
              value={this.state.restaurant_name}
              onChange={this.onChange}
            />

            {errors.restaurant_name && (
              <div className="invalid-feedback">{errors.restaurant_name}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.restaurant_location
              })}
              placeholder="Restaurant location"
              name="restaurant_location"
              value={this.state.restaurant_location}
              onChange={this.onChange}
            />

            {errors.restaurant_location && (
              <div className="invalid-feedback">
                {errors.restaurant_location}
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email_id
              })}
              placeholder="Email Address"
              name="email_id"
              value={this.state.email_id}
              onChange={this.onChange}
            />
            {errors.email_id && (
              <div className="invalid-feedback">{errors.email_id}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.phone_number
              })}
              placeholder="Phone Number"
              name="phone_number"
              value={this.state.phone_number}
              onChange={this.onChange}
            />
            {errors.phone_number && (
              <div className="invalid-feedback">{errors.phone_number}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password
              })}
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    );
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {this.state.loading ? (
                this.state.errors ? (
                  restaurantRegister
                ) : (
                  <Spinner />
                )
              ) : (
                restaurantRegister
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RestaurantRegister;
