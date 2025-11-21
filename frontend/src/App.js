import React, { useState } from 'react';
import LayoutShell from './components/LayoutShell';
import ChatPanel from './components/ChatPanel';
import SummaryPanel from './components/SummaryPanel';
import TrendChartPanel from './components/TrendChartPanel';
import DataTablePanel from './components/DataTablePanel';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app-shell">
      <LayoutShell>
        <div className="row g-4">
          {/* Left: Chat / Query panel */}
          <div className="col-12 col-lg-4">
            <ChatPanel
              onResult={setResult}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          {/* Right: Summary + chart + table */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-3">
            <SummaryPanel result={result} loading={loading} />
            <TrendChartPanel result={result} />
            <DataTablePanel result={result} />
          </div>
        </div>
      </LayoutShell>
    </div>
  );
}

export default App;

