import ServiceReplacedPart from "./ServiceReplacedPart";
import ServiceFluids from "./ServiceFluids";
import ServiceWarranty from "./ServiceWarranty";
import type { VehicleServiceSectionProps } from "@/features/garage/types/add-service-form";


export default function ServiceAdditionalDetails({
    register,
    values,
}: VehicleServiceSectionProps) {
    return (
        <details className="content-card vehicle-form-section">
            <summary className="cursor-pointer text-sm font-semibold">
                Additional details (optional)
            </summary>

            <p className="mt-2 text-xs text-muted">
                Add parts, fluids, warranty information or notes when you need them.
            </p>

            <div className="mt-5 space-y-5">
                <div className="grid gap-2">
                    <label htmlFor="service-symptoms" className="form-field-label">
                        Symptoms before service
                    </label>
                    <textarea
                        id="service-symptoms"
                        rows={2}
                        placeholder="e.g. Noise when braking, oil leak..."
                        className="form-textarea"
                        {...register("symptoms")}
                    />
                </div>

                <ServiceReplacedPart register={register} />

                <ServiceFluids register={register} values={values} />

                <div className="grid gap-2">
                    <label htmlFor="service-result" className="form-field-label">
                        Service outcome
                    </label>
                    <select id="service-result" className="form-select"  {...register("serviceOutcome")}>
                        <option value="">Select outcome</option>
                        <option value="completed">Completed — no further work needed</option>
                        <option value="partial">Partially resolved</option>
                        <option value="follow-up">Follow-up visit needed</option>
                    </select>
                </div>

                <div className="grid gap-2">
                    <label htmlFor="service-reference" className="form-field-label">
                        Invoice / work order number
                    </label>
                    <input data-slot="input"
                        id="service-reference"
                        type="text"
                        placeholder="e.g. INV-2026-001"
                        className="native-input"
                        {...register("invoiceNumber")}
                    />
                </div>

                <ServiceWarranty register={register} />

                <div className="grid gap-2">
                    <label htmlFor="recommended-work" className="form-field-label">
                        Recommended future repairs
                    </label>
                    <textarea
                        id="recommended-work" {...register("recommendedWork")}
                        rows={2}
                        placeholder="e.g. Replace front brake discs at the next visit."
                        className="form-textarea"
                    />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="service-notes" className="form-field-label">
                        Additional notes
                    </label>
                    <textarea
                        id="service-notes" {...register("notes")}
                        rows={3}
                        placeholder="Any other details you want to keep."
                        className="form-textarea"
                    />
                </div>
            </div>
        </details>
    );
}
