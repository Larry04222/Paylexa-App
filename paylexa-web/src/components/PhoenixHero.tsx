import React from 'react';

import heroAurora from '../styles/hero-aurora.module.css';

export const PhoenixHero = () => (
  <header className="relative overflow-hidden px-6 pb-24 pt-32 text-center md:px-12">
    <div className={heroAurora.glow} aria-hidden="true" />
    <div className="mx-auto max-w-4xl">
      <p className="mb-4 text-sm uppercase tracking-[0.5em] text-darkGold">Paylexa</p>
      <h1 className="text-4xl font-semibold text-phoenixWhite md:text-6xl">
        Luxury-grade cross-border wallet &amp; Morphon-X protected exchange
      </h1>
      <p className="mt-6 text-lg text-[#D5D9FF]/80 md:text-xl">
        Orchestrate USD, CAD, NGN and beyond with escrowed P2P markets, merchant suites, and AI guardianship.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
        <a
          href="#modules"
          className="rounded-phoenix bg-gradient-to-r from-darkGold via-emerald to-royalBlue px-8 py-3 text-base font-semibold text-phoenixBlack shadow-phoenix transition hover:scale-[1.02]"
        >
          Explore modules
        </a>
        <a
          href="#roadmap"
          className="rounded-phoenix border border-darkGold px-8 py-3 text-base font-semibold text-darkGold transition hover:bg-darkGold/10"
        >
          View roadmap
        </a>
      </div>
    </div>
  </header>
);
