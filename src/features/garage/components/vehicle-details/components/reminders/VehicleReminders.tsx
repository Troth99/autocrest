import type { VehicleServiceRecord } from "@/features/garage/types/vehicle-service-record";
import { vehicleServiceLabels } from "@/features/garage/constants/vehicle-service-labels";
import { Wrench } from "lucide-react";
import { formatDate } from "@/shared/utils/formatDate";

export default function VehicleReminders({
  vehicleServices,
}: {
  vehicleServices: VehicleServiceRecord[];
}) {
  const scheduledServices = vehicleServices
    .filter(
      (service) =>
        service.nextServiceDate != null || service.nextServiceMileageKm != null,
    )
    .sort((a, b) => {
      if (!a.nextServiceDate) return b.nextServiceDate ? 1 : 0;
      if (!b.nextServiceDate) return -1;
      return a.nextServiceDate.localeCompare(b.nextServiceDate);
    });

  function renderService(service: VehicleServiceRecord) {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-6">
        <Wrench className="size-4 shrink-0 text-amber-600 dark:text-amber-300" aria-hidden="true" />
        <p className="min-w-0 wrap-break-word font-semibold text-amber-950 dark:text-amber-50">
          Next service: {service.recommendedWork || service.customServiceType || vehicleServiceLabels[service.serviceType]}
        </p>
        <span className="hidden text-amber-600 dark:text-amber-300 sm:inline" aria-hidden="true">/</span>
        <p className="text-amber-900 dark:text-amber-100">
          Due
          {service.nextServiceMileageKm != null && (
            <> at {service.nextServiceMileageKm.toLocaleString("en-GB")} km</>
          )}
          {service.nextServiceDate && (
            <>{service.nextServiceMileageKm != null ? " or " : " on "}<time dateTime={service.nextServiceDate}>{formatDate(service.nextServiceDate)}</time></>
          )}
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Upcoming service" className={scheduledServices.length > 0
      ? "rounded-lg border border-amber-500/50 bg-amber-500/15 px-4 py-3 text-text-primary shadow-[0_0_18px_rgba(245,158,11,0.12)]"
      : "rounded-lg border border-line bg-panel px-4 py-3 text-text-primary"}>
      {scheduledServices.length > 0 ? (
        renderService(scheduledServices[0])
      ) : (
        <p className="flex items-center gap-3 text-sm leading-6 text-text-secondary">
          <Wrench className="size-4 shrink-0 text-amber-600 dark:text-amber-300" aria-hidden="true" />
          No upcoming service recorded. Set a next-service date or mileage in a service record.
        </p>
      )}
      {scheduledServices.length > 1 && (
        <details className="mt-2 border-t border-amber-500/30 pt-2">
          <summary className="cursor-pointer rounded text-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-focus">
            More scheduled services ({scheduledServices.length - 1})
          </summary>
          <ul className="mt-2 space-y-2">
            {scheduledServices.slice(1).map((service) => (
              <li key={service.id}>{renderService(service)}</li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
