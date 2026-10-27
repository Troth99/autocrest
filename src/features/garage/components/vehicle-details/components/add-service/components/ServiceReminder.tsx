export default function ServiceReminder() {
    return (
        <details className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
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
                        id="next-service-date"
                        type="date"
                        className="native-input"
                    />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="next-service-mileage" className="text-sm">
                        Due at mileage (km)
                    </label>
                    <input data-slot="input"
                        id="next-service-mileage"
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
