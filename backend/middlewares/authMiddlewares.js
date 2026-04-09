const jwt = require('jsonwebtoken');
require('dotenv').config();
const {storeCookie} =  require("../utils/tokenUtils");


// This middleware verifies the JWT token from the Authorization header and renews the cookie on each valid request. If the token is valid, it refreshes the cookie's expiration to maintain session continuity. It ensures secure access while keeping the session alive until the token itself expires.

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    // console.log("**********************************",req);

    const token = authHeader && authHeader.split(' ')[1];
    //  console.log(token);
    if (!token) {
      return res.status(401).json({ status:"error", message: 'Access Denied. No Token Provided!' });
    }
    // const cookie = req.headers['cookie'];
    // if (!cookie) {
    //   storeCookie (res, 'token', token, 60000);
    //   // return res.status(401).json({ success: false, message: 'Access Denied. Cookie expired!' });
    // }

    jwt.verify(token, process.env.SESSION_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).json({ status:"error", message: 'Invalid or Expired Token!', error });
      }
      req.user = decoded; // store user data
      req.token = token; // store token for potential logout use
      // renewing the cookie until the token expired 
      storeCookie (res, 'token', token, 60000);
      next();
    });
  } catch (error) {
    // console.error('JWT verification error:', error);
    res.status(500).json({ status:"error", message: 'Server Error during token verification!',error });
  }
};

module.exports = verifyToken;
