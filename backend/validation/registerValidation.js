import validator from "validator";
import isEmpty from "./isEmpty.js";

const validateRegisterInput = (data) =>{
    let errors={};
    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm: '';

    if(!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    
    if(validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    
    if(!validator.isLength(data.password, {min: 8, max: 30})) {
        errors.password = 'Password must have 8 chars';
    }
    
    if(validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    
    if(!validator.isLength(data.password_confirm, {min: 8, max: 30})) {
        errors.password_confirm = 'Password must have 8 chars';
    }
    
    if(!validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }
    
    if(validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}

export default validateRegisterInput;