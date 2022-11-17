require('dotenv').config()
const mysql = require("mysql2")

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port:3306,
    debug: false
});


module.exports =  pool
    

