
export default function ServiceDetails() {

    return (
        <>
            <h2 className="section-title">Service details</h2>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="service-type" className="text-sm font-medium text-text-secondary">
                        Service type *
                    </label>
                    <select id="service-type" className="form-select" required>
                        <option value="">Select service</option>
                        <option value="oil">Oil & filters</option>
                        <option value="brakes">Brakes</option>
                        <option value="tires">Tires</option>
                        <option value="battery">Battery</option>
                        <option value="timing">Timing belt / chain</option>
                        <option value="suspension">Suspension & steering</option>
                        <option value="cooling">Cooling system</option>
                        <option value="electrical">Electrical system</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="grid gap-2">
                    <label htmlFor="visit-reason" className="text-sm font-medium text-text-secondary">
                        Reason for visit
                    </label>
                    <select id="visit-reason" className="form-select">
                        <option value="">Select reason</option>
                        <option value="scheduled">Scheduled maintenance</option>
                        <option value="repair">Repair</option>
                        <option value="diagnostics">Diagnostics</option>
                        <option value="recall">Manufacturer recall</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="service-date" className="text-sm font-medium text-text-secondary">
                        Date *
                    </label>
                    <input data-slot="input"
                        id="service-date"
                        type="date"
                        className="native-input"
                    />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="service-mileage" className="text-sm font-medium text-text-secondary">
                        Mileage (km) *
                    </label>
                    <input data-slot="input"
                        id="service-mileage"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="150000"
                        className="native-input"
                    />
                </div>
            </div>
            <div className="grid gap-2">
                <label htmlFor="service-provider" className="text-sm font-medium text-text-secondary">
                    Workshop / mechanic
                </label>
                <input data-slot="input"
                    id="service-provider"
                    type="text"
                    placeholder="Workshop name or DIY"
                    className="native-input"
                />
            </div>

            <div className="grid gap-2">
                <label htmlFor="service-work" className="text-sm font-medium text-text-secondary">
                    Work performed
                </label>
                <textarea
                    id="service-work"
                    rows={3}
                    placeholder="Describe what was checked, repaired or replaced."
                    className="form-textarea"
                />
            </div>

        </>
    )
}
