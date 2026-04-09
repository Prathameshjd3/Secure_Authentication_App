const express = require('express');
const router = express.Router();
const authController = require("../controllers/authControllers");
const verifyToken = require('../middlewares/authMiddlewares');
const passport = require('passport');
require('../oauth/google');

router.get("/check", (req, res) => {
  res.send("Register route is working!");
});

// User Registration and Email Verification
router.post("/register", authController.register);
router.get("/verify-email", authController.verifyEmail);

// Login User and Send OTP for MFA
router.post("/login", authController.login);
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/resend-otp", authController.resendOtp);

// Google OAuth Routes
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleLogin
);

// Forget Password and Reset Password
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Protected Route (for testing)
router.get("/me",verifyToken ,authController.homepage);

// Logout Route (for testing)
// router.post("/logout", (req, res) => {
//   res.clearCookie("token");
//   return res.status(200).json({ status: "success", message: "Logged out successfully" });
// });
router.post("/logout",verifyToken, authController.logout);

module.exports = router;