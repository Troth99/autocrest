import type { ZodError } from "zod";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import { getFieldErrors } from "@/shared/validators/getFieldErrors";

// Keep the first validation message for each vehicle field.
export function getVehicleFieldErrors(error: ZodError): VehicleFormErrors {
  return getFieldErrors<keyof VehicleFormErrors>(error);
}
