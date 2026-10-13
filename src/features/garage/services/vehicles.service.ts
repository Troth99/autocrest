import type { SupabaseClient } from "@supabase/supabase-js";
import type { Vehicle } from "@/features/garage/types/vehicle";
import { addVehicleSchema } from "@/features/garage/validators/add-vehicle-validator";

export async function getVehicles(supabase: SupabaseClient): Promise<Vehicle[]> {
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
    throw new Error("You must be signed in to add a car.");
  }

  const { error } = await supabase.from("vehicles").insert({
    ...values,
    user_id: user.id,
    vehicle_type: "car",
  });

  if (error) {
    throw new Error("Could not save the car.");
  }
}
