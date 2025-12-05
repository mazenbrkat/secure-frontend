// frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import api from "../api";
import "./Dashboard.css"; // ← ملف CSS الجديد

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user)
    return (
      <div className="dashboard-loading">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2 className="title">Welcome!</h2>

        <div className="info-box">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

