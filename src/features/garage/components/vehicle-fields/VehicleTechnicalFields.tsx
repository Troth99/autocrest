import type { ChangeEvent } from "react";
import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import type {
  VehicleFormErrors,
  VehicleFormRegister,
} from "@/features/garage/types/add-vehicle-form";
import type { VehicleDocumentFieldProps } from "@/features/garage/types/vehicle-document-form";

type Props = VehicleDocumentFieldProps & {
  errors: VehicleFormErrors;
  register: VehicleFormRegister;
};

export default function VehicleTechnicalFields({
  values,
  onFieldChange,
  register,
  errors,
}: Props) {
  function handleFuelTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    onFieldChange("fuel_type", event.target.value);
  }

  function handleEngineCcChange(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("engine_cc", event.target.value);
  }

  function handlePowerHpChange(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("power_hp", event.target.value);
  }

  function handleEuroStandardChange(event: ChangeEvent<HTMLSelectElement>) {
    onFieldChange("euro_standard", event.target.value);
  }

  function handleColourChange(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("colour", event.target.value);
  }

  function handleSeatsChange(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("seats", event.target.value);
  }

  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">Technical specifications</legend>
      <h2 className="section-title">Technical specifications</h2>
      <p className="mt-1 text-sm text-muted">
        Engine, drivetrain and appearance. Leave unknown details blank.
      </p>

      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
        <label
          htmlFor="fuel_type"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Fuel type *</span>
          <select
            aria-invalid={Boolean(errors.fuel_type)}
            aria-describedby={errors.fuel_type ? "fuel_type-error" : undefined}
            id="fuel_type"
            aria-required="true"
            name="fuel_type"
            value={values.fuel_type}
            onChange={handleFuelTypeChange}
            className="form-select"
          >
            <option
              value=""
              className="bg-panel text-text-primary"
            >Choose a fuel type</option>
            <option
              value="petrol"
              className="bg-panel text-text-primary"
            >Petrol</option>
            <option
              value="diesel"
              className="bg-panel text-text-primary"
            >Diesel</option>
            <option
              value="electric"
              className="bg-panel text-text-primary"
            >Electric</option>
            <option
              value="hybrid"
              className="bg-panel text-text-primary"
            >Hybrid</option>
            <option
              value="plug_in_hybrid"
              className="bg-panel text-text-primary"
            >Plug-in hybrid</option>
            <option
              value="lpg"
              className="bg-panel text-text-primary"
            >LPG</option>
            <option
              value="cng"
              className="bg-panel text-text-primary"
            >CNG</option>
            <option
              value="other"
              className="bg-panel text-text-primary"
            >Other</option>
          </select>
          <VehicleFieldError
            field="fuel_type"
            message={errors.fuel_type}
          />
        </label>

        <label
          htmlFor="transmission"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Transmission *</span>
          <select
            aria-invalid={Boolean(errors.transmission)}
            aria-describedby={errors.transmission ? "transmission-error" : undefined}
            id="transmission"
            aria-required="true"
            {...register("transmission")}
            className="form-select"
          >
            <option
              value=""
              className="bg-panel text-text-primary"
            >Choose a transmission</option>
            <option
              value="manual"
              className="bg-panel text-text-primary"
            >Manual</option>
            <option
              value="automatic"
              className="bg-panel text-text-primary"
            >Automatic</option>
            <option
              value="semi_automatic"
              className="bg-panel text-text-primary"
            >Semi-automatic</option>
          </select>
          <VehicleFieldError
            field="transmission"
            message={errors.transmission}
          />
        </label>

        <label
          htmlFor="drivetrain"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Drivetrain</span>
          <select
            aria-invalid={Boolean(errors.drivetrain)}
            aria-describedby={errors.drivetrain ? "drivetrain-error" : undefined}
            id="drivetrain"
            {...register("drivetrain")}
            className="form-select"
          >
            <option
              value=""
              className="bg-panel text-text-primary"
            >Not specified</option>
            <option
              value="fwd"
              className="bg-panel text-text-primary"
            >FWD</option>
            <option
              value="rwd"
              className="bg-panel text-text-primary"
            >RWD</option>
            <option
              value="awd"
              className="bg-panel text-text-primary"
            >AWD</option>
            <option
              value="4wd"
              className="bg-panel text-text-primary"
            >4WD</option>
          </select>
          <VehicleFieldError
            field="drivetrain"
            message={errors.drivetrain}
          />
        </label>

        <label
          htmlFor="engine_cc"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Engine capacity (cc)</span>
          <input
            data-slot="input"
            className="native-input"
            id="engine_cc"
            name="engine_cc"
            value={values.engine_cc}
            onChange={handleEngineCcChange}
            type="number"
            placeholder="e.g. 1798"
            min={1}
            aria-invalid={Boolean(errors.engine_cc)}
            aria-describedby={errors.engine_cc ? "engine_cc-error" : undefined}
          />
          <VehicleFieldError
            field="engine_cc"
            message={errors.engine_cc}
          />
        </label>

        <label
          htmlFor="power_hp"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Power (hp)</span>
          <input
            data-slot="input"
            className="native-input"
            id="power_hp"
            name="power_hp"
            value={values.power_hp}
            onChange={handlePowerHpChange}
            type="number"
            placeholder="e.g. 122"
            min={1}
            step={1}
            aria-invalid={Boolean(errors.power_hp)}
            aria-describedby={errors.power_hp ? "power_hp-error" : undefined}
          />
          <VehicleFieldError
            field="power_hp"
            message={errors.power_hp}
          />
        </label>

        <label
          htmlFor="euro_standard"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Emissions standard</span>
          <select
            aria-invalid={Boolean(errors.euro_standard)}
            aria-describedby={errors.euro_standard ? "euro_standard-error" : undefined}
            id="euro_standard"
            name="euro_standard"
            value={values.euro_standard}
            onChange={handleEuroStandardChange}
            className="form-select"
          >
            <option
              value=""
              className="bg-panel text-text-primary"
            >Not specified</option>
            <option
              value="euro_1"
              className="bg-panel text-text-primary"
            >Euro 1</option>
            <option
              value="euro_2"
              className="bg-panel text-text-primary"
            >Euro 2</option>
            <option
              value="euro_3"
              className="bg-panel text-text-primary"
            >Euro 3</option>
            <option
              value="euro_4"
              className="bg-panel text-text-primary"
            >Euro 4</option>
            <option
              value="euro_5"
              className="bg-panel text-text-primary"
            >Euro 5</option>
            <option
              value="euro_6"
              className="bg-panel text-text-primary"
            >Euro 6</option>
          </select>
          <VehicleFieldError
            field="euro_standard"
            message={errors.euro_standard}
          />
        </label>

        <label
          htmlFor="colour"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Colour</span>
          <input
            data-slot="input"
            className="native-input"
            id="colour"
            name="colour"
            value={values.colour}
            aria-invalid={Boolean(errors.colour)}
            aria-describedby={errors.colour ? "colour-error" : undefined}
            onChange={handleColourChange}
          />
          <VehicleFieldError
            field="colour"
            message={errors.colour}
          />
        </label>

        <label
          htmlFor="seats"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Seats</span>
          <input
            data-slot="input"
            className="native-input"
            id="seats"
            name="seats"
            type="number"
            min={1}
            step={1}
            value={values.seats}
            aria-invalid={Boolean(errors.seats)}
            aria-describedby={errors.seats ? "seats-error" : undefined}
            onChange={handleSeatsChange}
          />
          <VehicleFieldError
            field="seats"
            message={errors.seats}
          />
        </label>
      </div>
    </fieldset>
  );
}
