
import React, { useState } from "react";
import "./OrderFood.css";
import api from "../api";
import pizzaImg from "../assets/pizza.jpg";
import burgerImg from "../assets/burger.jpg";
import pastaImg from "../assets/pasta.jpg";
import saladImg from "../assets/salad.jpg";

export default function OrderFood() {
  const [cart, setCart] = useState([]);
  const [msg, setMsg] = useState("");

  const foods = [
    { id: 1, name: "Margherita Pizza", price: 120, img: pizzaImg },
    { id: 2, name: "Cheese Burger", price: 85, img: burgerImg },
    { id: 3, name: "Chicken Pasta", price: 95, img: pastaImg },
    { id: 4, name: "Fresh Salad", price: 60, img: saladImg },
  ];

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMsg("Cart is empty!");
      return;
    }

    try {
      const response = await api.post("/orders", { items: cart, total });
      setMsg("Order placed successfully!");
      // Store order data and redirect to confirmation page
      localStorage.setItem("lastOrder", JSON.stringify({
        orderId: response.data._id,
        items: cart,
        total: total
      }));
      setTimeout(() => {
        window.location.href = "/order-confirmation";
      }, 500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Checkout failed");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="order-container">
      <div className="foods-list">
        {foods.map((food) => (
          <div key={food.id} className="food-card">
            <img src={food.img} className="food-img" alt={food.name} />
            <h3>{food.name}</h3>
            <p className="price">{food.price} EGP</p>
            <button onClick={() => addToCart(food)} className="btn-add">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart-box">
        <h2>Your Order</h2>
        {cart.length === 0 && <p>No items yet.</p>}

        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <span>{item.name}</span>
            <span>{item.price} EGP</span>
          </div>
        ))}

        <hr />
        <h3>Total: {total} EGP</h3>

        <button className="btn-checkout" onClick={handleCheckout}>
          Checkout
        </button>

        {msg && <p className="msg">{msg}</p>}
      </div>
    </div>
  );
}
