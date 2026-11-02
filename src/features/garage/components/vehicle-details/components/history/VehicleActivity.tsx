import type { VehicleServiceRecord } from "@/features/garage/types/vehicle-service-record";
import { vehicleServiceLabels } from "@/features/garage/constants/vehicle-service-labels";
import { ArrowUpRight, Wrench } from "lucide-react";
import { formatDate } from "@/shared/utils/formatDate";

export default function VehicleActivity({ vehicleServices }: {
  vehicleServices: VehicleServiceRecord[];
}) {

  function getServiceLabel(service: VehicleServiceRecord) {
    return service.customServiceType || vehicleServiceLabels[service.serviceType];
  }

  function formatMileage(mileageKm: number) {
    return mileageKm.toLocaleString("en-GB");
  }

  function formatServiceCost(service: VehicleServiceRecord) {
    return ((service.partsCost ?? 0) + (service.laborCost ?? 0)).toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <>
      {vehicleServices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line px-5 py-8 text-center">
          <Wrench className="mx-auto mb-3 size-6 text-muted" aria-hidden="true" />
          <p className="text-sm font-medium">No service records yet</p>
          <p className="mt-1 field-description">Your maintenance and repairs will appear here.</p>
        </div>
      ) : (
        <ol className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-background/30">
          {vehicleServices.map((service) => (
            <li key={service.id} className="p-4 sm:p-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-panel text-muted">
                  <Wrench className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <h3 className="wrap-break-word text-sm font-semibold">
                      {getServiceLabel(service)}
                    </h3>
                    <time dateTime={service.serviceDate} className="field-description">
                      {formatDate(service.serviceDate)}
                    </time>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                    <span>{formatMileage(service.mileageKm)} km</span>
                    {service.provider && <span className="wrap-break-word">{service.provider}</span>}
                  </div>
                  {service.workPerformed && (
                    <p className="mt-3 line-clamp-2 whitespace-pre-line wrap-break-word section-description">{service.workPerformed}</p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold tabular-nums">
                      {(service.partsCost != null || service.laborCost != null) && (
                        <>{formatServiceCost(service)} <span className="text-xs font-normal text-muted">{service.currencyCode}</span></>
                      )}
                    </p>
                    <button type="button"
                      aria-label={`View details for ${getServiceLabel(service)} on ${service.serviceDate}`}
                      disabled title="Details not available"
                      className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-info-border bg-info-soft px-3 py-2 text-xs font-semibold text-info">
                      View details <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
