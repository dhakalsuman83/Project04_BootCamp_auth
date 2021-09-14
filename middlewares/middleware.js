//returns to the login route if the user is nit logged in
const routeToLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.clearCookie('mr_csid')
        res.redirect('/login')
    }else {
        next()
    }
    
}


//if the user is logged in and triews to go to the register and login page, it will redirect to the home page
const routeToHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/')
    }else {
        next()
    }
}

module.exports = { routeToLogin, routeToHome};