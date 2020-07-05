import React from "react";

export default function OrderedFood(props) {
  return (
    <div className="container">
      <div className="row">
        <h2 className="col-4">{props.name}</h2>

        <h2 className="col-4">
          {props.type === "veg" ? (
            <p className="text-success text-center">{props.type} </p>
          ) : (
            <p className="text-danger text-center">{props.type} </p>
          )}
        </h2>
        <div className="col-3"></div>
        <h2 className="col-1">1</h2>
      </div>
      <hr />
    </div>
  );
}
