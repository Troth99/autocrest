import { createClient } from "@/lib/supabase/client";
import type {
  VehicleMake,
  VehicleModel,
} from "@/features/garage/types/vehicle-catalog";
import type { VehicleType } from "@/features/garage/types/vehicle";

export async function getVehicleMakes(
  vehicleType: VehicleType,
): Promise<VehicleMake[]> {
    // Return an empty array if vehicleType is not provided
  if (!vehicleType) return [];

  const supabase = createClient();

  // Fetch vehicle makes from the database based on the provided vehicle type
  const { data, error } = await supabase
    .from("vehicle_makes")
    .select("id, name, vehicle_type")
    .eq("vehicle_type", vehicleType)
    .order("name", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export async function getVehicleModels(
  makeId: string,
): Promise<VehicleModel[]> {
  if (!makeId) return [];

  const supabase = createClient();

  const { data, error } = await supabase
    .from("vehicle_models")
    .select("id, make_id, name")
    .eq("make_id", makeId)
    .order("name", { ascending: true });

  if (error) throw error;

  return data ?? [];
}
