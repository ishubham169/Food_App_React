import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import { Redirect } from "react-router-dom";

import validationCustomerRegisterInput from "../../utils/validation/customerRegister";
import config from "../../config";
import Spinner from "../../utils/spinner";

class CustomerRegister extends Component {
  state = {
    user_name: "",
    email: "",
    password: "",
    user_type: "0",
    phone_number: "",
    is_veg: "True",
    redirect: false,
    valid: false,
    loading: false,
    errors: {}
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  isVegHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const newUser = {
      user_name: this.state.user_name,
      email_id: this.state.email,
      password: this.state.password,
      user_type: this.state.user_type,
      phone_number: this.state.phone_number,
      is_veg: this.state.is_veg
    };

    const { errors, isValid } = validationCustomerRegisterInput(newUser);

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
          window.location.reload(false);
          this.setState({ redirect: true, loading: false });
        })
        .catch(err =>
          this.setState({ errors: { email_id: err.response.data.error } })
        );
    }
  };
  render() {
    const errors = this.state.errors;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/menu" />;
    }
    const customerRegister = (
      <div>
        <h1 className="display-4 text-center">Customer Sign Up</h1>
        <p className="lead text-center">Create account and Start Ordering...</p>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.user_name
              })}
              placeholder="Customer Name"
              name="user_name"
              value={this.state.user_name}
              onChange={this.onChange}
            />

            {errors.user_name && (
              <div className="invalid-feedback">{errors.user_name}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email_id
              })}
              placeholder="Email Address"
              name="email"
              value={this.state.email}
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
          <div className="row">
            <div className="col-4 btn-group">
              <label className="btn btn-success active">
                <input
                  type="radio"
                  name="is_veg"
                  autoComplete="off"
                  value="True"
                  onChange={e => this.isVegHandler(e)}
                  defaultChecked
                />
                VEG
              </label>

              <label className="btn btn-danger">
                <input
                  type="radio"
                  name="is_veg"
                  autoComplete="off"
                  value="False"
                  onChange={e => this.isVegHandler(e)}
                />
                Non-VEG
              </label>
            </div>
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
                  customerRegister
                ) : (
                  <Spinner />
                )
              ) : (
                customerRegister
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CustomerRegister;
