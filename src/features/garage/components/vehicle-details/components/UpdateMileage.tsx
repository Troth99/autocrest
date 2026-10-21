"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Gauge, X } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import { createClient } from "@/lib/supabase/client";
import { updateVehicleMileage } from "@/features/garage/services/vehicles.service";
import { createUpdateMileageSchema } from "@/features/garage/validators/update-mileage-validator";

type Props = {
    vehicleId: string;
    currentMileage: number;
    currentRecordedAt: string | null;
};

//helper function to check if the mileage has been updated recently
function today() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export default function UpdateMileage({
    vehicleId,
    currentMileage,
    currentRecordedAt,
}: Props) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [mileage, setMileage] = useState(String(currentMileage));
    const [recordedAt, setRecordedAt] = useState(() => currentRecordedAt?.slice(0, 10) ?? today());
    const [isSaving, setIsSaving] = useState(false);
    const [mode, setMode] = useState<"reading" | "correction" | "replacement">("reading");
    const [reason, setReason] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<"mileage_km" | "mileage_recorded_at" | "reason" | "confirmed", string>>>({});
    const errorId = useId();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isSaving) return;

        setError(null);
        const validation = createUpdateMileageSchema(currentMileage, currentRecordedAt).safeParse({
            mileage_km: mileage,
            mileage_recorded_at: recordedAt,
            mode, reason, confirmed,
        });
        const errors: typeof fieldErrors = {};
        
        if (!validation.success) {
            for (const issue of validation.error.issues) {
                const field = issue.path[0] as keyof typeof errors;
                if (!errors[field]) errors[field] = issue.message;
            }
        }
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) return;
        setIsSaving(true);

        try {
            await updateVehicleMileage(createClient(), vehicleId, {
                mileage_km: mileage,
                mileage_recorded_at: recordedAt,
                mode, reason, confirmed,
            });

            setIsOpen(false);
            router.refresh();
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Could not update mileage.",
            );
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => {
            if (isSaving) return;
            setIsOpen(open);
            if (open) {
                setMileage(String(currentMileage));
                setRecordedAt(currentRecordedAt?.slice(0, 10) ?? today());
                setError(null);
                setFieldErrors({});
                setMode("reading");
                setReason("");
                setConfirmed(false);
            }
        }}>
            <Dialog.Trigger
                type="button"
                className="vehicle-mileage-action cursor-pointer"
            >
                <Gauge className="size-4" aria-hidden="true" />
                Update mileage
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/65" />
                <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-panel p-6 text-text-primary shadow-2xl">
                    <Dialog.Close disabled={isSaving} aria-label="Close mileage form" className="absolute top-4 right-4 cursor-pointer rounded-lg p-2 text-muted hover:bg-info-soft hover:text-text-primary disabled:cursor-not-allowed">
                        <X className="size-4" aria-hidden="true" />
                    </Dialog.Close>
                    <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-info-soft text-info">
                        <Gauge className="size-6" aria-hidden="true" />
                    </div>
                    <Dialog.Title className="pr-8 text-xl font-semibold tracking-tight">Update mileage</Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-muted">Record your latest odometer reading.</Dialog.Description>
                    <form noValidate onSubmit={handleSubmit} className="vehicle-form mt-5 grid gap-4">
                        <p className="text-sm text-muted">
                            Current mileage: {currentMileage.toLocaleString()} km
                        </p>

                        <label className="grid gap-2 text-sm">
                            Update type
                            <select className="form-select" value={mode} disabled={isSaving} onChange={(event) => {
                                setMode(event.target.value as typeof mode);
                                setConfirmed(false);
                                setFieldErrors({});
                                setError(null);
                            }}>
                                <option value="reading">New reading</option>
                                <option value="correction">Correct an entry</option>
                                <option value="replacement">Odometer replaced</option>
                            </select>
                        </label>
                        {mode !== "reading" && <p className="text-sm text-muted">
                            {mode === "replacement" ? "Enter the replacement odometer reading. This may be lower and does not represent the vehicle’s total distance." : "Correct an incorrect reading or recorded date. Lower mileage and earlier dates are allowed."}
                        </p>}

                        <label className="grid gap-2 text-sm">
                            New mileage (km)
                            <input
                                data-slot="input"
                                className="native-input"
                                type="number"
                                min={mode === "reading" ? currentMileage : 0}
                                max={2147483647}
                                step={1}
                                required
                                value={mileage}
                                disabled={isSaving}
                                aria-invalid={Boolean(fieldErrors.mileage_km)}
                                aria-describedby={fieldErrors.mileage_km ? `${errorId}-mileage` : undefined}
                                onChange={(event) => {
                                    setMileage(event.target.value);
                                    setFieldErrors((current) => ({ ...current, mileage_km: undefined }));
                                    setError(null);
                                }}
                            />
                            {fieldErrors.mileage_km && <span id={`${errorId}-mileage`} role="alert" className="text-sm text-destructive">{fieldErrors.mileage_km}</span>}
                        </label>

                        <label className="grid gap-2 text-sm">
                            Recorded date
                            <input
                                data-slot="input"
                                className="native-input"
                                type="date"
                                required
                                value={recordedAt}
                                disabled={isSaving}
                                aria-invalid={Boolean(fieldErrors.mileage_recorded_at)}
                                aria-describedby={fieldErrors.mileage_recorded_at ? `${errorId}-date` : undefined}
                                onChange={(event) => {
                                    setRecordedAt(event.target.value);
                                    setFieldErrors((current) => ({ ...current, mileage_recorded_at: undefined }));
                                    setError(null);
                                }}
                            />
                            {fieldErrors.mileage_recorded_at && <span id={`${errorId}-date`} role="alert" className="text-sm text-destructive">{fieldErrors.mileage_recorded_at}</span>}
                        </label>

                        {mode !== "reading" && <>
                            <label className="grid gap-2 text-sm">
                                Reason
                                <textarea className="form-textarea" rows={3} maxLength={500} value={reason} disabled={isSaving}
                                    aria-invalid={Boolean(fieldErrors.reason)} aria-describedby={fieldErrors.reason ? `${errorId}-reason` : undefined}
                                    onChange={(event) => {
                                        setReason(event.target.value);
                                        setFieldErrors((current) => ({ ...current, reason: undefined }));
                                        setError(null);
                                    }} />
                                {fieldErrors.reason && <span id={`${errorId}-reason`} role="alert" className="text-sm text-destructive">{fieldErrors.reason}</span>}
                            </label>
                            <label className="flex items-start gap-2 text-sm">
                                <input type="checkbox" checked={confirmed} disabled={isSaving} className="mt-1 accent-accent"
                                    aria-invalid={Boolean(fieldErrors.confirmed)} aria-describedby={fieldErrors.confirmed ? `${errorId}-confirmed` : undefined}
                                    onChange={(event) => {
                                        setConfirmed(event.target.checked);
                                        setFieldErrors((current) => ({ ...current, confirmed: undefined }));
                                    }} />
                                I confirm this adjustment replaces the current mileage reading and date.
                            </label>
                            {fieldErrors.confirmed && <p id={`${errorId}-confirmed`} role="alert" className="text-sm text-destructive">{fieldErrors.confirmed}</p>}
                        </>}

                        {error && (
                            <p role="alert" className="text-sm text-destructive">
                                {error}
                            </p>
                        )}

                        <div className="mt-2 flex justify-end gap-3 border-t border-line pt-4">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="button-base button-primary cursor-pointer px-5 py-2.5 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>

                            <button
                                type="button"
                                disabled={isSaving}
                                className="button-base button-secondary cursor-pointer px-5 py-2.5 disabled:cursor-not-allowed"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
