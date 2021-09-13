require('dotenv').config()    //requiring the .env file
const express = require('express');
const db = require('./database');
const session = require('express-session')
const login_route = require('./routes/login_route')
const ejs = require('ejs')


const app = express();

//engines
app.set('view engine', 'ejs');
app.set('views', './views')

//var for session
const Time = 1000 * 60 * 60 * 1;
//cookie session
app.use(session({
    name : 'mr_csid',
    resave : false,
    saveUninitialized : false,
    secret : 'webcliuksebckscn12kjcb',
    cookie :{
        maxAge : Time,
        sameSite : true,
    }
}))

//just for testing the connection of the database
app.get('/', async (req, res) => {
    try {
        newData = await db.query('SELECT * FROM users;')
        res.send(newData)
    } catch (err) {
        console.error(err)
    }
})

//router middleware

//app.use("/", index)
app.use("/login", login_route)
//app.use("/signup", signup_route)



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})