import type { ProfileCompletionProps } from "@/features/profile/types/ProfileCompletion.types";
import Link from "next/link";
import { ArrowRight, Check, Circle } from "lucide-react";

export default function ProfileCompletion({
  user,
}: ProfileCompletionProps) {
  const fields = [
    { label: "Full name", value: user.fullName },
    { label: "Username", value: user.username },
    { label: "Profile photo", value: user.avatarUrl },
    { label: "Phone number", value: user.phone },
    { label: "City", value: user.city },
    { label: "Bio", value: user.bio },
  ];
  const steps = fields.map(({ label, value }) => ({
      label,
      complete: Boolean(value?.trim()),
      href: "/profile/edit",
    }));

  const completedCount = steps.filter((step) => step.complete).length;
  const percentage = Math.round((completedCount / steps.length) * 100);
  return (
    <section className="panel-card p-5" aria-labelledby="setup-heading">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id="setup-heading" className="section-title">
            Complete your profile
          </h2>
          <p className="mt-1 text-xs leading-5 text-muted">
            A few details to make AutoCrest yours.
          </p>
        </div>
        <span className="rounded-lg bg-accent/10 px-2.5 py-1.5 text-sm font-semibold text-accent-text">
          {percentage}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="Profile completion"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-4 h-2 overflow-hidden rounded-full bg-input"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted">
        {completedCount} of {steps.length} steps completed
      </p>
      <ul className="mt-5 divide-y divide-line">
        {steps.map(({ label, complete, href }) => (
          <li key={label} className="flex items-center gap-3 py-3 text-sm">
            {complete ? (
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-text">
                <Check className="size-3.5" aria-hidden="true" />
              </span>
            ) : (
              <Circle
                className="mx-1 size-4 shrink-0 text-subtle"
                aria-hidden="true"
              />
            )}
            <span
              className={
                complete ? "text-muted" : "font-medium text-text-primary"
              }
            >
              {label}
            </span>
            {complete ? (
              <span className="sr-only">Completed</span>
            ) : (
              <Link
                href={href}
                aria-label={`Add ${label.toLowerCase()}`}
                className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-info transition-colors hover:bg-info-soft focus-visible:outline-2 focus-visible:outline-focus"
              >
                Add <ArrowRight className="size-3" aria-hidden="true" />
              </Link>
            )}
          </li>
        ))}
      </ul>
      {percentage === 100 && (
        <p className="mt-4 rounded-xl bg-accent/10 p-3 text-sm text-accent-text">
          Your profile is complete.
        </p>
      )}
    </section>
  );
}
