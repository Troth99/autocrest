import { z } from "zod";

export const odometerScanSchema = z.object({
  mileage: z.number().nonnegative().max(2147483647).nullable(),
  unit: z.enum(["km", "mi"]).nullable(),
});

export type OdometerScanResult = z.infer<typeof odometerScanSchema>;
