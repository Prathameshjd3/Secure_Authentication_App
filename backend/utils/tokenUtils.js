// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function generateAccessToken(user){
    // console.log(user.id);
    return jwt.sign(
        {id : user.id, email : user.email},
        process.env.SESSION_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );
}

function generateRefreshToken(user){
    // console.log(user.id);
    return jwt.sign(
        {id : user.id, email : user.email},
        process.env.SESSION_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );
}

function storeCookie(res, tokenName, tokenValue, maxAge){
    // console.log(res,tokenName,tokenValue,maxAge);
    res.cookie(tokenName,tokenValue, {
        httpOnly : true,
        secure: false,   // set secure to true in production with https
        sameSite: "lax",
        maxAge: maxAge
    });
}

function generateRandomToken(){
    return crypto.randomBytes(32).toString('hex');
}   

function hashToken(token){
    return crypto.createHash('sha256').update(token).digest('hex');
}



module.exports= {
    generateAccessToken,generateRefreshToken,storeCookie,generateRandomToken,hashToken
}
