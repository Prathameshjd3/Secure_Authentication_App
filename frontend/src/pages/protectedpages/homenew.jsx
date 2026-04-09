import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
 const userinfo = sessionStorage.getItem("userdata");
  const parsedUser = userinfo ? JSON.parse(userinfo) : null;
  console.log("User info from sessionStorage:", parsedUser);
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message, { autoClose: 2000 });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await axios.get(
          "http://localhost:5000/api/auth/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

      

        setUser(res.data);
          console.log("User data:", res.data);
          
      } catch (err) {
        console.error(err);
         toast.error(err.response?.data?.message || "Unauthorized! Please login again");  
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success("Logout Successful");
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div className="home-container">
      <ToastContainer />

      {/* Navbar */}
      <div className="navbar">
        <h2>My Dashboard</h2>
        <div className="nav-right">
          <span>{user?.fullname}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* Main Card */}
      <div className="card">
        {userdata_info
        }
        {/* <h1>Welcome, {user?.fullname} 👋</h1> */}

        {/* <div className="grid">
          <div><b>Email:</b> {user?.email}</div>
          <div><b>Phone:</b> {user?.phone}</div>
          <div><b>Status:</b> {user?.is_verified ? "Verified ✅" : "Not Verified ❌"}</div>
          <div><b>Role:</b> {user?.role_id || "User"}</div>
          <div><b>Last Login:</b> {new Date(user?.last_login_datetime).toLocaleString()}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;