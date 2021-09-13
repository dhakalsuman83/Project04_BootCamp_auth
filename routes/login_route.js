const express = require('express')
const db = require('../database')
const router = express.Router()
const bcrypt = require('bcryptjs')


router.get("/",(req,res)=> {
    console.log(req.session)
    res.render("../views/pages/login")
})

router.post("/",(req , res) => {
    const {email , password} = req.body
    const Emailvalidate = (email) =>{
        //validate email
        const mail_format = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        if (email.value.match(mail_format)){
            return 0
        }else{
            return 1
        }
    }
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', email )
    .then(users => {
        if(!users){
            res.redirect ("/login?message=Email%20or%20password%20is%not%valid")
        }else{
            bcrypt.compare(password, users.password)
            .then(result =>{
                if (result){
                    res.redirect("//dashborad ejs")
                }else{
                    res.redirect ("/login?message=Email%20or%20password%20is%not%valid")
                }
            }) 
        }
    })
    .catch(error =>{
        console.log(error)
        res.json(error)
    })
})

router.get("/dashboard",(req,res)=> {
    //res.render("../views/pages/login")
})







module.exports = router