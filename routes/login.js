const express = require('express');
const db = require('../database');
const bcrypt = require('bcryptjs');
const router = express.Router();
const validateLoginCredentials = require('../helper/validate')

router.get('/', (req, res) => {
    res.render('./pages/login', {
        message: req.query.message
    })
})

//login credentials
router.post('/', (req, res) => {
    
    const { email, password } = req.body;

    
    //console.log(password)
    
    
    //Validation
    const errors = validateLoginCredentials(email,password)

    if (Object.keys(errors).length) {
        return res.render('./pages/login', {
            errors,
            email,
            password
        })
    }
    //trimming email as we have stored the trimmed email in the database
    const emailTrim = email.toLowerCase().trim();
    
    //checking if the user exists in the system
    db.oneOrNone('SELECT * FROM users WHERE email = $1', [emailTrim])
        .then(data => {
           // console.log(data)
            if (!data) {
                res.redirect('/register?message=Email%20is%20not%20registered')
            } else {
                // console.log(data.password)
                // console.log(password)

                //passwordcheck
                bcrypt.compare(password, data.password)
                    .then(result => {
                       // console.log(result)
                        if (!result) {
                            res.redirect('/login?message=Email%20or%20password%20does%20not%20match')
                        } else {
                            req.session.userId = data.user_id
                            res.redirect('/')
                        }
                    })
                    .catch (err => {
                        console.error(err)
                    })
            }
        })
        .catch(err => {
        console.error(err)
    })
    
})



module.exports = router;

// const express = require('express')
// const db = require('../database')
// const router = express.Router()
// const bcrypt = require('bcryptjs')


// router.get("/",(req,res)=> {
//     console.log(req.session)
//     res.render("../views/pages/login")
// })

// router.post("/",(req , res) => {
//     const {email , password} = req.body
//     const Emailvalidate = (email) =>{
//         //validate email
//         const mail_format = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
//         if (email.value.match(mail_format)){
//             return 0
//         }else{
//             return 1
//         }
//     }
//     db.oneOrNone('SELECT * FROM users WHERE email = $1;', email )
//     .then(users => {
//         if(!users){
//             res.redirect ("/login?message=Email%20or%20password%20is%not%valid")
//         }else{
//             bcrypt.compare(password, users.password)
//             .then(result =>{
//                 if (result){
//                     res.redirect("//dashborad ejs")
//                 }else{
//                     res.redirect ("/login?message=Email%20or%20password%20is%not%valid")
//                 }
//             }) 
//         }
//     })
//     .catch(error =>{
//         console.log(error)
//         res.json(error)
//     })
// })

// router.get("/dashboard",(req,res)=> {
//     //res.render("../views/pages/login")
// })







// module.exports = router