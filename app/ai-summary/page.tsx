"use client";

import { useEffect, useState } from "react";

export default function AISummaryPage() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    try {
      setLoading(true);

     const loggedUser = JSON.parse(
  localStorage.getItem("loggedInUser") || "{}"
);

const res = await fetch("/api/ai-summary", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: loggedUser.id,
  }),
});

      const data = await res.json();

if (data.cached) {
  console.log("Loaded from AI cache");
}

setSummary(data.summary);
    } catch (error) {
      console.error(error);

      setSummary(
  "⚠️ AI Summary is currently unavailable. Please try again later."
);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <h1
        style={{
          color: "#4f46e5",
          marginBottom: "30px",
        }}
      >
        🤖 AI Executive Summary
      </h1>

      {loading ? (
        <div
          style={{
            fontSize: "18px",
          }}
        >
          Generating AI insights...
        </div>
      ) : (
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
          }}
        >
          {summary}
        </div>

        
      )}
<button
  onClick={loadSummary}
  style={{
    marginTop: "20px",
    padding: "12px 20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  }}
>
  🔄 Retry
</button>
      
    </main>
    
  );
}