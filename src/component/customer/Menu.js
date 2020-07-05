import React, { Component } from "react";
import axios from "axios";
import config from "../../config";
import base64 from "base-64";
import { Redirect } from "react-router-dom";

import Spinner from "../../utils/spinner";
import Restaurant from "./restaurant";
import Food from "./food_item";
let food_items = [];

export default class Menu extends Component {
  state = {
    Menu: [],
    food: [],
    loading: true,
    showFoodItem: false,
    restaurant_name: "",
    restaurant_id: "",
    food_id: "",
    checked: false,
    redirect: false,
    order: false,
    addItem: false
  };
  componentDidMount() {
    axios
      .get(config.menu)
      .then(res => {
        this.setState({ Menu: res.data.data.restaurants, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }
  showFoodItems = (e, id) => {
    const showFoodItem = this.state.showFoodItem;
    const restaurantIndex = this.state.Menu.findIndex(p => {
      return p.restaurant_id === id;
    });
    const restaurant = {
      ...this.state.Menu[restaurantIndex]
    };
    food_items = restaurant.food_items;

    this.setState({
      showFoodItem: !showFoodItem,
      restaurant_id: restaurant.restaurant_id,
      restaurant_name: restaurant.restaurant_name
    });
  };
  showList = () => {
    this.setState({
      showFoodItem: false,
      food: []
    });
  };
  addItem = (e, id) => {
    const object = { food_id: id };
    const foodIndex = this.state.food.findIndex(p => {
      return p.food_id === id;
    });

    if (foodIndex !== -1);
    else {
      this.state.food.push(object);
    }
  };
  removeItem = (e, id) => {
    const foodIndex = this.state.food.findIndex(p => {
      return p.food_id === id;
    });
    if (foodIndex !== -1) {
      this.state.food.splice(foodIndex, 1);
    }
  };
  bookOrder = () => {
    localStorage.setItem("order", JSON.stringify(this.state.food));
    localStorage.setItem(
      "restaurant",
      JSON.stringify(this.state.restaurant_name)
    );
    if (!localStorage.token) {
      this.setState({
        redirect: true
      });
    } else {
      if (JSON.parse(localStorage.order).length) {
        const email = JSON.parse(base64.decode(localStorage.token)).email_id;
        const order = {
          restaurant_id: this.state.restaurant_id,
          email: email,
          food_items: this.state.food
        };
        axios
          .post(config.order, order)
          .then(res => {
            this.setState({
              order: true,
              addItem: false
            });
          })
          .catch(err => console.log(err));
      } else {
        this.setState({
          addItem: true
        });
      }
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.order) {
      return <Redirect to="/order" />;
    }

    const showMenu = this.state.Menu.map((restaurants, i) => {
      return (
        <Restaurant
          key={i}
          name={restaurants.restaurant_name}
          location={restaurants.restaurant_location}
          click={e => this.showFoodItems(e, restaurants.restaurant_id)}
        />
      );
    });
    const showFood = food_items.map((food, i) => {
      return (
        <Food
          key={i}
          name={food.food_name}
          type={food.food_type}
          addItem={e => this.addItem(e, food.food_id)}
          removeItem={e => this.removeItem(e, food.food_id)}
        />
      );
    });

    return (
      <div>
        <h1 className="text-center">Menu</h1>

        {this.state.loading ? (
          <Spinner />
        ) : this.state.showFoodItem ? (
          <div>
            {this.state.addItem ? (
              <p className="text-center text-danger">Add Item to Order!!!</p>
            ) : null}
            <button
              onClick={this.showList}
              type="click"
              className="btn btn-default"
            >
              Back
            </button>
            <h1>{this.state.restaurant_name}</h1>
            <hr />
            {showFood}
            {!localStorage.token ? (
              <div className="text-center">
                <button
                  onClick={this.bookOrder}
                  type="click"
                  className="col-2 btn btn-primary"
                >
                  Order
                </button>
              </div>
            ) : localStorage.user_type === "1" ? null : (
              <div className="text-center">
                <button
                  onClick={this.bookOrder}
                  type="click"
                  className="col-2 btn btn-primary"
                >
                  Order
                </button>
              </div>
            )}
          </div>
        ) : (
          showMenu
        )}
        <br />
      </div>
    );
  }
}
