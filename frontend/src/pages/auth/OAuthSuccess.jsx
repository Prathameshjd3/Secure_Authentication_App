import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      toast.success("User Login Successfully via Google", { autoClose: 3000 });
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return <h3>Logging you in...</h3>;
};

export default OAuthSuccess;