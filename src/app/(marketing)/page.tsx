import {
  HeroSection,
  HowItWorksSection,
  ModulesSection,
  TimelineSection,
} from "@/features/marketing";

export default function Home() {
  return (
    <div className="min-h-screen text-text-primary">
      {/* Hero */}
      <HeroSection />
      {/* Modules */}
      <ModulesSection />
      {/* How it works */}
      <HowItWorksSection />
      {/* Timeline */}
      <TimelineSection />
    </div>
  );
}
