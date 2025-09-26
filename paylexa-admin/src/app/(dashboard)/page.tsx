import { Button } from "../../components/ui/button";

const DashboardPage = () => {
  return (
    <section className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-8 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-brand-white">Security & Liquidity Overview</h1>
        <p className="text-sm text-brand-white/70">
          Monitor Morphon-X alerts, wallet liquidity, and feature toggles across countries.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-[2rem] border border-brand-white/10 bg-brand-black/70 p-6 shadow-brand">
          <h2 className="text-lg font-semibold text-brand-gold">Morphon-X alerts</h2>
          <p className="mt-2 text-sm text-brand-white/70">
            Integrate login, swap, and escrow telemetry to surface risk scoring in real time.
          </p>
          <Button className="mt-4 bg-brand-emerald text-brand-white hover:bg-brand-gold hover:text-brand-black">
            View security log
          </Button>
        </article>
        <article className="rounded-[2rem] border border-brand-white/10 bg-brand-black/70 p-6 shadow-brand">
          <h2 className="text-lg font-semibold text-brand-gold">Liquidity snapshot</h2>
          <p className="mt-2 text-sm text-brand-white/70">
            Wallet balances across USD, CAD, NGN plus outstanding escrow liabilities.
          </p>
        </article>
      </div>
    </section>
  );
};

export default DashboardPage;
