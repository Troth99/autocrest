import { Cog, Fuel, Gauge, MapPin, Settings2 } from "lucide-react";
import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";
import type { Vehicle } from "@/features/garage/types/vehicle";

export default function VehicleOverview({ vehicle }: { vehicle: Vehicle }) {
  return (
    <dl className="vehicle-summary-grid">
      {/* Current odometer reading and the latest adjustment, when present. */}
      <div className="vehicle-summary-card">
        <Gauge className="vehicle-summary-icon" aria-hidden="true" />

        <div className="min-w-0">
          <dt className="text-xs text-muted">Mileage</dt>
          <dd className="vehicle-summary-value">
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

      <div className="vehicle-summary-card">
        {/* Replace stored underscores with spaces in the fuel name. */}
        <Fuel className="vehicle-summary-icon" aria-hidden="true" />

        <div className="min-w-0">
          <dt className="text-xs text-muted">Fuel</dt>
          <dd className="vehicle-summary-value">
            {formatVehicleValue(vehicle.fuel_type?.replaceAll("_", " "))}
          </dd>
        </div>
      </div>

      <div className="vehicle-summary-card">
        {/* Display a readable transmission name with a fallback for missing data. */}
        <Settings2 className="vehicle-summary-icon" aria-hidden="true" />

        <div className="min-w-0">
          <dt className="text-xs text-muted">Transmission</dt>
          <dd className="vehicle-summary-value">
            {formatVehicleValue(vehicle.transmission?.replaceAll("_", " "))}
          </dd>
        </div>
      </div>

      <div className="vehicle-summary-card">
        {/* Add horsepower units only when a power value is available. */}
        <Cog className="vehicle-summary-icon" aria-hidden="true" />

        <div className="min-w-0">
          <dt className="text-xs text-muted">Power</dt>
          <dd className="vehicle-summary-value">
            {formatVehicleValue(
              vehicle.power_hp != null ? `${vehicle.power_hp} hp` : null,
            )}
          </dd>
        </div>
      </div>

      <div className="vehicle-summary-card">
        {/* Registration country code, with the shared fallback when unknown. */}
        <MapPin className="vehicle-summary-icon" aria-hidden="true" />

        <div className="min-w-0">
          <dt className="text-xs text-muted">Registration country</dt>
          <dd className="vehicle-summary-value">
            {formatVehicleValue(vehicle.registration_country_code)}
          </dd>
        </div>
      </div>
    </dl>
  );
}
