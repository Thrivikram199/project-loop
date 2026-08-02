"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  FaChartPie,
  FaComments,
  FaChartLine,
  FaFileAlt,
  FaUser,
  FaCog,
  FaUpload,
  FaRobot,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

type SidebarProps = {
  collapsed: boolean;
};

export default function Sidebar({
  collapsed,
}: SidebarProps) {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      icon: <FaChartPie />,
      link: "/dashboard",
    },
    {
      name: "Feedback",
      icon: <FaComments />,
      link: "/feedback",
    },
    {
      name: "Analytics",
      icon: <FaChartLine />,
      link: "/analytics",
    },
    {
      name: "Reports",
      icon: <FaFileAlt />,
      link: "/reports",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      link: "/profile",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      link: "/settings",
    },
    {
      name: "Upload CSV",
      icon: <FaUpload />,
      link: "/upload",
    },
    {
      name: "AI Summary",
      icon: <FaRobot />,
      link: "/ai-summary",
    },
    {
      name: "Admin",
      icon: <FaUserShield />,
      link: "/admin",
    },
  ];

  return (
    <motion.aside
      animate={{
        width: collapsed ? 90 : 260,
      }}
      transition={{
        duration: 0.35,
      }}
      style={{
        minHeight: "100vh",
        background: "#312e81",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "25px 15px",
        overflow: "hidden",
      }}
    >
      <div>
        {!collapsed && (
          <h2
            style={{
              marginBottom: "35px",
              textAlign: "center",
              fontSize: "24px",
            }}
          >
            MENU
          </h2>
        )}

        {menus.map((menu) => {
          const active = pathname === menu.link;

          return (
            <Link
              key={menu.link}
              href={menu.link}
              title={menu.name}
              style={{
                textDecoration: "none",
              }}
            >
              <motion.div
                whileHover={{
                  x: 8,
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "12px",
                  padding: "15px",
                  borderRadius: "14px",
                  background: active
                    ? "#4f46e5"
                    : "transparent",
                  color: "white",
                  transition: ".3s",
                  boxShadow: active
                    ? "0 8px 20px rgba(99,102,241,.4)"
                    : "none",
                  justifyContent: collapsed
                    ? "center"
                    : "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                  }}
                >
                  {menu.icon}
                </div>

                {!collapsed && (
                  <span
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    {menu.name}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>

      <Link
        href="/login"
        style={{
          textDecoration: "none",
        }}
      >
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          style={{
            background: "#dc2626",
            color: "white",
            padding: "15px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed
              ? "center"
              : "flex-start",
            gap: "15px",
          }}
        >
          <FaSignOutAlt />

          {!collapsed && "Logout"}
        </motion.div>
      </Link>
    </motion.aside>
  );
}