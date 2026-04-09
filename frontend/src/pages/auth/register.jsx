import axios from 'axios';
import { useState } from "react";
import "./auth.css";
import {ToastContainer,toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    profile_image: null,
    name : '',
    username : '',
    email : '',
    phone : '',
    password : ''
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!registerFormData.name.trim()) errors.name = "Name is required";
    if (!registerFormData.username.trim()) errors.username = "Username is required";
    if (!registerFormData.email.trim()) errors.email = "Email is required";
    if (!registerFormData.phone.trim()) errors.phone = "Phone is required";
    if (!registerFormData.password.trim()) errors.password = "Password is required";
    return errors;
  }

  const handleChange = (e) => {
      const {name, value} = e.target;
      setRegisterFormData({...registerFormData, [name] : value});
      const errors = validateForm();
      setFormErrors(errors);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setRegisterFormData({
        ...registerFormData,
        profile_image: file
      });

      setImagePreview(URL.createObjectURL(file));
    }
  };


  
  const handleSubmit = async(e) => {
      e.preventDefault();
      const errors = validateForm();
      setFormErrors(errors);
      
      if(Object.keys(errors).length === 0){
        console.log("RegiterformData=> ",registerFormData);
        try{
        const response = await axios.post("http://localhost:5000/api/auth/register", registerFormData);
        console.log("response=> ",response);
        // return false; 
        if (response.data.status === "success") {
          toast.success(response.data.status);
          // Optional: redirect to login page
          // window.location.href = "/login";
          setTimeout(() => {
              navigate("/login", {
                state: { message: response.data.message, status: response.data.status },
              });
            }, 500);
        } else {
          // This usually won't happen, because server sends 400 status for errors
          toast.error(response.data.message);
        }

        }catch(error){
          // Handle server-side errors here
          if (error.response && error.response.data) {
            // This is the message sent by your backend
            toast.error(error.response.data.message);
            // Optionally set field-specific errors:
            // For example, if email or username exists
            // setFormErrors({ email: error.response.data.message, username: error.response.data.message });
          } else {
            toast.error("Server is not responding. Please check your server is running or restart the server.");
          }
        }finally {
          setIsLoading(true);
        }

      }else{
        console.log("formErrors=> ",errors);
        toast.warn("Please Validate the form");
        
      }
      
  }

  return (
    
    <div className="auth-container">
      {/* Toast container */}
      <ToastContainer theme="colored" position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover />
     

      <div className="card auth-card" style={{width:'500px'}}>
        <h3 className="auth-title">Create Account</h3>
        <p className="auth-subtitle">Sign up to get started!</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <div className="profile-image-wrapper">
              <label htmlFor="profileImageInput" className="profile-image-label">
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="profile-image"
                />
                <span className="edit-icon">+</span>
              </label>

              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </div>
            {formErrors.profile_image && (
              <span className="error-message">{formErrors.profile_image}</span>
            )}     
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input type="text" className="form-control" name = "name" value={registerFormData.name} onChange={handleChange} placeholder="Enter full name"/>
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input type="text" className="form-control"  name = "username" value={registerFormData.username} onChange={handleChange} placeholder="Choose username"/>
            {formErrors.username && <span className="error-message">{formErrors.username}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="text" className="form-control"  name = "email" value={registerFormData.email} onChange={handleChange} placeholder="Enter email"/>
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label> 
            <input type="text" className="form-control"  name = "phone" value={registerFormData.phone} onChange={handleChange} placeholder="Enter phone number"/>
            {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" className="form-control"  name = "password" value={registerFormData.password} onChange={handleChange} placeholder="Enter password"/>
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>

          <button type="submit" className="btn btn-auth" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>

        </form>

        <div className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </div>

        <div className="text-center mt-4">
          <span className="badge rounded-pill bg-dark px-3 py-2" style={{color:"whitesmoke"}}>© Authentication and Authorization with react and nodejs ©</span>
        </div>
      </div>
    </div>
  );
}
