import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [time, setTime] = useState(300);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("user_id");

  // ⏱️ Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ⏱️ Format Time
  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // 🔢 Handle OTP Input
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // ⌫ Backspace Support
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // 🔐 Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      return toast.warn("Enter complete OTP");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { user_id, otp: finalOtp },
        { withCredentials: true }
      );

      localStorage.setItem("token", res.data.token);
      sessionStorage.setItem("userdata", JSON.stringify(res.data.user));

      toast.success(res.data.message);
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Resend OTP
  const resendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/resend-otp", {
        user_id,
        type: "email",
      });

      setTime(300);
      setOtp(["", "", "", "", "", ""]);

      toast.success("OTP resent successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card text-center p-4" style={{ width: "450px" }}>
        
        <h3 className="auth-title">Verify OTP</h3>
        <p className="auth-subtitle mb-3">
          Enter the 6-digit code sent to your email/mobile
        </p>

        {/* OTP Inputs */}
        <div className="d-flex justify-content-center gap-2 mb-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="form-control text-center"
              style={{
                width: "45px",
                height: "50px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="mb-3">
          <span className="badge bg-dark px-3 py-2">
            ⏱ {formatTime()}
          </span>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="btn btn-auth w-100"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <div className="mt-3">
          {time === 0 ? (
            <button onClick={resendOtp} className="btn btn-link">
              Resend OTP
            </button>
          ) : (
            <small className="text-muted">
              You can resend OTP after timer ends
            </small>
          )}
        </div>

        {/* Back */}
        <div className="mt-3">
          <a href="/login" className="small text-decoration-none">
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;