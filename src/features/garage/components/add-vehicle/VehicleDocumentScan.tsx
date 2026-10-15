"use client";
import { extractVehicleDocument } from "@/features/garage/services/vehicle-document.service";
import type { VehicleDocumentDetails } from "@/features/garage/validators/vehicle-document.validator";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { CircleCheck, FileScan, Upload, WandSparkles } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function VehicleDocumentScan({ onExtracted }: {
    onExtracted: (details: VehicleDocumentDetails) => void;
}) {
    // The photo stays local until the user clicks Extract details.
    const [frontFile, setFrontFile] = useState<File | null>(null);
    const [frontError, setFrontError] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [extractedDetails, setExtractedDetails] =
        useState<VehicleDocumentDetails | null>(null);

    // Validate the selected photo and clear the previous scan result.
    function handleFileChange(
        event: ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0] ?? null;

        setFrontError(null);
        setExtractedDetails(null);

        if (!file) {
            setFrontFile(null);
            return;
        }

        if (!ACCEPTED_TYPES.includes(file.type)) {
            setFrontError("Choose a JPEG, PNG or WebP image.");
            setFrontFile(null);
            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setFrontError("The image must be 5 MB or smaller.");
            setFrontFile(null);
            event.target.value = "";
            return;
        }

        setFrontFile(file);
    }

    async function handleExtract() {
        // Prevent requests without a photo and duplicate requests while scanning.
        if (!frontFile || isScanning) return;

        setIsScanning(true);
        setFrontError(null);
        setExtractedDetails(null);

        try {
            const details = await extractVehicleDocument(frontFile);

            onExtracted(details);
            setExtractedDetails(details);


        } catch (error) {
            setFrontError(
                error instanceof Error && error.name === "TimeoutError"
                    ? "Scanning took too long. Please try again."
                    : error instanceof Error
                        ? error.message
                        : "Could not scan the document.",
            );
        } finally {
            // Reset the loading state after either success or failure.
            setIsScanning(false);
        }
    }
    return (

        <fieldset
            aria-busy={isScanning}
            className="document-scan-panel relative min-w-0 overflow-hidden rounded-2xl border p-4 sm:p-6"
        >
            <legend className="sr-only">Scan registration document</legend>
            {isScanning && (
                <span aria-hidden="true" className="pointer-events-none absolute -inset-px animate-pulse rounded-2xl border-2 border-info motion-reduce:animate-none" />
            )}

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
                <div className="rounded-xl border border-info-border bg-background/40 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-ink shadow-lg shadow-accent/20">
                            <FileScan className="size-8" aria-hidden="true" />
                        </span>
                        <div>
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-info">Quick autofill</p>
                            <h2 className="text-xl font-semibold tracking-tight text-text-primary">Scan registration document</h2>
                            <p className="mt-1 text-xs text-text-secondary">
                                Select a clear photo of your registration document (Part I or Part II).
                            </p>

                        </div>
                    </div>

                    <div className="mt-4 grid gap-4">
                        <div className="grid content-start gap-2">
                            <input disabled={isScanning}
                                id="registration_document_front"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleFileChange}
                                aria-invalid={Boolean(frontError)}
                                aria-describedby={`document_photo_help${frontError ? " document_front_error" : ""}`}
                                className="peer sr-only"
                            />
                            <label
                                htmlFor="registration_document_front"
                                className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-info-border bg-panel px-4 py-4 text-center transition-colors hover:border-info hover:bg-info-soft peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-focus sm:flex-row sm:gap-4 sm:text-left"
                            >
                                <Upload className="size-7 shrink-0 text-info" aria-hidden="true" />
                                <span className="min-w-0 flex-1">
                                    <span className="block break-all text-xs font-semibold text-text-primary">
                                        {frontFile ? frontFile.name : "Upload registration document photo"}
                                    </span>
                                    <span id="document_photo_help" className="mt-1 block text-xs text-muted">
                                        JPEG, PNG or WebP. Maximum 5 MB.
                                    </span>
                                </span>
                                <span className="shrink-0 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-ink">
                                    {frontFile ? "Change photo" : "Choose photo"}
                                </span>
                            </label>

                            {frontError && (
                                <p
                                    id="document_front_error"
                                    role="alert"
                                    className="text-sm text-destructive"
                                >
                                    {frontError}
                                </p>
                            )}
                        </div>

                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={handleExtract}
                            disabled={!frontFile || isScanning}
                            aria-busy={isScanning}
                            className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <WandSparkles className="size-4" aria-hidden="true" />
                            {isScanning ? "Reading document..." : "Extract details"}
                        </button>

                        <p role="status" className="text-sm text-text-secondary">
                            {isScanning ? "Scanning your document. Please wait..." : extractedDetails ? "Scan complete." : "Select a photo, then extract the vehicle details."}
                        </p>
                    </div>
                </div>
                <aside className="border-t border-info-border pt-4 lg:border-t-0 lg:border-l lg:pl-5 lg:pt-1"><h3 className="text-xs font-semibold">
                    Before you scan</h3><ul className="mt-3 space-y-2 text-xs leading-5 text-muted"><li>
                        Registration document: Part I or Part II</li><li>Use a clear, well-lit photograph
                        </li><li>Review and edit the extracted details</li></ul><p className="mt-4 text-xs leading-5 text-muted">Scanning fills the form. Your vehicle is saved when you select Add car.</p></aside>
            </div>
            <div role="status" aria-atomic="true">
                {extractedDetails && !isScanning && (
                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-100">
                        <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                        <div>
                            <p className="text-sm font-semibold">Document scanned successfully</p>
                            <p className="mt-1 text-sm">The readable vehicle details have been filled in. Review and edit the fields below before continuing.</p>
                        </div>
                    </div>
                )}
            </div>
        </fieldset>
    );
}
