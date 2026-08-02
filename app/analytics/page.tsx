"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";
import jsPDF from "jspdf";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import {
  Pie,
  Bar,
} from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

type DashboardStats = {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
  topTheme: string;
  satisfaction: number;
};

export default function AnalyticsPage() {
  const { dark } = useTheme();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    topTheme: "",
    satisfaction: 0,
  });

  const [trendReport, setTrendReport] =
  useState("");

const [loadingTrend, setLoadingTrend] =
  useState(false);

  useEffect(() => {
    loadAnalytics();
    loadTrendAnalysis();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);

      const res = await fetch("/api/dashboard");
      if (!res.ok) {
  throw new Error("AI request failed");
}

      const data = await res.json();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
            Loading Analytics...
          </h2>
        </div>
      </main>
    );
  }
  const pieData = {
  labels: ["Positive", "Negative", "Neutral"],

  datasets: [
    {
      data: [
        stats.positive,
        stats.negative,
        stats.neutral,
      ],

      backgroundColor: [
        "#22c55e",
        "#ef4444",
        "#f59e0b",
      ],

      borderWidth: 2,
    },
  ],
};

const barData = {
  labels: [
    "Positive",
    "Negative",
    "Neutral",
  ],

  datasets: [
    {
      label: "Feedback",

      data: [
        stats.positive,
        stats.negative,
        stats.neutral,
      ],

      backgroundColor: [
        "#22c55e",
        "#ef4444",
        "#f59e0b",
      ],
    },
  ],
};

function exportAnalytics() {
  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text("Analytics Report", 20, 20);

  doc.setFontSize(14);

  doc.text(`Total Feedback : ${stats.total}`,20,40);
  doc.text(`Positive : ${stats.positive}`,20,50);
  doc.text(`Negative : ${stats.negative}`,20,60);
  doc.text(`Neutral : ${stats.neutral}`,20,70);
  doc.text(`Customer Satisfaction : ${stats.satisfaction}%`,20,80);
  doc.text(`Top Theme : ${stats.topTheme}`,20,90);

  doc.save("Analytics_Report.pdf");
}

