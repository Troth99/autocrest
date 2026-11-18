import { HowItWorksSection } from "@/features/marketing";

export default function HowItWorksPage() {
  return (
    <main className="marketing-home w-full py-10 text-text-primary">
      <div className="mx-auto max-w-[112rem] px-4 sm:px-6">
        <h1 className="page-title">How it works</h1>
        <p className="mt-3 section-description">
          Build your garage and keep a clear record of your vehicle ownership.
        </p>
      </div>
      <HowItWorksSection />
    </main>
  );
}
