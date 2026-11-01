import { Cog } from "lucide-react";
import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";
import type { Vehicle } from "@/features/garage/types/vehicle";

export default function VehicleSpecifications({ vehicle }: { vehicle: Vehicle }) {
    const specs = [
        ["Make", vehicle.make], ["Model", vehicle.model], ["Year", vehicle.manufactureYear],
        ["Variant", vehicle.trim], ["Nickname", vehicle.nickname],
        ["Fuel type", vehicle.fuelType?.replaceAll("_", " ")],
        ["Transmission", vehicle.transmission?.replaceAll("_", " ")],
        ["Drivetrain", vehicle.drivetrain?.toUpperCase()],
        ["Engine capacity", vehicle.engineCc != null ? `${vehicle.engineCc.toLocaleString("en-GB")} cc` : null],
        ["Power", vehicle.powerHp != null ? `${vehicle.powerHp} hp` : null],
        ["Emissions standard", vehicle.euroStandard?.replaceAll("_", " ")],
        ["Colour", vehicle.colour], ["Seats", vehicle.seats],
    ] as const;
    return (
        <section className="section-card">
            <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold tracking-tight"><Cog className="size-5 text-info" aria-hidden="true" /> Specifications</h2>
            <dl className="divide-y divide-line">
                {specs.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 py-2.5 text-sm">
                        <dt className="text-muted">{label}</dt>
                        <dd className="wrap-break-word font-medium capitalize">{formatVehicleValue(value)}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
