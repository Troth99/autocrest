import HeroSection from "@/features/marketing/components/HeroSection/HeroSection";
import HowItWorksSection from "@/features/marketing/components/HowItWorksSection/HowItWorksSection";
import ModulesSection from "@/features/marketing/components/ModulesSection/ModulesSection";
import TimelineSection from "@/features/marketing/components/TimelineSection/TimelineSection";

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
