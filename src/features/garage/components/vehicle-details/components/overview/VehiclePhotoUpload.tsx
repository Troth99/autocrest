"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, LoaderCircle, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  uploadVehiclePhoto,
  removeVehiclePhoto,
} from "@/features/garage/services/vehicle-photo.service";

type Props = {
  vehicleId: string;
  hasPhoto: boolean;
  photoId?: string | null;
};

export default function VehiclePhotoUpload({ vehicleId, hasPhoto, photoId }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadInProgress = useRef(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    if (uploadInProgress.current) return;
    uploadInProgress.current = true;
    setIsUploading(true);
    setError(null);

    try {
      await uploadVehiclePhoto(createClient(), vehicleId, file);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Photo upload failed.");
    } finally {
      uploadInProgress.current = false;
      setIsUploading(false);
    }
  }
  async function handleRemove() {
    if (!photoId || uploadInProgress.current) return;

    uploadInProgress.current = true;
    setIsRemoving(true);
    setError(null);

    try {
      await removeVehiclePhoto(createClient(), vehicleId, photoId);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not remove photo.",
      );
    } finally {
      uploadInProgress.current = false;
      setIsRemoving(false);
    }
  }
  return (
    <div className="flex flex-col items-center gap-2">
      {error && (
        <p role="alert" className="rounded-lg border border-line bg-panel p-2 text-xs text-destructive">
          {error}
        </p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-label="Choose vehicle photo (JPG, PNG or WebP, maximum 2 MB)"
        className="hidden"
        disabled={isUploading || isRemoving}
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) await handleUpload(file);
        }}
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isUploading || isRemoving}
          className="vehicle-detail-action bg-panel cursor-pointer"
          onClick={() => inputRef.current?.click()}
          title="JPG, PNG or WebP, maximum 2 MB"
        >
          {isUploading ? (
            <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden="true" />
          ) : (
            <Camera className="size-4" aria-hidden="true" />
          )}
          <span role="status">{isUploading ? "Uploading..." : hasPhoto ? "Change photo" : "Add photo"}</span>
        </button>
        {hasPhoto && photoId && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={isUploading || isRemoving}
            aria-label={isRemoving ? "Removing photo" : "Remove photo"}
            title="Remove photo"
            className="vehicle-detail-action enabled:cursor-pointer enabled:hover:border-destructive enabled:hover:bg-destructive/10 enabled:hover:text-destructive focus-visible:outline-2 focus-visible:outline-destructive"
          >
            {isRemoving ? (
              <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden="true" />
            ) : (
              <X className="size-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
