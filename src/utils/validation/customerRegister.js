import validator from "validator";
import isEmpty from "./is_empty.js";
import isMobile from "./isMobile";
const validationCustomerRegisterInput = data => {
  let errors = {};
  data.user_name = !isEmpty(data.user_name) ? data.user_name : "";
  data.email_id = !isEmpty(data.email_id) ? data.email_id : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.user_name, { min: 3, max: 20 })) {
    errors.user_name = "name must be between 3 to 20 chararters";
  }
  if (validator.isEmpty(data.user_name)) {
    errors.user_name = "Name is required";
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
export default validationCustomerRegisterInput;
