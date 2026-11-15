import type { VehicleServiceRecordDetails } from "@/features/garage/types/vehicle-service-record";
import { formatDate } from "@/shared/utils/formatDate";
import {
    ChevronDown,
    CarFront,
    CalendarDays,
} from "lucide-react";
import ServiceDetailsMainCard from "./ServiceDetailsMainCard";
import VehicleCost from "./VehicleCost";
import ServiceReminder from "./ServiceReminder";
import AdditionalDetails from "./AdditionalDetails";


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
               
               <AdditionalDetails vehicleReportById={vehicleReportById} />
                </details>
            </article>
        </main>
    );

}
