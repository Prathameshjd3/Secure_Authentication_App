const bcrypt = require('bcrypt');
const userModel = require('../models/authModels');
// import {generateAccessToken} from "../utils/tokenUtils";
const {generateAccessToken,storeCookie,generateRandomToken, hashToken} =  require("../utils/tokenUtils");

const { emailRegisterUserVerification } = require("../templates/userRegisterVerfyEmailTemplate");
const { emailResetPassword } = require("../templates/resetPasswordEmailTemplate");
const { sendOtpEmailTemplate } = require("../templates/sendOtpEmailTemplate");
const { sendMail } = require("../utils/emailUtils");
const { sendSms } = require("../utils/smsUtils");
const { formatDateTime } = require("../utils/dateUtils");
const e = require('express');
const { format } = require('mysql2');
const { use } = require('passport');

require('dotenv').config();

// REGISTER CONTROLLER FUNCTION
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

// VERIFY REGISTER USER VIA EMAIL CONTROLLER FUNCTION
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

// LOGIN CONTROLLER FUNCTION
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
        // return false;

        if(users.length > 0 && users[0].is_locked === 1){
            const lockUntil = users[0].lock_until;
            const currentTime = new Date();
            
            if(currentTime < lockUntil){
                const formatedDate = formatDateTime(lockUntil);
                return res.status(403).json({status:"error", message:"User Account is locked till "+formatedDate+" due to too many failed login attempts."});
            }else{
                // Unlock account after lock duration is over
                await userModel.unlockUserAccount(users[0].id); // Unlock account
            }
        }

        if(users.length === 0){
            return res.status(400).json({status:"error", message:"User doesn't exists in database! Please enter valid email"});
        }

        if (users[0].is_verified == 0) {
            return res.status(400).json({ status: "error", message: "User not verified. Please verify your email before login" });   
        }
        
        const user = users[0];
        const checkPasswordMatch = await bcrypt.compare(password,user.password);
        // console.log("ismatch=>",checkPasswordMatch);
        if(!checkPasswordMatch){

            // lock account after 5 wrong password attempts
            const wrongPasswordAttempts = user.failed_login_count + 1;
            if(wrongPasswordAttempts > 5){
                // alert("Account locked due to too many failed login attempts. Please try again after 30 minutes.");
                const lockUser = await userModel.lockUserAccount(user.id);
                // console.log("lockUser=>",lockUser);
                return res.status(403).json({status:"error", message:"Account locked due to too many failed login attempts. Please try again after 30 minutes."});
            }
            const count = await userModel.failedLoginCount(user.id, wrongPasswordAttempts);
            // console.log("failed_login_count=>",count);
            return res.status(400).json({status:"error", message:"Invalid Password! Pelase enter valid password"});
        }

        if(user.mfa_enabled === 'Y'){
            return res.status(200).json({status: "success", message: "Verified User", user_id: user.id, mfa: "Y" });
        }
        else{
            // token generating
            const token = generateAccessToken({id: user.id, email: user.email});
            // console.log("token",token);
            const cookie = storeCookie (res, 'token', token, 300000);  // 5min valid 5*60*1000=300000
            // console.log("cookie", cookie);
            await userModel.userSessions(user.id, token, "normal", user.role);
        
            // return res.status(200).json({status:"success", message:"User Login Successfully",token: token, user: { id: user.id, fullname: user.fullname, email: user.email } });
            return res.status(200).json({status:"success", message:"User Login Successfully",token: token, user:{ ...users[0] }, mfa: "N" });
                
        }
       
    }
    catch(error){
        return res.status(500).json({ status:"success", message: "Something went wrong!! Please try again", error });
    }
}

