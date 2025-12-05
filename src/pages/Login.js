// frontend/src/pages/Login.js
import React, { useState } from "react";
import api from "../api";
import "./Login.css"; // ← ملف التنسيق الجديد

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [googleEnabled, setGoogleEnabled] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setMsg("Logged in!");
      window.location.href = "/dashboard";
      window.location.href = "/order";
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  const handleGoogle = () => {
    // open in new tab to avoid SPA interference and keep the app usable
    window.open("http://localhost:5000/api/auth/google", "_blank");
  };

  // check backend config for Google SSO availability
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/auth/config");
        if (mounted) setGoogleEnabled(!!res.data.google);
      } catch (err) {
        // silently ignore and keep button hidden
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="title">Welcome Back</h2>

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

        <button className="btn" type="submit">Login</button>

        <button
          className="google-btn"
          type="button"
          onClick={handleGoogle}
          disabled={!googleEnabled}
          title={googleEnabled ? "" : "Google SSO not configured on the server"}
        >
          Login with Google
        </button>

        <button
          className="register-btn"
          type="button"
          onClick={() => window.location.href = "/register"}
        >
          Create Account
        </button>

        <p className="message">{msg}</p>
      </form>
    </div>
  );
}

