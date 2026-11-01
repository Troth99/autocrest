import { createClient } from "@/lib/supabase/client";
import { addServiceSchema } from "@/features/garage/validators/add-service-validator";
import type { AddServiceFormValues } from "@/features/garage/types/add-service-form";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { VehicleServiceRecord } from "@/features/garage/types/vehicle-service-record";

export async function addVehicleService(
  vehicleId: string,
  values: AddServiceFormValues,
) {
  const validatedValues = addServiceSchema.parse(values);
  const { error } = await createClient()
    .from("vehicle_services")
    .insert({ vehicleId, ...validatedValues });

  if (error) throw error;
}

export async function getVehicleReports(
  supabase: SupabaseClient,
  vehicleId: string,
): Promise<VehicleServiceRecord[]> {
  const { data, error } = await supabase
    .from("vehicle_services")
    .select("*")
    .eq("vehicleId", vehicleId)
    .order("serviceDate", { ascending: false })
    .overrideTypes<VehicleServiceRecord[]>();

  if (error) throw error;
  return data ?? [];
}
