import type { output } from "zod";
import type { addServiceSchema } from "@/features/garage/validators/add-service-validator";

export type VehicleServiceType = output<typeof addServiceSchema>["serviceType"];

export type VehicleServiceRecord = output<typeof addServiceSchema> & {
  id: string;
  vehicleId: string;
  currencyCode: string;
  createdAt: string;
};
