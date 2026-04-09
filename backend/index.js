const db = require('./config/db');
const express = require('express'); //*
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const passport = require('passport');

const app = express(); //*
app.use(express.json());
app.use(cookieParser());
// Enables Domain acces to bind frontend and backend
app.use(cors({
    origin : ["http://localhost:5173", "http://localhost:5174"],
    credentials : true
}));

// Defining Routes
app.use("/api/auth", authRoutes);


// Session configuration for Google OAuth
app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,   
}));
app.use(passport.initialize());
app.use(passport.session());


// this will be print on browser
app.get('/',(req,res) => {
    res.send ("Express Server is running 🏃‍➡️🏃‍➡️🏃‍➡️");
}); //*l

// this will be print on terminal
const Port = process.env.DB_PORT || 5000;
app.listen(Port, () => {
    console.log(`🚀 Server is running on http://localhost:${Port}`);
}); //*