import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        localStorage.setItem("token", token);
        // optional: show a brief message before redirecting
        navigate("/dashboard", { replace: true });
      } else {
        // no token, go to login
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error("GoogleSuccess error:", err);
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Signing you in…</h2>
      <p>If you are not redirected automatically, please wait or return to the login page.</p>
    </div>
  );
}
