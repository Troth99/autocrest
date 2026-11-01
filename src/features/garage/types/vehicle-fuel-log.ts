import type { FuelType } from "@/features/garage/types/vehicle";

export type FuelQuantityUnit = "litres" | "kwh" | "kg";

export type VehicleFuelLog = {
  id: string;
  vehicleId: string;
  expenseId: string | null;
  filledOn: string;
  mileageKm: number;
  fuelType: FuelType;
  quantity: number;
  quantityUnit: FuelQuantityUnit;
  isFullTank: boolean;
  station: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};
