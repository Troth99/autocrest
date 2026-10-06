import type { FuelType } from "@/features/garage/types/vehicle";

export type FuelQuantityUnit = "litres" | "kwh" | "kg";

export type VehicleFuelLog = {
  id: string;
  vehicle_id: string;
  expense_id: string | null;
  filled_on: string;
  mileage_km: number;
  fuel_type: FuelType;
  quantity: number;
  quantity_unit: FuelQuantityUnit;
  is_full_tank: boolean;
  station: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};
