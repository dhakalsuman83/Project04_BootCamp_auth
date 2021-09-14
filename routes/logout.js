const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.clearCookie('mr_csid')
            res.redirect('/login')
        }
    })
})

module.exports = router;