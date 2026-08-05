"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Feedback = {
  id: string;
  customer: string;
  message: string;
  sentiment: string;
  theme: string;
  createdAt: string;
};

export default function FeedbackDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { theme, setTheme } = useTheme();

const dark = theme === "dark";

function toggleTheme() {
  setTheme(dark ? "light" : "dark");
}

  const [feedback, setFeedback] =
    useState<Feedback | null>(null);

  useEffect(() => {
    loadFeedback();
  }, []);

  async function loadFeedback() {
    const { id } = await params;

    const res = await fetch(`/api/feedback/${id}`);

    if (!res.ok) return;

    const data = await res.json();

    setFeedback(data);
  }

  if (!feedback) {
    return (
      <main
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Loading...
      </main>
    );
  }

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
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: dark ? "#1e293b" : "white",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            color: "#4f46e5",
            marginBottom: "25px",
          }}
        >
          💬 Feedback Details
        </h1>

        <hr />

        <h2
          style={{
            color: dark ? "white" : "#111827",
          }}
        >
          👤 {feedback.customer}
        </h2>

        <p
          style={{
            marginTop: "20px",
            color: dark ? "#e2e8f0" : "#374151",
            lineHeight: "30px",
          }}
        >
          {feedback.message}
        </p>

        <br />

        <span
          style={{
            background:
              feedback.sentiment === "POSITIVE"
                ? "#22c55e"
                : feedback.sentiment === "NEGATIVE"
                ? "#ef4444"
                : "#f59e0b",
            color: "white",
            padding: "10px 18px",
            borderRadius: "999px",
            fontWeight: "bold",
            marginRight: "12px",
          }}
        >
          {feedback.sentiment}
        </span>

        <span
          style={{
            background: "#6366f1",
            color: "white",
            padding: "10px 18px",
            borderRadius: "999px",
            fontWeight: "bold",
          }}
        >
          📌 {feedback.theme}
        </span>

        <hr
          style={{
            margin: "30px 0",
          }}
        />

        <h2
          style={{
            color: "#4f46e5",
          }}
        >
          🤖 AI Recommendation
        </h2>

        {feedback.sentiment === "POSITIVE" && (
          <p>
            Customers are satisfied. Continue maintaining your current service quality.
          </p>
        )}

        {feedback.sentiment === "NEGATIVE" && (
          <p>
            This feedback indicates a customer issue. Investigate the root cause and improve the experience.
          </p>
        )}

        {feedback.sentiment === "NEUTRAL" && (
          <p>
            Encourage the customer to provide more detailed feedback to better understand their experience.
          </p>
        )}

        <br />

        <p
          style={{
            color: "#64748b",
          }}
        >
          Created :
          {" "}
          {new Date(feedback.createdAt).toLocaleString()}
        </p>
      </div>
    </main>
  );
}