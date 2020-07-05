import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import { Redirect } from "react-router-dom";
import base64 from "base-64";

import validationAddItemInput from "../../utils/validation/validationAddItem";
import config from "../../config";

export default class AddFoodItems extends Component {
  state = {
    food_name: "",
    is_veg: "veg",
    addItem: false,
    valid: false,
    success: "",
    redirect: false,
    errors: {}
  };
  onSubmit = e => {
    e.preventDefault();

    const food_item = {
      food_name: this.state.food_name,
      food_type: this.state.is_veg,
      email_id: JSON.parse(base64.decode(localStorage.token)).email_id
    };

    const { errors, isValid } = validationAddItemInput(food_item);

    if (!isValid) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        valid: true
      });

      axios
        .post(config.add_item, food_item)
        .then(res => {
          this.setState({ addItem: false, success: true });

          setTimeout(() => {
            this.setState({ success: false, redirect: true });
          }, 1000);
        })
        .catch(err => {
          console.log(JSON.stringify(err.response.data));
        });
    }
  };
  isVegHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    if (localStorage.token) {
      if (JSON.parse(base64.decode(localStorage.token)).user_type !== "1")
        return <Redirect to="/menu" />;
    }
    if (!localStorage.token) return <Redirect to="/menu" />;
    const { errors } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/menu" />;
    }
    let form = (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.food_name
                })}
                placeholder="Food Name"
                name="food_name"
                value={this.state.food_name}
                onChange={e => this.isVegHandler(e)}
              />
              {errors.food_name && (
                <div className="invalid-feedback">{errors.food_name}</div>
              )}
            </div>
            <div className="row">
              <div className="col-4 btn-group">
                <label className="btn btn-success active">
                  <input
                    type="radio"
                    name="is_veg"
                    autoComplete="off"
                    value="veg"
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
                    value="non-veg"
                    onChange={e => this.isVegHandler(e)}
                  />
                  Non-VEG
                </label>
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </div>
          </div>
        </form>
      </div>
    );
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-5 text-center">Restaurant Menu Items</h1>
              <p className="lead text-center">Add Food Item to your Menu...</p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  const addItem = this.state.addItem;
                  this.setState({
                    addItem: !addItem
                  });
                }}
              >
                Add Food Item
              </button>
              <hr />
              {this.state.addItem ? form : null}
              {this.state.success ? (
                <p className="text-success">
                  {this.state.food_name} is added successfully...
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
