import { z } from "zod";

const trimmedText = z.string().trim();
const optionalText = trimmedText.transform((value) => value || null);
const optionalDate = trimmedText
  .pipe(z.union([z.literal(""), z.iso.date("Enter a valid date.")]))
  .transform((value) => value || null);

function optionalNumber(
  isValid: (value: string) => boolean,
  message: string,
  numberSchema: z.ZodNumber,
) {
  return trimmedText
    .refine((value) => value === "" || isValid(value), message)
    .transform((value) => value === "" ? null : Number(value))
    .pipe(numberSchema.nullable());
}

const decimalPattern = /^\d+(\.\d{1,2})?$/;

const optionalCost = optionalNumber(
  (value) => decimalPattern.test(value),
  "Enter a price of zero or greater with up to two decimal places.",
  z.number().min(0).max(9999999999.99, "Price is too large."),
);

const optionalMileage = optionalNumber(
  (value) => /^\d+$/.test(value),
  "Enter a whole number, zero or greater.",
  z.number().int().min(0).max(2147483647, "Mileage is too large."),
);

const optionalPartQuantity = optionalNumber(
  (value) => /^[1-9]\d*$/.test(value),
  "Enter a whole number greater than zero.",
  z.number().int().min(1).max(2147483647, "Quantity is too large."),
);

const optionalFluidQuantity = optionalNumber(
  (value) => decimalPattern.test(value) && Number(value) > 0,
  "Enter a quantity greater than zero with up to two decimal places.",
  z.number().positive().max(9999999999.99, "Quantity is too large."),
);

export const addServiceSchema = z.object({
  serviceType: trimmedText.min(1, "Select a service.").pipe(z.enum([
    "oil", "brakes", "tires", "battery", "timing", "transmission", "drivetrain",
    "suspension", "air-conditioning", "cooling", "electrical", "engine", "exhaust", "bodywork", "other",
  ], { error: "Select a valid service." })),
  customServiceType: trimmedText,
  visitReason: z.enum(["", "scheduled", "repair", "diagnostics", "recall", "other"],
    { error: "Select a valid reason." }).transform((value) => value || null),
  customVisitReason: trimmedText,
  serviceDate: z.string().min(1, "Service date is required.")
    .pipe(z.iso.date("Enter a valid date.")),
  mileageKm: trimmedText.min(1, "Mileage is required.")
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
  customFluidType: trimmedText,
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
