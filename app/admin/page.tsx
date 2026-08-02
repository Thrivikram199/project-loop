"use client";

import Link from "next/link";

export default function AdminPage() {
  const cards = [
    {
      title: "Manage Feedback",
      icon: "💬",
      color: "#6366f1",
      link: "/feedback",
    },
    {
      title: "Analytics",
      icon: "📈",
      color: "#10b981",
      link: "/analytics",
    },
    {
      title: "Reports",
      icon: "📄",
      color: "#f59e0b",
      link: "/reports",
    },
    {
      title: "Upload CSV",
      icon: "📤",
      color: "#ef4444",
      link: "/upload",
    },
    {
      title: "AI Summary",
      icon: "🤖",
      color: "#8b5cf6",
      link: "/ai-summary",
    },
    {
      title: "Settings",
      icon: "⚙️",
      color: "#06b6d4",
      link: "/settings",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "35px",
        background:
          "linear-gradient(135deg,#eef2ff,#f8fafc,#dbeafe)",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(90deg,#4f46e5,#6366f1)",
          color: "white",
          borderRadius: "20px",
          padding: "35px",
          marginBottom: "35px",
        }}
      >
        <h1>👨‍💼 Admin Dashboard</h1>

        <p>
          Welcome to the Project LOOP administration
          panel.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px",
        }}
      >
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "30px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.08)",
                transition: ".3s",
                cursor: "pointer",
                borderTop: `6px solid ${card.color}`,
              }}
            >
              <div
                style={{
                  fontSize: "45px",
                  marginBottom: "15px",
                }}
              >
                {card.icon}
              </div>

              <h2
                style={{
                  color: "#1e293b",
                }}
              >
                {card.title}
              </h2>

              <p
                style={{
                  color: "#64748b",
                }}
              >
                Open {card.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}