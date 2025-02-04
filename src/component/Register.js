import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/registerLogin.css";
import axios from "axios";

import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css" // Import style-nya

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate(); // Untuk redirect setelah berhasil

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowNotification = (type, message) => {
    Store.addNotification({
      title: type === "success" ? "Success!" : "Error!",
      message: message,
      type: type, // 'success', 'danger', 'info', 'warning'
      insert: "top-center",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      duration: 3000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      handleShowNotification("danger", "Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );

      handleShowNotification("success", response.data.message);

      setTimeout(() => { navigate("/login") }, 3000) // Redirect setelah 3 detik
      
    } catch (error) {
      handleShowNotification("danger", error.response?.data?.message || "Something went wrong!")
    }
  };

  return (
    <div className="register-container">
      {/* Menampilkan notifikasi */}
      <ReactNotifications />
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
