import type { Props as VehicleAddServiceProps } from "@/features/garage/types/add-service-form";

export default function ServiceReminder({
    register
}: VehicleAddServiceProps) {
    return (
        <details className="content-card vehicle-form-section">
            <summary className="cursor-pointer text-sm font-semibold">
                Next service reminder
            </summary>

            <p className="mt-2 text-xs text-muted">
                Set a date, a mileage target, or both.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="next-service-date" className="text-sm">
                        Due date
                    </label>
                    <input data-slot="input"
                        id="next-service-date" {...register("nextServiceDate")}
                        type="date"
                        className="native-input"
                    />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="next-service-mileage" className="text-sm">
                        Due at mileage (km)
                    </label>
                    <input data-slot="input"
                        id="next-service-mileage" {...register("nextServiceMileage")}
                        type="number"
                        min="0"
                        step="1"
                        placeholder="160000"
                        className="native-input"
                    />
                </div>
            </div>
        </details>
    );
}
