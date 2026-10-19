import type useForm from "@/shared/hooks/useForm";
import type { Vehicle } from "@/features/garage/types/vehicle";

export type EditVehicleFormValues = {
  [Key in keyof Vehicle]: Key extends "is_primary" ? boolean : string;
};

export type EditVehicleFormRegister = ReturnType<typeof useForm<EditVehicleFormValues>>["register"];
export type EditVehicleFormRegisterCheckbox = ReturnType<typeof useForm<EditVehicleFormValues>>["registerCheckbox"];
