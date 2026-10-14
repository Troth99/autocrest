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
      <fieldset aria-busy={isScanning} className="relative min-w-0 overflow-hidden rounded-2xl border border-info-border border-t-4 border-t-accent bg-info-soft p-5 sm:p-6">
        <legend className="sr-only">Scan registration document</legend>
        {isScanning && <span aria-hidden="true" className="pointer-events-none absolute inset-0 animate-pulse rounded-2xl border-2 border-info motion-reduce:animate-none" />}
        <div className="flex items-center gap-2.5">
          <FileScan className="size-5 shrink-0 text-info" aria-hidden="true" />
          <h2 className="text-base font-semibold text-text-primary">Scan registration document</h2>
        </div>
        <p className="mt-2 text-sm text-text-secondary">Use a clear photo of your registration document (Part I or Part II).</p>
        <input id="registration_document_front" type="file" accept="image/jpeg,image/png,image/webp" disabled={isScanning} onChange={handleFileChange} aria-invalid={Boolean(frontError)} aria-describedby={"document_photo_help" + (frontError ? " document_front_error" : "")} className="peer sr-only" />
        <label htmlFor="registration_document_front" className={"mt-4 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-accent px-5 py-4 text-center text-base font-semibold text-ink transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-focus " + (isScanning ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-accent-strong")}>
          <Upload className="size-5 shrink-0" aria-hidden="true" />
          {frontFile ? "Change registration photo" : "Choose registration photo (Part I or Part II)"}
        </label>
        <p id="document_photo_help" className="mt-2 text-center text-xs text-muted">JPEG, PNG or WebP. Maximum 5 MB. Fill the form from your document, then review the details.</p>
        {frontFile && <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-xl border border-info-border bg-panel p-3 sm:flex-row"><p className="min-w-0 break-all text-sm text-text-secondary">{frontFile.name}</p><button type="button" onClick={handleExtract} disabled={isScanning} aria-busy={isScanning} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"><WandSparkles className="size-4" aria-hidden="true" />{isScanning ? "Reading document..." : "Extract details"}</button></div>}
        {frontError && <p id="document_front_error" role="alert" className="mt-3 text-sm text-destructive">{frontError}</p>}
        <p role="status" className="mt-3 text-center text-xs text-muted">{isScanning ? "Scanning your document. Please wait..." : extractedDetails ? "Scan complete." : frontFile ? "Photo ready. Select Extract details to fill the form." : "Your vehicle is saved only when you select Add vehicle."}</p>
        <div role="status" aria-atomic="true">{extractedDetails && !isScanning && <div className="mt-3 flex items-start gap-2 rounded-xl border border-info-border bg-panel p-3 text-info"><CircleCheck className="size-5 shrink-0" aria-hidden="true" /><p className="text-sm">Document scanned successfully. Review and edit the fields below before continuing.</p></div>}</div>
      </fieldset>
    );
}
