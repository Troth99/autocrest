export default function ServiceWarranty() {
    return (
        <fieldset className="space-y-4 rounded-xl border border-line p-4">
            <legend className="px-2 text-sm font-semibold">
                Warranty limits
            </legend>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="warranty-date" className="text-sm">
                        Valid until
                    </label>
                    <input data-slot="input"
                        id="warranty-date"
                        type="date"
                        className="native-input"
                    />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="warranty-mileage" className="text-sm">
                        Odometer limit (km)
                    </label>
                    <input data-slot="input"
                        id="warranty-mileage"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="170000"
                        className="native-input"
                    />
                </div>
            </div>
        </fieldset>
    );
}
