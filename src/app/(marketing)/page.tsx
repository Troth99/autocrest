import {
  HeroSection,
  HowItWorksSection,
  ModulesSection,
  OwnershipSection,
  StartGarageSection,
} from "@/features/marketing";

export default function Home() {
  return (
    <div className="marketing-home min-h-screen pb-4 text-text-primary">
      {/* Hero */}
      <HeroSection />
      {/* Modules */}
      <ModulesSection />
      {/* How it works */}
      <HowItWorksSection />
      {/* Ownership */}
      <OwnershipSection />
      <StartGarageSection />
    </div>
  );
}
