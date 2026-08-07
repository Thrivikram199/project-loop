"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
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
  const { theme, setTheme } = useTheme();

  const dark = theme === "dark";

  const user = useMemo(() => {
  if (typeof window === "undefined") {
    return {
      name: "Guest",
      role: "Viewer",
    };
  }

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}"
  );

  return {
    name: loggedUser.name || "Guest",
    role: loggedUser.role || "Viewer",
  };
}, []);

  function toggleTheme() {
    setTheme(dark ? "light" : "dark");
  }

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        height: "80px",
        background:
          "#312e80",
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

        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "16px",
  }}
>
  <img
    src="/logo2.png"
    alt="Project LOOP"
    style={{
      width: "120px",
      height: "120px",
      objectFit: "contain",
    }}
  />

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <h2
      style={{
        margin: 0,
        color: "white",
        fontSize: "42px",
        fontWeight: "700",
        lineHeight: "1",
      }}
    >
      LOOP
    </h2>

    <span
      style={{
        marginTop: "4px",
        color: "white",
        fontSize: "15px",
        fontWeight: "500",
      }}
    >
      AI Customer Feedback Intelligence Platform
    </span>
  </div>
</div>
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
          </span>
        </Link>

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
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}`}
            alt={user.name}
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
              {user.name}
            </div>

            <div
              style={{
                fontSize: "12px",
                textTransform: "capitalize",
              }}
            >
              {user.role}
            </div>
          </div>

          <FaChevronDown />
        </div>
      </div>
    </motion.nav>
  );
}