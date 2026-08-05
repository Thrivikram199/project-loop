"use client";

import { useState } from "react";
import { useTheme } from "next-themes";



export default function SettingsPage() {

const { theme, setTheme } = useTheme();

const dark = theme === "dark";

function toggleTheme() {
  setTheme(dark ? "light" : "dark");
}
  const [emailNotification, setEmailNotification] = useState(true);
  const [aiSuggestion, setAiSuggestion] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [notifications, setNotifications] = useState(true);


  function saveSettings() {
  localStorage.setItem(
    "projectSettings",
    JSON.stringify({
      dark,
      notifications
    })
  );

  alert("Settings saved successfully!");
}
  
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "35px",
        background: dark
  ? "#0f172a"
  : "linear-gradient(135deg,#eef2ff,#f8fafc,#dbeafe)",
      }}
    >
      {/* Header */}

      <div
        style={{
          background:
            "linear-gradient(90deg,#4f46e5,#6366f1)",
          color: dark
  ? "white"
  : "#111827",
          padding: "35px",
          borderRadius: "20px",
          marginBottom: "35px",
          boxShadow: "0 15px 35px rgba(79,70,229,.25)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "40px",
          }}
        >
          ⚙ Settings
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Customize your Project LOOP experience.
        </p>
      </div>

      {/* Appearance */}

      <div
        style={{
          background: dark
  ? "#1e293b"
  : "white",
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h2 style={{ color: "#4f46e5" }}>
          🎨 Appearance
        </h2>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <span>Enable Dark Mode</span>

          <input
            type="checkbox"
            checked={dark}
onChange={toggleTheme}
            
          />
        </label>
      </div>

      {/* Notifications */}

      <div
        style={{
          background: dark
  ? "#1e293b"
  : "white",
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h2 style={{ color: "#4f46e5" }}>
          🔔 Notifications
        </h2>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <span>Email Notifications</span>

          <input
            type="checkbox"
            checked={emailNotification}
            onChange={() =>
              setEmailNotification(
                !emailNotification
              )
            }
          />
        </label>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <span>Weekly Reports</span>

          <input
            type="checkbox"
            checked={weeklyReport}
            onChange={() =>
              setWeeklyReport(!weeklyReport)
            }
          />
        </label>
      </div>

      {/* AI */}

      <div
        style={{
          background: dark
  ? "#1e293b"
  : "white",
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h2 style={{ color: "#4f46e5" }}>
          🤖 AI Preferences
        </h2>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <span>Enable AI Suggestions</span>

          <input
            type="checkbox"
            checked={aiSuggestion}
            onChange={() =>
              setAiSuggestion(!aiSuggestion)
            }
          />
        </label>
      </div>

      {/* System */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background: "#6366f1",
            color: dark
  ? "white"
  : "#111827",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <h3>Version</h3>

          <h1>1.0</h1>
        </div>

        <div
          style={{
            background: "#10b981",
            color: dark
  ? "white"
  : "#111827",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <h3>Status</h3>

          <h1>Online</h1>
        </div>

        <div
          style={{
            background: "#f59e0b",
            color: dark
  ? "white"
  : "#111827",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <h3>Database</h3>

          <h1>Neon</h1>
        </div>
      </div>

      {/* Save */}

      <div
        style={{
          textAlign: "center",
        }}
      >
        <button
  onClick={saveSettings}
          style={{
            background:
              "linear-gradient(90deg,#4f46e5,#6366f1)",
            color: dark
  ? "white"
  : "#111827",
            border: "none",
            padding: "16px 40px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            boxShadow:
              "0 10px 25px rgba(79,70,229,.25)",
          }}
        >
          💾 Save Settings
        </button>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          color: "#6b7280",
        }}
      >
        <hr />

        <p>
          © 2026 Project LOOP • AI Customer
          Feedback Intelligence Platform
        </p>
      </div>
    </main>
  );
}