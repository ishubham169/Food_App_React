import React from "react";

function Food(props) {
  return (
    <div className="row">
      <h2 className="col-4">{props.name}</h2>
      <h2 className="col-3 ">
        {props.type === "veg" ? (
          <p className="text-success text-center">{props.type} </p>
        ) : (
          <p className="text-danger text-center">{props.type} </p>
        )}
      </h2>

      <div className="col-1"></div>
      <button type="click" onClick={props.removeItem} className="btn col-1">
        remove
      </button>
      <hr />

      <button
        type="click"
        onClick={props.addItem}
        className="btn btn-info col-1"
      >
        add
      </button>

      <hr />
    </div>
  );
}
export default Food;
