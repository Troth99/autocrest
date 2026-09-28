import { CalendarClock, FileText, ReceiptText, Share2, Wrench } from "lucide-react";

const modules = [
  { title: "Maintenance", description: "Log services, repairs, parts, and mileage with every visit.", icon: Wrench, color: "text-emerald-300" },
  { title: "Expenses", description: "See the real cost of owning your vehicle, not just separate payments.", icon: ReceiptText, color: "text-amber-300" },
  { title: "Documents", description: "Keep insurance, invoices, and important vehicle records together.", icon: FileText, color: "text-violet-300" },
  { title: "Reminders", description: "Never miss a service, inspection, insurance, tax, or vignette deadline.", icon: CalendarClock, color: "text-info" },
  { title: "Shareable history", description: "Prepare a clear, trustworthy history when it is time to sell.", icon: Share2, color: "text-accent-text" },
];

export default function ModulesSection() {
  return (
    <section id="modules" className="border-y border-line bg-panel/35 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="eyebrow">EVERYDAY OWNERSHIP</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">Everything your car needs, organised.</h2>
          <p className="mt-4 text-sm leading-6 text-muted sm:text-base">From the first service to the next sale, AutoCrest helps you understand the complete picture.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(({ title, description, icon: Icon, color }) => (
            <article key={title} className="content-card rounded-3xl p-6">
              <span className={`flex size-10 items-center justify-center rounded-2xl bg-input ${color}`}><Icon className="size-5" /></span>
              <h3 className="mt-5 text-base font-semibold text-text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
