import { useEffect, useState } from "react";
import "./auth.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Show one-time message from registration
  useEffect(() => {
    console.log("loginlocation=>",location);
    if (location.state?.status === "success") {
      toast.success(location.state.message, { autoClose: 3000 });
    } else if (location.state?.status === "error") {
      toast.error(location.state.message, { autoClose: 3000 });
    }
    // Clear state so message doesn't repeat
    window.history.replaceState({}, document.title);
  }, [location]);

  // Clear any session or localStorage when hitting login page
  useEffect(() => {
    sessionStorage.clear();
    localStorage.removeItem("token");
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is not valid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    //advanced password validation (optional)
    // if (!formData.password) {
    //   errors.password = "Password is required";
    // } else if (
    //   !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    //     formData.password
    //   )
    // ) {
    //   errors.password =
    //     "Password must be 8+ chars, include letters, numbers & special char";
    // }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors(validateForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          formData,
          { withCredentials: true }
        );
        console.log("login response=>", response);
        if (response?.data?.token) {
          localStorage.setItem("token", response.data.token);
          sessionStorage.setItem("userdata", JSON.stringify(response.data.user));
          toast.success(response.data.message, { autoClose: 2500 });
          navigate("/home", { state: {message:response.data.message, status:response.data.status} });
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } catch (error) {
        console.log(error);
        if (
          error.code === "ERR_NETWORK" ||
          error.message.includes("Network Error")
        ) {
          toast.error(
            "Server is not responding. Check if backend is running."
          );
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Unexpected error occurred.");
        }
      }
    } else {
      toast.warn("Please validate the form");
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      <div className="card auth-card" style={{ width: "500px" }}>
        <h3 className="auth-title">Welcome Back</h3>
        <p className="auth-subtitle">Login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address:</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            {formErrors.password && (
              <span className="error-message">{formErrors.password}</span>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input type="checkbox" className="form-check-input me-1" id="rememberMe" />
              <label htmlFor="rememberMe" className="small text-muted">
                Remember me
              </label>
            </div>
            <a href="/forgot-password" className="small text-primary text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="btn btn-auth">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don’t have an account? <a href="/register">Sign up</a>
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

export default Login;
