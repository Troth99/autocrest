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
    <div className="flex items-center gap-3 py-4 first:pt-4 last:pb-4">
      <span className="text-subtle [&>svg]:size-4">{icon}</span>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="ml-auto max-w-[58%] truncate text-right text-sm font-semibold text-text-primary">
        {value}
      </dd>
    </div>
  );
}
