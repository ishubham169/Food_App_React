import React, { Component } from "react";
import CustomerRegister from "./customerRegister";
import RestaurantRegister from "./restaurantRegister";
import { Redirect } from "react-router-dom";

class user_type extends Component {
  state = {
    showCustomerRegister: false,
    showRestaurantRegister: false
  };
  render() {
    if (localStorage.token) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h4 className="display-4 mb-4">Select User</h4>

              <hr />
              <div className="row">
                <div className="col-7 ">
                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        this.setState({
                          showCustomerRegister: true,
                          showRestaurantRegister: false
                        });
                      }}
                      className="btn btn-light"
                    >
                      customer
                    </button>
                  </div>
                </div>
                <div className="col-1">
                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        this.setState({
                          showCustomerRegister: false,
                          showRestaurantRegister: true
                        });
                      }}
                      className="btn btn-light"
                    >
                      Restaurant
                    </button>
                  </div>
                </div>
              </div>
              {this.state.showCustomerRegister ? <CustomerRegister /> : null}
              {this.state.showRestaurantRegister ? (
                <RestaurantRegister />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default user_type;
