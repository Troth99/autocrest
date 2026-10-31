import type { ReactNode } from "react";
import VehicleMakeModelFields, { type VehicleMakeModelProps } from "@/features/garage/components/vehicle-fields/VehicleMakeModelFields";
import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import type { VehicleFormRegister } from "@/features/garage/types/add-vehicle-form";

type Props = { register: VehicleFormRegister } & (VehicleMakeModelProps | {
  errors: VehicleMakeModelProps["errors"];
  makeModelFields: ReactNode;
});

export default function VehicleBasicFields(props: Props) {
  const { errors, register } = props;
  return (
    <fieldset className="content-card vehicle-form-section">
      <legend className="sr-only">Basic information</legend>
      <h2 className="section-title">Basic information</h2>
      <p className="mt-1 text-sm text-muted">
        The essentials that identify your vehicle.
      </p>
      <div className="vehicle-fields-grid">
        {"makeModelFields" in props ? props.makeModelFields : <VehicleMakeModelFields
          {...props}
        />}
        <label
          htmlFor="manufactureYear"
          className="form-field"
        >
          <span>Manufacture year *</span>
          <input
            data-slot="input"
            className="native-input"
            id="manufactureYear"
            {...register("manufactureYear")}
            type="number"
            aria-required="true"
            placeholder="e.g. 2020"
            min={0}
            aria-invalid={Boolean(errors.manufactureYear)}
            aria-describedby={errors.manufactureYear ? "manufactureYear-error" : undefined}
          />
          <VehicleFieldError
            field="manufactureYear"
            message={errors.manufactureYear}
          />
        </label>

        <label
          htmlFor="trim"
          className="form-field"
        >
          <span>Trim / variant</span>
          <input
            data-slot="input"
            className="native-input"
            id="trim"
            {...register("trim")}
            type="text"
            placeholder="e.g. 1.8 Hybrid Design"
            aria-invalid={Boolean(errors.trim)}
            aria-describedby={errors.trim ? "trim-error" : undefined}
          />
          <VehicleFieldError
            field="trim"
            message={errors.trim}
          />
        </label>

        <label
          htmlFor="nickname"
          className="form-field"
        >
          <span>Nickname</span>
          <input
            data-slot="input"
            className="native-input"
            id="nickname"
            {...register("nickname")}
            type="text"
            placeholder="A name for your vehicle"
            aria-invalid={Boolean(errors.nickname)}
            aria-describedby={errors.nickname ? "nickname-error" : undefined}
          />
          <VehicleFieldError
            field="nickname"
            message={errors.nickname}
          />
        </label>

        <label
          htmlFor="vehicleUse"
          className="form-field"
        >
          <span>Vehicle use</span>
          <select
            aria-invalid={Boolean(errors.vehicleUse)}
            aria-describedby={errors.vehicleUse ? "vehicleUse-error" : undefined}
            id="vehicleUse"
            {...register("vehicleUse")}
            className="form-select"
          >
            <option
              value=""
            >
              Not specified
            </option>
            <option
              value="personal"
            >
              Personal
            </option>
            <option
              value="business"
            >
              Business
            </option>
            <option
              value="mixed"
            >
              Mixed
            </option>
          </select>
          <VehicleFieldError
            field="vehicleUse"
            message={errors.vehicleUse}
          />
        </label>
      </div>
    </fieldset>
  );
}
