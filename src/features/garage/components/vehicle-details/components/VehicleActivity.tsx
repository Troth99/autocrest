import { Gauge, Wrench, FileCheck2 } from "lucide-react";

// Static preview data and layout.
const activity = [
    { title: "Mileage updated", detail: "112,500 km recorded", date: "15 Oct 2026", icon: Gauge },
    { title: "Oil & filter change", detail: "108,200 km · ˆ145.00", date: "18 Jun 2026", icon: Wrench },
    { title: "Annual inspection", detail: "Passed · ˆ35.00", date: "20 Nov 2025", icon: FileCheck2 },
];

export default function VehicleActivity() {
    return (
        <section className="section-card">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2"><h2 className="text-lg font-semibold">Recent activity</h2><span className="detail-label">Sample history</span></div>
            <ul className="divide-y divide-line">
                {activity.map(({ title, detail, date, icon: Icon }) => (
                    <li key={title} className="flex items-start gap-3 py-4">
                        <span className="rounded-xl bg-info-soft p-2.5 text-info"><Icon className="size-4" aria-hidden="true" /></span>
                        <div className="min-w-0 flex-1"><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs text-muted">{detail}</p><p className="mt-2 text-xs text-subtle">{date}</p></div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
