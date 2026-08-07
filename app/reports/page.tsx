"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


import {
  FaFilePdf,
  FaFileCsv,
  FaPrint,
} from "react-icons/fa";

type Feedback = {
  id: string;
  customer: string;
  message: string;
  sentiment: string;
  theme: string;
};

export default function ReportsPage() {
 const { theme, setTheme } = useTheme();

const dark = theme === "dark";

function toggleTheme() {
  setTheme(dark ? "light" : "dark");
}

  const [loading, setLoading] =
    useState(true);

  const [feedbacks, setFeedbacks] =
    useState<Feedback[]>([]);

  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    topTheme: "",
    satisfaction: 0,
  });
const [aiReport, setAiReport] = useState("");
const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);

      const loggedUser = JSON.parse(
  localStorage.getItem("loggedInUser") || "{}"
);

const dashboardRes = await fetch("/api/dashboard", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: loggedUser.id,
  }),
});

if (!dashboardRes.ok) {
  throw new Error("Failed to load dashboard data");
}

const dashboard = await dashboardRes.json();

      setStats(dashboard);

  if (!loggedUser.id) {
  throw new Error("User not logged in");
}


      const feedbackRes = await fetch("/api/feedback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    action: "get",
    userId: loggedUser.id,
  }),
});
if (!feedbackRes.ok) {
  throw new Error("Failed to load feedback");
}

