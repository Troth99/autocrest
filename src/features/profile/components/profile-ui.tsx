import type { ReactNode } from "react";
import { Check } from "lucide-react";

export function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-info-soft text-info [&>svg]:size-5">
        {icon}
      </span>
      <div>
        <h2 className="text-lg font-semibold tracking text-text-primary">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

export function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-4 first:pt-4 last:pb-4">
      <span className="text-subtle [&>svg]:size-4">{icon}</span>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="ml-auto max-w-[58%] truncate text-right text-sm font-semibold text-text-primary">
        {value}
      </dd>
    </div>
  );
}

export function CompletionStep({
  label,
  complete = false,
}: {
  label: string;
  complete?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span
        className={`flex size-5 items-center justify-center rounded-full ${complete ? "bg-accent text-ink" : "border border-line text-subtle"}`}
      >
        {complete && <Check className="size-3.5" />}
      </span>
      <span className={complete ? "text-text-secondary" : "text-muted"}>
        {label}
      </span>
    </div>
  );
}

export function StatusRow({
  icon,
  title,
  description,
  tone,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  tone: "good" | "neutral";
}) {
  const isGood = tone === "good";
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-input/45 p-4">
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${isGood ? "bg-accent/10 text-accent-text" : "bg-info-soft text-info"} [&>svg]:size-4`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
      </div>
    </div>
  );
}

export function QuickAction({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-input/45 p-5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-info-soft text-info [&>svg]:size-4">
        {icon}
      </span>
      <p className="mt-4 text-sm font-semibold text-text-primary">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}

export function getInitials(name: string, email: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length > 1)
    return `${words[0][0]}${words.at(-1)?.[0]}`.toUpperCase();
  if (words[0]) return words[0].slice(0, 2).toUpperCase();
  return email.slice(0, 2).toUpperCase();
}
