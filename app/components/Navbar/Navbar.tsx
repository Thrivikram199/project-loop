import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#4f46e5",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2>PROJECT LOOP</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link href="/">Home</Link>

        <Link href="/dashboard">Dashboard</Link>

        <Link href="/feedback">Feedback</Link>

        <Link href="/reports">Reports</Link>
      </div>
    </nav>
  );
}