import type { VehicleServiceRecord, VehicleServiceType } from "@/features/garage/types/vehicle-service-record";

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

export const fluidTypeLabels: Record<NonNullable<VehicleServiceRecord["fluidType"]>, string> = {
  "engine-oil": "Engine oil",
  "transmission-oil": "Transmission oil",
  "gear-oil": "Gear / differential oil",
  "power-steering-fluid": "Power steering fluid",
  "brake-fluid": "Brake fluid",
  coolant: "Coolant",
  other: "Other",
};

export const serviceOutcomeLabels: Record<NonNullable<VehicleServiceRecord["serviceOutcome"]>, string> = {
  completed: "Completed — no further work needed",
  partial: "Partially resolved",
  "follow-up": "Follow-up visit needed",
};

