"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Charts from "../components/Charts/Charts";
import Cards from "../components/Cards/Cards";
import Footer from "../components/Footer/Footer";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
  FaSyncAlt,
  FaPlusCircle,
  FaDownload,
} from "react-icons/fa";

import { ThreeDots } from "react-loader-spinner";

type Feedback = {
  id: string;
  customer: string;
  message: string;
  sentiment: string;
  theme: string;
};

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
  const loggedUser = localStorage.getItem("loggedInUser");

  if (!loggedUser) {
    router.push("/login");
  }
}, [router]);
  const { theme, setTheme } = useTheme();

const dark = theme === "dark";

function toggleTheme() {
  setTheme(dark ? "light" : "dark");
}

  const [collapsed, setCollapsed] = useState(false);

  const [loading, setLoading] = useState(true);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    topTheme: "",
    satisfaction: 0,
  });
const [recommendations, setRecommendations] =
  useState("");

const [loadingRecommendations, setLoadingRecommendations] =
  useState(false);

  useEffect(() => {
    loadDashboard();
    loadFeedback();
    loadRecommendations();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

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
      const data = await res.json();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadFeedback() {
    try {
      const loggedUser = JSON.parse(
  localStorage.getItem("loggedInUser") || "{}"
);

const res = await fetch("/api/feedback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    action: "get",
    userId: loggedUser.id,
  }),
});

const data = await res.json();

      if (Array.isArray(data)) {
        setFeedbacks(data);
      } else {
        setFeedbacks([]);
      }
    } catch (error) {
      console.error(error);
      setFeedbacks([]);
    }
  }

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
            Loading Dashboard...
          </h2>
        </div>
      </main>
    );
  }

  async function loadRecommendations() {
  try {
    setLoadingRecommendations(true);

    const loggedUser = JSON.parse(
  localStorage.getItem("loggedInUser") || "{}"
);

const res = await fetch("/api/ai-recommendations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: loggedUser.id,
  }),
});

    const data = await res.json();

    setRecommendations(data.recommendations);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingRecommendations(false);
  }
}

  return (
    <>
  <Navbar
    collapsed={collapsed}
    toggleSidebar={() =>
      setCollapsed(!collapsed)
    }
  />

  <div
    style={{
      display: "flex",
    }}
  >
    <Sidebar collapsed={collapsed} />

    <main
      style={{
        flex: 1,
        padding: "35px",
        minHeight: "100vh",
        background: dark
          ? "#0f172a"
          : "linear-gradient(135deg,#eef2ff,#f8fafc,#dbeafe)",
      }}
    >
      {/* Welcome Banner */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#4f46e5,#6366f1)",
          borderRadius: "22px",
          padding: "35px",
          color: "white",
          marginBottom: "30px",
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
                fontSize: "38px",
              }}
            >
              Welcome Back 👋
            </h1>

            <p
              style={{
                marginTop: "12px",
                fontSize: "18px",
                opacity: .95,
              }}
            >
              Monitor customer feedback,
              AI insights and business
              analytics in one place.
            </p>
          </div>

          <div
            style={{
              textAlign: "right",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "48px",
              }}
            >
              {stats.satisfaction}%
            </h2>

            <div
              style={{
                fontSize: "17px",
              }}
            >
              Customer Satisfaction
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <button
        onClick={() => router.push("/feedback")}
          style={{
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "18px",
            padding: "18px",
            fontSize: "17px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <FaPlusCircle />

          Add Feedback
        </button>

        <button
        onClick={() => router.push("/reports")}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "18px",
            padding: "18px",
            fontSize: "17px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <FaDownload />

          Export Report
        </button>

        <button
          onClick={loadDashboard}
          style={{
            background: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "18px",
            padding: "18px",
            fontSize: "17px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <FaSyncAlt />

          Refresh Dashboard
        </button>
      </div>

      {/* KPI Cards */}

      <Cards
        total={stats.total}
        positive={stats.positive}
        negative={stats.negative}
        neutral={stats.neutral}
      />

      <br />

      {/* Charts */}

      <Charts
        positive={stats.positive}
        negative={stats.negative}
        neutral={stats.neutral}
      />
            <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          marginTop: "35px",
        }}
      >
        {/* AI Insight */}

        <div
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#4f46e5",
              marginBottom: "20px",
            }}
          >
            🤖 AI Business Insight
          </h2>

          {loadingRecommendations ? (
  <p>🤖 Generating recommendations...</p>
) : (
  <div
    style={{
      whiteSpace: "pre-wrap",
      lineHeight: "1.8",
    }}
  >
    {recommendations}
  </div>
)}
        </div>

        {/* Dashboard KPI */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#4f46e5",
              color: "white",
              borderRadius: "18px",
              padding: "25px",
            }}
          >
            <h3>📊 Total Feedback</h3>

            <h1
              style={{
                fontSize: "48px",
                margin: "10px 0",
              }}
            >
              {stats.total}
            </h1>
          </div>

          <div
            style={{
              background: "#16a34a",
              color: "white",
              borderRadius: "18px",
              padding: "25px",
            }}
          >
            <h3>⭐ Satisfaction</h3>

            <h1
              style={{
                fontSize: "42px",
                margin: "10px 0",
              }}
            >
              {stats.satisfaction}%
            </h1>
          </div>

          <div
            style={{
              background: "#f59e0b",
              color: "white",
              borderRadius: "18px",
              padding: "25px",
            }}
          >
            <h3>🏆 Top Theme</h3>

            <h2
              style={{
                marginTop: "15px",
              }}
            >
              {stats.topTheme}
            </h2>
          </div>
        </div>
      </div>

      {/* Theme Analytics & Recent Activity */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#4f46e5",
            }}
          >
            📦 Theme Analytics
          </h2>

          <div
            style={{
              marginTop: "20px",
              lineHeight: "2.3",
              color: dark ? "#e2e8f0" : "#374151",
            }}
          >
            <div>📦 Delivery</div>
            <div>🛒 Product</div>
            <div>💬 Support</div>
            <div>🌐 Website</div>
            <div>💰 Pricing</div>
            <div>📋 General</div>
          </div>
        </div>

        <div
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#4f46e5",
            }}
          >
            📈 Recent Activity
          </h2>

          <div
            style={{
              marginTop: "20px",
              lineHeight: "2.4",
              color: dark ? "#e2e8f0" : "#374151",
            }}
          >
            <div>🟢 Dashboard Loaded Successfully</div>

            <div>💬 Customer Feedback Updated</div>

            <div>📄 Monthly Report Generated</div>

            <div>🤖 AI Analysis Completed</div>

            <div>📊 Dashboard Synced</div>
          </div>
        </div>
      </div>
            {/* Recent Feedback Timeline */}

      <div
        style={{
          marginTop: "35px",
          background: dark ? "#1e293b" : "white",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            color: "#4f46e5",
            marginBottom: "25px",
          }}
        >
          📝 Recent Feedback Timeline
        </h2>

        {feedbacks.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#64748b",
            }}
          >
            📭 No feedback available.
          </div>
        ) : (
          feedbacks.slice(0, 5).map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "18px",
                marginBottom: "25px",
                paddingBottom: "20px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  background: "#4f46e5",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              >
                {item.customer.charAt(0).toUpperCase()}
              </div>

              <div
                style={{
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: dark ? "white" : "#111827",
                  }}
                >
                  {item.customer}
                </h3>

                <p
                  style={{
                    marginTop: "8px",
                    color: dark ? "#e2e8f0" : "#4b5563",
                    lineHeight: "28px",
                  }}
                >
                  {item.message}
                </p>

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      background:
                        item.sentiment === "POSITIVE"
                          ? "#22c55e"
                          : item.sentiment === "NEGATIVE"
                          ? "#ef4444"
                          : "#f59e0b",
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                    }}
                  >
                    {item.sentiment}
                  </span>

                  <span
                    style={{
                      background: "#6366f1",
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                    }}
                  >
                    {item.theme}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* AI Executive Summary */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          marginTop: "35px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#4f46e5,#6366f1)",
            color: "white",
            borderRadius: "20px",
            padding: "30px",
          }}
        >
          <h2>🤖 Executive AI Summary</h2>

          <p
            style={{
              marginTop: "20px",
              lineHeight: "2",
            }}
          >
            Total customer satisfaction is
            <strong> {stats.satisfaction}%</strong>.

            <br />
            <br />

            Most customer feedback revolves around
            <strong> {stats.topTheme}</strong>.

            <br />
            <br />

            AI recommends focusing on product quality,
            delivery optimization and customer support.
          </p>
        </div>

        <div
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
            💡 Business Recommendations
          </h2>

          <ul
            style={{
              marginTop: "20px",
              lineHeight: "2.2",
              color: dark ? "#e2e8f0" : "#374151",
            }}
          >
            <li>Increase customer engagement.</li>

            <li>Improve delivery performance.</li>

            <li>Reduce negative reviews.</li>

            <li>Improve product quality.</li>

            <li>Continue collecting customer feedback.</li>
          </ul>
        </div>
      </div>

      {/* Priority Actions */}

      <div
        style={{
          marginTop: "35px",
          background: dark ? "#1e293b" : "white",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            color: "#4f46e5",
          }}
        >
          🎯 Priority Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <div
            style={{
              background: "#fee2e2",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3>🔴 High Priority</h3>

            <p>
              Investigate negative customer
              feedback immediately.
            </p>
          </div>

          <div
            style={{
              background: "#fef3c7",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3>🟡 Medium Priority</h3>

            <p>
              Improve delivery tracking and
              communication.
            </p>
          </div>

          <div
            style={{
              background: "#dcfce7",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3>🟢 Low Priority</h3>

            <p>
              Continue monitoring customer
              satisfaction trends.
            </p>
          </div>
        </div>
      </div>
            {/* Dashboard Footer */}

      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px",
        }}
      >
        <div
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2 style={{ color: "#4f46e5" }}>
            🚀 System Status
          </h2>

          <div style={{ marginTop: "20px", lineHeight: "2.2" }}>
            <div>🟢 Database Connected</div>
            <div>🟢 AI Engine Running</div>
            <div>🟢 API Online</div>
            <div>🟢 Reports Available</div>
          </div>
        </div>

        <div
          style={{
            background: dark ? "#1e293b" : "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h2 style={{ color: "#4f46e5" }}>
            📅 Todays Summary
          </h2>

          <div style={{ marginTop: "20px", lineHeight: "2.2" }}>
            <div>
              💬 Feedback Received:
              <strong> {stats.total}</strong>
            </div>

            <div>
              😊 Positive:
              <strong> {stats.positive}</strong>
            </div>

            <div>
              😐 Neutral:
              <strong> {stats.neutral}</strong>
            </div>

            <div>
              😞 Negative:
              <strong> {stats.negative}</strong>
            </div>
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#4f46e5,#6366f1)",
            color: "white",
            borderRadius: "20px",
            padding: "25px",
          }}
        >
          <h2>🏆 LOOP</h2>

          <p
            style={{
              marginTop: "20px",
              lineHeight: "2",
            }}
          >
            AI Powered Customer Feedback Intelligence Platform

            <br />
            <br />

            Built with

            <br />

            • Next.js 16

            <br />

            • Prisma ORM

            <br />

            • Neon PostgreSQL

            <br />

            • React

            <br />

            • TypeScript
          </p>
        </div>
      </div>

      <Footer />

    </main>
  </div>
</>
);
}