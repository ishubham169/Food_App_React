import validator from "validator";
import isEmpty from "./is_empty.js";
import isMobile from "./isMobile";
const validationRestaurantRegisterInput = data => {
  let errors = {};
  data.restaurant_name = !isEmpty(data.restaurant_name)
    ? data.restaurant_name
    : "";
  data.restaurant_location = !isEmpty(data.restaurant_location)
    ? data.restaurant_location
    : "";
  data.email_id = !isEmpty(data.email_id) ? data.email_id : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.restaurant_name, { min: 5, max: 30 })) {
    errors.restaurant_name =
      "Restaurant name must be between 5 to 20 chararters";
  }
  if (validator.isEmpty(data.restaurant_name)) {
    errors.restaurant_name = "Name is required";
  }
  if (!validator.isLength(data.restaurant_location, { min: 5, max: 30 })) {
    errors.restaurant_location =
      "Restaurant Location must be between 5 to 30 chararters";
  }
  if (validator.isEmpty(data.restaurant_location)) {
    errors.restaurant_location = "Restaurant Location is required";
  }
  if (!validator.isEmail(data.email_id)) {
    errors.email_id = "Email is invalid";
  }
  if (validator.isEmpty(data.email_id)) {
    errors.email_id = "Email is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (isMobile(data.phone_number)) {
    errors.phone_number =
      "Phone Number must be of length 10 or first number must be b/w 6 to 9";
  }

  if (validator.isEmpty(data.phone_number)) {
    errors.phone_number = "Phone Number is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validationRestaurantRegisterInput;
