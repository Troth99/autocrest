import { Input } from "@/shared/components/ui/input";
import type { Vehicle } from "@/features/garage/types/vehicle";

type Props = {
    vehicle: Vehicle;
};

export default function EditVehicleMileageFields({ vehicle }: Props) {
    return (
        <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
            <legend className="sr-only">Mileage</legend>
            <h2 className="section-title">Mileage</h2>
            <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
                <label htmlFor="mileage_km" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Odometer (km)</span>
                    <Input
                        id="mileage_km"
                        name="mileage_km"
                        defaultValue={vehicle.mileage_km ?? ""}
                        type="number"
                        min={0}
                        step={1}
                    />
                </label>
                <label htmlFor="mileage_recorded_at" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Recorded on</span>
                    <Input
                        id="mileage_recorded_at"
                        name="mileage_recorded_at"
                        defaultValue={vehicle.mileage_recorded_at?.slice(0, 10) ?? ""}
                        type="date"
                    />
                </label>
            </div>
        </fieldset>
    );
}
