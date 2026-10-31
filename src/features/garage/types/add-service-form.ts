import type { initialValues as initialAddServiceValues } from "@/features/garage/constants/add-service-form";
import type useForm from "@/shared/hooks/useForm";

export type AddServiceFormValues = typeof initialAddServiceValues;

export type VehicleServiceRegister = ReturnType<
  typeof useForm<AddServiceFormValues>
>["register"];


export type Props = {
    register: VehicleServiceRegister;
    errors: Partial<AddServiceFormValues>;
};

export type VehicleServiceSectionProps = Props & {
    values: AddServiceFormValues;
};
