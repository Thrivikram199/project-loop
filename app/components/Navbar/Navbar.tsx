"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

type NavbarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

export default function Navbar({
  collapsed,
  toggleSidebar,
}: NavbarProps) {
const { dark, toggleTheme } = useTheme();
  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        height: "80px",
        background:
          "linear-gradient(90deg,#4f46e5,#6366f1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 999,
        boxShadow: "0 8px 20px rgba(79,70,229,.3)",
      }}
    >
      {/* LEFT */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          <FaBars />
        </button>

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "30px",
            }}
          >
            PROJECT LOOP
          </h2>

          <div
            style={{
              fontSize: "13px",
              opacity: .9,
            }}
          >
            AI Customer Feedback Intelligence Platform
          </div>
        </div>
      </div>

      {/* CENTER */}

      <div
        style={{
          width: "420px",
          position: "relative",
        }}
      >
        <FaSearch
          style={{
            position: "absolute",
            top: "15px",
            left: "15px",
            color: "#6b7280",
          }}
        />

        <input
          placeholder="Search..."
          style={{
            width: "100%",
            padding: "13px 15px 13px 45px",
            borderRadius: "30px",
            border: "none",
            outline: "none",
            fontSize: "15px",
          }}
        />
      </div>

      {/* RIGHT */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <Link
          href="/notifications"
          style={{
            position: "relative",
            color: "white",
            fontSize: "22px",
          }}
        >
          <FaBell />

          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-10px",
              width: "18px",
              height: "18px",
              background: "#ef4444",
              borderRadius: "50%",
              color: "white",
              fontSize: "11px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            4
          </span>
        </Link>
        <div
  style={{
    display: "flex",
    gap: "15px",
    alignItems: "center",
  }}
>
  <button
    onClick={toggleTheme}
    style={{
      padding: "10px 18px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      background: "#4f46e5",
      color: "white",
    }}
  >
    {dark ? "☀️ Light" : "🌙 Dark"}
  </button>
</div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            background: "rgba(255,255,255,.15)",
            padding: "10px 15px",
            borderRadius: "30px",
          }}
        >
          
          <img
            src="https://ui-avatars.com/api/?name=Thrivikram"
            alt=""
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
            }}
          />

          <div>
            <div
              style={{
                fontWeight: "bold",
              }}
            >
              Thrivikram
            </div>

            <div
              style={{
                fontSize: "12px",
              }}
            >
              Administrator
            </div>
          </div>

          <FaChevronDown />
        </div>
      </div>
    </motion.nav>
  );
}