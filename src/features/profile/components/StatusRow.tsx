import type { ReactNode } from "react";

export default function StatusRow({
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
