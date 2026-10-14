import VehicleFieldError from "@/features/garage/components/add-vehicle/VehicleFieldError";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import type { VehicleFormRegister, VehicleFormRegisterCheckbox } from "@/features/garage/types/add-vehicle-form";

type Props = { errors: VehicleFormErrors; register: VehicleFormRegister; registerCheckbox: VehicleFormRegisterCheckbox };

export default function VehicleAdditionalDetails({ errors, register, registerCheckbox }: Props) {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">Additional details</legend>
      <h2 className="section-title">Additional details</h2>
      <label
        htmlFor="description"
        className="mt-4 grid gap-2 text-sm font-medium text-text-secondary"
      >
        Description
        <textarea
          id="description"
          {...register("description")}
          aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined}
          rows={4}
          placeholder="Notes about your vehicle, modifications, or anything else you want to remember."
          className="w-full resize-y rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm text-text-primary outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        />
        <VehicleFieldError field="description" message={errors.description} />
      </label>
      <label
        htmlFor="is_primary"
        className="mt-5 flex items-start gap-3 text-sm text-text-secondary"
      >
        <input
          id="is_primary"
          {...registerCheckbox("is_primary")}
          type="checkbox"
          className="mt-1 size-4 accent-info"
        />
        <span>
          Set as my primary vehicle
          <span className="mt-1 block text-xs text-muted">
            The vehicle you use most often.
          </span>
        </span>
        <VehicleFieldError field="is_primary" message={errors.is_primary} />
      </label>
    </fieldset>
  );
}
