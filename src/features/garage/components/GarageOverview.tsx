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
    <aside aria-labelledby="garage-tools-heading">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="garage-tools-heading" className="section-title">Garage organiser</h2>
        <span className="text-xs text-muted">Coming soon</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        {sections.map(({ title, icon: Icon, description, items }) => (
          <section key={title} className="content-card overflow-hidden rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-info/20 bg-info-soft text-info">
                <Icon className="size-5 stroke-[1.5]" aria-hidden="true" />
              </span>
              <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted">{description}</p>
            <ul className="mt-4 space-y-2 border-t border-line pt-3">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="size-1 rounded-full bg-info/60" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}
