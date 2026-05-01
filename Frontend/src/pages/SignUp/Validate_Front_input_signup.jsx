

export default function ValidateInputFrontSignUp(data) {
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
    else{
        if (data.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }
        else if (!/[A-Z]/.test(data.password)) {
            errors.password = "Password must contain at least one uppercase letter";
        }
        else if (!/[a-z]/.test(data.password)) {
            errors.password = "Password must contain at least one lowercase letter";
        }
        else if (!/[0-9]/.test(data.password)) {
            errors.password = "Password must contain at least one number";
        }
    }
   
  
    return Object.keys(errors).length === 0 ? null : errors;
}