import React, { useState } from "react";
import axios from "axios";

export default function ChatPanel({ onResult, loading, setLoading }) {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() && !file) {
      alert("Please enter a query or upload a file.");
      return;
    }

    const form = new FormData();
    if (query.trim()) form.append("query", query.trim());
    if (file) form.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/api/query/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResult(res.data);
    } catch (err) {
      console.error(err);
      alert(
        "Something went wrong while fetching analysis. Check backend and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <div className="sidebar-title mb-2">Query builder</div>
        <h5 className="mb-3">Ask about any locality</h5>
        <p
          className="mb-3"
          style={{ fontSize: 14, lineHeight: "1.6", color: "#e5e7eb" }}
        >
          Examples:
          <br />
          • “Give me analysis of Wakad”
          <br />
          • “Compare Ambegaon Budruk and Aundh demand trends”
          <br />• “Show price growth for Akurdi over the last 3 years”
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-2">
        <div className="mb-2">
          <label className="form-label" style={{ fontSize: 13 }}>
            Query
          </label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="e.g., Give me analysis of Wakad"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              fontSize: 14,
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#ffffff",
              borderColor: "#4b5563",
            }}
          />
        </div>

        <div className="mb-3">
          <label
            className="form-label d-flex justify-content-between align-items-center"
            style={{ fontSize: 13 }}
          >
            Excel file (optional)
            <span className="text-muted" style={{ fontSize: 11 }}>
              Uses default dataset if empty
            </span>
          </label>
          <input
            type="file"
            accept=".xlsx,.xls"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              fontSize: 13,
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              border: "1px solid #4b5563",
              padding: "8px",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn primary-btn primary-btn-main w-100"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Run analysis"}
        </button>

        <div className="mt-2 text-muted" style={{ fontSize: 11 }}>
          Your data is processed locally for this assignment demo.
        </div>
      </form>
    </div>
  );
}
