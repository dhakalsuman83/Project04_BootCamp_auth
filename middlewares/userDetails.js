const db = require('../database')  //requiring the database

const userDetails = async (req, res, next) => {
    if (req.session.userId) {   //checking whether the user is logged in or not.
        try {
            const data = await db.any('SELECT * FROM users WHERE user_id = $1;', req.session.userId)
            res.locals.user = data   //if a user is logged in, it will retreive the data from the database and assign the user details to the res.locals
        } catch (err) {
            next(err)
        }
    }
    next()
}
module.exports = userDetails