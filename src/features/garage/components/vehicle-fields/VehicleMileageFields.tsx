import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import type { VehicleFormRegister } from "@/features/garage/types/add-vehicle-form";

type Props = {
  errors: VehicleFormErrors;
  register: VehicleFormRegister;
};

export default function VehicleMileageFields({
  errors,
  register,
}: Props) {
  return (
    <fieldset className="content-card vehicle-form-section">
      <legend className="sr-only">Mileage</legend>
      <h2 className="section-title">Mileage</h2>
      <p className="mt-1 text-sm text-muted">
        Your current odometer reading, in kilometres.
      </p>
      <div className="vehicle-fields-grid">
        <label
          htmlFor="mileage_km"
          className="form-field"
        >
          <span>Current mileage (km) *</span>
          <input
            data-slot="input"
            className="native-input"
            id="mileage_km"
            {...register("mileage_km")}
            type="number"
            placeholder="e.g. 85000"
            min={0}
            aria-invalid={Boolean(errors.mileage_km)}
            aria-describedby={errors.mileage_km ? "mileage_km-error" : undefined}
          />
          <VehicleFieldError
            field="mileage_km"
            message={errors.mileage_km}
          />
        </label>

        <label
          htmlFor="mileage_recorded_at"
          className="form-field"
        >
          <span>Mileage recorded on</span>
          <input
            data-slot="input"
            className="native-input"
            id="mileage_recorded_at"
            {...register("mileage_recorded_at")}
            type="date"
            aria-invalid={Boolean(errors.mileage_recorded_at)}
            aria-describedby={errors.mileage_recorded_at ? "mileage_recorded_at-error" : undefined}
          />
          <VehicleFieldError
            field="mileage_recorded_at"
            message={errors.mileage_recorded_at}
          />
        </label>
      </div>
    </fieldset>
  );
}
