import { useNavigate } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="card auth-card text-center" style={{ width: "480px" }}>
        <div className="auth-logo mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/942/942751.png"
            alt="App Logo"
            className="brand-logo"
          />
          <h4 className="brand-name mt-3">Simple Authentication & Authorization</h4>
          {/* <h6 className="brand-name mt-3 text-secondary">React(Vite) & Node.js(Express.js)</h6> */}
        </div>

        <p className="auth-subtitle mb-4">
          Get started by logging into your account or creating a new one.
        </p>

        <div className="d-grid gap-3">
          <button
            className="btn btn-auth"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn btn-outline-primary fw-semibold"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>

        <div className="text-center mt-5">
          <span className="badge rounded-pill bg-dark px-3 py-2" style={{ color: "whitesmoke" }}>
            © Authentication & Authorization with React + Node.js
          </span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
