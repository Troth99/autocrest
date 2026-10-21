import { z } from "zod";

export const updateMileageSchema = z.object({
  mileage_km: z
    .string()
    .trim()
    .min(1, "Enter the new mileage.")
    .regex(/^\d+$/, "Mileage must be a whole positive number or zero.")
    .transform(Number)
    .pipe(z.number().int().min(0).max(2147483647, "Mileage is too large.")),
  mileage_recorded_at: z.iso.date({
    error: "Choose a valid recorded date.",
  }),
});
