const png = require('pg-promise')();

const connection = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE_NAME
};
const db = png(connection);
console.log('database connected.....')

module.exports = db;