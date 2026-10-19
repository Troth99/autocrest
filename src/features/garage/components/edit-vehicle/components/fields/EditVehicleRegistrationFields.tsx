import { Input } from "@/shared/components/ui/input";
import type { Vehicle } from "@/features/garage/types/vehicle";

type Props = {
    vehicle: Vehicle;
};

export default function EditVehicleRegistrationFields({ vehicle }: Props) {
    return (
        <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
            <legend className="sr-only">Registration</legend>
            <h2 className="section-title">Registration</h2>
            <p className="mt-1 text-sm text-muted">Details from your vehicle registration documents.</p>
            <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
                <label htmlFor="plate" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Registration plate</span>
                    <Input
                        id="plate"
                        name="plate"
                        defaultValue={vehicle.plate ?? ""}
                    />
                </label>
                <label htmlFor="vin" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>VIN</span>
                    <Input
                        id="vin"
                        name="vin"
                        defaultValue={vehicle.vin ?? ""}
                    />
                </label>
                <label htmlFor="registration_certificate_number" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Certificate number</span>
                    <Input
                        id="registration_certificate_number"
                        name="registration_certificate_number"
                        defaultValue={vehicle.registration_certificate_number ?? ""}
                    />
                </label>
                <label htmlFor="registration_country_code" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Registration country code</span>
                    <Input
                        id="registration_country_code"
                        name="registration_country_code"
                        defaultValue={vehicle.registration_country_code ?? ""}
                        placeholder="e.g. BG"
                    />
                </label>
                <label htmlFor="first_registration_date" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>First registration date</span>
                    <Input
                        id="first_registration_date"
                        name="first_registration_date"
                        defaultValue={vehicle.first_registration_date ?? ""}
                        type="date"
                    />
                </label>
            </div>
        </fieldset>
    );
}
