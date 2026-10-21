import type { EditVehicleFormRegister } from "@/features/garage/types/edit-vehicle-form";

type Props = {
    register: EditVehicleFormRegister;
};

export default function EditVehicleMileageFields({ register }: Props) {
    return (
        <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
            <legend className="sr-only">Mileage</legend>
            <h2 className="section-title">Mileage</h2>
            <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
                <label htmlFor="mileage_km" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Odometer (km)</span>
                    <input data-slot="input" className="native-input"
                        id="mileage_km"
                        type="number"
                        min={0}
                        step={1} {...register("mileage_km")}
                    />
                </label>
                <label htmlFor="mileage_recorded_at" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Recorded on</span>
                    <input data-slot="input" className="native-input"
                        id="mileage_recorded_at"
                        type="date" {...register("mileage_recorded_at")}
                    />
                </label>
            </div>
        </fieldset>
    );
}
