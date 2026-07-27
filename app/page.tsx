import Link from "next/link";

export default function Home() {
  return (
    <main>

      <h1>PROJECT LOOP</h1>

      <h2>
        AI Customer Feedback Intelligence Platform
      </h2>

      <p>
        Welcome to Project LOOP
      </p>

      <Link href="/login">
        <button>Login</button>
      </Link>

      <Link href="/register">
        <button>Register</button>
      </Link>

    </main>
  );
}