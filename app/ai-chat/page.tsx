"use client";

import {
  useState,
  useEffect,
  useRef,
} from "react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  time: string;
};

export default function AIChatPage() {
  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

 const [messages, setMessages] =
  useState<ChatMessage[]>([]);
  
  const messagesEndRef =
  useRef<HTMLDivElement>(null);

  async function sendMessage() {
  if (!question.trim()) return;

  const userMessage: ChatMessage = {
  role: "user",
  text: question,
  time: new Date().toLocaleTimeString(),
};

  setMessages((prev) => [...prev, userMessage]);

  const currentQuestion = question;

  setQuestion("");

  try {
    setLoading(true);

    const res = await fetch("/api/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: currentQuestion,
      }),
    });
    if (!res.ok) {
  throw new Error("AI request failed");
}

    const data = await res.json();

    const aiMessage: ChatMessage = {
  role: "assistant",
  text: data.answer,
  time: new Date().toLocaleTimeString(),
};

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
     {
  role: "assistant",
  text: "Unable to contact AI.",
  time: new Date().toLocaleTimeString(),
},
    ]);
  } finally {
    setLoading(false);
  }
}
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

useEffect(() => {
  localStorage.setItem(
    "chatHistory",
    JSON.stringify(messages)
  );
}, [messages]);
function clearChat() {
  setMessages([]);

  localStorage.removeItem(
    "chatHistory"
  );
}

  return (
    <main
      style={{
        padding: "35px 50px",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#eef2ff,#f8fafc,#dbeafe)",
      }}
    >
      <h1
        style={{
          color: "#4f46e5",
          marginBottom: "30px",
        }}
      >
        🤖 AI Business Assistant
      </h1>

      <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  }}
>
  <button
    onClick={clearChat}
    style={{
      background: "white",
      color: "#dc2626",
      border: "2px solid #dc2626",
      padding: "12px 20px",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    🗑 Clear Chat
  </button>
</div>

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "35px",
          height: "600px",
          overflowY: "auto",
          boxShadow:
            "0 15px 35px rgba(0,0,0,.08)",
          marginBottom: "20px",
        }}
      >
        {messages.length === 0 ? (
          <div
  style={{
    padding: "20px",
  }}
>
  <h2
    style={{
      color: "#4f46e5",
      marginBottom: "15px",
    }}
  >
    👋 Welcome to LOOP AI Assistant!
  </h2>

  <p
    style={{
      color: "#6b7280",
      fontSize: "18px",
    }}
  >
    Start a conversation with the AI assistant.
  </p>
</div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  message.role === "user"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  background:
                    message.role === "user"
                      ? "#4f46e5"
                      : "#e5e7eb",
                  color:
                    message.role === "user"
                      ? "white"
                      : "#111827",
                  padding: "15px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.text}
                <div
  style={{
    marginTop: "8px",
    fontSize: "11px",
    opacity: 0.7,
    textAlign: "right",
  }}
>
  {message.time}
</div>

{message.role === "assistant" && (
  <button
    onClick={() =>
      navigator.clipboard.writeText(message.text)
    }
    style={{
      marginTop: "10px",
      background: "#4f46e5",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "12px",
    }}
  >
    📋 Copy
  </button>
)}

{message.role === "assistant" && (
  <div
    style={{
      marginTop: "10px",
      display: "flex",
      gap: "10px",
    }}
  >
    <button
      style={{
        border: "none",
        background: "#22c55e",
        color: "white",
        padding: "5px 10px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      👍 Helpful
    </button>

    <button
      style={{
        border: "none",
        background: "#ef4444",
        color: "white",
        padding: "5px 10px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      👎 Not Helpful
    </button>
  </div>
)}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div
  style={{
    marginTop: "30px",
    background: "white",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
  }}
>
       
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "25px",
  }}
>
  {[
    "Summarize customer feedback",
    "Why are customers unhappy?",
    "What are the top complaints?",
    "Give business recommendations",
    "How can customer satisfaction improve?",
  ].map((item) => (
    <button
      key={item}
      onClick={() => setQuestion(item)}
      style={{
        padding: "12px 20px",
        borderRadius: "25px",
        border: "2px solid #6366f1",
        background: "white",
        color: "#4f46e5",
        cursor: "pointer",
      }}
    >
      {item}
    </button>
  ))}
</div>

       <input
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") sendMessage();
  }}
  placeholder="Ask about customer feedback..."
 style={{
  width: "100%",
  flex: 1,
  minWidth: 0,
  padding: "18px 20px",
  borderRadius: "14px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  outline: "none",
}}
/>

<div
  style={{
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #e5e7eb",
  }}
>

        <button
  onClick={sendMessage}
  disabled={loading}
  style={{
    width: "140px",
    height: "55px",
    borderRadius: "14px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
  }}
>
  {loading ? "Thinking..." : "Send"}
</button>
</div>
      </div>

      
    </main>
  );
}