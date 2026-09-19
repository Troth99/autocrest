import { z } from "zod";
import { toErrors } from "./zod-helpers";

export const loginSchema = z.object({
  email: z.email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function validateLoginForm(values: LoginFormValues) {
  return toErrors(loginSchema.safeParse(values));
}