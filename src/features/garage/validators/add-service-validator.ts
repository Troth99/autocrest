import { z } from "zod";
import type { AddServiceFormValues } from "@/features/garage/types/add-service-form";
import { getFieldErrors } from "@/shared/validators/getFieldErrors";

const optionalCost = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^\d+(\.\d{1,2})?$/.test(value),
    "Enter a price of zero or greater with up to two decimal places.",
  );
const optionalText = z.string().trim();

const optionalDate = z.union([
  z.literal(""),
  z.iso.date("Enter a valid date."),
]);

const optionalMileage = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^\d+$/.test(value),
    "Enter a whole number, zero or greater.",
  );

const optionalPartQuantity = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^[1-9]\d*$/.test(value),
    "Enter a whole number greater than zero.",
  );

const optionalFluidQuantity = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" || (/^\d+(\.\d{1,2})?$/.test(value) && Number(value) > 0),
    "Enter a quantity greater than zero with up to two decimal places.",
  );

export const addServiceSchema = z
  .object({
    serviceType: z.string().trim().min(1, "Select a service."),
    customServiceType: z.string().trim(),
    visitReason: z.string(),
    customVisitReason: z.string().trim(),
    fluidType: z.string(),
    customFluidType: z.string().trim(),
    partsCost: optionalCost,
    laborCost: optionalCost,

    provider: optionalText,
workPerformed: optionalText,

symptoms: optionalText,
partName: optionalText,
partBrand: optionalText,
partNumber: optionalText,
partQuantity: optionalPartQuantity,

fluidSpecification: optionalText,
fluidQuantity: optionalFluidQuantity,

serviceOutcome: z.enum(
    ["", "completed", "partial", "follow-up"],
    { error: "Select a valid service outcome." },
),

invoiceNumber: optionalText,
warrantyDate: optionalDate,
warrantyMileage: optionalMileage,
recommendedWork: optionalText,
notes: optionalText,

nextServiceDate: optionalDate,
nextServiceMileage: optionalMileage,

    serviceDate: z
      .string()
      .min(1, "Service date is required.")
      .pipe(z.iso.date("Enter a valid date.")),

    mileage: z
      .string()
      .trim()
      .min(1, "Mileage is required.")
      .regex(/^\d+$/, "Enter a whole number, zero or greater."),
  })
  .refine(
    (values) =>
      values.serviceType !== "other" || values.customServiceType.length > 0,
    {
      message: "Specify the service.",
      path: ["customServiceType"],
    },
  )
  .refine(
    (values) =>
      values.visitReason !== "other" || values.customVisitReason.length > 0,
    {
      message: "Specify the reason for your visit.",
      path: ["customVisitReason"],
    },
  )
  .refine(
    (values) =>
      values.fluidType !== "other" || values.customFluidType.length > 0,
    {
      message: "Specify the fluid.",
      path: ["customFluidType"],
    },
  );


  export function validateAddServiceForm(
    values: AddServiceFormValues,
): Partial<AddServiceFormValues> {
    const result = addServiceSchema.safeParse(values);

    if (result.success) {
        return {};
    }

    return getFieldErrors<keyof AddServiceFormValues>(result.error);
}