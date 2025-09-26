import React from 'react';

const metrics = [
  { label: 'Total Wallet Liquidity', value: '$42,500,000', trend: '+4.6%' },
  { label: 'Escrow Exposure', value: '$3,250,000', trend: '+1.2%' },
  { label: 'Morphon Alerts (24h)', value: '4', trend: '-33%' },
];

export const DashboardPage = () => (
  <div>
    <h2 className="text-3xl font-semibold text-darkGold">Executive Overview</h2>
    <p className="mt-2 max-w-2xl text-sm text-[#B3C0FF]">
      Track liquidity, risk signals, and feature toggles in real-time. All metrics stream from the Node.js services guarded by Morphon-X.
    </p>
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {metrics.map((metric) => (
        <article key={metric.label} className="rounded-3xl border border-emerald/40 bg-[#121427]/70 p-6 shadow-lg shadow-emerald/10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#93B4FF]">{metric.label}</p>
          <p className="mt-4 text-2xl font-semibold text-white">{metric.value}</p>
          <span className="mt-2 inline-block rounded-full bg-emerald/20 px-3 py-1 text-xs font-semibold text-emerald">{metric.trend}</span>
        </article>
      ))}
    </div>
  </div>
);