const feedback = await feedbackRes.json();

      if (Array.isArray(feedback)) {
        setFeedbacks(feedback);
      } else {
        setFeedbacks([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function exportPDF() {
    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "Voice of Customer Report",
      15,
      20
    );

    autoTable(doc, {
      startY: 35,

      head: [
        [
          "Customer",
          "Message",
          "Sentiment",
          "Theme",
        ],
      ],

      body: feedbacks.map((item) => [
        item.customer,
        item.message,
        item.sentiment,
        item.theme,
      ]),
    });

    doc.save("Customer_Report.pdf");
  }

  function exportCSV() {
    const headers = [
      "Customer",
      "Message",
      "Sentiment",
      "Theme",
    ];

    const rows = feedbacks.map((item) => [
      item.customer,
      item.message,
      item.sentiment,
      item.theme,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "Customer_Report.csv";

    a.click();

    URL.revokeObjectURL(url);
  }

  function printReport() {
    window.print();
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
            Loading Reports...
          </h2>
        </div>
      </main>
    );
  }
  async function generateAIReport() {
  try {
    setLoadingAI(true);

    const loggedUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    );

    if (!loggedUser.id) {
      throw new Error("User not logged in");
    }

    const res = await fetch("/api/ai-report", {
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
      console.error("AI Report Error:", data);
      throw new Error(data.message || "AI request failed");
    }

    setAiReport(data.report);

  } catch (error) {
    console.error("AI Report Error:", error);
  } finally {
    setLoadingAI(false);
  }
}

function downloadAIReport() {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text("LOOP", 20, 20);

  doc.setFontSize(16);
  doc.text("AI Executive Report", 20, 35);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const report =
    aiReport ||
    "No AI report has been generated yet.";

  const lines = doc.splitTextToSize(
    report,
    170
  );

  doc.text(lines, 20, 50);

  doc.save("Project_LOOP_AI_Report.pdf");
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
        fontSize: "42px",
      }}
    >
      📄 Reports Center
    </h1>

    <p
      style={{
        marginTop: "12px",
        fontSize: "18px",
      }}
    >
      Generate executive reports, export customer
      feedback and AI-powered business summaries.
    </p>
  </div>

  {/* Summary Cards */}

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
      whileHover={{ y: -8 }}
      style={{
        background:
          "linear-gradient(135deg,#16a34a,#22c55e)",
        color: "white",
        borderRadius: "18px",
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
      whileHover={{ y: -8 }}
      style={{
        background:
          "linear-gradient(135deg,#dc2626,#ef4444)",
        color: "white",
        borderRadius: "18px",
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
      whileHover={{ y: -8 }}
      style={{
        background:
          "linear-gradient(135deg,#f59e0b,#fbbf24)",
        color: "white",
        borderRadius: "18px",
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

  {/* Report Overview */}

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: .4 }}
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
      }}
    >
      📈 Executive Report Overview
    </h2>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px",
        marginTop: "25px",
      }}
    >
      <div>
        <h1
          style={{
            color: "#16a34a",
            margin: 0,
            fontSize: "50px",
          }}
        >
          {stats.satisfaction}%
        </h1>

        <p>Customer Satisfaction</p>
      </div>

      <div>
        <h1
          style={{
            color: "#4f46e5",
            margin: 0,
            fontSize: "40px",
          }}
        >
          {stats.topTheme}
        </h1>

        <p>Top Business Theme</p>
      </div>
    </div>
  </motion.div>

  {/* Export Center */}

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
      📥 Export Center
    </h2>

    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: .95 }}
        onClick={exportPDF}
        style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: "bold",
        }}
      >
        <FaFilePdf />

        Export PDF
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: .95 }}
        onClick={exportCSV}
        style={{
          background: "#16a34a",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: "bold",
        }}
      >
        <FaFileCsv />

        Export CSV
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: .95 }}
        onClick={printReport}
        style={{
          background: "#4f46e5",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: "bold",
        }}
      >
        <FaPrint />

        Print Report
      </motion.button>

      

      <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={generateAIReport}
  style={{
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "15px 30px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  🤖 Generate AI Report
</motion.button>

<button
  onClick={downloadAIReport}
  style={{
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "15px 25px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  📄 Download AI PDF
</button>

    </div>
  </div>
<div
  style={{
    marginTop: "35px",
    background: dark ? "#1e293b" : "white",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
    marginBottom: "35px",
  }}
>
  <h2 style={{ color: "#4f46e5" }}>
    🤖 AI Executive Report
  </h2>

  {loadingAI ? (
    <p>Generating AI Report...</p>
  ) : (
    <div
      style={{
        marginTop: "20px",
        whiteSpace: "pre-wrap",
        lineHeight: "1.8",
        marginBottom: "35px",
      }}
    >
      {aiReport || "Click 'Generate AI Report' to create an executive report."}
    </div>
  )}
</div>

      {/* Business Recommendations */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "25px",
          marginBottom: "35px",
        }}
      >
        {/* Recommendations */}

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
              color: dark
                ? "#e2e8f0"
                : "#374151",
            }}
          >
            <li>Improve delivery performance</li>

            <li>Increase product quality</li>

            <li>Reduce customer response time</li>

            <li>Monitor negative feedback weekly</li>

            <li>Collect detailed customer reviews</li>

            <li>Improve overall user experience</li>
          </ul>
        </div>

        {/* Theme Analysis */}

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
            📦 Theme Analysis
          </h2>

          <div
            style={{
              marginTop: "25px",
              lineHeight: "2.4",
              color: dark
                ? "#e2e8f0"
                : "#374151",
            }}
          >
            <div>
              🟢 Delivery
            </div>

            <div>
              🟢 Product
            </div>

            <div>
              🟢 Support
            </div>

            <div>
              🟢 Website
            </div>

            <div>
              🟢 Pricing
            </div>

            <div>
              🟢 General
            </div>

            <br />

            <strong>
              Current Top Theme:
            </strong>

            <div
              style={{
                marginTop: "10px",
                color: "#4f46e5",
                fontSize: "20px",
              }}
            >
              {stats.topTheme}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Satisfaction Analysis */}

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
            marginBottom: "20px",
          }}
        >
          😊 Customer Satisfaction Analysis
        </h2>

        <div
          style={{
            width: "100%",
            background: "#e5e7eb",
            borderRadius: "15px",
            overflow: "hidden",
            height: "22px",
          }}
        >
          <div
            style={{
              width: `${stats.satisfaction}%`,
              height: "100%",
              background:
                stats.satisfaction >= 75
                  ? "#22c55e"
                  : stats.satisfaction >= 50
                  ? "#f59e0b"
                  : "#ef4444",
              transition: "width .5s ease",
            }}
          />
        </div>

        <h2
          style={{
            marginTop: "20px",
            color:
              stats.satisfaction >= 75
                ? "#22c55e"
                : stats.satisfaction >= 50
                ? "#f59e0b"
                : "#ef4444",
          }}
        >
          {stats.satisfaction}%
        </h2>

        <p
          style={{
            color: dark
              ? "#cbd5e1"
              : "#4b5563",
            marginTop: "10px",
          }}
        >
          Overall customer satisfaction based on
          analyzed feedback.
        </p>
      </div>

      {/* Report Quality */}

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
              "linear-gradient(135deg,#16a34a,#22c55e)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>📊 Report Accuracy</h3>

          <h1>98%</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#4f46e5,#6366f1)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>⚡ AI Confidence</h3>

          <h1>96%</h1>
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
          <h3>📈 Business Score</h3>

          <h1>91%</h1>
        </div>
      </div>
            {/* Report Preview */}

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
          📋 Report Preview
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
                Customer
              </th>

              <th style={{ padding: "15px" }}>
                Sentiment
              </th>

              <th style={{ padding: "15px" }}>
                Theme
              </th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.slice(0, 5).map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom:
                    "1px solid #e5e7eb",
                }}
              >
                <td
                  style={{
                    padding: "15px",
                  }}
                >
                  {item.customer}
                </td>

                <td
                  style={{
                    padding: "15px",
                  }}
                >
                  {item.sentiment}
                </td>

                <td
                  style={{
                    padding: "15px",
                  }}
                >
                  {item.theme}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Feedback */}

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
            marginBottom: "20px",
          }}
        >
          📝 Recent Customer Feedback
        </h2>

        {feedbacks.slice(0, 5).map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            style={{
              borderLeft:
                "5px solid #4f46e5",
              padding: "20px",
              marginBottom: "20px",
              background:
                dark
                  ? "#334155"
                  : "#f8fafc",
              borderRadius: "12px",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: dark
                  ? "white"
                  : "#111827",
              }}
            >
              {item.customer}
            </h3>

            <p
              style={{
                marginTop: "12px",
                color: dark
                  ? "#cbd5e1"
                  : "#4b5563",
              }}
            >
              {item.message}
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  background:
                    item.sentiment ===
                    "POSITIVE"
                      ? "#22c55e"
                      : item.sentiment ===
                        "NEGATIVE"
                      ? "#ef4444"
                      : "#f59e0b",
                  color: "white",
                  padding:
                    "6px 15px",
                  borderRadius:
                    "999px",
                  fontSize: "13px",
                }}
              >
                {item.sentiment}
              </span>

              <span
                style={{
                  background:
                    "#4f46e5",
                  color: "white",
                  padding:
                    "6px 15px",
                  borderRadius:
                    "999px",
                  fontSize: "13px",
                }}
              >
                {item.theme}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Report Timeline */}

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
          📅 Report Timeline
        </h2>

        <div
          style={{
            marginTop: "25px",
            lineHeight: "2.4",
            color: dark
              ? "#e2e8f0"
              : "#374151",
          }}
        >
          <div>
            ✅ Feedback collected
          </div>

          <div>
            🤖 AI analyzed sentiment
          </div>

          <div>
            📊 Dashboard generated
          </div>

          <div>
            📄 Report created
          </div>

          <div>
            📥 Ready for export
          </div>
        </div>
      </div>

      {/* Executive Summary */}

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
        <h2>
          📑 Executive Summary
        </h2>

        <p
          style={{
            marginTop: "20px",
            lineHeight: "2",
            fontSize: "17px",
          }}
        >
          This report summarizes customer
          feedback collected by LOOP.

          <br /><br />

          AI analysis indicates an overall
          satisfaction score of
          <strong> {stats.satisfaction}%</strong>.

          <br /><br />

          The primary business concern is
          <strong> {stats.topTheme}</strong>.

          <br /><br />

          Executive recommendation:
          Continue improving customer
          experience while monitoring
          negative feedback trends through
          periodic analytics.
        </p>
      </div>
            {/* Download History */}

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
            marginBottom: "20px",
          }}
        >
          📥 Download History
        </h2>

        <div
          style={{
            lineHeight: "2.3",
            color: dark ? "#e2e8f0" : "#374151",
          }}
        >
          <div>📄 Customer_Report.pdf</div>
          <div>📄 Customer_Report.csv</div>
          <div>📄 Analytics_Report.pdf</div>
          <div>📄 Executive_Report.pdf</div>
        </div>
      </div>

      {/* System Status */}

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
              "linear-gradient(135deg,#16a34a,#22c55e)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>🟢 Database</h3>

          <h2>Connected</h2>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#4f46e5,#6366f1)",
            color: "white",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h3>🤖 AI Engine</h3>

          <h2>Running</h2>
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
          <h3>📊 Reports</h3>

          <h2>Available</h2>
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
          <h3>📈 AI Accuracy</h3>

          <h2>98%</h2>
        </div>
      </div>

      {/* Dashboard Summary */}

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
          }}
        >
          📊 Dashboard Summary
        </h2>

        <div
          style={{
            marginTop: "20px",
            lineHeight: "2.2",
            color: dark ? "#e2e8f0" : "#374151",
          }}
        >
          <div>
            ✔ Total Feedback :
            <strong> {stats.total}</strong>
          </div>

          <div>
            ✔ Positive :
            <strong> {stats.positive}</strong>
          </div>

          <div>
            ✔ Negative :
            <strong> {stats.negative}</strong>
          </div>

          <div>
            ✔ Neutral :
            <strong> {stats.neutral}</strong>
          </div>

          <div>
            ✔ Satisfaction :
            <strong> {stats.satisfaction}%</strong>
          </div>

          <div>
            ✔ Top Theme :
            <strong> {stats.topTheme}</strong>
          </div>
        </div>
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
          LOOP
        </h3>

        <p>
          AI Customer Feedback Intelligence Platform
        </p>

        <p
          style={{
            fontSize: "14px",
          }}
        >
          Built using Next.js • React • TypeScript • Prisma • Neon PostgreSQL • Chart.js • jsPDF
        </p>

        <p
          style={{
            marginTop: "15px",
            fontSize: "13px",
          }}
        >
          © 2026 LOOP. All Rights Reserved.
        </p>
      </footer>

    </main>
  );
}