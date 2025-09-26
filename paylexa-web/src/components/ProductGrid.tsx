import React from 'react';

const modules = [
  {
    title: 'Multi-Currency Wallets',
    description: 'USD, CAD, NGN live balances with double-entry ledgers and instant statements.',
  },
  {
    title: 'Escrowed P2P & Marketplace',
    description: 'AI-guarded escrow for currency trades and luxury goods with Phoenix dispute center.',
  },
  {
    title: 'Paylexa Swap Engine',
    description: 'B2C swaps at Paylexa rates with configurable fees, limits and Morphon-X alerts.',
  },
  {
    title: 'Merchant & B2B Suite',
    description: 'Business KYC, API keys, invoicing, automated settlements, and per-country toggles.',
  },
  {
    title: 'Student & Utilities',
    description: 'Tuition payments, country-based bills, airtime/data, and betting top-ups.',
  },
  {
    title: 'Morphon-X AI Security',
    description: 'Behavior analytics, IP lock, downtime sentry, and anomaly detection everywhere.',
  },
];

export const ProductGrid = () => (
  <section id="modules" className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2">
    {modules.map((module) => (
      <article
        key={module.title}
        className="rounded-phoenix border border-royalBlue/40 bg-[#111325]/70 p-8 shadow-phoenix transition hover:border-darkGold/80"
      >
        <h2 className="text-2xl font-semibold text-darkGold">{module.title}</h2>
        <p className="mt-3 text-base text-[#E2E6FF]/80">{module.description}</p>
      </article>
    ))}
  </section>
);
