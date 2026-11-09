import type { VehicleServiceRecordDetails } from "@/features/garage/types/vehicle-service-record";
import { formatDate } from "@/shared/utils/formatDate";
import { Wrench, Receipt, CalendarClock, ClipboardList, Package, Droplets, ShieldCheck, ChevronDown } from "lucide-react";
import ServiceDetailsMainCard from "./ServiceDetailsMainCard";


export default function RecordVehicleDetails({
     vehicleReportById

    }: {
        vehicleReportById: VehicleServiceRecordDetails
    }) {

    return (
        <main className="page-shell">
            <article className="mx-auto max-w-4xl space-y-5">
                <header className="pb-2">
                    <p className="vehicle-heading-eyebrow">
                        My garage / Maintenance
                    </p>
                    <p className="mt-2 text-sm text-muted">
                        Service record at · {formatDate(vehicleReportById?.serviceDate)} 
                    </p>
                </header>

                <section className="section-card" aria-label="Service details">
                    <h2 className="maintenance-section-title"><span className="maintenance-section-icon"><Wrench className="size-4" aria-hidden="true" /></span>Service details</h2>
                    <ServiceDetailsMainCard vehicleReportById={vehicleReportById} />
                  
                </section>

                <div className="grid items-stretch gap-5 md:grid-cols-2">
                    <section className="section-card">
                        <h2 className="maintenance-section-title"><span className="maintenance-section-icon"><Receipt className="size-4" aria-hidden="true" /></span>Cost</h2>

                        <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                            <div>
                                <dt className="detail-label">Parts</dt>
                                <dd className="detail-value">90.00 €</dd>
                            </div>
                            <div>
                                <dt className="detail-label">Labor</dt>
                                <dd className="detail-value">30.00 €</dd>
                            </div>
                        </dl>

                        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                            <span className="text-sm text-muted">Total cost</span>
                            <span className="text-3xl font-semibold tracking-tight text-info-strong">120.00 €</span>
                        </div>
                    </section>
                    <section className="section-card border-info-border bg-info-soft">
                        <h2 className="maintenance-section-title"><span className="maintenance-section-icon"><CalendarClock className="size-4" aria-hidden="true" /></span>Next service reminder</h2>

                        <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                            <div>
                                <dt className="detail-label">Due date</dt>
                                <dd className="detail-value">
                                    <time dateTime="2027-10-30">30 Oct 2027</time>
                                </dd>
                            </div>
                            <div>
                                <dt className="detail-label">Due at mileage</dt>
                                <dd className="detail-value">155,200 km</dd>
                            </div>
                        </dl>
                    </section>
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
