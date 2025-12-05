import React, { useState, useEffect } from "react";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    } else {
      // If no order found, redirect back to order page
      window.location.href = "/order";
    }
  }, []);

  const handleBackToOrder = () => {
    localStorage.removeItem("lastOrder");
    window.location.href = "/order";
  };

  const handleBackToDashboard = () => {
    localStorage.removeItem("lastOrder");
    window.location.href = "/dashboard";
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <div className="success-icon">✓</div>
        
        <h1>Order Confirmed!</h1>
        <p className="confirmation-text">Thank you for your order</p>

        <div className="order-details">
          <div className="detail-row">
            <span className="label">Order ID:</span>
            <span className="value">{order.orderId}</span>
          </div>
        </div>

        <div className="items-section">
          <h3>Order Items</h3>
          <div className="items-list">
            {order.items.map((item, index) => (
              <div key={index} className="item-row">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price} EGP</span>
              </div>
            ))}
          </div>
        </div>

        <div className="total-section">
          <span className="total-label">Total Amount:</span>
          <span className="total-amount">{order.total} EGP</span>
        </div>

        <div className="action-buttons">
          <button className="btn-primary" onClick={handleBackToOrder}>
            Order More
          </button>
          <button className="btn-secondary" onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
