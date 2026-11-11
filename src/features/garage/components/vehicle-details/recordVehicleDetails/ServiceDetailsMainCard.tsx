import type { VehicleServiceRecordDetails } from "@/features/garage/types/vehicle-service-record";
import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";
import { formatDate } from "@/shared/utils/formatDate";
import { Wrench } from "lucide-react";


export default function ServiceDetailsMainCard({
    vehicleReportById
}: {
    vehicleReportById: VehicleServiceRecordDetails;
}) {

    return (
          <section className="section-card" aria-label="Service details">
                    <h2 className="maintenance-section-title"><span className="maintenance-section-icon"><Wrench className="size-4" aria-hidden="true" /></span>Service details</h2>

             
        <dl className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
                <dt className="detail-label">Service type</dt>
                <dd className="detail-value">
                    {vehicleReportById.serviceTypeLabel}
                </dd>
            </div>
            <div>
                <dt className="detail-label">Reason for visit</dt>
                <dd className="detail-value">
                    {vehicleReportById.visitReasonLabel}
                </dd>
            </div>
            <div>
                <dt className="detail-label">Date</dt>
                <dd className="detail-value">
                    <time dateTime={vehicleReportById.serviceDate}>{formatDate(vehicleReportById.serviceDate)}</time>
                </dd>
            </div>
            <div>
                <dt className="detail-label">Mileage</dt>
                <dd className="detail-value">{formatVehicleValue(vehicleReportById.mileageKm != null ? `${vehicleReportById.mileageKm.toLocaleString("en-GB")} km` : null)}</dd>
            </div>
            <div className="sm:col-span-2">
                <dt className="detail-label">Workshop / mechanic</dt>
                <dd className="detail-value">{formatVehicleValue(vehicleReportById.provider)}</dd>
            </div>
            <div className="sm:col-span-2">
                <dt className="detail-label">Work performed</dt>
                <dd className="detail-value">
                    {formatVehicleValue(vehicleReportById.workPerformed)}
                </dd>
            </div>
        </dl>
        </section>
    )
}
