import Link from "next/link";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#312e81",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Menu</h2>

      <br />

      <p><Link href="/dashboard">Dashboard</Link></p>

      <br />

      <p><Link href="/feedback">Feedback</Link></p>

      <br />

      <p><Link href="/analytics">Analytics</Link></p>

      <br />

      <p><Link href="/reports">Reports</Link></p>

      <br />

      <p><Link href="/profile">Profile</Link></p>
    </div>
  );
}