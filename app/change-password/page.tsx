"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  async function changePassword() {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    const loggedUser = JSON.parse(
  localStorage.getItem("loggedInUser") || "{}"
);

const res = await fetch("/api/change-password", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: loggedUser.id,
    currentPassword,
    newPassword,
  }),
});
    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      toast.success(data.message);
      router.push("/profile");
    } else {
      toast.error(data.message);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#eef2ff,#f8fafc,#dbeafe)",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            color: "#4f46e5",
            marginBottom: "30px",
          }}
        >
          🔒 Change Password
        </h1>

        <label>Current Password</label>

        <input
          type="password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
          style={inputStyle}
        />

        <label>New Password</label>

        <input
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          style={inputStyle}
        />

        <label>Confirm Password</label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={changePassword}
            style={saveButton}
          >
            {loading
              ? "Updating..."
              : "🔒 Change Password"}
          </button>

          <button
            onClick={() => router.back()}
            style={cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
} as const;

const saveButton = {
  background: "#4f46e5",
  color: "white",
  border: "none",
  padding: "14px 30px",
  borderRadius: "10px",
  cursor: "pointer",
} as const;

const cancelButton = {
  background: "#e5e7eb",
  border: "none",
  padding: "14px 30px",
  borderRadius: "10px",
  cursor: "pointer",
} as const;