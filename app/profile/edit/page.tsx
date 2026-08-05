"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProfilePage() {
  const router = useRouter();
  useEffect(() => {
  const loggedUser = localStorage.getItem("loggedInUser");

  if (!loggedUser) {
    router.push("/login");
  }
}, [router]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    company: "",
  });

  useEffect(() => {
  async function loadProfile() {
    try {
      const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser") || "{}"
      );

      if (!loggedUser.id) {
        toast.error("Please login first");
        router.push("/login");
        return;
      }

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedUser.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        department: data.department || "",
        company: data.company || "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    }
  }

  loadProfile();
}, [router]);

  async function saveProfile() {
    setLoading(true);

   const loggedUser = JSON.parse(
  localStorage.getItem("loggedInUser") || "{}"
);

const res = await fetch("/api/profile", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: loggedUser.id,
    ...form,
  }),
});

    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      toast.success("Profile updated successfully");
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
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 15px 30px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            color: "#4f46e5",
            marginBottom: "30px",
          }}
        >
          ✏️ Edit Profile
        </h1>

        <label>Name</label>

        <input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          style={inputStyle}
        />

        <label>Email</label>

        <input
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          style={inputStyle}
        />

        <label>Phone</label>

        <input
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
          style={inputStyle}
        />

        <label>Department</label>

        <input
          value={form.department}
          onChange={(e) =>
            setForm({
              ...form,
              department: e.target.value,
            })
          }
          style={inputStyle}
        />

        <label>Company</label>

        <input
          value={form.company}
          onChange={(e) =>
            setForm({
              ...form,
              company: e.target.value,
            })
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
            onClick={saveProfile}
            style={saveButton}
          >
            {loading ? "Saving..." : "💾 Save Changes"}
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