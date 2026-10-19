import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CarFront, Gauge, Pencil, Star } from "lucide-react";
import type { Vehicle } from "@/features/garage/types/vehicle";
import VehiclePlate from "./VehiclePlate";

export default function VehicleHeading({ vehicle, photoUrl }: { vehicle: Vehicle; photoUrl?: string | null }) {
  const name = `${vehicle.make} ${vehicle.model}`;
  return (
    <div className="flex flex-wrap items-start gap-5">
      <div className="relative flex aspect-3/2 w-full shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-line bg-info-soft sm:w-72 lg:w-80">
        {photoUrl ? <Image src={photoUrl} alt={name} fill unoptimized sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 100vw" className="object-cover" /> : <>
          <CarFront className="size-20 stroke-[1.25] text-info" aria-hidden="true" />
          <span className="text-xs text-muted">No photo added</span>
        </>}
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-info">My garage / Vehicle details</p>
        <h1 className="wrap-break-word text-3xl font-semibold tracking-tight sm:text-4xl">{name}</h1>
        <p className="mt-2 text-sm text-muted">{[vehicle.manufacture_year, vehicle.trim, vehicle.nickname].filter((value) => value != null && value !== "").join(" · ")}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {vehicle.plate && <VehiclePlate plate={vehicle.plate} countryCode={vehicle.registration_country_code} />}
          {vehicle.is_primary && <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-ink"><Star className="size-3.5" aria-hidden="true" /> Primary</span>}
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-2 xl:w-auto xl:justify-end" role="group" aria-label="Vehicle actions">
        <Link href="/garrage" className="button-base button-secondary gap-2 border px-3 py-2.5 text-sm"><ArrowLeft className="size-4" aria-hidden="true" /> Back to my garage</Link>
        <button type="button" disabled title="Editing is not connected yet" className="vehicle-edit-action"><Pencil className="size-4" aria-hidden="true" /> Edit vehicle</button>
        <button type="button" disabled title="Mileage updates are not connected yet" className="vehicle-mileage-action"><Gauge className="size-4" aria-hidden="true" /> Update mileage</button>
      </div>
    </div>
  );
}
