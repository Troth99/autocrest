import { Input } from "@/shared/components/ui/input";

export default function VehicleRegistrationFields() {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">Registration</legend>
      <h2 className="section-title">Registration</h2>
      <p className="mt-1 text-sm text-muted">
        Details from your vehicle registration documents.
      </p>
      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label
          htmlFor="plate"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Registration plate</span>
          <Input
            id="plate"
            name="plate"
            type="text"
            placeholder="e.g. CB1234AB"
          />
        </label>
        <label
          htmlFor="vin"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>VIN</span>
          <Input
            id="vin"
            name="vin"
            type="text"
            placeholder="Vehicle identification number"
          />
        </label>
        <label
          htmlFor="registration_certificate_number"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Registration certificate number</span>
          <Input
            id="registration_certificate_number"
            name="registration_certificate_number"
            type="text"
          />
        </label>
        <label
          htmlFor="registration_country_code"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>Registration country code</span>
          <Input
            id="registration_country_code"
            name="registration_country_code"
            type="text"
            placeholder="e.g. BG"
          />
        </label>
        <label
          htmlFor="first_registration_date"
          className="grid gap-2 text-sm font-medium text-text-secondary"
        >
          <span>First registration date</span>
          <Input
            id="first_registration_date"
            name="first_registration_date"
            type="date"
          />
        </label>
      </div>
    </fieldset>
  );
}
