import { Camera, CarFront, Check, Cog, Fuel, Gauge, MapPin } from "lucide-react";


export default function VehicleOverview() {

    return (
        <>
            <section aria-label="Vehicle overview" className="overflow-hidden rounded-3xl border border-line bg-panel">
                <div className="grid lg:grid-cols-[1fr_1.2fr]">
                    <div className="garage-vehicle-placeholder relative flex min-h-64 flex-col items-center justify-center gap-4 border-b border-line p-8 lg:border-b-0 lg:border-r">
                        <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-ink">
                            <Check className="size-3.5" aria-hidden="true" /> Primary vehicle
                        </span>
                        <CarFront className="size-28 stroke-1 text-accent-text" aria-hidden="true" />
                        <p className="text-xs text-muted">Your vehicle photo will appear here</p>
                        <button type="button" disabled className="button-base button-secondary gap-2 border px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-60" title="Change photo is not connected yet">
                            <Camera className="size-4" aria-hidden="true" /> Change photo</button>
                    </div>
                    <div className="flex flex-col justify-center p-6 sm:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="rounded-lg border border-info-border bg-background px-4 py-2 font-mono text-lg font-semibold tracking-widest">CB1234AB</span>
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
                                    <div><p className="text-xs text-muted">{label}</p><p className="mt-1 text-base font-semibold sm:text-lg">{value}</p></div>
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