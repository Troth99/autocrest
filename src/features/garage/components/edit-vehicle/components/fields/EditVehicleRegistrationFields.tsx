import type { EditVehicleFormRegister } from "@/features/garage/types/edit-vehicle-form";
import { Input } from "@/shared/components/ui/input";

type Props = {
    register: EditVehicleFormRegister;
};

export default function EditVehicleRegistrationFields({ register }: Props) {
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
                        {...register("plate")}
                    />
                </label>
                <label htmlFor="vin" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>VIN</span>
                    <Input
                        id="vin"
                        {...register("vin")}
                    />
                </label>
                <label htmlFor="registration_certificate_number" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Certificate number</span>
                    <Input
                        id="registration_certificate_number"
                        {...register("registration_certificate_number")}
                    />
                </label>
                <label htmlFor="registration_country_code" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Registration country code</span>
                    <Input
                        id="registration_country_code"
                        {...register("registration_country_code")}
                        placeholder="e.g. BG"
                    />
                </label>
                <label htmlFor="first_registration_date" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>First registration date</span>
                    <Input
                        id="first_registration_date"
                        {...register("first_registration_date")}
                        type="date"
                    />
                </label>
            </div>
        </fieldset>
    );
}
