import HeroSection from "./_components/HeroSection/HeroSection";
import ModulesSection from "./_components/ModulesSection/ModulesSection";
import HowItWorksSection from "./_components/HowItWorksSection/HowItWorksSection";
import TimelineSection from "./_components/TimelineSection/TimelineSection";

export default function Home() {
  return (
    <div className="min-h-screen text-slate-100">
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
