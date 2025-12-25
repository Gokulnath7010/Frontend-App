import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";


export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/api/register/", form);
      setSuccess("Account created successfully. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
  <div className="auth-container">
    <form onSubmit={handleSubmit} className="auth-card">
      <h2>Create Account</h2>

      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}

      <input
        className="auth-input"
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />

      <input
        className="auth-input"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        className="auth-input"
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <input
        className="auth-input"
        type="password"
        name="confirm_password"
        placeholder="Confirm Password"
        value={form.confirm_password}
        onChange={handleChange}
        required
      />

      <button type="submit" className="auth-btn register">
        Register
      </button>

      <p className="auth-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  </div>
);
}