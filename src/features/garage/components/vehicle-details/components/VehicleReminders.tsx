import { CalendarDays, Plus, FileCheck2, ShieldCheck, Wrench } from "lucide-react";

// Static preview data and layout.
const reminders = [
    { title: "Annual inspection", detail: "Due 20 November 2026", icon: FileCheck2 },
    { title: "Car insurance", detail: "Expires 12 December 2026", icon: ShieldCheck },
    { title: "Oil & filter change", detail: "At 120,000 km", icon: Wrench },
];

export default function VehicleReminders() {
  return (
    <section className="rounded-2xl border border-info-border bg-linear-to-br from-info-soft to-panel p-5 sm:p-6">
        <div className="flex items-center gap-2"><CalendarDays className="size-5 text-info" aria-hidden="true" /><h2 className="text-lg font-semibold">Upcoming reminders</h2></div>
        <p className="mt-2 text-xs leading-5 text-muted">A little planning keeps your car ready for the road.</p>
        <div className="mt-4"><button type="button" disabled className="button-base button-secondary gap-2 border px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-60" title="Add reminder is not connected yet"><Plus className="size-4" aria-hidden="true" /> Add reminder</button></div>
        <ul className="mt-5 space-y-4">
            {reminders.map(({ title, detail, icon: Icon }) => (
                <li key={title} className="flex gap-3 rounded-xl border border-line bg-panel p-3">
                    <Icon className="mt-0.5 size-4 shrink-0 text-info" aria-hidden="true" /><div><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs text-muted">{detail}</p></div>
                </li>
            ))}
        </ul>
    </section>
  );
}
