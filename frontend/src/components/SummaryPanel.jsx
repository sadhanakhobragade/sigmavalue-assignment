import React from "react";

export default function SummaryPanel({ result, loading }) {
  return (
    <div className="glass-card p-3 p-md-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <div className="sidebar-title mb-1">Insight summary</div>
          <div className="summary-highlight">
            {result
              ? "LLM-style natural language overview"
              : "Run a query to see locality insights"}
          </div>
        </div>
        {loading && (
          <span className="badge bg-secondary border border-light-subtle">
            Processing…
          </span>
        )}
      </div>

      <div style={{ fontSize: 14, lineHeight: 1.5, color: "#ffffff" }}>
        {result ? (
          result.summary
        ) : (
          <span style={{ color: "#848890" }}>
            Once you run an analysis, a concise summary of price and demand
            trends for the selected locality will appear here.
          </span>
        )}
      </div>
    </div>
  );
}
