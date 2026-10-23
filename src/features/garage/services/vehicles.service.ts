import type { SupabaseClient } from "@supabase/supabase-js";
import type { Vehicle } from "@/features/garage/types/vehicle";
import { addVehicleSchema } from "@/features/garage/validators/add-vehicle-validator";
import { createUpdateMileageSchema } from "@/features/garage/validators/update-mileage-validator";

export async function getVehicles(
  supabase: SupabaseClient,
): Promise<Vehicle[]> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    throw new Error("You must be signed in to view your garage.");
  }

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("user_id", user.id)
    .is("archived_at", null)
    .order("is_primary", { ascending: false })
    .order("created_at", { ascending: false })
    .overrideTypes<Vehicle[]>();

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function addVehicle(supabase: SupabaseClient, input: unknown) {
  // Validate the input using the Zod schema
  const values = addVehicleSchema.parse(input);

  // Use the authenticated user from the supplied client, never an input user ID.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be signed in to add a vehicle.");
  }

  const { data, error } = await supabase
    .from("vehicles")
    .insert({
      ...values,
      user_id: user.id,
      vehicle_type: "car",
    })
    .select("id")
    .single();

  if (error) {
    console.error(
      "Vehicle insert failed",
      JSON.stringify({
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      }),
    );

    if (error.code === "23505") {
      if (error.message.includes("vehicles_one_primary_per_user_idx")) {
        throw new Error(
          "A primary vehicle is already set. Uncheck 'Set as my primary vehicle' to add another vehicle.",
        );
      }
      throw new Error("A vehicle with these unique details already exists.");
    }
    if (error.code === "23514") {
      throw new Error(
        "The vehicle details do not meet a database rule. Check the browser console for the rule name.",
      );
    }
    if (error.code === "42501") {
      throw new Error(
        "Your account is not allowed to save this vehicle. Check the vehicles access policies.",
      );
    }
    throw new Error(
      `Could not save the vehicle (${error.code || "database error"}). Please try again.`,
    );
  }
  if (!data) {
    throw new Error("Could not save the vehicle.");
  }
  return data.id as string;
}

export async function getVehicleById(
  supabase: SupabaseClient,
  vehicleId: string,
): Promise<Vehicle | null> {
  // Use the authenticated user from the supplied client, never an input user ID.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Check for authentication errors and ensure the user is signed in
  if (authError) {
    throw authError;
  }

  // Ensure the user is signed in before fetching vehicle details
  if (!user) {
    throw new Error("You must be signed in to view vehicle details.");
  }

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .eq("user_id", user.id)
    .is("archived_at", null)
    .maybeSingle<Vehicle>();

  if (error) {
    console.error(
      "Vehicle fetch failed",
      JSON.stringify({
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      }),
    );
    throw error;
  }

  return data ?? null;
}

export async function updateVehicle(
  supabase: SupabaseClient,
  vehicleId: string,
  input: unknown,
) {
  const values = addVehicleSchema.parse(input);

  //getting the user if its logged in
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    throw new Error("You must be signe in to edit a vehicle. ");
  }

  const { data, error } = await supabase
    .from("vehicles")
    // Mileage is owned by the mileage dialog; do not overwrite it from a stale edit form.
    .update({
      ...values,
      mileage_km: undefined,
      mileage_recorded_at: undefined,
    })
    .eq("id", vehicleId)
    .eq("user_id", user.id)
    .is("archived_at", null)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Vehicle not found or changes were not allowed.");
  }

  return data.id;
}

export async function updateVehicleMileage(
  supabase: SupabaseClient,
  vehicleId: string,
  input: unknown,
) {
  const vehicle = await getVehicleById(supabase, vehicleId);

  if (!vehicle) {
    throw new Error("Vehicle not found.");
  }

  const values = createUpdateMileageSchema(
    vehicle.mileage_km,
    vehicle.mileage_recorded_at,
  ).parse(input);

  const recordedAt = `${values.mileage_recorded_at}T00:00:00.000Z`;

  if (
    values.mileage_km === vehicle.mileage_km &&
    values.mileage_recorded_at === vehicle.mileage_recorded_at?.slice(0, 10)
  ) {
    throw new Error("There were no changes to save.");
  }

  const { data, error } = await supabase
    .from("vehicles")
    .update({
      mileage_km: values.mileage_km,
      mileage_recorded_at: recordedAt,
      ...(values.mode !== "reading"
        ? {
            mileage_adjustment: {
              kind: values.mode,
              reason: values.reason,
              previous_mileage_km: vehicle.mileage_km,
              previous_recorded_at: vehicle.mileage_recorded_at,
              mileage_km: values.mileage_km,
              recorded_at: recordedAt,
              adjusted_at: new Date().toISOString(),
            },
          }
        : {}),
    })
    .eq("id", vehicleId)
    .eq("user_id", vehicle.user_id)
    .eq("mileage_km", vehicle.mileage_km)
    .eq("updated_at", vehicle.updated_at)
    .is("archived_at", null)
    .select("id")
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error(
      "Mileage could not be updated. Refresh the page and try again.",
    );
  }

  return data.id;
}

export async function setPrimaryVehicle(
  supabase: SupabaseClient,
  vehicleId: string,
): Promise<void> {
  const { error } = await supabase.rpc("set_primary_vehicle", {
    p_vehicle_id: vehicleId,
  });

  if (error) {
    throw error;
  }
}

export async function deleteVehicle(
  supabase: SupabaseClient,
  vehicleId: string,
): Promise<void> {
  // Verify ownership before deleting any files.
  const vehicle = await getVehicleById(supabase, vehicleId);

  if (!vehicle) {
    throw new Error("Vehicle not found.");
  }

  const { data: photos, error: photosError } = await supabase
    .from("vehicle_photos")
    .select("storage_path")
    .eq("vehicle_id", vehicleId);

  if (photosError) throw photosError;

  const paths = (photos ?? []).map((photo) => photo.storage_path);

  if (paths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("vehicle-photos")
      .remove(paths);

    if (storageError) {
      throw new Error("Could not remove the vehicle photos. Please try again.");
    }
  }

  // Related photo records are removed by ON DELETE CASCADE.
  const { data: deleted, error: deleteError } = await supabase
    .from("vehicles")
    .delete()
    .eq("id", vehicleId)
    .eq("user_id", vehicle.user_id)
    .select("id")
    .maybeSingle();

  if (deleteError || !deleted) {
    throw new Error(
      paths.length > 0
        ? "Photos were removed, but the vehicle could not be deleted. Please try again."
        : "Could not delete the vehicle. Please try again.",
    );
  }
}
