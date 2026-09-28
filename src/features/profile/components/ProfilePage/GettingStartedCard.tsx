import { BellRing, CarFront, Gauge } from "lucide-react";
import { OnboardingStep, SectionHeading } from "./profile-ui";

export default function GettingStartedCard() {
  return <section className="content-card rounded-3xl p-6 sm:p-7"><SectionHeading icon={<CarFront />} title="Getting started" subtitle="Set up the essentials for your first vehicle." /><div className="mt-6 space-y-3"><OnboardingStep icon={<CarFront />} title="Add your first vehicle" /><OnboardingStep icon={<Gauge />} title="Record the current mileage" /><OnboardingStep icon={<BellRing />} title="Set a maintenance reminder" /></div></section>;
}
