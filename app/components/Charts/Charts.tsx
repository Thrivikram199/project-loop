"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

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
  const pieData = [
    { name: "Positive", value: positive },
    { name: "Negative", value: negative },
    { name: "Neutral", value: neutral },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        marginTop: "50px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,.1)",
        }}
      >
        <h2>Sentiment Distribution</h2>

        <PieChart width={350} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            outerRadius={100}
            label
          >
            {pieData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,.1)",
        }}
      >
        <h2>Feedback Analytics</h2>

        <BarChart
          width={400}
          height={300}
          data={pieData}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="value"
            fill="#4f46e5"
          />
        </BarChart>
      </div>
    </div>
  );
}