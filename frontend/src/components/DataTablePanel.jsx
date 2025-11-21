import React from "react";
import { saveAs } from "file-saver";

function toCSV(rows) {
  if (!rows || rows.length === 0) return "";
  const keys = Object.keys(rows[0]);
  const header = keys.join(",");
  const lines = rows.map((row) =>
    keys
      .map((k) => `"${(row[k] ?? "").toString().replace(/"/g, '""')}"`)
      .join(",")
  );
  return [header, ...lines].join("\n");
}

export default function DataTablePanel({ result }) {
  const rows = result?.table || [];

  const handleDownload = () => {
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "filtered_locality_data.csv");
  };

  return (
    <div className="glass-card p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="sidebar-title mb-1">Filtered dataset</div>
        <button
          className="btn btn-sm primary-btn"
          style={{
            background: "rgba(34,211,238,0.15)",
            border: "1px solid #22d3ee",
            color: "#22d3ee",
            borderRadius: "999px",
          }}
          disabled={!rows.length}
          onClick={handleDownload}
        >
          Download CSV
        </button>
      </div>

      {!rows.length ? (
        <div style={{ fontSize: 13, color: "#848890" }}>
          Once a query returns data, the matching rows from your Excel dataset
          will appear here.
        </div>
      ) : (
        <div className="table-container mt-2">
          <table className="table table-dark table-striped table-hover table-dark-custom mb-0">
            <thead>
              <tr>
                {Object.keys(rows[0]).map((key) => (
                  <th key={key} style={{ fontSize: 12 }}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  {Object.keys(row).map((key) => (
                    <td key={key} style={{ fontSize: 12 }}>
                      {row[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
