import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value === "" ? null : value));

const optionalInteger = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^\d+$/.test(value),
    "Enter a whole positive number or zero.",
  )
  .transform((value) => (value === "" ? null : Number(value)))
  .pipe(z.number().int().min(0).max(2147483647).nullable());

const optionalPrice = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^\d+(\.\d{1,2})?$/.test(value),
    "Enter a positive price with up to two decimal places.",
  )
  .transform((value) => (value === "" ? null : Number(value)))
  .pipe(z.number().min(0).nullable());

// Date inputs submit YYYY-MM-DD. Empty dates are stored as null.
const optionalDate = z
  .string()
  .trim()
  .pipe(z.union([z.literal(""), z.iso.date()]))
  .transform((value) => (value === "" ? null : value));

// Only allow the values offered by the form's dropdowns.
function optionalChoice<const T extends readonly [string, ...string[]]>(
  choices: T,
) {
  return z
    .union([z.literal(""), z.enum(choices)])
    .transform((value) => (value === "" ? null : value));
}

export const addVehicleSchema = z.object({
  make: z.string().trim().min(1, "Make is required."),
  model: z.string().trim().min(1, "Model is required."),
  nickname: optionalText,
  trim: optionalText,
  plate: optionalText,
  vin: optionalText,
  registration_certificate_number: optionalText,
  registration_country_code: optionalText,
  purchase_currency_code: optionalText,
  description: optionalText,
  is_primary: z.boolean(),
  manufacture_year: optionalInteger.pipe(
    z
      .number()
      .min(1886)
      .max(new Date().getFullYear() + 1)
      .nullable(),
  ),
  engine_cc: optionalInteger,
  power_hp: optionalInteger,
  purchase_price: optionalPrice,
  first_registration_date: optionalDate,
  purchase_date: optionalDate,
  // Store the date-only mileage input as an explicit UTC timestamp.
  mileage_recorded_at: optionalDate.transform((value) =>
    value === null ? null : `${value}T00:00:00.000Z`,
  ),
  vehicle_use: optionalChoice(["personal", "business", "mixed"]),
  fuel_type: optionalChoice([
    "petrol",
    "diesel",
    "electric",
    "hybrid",
    "plug_in_hybrid",
    "lpg",
    "cng",
    "other",
  ]),
  transmission: optionalChoice(["manual", "automatic", "semi_automatic"]),
  drivetrain: optionalChoice(["fwd", "rwd", "awd", "4wd"]),
  euro_standard: optionalChoice([
    "euro_1",
    "euro_2",
    "euro_3",
    "euro_4",
    "euro_5",
    "euro_6",
  ]),
  mileage_km: z
    .string()
    .trim()
    .min(1, "Mileage is required.")
    .regex(/^\d+$/, "Mileage must be a whole positive number or zero.")
    .transform(Number)
    .pipe(z.number().int().min(0).max(2147483647, "Mileage is too large.")),
});
