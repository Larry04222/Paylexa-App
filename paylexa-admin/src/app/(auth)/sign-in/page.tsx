import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const SignInPage = () => {
  return (
    <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-brand-white">Sign in to Paylexa</h1>
        <p className="text-sm text-brand-white/70">Morphon-X secured access for compliance, finance, and investor teams.</p>
      </div>
      <form className="space-y-4">
        <Input type="email" placeholder="you@paylexa.com" label="Email" required />
        <Input type="password" placeholder="••••••••" label="Password" required />
        <Button className="w-full bg-brand-gold text-brand-black hover:bg-brand-emerald hover:text-brand-white" type="submit">
          Continue
        </Button>
      </form>
      <p className="text-center text-xs text-brand-white/60">
        Need an account? <Link href="/auth/request" className="text-brand-emerald">Request access</Link>
      </p>
    </section>
  );
};

export default SignInPage;
