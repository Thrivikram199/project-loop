"use client";

import { useState } from "react";

export default function AskLoopPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function askAI() {
    const res = await fetch("/api/ask-loop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  }

  return (
    <main style={{ padding: "30px" }}>
      <h1>🤖 Ask LOOP AI</h1>

      <textarea
        rows={4}
        cols={60}
        placeholder="Ask something about customer feedback..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br />
      <br />

      <button onClick={askAI}>Ask</button>

      <hr />

      <h2>Answer</h2>

      <p>{answer}</p>
    </main>
  );
}