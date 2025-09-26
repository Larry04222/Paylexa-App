import Link from "next/link";
import { Button } from "../components/ui/button";

const HomePage = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-10 px-6 py-16">
      <section className="space-y-4 rounded-[2rem] border border-brand-white/10 bg-gradient-to-br from-brand-black via-brand-royal to-brand-black p-12 shadow-brand">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">Morphon-X Command</p>
        <h1 className="text-4xl font-semibold text-brand-white sm:text-5xl">
          Operate Paylexa with precision and grace
        </h1>
        <p className="max-w-2xl text-base text-brand-white/70">
          Review Morphon-X alerts, orchestrate feature toggles across countries, and keep investor dashboards tuned to live
          liquidity, growth, and compliance metrics.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-brand-gold text-brand-black hover:bg-brand-emerald hover:text-brand-white">
            <Link href="/dashboard">Open dashboard</Link>
          </Button>
          <Button variant="outline" asChild className="border-brand-white/30 text-brand-white hover:border-brand-white/60">
            <Link href="/auth/sign-in">Sign in</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
