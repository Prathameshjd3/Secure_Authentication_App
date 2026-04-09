const bcrypt = require('bcrypt');
const userModel = require('../models/authModels');
// import {generateAccessToken} from "../utils/tokenUtils";
const {generateAccessToken,storeCookie,generateRandomToken, hashToken} =  require("../utils/tokenUtils");
const { sendMail } = require("../utils/emailUtils");
const { emailRegisterUserVerification } = require("../templates/userRegisterVerfyEmailTemplate");
const { emailResetPassword } = require("../templates/resetPasswordEmailTemplate");


require('dotenv').config();

const register = async(req, res) => {
    const userData = req.body;
    // console.log(userData);

    // Checking if any fields are blank or not
    if (!userData.name || !userData.username || !userData.email || !userData.phone || !userData.password) {
      return res.status(400).json({ status:"success", message: "All fields are required" });
    }

    try{
        // Checking for dupliacte email or username
        const duplicateCheck = await userModel.checkDuplicateEmailorUsername(userData.email,userData.username);
        console.log("duplicateCheck=>",duplicateCheck.length);
        // return false;
        if(duplicateCheck.length > 0){
            return res.status(400).json({ status:"error", message: "User already exists! Duplicate Email or Username" });
        } 

        // Hashing Password
        const hashedPassword = await bcrypt.hash(userData.password,10);

        const registerUser = await userModel.registerUser(userData.name, userData.username, userData.email, userData.phone, hashedPassword);
        // console.log(registerUser);

        // Generate OTP and store in database
        const userId = registerUser.insertId;
        const token = generateRandomToken();
        const tokenHash = hashToken(token);
        const expiry = new Date(Date.now() + 5 * 60 * 1000);  // 5 minutes expiry token validity

        await userModel.storeEmailVerificationToken(userId, tokenHash, expiry);
        const url = "http://localhost:5000/api/auth/verify-email?token="+token+"&id="+userId;
        // const url = "http://localhost:3000/verify-email?token="+token+"&email="+userData.email;

        // 📧 Send Mail 
        await sendMail({
        to: userData.email,
        subject: "Verify Your Email",
        html: emailRegisterUserVerification(url)
        });

        if(registerUser.affectedRows > 0){
             return res.status(201).json({ status:"success", message: "User Registered Successfully. Please verify user via your email and then login." });
        }
        else{
            return res.status(400).json({ status:"error", message: "User Registration Failed!!"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ status:"error", message: "Something Went Wrong! OR Internal server error!", err });
    }
    
}

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).json({ status: "error", message: "Invalid token" });
  }

  try {
    console.log("tokenverifyemail=>",token);
    const tokenHash = hashToken(token);
    console.log("tokenHash=>",tokenHash);

    const records = await userModel.findValidVerificationToken(tokenHash);
    console.log("records=>",records);

    if (records.length === 0) {
      return res.status(400).json({ status: "error", message: "Token expired or invalid" });
    }

    const record = records[0];

    await userModel.verifyUser(record.user_id);
    await userModel.markTokenUsed(record.user_id);

    return res.status(200).json({
      status: "success",
      message: "Email verified successfully",
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const login = async(req, res) => {
    // console.log("loginData=> ",req.body);
    const{email,password} = req.body;
    // console.log("email, password =>",email,password);

    if(!email || !password){
        return res.status(400).json({status:"error", message:"Please enter your credentials before login in..."});
    }

    try{
        const users = await userModel.checkEmailExistorNot(email);
        // console.log("USERS INFO=>",users);

        if(users.length === 0){
            return res.status(400).json({status:"error", message:"User doesn't exists in database! Please enter valid email"});
        }

        if (users[0].is_verified == 0) {
            return res.status(400).json({ status: "error", message: "User not verified. Please verify your email before login" });   
        }
        // const hashedPassword = await bcrypt.hash(password,10);
        // console.log("User enter password =>",hashedPassword);
        // console.log("DB password =>", user[0].password);
        const user = users[0];
        const checkPasswordMatch = await bcrypt.compare(password,user.password);
        // console.log("ismatch=>",checkPasswordMatch);
        if(!checkPasswordMatch){
            return res.status(400).json({status:"error", message:"Invalid Password! Pelase enter valid password"});
        }

        // token generating
        const token = generateAccessToken({id: user.id, email: user.email});
        console.log("token",token);
        const cookie = storeCookie (res, 'token', token, 60000);  // 5min valid 5*60*1000=300000
        console.log("cookie", cookie);
        // return res.status(200).json({status:"success", message:"User Login Successfully",token: token, user: { id: user.id, fullname: user.fullname, email: user.email } });
        return res.status(200).json({status:"success", message:"User Login Successfully",token: token, user:{ ...users[0] } });
        
    }
    catch(error){
        return res.status(500).json({ status:"success", message: "Something went wrong!! Please try again", error });
    }

}


const forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("forgotpassword_email=>",email);
    if(!email) {
        return res.status(400).json({ status:"error", message: "User Email is required!" });
    }

    try{
        const users = await userModel.checkEmailExistorNot(email);
        console.log("USERS INFO=>",users);   
        if(users.length === 0){
            return res.status(400).json({ status:"error", message: "User doesn't exists in database! Please enter valid email" });
        }

        const user = users[0];
        // Generate Reset Password Token
        const token = generateRandomToken();
        const tokenHash = hashToken(token);
        const expiry = new Date(Date.now() + 5 * 60 * 1000);  // 5 minutes expiry token validity

        await userModel.savePasswordResetToken(user.id, tokenHash, expiry);
        const url = "http://localhost:5173/reset-password?token="+token+"&id="+user.id; // Frontend reset password page link    
        // const url = "http://localhost:5000/api/auth/reset-password?token="+token+"&id="+user.id; // Backend reset password API 
        
        // 📧 Send Mail
        await sendMail({
            to: user.email,
            subject: "Reset Your Password",
            html: emailResetPassword(url)  // You can create a separate email template for password reset if needed
        });

        return res.status(200).json({ status:"success", message: "Password reset link has been sent to your email. Please check your inbox." });
    }
    catch(error){
        return res.status(500).json({ status:"error", message: "Something went wrong!! Please try again", error });
    }

}

const resetPassword = async (req, res) => {
    const { id, token, password } = req.body;
    console.log("resetpassword_token=>",token);
    console.log("resetpassword_id=>",id);
    console.log("resetpassword_password =>",password);
    if (!token || !password) {
        return res.status(400).json({ status: "error", message: "Invalid request" });
    }

    try{
        const tokenHash = hashToken(token);
        console.log("resetpassword_tokenHash=>",tokenHash);
        const records = await userModel.findValidPasswordResetToken(id, tokenHash);
        console.log("resetpassword_records=>",records);

        if (records.length === 0) {
            return res.status(400).json({ status: "error", message: "Token expired or invalid" });
        }
        const record = records[0];

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("resetpassword_info=>",id, record.user_id, hashedPassword);
        await userModel.updateUserPassword(id, hashedPassword);
        await userModel.markPasswordResetTokenUsed(record.id);
        return res.status(200).json({ status: "success", message: "Password reset successfully. You can now login with your new password." });  
    }
    catch(error){
        return res.status(500).json({ status: "error", message: "Something went wrong!! Please try again", error });
    }
}

const homepage = async(req, res) => {
    console.log("usersdetails=>",req.user);
    res.json(req.user);
}

module.exports = {
    register,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword,
    homepage
}