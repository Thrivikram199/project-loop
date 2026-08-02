"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import { useTheme } from "@/context/ThemeContext";

type Feedback = {
  id: string;
  customer: string;
  message: string;
  sentiment: string;
  theme: string;
};

export default function FeedbackPage() {
  const { dark } = useTheme();

  const [customer, setCustomer] = useState("");
  const [message, setMessage] = useState("");

  const [feedbacks, setFeedbacks] =
    useState<Feedback[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [editingId, setEditingId] =
    useState("");

  const [isEditing, setIsEditing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");

  const [themeFilter, setThemeFilter] =
    useState("ALL");

  const [currentPage, setCurrentPage] =
    useState(1);

  const feedbackPerPage = 6;

  const userRole = "ADMIN";

  useEffect(() => {
    loadFeedback();
  }, []);

  async function loadFeedback() {
    try {
      setLoading(true);

      const res = await fetch("/api/feedback");

      const data = await res.json();

      if (Array.isArray(data)) {
        setFeedbacks(data);
      } else {
        setFeedbacks([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load feedback");
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(item: Feedback) {
    setEditingId(item.id);
    setCustomer(item.customer);
    setMessage(item.message);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function addFeedback() {
    if (!customer || !message) {
      toast.error("Please fill all fields");
      return;
    }

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer,
        message,
        userId: "cms1daowq0000mn9keu1pvh4t",
      }),
    });

    if (response.ok) {
      toast.success("Feedback Added");

      setCustomer("");
      setMessage("");

      loadFeedback();
    } else {
      toast.error("Failed to save feedback");
    }
  }

  async function updateFeedback() {
    const response = await fetch(
      `/api/feedback/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          customer,
          message,
        }),
      }
    );

    if (response.ok) {
      toast.success("Feedback Updated");

      setCustomer("");
      setMessage("");

      setEditingId("");
      setIsEditing(false);

      loadFeedback();
    } else {
      toast.error("Update Failed");
    }
  }

  async function deleteFeedback(id: string) {
    if (!confirm("Delete this feedback?"))
      return;

    const response = await fetch(
      `/api/feedback/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      toast.success("Feedback Deleted");
      loadFeedback();
    } else {
      toast.error("Delete Failed");
    }
  }

  const filteredFeedback = useMemo(() => {
    return feedbacks.filter((item) => {
      const matchesSearch =
        item.customer
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSentiment =
        filter === "ALL" ||
        item.sentiment === filter;

      const matchesTheme =
        themeFilter === "ALL" ||
        item.theme === themeFilter;

      return (
        matchesSearch &&
        matchesSentiment &&
        matchesTheme
      );
    });
  }, [
    feedbacks,
    search,
    filter,
    themeFilter,
  ]);

  const totalPages = Math.ceil(
    filteredFeedback.length /
      feedbackPerPage
  );

  const currentFeedback =
    filteredFeedback.slice(
      (currentPage - 1) *
        feedbackPerPage,
      currentPage *
        feedbackPerPage
    );

  return (
    <main
  style={{
    minHeight: "100vh",
    background: dark
      ? "#0f172a"
      : "linear-gradient(135deg,#eef2ff,#f8fafc,#dbeafe)",
    padding: "35px",
  }}
>
  {/* Header */}

  <div
    style={{
      background:
        "linear-gradient(135deg,#4f46e5,#6366f1)",
      color: "white",
      padding: "35px",
      borderRadius: "22px",
      boxShadow:
        "0 15px 35px rgba(79,70,229,.25)",
      marginBottom: "30px",
    }}
  >
    <h1
      style={{
        margin: 0,
        fontSize: "40px",
      }}
    >
      💬 Feedback Management
    </h1>

    <p
      style={{
        marginTop: "12px",
        fontSize: "18px",
      }}
    >
      Manage customer feedback, perform sentiment
      analysis and generate business insights.
    </p>
  </div>

  {/* Statistics */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginBottom: "30px",
    }}
  >
    <div
      style={{
        background: "#4f46e5",
        color: "white",
        borderRadius: "18px",
        padding: "25px",
      }}
    >
      <h3>Total Feedback</h3>

      <h1>{feedbacks.length}</h1>
    </div>

    <div
      style={{
        background: "#16a34a",
        color: "white",
        borderRadius: "18px",
        padding: "25px",
      }}
    >
      <h3>Positive</h3>

      <h1>
        {
          feedbacks.filter(
            (x) => x.sentiment === "POSITIVE"
          ).length
        }
      </h1>
    </div>

    <div
      style={{
        background: "#dc2626",
        color: "white",
        borderRadius: "18px",
        padding: "25px",
      }}
    >
      <h3>Negative</h3>

      <h1>
        {
          feedbacks.filter(
            (x) => x.sentiment === "NEGATIVE"
          ).length
        }
      </h1>
    </div>

    <div
      style={{
        background: "#f59e0b",
        color: "white",
        borderRadius: "18px",
        padding: "25px",
      }}
    >
      <h3>Neutral</h3>

      <h1>
        {
          feedbacks.filter(
            (x) => x.sentiment === "NEUTRAL"
          ).length
        }
      </h1>
    </div>
  </div>

  {/* Search & Filters */}

  <div
    style={{
      background: dark ? "#1e293b" : "white",
      padding: "25px",
      borderRadius: "20px",
      marginBottom: "30px",
      boxShadow:
        "0 15px 35px rgba(0,0,0,.08)",
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "2fr 1fr 1fr auto",
        gap: "15px",
        alignItems: "center",
      }}
    >
      {/* Search */}

      <div
        style={{
          position: "relative",
        }}
      >
        <FaSearch
          style={{
            position: "absolute",
            left: "15px",
            top: "16px",
            color: "#6b7280",
          }}
        />

        <input
          placeholder="Search customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px 14px 14px 45px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
          }}
        />
      </div>

      {/* Sentiment */}

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        style={{
          padding: "14px",
          borderRadius: "12px",
        }}
      >
        <option value="ALL">
          All Sentiments
        </option>

        <option value="POSITIVE">
          Positive
        </option>

        <option value="NEGATIVE">
          Negative
        </option>

        <option value="NEUTRAL">
          Neutral
        </option>
      </select>

      {/* Theme */}

      <select
        value={themeFilter}
        onChange={(e) =>
          setThemeFilter(e.target.value)
        }
        style={{
          padding: "14px",
          borderRadius: "12px",
        }}
      >
        <option value="ALL">
          All Themes
        </option>

        <option value="Delivery">
          Delivery
        </option>

        <option value="Product">
          Product
        </option>

        <option value="Support">
          Support
        </option>

        <option value="Website">
          Website
        </option>

        <option value="Pricing">
          Pricing
        </option>

        <option value="General">
          General
        </option>
      </select>

      {/* Total */}

      <div
        style={{
          background: "#4f46e5",
          color: "white",
          padding: "15px 25px",
          borderRadius: "12px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {filteredFeedback.length} Results
      </div>
    </div>
  </div>

  {/* Floating Add Button */}

  <motion.button
    whileHover={{
      scale: 1.08,
    }}
    whileTap={{
      scale: .95,
    }}
    onClick={() => {
      setCustomer("");
      setMessage("");
      setIsEditing(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }}
    style={{
      position: "fixed",
      right: "35px",
      bottom: "35px",
      width: "65px",
      height: "65px",
      borderRadius: "50%",
      border: "none",
      background: "#4f46e5",
      color: "white",
      fontSize: "24px",
      cursor: "pointer",
      boxShadow:
        "0 15px 35px rgba(79,70,229,.4)",
      zIndex: 100,
    }}
  >
    <FaPlus />
  </motion.button>
    {/* Add / Edit Feedback Form */}

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    style={{
      background: dark ? "#1e293b" : "white",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 15px 35px rgba(0,0,0,.08)",
      marginBottom: "35px",
    }}
  >
    <h2
      style={{
        color: "#4f46e5",
        marginBottom: "25px",
      }}
    >
      {isEditing
        ? "✏ Update Feedback"
        : "➕ Add New Feedback"}
    </h2>

    <div
      style={{
        display: "grid",
        gap: "20px",
      }}
    >
      {/* Customer */}

      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: dark ? "white" : "#111827",
            fontWeight: "bold",
          }}
        >
          Customer Name
        </label>

        <input
          type="text"
          placeholder="Enter customer name"
          value={customer}
          onChange={(e) =>
            setCustomer(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            outline: "none",
          }}
        />
      </div>

      {/* Message */}

      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: dark ? "white" : "#111827",
            fontWeight: "bold",
          }}
        >
          Feedback Message
        </label>

        <textarea
          placeholder="Write customer feedback..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          style={{
            width: "100%",
            height: "150px",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            resize: "none",
            outline: "none",
          }}
        />
      </div>

      {/* Buttons */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: .95 }}
          onClick={
            isEditing
              ? updateFeedback
              : addFeedback
          }
          style={{
            background: "#4f46e5",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {isEditing
            ? "💾 Update Feedback"
            : "➕ Add Feedback"}
        </motion.button>

        {isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: .95 }}
            onClick={() => {
              setCustomer("");
              setMessage("");
              setEditingId("");
              setIsEditing(false);
            }}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "15px 30px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ❌ Cancel
          </motion.button>
        )}
      </div>
    </div>
  </motion.div>

  {/* Feedback List */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(380px,1fr))",
      gap: "25px",
    }}
  >
      {loading ? (
    <div
      style={{
        gridColumn: "1/-1",
        textAlign: "center",
        padding: "60px",
        color: "#64748b",
      }}
    >
      Loading feedback...
    </div>
  ) : currentFeedback.length === 0 ? (
    <div
      style={{
        gridColumn: "1/-1",
        background: dark ? "#1e293b" : "white",
        padding: "60px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 15px 35px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          fontSize: "70px",
        }}
      >
        📭
      </div>

      <h2
        style={{
          color: dark ? "white" : "#111827",
        }}
      >
        No Feedback Found
      </h2>

      <p
        style={{
          color: dark ? "#cbd5e1" : "#6b7280",
        }}
      >
        Try changing the search or filter.
      </p>
    </div>
  ) : (
    currentFeedback.map((item) => (
      <motion.div
        key={item.id}
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        transition={{
          duration: .25,
        }}
        style={{
          background: dark ? "#1e293b" : "white",
          borderRadius: "20px",
          padding: "25px",
          boxShadow:
            "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        {/* Header */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#4f46e5,#6366f1)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            {item.customer.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                color: dark ? "white" : "#111827",
              }}
            >
              {item.customer}
            </h2>

            <div
              style={{
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Customer Feedback
            </div>
          </div>
        </div>

        {/* Message */}

        <p
          style={{
            color: dark ? "#e2e8f0" : "#374151",
            lineHeight: "28px",
            minHeight: "80px",
          }}
        >
          {item.message}
        </p>

        {/* Badges */}

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "20px",
            marginBottom: "25px",
          }}
        >
          <span
            style={{
              background:
                item.sentiment === "POSITIVE"
                  ? "#22c55e"
                  : item.sentiment === "NEGATIVE"
                  ? "#ef4444"
                  : "#f59e0b",
              color: "white",
              padding: "8px 16px",
              borderRadius: "999px",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            {item.sentiment}
          </span>

          <span
            style={{
              background: "#4f46e5",
              color: "white",
              padding: "8px 16px",
              borderRadius: "999px",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            📌 {item.theme}
          </span>
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap: "12px",
          }}
        >
          <Link
            href={`/feedback/${item.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{
                width: "100%",
                background: "#4f46e5",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <FaEye /> View
            </button>
          </Link>

          {userRole === "ADMIN" && (
            <>
              <button
                onClick={() =>
                  startEdit(item)
                }
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() =>
                  deleteFeedback(item.id)
                }
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                <FaTrash /> Delete
              </button>
            </>
          )}
        </div>
      </motion.div>
    ))
  )}
</div>
      {/* Pagination */}

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            color: dark ? "#e2e8f0" : "#374151",
            fontWeight: "bold",
          }}
        >
          Showing{" "}
          <span style={{ color: "#4f46e5" }}>
            {currentFeedback.length}
          </span>{" "}
          of{" "}
          <span style={{ color: "#4f46e5" }}>
            {filteredFeedback.length}
          </span>{" "}
          feedback
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            style={{
              padding: "12px 18px",
              borderRadius: "10px",
              border: "none",
              cursor:
                currentPage === 1
                  ? "not-allowed"
                  : "pointer",
              background:
                currentPage === 1
                  ? "#cbd5e1"
                  : "#4f46e5",
              color: "white",
              fontWeight: "bold",
            }}
          >
            ◀ Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() =>
                setCurrentPage(page)
              }
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background:
                  currentPage === page
                    ? "#4f46e5"
                    : "#e5e7eb",
                color:
                  currentPage === page
                    ? "white"
                    : "#111827",
                fontWeight: "bold",
              }}
            >
              {page}
            </button>
          ))}

          <button
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            style={{
              padding: "12px 18px",
              borderRadius: "10px",
              border: "none",
              cursor:
                currentPage === totalPages ||
                totalPages === 0
                  ? "not-allowed"
                  : "pointer",
              background:
                currentPage === totalPages ||
                totalPages === 0
                  ? "#cbd5e1"
                  : "#4f46e5",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: dark ? "#94a3b8" : "#6b7280",
          borderTop: "1px solid #d1d5db",
          paddingTop: "25px",
        }}
      >
        <h3
          style={{
            color: "#4f46e5",
            marginBottom: "10px",
          }}
        >
          Project LOOP
        </h3>

        <p>
          AI Customer Feedback Intelligence Platform
        </p>

        <p
          style={{
            fontSize: "14px",
          }}
        >
          Built using Next.js • Prisma • Neon PostgreSQL • TypeScript • React
        </p>
      </div>
            {/* Floating Scroll to Top Button */}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        style={{
          position: "fixed",
          bottom: "110px",
          right: "35px",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          border: "none",
          background: "#6366f1",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(79,70,229,.35)",
          zIndex: 100,
        }}
      >
        ↑
      </motion.button>
    </main>
  );
}