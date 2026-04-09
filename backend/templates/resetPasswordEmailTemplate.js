const emailResetPassword = (resetLink) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;">
    
    <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:10px; padding:25px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
      
      <h2 style="text-align:center; color:#333;">🔐 Reset Your Password</h2>
      
      <p style="color:#555; font-size:14px;">
        We received a request to reset your password. Click the button below to set a new password.
      </p>

      <div style="text-align:center; margin:25px 0;">
        <a href="${resetLink}" 
           style="background:linear-gradient(135deg,#2575fc,#6a11cb); color:#fff; padding:12px 25px; text-decoration:none; border-radius:30px; font-weight:bold;">
          Reset Password
        </a>
      </div>

      <p style="color:red; font-size:13px;">
        ⏳ This link will expire in <b>5 minutes</b>.
      </p>

      <p style="color:#777; font-size:13px;">
        If you did not request this, please ignore this email. Your password will remain unchanged.
      </p>

      <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

      <p style="text-align:center; font-size:12px; color:#aaa;">
        © Authentication and Authorization with React and NodeJS ©
      </p>

    </div>
  </div>
  `;
};


module.exports = {
  emailResetPassword,
}