"use client";

import { useTheme } from "@/context/ThemeContext";

export default function NotificationsPage() {
  const { dark } = useTheme();

  const notifications = [
    {
      title: "New Feedback Received",
      message: "John submitted a new customer review.",
      color: "#22c55e",
      icon: "💬",
    },
    {
      title: "Negative Feedback Alert",
      message: "Negative feedback increased today.",
      color: "#ef4444",
      icon: "⚠",
    },
    {
      title: "Analytics Updated",
      message: "Dashboard analytics have been refreshed.",
      color: "#3b82f6",
      icon: "📊",
    },
    {
      title: "Report Generated",
      message: "Monthly report is ready for download.",
      color: "#f59e0b",
      icon: "📄",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: dark
          ? "#0f172a"
          : "linear-gradient(135deg,#eef2ff,#f8fafc,#dbeafe)",
      }}
    >
      <h1
        style={{
          color: "#4f46e5",
          marginBottom: "30px",
        }}
      >
        🔔 Notifications
      </h1>

      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        {notifications.map((item, index) => (
          <div
            key={index}
            style={{
              background: dark ? "#1e293b" : "white",
              borderLeft: `6px solid ${item.color}`,
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            <h3
              style={{
                color: dark ? "white" : "#111827",
              }}
            >
              {item.icon} {item.title}
            </h3>

            <p
              style={{
                color: dark ? "#cbd5e1" : "#4b5563",
              }}
            >
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}