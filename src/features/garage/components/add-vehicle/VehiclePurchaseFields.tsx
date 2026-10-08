import { Input } from "@/shared/components/ui/input";

export default function VehiclePurchaseFields() {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">Purchase details</legend>
      <h2 className="section-title">Purchase details</h2>
      <p className="mt-1 text-sm text-muted">
        Optional information about when you bought your car.
      </p>
      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label
          htmlFor="purchase_date"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Purchase date</span>
          <Input id="purchase_date" name="purchase_date" type="date" />
        </label>
        <label
          htmlFor="purchase_price"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Purchase price</span>
          <Input
            id="purchase_price"
            name="purchase_price"
            type="number"
            min={0}
            step="0.01"
          />
        </label>
        <label
          htmlFor="purchase_currency_code"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Currency code</span>
          <Input
            id="purchase_currency_code"
            name="purchase_currency_code"
            type="text"
            placeholder="e.g. EUR"
          />
        </label>
      </div>
    </fieldset>
  );
}
