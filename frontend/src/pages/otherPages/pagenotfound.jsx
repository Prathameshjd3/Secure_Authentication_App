import { useNavigate } from "react-router-dom";
import "./pagenotfound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="card auth-card text-center" style={{ width: "480px" }}>
        <div className="auth-logo mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="404 Logo"
            className="brand-logo"
          />
          <h3 className="brand-name mt-3">Oops! Page Not Found</h3>
        </div>

        <p className="auth-subtitle mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="d-grid gap-3">
          <button
            className="btn btn-auth"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>

          <button
            className="btn btn-outline-primary fw-semibold"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>

        <div className="text-center mt-5">
          <span
            className="badge rounded-pill bg-dark px-3 py-2"
            style={{ color: "whitesmoke" }}
          >
            © Authentication & Authorization with React + Node.js
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
