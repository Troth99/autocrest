import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import { Input } from "@/shared/components/ui/input";
import type { VehicleFormRegister } from "@/features/garage/types/add-vehicle-form";

type Props = { errors: VehicleFormErrors;
  register: VehicleFormRegister;
};

export default function VehicleMileageFields({ errors, register }: Props) {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">Mileage</legend>
      <h2 className="section-title">Mileage</h2>
      <p className="mt-1 text-sm text-muted">
        Your current odometer reading, in kilometres.
      </p>
      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <label
          htmlFor="mileage_km"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Current mileage (km) *</span>
          <Input
            id="mileage_km"
            {...register("mileage_km")}
            type="number"
            placeholder="e.g. 85000"
            min={0}
          aria-invalid={Boolean(errors.mileage_km)} aria-describedby={errors.mileage_km ? "mileage_km-error" : undefined} />
<VehicleFieldError field="mileage_km" message={errors.mileage_km} />
        </label>
        <label
          htmlFor="mileage_recorded_at"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Mileage recorded on</span>
          <Input
            id="mileage_recorded_at"
            {...register("mileage_recorded_at")}
            type="date"
          aria-invalid={Boolean(errors.mileage_recorded_at)} aria-describedby={errors.mileage_recorded_at ? "mileage_recorded_at-error" : undefined} />
<VehicleFieldError field="mileage_recorded_at" message={errors.mileage_recorded_at} />
        </label>
      </div>
    </fieldset>
  );
}