// SEND OTP CONTROLLER FUNCTION
const sendOtp = async (req, res) => {
  // console.log("sendotp_body=>",req.body);
  const { user_id, type } = req.body; // email or sms
  // console.log("sendotp_info=>",user_id,type);
  // 🔐 Rate limit: max 3 OTP in 5 min
  const count = await userModel.countRecentOtp(user_id);
  //   console.log("otpcount=>",count);

  if (count >= 3) {
    return res.status(429).json({
      status: "error",
      message: "Too many OTP requests. Try later"
    });
  }

  const users = await userModel.getUserById(user_id);
  // console.log("sendotp_infouser=>", users);

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await userModel.saveOtp(user_id, otp, type, expiresAt);

  if (type === "email") {
    await sendMail({
        to: users.email,
        subject: "Your Login OTP",
        html: sendOtpEmailTemplate(otp)
    });
  }
  else if (type === "sms") {
    // Implement SMS sending logic here using your preferred SMS gateway
    await sendSms("+91" + users.phone, `Your OTP for login is: ${otp}`);
  }

  return res.status(200).json({
    status: "success",
    message: "OTP sent Successfully"
  });
};

// VERIFY OTP CONTROLLER FUNCTION
const verifyOtp = async (req, res) => {
  const { user_id, otp } = req.body;
  console.log("verifyotp_info=>",user_id, otp);

  const record = await userModel.findValidOtp(user_id, otp);

  if (!record) {
    return res.status(400).json({ status: "error", message: "Invalid or expired OTP" });
  }

  await userModel.markOtpUsed(record.id);

  const user = await userModel.getUserById(user_id);
  console.log("verifyotp_user=>", user);

  // ✅ NOW generate token
  const token = generateAccessToken({ id: user.id, email: user.email });

  storeCookie(res, "token", token, 300000);

  await userModel.userSessions(user.id, token, "mfa", user.role);
  return res.status(200).json({
    status: "success",
    message: "User Login Successfully",
    token: token,
    user:{ ...user}
  });
//   return res.status(200).json({status:"success", message:"User Login Successfully",token: token, user:{ ...users[0] }, mfa: "N" });
};

// RESEND OTP CONTROLLER FUNCTION
const resendOtp = async (req, res) => {
  return sendOtp(req, res); // reuse logic
};

// GOOGLE OAUTH CONTROLLER FUNCTION
const googleLogin = async (req, res) => {
  try {
    if (!req.user) return res.redirect("http://localhost:5173/login");

    const profile = req.user;

    const email = profile.emails[0].value;
    const fullname = profile.displayName;
    const profile_image = profile.photos[0].value;

    let users = await userModel.checkEmailExistorNot(email);
    let user;

    if (users.length === 0) {
      await userModel.createOAuthUser({
        fullname,
        email,
        profile_image,
        auth_type: "google Oauth"
      });

      const newUser = await userModel.checkEmailExistorNot(email);
      user = newUser[0];
    } else {
      user = users[0];
    }

    const token = generateAccessToken({
      id: user.id,
      email: user.email
    });

    await userModel.userSessions(user.id, token, "google_oauth", user.role);

    return res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  } catch (error) {
    console.error(error);
    return res.redirect("http://localhost:5173/login");
  }
};


// FORGET PASSWORD CONTROLLER FUNCTION
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

// RESET PASSWORD CONTROLLER FUNCTION
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

// HOMEPAGE CONTROLLER FUNCTION
const homepage = async(req, res) => {
    // console.log("usersdetails=>",req.user);
     console.log("After Login TOKEN =>", req.token);

    res.json("Homepage res =>",req.user);  // Modify authMiddlware to send more user data in req.user and token in req.token for this to work
}

const logout = async (req, res) => {
  // console.log("Logout request user=>", req.user);
   console.log("On logout TOKEN =>", req.token); // ✅ works
  // console.log("USER =>", req.user);
  try {
    const userId = req.user.id;

    // Update session in DB
    await userModel.UpdateLastLogoutDateTime(userId);

    await userModel.updateLogoutUserSession(req.token, userId);

    // Clear cookie
    res.clearCookie(req.token);

    return res.status(200).json({
      status: "success",
      message: "Logged out successfully"
    });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed" });
  }
};

module.exports = {
    register,verifyEmail,
    login,sendOtp,verifyOtp,resendOtp,
    googleLogin,
    forgotPassword,resetPassword,
    homepage,
    logout
}