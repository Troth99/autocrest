import { createClient } from "@/lib/supabase/server";
import type { Vehicle } from "@/features/garage/types/vehicle";

export async function getVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();

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
