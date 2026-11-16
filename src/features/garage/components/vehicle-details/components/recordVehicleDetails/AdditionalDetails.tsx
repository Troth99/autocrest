import type { VehicleServiceRecordDetails } from "@/features/garage/types/vehicle-service-record";
import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";
import { formatDate } from "@/shared/utils/formatDate";
import { ClipboardList, Droplets, Package, ShieldCheck } from "lucide-react";


export default function AdditionalDetails({ vehicleReportById }: { vehicleReportById: VehicleServiceRecordDetails }) {

    return (
        <>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
                <section className="min-w-0 border-t border-line pt-5">
                    <h2 className="maintenance-section-title"><span className="maintenance-section-icon">
                        <ClipboardList className="size-4" aria-hidden="true" /></span>Additional details</h2>

                    <dl className="mt-4 space-y-5">
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Symptoms before service</dt>
                            <dd className="maintenance-detail-value">
                                {formatVehicleValue(vehicleReportById.symptoms)}
                            </dd>
                        </div>
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Service outcome</dt>
                            <dd className="maintenance-detail-value">
                                {vehicleReportById.serviceOutcomeLabel}
                            </dd>
                        </div>
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Invoice number</dt>
                            <dd className="maintenance-detail-value">{formatVehicleValue(vehicleReportById.invoiceNumber)}</dd>
                        </div>
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Recommended work</dt>
                            <dd className="maintenance-detail-value">
                                {formatVehicleValue(vehicleReportById.recommendedWork)}
                            </dd>
                        </div>
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Notes</dt>
                            <dd className="maintenance-detail-value">
                                {formatVehicleValue(vehicleReportById.notes)}
                            </dd>
                        </div>
                    </dl>
                </section>

                <section className="min-w-0 border-t border-line pt-5">
                    <h2 className="maintenance-section-title"><span className="maintenance-section-icon">
                        <Package className="size-4" aria-hidden="true" /></span>Replaced part</h2>

                    <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Part name</dt>
                            <dd className="maintenance-detail-value">{formatVehicleValue(vehicleReportById.partName)}</dd>
                        </div>
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Brand</dt>
                            <dd className="maintenance-detail-value">{formatVehicleValue(vehicleReportById.partBrand)}</dd>
                        </div>
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Part number</dt>
                            <dd className="maintenance-detail-value">{formatVehicleValue(vehicleReportById.partNumber)}</dd>
                        </div>
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Quantity</dt>
                            <dd className="maintenance-detail-value">{formatVehicleValue(vehicleReportById.partQuantity)}</dd>
                        </div>
                    </dl>
                </section>

                <section className="min-w-0 border-t border-line pt-5">
                    <h2 className="maintenance-section-title"><span className="maintenance-section-icon">
                        <Droplets className="size-4" aria-hidden="true" /></span>Fluids used</h2>

                    <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Fluid type</dt>
                            <dd className="maintenance-detail-value">{vehicleReportById.fluidTypeLabel}</dd>
                        </div>
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Brand / specification</dt>
                            <dd className="maintenance-detail-value">{formatVehicleValue(vehicleReportById.fluidSpecification)}</dd>
                        </div>
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Quantity</dt>
                            <dd className="maintenance-detail-value">{vehicleReportById.fluidQuantity != null
                                ? `${vehicleReportById.fluidQuantity.toLocaleString("en-GB")} liters`
                                : "Not provided"}</dd>
                        </div>
                    </dl>
                </section>

                <section className="min-w-0 border-t border-line pt-5">
                    <h2 className="maintenance-section-title"><span className="maintenance-section-icon">
                        <ShieldCheck className="size-4" aria-hidden="true" /></span>Warranty limits</h2>

                    <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Valid until</dt>
                            <dd className="maintenance-detail-value">
                                {vehicleReportById.warrantyDate ? (
                                    <time dateTime={vehicleReportById.warrantyDate}>
                                        {formatDate(vehicleReportById.warrantyDate)}
                                    </time>
                                ) : "Not provided"}
                            </dd>
                        </div>
                        <div className="maintenance-detail-field">
                            <dt className="maintenance-detail-label">Odometer limit</dt>
                            <dd className="maintenance-detail-value">{vehicleReportById.warrantyMileageKm != null
                                ? `${vehicleReportById.warrantyMileageKm.toLocaleString("en-GB")} km`
                                : "Not provided"}</dd>
                        </div>
                    </dl>
                </section>
            </div>
        </>
    )
}