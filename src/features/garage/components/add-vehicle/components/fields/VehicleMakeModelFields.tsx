import VehicleCatalogSelect from "@/features/garage/components/add-vehicle/components/VehicleCatalogSelect";
import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import { Input } from "@/shared/components/ui/input";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import type { VehicleDocumentFieldProps } from "@/features/garage/types/vehicle-document-form";
import type { VehicleMake, VehicleModel } from "@/features/garage/types/vehicle-catalog";

export type VehicleMakeModelProps = VehicleDocumentFieldProps & {
  errors: VehicleFormErrors;
  makes: VehicleMake[];
  selectedMake: string;
  onMakeChange: (makeId: string) => void;
  isLoadingMakes: boolean;
  models: VehicleModel[];
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  isLoadingModels: boolean;
  modelsError: string | null;
};

export default function VehicleMakeModelFields({ errors, values, onFieldChange, makes, selectedMake, onMakeChange, isLoadingMakes, models, selectedModel, onModelChange, isLoadingModels, modelsError }: VehicleMakeModelProps) {
  return (
    <>
      <div className="grid gap-2">
        <VehicleCatalogSelect id="make" name="make_id" label="Make" options={makes} value={selectedMake} onChange={onMakeChange} disabled={isLoadingMakes}
          placeholder={isLoadingMakes ? "Loading makes..." : "Choose a make"}
          errorId={errors.make && selectedMake !== "other" ? "make-error" : undefined} />
        {selectedMake === "other" ? (
          <label htmlFor="custom-make" className="grid gap-2 text-sm font-medium text-text-secondary">
            Make name *
            <Input id="custom-make" name="custom_make" value={values.custom_make} onChange={(event) => onFieldChange("custom_make", event.target.value)} placeholder="Enter your vehicle make" aria-required="true" aria-invalid={Boolean(errors.make)} aria-describedby={errors.make ? "custom-make-error" : undefined} />
            <VehicleFieldError field="custom-make" message={errors.make} />
          </label>
        ) : <VehicleFieldError field="make" message={errors.make} />}
      </div>
      <div className="grid gap-2">
        {selectedMake === "other" ? (
          <label htmlFor="custom-model" className="grid gap-2 text-sm font-medium text-text-secondary">
            Model *
            <Input id="custom-model" name="custom_model" value={values.custom_model} onChange={(event) => onFieldChange("custom_model", event.target.value)} placeholder="Enter your vehicle model" aria-required="true" aria-invalid={Boolean(errors.model)} aria-describedby={errors.model ? "custom-model-error" : undefined} />
            <VehicleFieldError field="custom-model" message={errors.model} />
          </label>
        ) : (
          <>
            <VehicleCatalogSelect key={selectedMake} id="model" name="model_id" label="Model" options={models} value={selectedModel} onChange={onModelChange} disabled={!selectedMake || isLoadingModels}
              placeholder={!selectedMake ? "Choose a make first" : isLoadingModels ? "Loading models..." : "Choose a model"}
              errorId={modelsError ? "model-catalog-error" : errors.model && selectedModel !== "other" ? "model-error" : undefined} />
            {selectedModel === "other" ? (
              <label htmlFor="custom-model" className="grid gap-2 text-sm font-medium text-text-secondary">
                Model name *
                <Input id="custom-model" name="custom_model" value={values.custom_model} onChange={(event) => onFieldChange("custom_model", event.target.value)} placeholder="Enter your vehicle model" aria-required="true" aria-invalid={Boolean(errors.model)} aria-describedby={errors.model ? "custom-model-error" : undefined} />
                <VehicleFieldError field="custom-model" message={errors.model} />
              </label>
            ) : <VehicleFieldError field="model" message={errors.model} />}
          </>
        )}
        {modelsError && <div id="model-catalog-error" role="alert" className="text-xs text-destructive">{modelsError}</div>}
      </div>
    </>
  );
}
