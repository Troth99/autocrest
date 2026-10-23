import VehicleHeading from "./components/VehicleHeading";
import VehicleOverview from "./components/VehicleOverview";
import VehicleMainActions from "./components/VehicleMainActions";
import VehicleSpecifications from "./components/VehicleSpecifications";
import VehicleRegistration from "./components/VehicleRegistration";
import VehicleActivity from "./components/VehicleActivity";
import VehicleReminders from "./components/VehicleReminders";
import VehicleNotes from "./components/VehicleNotes";
import type { Vehicle } from "@/features/garage/types/vehicle";

export default function VehicleDetails({
  vehicle,
  photoUrl,
  photoId
}:
  {
    vehicle: Vehicle;
    photoUrl?: string | null
    photoId?: string | null
  }) {
    
  return (
    <div className="space-y-6">
      <section aria-label="Vehicle overview"
        className="section-card overflow-hidden bg-linear-to-br from-info-soft to-panel">

        <VehicleHeading vehicle={vehicle} photoUrl={photoUrl} photoId={photoId} />

        <VehicleOverview vehicle={vehicle} />

      </section>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <section
          aria-labelledby="vehicle-history-heading"
          className="section-card min-w-0">

          <VehicleMainActions />

          <div className="mt-6 border-t border-line pt-6">
            <div
              className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="vehicle-history-heading"
                className="text-xl font-semibold tracking-tight">
                Maintenance &amp; History</h2>
              <span
                className="rounded-full border border-info-border bg-info-soft px-2.5 py-1 text-xs text-info">
                Sample data</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">
              Reminders and history below are examples. Record actions are coming soon.</p>
            <VehicleReminders />
            <VehicleActivity />
          </div>
        </section>
        <aside className="min-w-0 space-y-6">

          <VehicleSpecifications vehicle={vehicle} />
          <VehicleRegistration vehicle={vehicle} />
          {vehicle.description?.trim() && <VehicleNotes description={vehicle.description} />}
        </aside>
      </div>
    </div>
  );
}
