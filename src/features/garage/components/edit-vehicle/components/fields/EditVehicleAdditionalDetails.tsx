import type { Vehicle } from "@/features/garage/types/vehicle";

type Props = {
  vehicle: Vehicle;
};

export default function EditVehicleAdditionalDetails({ vehicle }: Props) {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5 xl:col-span-2">
      <legend className="sr-only">Additional details</legend>
      <h2 className="section-title">Additional details</h2>
      <label htmlFor="description" className="mt-4 grid gap-2 text-sm font-medium text-text-secondary">
        Notes
        <textarea id="description" name="description" defaultValue={vehicle.description ?? ""} rows={4}
          placeholder="Modifications, service notes, or anything else you want to remember." className="form-textarea" />
      </label>
      <label htmlFor="is_primary" className="mt-5 flex items-start gap-3 text-sm text-text-secondary">
        <input id="is_primary" name="is_primary" type="checkbox" defaultChecked={vehicle.is_primary} className="mt-1 size-4 accent-info" />
        <span>Set as my primary vehicle<span className="mt-1 block text-xs text-muted">The vehicle you use most often.</span></span>
      </label>
    </fieldset>
  );
}
