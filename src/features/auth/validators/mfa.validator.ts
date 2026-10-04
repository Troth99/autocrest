import { z } from "zod";

export const mfaCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "Enter the six-digit code from your authenticator app.");
