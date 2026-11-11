import type { VehicleServiceRecordDetails } from "@/features/garage/types/vehicle-service-record";
import { formatDate } from "@/shared/utils/formatDate";
import {
    ClipboardList,
    Package,
    Droplets,
    ShieldCheck,
    ChevronDown,
    CarFront,
    CalendarDays,
} from "lucide-react";
import ServiceDetailsMainCard from "./ServiceDetailsMainCard";
import VehicleCost from "./VehicleCost";
import ServiceReminder from "./ServiceReminder";


export default function RecordVehicleDetails({
    vehicleReportById

}: {
    vehicleReportById: VehicleServiceRecordDetails
}) {

    return (
        <main className="page-shell">
            <article className="mx-auto max-w-4xl space-y-5">
                <header className="pb-3">
                    <p className="vehicle-heading-eyebrow">
                        My garage / Maintenance
                    </p>
                    <h1 className="vehicle-heading-title">
                        {vehicleReportById.serviceTypeLabel}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <p className="flex items-center gap-2 text-base font-medium">
                            <CarFront className="size-4 text-info" aria-hidden="true" />
                            {vehicleReportById.vehicleName}
                        </p>
                        <p className="flex items-center gap-2 text-sm text-muted">
                            <CalendarDays className="size-4" aria-hidden="true" />
                            <time dateTime={vehicleReportById.serviceDate}>
                                {formatDate(vehicleReportById.serviceDate)}
                            </time>
                        </p>
                    </div>
                </header>

                <ServiceDetailsMainCard vehicleReportById={vehicleReportById} />

                <div className="grid items-stretch gap-5 md:grid-cols-2">
                    <VehicleCost vehicleReportById={vehicleReportById} />
                    <ServiceReminder vehicleReportById={vehicleReportById} />
                </div>

                <details className="section-card group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
                        <span>
                            <span className="section-title block">Technical details & notes</span>
                            <span className="mt-1 block text-sm text-muted">Parts, fluids, warranty and service notes</span>
                        </span>
                        <ChevronDown className="size-5 shrink-0 text-info transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <section className="min-w-0 border-t border-line pt-5">
                            <h2 className="maintenance-section-title"><span className="maintenance-section-icon"><ClipboardList className="size-4" aria-hidden="true" /></span>Additional details</h2>

                            <dl className="mt-4 space-y-5">
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Symptoms before service</dt>
                                    <dd className="maintenance-detail-value">
                                        No symptoms. Routine maintenance.
                                    </dd>
                                </div>
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Service outcome</dt>
                                    <dd className="maintenance-detail-value">
                                        Service completed. No leaks found.
                                    </dd>
                                </div>
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Invoice number</dt>
                                    <dd className="maintenance-detail-value">INV-2026-1042</dd>
                                </div>
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Recommended work</dt>
                                    <dd className="maintenance-detail-value">
                                        Inspect front brake pads at the next service.
                                    </dd>
                                </div>
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Notes</dt>
                                    <dd className="maintenance-detail-value">
                                        Service indicator reset after the oil change.
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        <section className="min-w-0 border-t border-line pt-5">
                            <h2 className="maintenance-section-title"><span className="maintenance-section-icon"><Package className="size-4" aria-hidden="true" /></span>Replaced part</h2>

                            <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Part name</dt>
                                    <dd className="maintenance-detail-value">Oil filter</dd>
                                </div>
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Brand</dt>
                                    <dd className="maintenance-detail-value">MANN-FILTER</dd>
                                </div>
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Part number</dt>
                                    <dd className="maintenance-detail-value">HU 816 x</dd>
                                </div>
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Quantity</dt>
                                    <dd className="maintenance-detail-value">1</dd>
                                </div>
                            </dl>
                        </section>

                        <section className="min-w-0 border-t border-line pt-5">
                            <h2 className="maintenance-section-title"><span className="maintenance-section-icon"><Droplets className="size-4" aria-hidden="true" /></span>Fluids used</h2>

                            <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Fluid type</dt>
                                    <dd className="maintenance-detail-value">Engine oil</dd>
                                </div>
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Brand / specification</dt>
                                    <dd className="maintenance-detail-value">Castrol EDGE 5W-30</dd>
                                </div>
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Quantity</dt>
                                    <dd className="maintenance-detail-value">5.2 liters</dd>
                                </div>
                            </dl>
                        </section>

                        <section className="min-w-0 border-t border-line pt-5">
                            <h2 className="maintenance-section-title"><span className="maintenance-section-icon"><ShieldCheck className="size-4" aria-hidden="true" /></span>Warranty limits</h2>

                            <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Valid until</dt>
                                    <dd className="maintenance-detail-value">
                                        <time dateTime="2027-10-30">30 Oct 2027</time>
                                    </dd>
                                </div>
                                <div className="maintenance-detail-field">
                                    <dt className="maintenance-detail-label">Odometer limit</dt>
                                    <dd className="maintenance-detail-value">165,200 km</dd>
                                </div>
                            </dl>
                        </section>
                    </div>
                </details>
            </article>
        </main>
    );

}
