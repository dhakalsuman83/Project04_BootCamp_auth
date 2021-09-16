require('dotenv').config()    //requiring the .env file
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const path = require('path')
const loginRouter= require('./routes/login')
const registerRouter = require('./routes/register')
const homeRouter = require('./routes/home')
const { routeToLogin, routeToHome } = require('./middlewares/middleware')
const userDetails = require('./middlewares/userDetails')
const logoutRouter = require('./routes/logout')
//const ejs = require('ejs')


const app = express();



//setting view enginne and layouts
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));

app.use(expressLayouts)
app.set("layout", "./layouts/main")

app.set('view engine', 'ejs')


//body parsers
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

//var for session
const Time = 1000 * 60 * 60 * 1;
//cookie session
app.use(session({
    name : 'mr_csid',
    resave : false,
    saveUninitialized : false,
    secret : process.env.SECRET_SESS_KEY || 'lejncjksencc',
    cookie :{
        maxAge : Time,
        sameSite : true,
    }
}))



//router middleware

//login route
app.use('/login',userDetails, routeToHome, loginRouter)

//register route
app.use('/register', userDetails, routeToHome, registerRouter)

//logout route
app.use('/logout',routeToLogin,logoutRouter)

//home/dashboard route
app.use(homeRouter) 





PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})