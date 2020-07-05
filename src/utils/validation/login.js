import validator from "validator";
import isEmpty from "./is_empty.js";

const validationLoginInput = data => {
  let errors = {};
  data.email_id = !isEmpty(data.email_id) ? data.email_id : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email_id)) {
    errors.email_id = "Email is invalid";
  }
  if (validator.isEmpty(data.email_id)) {
    errors.email_id = "Email is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validationLoginInput;
