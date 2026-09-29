import { CircleCheck } from "lucide-react";
import { CompletionStep, SectionHeading } from "./profile-ui";

export default function ProfileCompletionCard({
  avatarUrl,
  fullName,
  phone,
  hasLocation,
  bio,
}: {
  avatarUrl: string | null;
  fullName: string | null;
  phone: string | null;
  hasLocation: boolean;
  bio: string | null;
}) {
  const steps = [
    { label: "Add a profile photo", complete: Boolean(avatarUrl) },
    { label: "Add your full name", complete: Boolean(fullName?.trim()) },
    { label: "Add a phone number", complete: Boolean(phone?.trim()) },
    { label: "Add your location", complete: hasLocation },
    { label: "Write a short bio", complete: Boolean(bio?.trim()) },
  ];
  const completedSteps = steps.filter((step) => step.complete).length;
  const completionPercentage = Math.round(
    (completedSteps / steps.length) * 100,
  );

  return (
    <section className="content-card rounded-3xl p-6 sm:p-7">
      <SectionHeading
        icon={<CircleCheck />}
        title="Complete your profile"
        subtitle="Add your personal details to finish setting up your account."
      />
      <div className="mt-6 rounded-2xl border border-line bg-input/45 p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-text-primary">
            {completedSteps} of {steps.length} complete
          </p>
          <span className="text-xs font-semibold text-accent-text">
            {completionPercentage}%
          </span>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-label="Profile completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completionPercentage}
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-sky-400 to-lime-300 shadow-hero-progress transition-[width] duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="mt-5 space-y-3">
          {steps.map((step) => (
            <CompletionStep
              key={step.label}
              label={step.label}
              complete={step.complete}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
