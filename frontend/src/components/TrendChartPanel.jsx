import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export default function TrendChartPanel({ result }) {
  if (!result || !result.chart_data || result.chart_data.labels.length === 0) {
    return (
      <div className="glass-card p-3">
        <div className="sidebar-title mb-1">Price & demand trends</div>
        <div style={{ fontSize: 13, color: "#848890" }}>
          Trend lines will appear here once you run a query that returns data.
        </div>
      </div>
    );
  }

  const { labels, price, demand } = result.chart_data;

  const data = {
    labels,
    datasets: [
      {
        label: "Average price",
        data: price,
        borderWidth: 2,
        tension: 0.3,
        yAxisID: "y",
      },
      {
        label: "Total demand",
        data: demand,
        borderWidth: 2,
        borderDash: [4, 4],
        tension: 0.3,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        position: "left",
        grid: { color: "#1f2937" },
      },
      y1: {
        position: "right",
        grid: { display: false },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="glass-card p-3">
      <div className="sidebar-title mb-1">Price & demand trends</div>
      <div style={{ fontSize: 13, color: "#e5e7eb" }} className="mb-2">
        Visualizing how prices and demand evolve across years for the selected
        locality.
      </div>

      <Line data={data} options={options} />
    </div>
  );
}
