export type TyreSeason = "summer" | "winter" | "all_season";
export type TyrePosition = "all" | "front" | "rear";

// Separate front/rear records support vehicles with staggered tyre sizes.
export type VehicleTyreSet = {
  id: string;
  vehicle_id: string;
  season: TyreSeason;
  position: TyrePosition;
  quantity: number;
  width_mm: number;
  aspect_ratio: number;
  rim_diameter_inches: number;
  brand: string | null;
  model: string | null;
  dot_code: string | null;
  installed_on: string | null;
  installation_mileage_km: number | null;
  removed_on: string | null;
  removal_mileage_km: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};
