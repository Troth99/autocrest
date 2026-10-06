export type VehicleServiceType = "maintenance" | "repair" | "inspection" | "tyres" | "other";

export type VehicleServiceRecord = {
  id: string;
  vehicle_id: string;
  service_type: VehicleServiceType;
  title: string;
  performed_on: string;
  mileage_km: number | null;
  service_provider: string | null;
  description: string | null;
  next_service_on: string | null;
  next_service_mileage_km: number | null;
  created_at: string;
  updated_at: string;
};
