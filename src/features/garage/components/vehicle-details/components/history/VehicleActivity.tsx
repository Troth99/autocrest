import { Gauge, Wrench, FileCheck2 } from "lucide-react";

// Illustrative records only; no service history is loaded yet.
const activity = [
  { title: "Mileage entry", detail: "Odometer reading recorded", date: "15 Oct 2026", icon: Gauge },
  { title: "Service", detail: "Engine oil changed and general check completed", date: "10 Aug 2026", icon: Wrench },
  { title: "Annual inspection", detail: "Inspection completed", date: "20 Nov 2025", icon: FileCheck2 },
];

export default function VehicleActivity() {
  return (
    <div className="mt-6">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">Past activity · sample</h3>
      <ol className="space-y-4">
        {activity.map(({ title, detail, date, icon: Icon }) => (
          <li key={title} className="vehicle-timeline-row">
            <p className="pt-1 text-xs font-medium text-muted sm:pt-4">{date}</p>
            <div className="vehicle-timeline-entry">
              <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-info-border bg-info-soft text-info"><Icon className="size-5" aria-hidden="true" /></span>
              <div className="min-w-0"><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-muted">{detail}</p></div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
