import type { ChangeEvent } from "react";
import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import type { VehicleDocumentFieldProps } from "@/features/garage/types/vehicle-document-form";

type Props = VehicleDocumentFieldProps & {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: VehicleFormErrors;
};

export default function VehicleRegistrationFields({
  onClearFieldError,
  values,
  onChange,
  defaultValues,
  errors,
}: Props) {
  return (
    <fieldset className="content-card vehicle-form-section">
      <legend className="sr-only">Registration</legend>
      <h2 className="section-title">Registration</h2>
      <p className="mt-1 text-sm text-muted">
        Details from your vehicle registration documents.
      </p>
      <div className="vehicle-fields-grid">
        <label
          htmlFor="plate"
          className="form-field"
        >
          <span>Registration plate</span>
          <input
            data-slot="input"
            className="native-input"
            id="plate"
            name="plate"
            value={values?.plate}
            defaultValue={values ? undefined : defaultValues?.plate ?? ""}
            onChange={onChange}
            type="text"
            placeholder="e.g. CB1234AB"
            aria-invalid={Boolean(errors.plate)}
            aria-describedby={errors.plate ? "plate-error" : undefined}
          />
          <VehicleFieldError
            field="plate"
            message={errors.plate}
          />
        </label>

        <label
          htmlFor="vin"
          className="form-field"
        >
          <span>VIN</span>
          <input
            data-slot="input"
            className="native-input"
            id="vin"
            name="vin"
            value={values?.vin}
            defaultValue={values ? undefined : defaultValues?.vin ?? ""}
            onChange={onChange}
            type="text"
            placeholder="Vehicle identification number"
            aria-invalid={Boolean(errors.vin)}
            aria-describedby={errors.vin ? "vin-error" : undefined}
          />
          <VehicleFieldError
            field="vin"
            message={errors.vin}
          />
        </label>

        <label
          htmlFor="registrationCertificateNumber"
          className="form-field"
        >
          <span>Registration certificate number</span>
          <input
            data-slot="input"
            className="native-input"
            id="registrationCertificateNumber"
            name="registrationCertificateNumber"
            value={values?.registrationCertificateNumber}
            defaultValue={values ? undefined : defaultValues?.registrationCertificateNumber ?? ""}
            onChange={onChange}
            type="text"
            aria-invalid={Boolean(errors.registrationCertificateNumber)}
            aria-describedby={errors.registrationCertificateNumber ? "registrationCertificateNumber-error" : undefined}
          />
          <VehicleFieldError
            field="registrationCertificateNumber"
            message={errors.registrationCertificateNumber}
          />
        </label>

        <label
          htmlFor="registrationCountryCode"
          className="form-field"
        >
          <span>Registration country code</span>
          <input
            data-slot="input"
            className="native-input"
            id="registrationCountryCode"
            name="registrationCountryCode"
            onInput={() => onClearFieldError?.("registrationCountryCode")}
            defaultValue={values ? undefined : defaultValues?.registrationCountryCode ?? ""}
            type="text"
            placeholder="e.g. BG"
            aria-invalid={Boolean(errors.registrationCountryCode)}
            aria-describedby={errors.registrationCountryCode ? "registrationCountryCode-error" : undefined}
          />
          <VehicleFieldError
            field="registrationCountryCode"
            message={errors.registrationCountryCode}
          />
        </label>

        <label
          htmlFor="firstRegistrationDate"
          className="form-field"
        >
          <span>First registration date</span>
          <input
            data-slot="input"
            className="native-input"
            id="firstRegistrationDate"
            name="firstRegistrationDate"
            value={values?.firstRegistrationDate}
            defaultValue={values ? undefined : defaultValues?.firstRegistrationDate ?? ""}
            onChange={onChange}
            type="date"
            aria-invalid={Boolean(errors.firstRegistrationDate)}
            aria-describedby={errors.firstRegistrationDate ? "firstRegistrationDate-error" : undefined}
          />
          <VehicleFieldError
            field="firstRegistrationDate"
            message={errors.firstRegistrationDate}
          />
        </label>
      </div>
    </fieldset>
  );
}
