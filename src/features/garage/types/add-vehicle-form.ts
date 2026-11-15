import type { z } from "zod";
import type { addVehicleSchema } from "@/features/garage/validators/add-vehicle-validator";

export type AddVehicleFormValues = z.input<typeof addVehicleSchema> & {
  vehicleType: string;
  makeId: string;
  modelId: string;
  customMake: string;
  customModel: string;
};

export type VehicleFormErrors = Partial<
  Record<keyof AddVehicleFormValues | "make" | "model", string>
>;

export type VehicleFormState = {
  error: string | null;
  fieldErrors: VehicleFormErrors;
};
