import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./auth.css";

const OtpOptions = () => {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("user_id");

  const sendOtp = async (type) => {
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", {
        user_id,
        type,
      });

      toast.success("OTP Sent Successfully");
      navigate("/verify-otp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card text-center p-4" style={{ width: "450px" }}>
        
        <h3 className="auth-title">Multi-Factor Authentication</h3>
        <p className="auth-subtitle mb-4">
          Choose how you want to receive your OTP
        </p>

        {/* Email Option */}
        <div
          className="otp-option mb-3"
          onClick={() => sendOtp("email")}
          style={{
            border: "1px solid #dee2e6",
            borderRadius: "10px",
            padding: "15px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#f8f9fa")}
          onMouseOut={(e) => (e.currentTarget.style.background = "white")}
        >
          <h5 className="mb-1">📧 Email OTP</h5>
          <small className="text-muted">
            Receive OTP on your registered email
          </small>
        </div>

        {/* SMS Option */}
        <div
          className="otp-option"
          onClick={() => sendOtp("sms")}
          style={{
            border: "1px solid #dee2e6",
            borderRadius: "10px",
            padding: "15px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#f8f9fa")}
          onMouseOut={(e) => (e.currentTarget.style.background = "white")}
        >
          <h5 className="mb-1">📱 SMS OTP</h5>
          <small className="text-muted">
            Receive OTP on your registered mobile number
          </small>
        </div>

        {/* Back to Login */}
        <div className="mt-4">
          <a href="/login" className="text-decoration-none small">
            ← Back to Login
          </a>
        </div>

      </div>
    </div>
  );
};

export default OtpOptions;