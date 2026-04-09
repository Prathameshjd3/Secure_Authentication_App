import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const ProtectRoute = () => {
  const [redirect, setRedirect] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized! Please login First.", { autoClose: 2000 });
      setTimeout(() => {
        setRedirect(true);
      }, 200); // small delay to show toast
    }
  }, [token]);

  if (!token) {
    return redirect ? <Navigate to="/login" replace /> : null;
  }

  return <Outlet />;
};

export default ProtectRoute;
