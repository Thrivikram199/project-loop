"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Feedback = {
  id: string;
  customer: string;
  message: string;
  sentiment: string;
  theme: string;
};

export default function ReportsPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    loadFeedback();
  }, []);

  async function loadFeedback() {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    setFeedbacks(data);
  }

  const positive = feedbacks.filter(
    (f) => f.sentiment === "POSITIVE"
  ).length;

  const negative = feedbacks.filter(
    (f) => f.sentiment === "NEGATIVE"
  ).length;

  const neutral = feedbacks.filter(
    (f) => f.sentiment === "NEUTRAL"
  ).length;
const themeCount: Record<string, number> = {};

feedbacks.forEach((item) => {
  themeCount[item.theme] = (themeCount[item.theme] || 0) + 1;
});

const topTheme =
  Object.keys(themeCount).length > 0
    ? Object.keys(themeCount).reduce((a, b) =>
        themeCount[a] > themeCount[b] ? a : b
      )
    : "No Data";


    function exportPDF() {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Voice of Customer Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Customer", "Message", "Sentiment", "Theme"]],
    body: feedbacks.map((item) => [
      item.customer,
      item.message,
      item.sentiment,
      item.theme,
    ]),
  });

  doc.save("Voice_of_Customer_Report.pdf");
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

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "feedback.csv";

  a.click();

  URL.revokeObjectURL(url);
}
  return (
  <main style={{ padding: "30px" }}>
    <h1>Voice of Customer Report</h1>

    <button
  onClick={exportPDF}
  style={{
    background: "#2563eb",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  }}
>
  Export PDF
</button>
<button onClick={exportCSV}>
  Export CSV
</button>
    <hr />

    <h2>Total Feedback: {feedbacks.length}</h2>

    <h3>Positive: {positive}</h3>

    <h3>Negative: {negative}</h3>

    <h3>Neutral: {neutral}</h3>

    {/* 👇 Add it here */}
    {positive > negative ? (
      <h2 style={{ color: "green" }}>
        Customers are generally satisfied.
      </h2>
    ) : (
      <h2 style={{ color: "red" }}>
        Customer satisfaction needs improvement.
      </h2>
    )}

    <br />
    <h2>Most Common Theme</h2>

<p>
  <strong>{topTheme}</strong>
</p>

<h2>Business Recommendation</h2>

{topTheme === "Delivery" && (
  <p>Improve delivery speed and logistics.</p>
)}

{topTheme === "Product" && (
  <p>Focus on improving product quality.</p>
)}

{topTheme === "Support" && (
  <p>Continue improving customer support response time.</p>
)}

{topTheme === "Website" && (
  <p>Optimize website performance and login experience.</p>
)}

{topTheme === "Pricing" && (
  <p>Review pricing strategy and promotional offers.</p>
)}

{topTheme === "General" && (
  <p>Collect more detailed customer feedback for better insights.</p>
)}

    <h2>Recent Feedback</h2>

    {feedbacks.map((item) => (
      <div
        key={item.id}
        style={{
          border: "1px solid gray",
          padding: "15px",
          marginBottom: "15px",
        }}
      >
        <b>{item.customer}</b>

        <p>{item.message}</p>

        <span>{item.sentiment}</span>
      </div>
    ))}
  </main>
);
}