import { Input } from "@/shared/components/ui/input";

export default function VehicleMileageFields() {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">Mileage</legend>
      <h2 className="section-title">Mileage</h2>
      <p className="mt-1 text-sm text-muted">
        Your current odometer reading, in kilometres.
      </p>
      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label
          htmlFor="mileage_km"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Current mileage (km) *</span>
          <Input
            id="mileage_km"
            name="mileage_km"
            type="number"
            placeholder="e.g. 85000"
            required
            min={0}
          />
        </label>
        <label
          htmlFor="mileage_recorded_at"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Mileage recorded on</span>
          <Input
            id="mileage_recorded_at"
            name="mileage_recorded_at"
            type="date"
          />
        </label>
      </div>
    </fieldset>
  );
}
