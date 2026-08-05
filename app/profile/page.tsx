"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";


import { useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

type UserProfile = {
  name: string;
  email: string;
  role: string;
  department: string;
  company: string;
  phone: string;
  createdAt: string;
};

export default function ProfilePage() {

  const router = useRouter();
  useEffect(() => {
  const loggedUser = localStorage.getItem("loggedInUser");

  if (!loggedUser) {
    router.push("/login");
  }
}, [router]);

const fileRef = useRef<HTMLInputElement>(null);

  const { theme, setTheme } = useTheme();

const dark = theme === "dark";

function toggleTheme() {
  setTheme(dark ? "light" : "dark");
}
  const [loading, setLoading] =
    useState(true);

    const [stats, setStats] = useState({
  total: 0,
  positive: 0,
  negative: 0,
  neutral: 0,
});

  const [profile, setProfile] = useState<UserProfile>({
  name: "",
  email: "",
  role: "",
  department: "",
  company: "",
  phone: "",
  createdAt: '',
});
const fileInputRef = useRef<HTMLInputElement>(null);

const [avatar, setAvatar] = useState<string>("");
  useEffect(() => {

    async function loadStats() {
  const loggedUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}"
  );

  const res = await fetch("/api/dashboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: loggedUser.id,
    }),
  });

  if (!res.ok) return;

  const data = await res.json();

  setStats(data);
}
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

      setProfile({
        name: data.name || "",
        email: data.email || "",
        role: data.role || "",
        phone: data.phone || "",
        department: data.department || "",
        company: data.company || "",
         createdAt: data.createdAt || "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  loadProfile();
}, [router]);

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: dark
            ? "#0f172a"
            : "#eef2ff",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <ThreeDots
            height="80"
            width="80"
            color="#4f46e5"
          />

          <h2
            style={{
              color: "#4f46e5",
            }}
          >
            Loading Profile...
          </h2>
        </div>
      </main>
    );
  }
  <input
  ref={fileRef}
  type="file"
  accept="image/*"
  hidden
/>

function handleAvatarChange(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setAvatar(imageUrl);
}

