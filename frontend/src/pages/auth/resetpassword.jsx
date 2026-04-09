import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./auth.css";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const token = params.get("token");
  const id = params.get("id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { token, id, password }
      );

      toast.success(res.data.message);

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card" style={{ width: "500px" }}>
        <h3 className="auth-title">Reset Password</h3>
        <p className="auth-subtitle">Enter your new password below that you want to set for your account.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-auth">Reset Password</button>
        </form>

        <div className="auth-footer">
          Back to <a href="/login">Login</a>
        </div>      
        <div className="text-center mt-4">
          <span
            className="badge rounded-pill bg-dark px-3 py-2"
            style={{ color: "whitesmoke" }}>
            © Authentication and Authorization with React and NodeJS ©
          </span>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;