"use client";
import { useTheme } from "@/context/ThemeContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  positive: number;
  negative: number;
  neutral: number;
};

export default function Charts({
  positive,
  negative,
  neutral,
}: Props) {
  const data = [
    { name: "Positive", value: positive },
    { name: "Negative", value: negative },
    { name: "Neutral", value: neutral },
  ];

  const COLORS = [
    "#10b981",
    "#ef4444",
    "#f59e0b",
  ];
const { dark } = useTheme();
  return (
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
          background: dark
  ? "#1e293b"
  : "white",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            color: "#4f46e5",
            marginBottom: "20px",
          }}
        >
          Sentiment Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          background: dark
  ? "#1e293b"
  : "white",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            color: "#4f46e5",
            marginBottom: "20px",
          }}
        >
          Feedback Analysis
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="value"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}