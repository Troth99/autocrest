import type { ChangeEventHandler } from "react";
import type { initialValues } from "@/features/garage/constants/add-vehicle-form";

export type AddVehicleFormValues = typeof initialValues;

export type VehicleFormErrors = Partial<
  Record<keyof AddVehicleFormValues | "make" | "model", string>
>;

// Shared fields support controlled Edit inputs and native Add form inputs.
export type VehicleFormRegister = (field: keyof AddVehicleFormValues) => {
  name: string;
  value?: string;
  onChange?: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
};

export type VehicleFormRegisterCheckbox = (field: "isPrimary") => {
  name: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
