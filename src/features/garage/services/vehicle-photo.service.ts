import type { SupabaseClient } from "@supabase/supabase-js";
import type { VehiclePhoto } from "@/features/garage/types/vehicle-photo";

export const VEHICLE_PHOTO_BUCKET = "vehicle-photos";

export async function uploadVehiclePhoto(
  supabase: SupabaseClient,
  vehicleId: string,
  file: File,
) {
  // Accept supported image formats up to 2 MB before starting an upload.
  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  const extension = extensions[file.type];
  if (!extension || file.size === 0 || file.size > 2 * 1024 * 1024) {
    throw new Error("Choose a JPG, PNG or WebP image under 2 MB.");
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Sign in again to upload the photo.");

  // Check that the signed-in user owns the target vehicle.
  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .select("id")
    .eq("id", vehicleId)
    .eq("user_id", user.id)
    .single();
  if (vehicleError || !vehicle)
    throw new Error("This vehicle is not available for photo upload.");

  // Use a unique file path so uploads do not overwrite existing photos.
  const path = `${user.id}/${vehicleId}/${crypto.randomUUID()}.${extension}`;
  const storage = supabase.storage.from(VEHICLE_PHOTO_BUCKET);
  const { error: uploadError } = await storage.upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) throw new Error("Photo upload failed. Please try again.");

  // Link the stored file to its vehicle using a bucket-relative path.
  const { error: metadataError } = await supabase
    .from("vehicle_photos")
    .insert({
      vehicle_id: vehicleId,
      storage_path: path,
      is_primary: true,
      sort_order: 0,
    });
  if (metadataError) {
    // Remove only the file created by this attempt if its database link failed.
    const { error: cleanupError } = await storage.remove([path]);
    if (cleanupError) {
      throw new Error(
        "Could not link the photo to the vehicle or remove the uploaded file. Please try again.",
      );
    }
    throw new Error(
      "Could not attach the photo to the vehicle. Please try again.",
    );
  }
}

export async function getVehiclePhotoUrls(
  supabase: SupabaseClient,
  vehicleIds: string[],
) {
  const urls: Record<string, string> = {};
  // Store the selected photo's identity separately from its temporary URL.
  const selectedPhotos: Record<
    string,
    Pick<VehiclePhoto, "id" | "storage_path">
  > = {};
  if (vehicleIds.length === 0) return { urls, selectedPhotos, error: null };

  // Include the record ID so the displayed photo can later be targeted for removal.
  // Prefer primary photos, then sort order, then the newest upload.
  const { data, error } = await supabase
    .from("vehicle_photos")
    .select("id, vehicle_id, storage_path, is_primary, sort_order, created_at")
    .in("vehicle_id", vehicleIds)
    .order("is_primary", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .overrideTypes<
      Pick<
        VehiclePhoto,
        | "id"
        | "vehicle_id"
        | "storage_path"
        | "is_primary"
        | "sort_order"
        | "created_at"
      >[]
    >();
  if (error) return { urls, selectedPhotos, error: "Vehicle photos could not be loaded." };

  // Keep the first photo for each vehicle according to the query ordering.
  const primary = new Map<string, string>();

  for (const photo of data ?? []) {
    if (!primary.has(photo.vehicle_id)) {
      primary.set(photo.vehicle_id, photo.storage_path);

      selectedPhotos[photo.vehicle_id] = {
        id: photo.id,
        storage_path: photo.storage_path,
      };
    }
  }
  if (primary.size === 0) return { urls, selectedPhotos, error: null };

  // Private files need temporary signed URLs; these expire after one hour.
  const { data: signed, error: signedError } = await supabase.storage
    .from(VEHICLE_PHOTO_BUCKET)
    .createSignedUrls([...primary.values()], 3600);
  if (signedError)
    return {
      urls,
      selectedPhotos,
      error: "Vehicle photos could not be loaded.",
    };

  // Match each signed URL back to the vehicle whose photo uses that path.
  const byPath = new Map(
    (signed ?? [])
      .filter((item) => item.signedUrl)
      .map((item) => [item.path, item.signedUrl]),
  );
  for (const [vehicleId, path] of primary) {
    const url = byPath.get(path);
    if (url) urls[vehicleId] = url;
  }
  return {
    urls,
    selectedPhotos,
    error: (signed ?? []).some((item) => item.error)
      ? "Some vehicle photos could not be loaded."
      : null,
  };
}

export async function removeVehiclePhoto(
  supabase: SupabaseClient,
  vehicleId: string,
  photoId: string,
) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Sign in again to remove the photo.");
  }

  // Verify ownership before removing any file.
  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .select("id")
    .eq("id", vehicleId)
    .eq("user_id", user.id)
    .single();

  if (vehicleError || !vehicle) {
    throw new Error("This vehicle is not available.");
  }

  // Read the actual storage path from the selected database record.
  const { data: photo, error: photoError } = await supabase
    .from("vehicle_photos")
    .select("id, storage_path")
    .eq("id", photoId)
    .eq("vehicle_id", vehicleId)
    .single();

  if (photoError || !photo) {
    throw new Error("The photo could not be found.");
  }

  const { error: storageError } = await supabase.storage
    .from(VEHICLE_PHOTO_BUCKET)
    .remove([photo.storage_path]);

  if (storageError) {
    throw new Error("Could not remove the photo file.");
  }

  const { data: deleted, error: deleteError } = await supabase
    .from("vehicle_photos")
    .delete()
    .eq("id", photoId)
    .eq("vehicle_id", vehicleId)
    .select("id")
    .maybeSingle();

  if (deleteError || !deleted) {
    throw new Error(
      "The file was removed, but its database record could not be deleted.",
    );
  }
}
