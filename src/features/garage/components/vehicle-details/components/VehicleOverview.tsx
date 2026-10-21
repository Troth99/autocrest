import { Cog, Fuel, Gauge, MapPin, Settings2 } from "lucide-react";
import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";
import type { Vehicle } from "@/features/garage/types/vehicle";

export default function VehicleOverview({ vehicle }: { vehicle: Vehicle }) {
  return (
    <dl className="mt-6 grid grid-cols-2 gap-y-5 rounded-xl border border-line bg-background/30 py-4 sm:grid-cols-3 xl:grid-cols-5">
      {/* Current odometer reading and the latest adjustment, when present. */}
      <div className="flex min-w-0 items-center gap-3 px-4">
        <Gauge className="size-6 shrink-0 stroke-[1.5] text-info" aria-hidden="true" />
        <div className="min-w-0">
          <dt className="text-xs text-muted">Mileage</dt>
          <dd className="mt-1 wrap-break-word text-sm font-semibold capitalize">
            {vehicle.mileage_km.toLocaleString("en-GB")} km
          </dd>
          {vehicle.mileage_adjustment && (
            <dd
              className="mt-1 text-xs text-muted"
              title={vehicle.mileage_adjustment.reason}
            >
              {vehicle.mileage_adjustment.kind === "replacement"
                ? "Odometer replaced"
                : "Mileage corrected"}
            </dd>
          )}
        </div>
      </div>
      <div className="flex min-w-0 items-center gap-3 px-4">
        {/* Replace stored underscores with spaces in the fuel name. */}
        <Fuel className="size-6 shrink-0 stroke-[1.5] text-info" aria-hidden="true" />
        <div className="min-w-0">
          <dt className="text-xs text-muted">Fuel</dt>
          <dd className="mt-1 wrap-break-word text-sm font-semibold capitalize">
            {formatVehicleValue(vehicle.fuel_type?.replaceAll("_", " "))}
          </dd>
        </div>
      </div>
      <div className="flex min-w-0 items-center gap-3 px-4">
        {/* Display a readable transmission name with a fallback for missing data. */}
        <Settings2 className="size-6 shrink-0 stroke-[1.5] text-info" aria-hidden="true" />
        <div className="min-w-0">
          <dt className="text-xs text-muted">Transmission</dt>
          <dd className="mt-1 wrap-break-word text-sm font-semibold capitalize">
            {formatVehicleValue(vehicle.transmission?.replaceAll("_", " "))}
          </dd>
        </div>
      </div>
      <div className="flex min-w-0 items-center gap-3 px-4">
        {/* Add horsepower units only when a power value is available. */}
        <Cog className="size-6 shrink-0 stroke-[1.5] text-info" aria-hidden="true" />
        <div className="min-w-0">
          <dt className="text-xs text-muted">Power</dt>
          <dd className="mt-1 wrap-break-word text-sm font-semibold capitalize">
            {formatVehicleValue(
              vehicle.power_hp != null ? `${vehicle.power_hp} hp` : null,
            )}
          </dd>
        </div>
      </div>
      <div className="flex min-w-0 items-center gap-3 px-4">
        {/* Registration country code, with the shared fallback when unknown. */}
        <MapPin className="size-6 shrink-0 stroke-[1.5] text-info" aria-hidden="true" />
        <div className="min-w-0">
          <dt className="text-xs text-muted">Registration country</dt>
          <dd className="mt-1 wrap-break-word text-sm font-semibold capitalize">
            {formatVehicleValue(vehicle.registration_country_code)}
          </dd>
        </div>
      </div>
    </dl>
  );
}
