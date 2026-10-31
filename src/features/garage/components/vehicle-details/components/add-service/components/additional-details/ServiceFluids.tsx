import { FieldError } from "@/shared/components/FieldError/FieldError";
import type { VehicleServiceSectionProps } from "@/features/garage/types/add-service-form";

export default function ServiceFluids({
    register,
    errors,
    values,
}: VehicleServiceSectionProps) {
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
                    <option value="gear-oil">Gear / differential oil</option>
                    <option value="power-steering-fluid">Power steering fluid</option>
                    <option value="brake-fluid">Brake fluid</option>
                    <option value="coolant">Coolant</option>
                    <option value="other">Other</option>
                </select>
                <FieldError message={errors.fluidType} />
            </div>

            {values.fluidType === "other" && (
                <div className="grid gap-2">
                    <label htmlFor="custom-fluid-type" className="text-sm">
                        Specify fluid *
                    </label>
                    <input
                        data-slot="input"
                        id="custom-fluid-type"
                        type="text"
                        required
                        pattern={".*\\S.*"}
                        title="Enter the fluid type."
                        placeholder="Enter the fluid type"
                        className="native-input"
                        {...register("customFluidType")}
                    />
                    <FieldError message={errors.customFluidType} />
                </div>
            )}

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
                    <FieldError message={errors.fluidSpecification} />
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
                    <FieldError message={errors.fluidQuantity} />
                </div>
            </div>
        </fieldset>
    );
}
