import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import type { VehicleFormRegister } from "@/features/garage/types/add-vehicle-form";

type Props = { errors: VehicleFormErrors; register: VehicleFormRegister };

export default function VehiclePurchaseFields({
  errors,
  register,
}: Props) {
  return (
    <fieldset className="content-card vehicle-form-section">
      <legend className="sr-only">Purchase details</legend>
      <h2 className="section-title">Purchase details</h2>
      <p className="mt-1 text-sm text-muted">
        Optional information about when you bought your vehicle.
      </p>
      <div className="vehicle-fields-grid">
        <label
          htmlFor="purchaseDate"
          className="form-field"
        >
          <span>Purchase date</span>
          <input
            data-slot="input"
            className="native-input"
            id="purchaseDate"
            {...register("purchaseDate")}
            type="date"
            aria-invalid={Boolean(errors.purchaseDate)}
            aria-describedby={errors.purchaseDate ? "purchaseDate-error" : undefined}
          />
          <VehicleFieldError
            field="purchaseDate"
            message={errors.purchaseDate}
          />
        </label>

        <label
          htmlFor="purchasePrice"
          className="form-field"
        >
          <span>Purchase price</span>
          <input
            data-slot="input"
            className="native-input"
            id="purchasePrice"
            {...register("purchasePrice")}
            type="number"
            min={0}
            step="0.01"
            aria-invalid={Boolean(errors.purchasePrice)}
            aria-describedby={errors.purchasePrice ? "purchasePrice-error" : undefined}
          />
          <VehicleFieldError
            field="purchasePrice"
            message={errors.purchasePrice}
          />
        </label>

        <label
          htmlFor="purchaseCurrencyCode"
          className="form-field"
        >
          <span>Currency code</span>
          <input
            data-slot="input"
            className="native-input"
            id="purchaseCurrencyCode"
            {...register("purchaseCurrencyCode")}
            type="text"
            placeholder="e.g. EUR"
            aria-invalid={Boolean(errors.purchaseCurrencyCode)}
            aria-describedby={errors.purchaseCurrencyCode ? "purchaseCurrencyCode-error" : undefined}
          />
          <VehicleFieldError
            field="purchaseCurrencyCode"
            message={errors.purchaseCurrencyCode}
          />
        </label>
      </div>
    </fieldset>
  );
}
