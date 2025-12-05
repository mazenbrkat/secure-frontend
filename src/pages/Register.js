// frontend/src/pages/Register.js
import React, { useState } from "react";
import api from "../api";
import "./Register.css";

// استيراد الصورة
import RegisterImg from "../assets/Dark.png";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      // If server returned a token (auto-login), save it and go to order page
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/order";
        return;
      }
      // Otherwise show message then redirect to order page
      setMsg(res.data?.message || "Registered successfully");
      setTimeout(() => {
        window.location.href = "/order";
      }, 800);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>

        {/* الصورة داخل الصندوق */}
        <img src={RegisterImg} alt="Register" className="register-img" />

        <h2 className="title">Create Account</h2>

        <input
          className="input-field"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="input-field"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          className="input-field"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        <input
          className="input-field"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <button className="btn" type="submit">
          Register
        </button>

        <button
          className="login-btn"
          type="button"
          onClick={() => window.location.href = "/login"}
        >
          Already have an account? Login
        </button>

        <p className="message">{msg}</p>
      </form>
    </div>
  );
}