async function loadTrendAnalysis() {
  try {
    setLoadingTrend(true);

    const res = await fetch("/api/ai-trends");

    const data = await res.json();

    setTrendReport(data.trends);
  } catch (error) {
    console.error(error);

    setTrendReport(
      "Failed to load AI trend analysis."
    );
  } finally {
    setLoadingTrend(false);
  }
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
        "linear-gradient(135deg,#4f46e5,#6366f1)",
      color: "white",
      padding: "35px",
      borderRadius: "22px",
      marginBottom: "30px",
      boxShadow:
        "0 15px 35px rgba(79,70,229,.25)",
    }}
  >
    <h1
      style={{
        margin: 0,
        fontSize: "40px",
      }}
    >
      📊 Analytics Dashboard
    </h1>

    <p
      style={{
        marginTop: "12px",
        fontSize: "18px",
      }}
    >
      Monitor customer sentiment, business
      insights and AI analytics in real time.
    </p>
  </div>

  {/* Overview Banner */}

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      background: dark ? "#1e293b" : "white",
      borderRadius: "20px",
      padding: "30px",
      marginBottom: "30px",
      boxShadow:
        "0 15px 35px rgba(0,0,0,.08)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <div>
      <h2
        style={{
          color: "#4f46e5",
          margin: 0,
        }}
      >
        Customer Satisfaction
      </h2>

      <p
        style={{
          color: dark
            ? "#cbd5e1"
            : "#4b5563",
          marginTop: "10px",
        }}
      >
        Overall sentiment based on customer
        feedback.
      </p>
    </div>

    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          color: "#16a34a",
          margin: 0,
        }}
      >
        {stats.satisfaction}%
      </h1>

      <span
        style={{
          color: dark
            ? "#cbd5e1"
            : "#6b7280",
        }}
      >
        Satisfaction Score
      </span>
    </div>
  </motion.div>

  {/* KPI Cards */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(230px,1fr))",
      gap: "20px",
      marginBottom: "35px",
    }}
  >
    <motion.div
      whileHover={{
        y: -8,
      }}
      style={{
        background:
          "linear-gradient(135deg,#4f46e5,#6366f1)",
        color: "white",
        borderRadius: "20px",
        padding: "25px",
      }}
    >
      <h3>Total Feedback</h3>

      <h1
        style={{
          fontSize: "46px",
        }}
      >
        {stats.total}
      </h1>
    </motion.div>

    <motion.div
      whileHover={{
        y: -8,
      }}
      style={{
        background:
          "linear-gradient(135deg,#16a34a,#22c55e)",
        color: "white",
        borderRadius: "20px",
        padding: "25px",
      }}
    >
      <h3>Positive</h3>

      <h1
        style={{
          fontSize: "46px",
        }}
      >
        {stats.positive}
      </h1>
    </motion.div>

    <motion.div
      whileHover={{
        y: -8,
      }}
      style={{
        background:
          "linear-gradient(135deg,#dc2626,#ef4444)",
        color: "white",
        borderRadius: "20px",
        padding: "25px",
      }}
    >
      <h3>Negative</h3>

      <h1
        style={{
          fontSize: "46px",
        }}
      >
        {stats.negative}
      </h1>
    </motion.div>

    <motion.div
      whileHover={{
        y: -8,
      }}
      style={{
        background:
          "linear-gradient(135deg,#f59e0b,#fbbf24)",
        color: "white",
        borderRadius: "20px",
        padding: "25px",
      }}
    >
      <h3>Neutral</h3>

      <h1
        style={{
          fontSize: "46px",
        }}
      >
        {stats.neutral}
      </h1>
    </motion.div>
  </div>

  {/* Summary Cards */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",
      gap: "25px",
      marginBottom: "35px",
    }}
  >
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
        🏆 Top Theme
      </h2>

      <h1
        style={{
          marginTop: "20px",
          color: dark
            ? "white"
            : "#111827",
        }}
      >
        {stats.topTheme}
      </h1>

      <p
        style={{
          color: dark
            ? "#cbd5e1"
            : "#6b7280",
        }}
      >
        Most discussed topic by customers.
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
        🤖 AI Insight
      </h2>

      <p
        style={{
          marginTop: "20px",
          lineHeight: "2",
          color: dark
            ? "#e2e8f0"
            : "#374151",
        }}
      >
        AI has analyzed customer feedback
        and identified
        <strong> {stats.topTheme}</strong>
        as the primary concern.

        <br />
        <br />

        Customer satisfaction currently
        stands at
        <strong>
          {" "}
          {stats.satisfaction}%
        </strong>.
      </p>
    </div>
  </div>
        {/* Charts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(450px,1fr))",
          gap: "30px",
          marginBottom: "35px",
        }}
      >
        {/* Pie Chart */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          style={{
            background: dark
              ? "#1e293b"
              : "white",

            borderRadius: "20px",

            padding: "25px",

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
            🥧 Sentiment Distribution
          </h2>

          <Pie data={pieData} />
        </motion.div>

        {/* Bar Chart */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          style={{
            background: dark
              ? "#1e293b"
              : "white",

            borderRadius: "20px",

            padding: "25px",

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
            📊 Feedback Comparison
          </h2>

          <Bar
            data={barData}
            options={{
              responsive: true,

              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </motion.div>
      </div>

      {/* Analytics Highlights */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",

          gap: "25px",

          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#4f46e5,#6366f1)",

            color: "white",

            padding: "25px",

            borderRadius: "18px",
          }}
        >
          <h3>📈 Trend</h3>

          <h1>
            {stats.positive >
            stats.negative
              ? "Improving"
              : "Declining"}
          </h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#16a34a,#22c55e)",

            color: "white",

            padding: "25px",

            borderRadius: "18px",
          }}
        >
          <h3>⭐ Satisfaction</h3>

          <h1>{stats.satisfaction}%</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#f59e0b,#fbbf24)",

            color: "white",

            padding: "25px",

            borderRadius: "18px",
          }}
        >
          <h3>🏆 Top Theme</h3>

          <h1>{stats.topTheme}</h1>
        </div>
      </div>
            {/* Analytics Controls */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <label
            style={{
              fontWeight: "bold",
              color: dark ? "white" : "#111827",
            }}
          >
            📅 Analytics Period
          </label>

          <br />

          <select
            style={{
              marginTop: "10px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
            }}
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>

        <button
          onClick={exportAnalytics}
          style={{
            background: "#4f46e5",
            color: "white",
            border: "none",
            padding: "15px 25px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📥 Export Analytics
        </button>
      </div>

      {/* Theme Breakdown */}

      <div
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
            marginBottom: "25px",
          }}
        >
          📦 Theme Breakdown
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#4f46e5",
                color: "white",
              }}
            >
              <th style={{ padding: "15px" }}>
                Theme
              </th>

              <th style={{ padding: "15px" }}>
                Priority
              </th>

              <th style={{ padding: "15px" }}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={{ padding: "15px" }}>
                Delivery
              </td>

              <td>High</td>

              <td>⚠ Needs Improvement</td>
            </tr>

            <tr>
              <td style={{ padding: "15px" }}>
                Product
              </td>

              <td>Medium</td>

              <td>✅ Stable</td>
            </tr>

            <tr>
              <td style={{ padding: "15px" }}>
                Support
              </td>

              <td>Medium</td>

              <td>✅ Good</td>
            </tr>

            <tr>
              <td style={{ padding: "15px" }}>
                Website
              </td>

              <td>Low</td>

              <td>✅ Healthy</td>
            </tr>

            <tr>
              <td style={{ padding: "15px" }}>
                Pricing
              </td>

              <td>Medium</td>

              <td>⚠ Review</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* AI Executive Summary */}

      <motion.div
        whileHover={{
          scale: 1.01,
        }}
        style={{
          background:
            "linear-gradient(135deg,#4f46e5,#6366f1)",
          color: "white",
          padding: "35px",
          borderRadius: "20px",
          marginBottom: "35px",
        }}
      >
        <h2>
          🤖 AI Executive Analytics Summary
        </h2>

        <p
          style={{
            marginTop: "20px",
            lineHeight: "2",
            fontSize: "17px",
          }}
        >
          Based on customer sentiment analysis,
          overall customer satisfaction is
          <strong> {stats.satisfaction}%</strong>.

          <br />
          <br />

          The most discussed business topic is
          <strong> {stats.topTheme}</strong>.

          <br />
          <br />

          Continue improving delivery,
          customer support and product
          quality to increase customer
          retention and overall satisfaction.

          <br />
          <br />

          AI predicts positive customer
          growth if current improvements
          continue.
        </p>
      </motion.div>
            {/* Business Health */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px",
          marginBottom: "35px",
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
            📈 Business Health
          </h2>

          <div
            style={{
              marginTop: "20px",
              lineHeight: "2.2",
              color: dark ? "#e2e8f0" : "#374151",
            }}
          >
            <div>🟢 Customer Growth : Stable</div>
            <div>🟢 AI Accuracy : 98%</div>
            <div>🟢 Database Status : Online</div>
            <div>🟢 Reports Generated : Ready</div>
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
            📌 Key Performance Indicators
          </h2>

          <div
            style={{
              marginTop: "20px",
              lineHeight: "2.3",
              color: dark ? "#e2e8f0" : "#374151",
            }}
          >
            <div>✔ Feedback Response Rate</div>
            <div>✔ Customer Satisfaction</div>
            <div>✔ Product Quality Score</div>
            <div>✔ Service Improvement</div>
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
          <h2>🚀 Analytics Summary</h2>

          <p
            style={{
              marginTop: "20px",
              lineHeight: "2",
            }}
          >
            Total Feedback

            <strong>
              {" "}
              {stats.total}
            </strong>

            <br />

            Positive Reviews

            <strong>
              {" "}
              {stats.positive}
            </strong>

            <br />

            Negative Reviews

            <strong>
              {" "}
              {stats.negative}
            </strong>

            <br />

            Satisfaction

            <strong>
              {" "}
              {stats.satisfaction}%
            </strong>

            <br />

            Top Theme

            <strong>
              {" "}
              {stats.topTheme}
            </strong>
          </p>
        </div>
      </div>

      {/* Footer */}

      <footer
        style={{
          marginTop: "50px",
          textAlign: "center",
          borderTop: "1px solid #d1d5db",
          paddingTop: "25px",
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
          Built with Next.js • React • TypeScript • Prisma • Neon PostgreSQL • Chart.js
        </p>

<div
  style={{
    marginTop: "35px",
    background: dark ? "#1e293b" : "white",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
  }}
>
  <h2 style={{ color: "#4f46e5" }}>
    📈 AI Trend Analysis
  </h2>

  {loadingTrend ? (
    <p>Analyzing customer trends...</p>
  ) : (
    <div
      style={{
        marginTop: "20px",
        whiteSpace: "pre-wrap",
        lineHeight: "1.8",
      }}
    >
      {trendReport}
    </div>
  )}
</div>

      </footer>

    </main>
  );
}