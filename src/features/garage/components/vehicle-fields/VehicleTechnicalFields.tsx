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
    onFieldChange("fuelType", event.target.value);
  }

  function handleEngineCcChange(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("engineCc", event.target.value);
  }

  function handlePowerHpChange(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("powerHp", event.target.value);
  }

  function handleEuroStandardChange(event: ChangeEvent<HTMLSelectElement>) {
    onFieldChange("euroStandard", event.target.value);
  }

  function handleColourChange(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("colour", event.target.value);
  }

  function handleSeatsChange(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("seats", event.target.value);
  }

  return (
    <fieldset className="content-card vehicle-form-section">
      <legend className="sr-only">Technical specifications</legend>
      <h2 className="section-title">Technical specifications</h2>
      <p className="mt-1 text-sm text-muted">
        Engine, drivetrain and appearance. Leave unknown details blank.
      </p>

      <div className="vehicle-fields-grid">
        <label
          htmlFor="fuelType"
          className="form-field"
        >
          <span>Fuel type *</span>
          <select
            aria-invalid={Boolean(errors.fuelType)}
            aria-describedby={errors.fuelType ? "fuelType-error" : undefined}
            id="fuelType"
            aria-required="true"
            name="fuelType"
            value={values.fuelType}
            onChange={handleFuelTypeChange}
            className="form-select"
          >
            <option
              value=""
            >Choose a fuel type</option>
            <option
              value="petrol"
            >Petrol</option>
            <option
              value="diesel"
            >Diesel</option>
            <option
              value="electric"
            >Electric</option>
            <option
              value="hybrid"
            >Hybrid</option>
            <option
              value="plug_in_hybrid"
            >Plug-in hybrid</option>
            <option
              value="lpg"
            >LPG</option>
            <option
              value="cng"
            >CNG</option>
            <option
              value="other"
            >Other</option>
          </select>
          <VehicleFieldError
            field="fuelType"
            message={errors.fuelType}
          />
        </label>

        <label
          htmlFor="transmission"
          className="form-field"
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
            >Choose a transmission</option>
            <option
              value="manual"
            >Manual</option>
            <option
              value="automatic"
            >Automatic</option>
            <option
              value="semi_automatic"
            >Semi-automatic</option>
          </select>
          <VehicleFieldError
            field="transmission"
            message={errors.transmission}
          />
        </label>

        <label
          htmlFor="drivetrain"
          className="form-field"
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
            >Not specified</option>
            <option
              value="fwd"
            >FWD</option>
            <option
              value="rwd"
            >RWD</option>
            <option
              value="awd"
            >AWD</option>
            <option
              value="4wd"
            >4WD</option>
          </select>
          <VehicleFieldError
            field="drivetrain"
            message={errors.drivetrain}
          />
        </label>

        <label
          htmlFor="engineCc"
          className="form-field"
        >
          <span>Engine capacity (cc)</span>
          <input
            data-slot="input"
            className="native-input"
            id="engineCc"
            name="engineCc"
            value={values.engineCc}
            onChange={handleEngineCcChange}
            type="number"
            placeholder="e.g. 1798"
            min={1}
            aria-invalid={Boolean(errors.engineCc)}
            aria-describedby={errors.engineCc ? "engineCc-error" : undefined}
          />
          <VehicleFieldError
            field="engineCc"
            message={errors.engineCc}
          />
        </label>

        <label
          htmlFor="powerHp"
          className="form-field"
        >
          <span>Power (hp)</span>
          <input
            data-slot="input"
            className="native-input"
            id="powerHp"
            name="powerHp"
            value={values.powerHp}
            onChange={handlePowerHpChange}
            type="number"
            placeholder="e.g. 122"
            min={1}
            step={1}
            aria-invalid={Boolean(errors.powerHp)}
            aria-describedby={errors.powerHp ? "powerHp-error" : undefined}
          />
          <VehicleFieldError
            field="powerHp"
            message={errors.powerHp}
          />
        </label>

        <label
          htmlFor="euroStandard"
          className="form-field"
        >
          <span>Emissions standard</span>
          <select
            aria-invalid={Boolean(errors.euroStandard)}
            aria-describedby={errors.euroStandard ? "euroStandard-error" : undefined}
            id="euroStandard"
            name="euroStandard"
            value={values.euroStandard}
            onChange={handleEuroStandardChange}
            className="form-select"
          >
            <option
              value=""
            >Not specified</option>
            <option
              value="euro_1"
            >Euro 1</option>
            <option
              value="euro_2"
            >Euro 2</option>
            <option
              value="euro_3"
            >Euro 3</option>
            <option
              value="euro_4"
            >Euro 4</option>
            <option
              value="euro_5"
            >Euro 5</option>
            <option
              value="euro_6"
            >Euro 6</option>
          </select>
          <VehicleFieldError
            field="euroStandard"
            message={errors.euroStandard}
          />
        </label>

        <label
          htmlFor="colour"
          className="form-field"
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
          className="form-field"
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
