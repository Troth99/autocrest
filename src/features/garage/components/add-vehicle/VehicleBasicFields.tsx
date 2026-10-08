import { Select } from "@base-ui/react/select";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";
import { Separator } from "@/shared/components/ui/separator";
import { Input } from "@/shared/components/ui/input";
import type { VehicleMake, VehicleModel } from "@/features/garage/types/vehicle-catalog";

type Props = {
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

export default function VehicleBasicFields({
  makes,
  selectedMake,
  onMakeChange,
  isLoadingMakes,
  models,
  selectedModel,
  onModelChange,
  isLoadingModels,
  modelsError,
}: Props) {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">Basic information</legend>
      <h2 className="section-title">Basic information</h2>
      <p className="mt-1 text-sm text-muted">
        The essentials that identify your car.
      </p>
      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="grid gap-2 text-sm font-medium text-text-secondary">
          <label htmlFor="make">Make *</label>
          <Select.Root
            name="make_id"
            value={selectedMake || null}
            onValueChange={(value) => onMakeChange(value ?? "")}
            disabled={isLoadingMakes}
            required
          >
            <Select.Trigger id="make" className="select-trigger">
              <span className="truncate">
                {selectedMake === "other" ? "Other" : makes.find((make) => make.id === selectedMake)?.name ??
                  (isLoadingMakes
                    ? "Loading makes..."
                    : makes.length === 0
                      ? "Choose Other to enter a make"
                      : "Choose a make")}
              </span>
              <Select.Icon>
                <ChevronDown className="size-4" aria-hidden="true" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner
                side="bottom"
                align="start"
                sideOffset={4}
                alignItemWithTrigger={false}
                className="z-50"
              >
                <Select.Popup
                  className="w-(--anchor-width) overflow-hidden rounded-lg border border-slate-300
                 bg-slate-100 text-text-primary shadow-xl dark:border-slate-600
                  dark:bg-slate-800"
                >
                  <Select.List className="max-h-[min(200px,var(--available-height))] overflow-y-auto overscroll-contain p-1">
                    {makes.map((make, index) => (
                      <Fragment key={make.id}>
                        {index > 0 && <Separator className="my-1 bg-line" />}
                        <Select.Item
                          value={make.id}
                          className="cursor-pointer rounded-md px-2.5 py-1.5 text-sm outline-none 
                          data-highlighted:bg-info-soft
                           data-highlighted:text-info 
                          data-selected:font-semibold"
                        >
                          <Select.ItemText>{make.name}</Select.ItemText>
                        </Select.Item>
                      </Fragment>
                    ))}
                    {makes.length > 0 && <Separator className="my-1 bg-line" />}
                    <Select.Item value="other" className="cursor-pointer rounded-md px-2.5 py-1.5 text-sm outline-none data-highlighted:bg-info-soft data-highlighted:text-info data-selected:font-semibold">
                      <Select.ItemText>Other</Select.ItemText>
                    </Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          {selectedMake === "other" && (
            <label htmlFor="custom-make" className="grid gap-2">
              Make name *
              <Input id="custom-make" name="custom_make" placeholder="Enter your vehicle make" required />
            </label>
          )}
        </div>
        <div className="grid gap-2 text-sm font-medium text-text-secondary">
          <label htmlFor="model">Model *</label>
          {selectedMake === "other" ? (
            <Input key="custom-make-model" id="model" name="custom_model" placeholder="Enter your vehicle model" required />
          ) : (
          <Select.Root
            name="model_id"
            value={selectedModel || null}
            onValueChange={(value) => onModelChange(value ?? "")}
            disabled={!selectedMake || isLoadingModels}
            required
          >
            <Select.Trigger id="model" className="select-trigger"
              aria-invalid={Boolean(modelsError)}
              aria-describedby={modelsError ? "model-error" : undefined}>
              <span className="truncate">
                {selectedModel === "other" ? "Other" : models.find((model) => model.id === selectedModel)?.name ??
                  (!selectedMake ? "Choose a make first" : isLoadingModels ? "Loading models..." : models.length === 0 ? "Choose Other to enter a model" : "Choose a model")}
              </span>
              <Select.Icon><ChevronDown className="size-4" aria-hidden="true" /></Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner side="bottom" align="start" sideOffset={4}
                alignItemWithTrigger={false} className="z-50">
                <Select.Popup className="w-(--anchor-width) overflow-hidden rounded-lg border border-slate-300 bg-slate-100 text-text-primary shadow-xl dark:border-slate-600 dark:bg-slate-800">
                  <Select.List className="max-h-[min(200px,var(--available-height))] overflow-y-auto overscroll-contain p-1">
                    {models.map((model, index) => (
                      <Fragment key={model.id}>
                        {index > 0 && <Separator className="my-1 bg-line" />}
                        <Select.Item value={model.id} className="cursor-pointer rounded-md px-2.5 py-1.5 text-sm outline-none data-highlighted:bg-info-soft data-highlighted:text-info data-selected:font-semibold">
                          <Select.ItemText>{model.name}</Select.ItemText>
                        </Select.Item>
                      </Fragment>
                    ))}
                    {models.length > 0 && <Separator className="my-1 bg-line" />}
                    <Select.Item value="other" className="cursor-pointer rounded-md px-2.5 py-1.5 text-sm outline-none data-highlighted:bg-info-soft data-highlighted:text-info data-selected:font-semibold">
                      <Select.ItemText>Other</Select.ItemText>
                    </Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          )}
          {selectedMake !== "other" && selectedModel === "other" && (
            <label htmlFor="custom-model" className="grid gap-2">
              Model name *
              <Input key={selectedMake} id="custom-model" name="custom_model" placeholder="Enter your vehicle model" required />
            </label>
          )}
          {modelsError && <span id="model-error" role="alert" className="text-xs text-destructive">{modelsError}</span>}
        </div>
        <label
          htmlFor="manufacture_year"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Manufacture year</span>
          <Input
            id="manufacture_year"
            name="manufacture_year"
            type="number"
            placeholder="e.g. 2020"
            min={0}
          />
        </label>
        <label
          htmlFor="trim"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Trim / variant</span>
          <Input
            id="trim"
            name="trim"
            type="text"
            placeholder="e.g. 1.8 Hybrid Design"
          />
        </label>
        <label
          htmlFor="nickname"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Nickname</span>
          <Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="A name for your car"
          />
        </label>
        <label
          htmlFor="vehicle_use"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Vehicle use</span>
          <select
            id="vehicle_use"
            name="vehicle_use"
            defaultValue=""
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
        </label>
      </div>
    </fieldset>
  );
}
