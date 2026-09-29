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
      {/* How it works */}
      <HowItWorksSection />
      {/* Modules */}
      <ModulesSection />
      {/* Timeline */}
      <TimelineSection />
    </div>
  );
}
