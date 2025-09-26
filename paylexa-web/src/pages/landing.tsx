import { Hero } from "../components/hero";
import { FeatureGrid } from "../components/feature-grid";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      <Hero />
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <FeatureGrid />
      </main>
    </div>
  );
};
