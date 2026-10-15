import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";
import { Vehicle } from "@/features/garage/types/vehicle";
import { Cog } from "lucide-react";

export default function VehicleSpecifications({
    vehicle,
}: {
    vehicle: Vehicle
}) {
  return (
    <section className="section-card">
        <div className="mb-6 flex items-center gap-3"><Cog className="size-5 text-info" aria-hidden="true" /><h2 className="text-lg font-semibold">Vehicle specifications</h2></div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            <div>
                <dt className="detail-label">Make</dt>
                <dd className="detail-value">{vehicle.make}</dd>
            </div>
            <div>
                <dt className="detail-label">Model</dt>
                <dd className="detail-value">{vehicle.model}</dd>
            </div>
            <div>
                <dt className="detail-label">Manufacture year</dt>
                <dd className="detail-value">{formatVehicleValue(vehicle.manufacture_year)}</dd>
            </div>
            <div>
                <dt className="detail-label">Trim / variant</dt>
                <dd className="detail-value">{formatVehicleValue(vehicle.trim)}</dd>
            </div>
            <div>
                <dt className="detail-label">Fuel type</dt>
                <dd className="detail-value">{formatVehicleValue(vehicle.fuel_type)}</dd>
            </div>
            <div>
                <dt className="detail-label">Transmission</dt>
                <dd className="detail-value">{formatVehicleValue(vehicle.transmission)}</dd>
            </div>
            <div>
                <dt className="detail-label">Drivetrain</dt>
                <dd className="detail-value">{formatVehicleValue(vehicle.drivetrain)}</dd>
            </div>
            <div>
                <dt className="detail-label">Engine capacity</dt>
                <dd className="detail-value">{formatVehicleValue(vehicle.engine_cc)}</dd>
            </div>
            <div>
                <dt className="detail-label">Power</dt>
                <dd className="detail-value">{formatVehicleValue(vehicle.power_hp)}</dd>
            </div>
            <div>
                <dt className="detail-label">Emissions standard</dt>
                <dd className="detail-value">{formatVehicleValue(vehicle.euro_standard)}</dd>
            </div>
            <div>
                <dt className="detail-label">Colour</dt>
                <dd className="detail-value">{formatVehicleValue(vehicle.colour)}</dd>
            </div>
            <div>
                <dt className="detail-label">Seats</dt>
                <dd className="detail-value">{formatVehicleValue(vehicle.seats)}</dd>
            </div>
        </dl>
    </section>
  );
}
