require('dotenv').config()    //requiring the .env file
const express = require('express');
const db = require('./database')
const app = express();

//just for testing the connection of the database
app.get('/', async (req, res) => {
    try {
        newData = await db.query('SELECT * FROM users;')
        res.send(newData)
    } catch (err) {
        console.error(err)
    }
})


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})