import type { VehicleServiceRecord } from "@/features/garage/types/vehicle-service-record";
import { vehicleServiceLabels } from "@/features/garage/constants/vehicle-service-labels";
import { Bell, CalendarDays, Gauge, Plus } from "lucide-react";

export default function VehicleReminders({ vehicleServices }: {
  vehicleServices: VehicleServiceRecord[];
}) {
  const scheduledServices = vehicleServices
    .filter((service) => service.nextServiceDate != null || service.nextServiceMileageKm != null)
    .sort((a, b) => {
      if (!a.nextServiceDate) return b.nextServiceDate ? 1 : 0;
      if (!b.nextServiceDate) return -1;
      return a.nextServiceDate.localeCompare(b.nextServiceDate);
    });

  return (
    <section aria-labelledby="vehicle-reminders-heading" className="mb-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 id="vehicle-reminders-heading" className="text-lg font-semibold">Reminders</h2>
            {scheduledServices.length > 0 && (
              <span className="rounded-full bg-info-soft px-2 py-0.5 text-xs font-medium text-info">{scheduledServices.length}</span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted">What to take care of next.</p>
        </div>
        <button type="button" className="button-base button-primary shrink-0 cursor-pointer gap-1.5 px-4 py-2.5 text-xs">
          <Plus className="size-4" aria-hidden="true" /> Add reminder
        </button>
      </div>
      {scheduledServices.length === 0 ? (
        <div className="flex items-center gap-4 rounded-2xl border border-dashed border-info-border bg-info-soft/40 p-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-info-soft text-info">
            <Bell className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium">No reminders</p>
            <p className="mt-1 field-description">Set a date or mileage when recording your next service.</p>
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {scheduledServices.map((service) => (
            <li key={service.id} className="flex items-start gap-3 rounded-2xl border border-info-border bg-info-soft/40 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-info-soft text-info">
                <Bell className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="wrap-break-word text-sm font-semibold">{service.customServiceType || vehicleServiceLabels[service.serviceType]}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
                  {service.nextServiceDate && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      <time dateTime={service.nextServiceDate}>
                        {new Date(`${service.nextServiceDate}T00:00:00`).toLocaleDateString("en-GB", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </time>
                    </span>
                  )}
                  {service.nextServiceMileageKm != null && (
                    <span className="inline-flex items-center gap-1.5">
                      <Gauge className="size-3.5" aria-hidden="true" />
                      At {service.nextServiceMileageKm.toLocaleString("en-GB")} km
                    </span>
                  )}
                </div>
                {service.recommendedWork && (
                  <p className="mt-2 whitespace-pre-line wrap-break-word field-description">{service.recommendedWork}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
