import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
import base64 from "base-64";
import OrderedFood from "./OrderedFood";

export default class PlaceOrder extends Component {
  state = {
    show: false
  };
  render() {
    if (localStorage.token) {
      if (JSON.parse(base64.decode(localStorage.token)).user_type !== "0")
        return <Redirect to="/menu" />;
    }
    if (!localStorage.token) return <Redirect to="/add_item" />;

    if (!localStorage.order) {
      return <Redirect to="/menu" />;
    }
    const order = JSON.parse(localStorage.order);
    const showOrder = order.map(food => {
      return <OrderedFood name={food.food_name} type={food.food_type} />;
    });
    return (
      <div>
        <h3>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </h3>
        <h1 className="text-center display-3 mb-4">
          Thank you for ordering from {JSON.parse(localStorage.restaurant)}...
        </h1>
        {this.state.show ? showOrder : null}
      </div>
    );
  }
}
