import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const token = params.get("token");
      const id = params.get("id");

      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify-email?token=${token}&id=${id}`
        );

        toast.success(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        toast.error(err.response?.data?.message || "Verification failed");
      }
    };

    verify();
  }, []);

  return (
    <div className="auth-container">
      <div className="card auth-card text-center">
        <h3>Verifying Email...</h3>
      </div>
    </div>
  );
};

