import type useForm from "@/shared/hooks/useForm";
import type { AddVehicleFormValues } from "@/features/garage/types/add-vehicle-form";
import type { Vehicle } from "@/features/garage/types/vehicle";

export type EditVehicleFormValues = AddVehicleFormValues & {
  [Key in keyof Vehicle]: Key extends "isPrimary" ? boolean : string;
};

export type EditVehicleFormRegister = ReturnType<
  typeof useForm<EditVehicleFormValues>
>["register"];
export type EditVehicleFormRegisterCheckbox = ReturnType<
  typeof useForm<EditVehicleFormValues>
>["registerCheckbox"];
