import React from "react";

export default function FoodDetails(props) {
  return (
    <div className="container cardSpace">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">
            Name : {props.name.username}, Email : {props.name.email}, Mobile No.
            : {props.name.phone_number}
          </h3>
          <hr />
          {props.details.map((food, i) => {
            return (
              <h4 className="row" key={i}>
                <p className="col-1"></p>
                <p className="col-7">{food.food_name}</p>
                <div className="col-4">
                  {food.food_type === "veg" ? (
                    <p className="text-success text-center">
                      {food.food_type}{" "}
                    </p>
                  ) : (
                    <p className="text-danger text-center">{food.food_type} </p>
                  )}
                </div>
              </h4>
            );
          })}
        </div>
      </div>
    </div>
  );
}
