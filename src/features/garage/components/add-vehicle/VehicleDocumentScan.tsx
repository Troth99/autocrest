"use client";
import { vehicleDocumentSchema } from "@/features/garage/validators/vehicle-document.validator";
import type { VehicleDocumentDetails } from "@/features/garage/validators/vehicle-document.validator";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { CircleCheck, FileScan, Upload, WandSparkles } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function VehicleDocumentScan({ onExtracted }: {
    onExtracted: (details: VehicleDocumentDetails) => void;
}) {
    const [frontFile, setFrontFile] = useState<File | null>(null);
    const [frontError, setFrontError] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [extractedDetails, setExtractedDetails] =
        useState<VehicleDocumentDetails | null>(null);

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
        if (!frontFile || isScanning) return;

        setIsScanning(true);
        setFrontError(null);
        setExtractedDetails(null);

        try {
            const formData = new FormData();
            formData.append("document", frontFile);

            const response = await fetch("/api/vehicles/extract", {
                method: "POST",
                body: formData,
                signal: AbortSignal.timeout(75_000),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    typeof result.error === "string"
                        ? result.error
                        : "Could not scan the document.",
                );
            }

            const details = vehicleDocumentSchema.safeParse(result.details);

            if (!details.success) {
                throw new Error("The server returned invalid vehicle details.");
            }

            onExtracted(details.data);
            setExtractedDetails(details.data);
        } catch (error) {
            setFrontError(
                error instanceof Error && error.name === "TimeoutError"
                    ? "Scanning took too long. Please try again."
                    : error instanceof Error
                        ? error.message
                        : "Could not scan the document.",
            );
        } finally {
            setIsScanning(false);
        }
    }
    return (

        <fieldset aria-busy={isScanning} className="relative min-w-0 rounded-2xl border border-sky-300 bg-sky-50 p-4 shadow-sm sm:p-6 dark:border-sky-700 dark:bg-slate-900">
            <legend className="sr-only">Scan registration document</legend>
            {isScanning && (
                <span aria-hidden="true" className="pointer-events-none absolute -inset-px animate-pulse rounded-2xl border-2 border-sky-500 shadow-[0_0_18px_rgba(14,165,233,0.45)] motion-reduce:animate-none dark:border-sky-400" />
            )}

            <div className="flex items-start gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-700 text-white dark:bg-sky-400 dark:text-slate-950">
                    <FileScan className="size-6" aria-hidden="true" />
                </span>
                <div>
                    <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Scan registration document</h2>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                        Select a clear photo of your registration document (Part I or Part II).
                    </p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                        English and Cyrillic text can be scanned. Vehicle names may need manual correction after scanning.
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
                        className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-sky-500 bg-white px-4 py-7 text-center transition-colors hover:border-sky-700 hover:bg-sky-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-sky-600 sm:flex-row sm:gap-4 sm:text-left dark:border-sky-500 dark:bg-slate-800 dark:hover:border-sky-300 dark:hover:bg-slate-700"
                    >
                        <Upload className="size-7 shrink-0 text-sky-700 dark:text-sky-300" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                            <span className="block break-all text-base font-semibold text-slate-950 dark:text-white">
                                {frontFile ? frontFile.name : "Upload registration document photo"}
                            </span>
                            <span id="document_photo_help" className="mt-1 block text-sm text-slate-600 dark:text-slate-300">
                                JPEG, PNG or WebP. Maximum 5 MB.
                            </span>
                        </span>
                        <span className="shrink-0 rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white dark:bg-sky-400 dark:text-slate-950">
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
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                >
                    <WandSparkles className="size-4" aria-hidden="true" />
                    {isScanning ? "Reading document..." : "Extract details"}
                </button>

                <p role="status" className="text-sm text-slate-700 dark:text-slate-300">
                    {isScanning ? "Scanning your document. Please wait..." : extractedDetails ? "Scan complete." : "Select a photo, then extract the vehicle details."}
                </p>
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
