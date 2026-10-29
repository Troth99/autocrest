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
  return (
    <div className="profile-status-card">
      <span className="profile-status-icon" data-tone={tone}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
      </div>
    </div>
  );
}
