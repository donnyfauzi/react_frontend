import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/registerLogin.css'
import axios from "axios";

import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Untuk redirect setelah login berhasil

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

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

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        {
          withCredentials: true, // Jika backend menggunakan cookie untuk sesi
        }
      );

      // Simpan token di localStorage
      localStorage.setItem("token", response.data.token);
      
      handleShowNotification('success', response.data.message)

      setTimeout(() => navigate("/dashboard"), 2000); // Redirect ke dashboard setelah 2 detik

    } catch (error) {
      handleShowNotification('warning', error.response?.data?.message)
    }
  }

  return (
    <div className="login-container">
      {/* Menampilkan notifikasi */}
      <ReactNotifications />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
