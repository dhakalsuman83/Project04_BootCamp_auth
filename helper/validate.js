function validateLoginCredentials(email, password) {
    let errors = {}

    //checking empty email
    if (!email) {
        errors.email="Email cannot be empty."
    }

    //checking empty password
    if (!password) {
        errors.password="Password cannot be empty."
    }
    
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email && !emailRegex.test(email)) {
        errors.email = "Email is Invalid. Please enter valid email"
    }

    if (password && password.length < 6) {
        errors.password = "Length of the password must be at least 6 character"
    }
    
    return errors
}

module.exports = validateLoginCredentials