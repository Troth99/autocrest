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
          htmlFor="mileageKm"
          className="form-field"
        >
          <span>Current mileage (km) *</span>
          <input
            data-slot="input"
            className="native-input"
            id="mileageKm"
            {...register("mileageKm")}
            type="number"
            placeholder="e.g. 85000"
            min={0}
            aria-invalid={Boolean(errors.mileageKm)}
            aria-describedby={errors.mileageKm ? "mileageKm-error" : undefined}
          />
          <VehicleFieldError
            field="mileageKm"
            message={errors.mileageKm}
          />
        </label>

        <label
          htmlFor="mileageRecordedAt"
          className="form-field"
        >
          <span>Mileage recorded on</span>
          <input
            data-slot="input"
            className="native-input"
            id="mileageRecordedAt"
            {...register("mileageRecordedAt")}
            type="date"
            aria-invalid={Boolean(errors.mileageRecordedAt)}
            aria-describedby={errors.mileageRecordedAt ? "mileageRecordedAt-error" : undefined}
          />
          <VehicleFieldError
            field="mileageRecordedAt"
            message={errors.mileageRecordedAt}
          />
        </label>
      </div>
    </fieldset>
  );
}
