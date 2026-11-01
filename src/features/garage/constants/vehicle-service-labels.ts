import type { VehicleServiceType } from "@/features/garage/types/vehicle-service-record";

export const vehicleServiceLabels: Record<VehicleServiceType, string> = {
  oil: "Oil & filters",
  brakes: "Brakes",
  tires: "Tires & wheels",
  battery: "Battery",
  timing: "Engine timing belt / chain",
  transmission: "Transmission & clutch",
  drivetrain: "Drivetrain & differential",
  suspension: "Suspension & steering",
  "air-conditioning": "Air conditioning",
  cooling: "Cooling system",
  electrical: "Electrical system",
  engine: "Engine repair",
  exhaust: "Exhaust system",
  bodywork: "Bodywork & accessories",
  other: "Other service",
};

