export const Hero = () => (
  <header className="relative overflow-hidden bg-gradient-to-b from-brand-black via-brand-royal to-brand-black py-24 text-center text-brand-white">
    <div className="absolute inset-0 opacity-20 blur-3xl" aria-hidden>
      <div className="mx-auto h-full w-2/3 rounded-full bg-gradient-to-br from-brand-gold via-brand-emerald to-brand-royal" />
    </div>
    <div className="relative mx-auto flex max-w-4xl flex-col gap-6 px-6">
      <span className="text-xs uppercase tracking-[0.4em] text-brand-gold">Morphon-X Secured Fintech</span>
      <h1 className="text-4xl font-semibold sm:text-6xl">Borderless luxury finance for bold operators</h1>
      <p className="text-base text-brand-white/70 sm:text-lg">
        Paylexa orchestrates wallets, escrow, swaps, merchants, and Morphon-X AI security to deliver effortless global money
        movement.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button className="rounded-full bg-brand-gold px-8 py-3 text-sm font-semibold text-brand-black shadow-lg shadow-brand-gold/40 transition hover:bg-brand-emerald hover:text-brand-white">
          Explore roadmap
        </button>
        <button className="rounded-full border border-brand-white/30 px-8 py-3 text-sm font-semibold text-brand-white transition hover:border-brand-white/60">
          Request private beta
        </button>
      </div>
    </div>
  </header>
);
