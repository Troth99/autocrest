

export default function AddService() {


    return (
        <main className="mx-auto w-full min-w-0 max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
            <div className="min-w-0">
                <header className="mb-6">
                    <p className="vehicle-heading-eyebrow">My garage / Service</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-text-primary">Add service</h1>
                    <p className="mt-2 text-sm text-muted">
                        Record maintenance or a repair for your vehicle.
                    </p>
                </header>
                <form className="vehicle-form grid min-w-0 gap-4">
                    <fieldset className="content-card min-w-0 space-y-4 rounded-2xl p-4 sm:p-5">
                        <legend className="sr-only">
                            Service details
                        </legend>
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
                                    required
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
                                    required
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
                    </fieldset>

                    <fieldset className="content-card min-w-0 space-y-4 rounded-2xl p-4 sm:p-5">
                        <legend className="sr-only">Cost</legend>
                        <h2 className="section-title">Cost</h2>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <label htmlFor="parts-cost" className="text-sm">
                                    Parts (€)
                                </label>
                                <input data-slot="input"
                                    id="parts-cost"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="native-input"
                                />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="labor-cost" className="text-sm">
                                    Labor (€)
                                </label>
                                <input data-slot="input"
                                    id="labor-cost"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="native-input"
                                />
                            </div>
                        </div>

                        <p className="text-xs text-muted">
                            This cost will also appear in your vehicle expenses.
                        </p>
                    </fieldset>

                    <details className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
                        <summary className="cursor-pointer text-sm font-semibold">
                            Additional details
                        </summary>

                        <div className="mt-5 space-y-5">
                            <div className="grid gap-2">
                                <label htmlFor="service-symptoms" className="text-sm font-medium text-text-secondary">
                                    Symptoms before service
                                </label>
                                <textarea
                                    id="service-symptoms"
                                    rows={2}
                                    placeholder="e.g. Noise when braking, oil leak..."
                                    className="form-textarea"
                                />
                            </div>

                            <fieldset className="space-y-4 rounded-xl border border-line p-4">
                                <legend className="px-2 text-sm font-semibold">
                                    Replaced part
                                </legend>

                                <div className="grid gap-2">
                                    <label htmlFor="part-name" className="text-sm">
                                        Part name
                                    </label>
                                    <input data-slot="input"
                                        id="part-name"
                                        type="text"
                                        placeholder="e.g. Oil filter"
                                        className="native-input"
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <label htmlFor="part-brand" className="text-sm">
                                            Brand
                                        </label>
                                        <input data-slot="input"
                                            id="part-brand"
                                            type="text"
                                            placeholder="Manufacturer"
                                            className="native-input"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <label htmlFor="part-number" className="text-sm">
                                            Part number
                                        </label>
                                        <input data-slot="input"
                                            id="part-number"
                                            type="text"
                                            placeholder="Catalogue number"
                                            className="native-input"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="part-quantity" className="text-sm">
                                        Quantity
                                    </label>
                                    <input data-slot="input"
                                        id="part-quantity"
                                        type="number"
                                        min="1"
                                        step="1"
                                        placeholder="1"
                                        className="native-input"
                                    />
                                </div>
                            </fieldset>

                            <fieldset className="space-y-4 rounded-xl border border-line p-4">
                                <legend className="px-2 text-sm font-semibold">
                                    Fluids used
                                </legend>

                                <div className="grid gap-2">
                                    <label htmlFor="fluid-type" className="text-sm">
                                        Fluid type
                                    </label>
                                    <select id="fluid-type" className="form-select">
                                        <option value="">Select fluid</option>
                                        <option value="engine-oil">Engine oil</option>
                                        <option value="transmission-oil">Transmission oil</option>
                                        <option value="brake-fluid">Brake fluid</option>
                                        <option value="coolant">Coolant</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <label htmlFor="fluid-specification" className="text-sm">
                                            Brand / specification
                                        </label>
                                        <input data-slot="input"
                                            id="fluid-specification"
                                            type="text"
                                            placeholder="e.g. 5W-30, manufacturer approval"
                                            className="native-input"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <label htmlFor="fluid-quantity" className="text-sm">
                                            Quantity (liters)
                                        </label>
                                        <input data-slot="input"
                                            id="fluid-quantity"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="4.50"
                                            className="native-input"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <div className="grid gap-2">
                                <label htmlFor="service-result" className="text-sm font-medium text-text-secondary">
                                    Service outcome
                                </label>
                                <select id="service-result" className="form-select">
                                    <option value="">Select outcome</option>
                                    <option value="completed">Completed — no further work needed</option>
                                    <option value="partial">Partially resolved</option>
                                    <option value="follow-up">Follow-up visit needed</option>
                                </select>
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="service-reference" className="text-sm font-medium text-text-secondary">
                                    Invoice / work order number
                                </label>
                                <input data-slot="input"
                                    id="service-reference"
                                    type="text"
                                    placeholder="e.g. INV-2026-001"
                                    className="native-input"
                                />
                            </div>

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

                            <div className="grid gap-2">
                                <label htmlFor="recommended-work" className="text-sm font-medium text-text-secondary">
                                    Recommended future repairs
                                </label>
                                <textarea
                                    id="recommended-work"
                                    rows={2}
                                    placeholder="e.g. Replace front brake discs at the next visit."
                                    className="form-textarea"
                                />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="service-notes" className="text-sm font-medium text-text-secondary">
                                    Additional notes
                                </label>
                                <textarea
                                    id="service-notes"
                                    rows={3}
                                    placeholder="Any other details you want to keep."
                                    className="form-textarea"
                                />
                            </div>
                        </div>
                    </details>

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

                    <footer className="flex justify-end gap-3 border-t border-line pt-4">
                        <button
                            type="button"
                            className="button-base button-secondary cursor-pointer px-5 py-2.5"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled
                            title="Coming soon"
                            className="button-base button-primary  px-5 py-2.5 cursor-not-allowed"
                        >
                            Save service
                        </button>
                    </footer>
                </form>
            </div>
        </main>
    )
}
