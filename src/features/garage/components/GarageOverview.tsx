import { CircleDot, FileCheck2, ReceiptText, Wrench } from "lucide-react";

const sections = [
  {
    title: "Service & maintenance",
    icon: Wrench,
    description: "Keep repairs, oil changes and your next service together.",
    items: ["Service history", "Upcoming maintenance"],
  },
  {
    title: "Tyre sets",
    icon: CircleDot,
    description: "Track your summer and winter sets, sizes and tyre changes.",
    items: ["Summer · Winter · All-season", "Size, DOT & installation mileage"],
  },
  {
    title: "Documents & deadlines",
    icon: FileCheck2,
    description: "Keep insurance, inspections and vehicle documents in one place.",
    items: ["Insurance & inspection", "Expiry reminders"],
  },
  {
    title: "Invoices & expenses",
    icon: ReceiptText,
    description: "Organise receipts and see what each vehicle costs to run.",
    items: ["Fuel, repairs & other expenses", "Receipts & invoices"],
  },
];

export default function GarageOverview() {
  return (
    <aside aria-labelledby="garage-tools-heading" className="xl:-mt-22 xl:border-l xl:border-line xl:pl-6">
      <h2 id="garage-tools-heading" className="text-xl font-semibold tracking-tight">Garage organiser</h2>
      <p className="mb-5 mt-2 text-sm text-muted">Everything for your vehicles, in one place.</p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">

        {sections.map(({ title, icon: Icon, description, items }) => (

          <section key={title} className="content-card flex min-h-28 items-start gap-3 rounded-xl p-4" title={items.join(" ? ")}>

            <Icon className="mt-1 size-7 shrink-0 stroke-[1.5] text-info" aria-hidden="true" />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-xs font-semibold text-text-primary">{title}</h3><span className="rounded-full bg-info-soft px-2 py-1 text-[9px] text-muted">Coming soon</span></div>
              <p className="mt-2 text-xs leading-5 text-muted">{description}</p>
              <span className="sr-only">{items.join(". ")}</span>
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}
