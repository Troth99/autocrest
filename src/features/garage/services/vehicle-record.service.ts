import { createClient } from "@/lib/supabase/client";
import { addServiceSchema } from "@/features/garage/validators/add-service-validator";
import type { AddServiceFormValues } from "@/features/garage/types/add-service-form";

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