function downloadProfile() {

  const profile = {
    name: "Thrivikram",
    email: "thrivikram@example.com",
    role: "Administrator",
  };

  const blob = new Blob(
    [JSON.stringify(profile, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "profile.json";

  a.click();

  URL.revokeObjectURL(url);
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
  {/* Hero Banner */}

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      background:
        "linear-gradient(135deg,#4f46e5,#6366f1)",
      color: "white",
      borderRadius: "25px",
      padding: "40px",
      marginBottom: "35px",
      boxShadow:
        "0 15px 35px rgba(79,70,229,.25)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "42px",
          }}
        >
          👤 My Profile
        </h1>

        <p
          style={{
            marginTop: "12px",
            fontSize: "18px",
          }}
        >
          Manage your Project LOOP account,
          preferences and activity.
        </p>
      </div>

      <button
        style={{
          background: "white",
          color: "#4f46e5",
          border: "none",
          padding: "15px 30px",
          borderRadius: "12px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={() => router.push("/profile/edit")}
      >

        ✏ Edit Profile
      </button>
    </div>
  </motion.div>

  {/* Profile Card */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "320px 1fr",
      gap: "30px",
      marginBottom: "35px",
    }}
  >
    {/* Left Card */}

    <motion.div
      whileHover={{
        y: -5,
      }}
      style={{
        background: dark
          ? "#1e293b"
          : "white",

        borderRadius: "20px",

        padding: "30px",

        textAlign: "center",

        boxShadow:
          "0 15px 35px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg,#4f46e5,#6366f1)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "52px",
          fontWeight: "bold",
          margin: "0 auto",
        }}
      >
        {profile.name.charAt(0)}
      </div>

      <h2
        style={{
          marginTop: "20px",
          color: dark
            ? "white"
            : "#111827",
        }}
      >
        {profile.name}
      </h2>

      <p
        style={{
          color: "#6b7280",
        }}
      >
        {profile.role}
      </p>

      <div
        style={{
          marginTop: "25px",
        }}
      >
        <button
           onClick={() => fileInputRef.current?.click()}
  style={{
    width: "100%",
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "16px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
        >
          Change Avatar
        </button>
        <input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  style={{ display: "none" }}
  onChange={handleAvatarChange}
/>
      </div>
    </motion.div>

    {/* Right Card */}

    <motion.div
      whileHover={{
        y: -5,
      }}
      style={{
        background: dark
          ? "#1e293b"
          : "white",

        borderRadius: "20px",

        padding: "35px",

        boxShadow:
          "0 15px 35px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          color: "#4f46e5",
          marginBottom: "25px",
        }}
      >
        📋 Profile Information
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        <div>
          <strong>Name</strong>

          <p>{profile.name}</p>
        </div>

        <div>
          <strong>Email</strong>

          <p>{profile.email}</p>
        </div>

        <div>
          <strong>Role</strong>

          <p>{profile.role}</p>
        </div>

        <div>
          <strong>Department</strong>

          <p>{profile.department}</p>
        </div>

        <div>
          <strong>Company</strong>

          <p>{profile.company}</p>
        </div>

        <div>
          <strong>Phone</strong>

          <p>{profile.phone}</p>
        </div>
      </div>
    </motion.div>
  </div>
        {/* Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <motion.div
          whileHover={{ y: -8 }}
          style={{
            background:
              "linear-gradient(135deg,#4f46e5,#6366f1)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>💬 Total Feedback</h3>

          <h1
            style={{
              fontSize: "46px",
            }}
          >
            {stats.total}
          </h1>
        </motion.div>

        <motion.div
          whileHover={{ y: -8 }}
          style={{
            background:
              "linear-gradient(135deg,#16a34a,#22c55e)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>😊 Positive Feedback</h3>

          <h1
            style={{
              fontSize: "46px",
            }}
          >
            {stats.positive}
          </h1>
        </motion.div>

        <motion.div
          whileHover={{ y: -8 }}
          style={{
            background:
              "linear-gradient(135deg,#f59e0b,#fbbf24)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>😐 Neutral Feedback</h3>

          <h1
            style={{
              fontSize: "46px",
            }}
          >
            {stats.neutral}
          </h1>
        </motion.div>

        <motion.div
          whileHover={{ y: -8 }}
          style={{
            background:
              "linear-gradient(135deg,#dc2626,#ef4444)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>😞 Negative Feedback</h3>

          <h1
            style={{
              fontSize: "46px",
            }}
          >
            {stats.negative}
          </h1>
        </motion.div>
      </div>

      {/* Achievements & Skills */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "25px",
          marginBottom: "35px",
        }}
      >
        {/* Achievements */}

        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#4f46e5",
            }}
          >
            🏆 Achievements
          </h2>

          <div
            style={{
              marginTop: "20px",
              lineHeight: "2.4",
              color: dark ? "#e2e8f0" : "#374151",
            }}
          >
            <div>🥇 AI Administrator</div>

            <div>🏅 Top Dashboard User</div>

            <div>🎯 100+ Reports Generated</div>

            <div>⭐ Customer Insights Expert</div>

            <div>🚀 Project LOOP Contributor</div>
          </div>
        </motion.div>

        {/* Skills */}

        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#4f46e5",
            }}
          >
            💼 Skills
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Prisma",
              "Neon PostgreSQL",
              "AI",
              "Analytics",
              "Dashboard",
              "Chart.js",
              "Business Intelligence",
            ].map((skill) => (
              <span
                key={skill}
                style={{
                  background: "#4f46e5",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Profile Completion */}

      <motion.div
        whileHover={{ scale: 1.01 }}
        style={{
          background: dark ? "#1e293b" : "white",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "35px",
          boxShadow:
            "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            color: "#4f46e5",
            marginBottom: "20px",
          }}
        >
          📈 Profile Completion
        </h2>

        <div
          style={{
            width: "100%",
            background: "#e5e7eb",
            borderRadius: "12px",
            overflow: "hidden",
            height: "20px",
          }}
        >
          <div
            style={{
              width: "92%",
              height: "100%",
              background: "#22c55e",
              transition: "width .5s ease",
            }}
          />
        </div>

        <h2
          style={{
            marginTop: "20px",
            color: "#22c55e",
          }}
        >
          92%
        </h2>

        <p
          style={{
            color: dark ? "#cbd5e1" : "#4b5563",
          }}
        >
          Your profile is almost complete.
        </p>
      </motion.div>

      {/* Performance Overview */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#4f46e5,#6366f1)",
          color: "white",
          borderRadius: "20px",
          padding: "35px",
          marginBottom: "35px",
        }}
      >
        <h2>🎯 Performance Overview</h2>

        <p
          style={{
            marginTop: "20px",
            lineHeight: "2",
            fontSize: "17px",
          }}
        >
          You have actively managed customer
          feedback, generated reports, and monitored
          analytics using Project LOOP.

          <br />
          <br />

          Your profile indicates strong engagement
          with AI-driven business intelligence,
          making you one of the platforms most
          active administrators.
        </p>
      </div>
            {/* Activity Timeline */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "25px",
          marginBottom: "35px",
        }}
      >
        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#4f46e5",
              marginBottom: "25px",
            }}
          >
            📅 Activity Timeline
          </h2>

          <div
            style={{
              lineHeight: "2.4",
              color: dark
                ? "#e2e8f0"
                : "#374151",
            }}
          >
            <div>🟢 Logged into Project LOOP</div>

            <div>💬 Added customer feedback</div>

            <div>📊 Viewed analytics dashboard</div>

            <div>📄 Generated monthly report</div>

            <div>🤖 AI sentiment analysis completed</div>

            <div>⚙ Updated profile information</div>
          </div>
        </motion.div>

        {/* Security */}

        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#4f46e5",
              marginBottom: "25px",
            }}
          >
            🔒 Security Center
          </h2>

          <div
            style={{
              lineHeight: "2.3",
              color: dark
                ? "#e2e8f0"
                : "#374151",
            }}
          >
            <div>✅ Password Protected</div>

            <div>✅ Two-Factor Authentication Enabled</div>

            <div>🟢 Secure Login Active</div>

            <div>🖥 Last Login: Today</div>

            <div>🌍 Active Sessions: 1</div>
          </div>

          <button
            style={{
              marginTop: "25px",
              width: "100%",
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
           onClick={() => router.push("/change-password")}
          >
            Manage Security
          </button>
        </motion.div>
      </div>

      {/* Preferences */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "25px",
          marginBottom: "35px",
        }}
      >
        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#4f46e5",
            }}
          >
            ⚙ Preferences
          </h2>

          <div
            style={{
              marginTop: "20px",
              lineHeight: "2.5",
              color: dark
                ? "#e2e8f0"
                : "#374151",
            }}
          >
            <div>
              🌙 Theme:
              <strong>
                {dark ? " Dark Mode" : " Light Mode"}
              </strong>
            </div>

            <div>
              🌐 Language:
              <strong> English</strong>
            </div>

            <div>
              🔔 Email Notifications:
              <strong> Enabled</strong>
            </div>

            <div>
              📱 Mobile Alerts:
              <strong> Enabled</strong>
            </div>
          </div>

          <button
          onClick={() => router.push("/settings")}
            style={{
              marginTop: "25px",
              width: "100%",
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Update Preferences
          </button>
        </motion.div>

        {/* Notifications */}

        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#4f46e5",
            }}
          >
            🔔 Notifications
          </h2>

          <div
            style={{
              marginTop: "20px",
              lineHeight: "2.3",
              color: dark
                ? "#e2e8f0"
                : "#374151",
            }}
          >
            <div>📄 Monthly report available</div>

            <div>💬 New customer feedback received</div>

            <div>🤖 AI analysis completed</div>

            <div>📊 Dashboard updated successfully</div>

            <div>🔒 Security check completed</div>
          </div>

          <button
            style={{
              marginTop: "25px",
              width: "100%",
              background: "#f59e0b",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => router.push("/notifications")}
          >
            View All Notifications
          </button>
        </motion.div>
      </div>
            {/* Account Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#4f46e5,#6366f1)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>📅 Member Since</h3>

          <h2>{new Date(profile.createdAt).toLocaleDateString()}</h2>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#16a34a,#22c55e)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>⭐ Profile Status</h3>

          <h2>Active</h2>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#f59e0b,#fbbf24)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>🏆 Experience</h3>

          <h2>{profile.role}</h2>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#dc2626,#ef4444)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>🌍 Last Login</h3>

          <h2>Current Session</h2>
        </div>
      </div>

      {/* Quick Actions */}

      <div
        style={{
          background: dark ? "#1e293b" : "white",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "35px",
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            color: "#4f46e5",
            marginBottom: "25px",
          }}
        >
          ⚡ Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          <button
            style={{
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => router.push("/profile/edit")}
          >
            ✏ Edit Profile
          </button>

          <button
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
             onClick={() => router.push("/change-password")}
          >
            🔒 Change Password
          </button>

          <button
            style={{
              background: "#f59e0b",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={downloadProfile}
          >
            📥 Download Profile
          </button>

          <button
  onClick={() => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("projectSettings");

    toast.success("Logged out successfully!");

    router.push("/login");
  }}
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  🚪 Logout
</button>
        </div>
      </div>

      {/* System Information */}

      <div
        style={{
          background: dark ? "#1e293b" : "white",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "35px",
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            color: "#4f46e5",
          }}
        >
          💻 System Information
        </h2>

        <div
          style={{
            marginTop: "20px",
            lineHeight: "2.3",
            color: dark ? "#e2e8f0" : "#374151",
          }}
        >
          <div>🟢 Next.js 16</div>
          <div>🟢 React 19</div>
          <div>🟢 TypeScript</div>
          <div>🟢 Prisma ORM</div>
          <div>🟢 Neon PostgreSQL</div>
          <div>🟢 AI Sentiment Engine</div>
        </div>
      </div>

      {/* Developer Information */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#4f46e5,#6366f1)",
          color: "white",
          borderRadius: "20px",
          padding: "35px",
          marginBottom: "35px",
        }}
      >
        <h2>👨‍💻 Developer Information</h2>

        <p
          style={{
            marginTop: "20px",
            lineHeight: "2",
            fontSize: "17px",
          }}
        >
          Project LOOP is an AI-powered Customer
          Feedback Intelligence Platform developed
          using Next.js, React, Prisma ORM,
          Neon PostgreSQL, and TypeScript.

          <br /><br />

          It helps organizations analyze customer
          feedback, generate reports, visualize
          analytics, and gain actionable insights
          using AI-powered sentiment analysis.
        </p>
      </div>

      {/* Footer */}

      <footer
        style={{
          textAlign: "center",
          borderTop: "1px solid #d1d5db",
          paddingTop: "25px",
          marginTop: "40px",
          color: dark ? "#94a3b8" : "#6b7280",
        }}
      >
        <h3
          style={{
            color: "#4f46e5",
          }}
        >
          Project LOOP
        </h3>

        <p>
          AI Customer Feedback Intelligence Platform
        </p>

        <p
          style={{
            fontSize: "14px",
          }}
        >
          Built with Next.js • React • TypeScript • Prisma • Neon PostgreSQL
        </p>

        <p
          style={{
            marginTop: "15px",
            fontSize: "13px",
          }}
        >
          © 2026 Project LOOP. All Rights Reserved.
        </p>
      </footer>

    </main>
  );
}