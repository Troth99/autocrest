import { z } from "zod";

// Only information visible on the document.
// Missing or unreadable values must be null.
export const vehicleDocumentSchema = z.object({
  // D.1: make; D.3: commercial description used to match the catalog model.
  make: z.string().trim().min(1).max(100).nullable(),
  model: z.string().trim().min(1).max(100).nullable(),
  // D.2: technical type/variant/version, not necessarily a marketing trim.
  type_variant_version: z.string().trim().min(1).max(200).nullable(),
  // E: retain the visible identifier; older vehicles may not have 17 characters.
  vin: z.string().trim().min(1).max(30).nullable(),
  // A: registration plate, not the certificate's document number.
  registration_plate: z.string().trim().min(1).max(30).nullable(),
  registration_certificate_number: z.string().trim().min(1).max(50).nullable(),

  // B: first registration date in YYYY-MM-DD, not manufacture year.
  first_registration_date: z.iso.date().nullable(),

  // P.1: engine capacity in cubic centimetres.
  engine_cc: z.number().int().nonnegative().nullable(),

  // P.2: maximum net power in kW. Convert separately for the form's hp field.
  power_kw: z.number().nonnegative().nullable(),

  // P.3: normalize only explicitly stated fuel/energy information.
  fuel_type: z
    .enum([
      "petrol",
      "diesel",
      "electric",
      "hybrid",
      "plug_in_hybrid",
      "lpg",
      "cng",
      "other",
    ])
    .nullable(),

  // R: colour as written on the document.
  colour: z.string().trim().min(1).max(100).nullable(),
  // S.1: number of seats, including the driver.
  seats: z.number().int().positive().nullable(),
  // J: document category (e.g. M1), not the app's vehicle_type enum.
  vehicle_category: z.string().trim().min(1).max(20).nullable(),
  // V.9: preserve the text/code; do not guess an app Euro-standard value.
  environmental_class: z.string().trim().min(1).max(200).nullable(),
});

export type VehicleDocumentDetails = z.infer<typeof vehicleDocumentSchema>;
