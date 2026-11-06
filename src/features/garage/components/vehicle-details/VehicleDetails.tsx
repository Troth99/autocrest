import VehicleHeading from "./components/overview/VehicleHeading";
import VehicleOverview from "./components/overview/VehicleOverview";
import VehicleMainActions from "./components/actions/VehicleMainActions";
import VehicleSpecifications from "./components/information/VehicleSpecifications";
import VehicleRegistration from "./components/information/VehicleRegistration";
import VehicleActivity from "./components/history/VehicleActivity";
import VehicleReminders from "./components/reminders/VehicleReminders";
import VehicleNotes from "./components/information/VehicleNotes";
import type { Vehicle } from "@/features/garage/types/vehicle";
import type { VehicleServiceRecord } from "@/features/garage/types/vehicle-service-record";
import { ArrowRight } from "lucide-react";

export default function VehicleDetails({
  vehicle,
  photoUrl,
  photoId,
  vehicleServices,
}: {
  vehicle: Vehicle;
  photoUrl?: string | null;
  photoId?: string | null;
  vehicleServices: VehicleServiceRecord[];
}) {
  return (
    <div className="space-y-6">
      <section
        aria-label="Vehicle overview"
        className="section-card overflow-hidden bg-linear-to-br from-info-soft to-panel"
      >
        <VehicleHeading
          vehicle={vehicle}
          photoUrl={photoUrl}
          photoId={photoId}
        />

        <VehicleOverview vehicle={vehicle} />
      </section>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <section
          aria-labelledby="vehicle-history-heading"
          className="section-card min-w-0"
        >
          <VehicleMainActions vehicleId={vehicle.id} />

          <div className="mt-6 border-t border-line pt-6">

            <VehicleReminders vehicleServices={vehicleServices} />
            
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
              <div>
                <h2
                  id="vehicle-history-heading"
                  className="text-lg font-semibold"
                >
                  Service history
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Maintenance and repairs, newest first.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
                  {vehicleServices.length}{" "}
                  {vehicleServices.length === 1 ? "record" : "records"}
                </span>
                {vehicleServices.length > 5 && (
                  <button
                    type="button"
                    className="button-base button-secondary cursor-pointer gap-2 px-3 py-2 text-xs"
                  >
                    View all services
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
            <VehicleActivity vehicleServices={vehicleServices} />
          </div>
        </section>
        <aside className="min-w-0 space-y-6">
          <VehicleSpecifications vehicle={vehicle} />
          <VehicleRegistration vehicle={vehicle} />
          {vehicle.description?.trim() && (
            <VehicleNotes description={vehicle.description} />
          )}
        </aside>
      </div>
    </div>
  );
}
