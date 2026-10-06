export type VehicleType =
  | "car"
  | "motorcycle"
  | "van"
  | "truck"
  | "camper"
  | "other";

export type FuelType =
  | "petrol"
  | "diesel"
  | "electric"
  | "hybrid"
  | "plug_in_hybrid"
  | "lpg"
  | "cng"
  | "other";

export type Transmission = "manual" | "automatic" | "semi_automatic";
export type Drivetrain = "fwd" | "rwd" | "awd" | "4wd";
export type VehicleUse = "personal" | "business" | "mixed";
export type EuroStandard =
  | "euro_1"
  | "euro_2"
  | "euro_3"
  | "euro_4"
  | "euro_5"
  | "euro_6";

// Dates use YYYY-MM-DD; timestamps use ISO 8601 strings.
// Nullable fields represent details the owner has not supplied.
export type Vehicle = {
  id: string;
  user_id: string;
  nickname: string | null;
  vehicle_type: VehicleType;
  make: string;
  model: string;
  trim: string | null;
  plate: string | null;
  vin: string | null;
  registration_certificate_number: string | null;
  manufacture_year: number | null;
  first_registration_date: string | null;
  registration_country_code: string | null;
  purchase_date: string | null;
  purchase_price: number | null;
  purchase_currency_code: string | null;
  vehicle_use: VehicleUse | null;
  fuel_type: FuelType | null;
  transmission: Transmission | null;
  drivetrain: Drivetrain | null;
  engine_cc: number | null;
  power_hp: number | null;
  euro_standard: EuroStandard | null;
  mileage_km: number;
  mileage_recorded_at: string | null;
  description: string | null;
  is_primary: boolean;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
};
