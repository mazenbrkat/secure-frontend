// frontend/src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GoogleSuccess from "./pages/GoogleSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderFood from "./pages/OrderFood";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<OrderFood />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* For Google SSO redirect with token from URL */}
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
