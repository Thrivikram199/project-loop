"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function uploadCSV() {
    if (!file) {
      toast.error("Please select a CSV file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }

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
          maxWidth: "700px",
          margin: "40px auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <h1 style={{ color: "#4f46e5" }}>
          📤 Upload Feedback CSV
        </h1>

        <p>
          Import customer feedback directly into the
          database.
        </p>

        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <br />
        <br />

        <button
          onClick={uploadCSV}
          disabled={loading}
          style={{
            background:
              "linear-gradient(90deg,#4f46e5,#6366f1)",
            color: "white",
            border: "none",
            padding: "14px 28px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </div>
    </main>
  );
}