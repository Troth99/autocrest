import {
  Activity,
  ArrowUpRight,
  CarFront,
  Check,
  Gauge,
  Plus,
  ReceiptText,
} from "lucide-react";
import { getVehicles } from "@/features/garage/services/vehichles.service";

export default async function GaragePage() {
  const vehicles = await getVehicles();

  // Calculate total mileage across all vehicles
  const totalMileage = vehicles.reduce(
    (total, vehicle) => total + vehicle.mileage_km,
    0,
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="eyebrow">A HOME FOR YOUR CARS</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">
            My Garage
          </h1>
          <p className="mt-2 section-description sm:text-base">
            Every car, every kilometre, every detail. All in one place.
          </p>
        </div>
        <button type="button" disabled className="action-button">
          <Plus className="size-4" aria-hidden="true" /> Add vehicle
        </button>
      </div>

      <div className="mb-7 grid gap-3 sm:grid-cols-2">
        {[
          {
            label: "Vehicles in your garage",
            value: String(vehicles.length).padStart(1, "0"),
            icon: CarFront,
          },
          {
            label: "Total recorded mileage",
            value: `${totalMileage.toLocaleString("en-GB")} km`,
            icon: Gauge,
          },
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
            <h2 id="vehicles-heading" className="section-title">
              Your vehicles
            </h2>
            <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"}
            </span>
          </div>
          {vehicles.length === 0 ? (
            <div className="panel-card px-6 py-14 text-center">
              <CarFront
                className="mx-auto size-12 text-info"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-xl font-semibold text-text-primary">
                Your garage is empty
              </h3>
              <p className="mt-2 section-description">
                Add your first vehicle to keep its details and history together.
              </p>
              <button type="button" disabled className="mt-6 action-button">
                <Plus className="size-4" aria-hidden="true" /> Add vehicle
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {vehicles.map((vehicle) => (
                <article
                  key={vehicle.id}
                  className="panel-card overflow-hidden"
                >
                  <div className="relative flex aspect-4/3 items-center justify-center border-b border-line bg-input/45">
                    <CarFront
                      className="size-24 stroke-1 text-info"
                      aria-hidden="true"
                    />
                    {vehicle.is_primary && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-ink">
                        <Check className="size-3" aria-hidden="true" /> Primary
                        vehicle
                      </span>
                    )}
                    {vehicle.plate && (
                      <span className="absolute bottom-4 right-4 rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-xs text-text-secondary">
                        {vehicle.plate}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-text-primary">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      {[
                        vehicle.manufacture_year,
                        vehicle.trim,
                        vehicle.transmission?.replaceAll("_", " "),
                      ]
                        .filter((value) => value != null && value !== "")
                        .join(" · ") || "Vehicle details not provided"}
                    </p>
                    <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-line py-4">
                      {[
                        {
                          label: "Mileage",
                          value: `${vehicle.mileage_km.toLocaleString("en-GB")} km`,
                        },
                        {
                          label: "Fuel",
                          value: vehicle.fuel_type?.replaceAll("_", " "),
                        },
                        {
                          label: "Power",
                          value:
                            vehicle.power_hp !== null
                              ? `${vehicle.power_hp} hp`
                              : null,
                        },
                        {
                          label: "Engine",
                          value:
                            vehicle.engine_cc !== null
                              ? `${vehicle.engine_cc.toLocaleString("en-GB")} cc`
                              : null,
                        },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <dt className="text-xs text-muted">{label}</dt>
                          <dd className="mt-1.5 text-sm font-semibold capitalize text-text-primary">
                            {value ?? "Not provided"}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <button
                      type="button"
                      disabled
                      className="mt-5 flex w-full items-center justify-between rounded-xl border border-line bg-input/45 px-4 py-3 text-sm font-medium text-text-secondary disabled:cursor-not-allowed"
                    >
                      Vehicle details{" "}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <section
            className="panel-card p-5"
            aria-labelledby="expenses-heading"
          >
            <ReceiptText className="size-5 text-info" aria-hidden="true" />
            <h2 id="expenses-heading" className="mt-3 section-title">
              Garage expenses
            </h2>
            <p className="mt-2 section-description">
              Expense tracking is coming soon.
            </p>
          </section>
          <section
            className="panel-card p-5"
            aria-labelledby="activity-heading"
          >
            <Activity className="size-5 text-info" aria-hidden="true" />
            <h2 id="activity-heading" className="mt-3 section-title">
              Recent activity
            </h2>
            <p className="mt-2 section-description">
              Garage activity tracking is coming soon.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
