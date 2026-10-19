import { Input } from "@/shared/components/ui/input";
import type { Vehicle } from "@/features/garage/types/vehicle";

type Props = {
    vehicle: Vehicle;
};

export default function EditVehicleBasicFields({ vehicle }: Props) {
    return (
        <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
            <legend className="sr-only">Basic details</legend>
            <h2 className="section-title">Basic details</h2>
            <p className="mt-1 text-sm text-muted">The essentials that identify your vehicle.</p>
            <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
                <label htmlFor="make" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Make</span>
                    <Input
                        id="make"
                        name="make"
                        defaultValue={vehicle.make ?? ""}
                    />
                </label>
                <label htmlFor="model" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Model</span>
                    <Input
                        id="model"
                        name="model"
                        defaultValue={vehicle.model ?? ""}
                    />
                </label>
                <label htmlFor="manufacture_year" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Manufacture year</span>
                    <Input
                        id="manufacture_year"
                        name="manufacture_year"
                        defaultValue={vehicle.manufacture_year ?? ""}
                        type="number"
                        min={1886}
                        step={1}
                    />
                </label>
                <label htmlFor="trim" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Trim / variant</span>
                    <Input
                        id="trim"
                        name="trim"
                        defaultValue={vehicle.trim ?? ""}
                    />
                </label>
                <label htmlFor="nickname" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Nickname</span>
                    <Input
                        id="nickname"
                        name="nickname"
                        defaultValue={vehicle.nickname ?? ""}
                        placeholder="e.g. My daily driver"
                    />
                </label>
                <label htmlFor="vehicle_use" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Vehicle use</span>
                    <select id="vehicle_use" name="vehicle_use" defaultValue={vehicle.vehicle_use ?? ""} className="form-select">
                        <option value="" className="bg-panel text-text-primary">Not specified</option>
                        <option value="personal" className="bg-panel text-text-primary">Personal</option>
                        <option value="business" className="bg-panel text-text-primary">Business</option>
                        <option value="mixed" className="bg-panel text-text-primary">Mixed</option>
                    </select>
                </label>
            </div>
        </fieldset>
    );
}
