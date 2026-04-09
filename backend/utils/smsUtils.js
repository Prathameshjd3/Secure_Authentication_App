const twilio = require("twilio");
require("dotenv").config();

// Load env variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE;

const client = twilio(accountSid, authToken);

// Send SMS
const sendSms = async (to, message) => {
    console.log("Sending SMS to:", to);
    console.log("Message content:", message);
  try {
    const res = await client.messages.create({
      body: message,
      from: fromPhone,
      to: to, // +91XXXXXXXXXX
    });

    console.log("SMS Sent SID:", res.sid);
    return res;
  } catch (error) {
    console.error("SMS Error:", error.message);
    throw error;
  }
};

module.exports = { sendSms };