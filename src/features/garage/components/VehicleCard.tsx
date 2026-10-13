import Image from "next/image";
import { ArrowUpRight, CarFront, Check, Cog, Fuel, Gauge, Settings2 } from "lucide-react";
import type { Vehicle } from "@/features/garage/types/vehicle";

type Props = {
  vehicle: Vehicle;
  photoUrl?: string | null;
};

export default function VehicleCard({ vehicle, photoUrl }: Props) {
  const name = `${vehicle.make} ${vehicle.model}`;
  const details = [vehicle.manufacture_year, vehicle.trim, vehicle.transmission?.replaceAll("_", " ")]
    .filter((value) => value != null && value !== "")
    .join(" · ");
  const specs = [
    { label: "Mileage", value: `${vehicle.mileage_km.toLocaleString("en-GB")} km`, icon: Gauge },
    { label: "Fuel", value: vehicle.fuel_type?.replaceAll("_", " "), icon: Fuel },
    { label: "Power", value: vehicle.power_hp !== null ? `${vehicle.power_hp} hp` : null, icon: Cog },
    { label: "Engine", value: vehicle.engine_cc !== null ? `${vehicle.engine_cc.toLocaleString("en-GB")} cc` : null, icon: Settings2 },
  ];

  return (
    <article className="garage-vehicle-card flex h-full w-full min-w-0 flex-col overflow-hidden p-3 sm:p-4">
      <div className={`relative aspect-video overflow-hidden rounded-xl border border-line ${photoUrl ? "" : "garage-vehicle-placeholder"}`}>
        {photoUrl ? (
          <Image src={photoUrl} alt={name} fill unoptimized sizes="(max-width: 768px) 100vw, 680px" className="object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-info">
            <CarFront className="garage-car-motion size-16 stroke-[1.25]" aria-hidden="true" />
            <span className="text-xs text-muted">No photo added</span>
          </div>
        )}
        {vehicle.is_primary && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-ink">
            <Check className="size-3.5" aria-hidden="true" /> Primary
          </span>
        )}
        {vehicle.plate && (
          <span className="absolute bottom-3 right-3 rounded-md border border-white/20 bg-slate-950/85 px-3 py-1.5 font-mono text-xs font-semibold text-white">
            {vehicle.plate}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-2 pb-1 pt-5 sm:px-3">
        <h3 className="wrap-break-word text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">{name}</h3>
        {details && <p className="mt-1.5 text-sm capitalize text-muted">{details}</p>}

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-5 @min-[520px]:grid-cols-4">
          {specs.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex min-w-0 items-center gap-2.5">
              <Icon className="size-6 shrink-0 stroke-[1.5] text-info" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="mt-1 wrap-break-word text-sm font-semibold text-text-primary">{value ?? "Not provided"}</dd>
              </div>
            </div>
          ))}
        </dl>
        <div className="mt-auto pt-6">
          <button type="button" disabled className="flex w-full items-center justify-between rounded-xl border border-line bg-info-soft px-4 py-3.5 text-sm font-medium text-text-secondary disabled:cursor-not-allowed">
            Vehicle details <ArrowUpRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
