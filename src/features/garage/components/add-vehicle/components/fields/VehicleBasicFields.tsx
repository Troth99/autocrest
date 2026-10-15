import VehicleMakeModelFields, { type VehicleMakeModelProps } from "@/features/garage/components/add-vehicle/components/fields/VehicleMakeModelFields";
import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import { Input } from "@/shared/components/ui/input";
import type { VehicleFormRegister } from "@/features/garage/types/add-vehicle-form";

type Props = VehicleMakeModelProps & { register: VehicleFormRegister };

export default function VehicleBasicFields({
  errors,
  values,
  onFieldChange,
  makes,
  selectedMake,
  onMakeChange,
  isLoadingMakes,
  models,
  selectedModel,
  onModelChange,
  isLoadingModels,
  modelsError,
  register,
}: Props) {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">Basic information</legend>
      <h2 className="section-title">Basic information</h2>
      <p className="mt-1 text-sm text-muted">
        The essentials that identify your vehicle.
      </p>
      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <VehicleMakeModelFields
          errors={errors}
          values={values}
          onFieldChange={onFieldChange}
          makes={makes}
          selectedMake={selectedMake}
          onMakeChange={onMakeChange}
          isLoadingMakes={isLoadingMakes}
          models={models}
          selectedModel={selectedModel}
          onModelChange={onModelChange}
          isLoadingModels={isLoadingModels}
          modelsError={modelsError}
        />
        <label
          htmlFor="manufacture_year"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Manufacture year *</span>
          <Input
            id="manufacture_year"
            {...register("manufacture_year")}
            type="number"
            aria-required="true"
            placeholder="e.g. 2020"
            min={0}
          aria-invalid={Boolean(errors.manufacture_year)} aria-describedby={errors.manufacture_year ? "manufacture_year-error" : undefined} />
<VehicleFieldError field="manufacture_year" message={errors.manufacture_year} />
        </label>
        <label
          htmlFor="trim"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Trim / variant</span>
          <Input
            id="trim"
            {...register("trim")}
            type="text"
            placeholder="e.g. 1.8 Hybrid Design"
          aria-invalid={Boolean(errors.trim)} aria-describedby={errors.trim ? "trim-error" : undefined} />
<VehicleFieldError field="trim" message={errors.trim} />
        </label>
        <label
          htmlFor="nickname"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Nickname</span>
          <Input
            id="nickname"
            {...register("nickname")}
            type="text"
            placeholder="A name for your vehicle"
          aria-invalid={Boolean(errors.nickname)} aria-describedby={errors.nickname ? "nickname-error" : undefined} />
<VehicleFieldError field="nickname" message={errors.nickname} />
        </label>
        <label
          htmlFor="vehicle_use"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Vehicle use</span>
          <select aria-invalid={Boolean(errors.vehicle_use)} aria-describedby={errors.vehicle_use ? "vehicle_use-error" : undefined}
            id="vehicle_use"
            {...register("vehicle_use")}
            className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-text-primary outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          >
            <option value="" className="bg-panel text-text-primary">
              Not specified
            </option>
            <option value="personal" className="bg-panel text-text-primary">
              Personal
            </option>
            <option value="business" className="bg-panel text-text-primary">
              Business
            </option>
            <option value="mixed" className="bg-panel text-text-primary">
              Mixed
            </option>
          </select>
<VehicleFieldError field="vehicle_use" message={errors.vehicle_use} />
        </label>
      </div>
    </fieldset>
  );
}
