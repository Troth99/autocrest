import { CalendarDays, ShieldCheck, Wrench } from "lucide-react";

// Illustrative reminders only; these are not verified expiry dates.
const reminders = [
  { title: "Next inspection", detail: "Annual technical inspection", date: "20 Nov 2026", icon: CalendarDays },
  { title: "Insurance renewal", detail: "Review your policy before it expires", date: "12 Dec 2026", icon: ShieldCheck },
  { title: "Oil & filter change", detail: "Follow your vehicle's service schedule", date: "Mileage based", icon: Wrench },
];

export default function VehicleReminders() {
  return (
    <div className="mt-6">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-info">Upcoming · sample</h3>
      <ol className="space-y-4">
        {reminders.map(({ title, detail, date, icon: Icon }, index) => (
          <li key={title} className="vehicle-timeline-row">
            <p className="pt-1 text-xs font-medium text-muted sm:pt-4">{date}</p>
            <div className={`vehicle-timeline-entry ${index === 0 ? "border-amber-500/50" : ""}`}>
              <span className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border ${index === 0 ? "border-amber-500/40 bg-amber-500/10 text-amber-500" : "border-info-border bg-info-soft text-info"}`}><Icon className="size-5" aria-hidden="true" /></span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2"><p className="text-sm font-semibold">{title}</p>{index === 0 && <span className="rounded-md border border-amber-500/40 px-2 py-0.5 text-[10px] text-amber-500">Upcoming</span>}</div>
                <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
