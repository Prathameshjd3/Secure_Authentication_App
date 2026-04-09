const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();  // 

const app = express();
console.log(process.env.DB_HOST);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if(err){
        console.error('❌ Error connecting to MySQL: ', err.message);
    }
    else{
        console.log("🚀Connected to MySQl Database");
    }
});

app.get('/',(req,res) => {
    res.send ("Express Server is running 🏃‍➡️🏃‍➡️🏃‍➡️")
});


module.exports = db;