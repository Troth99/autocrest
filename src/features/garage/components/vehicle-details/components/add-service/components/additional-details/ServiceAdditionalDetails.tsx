import ServiceReplacedPart from "./ServiceReplacedPart";
import ServiceFluids from "./ServiceFluids";
import ServiceWarranty from "./ServiceWarranty";

export default function ServiceAdditionalDetails() {
    return (
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

                <ServiceReplacedPart />

                <ServiceFluids />

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

                <ServiceWarranty />

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
    );
}
