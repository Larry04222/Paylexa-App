import React from 'react';

const events = [
  { id: 'evt-1', type: 'LOGIN_RISK', detail: 'High-risk login from Lagos, Nigeria — OTP enforced.', severity: 'High' },
  { id: 'evt-2', type: 'SWAP_ALERT', detail: 'Unusual USD→CAD swap size flagged for CFO review.', severity: 'Medium' },
  { id: 'evt-3', type: 'DOWNTIME', detail: 'Hostinger mirror sync delayed by 4 minutes, auto-recovered.', severity: 'Low' },
];

export const SecurityCenterPage = () => (
  <div>
    <h2 className="text-3xl font-semibold text-darkGold">Morphon-X Sentinel</h2>
    <p className="mt-2 max-w-2xl text-sm text-[#B3C0FF]">
      Monitor anomaly detection, IP locks, and downtime pings across Paylexa regions. Configure allowlists and feature kill-switches from here.
    </p>
    <div className="mt-6 space-y-4">
      {events.map((event) => (
        <article key={event.id} className="rounded-3xl border border-royalBlue/30 bg-[#121427]/70 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{event.type}</h3>
              <p className="mt-1 text-sm text-[#D4DBFF]">{event.detail}</p>
            </div>
            <span className="rounded-full border border-darkGold px-4 py-1 text-xs font-semibold text-darkGold">{event.severity}</span>
          </div>
        </article>
      ))}
    </div>
  </div>
);
