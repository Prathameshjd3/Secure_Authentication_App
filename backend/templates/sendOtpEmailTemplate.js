const sendOtpEmailTemplate = (otp) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;">
    
    <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
      
      <!-- HEADER -->
      <div style="
        background:linear-gradient(135deg,#2575fc,#6a11cb);
        padding:18px;
        text-align:center;
        color:#fff;
      ">
        <h2 style="margin:0; font-size:20px;">
          🔐 Authentication System
        </h2>
        <p style="margin:5px 0 0; font-size:13px; opacity:0.9;">
          Secure Login Verification
        </p>
      </div>

      <!-- BODY -->
      <div style="padding:25px;">
        <h3 style="text-align:center; color:#333;">Your Login OTP</h3>
        
        <p style="color:#555; font-size:14px; text-align:center;">
          Use the OTP below to complete your login.
        </p>

        <!-- OTP BOX -->
        <div style="text-align:center; margin:25px 0;">
          <span style="
            display:inline-block;
            background:#f1f3f5;
            color:#333;
            padding:12px 25px;
            border-radius:10px;
            font-size:24px;
            font-weight:bold;
            letter-spacing:4px;
            border:1px dashed #6a11cb;
          ">
            ${otp}
          </span>
        </div>

        <p style="color:red; font-size:13px; text-align:center;">
          ⏳ This OTP will expire in <b>5 minutes</b>.
        </p>

        <p style="color:#777; font-size:13px; text-align:center;">
          Do not share this OTP with anyone.
        </p>
      </div>

      <!-- FOOTER -->
      <div style="background:#f8f9fa; padding:15px; text-align:center; font-size:12px; color:#aaa;">
        © Authentication and Authorization with React and NodeJS ©
      </div>

    </div>
  </div>
  `;
};

module.exports = { sendOtpEmailTemplate };