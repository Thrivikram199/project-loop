
import Link from "next/link";

export default function Home() {
  const features = [
    { icon: "🤖", title: "AI Sentiment", text: "Automatically classify customer reviews." },
    { icon: "🏷️", title: "Theme Detection", text: "Detect Delivery, Product, Support and Pricing issues." },
    { icon: "📊", title: "Dashboard", text: "Interactive analytics with charts and KPIs." },
    { icon: "📄", title: "Reports", text: "Generate Voice of Customer reports instantly." },
  ];

  const steps = [
    "Upload Feedback CSV",
    "AI analyzes reviews",
    "View Dashboard",
    "Download Reports",
  ];

  const stats = [
    ["1000+","Reviews"],
    ["95%","Accuracy"],
    ["6","Themes"],
    ["24/7","Analysis"],
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
          <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
  }}
>
  <img
    src="/logo.png"
    alt="Loop Logo"
    width={80}
    height={80}
  />

  <h1
    style={{
      margin: 0,
      fontSize: "35px",   // Increase text size
      fontWeight: "700",
      color: "#4f46e5",
      letterSpacing: "1px",
      lineHeight: 1,
    }}
  >
    LOOP
  </h1>
</div>
         
          <div className="flex gap-3">
            <a
  href="/login"
  style={{
    color: "#4f46e5",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "600",
    padding: "12px 20px",
    display: "inline-block",
  }}
>
  Login
</a>
            <a
  href="/register"
  style={{
    color: "#4f46e5",
    padding: "10px 20px",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "600",
    display: "inline-block",
  }}
>
  Register
</a>
          </div>
        </div>
      </nav>

      <section
  className="min-h-[85vh] flex items-center justify-center bg-[#eef2ff]"
>
  <div className="max-w-4xl text-center px-6">

    <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold mb-6">
      AI Powered Platform
    </span>

    <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">
      AI Customer
      <br />
      Feedback
      <br />
      Intelligence Platform
    </h1>

    <p className="mt-8 text-xl text-slate-600 leading-9">
      Transform customer reviews into actionable business insights using
      Artificial Intelligence. Analyze sentiment, discover themes,
      visualize dashboards and generate reports.
    </p>

    <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "60px",
    marginTop: "35px",
    marginBottom: "40px",
    fontSize: "24px",
    fontWeight: 500,
    color: "#334155",
  }}
>
  <div style={{ textAlign: "left", lineHeight: "2.3" }}>
    <div>✔ Sentiment Analysis</div>
    <div>✔ Dashboard Analytics</div>
  </div>

  <div style={{ textAlign: "left", lineHeight: "2.3" }}>
    <div>✔ Theme Detection</div>
    <div>✔ Voice of Customer Reports</div>
  </div>
</div>

    <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    marginTop: "20px",
  }}
>
  <a
    href="/register"
    style={{
      background: "#4f46e5",
      color: "white",
      padding: "16px 42px",
      borderRadius: "999px",
      fontSize: "22px",
      fontWeight: "bold",
      textDecoration: "none",
      boxShadow: "0 8px 20px rgba(79,70,229,.3)",
    }}
  >
    Get Started
  </a>

  <a
    href="/login"
    style={{
      border: "2px solid #4f46e5",
      color: "#4f46e5",
      padding: "16px 42px",
      borderRadius: "999px",
      fontSize: "22px",
      fontWeight: "bold",
      textDecoration: "none",
      background: "white",
    }}
  >
    Login
  </a>
</div>

  </div>
</section>

<section
  id="features"
  className="bg-white py-28"
  style={{
    marginTop: "100px",
    marginBottom: "140px",
    borderRadius: "30px",
  }}
>
  <div className="max-w-7xl mx-auto px-10">
    <h2 className="text-5xl font-bold text-center">
      Features
    </h2>

    <p className="text-center text-slate-500 mt-4 text-xl">
      Everything you need to analyze customer feedback
    </p>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "30px",
        marginTop: "60px",
      }}
    ></div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
      {features.map((f) => (
        <div
          key={f.title}
          className="bg-slate-50 rounded-2xl p-8 shadow-lg hover:-translate-y-2 transition duration-300"
        >
          <div className="text-5xl">
            {f.icon}
          </div>

          <h3 className="text-2xl font-bold mt-6">
            {f.title}
          </h3>

          <p className="mt-4 text-slate-600 leading-8">
            {f.text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

<section
  id="how"
  className="py-32 bg-slate-50"
   style={{
    maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 30px",
  }}
>
  <div className="max-w-6xl mx-auto px-10">
     <h2 className="text-5xl font-bold text-center">
      How LOOP Works
    </h2>

    <p className="text-center text-slate-500 text-xl mt-4">
      Upload feedback and let AI generate insights automatically.
    </p>
     <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "30px",
        marginTop: "60px",
      }}
    ></div>

    <div className="grid md:grid-cols-4 gap-10 mt-16">
      {steps.map((s, i) => (
        <div
          key={s}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <div className="text-5xl font-bold text-indigo-600">
            {i + 1}
          </div>

          <p className="mt-5 text-lg">
            {s}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

<section
  id="stats"
  className="bg-indigo-600 text-white py-24"
   style={{
    marginTop: "140px",
    marginBottom: "140px",
    borderRadius: "30px",
  }}
>
  <div className="max-w-7xl mx-auto px-10">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
      {stats.map(([n, l]) => (
        <div key={l}>
          <div className="text-6xl font-bold">
            {n}
          </div>

          <div className="mt-4 text-2xl">
            {l}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<footer className="bg-slate-900 text-white py-20">
  <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-3 gap-20">

    <div>
      <h2 className="text-4xl font-bold text-indigo-400">
        LOOP
      </h2>

      <p className="mt-6 text-slate-400 leading-8">
        AI Customer Feedback Intelligence Platform that transforms
        customer reviews into actionable business insights.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold">
        Quick Links
      </h3>

      <div className="flex flex-col gap-4 mt-6 text-lg">
        <a href="#features" className="hover:text-indigo-400">
          Features
        </a>

        <a href="#how" className="hover:text-indigo-400">
          How it Works
        </a>

        <a href="#stats" className="hover:text-indigo-400">
          Statistics
        </a>
      </div>
    </div>

    <div>
      <h3 className="text-2xl font-bold">
        Contact
      </h3>

      <p className="mt-6 text-lg">
        support@projectloop.ai
      </p>

      <p className="mt-3 text-slate-400">
        Hyderabad, India
      </p>
    </div>

  </div>

  <hr className="border-slate-700 my-12" />

  <div className="text-center text-slate-400 text-lg">
    © 2026 LOOP. All Rights Reserved.
  </div>
</footer>
    </main>
  );
}
