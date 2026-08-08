"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

 async function uploadCSV(selectedFile?: File) {
  const uploadFile = selectedFile || file;

  if (!uploadFile) {
    fileInputRef.current?.click();
    return;
  }

  try {
    setLoading(true);

    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
      toast.error("User not logged in.");
      return;
    }

    const loggedUser: {
      id?: string;
      company?: string;
    } = JSON.parse(storedUser);

    if (!loggedUser.id) {
      toast.error("User ID not found. Please login again.");
      return;
    }

    const formData = new FormData();

    formData.append("file", uploadFile);
    formData.append("userId", loggedUser.id);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("Upload status:", res.status);
    console.log("Upload response:", data);

    if (!res.ok) {
      toast.error(data.message || "Upload failed.");
      return;
    }

    toast.success(data.message);

    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    toast.error("Upload failed.");
  } finally {
    setLoading(false);
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
        <div
  style={{
    marginBottom: "30px",
  }}
>
  <h1
    style={{
      fontSize: "34px",
      fontWeight: "700",
      color: "#4f46e5",
      marginBottom: "10px",
    }}
  >
    📤 Upload Customer Feedback
  </h1>

  <p>
   Import customer feedback directly into the database.
   </p>
</div>

         <input
  ref={fileInputRef}
  type="file"
  accept=".csv"
  style={{ display: "none" }}
  onChange={(e) => {
    const selectedFile = e.target.files?.[0] || null;
    console.log("Selected:", selectedFile);

    setFile(selectedFile);
  }}
/>


<button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    style={{
      padding: "12px 20px",
      borderRadius: "10px",
      border: "none",
      background: "#6366f1",
      color: "white",
      cursor: "pointer",
    }}
  >
    📂 Choose CSV File
  </button>
 {file && (
    <div
      style={{
        marginTop: "20px",
        color: "#16a34a",
        fontWeight: "bold",
      }}
    >
      ✅ {file.name}
    </div>
  )}
</div>

<div
  style={{
    textAlign: "center",
    marginTop: "35px",
  }}
>
   <button
    onClick={() => uploadCSV()}
    disabled={loading}
    style={{
      width: "220px",
      height: "58px",
      borderRadius: "14px",
      border: "none",
      background: "linear-gradient(90deg,#4f46e5,#6366f1)",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 10px 20px rgba(79,70,229,.3)",
    }}
  >
    {loading ? "Uploading..." : "📤 Upload CSV"}
  </button>
</div>
    </main>
  );
}