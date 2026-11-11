import { VehicleServiceRecordDetails } from "@/features/garage/types/vehicle-service-record";
import { formatDate } from "@/shared/utils/formatDate";
import { CalendarClock } from "lucide-react";


export default function ServiceReminder(
    { vehicleReportById }:
        {
            vehicleReportById: VehicleServiceRecordDetails

        }) {

    return (
        <section className="section-card border-info-border bg-info-soft">
            <h2 className="maintenance-section-title"><span className="maintenance-section-icon">
                <CalendarClock className="size-4" aria-hidden="true" /></span>Next service reminder</h2>

            <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                    <dt className="detail-label">Due date</dt>
                    <dd className="detail-value">
                        {vehicleReportById.nextServiceDate ? (
                            <time dateTime={vehicleReportById.nextServiceDate}>
                                {formatDate(vehicleReportById.nextServiceDate)}
                            </time>
                        ) : (
                            "Not provided"
                        )}
                    </dd>
                </div>
                <div>
                    <dt className="detail-label">Due at mileage</dt>
                    <dd className="detail-value">
                        {vehicleReportById.nextServiceMileageKm != null
                            ? `${vehicleReportById.nextServiceMileageKm.toLocaleString()} km`
                            : "Not provided"}
                    </dd>
                </div>
            </dl>
        </section>
    )
}