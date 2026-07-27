"use client";

import { useEffect, useState } from "react";

type Feedback = {
  id: string;
  customer: string;
  message: string;
  sentiment: string;
  theme: string;
};

export default function FeedbackPage() {
  const [customer, setCustomer] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [editingId, setEditingId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const userRole = "ADMIN"; // Change to ANALYST or VIEWER to test


  function startEdit(item: Feedback) {
  setEditingId(item.id);
  setCustomer(item.customer);
  setMessage(item.message);
  setIsEditing(true);
}


  async function loadFeedback() {
  try {
    const res = await fetch("/api/feedback");

    if (!res.ok) {
      throw new Error("Failed to fetch feedback");
    }

    const data = await res.json();

    console.log("Feedback:", data);

    setFeedbacks(data);
  } catch (error) {
    console.error("Load Feedback Error:", error);
  }
}

  useEffect(() => { 
    loadFeedback();
  }, []);

  async function addFeedback() {
  if (!customer || !message) {
    alert("Please fill all fields.");
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

      userId: "cms1daowq0000mn9keu1pvh4t" // Replace with your actual user ID if different
    }),
  });

  if (response.ok) {
    setCustomer("");
    setMessage("");
    

    loadFeedback();
  } else {
    alert("Failed to save feedback.");
  }
}

async function deleteFeedback(id: string) {
  const response = await fetch(`/api/feedback/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    loadFeedback();
  } else {
    alert("Delete failed");
  }
}

async function updateFeedback() {
  const response = await fetch(
    `/api/feedback/${editingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer,
        message,

      }),
    }
  );

  if (response.ok) {
    setCustomer("");
    setMessage("");
    setEditingId("");
    setIsEditing(false);

    loadFeedback();
  } else {
    alert("Update failed");
  }
}

  return (
    <main style={{ padding: "30px" }}>
      <h1>Feedback Management</h1>

      <input
  type="text"
  placeholder="Search customer..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<br />

<select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <option value="ALL">All</option>
  <option value="POSITIVE">Positive</option>
  <option value="NEGATIVE">Negative</option>
  <option value="NEUTRAL">Neutral</option>
</select>

<br />
<br />
<br />
      <br />

      <input
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Feedback Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />
      <br />

      <button
  onClick={
    isEditing
      ? updateFeedback
      : addFeedback
  }
>
  {isEditing
    ? "Update Feedback"
    : "Add Feedback"}
</button>

      <hr />

      <h2>Feedback Count: {feedbacks.length}</h2>

      {feedbacks
  .filter((item) => {
    const matchesSearch = item.customer
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL" || item.sentiment === filter;

    return matchesSearch && matchesFilter;
  })
  .map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{item.customer}</h3>

          <p>{item.message}</p>
          <p>
  <strong>Sentiment:</strong> {item.sentiment}
</p>

<p>
  <strong>Theme:</strong> {item.theme}
</p>

          <br />
<br />

{userRole === "ADMIN" && (
  <>
    <button
      onClick={() => startEdit(item)}
      style={{
        background: "green",
        color: "white",
        padding: "8px 15px",
        marginRight: "10px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Edit
    </button>

    <button
      onClick={() => deleteFeedback(item.id)}
      style={{
        background: "red",
        color: "white",
        padding: "8px 15px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  </>
)}
        </div>
      ))}
    </main>
  );
}