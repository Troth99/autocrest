import { z } from "zod";
import type { AddServiceFormValues } from "@/features/garage/types/add-service-form";
import { getFieldErrors } from "@/shared/validators/getFieldErrors";

const optionalText = z.string().trim().transform((value) => value || null);
const optionalDate = z.string().trim()
  .pipe(z.union([z.literal(""), z.iso.date("Enter a valid date.")]))
  .transform((value) => value || null);

const optionalCost = z.string().trim()
  .refine(
    (value) => value === "" || /^\d+(\.\d{1,2})?$/.test(value),
    "Enter a price of zero or greater with up to two decimal places.",
  )
  .transform((value) => value === "" ? null : Number(value))
  .pipe(z.number().min(0).max(9999999999.99, "Price is too large.").nullable());

const optionalMileage = z.string().trim()
  .refine(
    (value) => value === "" || /^\d+$/.test(value),
    "Enter a whole number, zero or greater.",
  )
  .transform((value) => value === "" ? null : Number(value))
  .pipe(z.number().int().min(0).max(2147483647, "Mileage is too large.").nullable());

const optionalPartQuantity = z.string().trim()
  .refine(
    (value) => value === "" || /^[1-9]\d*$/.test(value),
    "Enter a whole number greater than zero.",
  )
  .transform((value) => value === "" ? null : Number(value))
  .pipe(z.number().int().min(1).max(2147483647, "Quantity is too large.").nullable());

const optionalFluidQuantity = z.string().trim()
  .refine(
    (value) => value === "" || (/^\d+(\.\d{1,2})?$/.test(value) && Number(value) > 0),
    "Enter a quantity greater than zero with up to two decimal places.",
  )
  .transform((value) => value === "" ? null : Number(value))
  .pipe(z.number().positive().max(9999999999.99, "Quantity is too large.").nullable());

export const addServiceSchema = z.object({
  serviceType: z.string().trim().min(1, "Select a service.").pipe(z.enum([
    "oil", "brakes", "tires", "battery", "timing", "transmission", "drivetrain",
    "suspension", "air-conditioning", "cooling", "electrical", "engine", "exhaust", "bodywork", "other",
  ], { error: "Select a valid service." })),
  customServiceType: z.string().trim(),
  visitReason: z.enum(["", "scheduled", "repair", "diagnostics", "recall", "other"],
    { error: "Select a valid reason." }).transform((value) => value || null),
  customVisitReason: z.string().trim(),
  serviceDate: z.string().min(1, "Service date is required.")
    .pipe(z.iso.date("Enter a valid date.")),
  mileageKm: z.string().trim().min(1, "Mileage is required.")
    .regex(/^\d+$/, "Enter a whole number, zero or greater.")
    .transform(Number)
    .pipe(z.number().int().min(0).max(2147483647, "Mileage is too large.")),
  provider: optionalText,
  workPerformed: optionalText,
  partsCost: optionalCost,
  laborCost: optionalCost,
  symptoms: optionalText,
  partName: optionalText,
  partBrand: optionalText,
  partNumber: optionalText,
  partQuantity: optionalPartQuantity,
  fluidType: z.enum(["", "engine-oil", "transmission-oil", "gear-oil", "power-steering-fluid", "brake-fluid", "coolant", "other"],
    { error: "Select a valid fluid." }).transform((value) => value || null),
  customFluidType: z.string().trim(),
  fluidSpecification: optionalText,
  fluidQuantity: optionalFluidQuantity,
  serviceOutcome: z.enum(["", "completed", "partial", "follow-up"],
    { error: "Select a valid service outcome." }).transform((value) => value || null),
  invoiceNumber: optionalText,
  warrantyDate: optionalDate,
  warrantyMileageKm: optionalMileage,
  recommendedWork: optionalText,
  notes: optionalText,
  nextServiceDate: optionalDate,
  nextServiceMileageKm: optionalMileage,
})
  .refine((values) => values.serviceType !== "other" || values.customServiceType.length > 0, {
    message: "Specify the service.", path: ["customServiceType"],
  })
  .refine((values) => values.visitReason !== "other" || values.customVisitReason.length > 0, {
    message: "Specify the reason for your visit.", path: ["customVisitReason"],
  })
  .refine((values) => values.fluidType !== "other" || values.customFluidType.length > 0, {
    message: "Specify the fluid.", path: ["customFluidType"],
  })
  // Discard descriptions for hidden Other fields before inserting the validated values.
  .transform((values) => ({
    ...values,
    customServiceType: values.serviceType === "other" ? values.customServiceType : null,
    customVisitReason: values.visitReason === "other" ? values.customVisitReason : null,
    customFluidType: values.fluidType === "other" ? values.customFluidType : null,
  }));

export function validateAddServiceForm(values: AddServiceFormValues): Partial<AddServiceFormValues> {
  const result = addServiceSchema.safeParse(values);
  return result.success ? {} : getFieldErrors<keyof AddServiceFormValues>(result.error);
}
