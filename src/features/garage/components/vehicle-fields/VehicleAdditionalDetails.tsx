import type { Vehicle } from "@/features/garage/types/vehicle";
import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";

type Props = {
  onClearFieldError?: (field: keyof VehicleFormErrors) => void;
  errors: VehicleFormErrors;
  defaultValues?: Vehicle;
};

export default function VehiclAdditionalDetails({
  onClearFieldError,
  errors,
  defaultValues,
}: Props) {
  return (
    <fieldset className="content-card vehicle-form-section">
      <legend className="sr-only">Additional details</legend>
      <h2 className="section-title">Additional details</h2>
      <label
        htmlFor="description"
        className="mt-4 form-field"
      >
        Description
        <textarea
          id="description"
          name="description"
          onInput={() => onClearFieldError?.("description")}
          defaultValue={defaultValues?.description ?? ""}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
          rows={4}
          placeholder="Notes about your vehicle, modifications, or anything else you want to remember."
          className="form-textarea"
        />
        <VehicleFieldError
          field="description"
          message={errors.description}
        />
      </label>

      <label
        htmlFor="isPrimary"
        className="mt-5 flex items-start gap-3 text-sm text-text-secondary"
      >
        <input
          id="isPrimary"
          name="isPrimary"
          onInput={() => onClearFieldError?.("isPrimary")}
          defaultChecked={defaultValues?.isPrimary ?? false}
          type="checkbox"
          className="mt-1 size-4 accent-info"
        />
        <span>
          Set as my primary vehicle
          <span className="mt-1 block text-xs text-muted">
            The vehicle you use most often.
          </span>
        </span>
        <VehicleFieldError
          field="isPrimary"
          message={errors.isPrimary}
        />
      </label>
    </fieldset>
  );
}
