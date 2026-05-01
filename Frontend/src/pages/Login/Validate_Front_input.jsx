

export default function ValidateInputFrontLogin(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    let errors = {};

    if(!data.email){
        errors.email = "Fill your email please";
    }
    else{
        if (!emailRegex.test(data.email)) {
            errors.email = "Invalid email format";
        }
    }

    if(!data.password){
        errors.password = "Fill your password please";
    }
   
  
    return Object.keys(errors).length === 0 ? null : errors;
}