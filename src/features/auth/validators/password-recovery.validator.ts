import { z } from "zod";
import { toErrors } from "@/features/auth/validators/zod-helpers";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must have at least 8 characters."),
  confirmPassword: z.string().min(1, "Confirm your new password."),
}).refine((values) => values.newPassword === values.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export function validateForgotPassword(values: ForgotPasswordValues) {
  return toErrors(forgotPasswordSchema.safeParse(values));
}

export function validateResetPassword(values: ResetPasswordValues) {
  return toErrors(resetPasswordSchema.safeParse(values));
}
