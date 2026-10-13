import type useForm from "@/shared/hooks/useForm";
import type { initialValues } from "@/features/garage/constants/add-vehicle-form";

export type AddVehicleFormValues = typeof initialValues;

export type VehicleFormErrors = Partial<Record<keyof AddVehicleFormValues | "make" | "model", string>>;

export type VehicleFormRegister = ReturnType<
  typeof useForm<AddVehicleFormValues>
>["register"];

export type VehicleFormRegisterCheckbox = ReturnType<typeof useForm<AddVehicleFormValues>>["registerCheckbox"];
