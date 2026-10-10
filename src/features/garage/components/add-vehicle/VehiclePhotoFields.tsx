"use client";

import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";

type Proops = {
    photoFile: File | null;
    photoError: string | null;
    onPhotoChange: (file: File | null) => void;
    onPhotoError: (error: string | null) => void;
}
export default function VehiclePhotoFields(
    { photoFile, photoError, onPhotoChange, onPhotoError }: Proops
) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!previewUrl) return;

        return () => URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);


    return (
        <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
            <legend className="sr-only">Vehicle photo</legend>
            <h2 className="section-title">Vehicle photo</h2>
            <p id="vehicle-photo-help" className="mt-1 text-sm text-muted">
                Choose a JPG, PNG or WebP image. Maximum 2 MB.
            </p>

            {previewUrl && (
                <div className="mt-4 overflow-hidden rounded-xl border border-line">
                    {/* Local file previews do not need image optimization. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={previewUrl}
                        alt="Selected vehicle photo"
                        className="h-56 w-full object-contain bg-input/30"
                    />
                </div>
            )}

            <div className="mt-4 grid gap-3 rounded-xl border border-dashed border-info-border bg-linear-to-br from-info-soft to-transparent p-4 sm:p-5">
                <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-info-border bg-info-soft text-info">
                        <ImagePlus className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                <label
                    htmlFor="vehicle-photo"
                    className="cursor-pointer text-sm font-semibold text-text-primary"
                >
                    {photoFile ? "Change photo" : "Choose photo"}
                </label>
                        <p className="mt-0.5 text-xs text-muted">Add a photo to recognise your car at a glance.</p>
                    </div>
                </div>

                <input
                    id="vehicle-photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    aria-describedby={
                        photoError
                            ? "vehicle-photo-help vehicle-photo-error"
                            : "vehicle-photo-help"
                    }
                    aria-invalid={Boolean(photoError)}
                    aria-label="Choose vehicle photo"
                    className="w-full min-w-0 cursor-pointer rounded-lg text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-lg file:border file:border-info-border file:bg-info-soft file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-info hover:file:bg-info/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    onChange={(event) => {
                        const file = event.target.files?.[0];
                        event.target.value = "";

                        if (!file) return;

                        const allowedTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/webp",
                        ];

                        if (
                            !allowedTypes.includes(file.type) ||
                            file.size > 2 * 1024 * 1024
                        ) {
                            onPhotoError(
                                "Choose a JPG, PNG or WebP image under 2 MB.",
                            );
                            return;
                        }

                        onPhotoError(null);
                        onPhotoChange(file);
                        setPreviewUrl(URL.createObjectURL(file));
                    }}
                />

                {photoFile && (
                    <p role="status" className="truncate text-xs text-muted">
                        {photoFile.name} · {(photoFile.size / (1024 * 1024)).toFixed(2)} MB · Ready to save
                    </p>
                )}

                {photoFile && (
                    <button
                        type="button"
                        className="cursor-pointer justify-self-start rounded-lg border border-line px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-input/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        onClick={() => {
                            onPhotoChange(null);
                            onPhotoError(null);
                            setPreviewUrl(null);
                        }}
                    >
                        Remove photo
                    </button>
                )}

                {photoError && (
                    <p
                        id="vehicle-photo-error"
                        role="alert"
                        className="text-sm text-destructive"
                    >
                        {photoError}
                    </p>
                )}
            </div>
        </fieldset>
    );

}
