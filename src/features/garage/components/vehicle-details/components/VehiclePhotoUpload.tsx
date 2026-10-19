"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadVehiclePhoto } from "@/features/garage/services/vehicle-photo.service";

type Props = {
  vehicleId: string;
  hasPhoto: boolean;
};

export default function VehiclePhotoUpload({ vehicleId, hasPhoto }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadInProgress = useRef(false);
  const [isUploading, setIsUploading] = useState(false);
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
        disabled={isUploading}
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) await handleUpload(file);
        }}
      />
      <button
        type="button"
        disabled={isUploading}
        className="vehicle-detail-action bg-panel"
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
    </div>
  );
}
