import { CircleCheck } from "lucide-react";
import { CompletionStep, SectionHeading } from "./profile-ui";

export default function ProfileCompletionCard({
  emailConfirmed,
}: {
  emailConfirmed: boolean;
}) {
  return (
    <section className="content-card rounded-3xl p-6 sm:p-7">
      <SectionHeading
        icon={<CircleCheck />}
        title="Profile completion"
        subtitle="A few details help personalise your garage."
      />
      <div className="mt-6 rounded-2xl border border-line bg-input/45 p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-text-primary">
            2 of 3 complete
          </p>
          <span className="text-xs font-semibold text-accent-text">67%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-2/3 rounded-full bg-linear-to-r from-sky-400 to-lime-300 shadow-hero-progress" />
        </div>
        <div className="mt-5 space-y-3">
          <CompletionStep label="Account created" complete />
          <CompletionStep label="Email verified" complete={emailConfirmed} />
          <CompletionStep label="Add your first vehicle" />
        </div>
      </div>
    </section>
  );
}
