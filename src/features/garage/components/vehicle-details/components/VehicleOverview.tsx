import { Camera, CarFront, Check, Cog, Fuel, Gauge, MapPin } from "lucide-react";


export default function VehicleOverview() {

    return (
        <>
            <section aria-label="Vehicle overview" className="overflow-hidden rounded-3xl border border-line bg-panel">
                <div className="grid lg:grid-cols-[1fr_1.2fr]">
                    <div className="garage-vehicle-placeholder vehicle-overview-photo">
                        <span className="vehicle-overview-primary">
                            <Check className="size-3.5" aria-hidden="true" /> Primary vehicle
                        </span>
                        <CarFront className="size-28 stroke-1 text-accent-text" aria-hidden="true" />
                        <p className="detail-label">Your vehicle photo will appear here</p>
                        <button type="button" disabled className="vehicle-detail-action" title="Change photo is not connected yet">
                            <Camera className="size-4" aria-hidden="true" /> Change photo</button>
                    </div>
                    <div className="flex flex-col justify-center p-6 sm:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="vehicle-overview-plate">CB1234AB</span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-muted"><MapPin className="size-4" aria-hidden="true" /> Bulgaria</span>
                        </div>
                        <div className="mt-7 grid grid-cols-2 gap-5">
                            {[
                                { label: "Current mileage", value: "112,500 km", icon: Gauge },
                                { label: "Fuel type", value: "Petrol", icon: Fuel },
                                { label: "Transmission", value: "Manual", icon: Cog },
                                { label: "Engine power", value: "125 hp", icon: CarFront },
                            ].map(({ label, value, icon: Icon }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <Icon className="mt-1 size-5 shrink-0 text-info" aria-hidden="true" />
                                    <div><p className="detail-label">{label}</p><p className="mt-1 text-base font-semibold sm:text-lg">{value}</p></div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 border-t border-line pt-4 text-xs text-muted">Mileage last recorded on 15 October 2026</p>
                    </div>
                </div>
            </section>
        </>
    )
}