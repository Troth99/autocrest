export type TyreSeason = "summer" | "winter" | "all_season";
export type TyrePosition = "all" | "front" | "rear";

// Separate front/rear records support vehicles with staggered tyre sizes.
export type VehicleTyreSet = {
  id: string;
  vehicleId: string;
  season: TyreSeason;
  position: TyrePosition;
  quantity: number;
  widthMm: number;
  aspectRatio: number;
  rimDiameterInches: number;
  brand: string | null;
  model: string | null;
  dotCode: string | null;
  installedOn: string | null;
  installationMileageKm: number | null;
  removedOn: string | null;
  removalMileageKm: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};
