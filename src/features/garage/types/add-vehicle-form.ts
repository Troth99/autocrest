import type { initialValues } from "@/features/garage/constants/add-vehicle-form";

export type AddVehicleFormValues = typeof initialValues;

export type VehicleFormErrors = Partial<
  Record<keyof AddVehicleFormValues | "make" | "model", string>
>;

export type VehicleFormState = {
  error: string | null;
  fieldErrors: VehicleFormErrors;
};
