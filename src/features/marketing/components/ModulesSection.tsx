import { CalendarDays, CarFront, Wrench } from "lucide-react";

const serviceHistory = [
  { title: "Oil & filter change", date: "12 Apr 2026", dateTime: "2026-04-12" },
  { title: "Brake service", date: "28 Jan 2026", dateTime: "2026-01-28" },
  { title: "Annual inspection", date: "3 Oct 2025", dateTime: "2025-10-03" },
];

const vehicleDetails = [
  { label: "Make", value: "BMW" },
  { label: "Model", value: "320d Touring" },
  { label: "Year", value: "2020" },
];

export default function ModulesSection() {
  return (
    <section
      id="modules"
      aria-labelledby="modules-title"
      className="mx-auto max-w-[112rem] px-4 py-6 sm:px-6 sm:py-8"
    >
      <h2 id="modules-title" className="text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
        A clearer picture of every vehicle.
      </h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <article className="section-card">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 size-7 shrink-0 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">Service history timeline</h3>
              <p className="section-description mt-1">
                A clear, chronological record of every service, repair and update.
              </p>
            </div>
          </div>
          <ol className="mt-6">
            {serviceHistory.map(({ title, date, dateTime }, index) => (
              <li key={title} className="relative grid grid-cols-[0.75rem_minmax(0,1fr)_auto] items-center gap-3 py-3">
                {index < serviceHistory.length - 1 && (
                  <span className="absolute bottom-[-50%] left-[0.34375rem] top-1/2 w-px bg-border-input" aria-hidden="true" />
                )}
                <span className="relative flex items-center justify-center" aria-hidden="true">
                  <span className={`size-2.5 rounded-full border border-accent ${index === 0 ? "bg-accent" : "bg-panel"}`} />
                </span>
                <span className="text-sm font-medium">{title}</span>
                <time dateTime={dateTime} className="whitespace-nowrap text-xs text-muted">
                  {date}
                </time>
              </li>
            ))}
          </ol>
        </article>

        <article className="section-card">
          <div className="flex items-start gap-3">
            <CarFront className="mt-0.5 size-7 shrink-0 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">Vehicle details</h3>
              <p className="section-description mt-1">
                Keep the key information for each vehicle in one place.
              </p>
            </div>
          </div>
          <dl className="mt-6 divide-y divide-line">
            {vehicleDetails.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4 py-3 text-sm">
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="section-card">
          <div className="flex items-start gap-3">
            <Wrench className="mt-0.5 size-7 shrink-0 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">Next service</h3>
              <p className="section-description mt-1">
                See what&apos;s due next and plan ahead with confidence.
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-info-border bg-info-soft p-4">
            <CalendarDays className="mt-0.5 size-6 shrink-0 text-info" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="text-lg font-semibold text-info">Due in 4,800 km</p>
              <p className="mt-1 text-sm text-text-secondary">Oil &amp; filter change</p>
            </div>
          </div>
          <p className="field-description mt-4">
            Based on the next service recorded in your maintenance history.
          </p>
        </article>
      </div>
      <p className="field-description mt-3">Illustrative vehicle records.</p>
    </section>
  );
}
