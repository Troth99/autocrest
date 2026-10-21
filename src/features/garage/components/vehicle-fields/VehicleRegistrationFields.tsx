import VehicleFieldError from "@/features/garage/components/add-vehicle/components/VehicleFieldError";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import type { VehicleFormRegister } from "@/features/garage/types/add-vehicle-form";
import type { VehicleDocumentFieldProps } from "@/features/garage/types/vehicle-document-form";

type Props = VehicleDocumentFieldProps & { errors: VehicleFormErrors; register: VehicleFormRegister };

export default function VehicleRegistrationFields({ values, onFieldChange, register, errors }: Props) {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">Registration</legend>
      <h2 className="section-title">Registration</h2>
      <p className="mt-1 text-sm text-muted">
        Details from your vehicle registration documents.
      </p>
      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <label
          htmlFor="plate"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Registration plate</span>
          <input data-slot="input" className="native-input"
            id="plate"
            name="plate" value={values.plate} onChange={(event) => onFieldChange("plate", event.target.value)}
            type="text"
            placeholder="e.g. CB1234AB"
          aria-invalid={Boolean(errors.plate)} aria-describedby={errors.plate ? "plate-error" : undefined} />
<VehicleFieldError field="plate" message={errors.plate} />
        </label>
        <label
          htmlFor="vin"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>VIN</span>
          <input data-slot="input" className="native-input"
            id="vin"
            name="vin" value={values.vin} onChange={(event) => onFieldChange("vin", event.target.value)}
            type="text"
            placeholder="Vehicle identification number"
          aria-invalid={Boolean(errors.vin)} aria-describedby={errors.vin ? "vin-error" : undefined} />
<VehicleFieldError field="vin" message={errors.vin} />
        </label>
        <label
          htmlFor="registration_certificate_number"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Registration certificate number</span>
          <input data-slot="input" className="native-input"
            id="registration_certificate_number"
            name="registration_certificate_number" value={values.registration_certificate_number} onChange={(event) => onFieldChange("registration_certificate_number", event.target.value)}
            type="text"
          aria-invalid={Boolean(errors.registration_certificate_number)} aria-describedby={errors.registration_certificate_number ? "registration_certificate_number-error" : undefined} />
<VehicleFieldError field="registration_certificate_number" message={errors.registration_certificate_number} />
        </label>
        <label
          htmlFor="registration_country_code"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Registration country code</span>
          <input data-slot="input" className="native-input"
            id="registration_country_code"
            {...register("registration_country_code")}
            type="text"
            placeholder="e.g. BG"
          aria-invalid={Boolean(errors.registration_country_code)} aria-describedby={errors.registration_country_code ? "registration_country_code-error" : undefined} />
<VehicleFieldError field="registration_country_code" message={errors.registration_country_code} />
        </label>
        <label
          htmlFor="first_registration_date"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>First registration date</span>
          <input data-slot="input" className="native-input"
            id="first_registration_date"
            name="first_registration_date" value={values.first_registration_date} onChange={(event) => onFieldChange("first_registration_date", event.target.value)}
            type="date"
          aria-invalid={Boolean(errors.first_registration_date)} aria-describedby={errors.first_registration_date ? "first_registration_date-error" : undefined} />
<VehicleFieldError field="first_registration_date" message={errors.first_registration_date} />
        </label>
      </div>
    </fieldset>
  );
}
