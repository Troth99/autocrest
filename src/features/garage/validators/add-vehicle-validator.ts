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

const optionalPositiveInteger = optionalInteger.pipe(
  z
    .number()
    .int()
    .min(
      1,
      "Enter a whole number greater than zero, or leave this field blank.",
    )
    .nullable(),
);

function optionalCode(length: number, example: string) {
  return z
    .string()
    .trim()
    .toUpperCase()
    .refine(
      (value) => value === "" || new RegExp(`^[A-Z]{${length}}$`).test(value),
      `Enter a ${length}-letter code, such as ${example}.`,
    )
    .transform((value) => (value === "" ? null : value));
}

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

export const addVehicleSchema = z
  .object({
    make: z.string().trim().min(1, "Make is required."),
    model: z.string().trim().min(1, "Model is required."),
    nickname: optionalText,
    trim: optionalText,
    plate: optionalText,
    vin: optionalText,
    registration_certificate_number: optionalText,
    registration_country_code: optionalCode(2, "BG"),
    purchase_currency_code: optionalCode(3, "EUR"),
    description: optionalText,
    is_primary: z.boolean(),
    manufacture_year: z
      .string()
      .trim()
      .min(1, "Manufacture year is required.")
      .regex(/^\d{4}$/, "Enter a valid four-digit year.")
      .transform(Number)
      .pipe(
        z
          .number()
          .int()
          .min(1886, "Enter a year from 1886 onwards.")
          .max(
            new Date().getFullYear() + 1,
            "Manufacture year is too far in the future.",
          ),
      ),
    engine_cc: optionalPositiveInteger,
    power_hp: optionalPositiveInteger,
    purchase_price: optionalPrice,
    first_registration_date: optionalDate,
    purchase_date: optionalDate,
    // Store the date-only mileage input as an explicit UTC timestamp.
    mileage_recorded_at: optionalDate.transform((value) =>
      value === null ? null : `${value}T00:00:00.000Z`,
    ),
    vehicle_use: optionalChoice(["personal", "business", "mixed"]),
    fuel_type: z.enum(
      [
        "petrol",
        "diesel",
        "electric",
        "hybrid",
        "plug_in_hybrid",
        "lpg",
        "cng",
        "other",
      ],
      { error: "Choose a fuel type." },
    ),
    transmission: z.enum(["manual", "automatic", "semi_automatic"], {
      error: "Choose a transmission.",
    }),
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
  })
  .refine(
    (values) =>
      values.purchase_price === null || values.purchase_currency_code !== null,
    {
      message: "Choose a currency when entering a purchase price.",
      path: ["purchase_currency_code"],
    },
  );
