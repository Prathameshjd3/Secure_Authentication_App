import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import Register from "./pages/auth/register";
import VerifyEmail from "./pages/auth/verifyEmail";

import Login from "./pages/auth/login";
import OtpOptions from "./pages/auth/otpoptions";
import VerifyOtp from "./pages/auth/verifyOtp";
import OAuthSuccess from "./pages/auth/OAuthSuccess";

import ForgotPassword from "./pages/auth/forgotpassword";
import ResetPassword from "./pages/auth/resetpassword";

import Welcome from "./pages/otherPages/welcomepage";
import ProtectedRoutes from "./services/ProtectRoute";
import PageNotFound from "./pages/otherPages/pagenotfound";
import Home from "./pages/protectedpages/home";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/login" element={<Login />} /> 
        <Route path="/otp-options" element={<OtpOptions />} /> {/* New OTP options page */}
        <Route path="/verify-otp" element={<VerifyOtp />} /> {/* New OTP verification page */}
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 🔐 Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* ✅ 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;