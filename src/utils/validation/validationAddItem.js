import validator from "validator";
import isEmpty from "./is_empty.js";

const validationAddItemInput = data => {
  let errors = {};
  data.food_name = !isEmpty(data.food_name) ? data.food_name : "";
  if (validator.isEmpty(data.food_name)) {
    errors.food_name = "Food Name is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validationAddItemInput;
