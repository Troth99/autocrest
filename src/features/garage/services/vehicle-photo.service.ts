import type { SupabaseClient } from "@supabase/supabase-js";
import type { VehiclePhoto } from "@/features/garage/types/vehicle-photo";

export const VEHICLE_PHOTO_BUCKET = "vehicle-photos";

export async function uploadVehiclePhoto(
  supabase: SupabaseClient,
  vehicleId: string,
  file: File,
) {
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

  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .select("id")
    .eq("id", vehicleId)
    .eq("user_id", user.id)
    .single();
  if (vehicleError || !vehicle)
    throw new Error("This vehicle is not available for photo upload.");

  const path = `${user.id}/${vehicleId}/${crypto.randomUUID()}.${extension}`;
  const storage = supabase.storage.from(VEHICLE_PHOTO_BUCKET);
  const { error: uploadError } = await storage.upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) throw new Error("Photo upload failed. Please try again.");

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
        "Could not link the photo to the car or remove the uploaded file. Please try again.",
      );
    }
    throw new Error("Could not attach the photo to the car. Please try again.");
  }
}

export async function getVehiclePhotoUrls(
  supabase: SupabaseClient,
  vehicleIds: string[],
) {
  const urls: Record<string, string> = {};
  if (vehicleIds.length === 0) return { urls, error: null };

  const { data, error } = await supabase
    .from("vehicle_photos")
    .select("vehicle_id, storage_path, is_primary, sort_order, created_at")
    .in("vehicle_id", vehicleIds)
    .order("is_primary", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .overrideTypes<
      Pick<
        VehiclePhoto,
        | "vehicle_id"
        | "storage_path"
        | "is_primary"
        | "sort_order"
        | "created_at"
      >[]
    >();
  if (error) return { urls, error: "Vehicle photos could not be loaded." };

  const primary = new Map<string, string>();
  for (const photo of data ?? []) {
    if (!primary.has(photo.vehicle_id))
      primary.set(photo.vehicle_id, photo.storage_path);
  }
  if (primary.size === 0) return { urls, error: null };

  const { data: signed, error: signedError } = await supabase.storage
    .from(VEHICLE_PHOTO_BUCKET)
    .createSignedUrls([...primary.values()], 3600);
  if (signedError)
    return { urls, error: "Vehicle photos could not be loaded." };

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
    error: (signed ?? []).some((item) => item.error)
      ? "Some vehicle photos could not be loaded."
      : null,
  };
}
