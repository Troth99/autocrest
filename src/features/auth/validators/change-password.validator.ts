import { z } from "zod";
import { toErrors } from "@/features/auth/validators/zod-helpers";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(8, "Password must have at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((values) => values.newPassword !== values.currentPassword, {
    message: "New password must be different from your current password.",
    path: ["newPassword"],
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export function validateChangePasswordForm(values: ChangePasswordFormValues) {
  return toErrors(changePasswordSchema.safeParse(values));
}
