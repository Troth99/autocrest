import { FieldError } from "@/shared/components/FieldError/FieldError";
import { Props as VehicleAddServiceProps } from "@/features/garage/types/add-service-form";

export default function ServiceReplacedPart({    errors,
}: VehicleAddServiceProps) {
    return (
        <fieldset className="space-y-4 service-detail-group">
            <legend className="px-2 text-sm font-semibold">
                Replaced part
            </legend>

            <div className="grid gap-2">
                <label htmlFor="part-name" className="text-sm">
                    Part name
                </label>
                <input data-slot="input"
                    id="part-name"
                    type="text"
                    placeholder="e.g. Oil filter"
                    className="native-input"
                    name="partName"
                />
                <FieldError message={errors.partName} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="part-brand" className="text-sm">
                        Brand
                    </label>
                    <input data-slot="input"
                        id="part-brand" name="partBrand"
                        type="text"
                        placeholder="Manufacturer"
                        className="native-input"
                    />
                    <FieldError message={errors.partBrand} />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="part-number" className="text-sm">
                        Part number
                    </label>
                    <input data-slot="input"
                        id="part-number" name="partNumber"
                        type="text"
                        placeholder="Catalogue number"
                        className="native-input"
                    />
                    <FieldError message={errors.partNumber} />
                </div>
            </div>

            <div className="grid gap-2">
                <label htmlFor="part-quantity" className="text-sm">
                    Quantity
                </label>
                <input data-slot="input"
                    id="part-quantity" name="partQuantity"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="1"
                    className="native-input"
                />
                <FieldError message={errors.partQuantity} />
            </div>
        </fieldset>
    );
}
