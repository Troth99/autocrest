import type { VehicleServiceRecord } from "@/features/garage/types/vehicle-service-record";
import { vehicleServiceLabels } from "@/features/garage/constants/vehicle-service-labels";
import { ChevronRight, Wrench } from "lucide-react";
import { formatDate } from "@/shared/utils/formatDate";
import Link from "next/link";

export default function VehicleActivity({ vehicleServices }: { vehicleServices: VehicleServiceRecord[] }) {
  if (vehicleServices.length === 0) {
    return (
      <p className="py-5 text-sm leading-6 text-text-secondary">
        No service records yet. Add a service to start your vehicle history.
      </p>
    );
  }

  return (
    <ol className="divide-y divide-line">
      {vehicleServices.map((service) => (
        <li key={service.id}>
          <Link
            href={`/vehicles/${service.vehicleId}/maintenance/${service.id}`}
            className="flex items-center gap-3 rounded-lg py-3 outline-offset-4 hover:bg-info-soft focus-visible:outline-2 focus-visible:outline-focus"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-info-soft text-accent">
              <Wrench className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="wrap-break-word text-sm font-semibold">
                {service.customServiceType || vehicleServiceLabels[service.serviceType]}
              </h3>
              <p className="mt-1 flex flex-wrap gap-x-2 text-xs leading-5 text-text-secondary">
                <time dateTime={service.serviceDate}>{formatDate(service.serviceDate)}</time>
                <span aria-hidden="true">/</span>
                <span>{service.mileageKm.toLocaleString("en-GB")} km</span>
              </p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ol>
  );
}
