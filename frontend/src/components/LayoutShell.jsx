import React from "react";

export default function LayoutShell({ children }) {
  return (
    <div className="glass-card p-3 p-md-4">
      {/* Top navbar / header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <div className="accent-pill">
            <span
              className="rounded-circle"
              style={{ width: 8, height: 8, backgroundColor: "#22c55e" }}
            />
            Real Estate Intelligence
          </div>
          <h2 className="mt-2 mb-1">
            <span className="nav-brand">
              Sigma<span className="nav-highlight">Value</span> Locality
              Insights
            </span>
          </h2>
          <div style={{ fontSize: 13, color: "#e5e7eb" }}>
            Ask locality-based questions and get instant analysis from your
            real-estate dataset.
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <div className="badge-chip">Django · React · Chart.js</div>
          <div className="badge-chip">Excel-powered</div>
        </div>
      </div>

      {children}
    </div>
  );
}
