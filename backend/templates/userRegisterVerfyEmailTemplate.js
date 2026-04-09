const emailRegisterUserVerification = (url) => {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
    
    <table width="100%" style="padding:20px;">
      <tr>
        <td align="center">

          <table width="600" style="background:#ffffff; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(90deg,#4f46e5,#7c3aed); padding:20px; text-align:center; color:#fff;">
                <h1 style="margin:0;">Verify Your Email</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <h2>Welcome 👋</h2>
                <p style="font-size:16px;">
                  Please verify your email to complete your registration process.
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <a href="${url}" 
                     style="background:#4f46e5; color:#fff; padding:14px 24px; text-decoration:none; border-radius:6px;">
                    Verify Email
                  </a>
                </div>

                <p style="font-size:14px; color:#555;">
                  If the button doesn't work, copy this link:
                </p>

                <p style="word-break:break-all; color:#4f46e5;">
                  ${url}
                </p>

                <p style="font-size:12px; color:red; margin-top:20px;">
                  ⏳ This link will expire in 5 minutes.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="text-align:center; padding:15px; font-size:12px; color:#999;">
                © Authentication and Authorization with React and NodeJS ©
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

module.exports = {
  emailRegisterUserVerification,
};