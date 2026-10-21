import type { EditVehicleFormRegister } from "@/features/garage/types/edit-vehicle-form";

type Props = {
    register: EditVehicleFormRegister;
};

export default function EditVehicleBasicFields({ register }: Props) {
    return (
        <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
            <legend className="sr-only">Basic details</legend>
            <h2 className="section-title">Basic details</h2>
            <p className="mt-1 text-sm text-muted">The essentials that identify your vehicle.</p>
            <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
                <label htmlFor="make" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Make</span>
                    <input data-slot="input" className="native-input"
                        id="make"
                        {...register("make")}
                    />
                </label>
                <label htmlFor="model" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Model</span>
                    <input data-slot="input" className="native-input"
                        id="model"
                        {...register("model")}
                    />
                </label>
                <label htmlFor="manufacture_year" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Manufacture year</span>
                    <input data-slot="input" className="native-input"
                        id="manufacture_year"
                        {...register("manufacture_year")}
                        type="number"
                        min={1886}
                        step={1}
                    />
                </label>
                <label htmlFor="trim" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Trim / variant</span>
                    <input data-slot="input" className="native-input"
                        id="trim"
                        {...register("trim")}
                    />
                </label>
                <label htmlFor="nickname" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Nickname</span>
                    <input data-slot="input" className="native-input"
                        id="nickname"
                        {...register("nickname")}
                        placeholder="e.g. My daily driver"
                    />
                </label>
                <label htmlFor="vehicle_use" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Vehicle use</span>
                    <select id="vehicle_use"
                        {...register("vehicle_use")} className="form-select">
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
