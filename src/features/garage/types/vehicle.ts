export type VehicleType =
  | "car"
  | "motorcycle"
  | "atv"
  | "van"
  | "truck"
  | "camper"
  | "trailer"
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
  userId: string;
  nickname: string | null;
  vehicleType: VehicleType;
  make: string;
  model: string;
  trim: string | null;
  plate: string | null;
  vin: string | null;
  registrationCertificateNumber: string | null;
  manufactureYear: number | null;
  firstRegistrationDate: string | null;
  registrationCountryCode: string | null;
  purchaseDate: string | null;
  purchasePrice: number | null;
  purchaseCurrencyCode: string | null;
  vehicleUse: VehicleUse | null;
  fuelType: FuelType | null;
  transmission: Transmission | null;
  drivetrain: Drivetrain | null;
  engineCc: number | null;
  powerHp: number | null;
  euroStandard: EuroStandard | null;
  colour: string | null;
  seats: number | null;
  mileageKm: number;
  mileageAdjustment?: {
    kind: "correction" | "replacement";
    reason: string;
    previousMileageKm: number;
    previousRecordedAt: string | null;
    mileageKm: number;
    recordedAt: string;
    adjustedAt: string;
  } | null;
  mileageRecordedAt: string | null;
  description: string | null;
  isPrimary: boolean;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
