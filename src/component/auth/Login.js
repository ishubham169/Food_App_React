import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import { Redirect } from "react-router-dom";
import base64 from "base-64";

import validationLoginInput from "../../utils/validation/login";
import config from "../../config";
import Spinner from "../../utils/spinner";
class Login extends Component {
  state = {
    email: "",
    password: "",
    user_type: "0",
    redirect: false,
    user: {},
    loading: false,
    errors: {},
    valid: false
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  user_typeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    if (localStorage.token) {
      const bytes = JSON.parse(base64.decode(localStorage.token));
      this.setState({ user: bytes });
    }
  }
  componentDidUpdate() {
    if (localStorage.token) {
      const bytes = JSON.parse(base64.decode(localStorage.token));
      this.setState({ user: bytes });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const user = {
      email_id: this.state.email,
      password: this.state.password,
      user_type: this.state.user_type
    };
    const { errors, isValid } = validationLoginInput(user);
    if (!isValid) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        valid: true
      });
      axios
        .post(config.login, user)
        .then(res => {
          localStorage.setItem("token", res.data.data.auth_token);
          localStorage.setItem("user_type", this.state.user_type);
          const bytes = JSON.parse(base64.decode(localStorage.token));
          this.setState({ user: bytes, loading: false });
          window.location.reload(false);
        })
        .catch(err => {
          this.setState({
            errors: { password: err.response.data.error },
            loading: false
          });
        });
    }
  };
  render() {
    const { errors } = this.state;
    const { user_type } = this.state.user;

    if (user_type === "1") {
      return <Redirect to="/add_item" />;
    } else if (user_type === "0") {
      return <Redirect to="/menu" />;
      // }
    }
    let login = (
      <div>
        <h1 className="display-4 text-center">Log In</h1>
        <p className="lead text-center">Sign in to your account</p>
        <form onSubmit={this.onSubmit}>
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
          <div className="row">
            <div className="btn-group">
              <label className="col-8 active">
                <input
                  type="radio"
                  name="user_type"
                  autoComplete="off"
                  value="0"
                  onChange={e => this.user_typeHandler(e)}
                  defaultChecked
                />
                Customer
              </label>

              <label className="col-12">
                <input
                  type="radio"
                  name="user_type"
                  autoComplete="off"
                  value="1"
                  onChange={e => this.user_typeHandler(e)}
                />
                Restaurant
              </label>
            </div>
          </div>

          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    );

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {this.state.loading ? (
                this.state.errors ? (
                  login
                ) : (
                  <Spinner />
                )
              ) : (
                login
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
