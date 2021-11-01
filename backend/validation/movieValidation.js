import validator from 'validator';
import isEmpty from './isEmpty.js'
import exists from './exists.js';

const movieValidation = async(data,update) => {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    
    data.year = data.year ? data.year : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if(validator.isEmpty(data.title)) {
        errors.title = 'Title is required';
    }
   
    if(await exists(data.title)){

        errors.title = 'Title already Exists'
    }

    if(!update && validator.isEmpty(data.description)) {
        errors.description = 'description is Required';
        
    }
  
    return {
        errors,
        isValid: isEmpty(errors),
        
    }
}
export default movieValidation;