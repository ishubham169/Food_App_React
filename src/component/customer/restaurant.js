import React from "react";
import "./restaurant.css";
const Restaurant = props => {
  return (
    <div className="container cardSpace">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title showCursor" onClick={props.click}>
            <b>{props.name}</b>, {props.location}
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Restaurant;
