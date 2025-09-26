import React from 'react';

const milestones = [
  {
    title: 'Milestone 1 — Core Wallet + Auth',
    summary: 'Registration, 2FA login, USD/CAD/NGN wallets, KYC layers, and statements.',
  },
  {
    title: 'Milestone 3 — P2P Exchange',
    summary: 'Escrowed offers, in-trade chat, disputes, and audit logging.',
  },
  {
    title: 'Milestone 6 — Marketplace',
    summary: 'Luxury goods escrow, Phoenix dispute desk, and dynamic fees.',
  },
  {
    title: 'Milestone 11 — Morphon-X Integration',
    summary: 'AI anomaly detection across swaps, logins, and downtime.',
  },
  {
    title: 'Milestone 13 — Investor Command Center',
    summary: 'Liquidity intelligence, country toggles, and downtime sentry.',
  },
];

export const Roadmap = () => (
  <section id="roadmap" className="mx-auto mt-24 max-w-4xl px-6">
    <h2 className="text-center text-3xl font-semibold text-darkGold">Milestone Journey</h2>
    <ol className="mt-12 space-y-6">
      {milestones.map((milestone) => (
        <li
          key={milestone.title}
          className="rounded-3xl border border-emerald/40 bg-[#101326]/70 px-6 py-5 text-left shadow-lg shadow-emerald/20"
        >
          <h3 className="text-xl font-semibold text-phoenixWhite">{milestone.title}</h3>
          <p className="mt-2 text-sm text-[#B3C0FF]">{milestone.summary}</p>
        </li>
      ))}
    </ol>
  </section>
);
