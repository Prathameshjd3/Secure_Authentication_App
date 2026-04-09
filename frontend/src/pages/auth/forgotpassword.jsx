import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
     <div className="auth-container">
      <div className="card auth-card" style={{ width: "500px" }}>
        <h3 className="auth-title">Forgot Password?</h3>
        <p className="auth-subtitle">Enter your email to reset your password</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-auth">Send Reset Link</button>
        </form>

        <div className="auth-footer">
          Back to <a href="/login">Login</a>
        </div>

        <div className="text-center mt-4">
          <span
            className="badge rounded-pill bg-dark px-3 py-2"
            style={{ color: "whitesmoke" }}
          >
            © Authentication and Authorization with React and NodeJS ©
          </span>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;