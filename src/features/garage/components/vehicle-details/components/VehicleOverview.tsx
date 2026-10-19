import { Cog, Fuel, Gauge, MapPin, Settings2 } from "lucide-react";
import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";
import type { Vehicle } from "@/features/garage/types/vehicle";

export default function VehicleOverview({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    { label: "Mileage", value: `${vehicle.mileage_km.toLocaleString("en-GB")} km`, icon: Gauge },
    { label: "Fuel", value: vehicle.fuel_type?.replaceAll("_", " "), icon: Fuel },
    { label: "Transmission", value: vehicle.transmission?.replaceAll("_", " "), icon: Settings2 },
    { label: "Power", value: vehicle.power_hp != null ? `${vehicle.power_hp} hp` : null, icon: Cog },
    { label: "Registration country", value: vehicle.registration_country_code, icon: MapPin },
  ];
  return (
    <dl className="mt-6 grid grid-cols-2 gap-y-5 rounded-xl border border-line bg-background/30 py-4 sm:grid-cols-3 xl:grid-cols-5">
      {specs.map(({ label, value, icon: Icon }) => (
        <div key={label} className="flex min-w-0 items-center gap-3 px-4">
          <Icon className="size-6 shrink-0 stroke-[1.5] text-info" aria-hidden="true" />
          <div className="min-w-0">
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="mt-1 wrap-break-word text-sm font-semibold capitalize">{formatVehicleValue(value)}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
