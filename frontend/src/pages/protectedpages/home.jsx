import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userinfo = sessionStorage.getItem("userdata");
  const user = userinfo ? JSON.parse(userinfo) : null;
  console.log("User info from sessionStorage:", user);
  useEffect(() => {
    console.log("User info from sessionStorage:", userinfo);
  }, [userinfo]);

  // Show one-time toast from login
  useEffect(() => {
    console.log("location=>", location);
    if (location.state?.message) {
      toast.success(location.state.message, { autoClose: 2500 });
      window.history.replaceState({}, document.title); // clear state
    }
  }, [location]);


  useEffect(() => {
  const handleLogoutOnClose = () => {
    const token = localStorage.getItem("token");

    if (token) {
      // Optionally, you can make an API call to invalidate the token on the server here
      axios.post("http://localhost:5000/api/auth/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
    }

    localStorage.removeItem("token");
    sessionStorage.clear();
  };

  window.addEventListener("beforeunload", handleLogoutOnClose);

  return () => {
    window.removeEventListener("beforeunload", handleLogoutOnClose);
  };
}, []);

  // Check token & fetch user data
  useEffect(() => {
    const checkHomePage = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login", { state: {message:response.data.message, status:response.data.status} });
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/auth/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("User data:", response.data);
      } catch (error) {
        console.log(error);
        if (error.response?.data?.error?.message === "jwt expired") {
        //   toast.error("Session expired, please login again");
          localStorage.removeItem("token");
          sessionStorage.clear();
          navigate("/login", { state: {message:error.response?.data?.message, status:error.response?.data?.status} });
        } else {
          toast.error("Unauthorized! Please login first");
          navigate("/login", { state: {message:error.response?.data?.message, status:error.response?.data?.status} });
        }
      }
    };

    checkHomePage();
  }, [navigate]);

  const handleLogout = async() => {
   const token = localStorage.getItem("token");
    console.log("Token on logout=>", token);
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Logout response=>",response);
    localStorage.clear();
    sessionStorage.clear();
    toast.success("Logout Successful");
    setTimeout(() => navigate("/login"), 1500);
  }

  return (
    <div style={styles.container}>
    <ToastContainer />

    {/* Navbar */}
    <div style={styles.navbar}>
      <h2>Dashboard</h2>
      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>

    {/* Card */}
    <div style={styles.card}>
      <h1 style={{ marginBottom: "10px" }}>
        Welcome {user?.fullname || "User"} 👋
      </h1>

      <p style={{ color: "#555" }}>
        You are successfully logged in.
      </p>

      <div style={styles.userBox}>
        <h3>User Info</h3>
        <pre style={styles.pre}>{userinfo}</pre>
      </div>
    </div>
  </div>
  );
};
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "20px",
    fontFamily: "Segoe UI",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "15px 25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  logoutBtn: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  card: {
    marginTop: "30px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    maxWidth: "600px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  userBox: {
    marginTop: "20px",
    background: "#f5f7fb",
    padding: "15px",
    borderRadius: "8px",
  },
  pre: {
    fontSize: "13px",
    overflowX: "auto",
  },
};
export default Home;
