"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Login Successful!");;

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
}

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eef2ff",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "white",
          padding: "45px",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,.12)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#4f46e5",
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "35px",
          }}
        >
          Login to your Project LOOP account
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "30px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            fontSize: "16px",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "15px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#64748b",
          }}
        >
          Do not have an account?
          <Link
            href="/register"
            style={{
              color: "#4f46e5",
              fontWeight: "bold",
              marginLeft: "6px",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}