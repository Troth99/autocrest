import { CalendarDays, CarFront, Wrench } from "lucide-react";

const serviceHistory = [
  { title: "Oil & filter change", date: "12 Apr 2026", dateTime: "2026-04-12" },
  { title: "Brake service", date: "28 Jan 2026", dateTime: "2026-01-28" },
  { title: "Annual inspection", date: "3 Oct 2025", dateTime: "2025-10-03" },
];

const vehicleDetails = [
  { label: "Make", value: "BMW" },
  { label: "Model", value: "530d Touring" },
  { label: "Year", value: "2021" },
];

export default function ModulesSection() {
  return (
    <section
      id="modules"
      aria-labelledby="modules-title"
      className="marketing-section"
    >
      <h2 id="modules-title" className="marketing-section-title">
        A clearer picture of every vehicle.
      </h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <article className="section-card h-full">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 size-7 shrink-0 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">Service history timeline</h3>
              <p className="marketing-copy mt-1">
                A clear, chronological record of every service, repair and update.
              </p>
            </div>
          </div>
          <ol className="mt-4">
            {serviceHistory.map(({ title, date, dateTime }, index) => (
              <li key={title} className="relative grid grid-cols-[0.75rem_minmax(0,1fr)_auto] items-center gap-3 py-2.5">
                {index < serviceHistory.length - 1 && (
                  <span className="absolute bottom-[-50%] left-[0.34375rem] top-1/2 w-px bg-border-input" aria-hidden="true" />
                )}
                <span className="relative flex items-center justify-center" aria-hidden="true">
                  <span className={`size-2.5 rounded-full border border-info ${index === 0 ? "bg-info" : "bg-panel"}`} />
                </span>
                <span className="text-sm font-medium">{title}</span>
                <time dateTime={dateTime} className="whitespace-nowrap text-xs text-muted">
                  {date}
                </time>
              </li>
            ))}
          </ol>
        </article>

        <article className="section-card h-full">
          <div className="flex items-start gap-3">
            <CarFront className="mt-0.5 size-7 shrink-0 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">Vehicle details</h3>
              <p className="marketing-copy mt-1">
                Keep the key information for each vehicle in one place.
              </p>
            </div>
          </div>
          <dl className="mt-4 divide-y divide-line">
            {vehicleDetails.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="section-card h-full">
          <div className="flex items-start gap-3">
            <Wrench className="mt-0.5 size-7 shrink-0 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">Next service</h3>
              <p className="marketing-copy mt-1">
                See what&apos;s due next and plan ahead with confidence.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-xl bg-info-soft p-4">
            <CalendarDays className="mt-0.5 size-6 shrink-0 text-info" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="text-lg font-semibold text-info">Due in 4,800 km</p>
              <p className="mt-1 text-sm text-text-secondary">Next service: Oil &amp; filter change</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
