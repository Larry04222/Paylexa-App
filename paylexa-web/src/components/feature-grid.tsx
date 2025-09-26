const FEATURES = [
  {
    title: "Morphon-X intelligence",
    description: "Real-time risk scoring across logins, swaps, escrow releases, and downtime monitors.",
  },
  {
    title: "Escrowed marketplaces",
    description: "Luxury buyer and seller journeys with automated dispute handling and fee orchestration.",
  },
  {
    title: "Multi-currency vaults",
    description: "USD, CAD, NGN wallets with instant swaps, statements, and atomic reconciliation.",
  },
];

export const FeatureGrid = () => (
  <section className="grid gap-6 sm:grid-cols-3">
    {FEATURES.map((feature) => (
      <article
        key={feature.title}
        className="rounded-[2rem] border border-brand-white/10 bg-brand-black/60 p-6 shadow-brand backdrop-blur"
      >
        <h3 className="text-lg font-semibold text-brand-white">{feature.title}</h3>
        <p className="mt-2 text-sm text-brand-white/70">{feature.description}</p>
      </article>
    ))}
  </section>
);
