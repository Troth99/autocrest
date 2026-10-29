"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { ImagePlus } from "lucide-react";

type Props = {
  photoFile: File | null;
  photoError: string | null;
  onPhotoChange: (file: File | null) => void;
  onPhotoError: (error: string | null) => void;
};

export default function VehiclePhotoFields({
  photoFile,
  photoError,
  onPhotoChange,
  onPhotoError,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!previewUrl) return;

    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
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
  }

  function handleRemovePhoto() {
    onPhotoChange(null);
    onPhotoError(null);
    setPreviewUrl(null);
  }

  return (
    <fieldset className="content-card vehicle-form-section">
      <legend className="sr-only">Vehicle photo</legend>
      <h2 className="section-title">Vehicle photo</h2>
      <p
        id="vehicle-photo-help"
        className="mt-1 text-sm text-muted"
      >
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

      <div className="vehicle-photo-upload">
        <div className="flex items-center gap-3">
          <span className="vehicle-photo-icon">
            <ImagePlus
              className="size-5"
              aria-hidden="true"
            />
          </span>
          <div className="min-w-0">
            <label
              htmlFor="vehicle-photo"
              className="cursor-pointer text-sm font-semibold text-text-primary"
            >
              {photoFile ? "Change photo" : "Choose photo"}
            </label>
            <p className="mt-0.5 text-xs text-muted">Add a photo to recognise your vehicle at a glance.</p>
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
          className="vehicle-photo-input"
          onChange={handlePhotoChange}
        />

        {photoFile && (
          <p
            role="status"
            className="truncate text-xs text-muted"
          >
            {photoFile.name} · {(photoFile.size / (1024 * 1024)).toFixed(2)} MB · Ready to save
          </p>
        )}

        {photoFile && (
          <button
            type="button"
            className="vehicle-photo-remove"
            onClick={handleRemovePhoto}
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
