import HeroSection from "@/components/Home/HeroSection/HeroSection";
import ModulesSection from "@/components/Home/ModulesSection/ModulesSection";
import HowItWorksSection from "@/components/Home/HowItWorksSection/HowItWorksSection";
import TimelineSection from "@/components/Home/TimelineSection/TimelineSection";

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
