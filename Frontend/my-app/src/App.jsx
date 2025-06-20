import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMessage = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:8080/hello");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMessage(data.message);
    } catch (e) {
      setMessage("Error: Could not reach backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#E0F7FF", // very light sky blue
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <button
        onClick={fetchMessage}
        disabled={loading}
        style={{
          backgroundColor: "#004080", // dark blue
          color: "white",
          fontSize: "18px",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={e => !loading && (e.target.style.backgroundColor = "#003366")}
        onMouseLeave={e => !loading && (e.target.style.backgroundColor = "#004080")}
      >
        {loading ? "Loading..." : "Click here to get message"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "30px",
            fontSize: "24px",
            fontWeight: "600",
            color: "#003366",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: "1.3",
            userSelect: "text",
            animation: "fadeIn 0.8s ease forwards",
          }}
        >
          {message}
        </p>
      )}

      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(15px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
