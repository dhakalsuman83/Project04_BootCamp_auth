const timeConversion = require('./timeConversion')

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

    // if (password && password.length < 6) {
    //     errors.password = "Length of the password must be at least 6 character"
    // }
    
    return errors
}



//this function validates the register form
function validateRegister(data) {
    const {surname, firstname, email, password, password2 } = data
    const errors = {}
    //errors.msg = "hello there is a error"

    //checking empty fields
    if (!surname) {
        errors.surname="surname cannot be empty"
    }
    if (!firstname) {
        errors.firstname="firstname cannot be empty"
    }
    if (!email) {
        errors.email="email cannot be empty"
    }
    if (!password) {
        errors.password="password cannot be empty"
    }

    if (!password2) {
        errors.password2="This field cannot be empty"
    }
    //validating data
    regexName = /^[a-z ,.'-]+$/;
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (surname && !regexName.test(surname)) {
        errors.surname = "Please enter valid surname"
    }

    if (firstname && !regexName.test(firstname)) {
        errors.firstname = "Please enter valid firstname"
    }

    if (email && !emailRegex.test(email)) {
        errors.email = "Email is Invalid. Please enter valid email"
    }

    if (password && password.length < 6) {
        errors.password = "Length of the password must be at least 6 character"
    }

    if (password2 && password !== password2) {
        errors.password2 = "Password doesn't match"
    }

    return errors
}

//validating the schedules
function validateSchedules(data) {
    var {day,start_at,end_at}= data
    var errors = {}

    if (day ==='0') {
        errors.day = "Please select day from monday to tuesday"
    }
    if (!start_at) {
        errors.start_at = "please enter the start time"
    }
    if (!end_at) {
        errors.end_at = "please enter the end time"
    }

    start_at = timeConversion(start_at)
    end_at = timeConversion(end_at)
    if (end_at && end_at < start_at) {
        errors.timeCheck = "It seems your schedule ends before starting time"
    }

    
    return errors;
}

module.exports = { validateLoginCredentials, validateRegister,validateSchedules }