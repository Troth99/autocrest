import type { ReactNode } from "react";

export default function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="profile-detail-row">
      <span className="profile-detail-icon">{icon}</span>
      <dt className="profile-detail-label">{label}</dt>
      <dd className="profile-detail-value">
        {value}
      </dd>
    </div>
  );
}
