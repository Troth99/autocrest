import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import type { VehicleFormRegister } from "@/features/garage/types/add-vehicle-form";

type Props = { errors: VehicleFormErrors; register: VehicleFormRegister };

export default function VehiclePurchaseFields({
  errors,
  register,
}: Props) {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">Purchase details</legend>
      <h2 className="section-title">Purchase details</h2>
      <p className="mt-1 text-sm text-muted">
        Optional information about when you bought your vehicle.
      </p>
      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <label
          htmlFor="purchase_date"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Purchase date</span>
          <input
            data-slot="input"
            className="native-input"
            id="purchase_date"
            {...register("purchase_date")}
            type="date"
            aria-invalid={Boolean(errors.purchase_date)}
            aria-describedby={errors.purchase_date ? "purchase_date-error" : undefined}
          />
          <VehicleFieldError
            field="purchase_date"
            message={errors.purchase_date}
          />
        </label>

        <label
          htmlFor="purchase_price"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Purchase price</span>
          <input
            data-slot="input"
            className="native-input"
            id="purchase_price"
            {...register("purchase_price")}
            type="number"
            min={0}
            step="0.01"
            aria-invalid={Boolean(errors.purchase_price)}
            aria-describedby={errors.purchase_price ? "purchase_price-error" : undefined}
          />
          <VehicleFieldError
            field="purchase_price"
            message={errors.purchase_price}
          />
        </label>

        <label
          htmlFor="purchase_currency_code"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Currency code</span>
          <input
            data-slot="input"
            className="native-input"
            id="purchase_currency_code"
            {...register("purchase_currency_code")}
            type="text"
            placeholder="e.g. EUR"
            aria-invalid={Boolean(errors.purchase_currency_code)}
            aria-describedby={errors.purchase_currency_code ? "purchase_currency_code-error" : undefined}
          />
          <VehicleFieldError
            field="purchase_currency_code"
            message={errors.purchase_currency_code}
          />
        </label>
      </div>
    </fieldset>
  );
}
