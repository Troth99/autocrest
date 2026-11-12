import type { initialValues as initialAddServiceValues } from "@/features/garage/constants/add-service-form";

export type AddServiceFormValues = typeof initialAddServiceValues;

export type Props = {
  errors: Partial<AddServiceFormValues>;
};

export type AddServiceFormState = {
  error: string | null;
  fieldErrors: Partial<Record<keyof AddServiceFormValues, string>>;
};
