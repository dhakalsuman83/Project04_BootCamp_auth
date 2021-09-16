const express = require('express');
const router = express.Router();
const db = require('../database')
const bcrypt = require('bcryptjs');
const { validateRegister } = require('../helper/validate');
//const form = document.querySelector('.register-form')

//get route for register which will display te gegistration form
router.get('/', (req, res) => {
    res.render('./pages/register')
})

//post route for register which will register the users
router.post('/', (req, res) => {
    const {surname, firstname, email, password, password2 } = req.body
    //1. TODO: Validation (front-end and back-end)
    const errors = validateRegister(req.body)
    if (Object.keys(errors).length) {
        // console.log(errors)
        return res.render('./pages/register', {
            surname,
            firstname,
            email,
            password,
            password2,
            errors
        })
        
    }
    //2. if everything alright, trim the email and check in the database
    const emailTrim = email.toLowerCase().trim();  //removes the extra whitespaces in the email
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', emailTrim)  //one or none either returns the single value or null value
        .then(data => {
            if (data) {
                //if the user already exists, it redirects to the register page with the query message
                res.render('./pages/register', {
                    errMessage: 'Email already exists',
                    surname,
                    firstname,
                    email,
                    password,
                    password2,
                    errors: { email :'Email already exists' }
                })
            } else {
                //3. if everything is fine, store the data in the database

                //hashing the password using the bcryptjs
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);

                //storing the data in the database
                db.none("INSERT INTO users (surname, firstname, email, password) VALUES ($1,$2,$3,$4);",
                    [surname, firstname, emailTrim, hash])   
                    .then(() => {
                        //when registration is successful, it redirects the user to the login page
                        res.redirect('/login?message=Successfully%20created%20user') 
                    })
                    .catch(err => {
                        console.log(err);
                })
            }
        
        })
        .catch(err => {
            console.log(err);
    })

})

module.exports = router;