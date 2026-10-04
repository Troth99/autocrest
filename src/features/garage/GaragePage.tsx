import {
  CalendarDays,
  CarFront,
  Check,
  Fuel,
  Gauge,
  Plus,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const vehicles = [
  {
    name: "BMW 320d",
    edition: "2019 · M Sport · Automatic",
    plate: "CB 3200 AB",
    mileage: "84,250 km",
    fuel: "Diesel",
    service: "In 2,750 km",
    primary: true,
  },
  {
    name: "Volkswagen Golf",
    edition: "2017 · Highline · Manual",
    plate: "CB 7412 KM",
    mileage: "112,800 km",
    fuel: "Petrol",
    service: "In 5,200 km",
    primary: false,
  },
];

const reminders = [
  {
    title: "Annual inspection",
    vehicle: "BMW 320d",
    date: "22 Oct 2026",
    icon: ShieldCheck,
  },
  {
    title: "Oil & filter change",
    vehicle: "BMW 320d",
    date: "In 2,750 km",
    icon: Wrench,
  },
  {
    title: "Insurance renewal",
    vehicle: "Volkswagen Golf",
    date: "15 Nov 2026",
    icon: CalendarDays,
  },
];

export default function GaragePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="eyebrow">YOUR VEHICLES</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">
            My Garage
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
            Every car, every kilometre, every detail. All in one place.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed"
        >
          <Plus className="size-4" aria-hidden="true" /> Add vehicle
        </button>
      </div>

      <div className="mb-7 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Vehicles in your garage", value: "02", icon: CarFront },
          { label: "Upcoming reminders", value: "03", icon: CalendarDays },
          { label: "Service records", value: "12", icon: Wrench },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="content-card flex items-center gap-4 rounded-2xl p-5"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-info-soft text-info">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-2xl font-semibold tracking-tight text-text-primary">
                {value}
              </p>
              <p className="mt-1 text-xs text-muted">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
        <section aria-labelledby="vehicles-heading">
          <div className="mb-4 flex items-center justify-between">
            <h2
              id="vehicles-heading"
              className="text-lg font-semibold text-text-primary"
            >
              Your vehicles
            </h2>
            <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              2 vehicles
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {vehicles.map((vehicle) => (
              <article
                key={vehicle.plate}
                className="content-card overflow-hidden rounded-3xl"
              >
                <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-line bg-input/45">
                  <div
                    className={`absolute size-40 rounded-full blur-3xl ${vehicle.primary ? "bg-accent/15" : "bg-info/15"}`}
                  />
                  <CarFront
                    className={`relative h-24 w-40 stroke-[0.8] ${vehicle.primary ? "text-accent-text" : "text-info"}`}
                    aria-hidden="true"
                  />
                  {vehicle.primary && (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-text">
                      <Check className="size-3" aria-hidden="true" /> Primary
                      vehicle
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 rounded-md border border-line bg-panel px-2.5 py-1 font-mono text-xs tracking-wider text-text-secondary">
                    {vehicle.plate}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold tracking-tight text-text-primary">
                    {vehicle.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{vehicle.edition}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-line py-4">
                    <div>
                      <dt className="flex items-center gap-1.5 text-xs text-muted">
                        <Gauge className="size-3.5" aria-hidden="true" />{" "}
                        Mileage
                      </dt>
                      <dd className="mt-1.5 text-sm font-semibold text-text-primary">
                        {vehicle.mileage}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1.5 text-xs text-muted">
                        <Fuel className="size-3.5" aria-hidden="true" /> Fuel
                        type
                      </dt>
                      <dd className="mt-1.5 text-sm font-semibold text-text-primary">
                        {vehicle.fuel}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-muted">
                      <Wrench className="size-3.5" aria-hidden="true" /> Next
                      service
                    </span>
                    <span className="font-medium text-accent-text">
                      {vehicle.service}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled
                    className="mt-5 w-full rounded-xl border border-line bg-input/45 px-4 py-3 text-sm font-medium text-text-secondary disabled:cursor-not-allowed"
                  >
                    Vehicle details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-5">
          <section
            className="content-card rounded-3xl p-5"
            aria-labelledby="reminders-heading"
          >
            <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-info-soft text-info">
              <CalendarDays className="size-5" aria-hidden="true" />
            </span>
            <h2
              id="reminders-heading"
              className="text-lg font-semibold text-text-primary"
            >
              Coming up next
            </h2>
            <p className="mt-1 text-xs leading-5 text-muted">
              A little planning keeps you moving.
            </p>
            <ul className="mt-5 divide-y divide-line">
              {reminders.map(({ title, vehicle, date, icon: Icon }) => (
                <li
                  key={title}
                  className="flex gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <Icon
                    className="mt-0.5 size-4 shrink-0 text-info"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {title}
                    </p>
                    <p className="mt-1 text-xs text-muted">{vehicle}</p>
                    <p className="mt-2 text-xs font-semibold text-accent-text">
                      {date}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <div className="rounded-3xl border border-accent/20 bg-accent/5 p-5">
            <Wrench className="size-5 text-accent-text" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-text-primary">
              Give your car a history
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Keep receipts, services, and repairs together. Your future self
              will thank you.
            </p>
          </div>
        </aside>
      </div>
      <p className="mt-6 text-xs text-subtle">
        Sample garage preview · Vehicle actions are coming soon.
      </p>
    </main>
  );
}
