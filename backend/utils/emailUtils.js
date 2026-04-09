const nodemailer = require("nodemailer");

const sendMail = async ({ to, subject, html }) => {
  try {
    // console.log("EMAIL_USER:", process.env.EMAIL_USER);
    // console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // App password
      },
    });

    const mailOptions = {
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent");
    return info;
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw error;
  }
};

module.exports = { sendMail };