import { FieldError } from "@/shared/components/FieldError/FieldError";
import { Props as VehicleAddServiceProps } from "@/features/garage/types/add-service-form";

export default function ServiceCost({
        register,
    errors,
    }: VehicleAddServiceProps) {
    return (
        <>
            <h2 className="section-title">Cost (optional)</h2>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="parts-cost" className="text-sm">
                        Parts (€)
                    </label>
                    <input data-slot="input"
                        id="parts-cost"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="native-input"
                        {...register("partsCost")}
                    />
                    <FieldError message={errors.partsCost} />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="labor-cost" className="text-sm">
                        Labor (€)
                    </label>
                    <input data-slot="input"
                        id="labor-cost"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="native-input"
                         {...register("laborCost")}
                    />
                    <FieldError message={errors.laborCost} />
                </div>
            </div>

            <p className="text-xs text-muted">
                This cost will also appear in your vehicle expenses.
            </p>
        </>
    )
}
