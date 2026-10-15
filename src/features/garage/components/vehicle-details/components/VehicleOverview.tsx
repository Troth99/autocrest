import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";
import { Vehicle } from "@/features/garage/types/vehicle";
import Image from "next/image";
import { Camera, CarFront, Check, Cog, Fuel, Gauge, MapPin } from "lucide-react";


export default function VehicleOverview({
    vehicle,
    photoUrl,
}: {
    vehicle: Vehicle;
    photoUrl?: string | null;
}) {

    return (
        <>
            <section aria-label="Vehicle overview" className="overflow-hidden rounded-3xl border border-line bg-panel">
                <div className="grid lg:grid-cols-[1fr_1.2fr]">
                    <div className="garage-vehicle-placeholder vehicle-overview-photo">
                        {vehicle.is_primary && <span className="vehicle-overview-primary z-10">
                            <Check className="size-3.5" aria-hidden="true" /> Primary vehicle
                        </span>}
                        {photoUrl ? (
                            <Image
                                src={photoUrl}
                                alt={`${vehicle.make} ${vehicle.model}`}
                                fill
                                unoptimized
                                sizes="(min-width: 1024px) 45vw, 100vw"
                                className="object-cover"
                            />
                        ) : (
                            <>
                                <CarFront className="size-28 stroke-1 text-accent-text" aria-hidden="true" />
                                <p className="detail-label">No photo added</p>
                            </>
                        )}
                        <button type="button" disabled className={`vehicle-detail-action ${photoUrl ? "absolute bottom-4 right-4 z-10 bg-panel" : ""}`} title="Change photo is not connected yet">
                            <Camera className="size-4" aria-hidden="true" /> Change photo</button>
                    </div>
                    <div className="flex flex-col justify-center p-6 sm:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="vehicle-overview-plate">{formatVehicleValue(vehicle.plate)}</span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-muted"><MapPin className="size-4" aria-hidden="true" /> Bulgaria</span>
                        </div>
                        <div className="mt-7 grid grid-cols-2 gap-5">
                            <div className="flex items-start gap-3">
                                <Gauge className="mt-1 size-5 shrink-0 text-info" aria-hidden="true" />
                                <div>
                                    <p className="detail-label">Mileage</p>
                                    <p className="mt-1 text-base font-semibold sm:text-lg">
                                        {vehicle.mileage_km.toLocaleString("en-GB")} km
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Fuel className="mt-1 size-5 shrink-0 text-info" aria-hidden="true" />
                                <div>
                                    <p className="detail-label">Fuel</p>
                                    <p className="mt-1 text-base font-semibold capitalize sm:text-lg">
                                        {formatVehicleValue(vehicle.fuel_type?.replaceAll("_", " "))}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Cog className="mt-1 size-5 shrink-0 text-info" aria-hidden="true" />
                                <div>
                                    <p className="detail-label">Transmission</p>
                                    <p className="mt-1 text-base font-semibold capitalize sm:text-lg">
                                        {formatVehicleValue(vehicle.transmission?.replaceAll("_", " "))}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CarFront className="mt-1 size-5 shrink-0 text-info" aria-hidden="true" />
                                <div>
                                    <p className="detail-label">Power</p>
                                    <p className="mt-1 text-base font-semibold sm:text-lg">
                                        {formatVehicleValue(vehicle.power_hp != null ? `${vehicle.power_hp} hp` : null)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 border-t border-line pt-4 text-xs text-muted">Mileage last recorded on 15 October 2026</p>
                    </div>
                </div>
            </section>
        </>
    )
}
