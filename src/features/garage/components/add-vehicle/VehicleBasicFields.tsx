import { Select } from "@base-ui/react/select";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";
import { Separator } from "@/shared/components/ui/separator";
import { Input } from "@/shared/components/ui/input";
import type { VehicleMake } from "@/features/garage/types/vehicle-catalog";

type Props = {
  makes: VehicleMake[];
  selectedMake: string;
  onMakeChange: (makeId: string) => void;
  isLoadingMakes: boolean;
};

export default function VehicleBasicFields({
  makes,
  selectedMake,
  onMakeChange,
  isLoadingMakes,
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
            disabled={isLoadingMakes || makes.length === 0}
            required
          >
            <Select.Trigger id="make" className="select-trigger">
              <span className="truncate">
                {makes.find((make) => make.id === selectedMake)?.name ??
                  (isLoadingMakes
                    ? "Loading makes..."
                    : makes.length === 0
                      ? "No makes available"
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
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
        <label
          htmlFor="model"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Model *</span>
          <Input
            id="model"
            name="model"
            type="text"
            placeholder="e.g. Corolla"
            required
          />
        </label>
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
