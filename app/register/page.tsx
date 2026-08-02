"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function register() {
  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Registration Successful!");
      router.push("/login");
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
          width: "430px",
          background: "#fff",
          padding: "45px",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,.12)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#4f46e5",
            fontSize: "38px",
            marginBottom: "10px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "35px",
          }}
        >
          Join Project LOOP today
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            fontSize: "16px",
          }}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
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
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            fontSize: "16px",
          }}
        />

        <button
          onClick={register}
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
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#64748b",
          }}
        >
          Already have an account?
          <Link
            href="/login"
            style={{
              color: "#4f46e5",
              fontWeight: "bold",
              textDecoration: "none",
              marginLeft: "6px",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}