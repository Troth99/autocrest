import type { ReactNode } from "react";

export default function SectionHeading({
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
      <span className="profile-section-icon">
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
