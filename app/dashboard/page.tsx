"use client";

import { useState, useEffect } from "react";
import Charts from "../components/Charts/Charts";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const res = await fetch("/api/dashboard");
    const data = await res.json();
    setStats(data);
  }

  return (
    <>

  
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>Dashboard</h1>

          <br />

          <h2>Welcome to Project LOOP</h2>

          <br />

          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <br />
<br />

<h2>Theme Analytics</h2>

<ul>
  <li>📦 Delivery</li>
  <li>🛒 Product</li>
  <li>💬 Support</li>
  <li>🌐 Website</li>
  <li>💰 Pricing</li>
  <li>📋 General</li>
</ul>

<h2>AI Insight</h2>

<div
  style={{
    border: "1px solid #3b82f6",
    padding: "20px",
    borderRadius: "10px",
    background: "#eff6ff",
  }}
>
  {stats.positive > stats.negative ? (
    <p>
      ✅ Customers are generally satisfied. Continue maintaining product quality
      and service.
    </p>
  ) : (
    <p>
      ⚠️ Negative feedback is increasing. Review delivery, support, and product
      quality.
    </p>
  )}
</div>
            <Charts
  positive={stats.positive}
  negative={stats.negative}
  neutral={stats.neutral}
/>
            <div
              style={{
                background: "#4f46e5",
                color: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              Total Feedback
              <h2>{stats.total}</h2>
            </div>

            <div
              style={{
                background: "green",
                color: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              Positive
              <h2>{stats.positive}</h2>
            </div>

            <div
              style={{
                background: "red",
                color: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              Negative
              <h2>{stats.negative}</h2>
            </div>

            <div
              style={{
                background: "orange",
                color: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              Neutral
              <h2>{stats.neutral}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
}