import type { Props as VehicleAddServiceProps } from "@/features/garage/types/add-service-form";

export default function ServiceFluids({
    register
}: VehicleAddServiceProps) {
    return (
        <fieldset className="space-y-4 rounded-xl border border-line p-4">
            <legend className="px-2 text-sm font-semibold">
                Fluids used
            </legend>

            <div className="grid gap-2">
                <label htmlFor="fluid-type" className="text-sm">
                    Fluid type
                </label>
                <select id="fluid-type" {...register("fluidType")} className="form-select">
                    <option value="">Select fluid</option>
                    <option value="engine-oil">Engine oil</option>
                    <option value="transmission-oil">Transmission oil</option>
                    <option value="brake-fluid">Brake fluid</option>
                    <option value="coolant">Coolant</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="fluid-specification" className="text-sm">
                        Brand / specification
                    </label>
                    <input data-slot="input"
                        id="fluid-specification" {...register("fluidSpecification")}
                        type="text"
                        placeholder="e.g. 5W-30, manufacturer approval"
                        className="native-input"
                    />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="fluid-quantity" className="text-sm">
                        Quantity (liters)
                    </label>
                    <input data-slot="input"
                        id="fluid-quantity" {...register("fluidQuantity")}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="4.50"
                        className="native-input"
                    />
                </div>
            </div>
        </fieldset>
    );
}
