import HeroSection from "@/components/Home/HeroSection";
import ModulesSection from "@/components/Home/ModulesSection";
import HowItWorksSection from "@/components/Home/HowItWorksSection";
import TimeLineSection from "@/components/Home/TimeLineSection";

export default function Home() {
  return (
    <div className="dt-hero min-h-screen text-slate-100">
      {/* Hero */}
      <HeroSection />
      {/* Modules */}
      <ModulesSection />

      {/* How it works */}
      <HowItWorksSection />

      {/* Timeline */}
      <TimeLineSection />

    </div>
  );
}
