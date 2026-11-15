"use server";
import { changePasswordSchema } from "@/features/auth/validators/change-password.validator";
import requireUserWithMfa from "@/shared/services/auth-session.service";

function changePasswordError(
  message: string,
  field?: "currentPassword" | "newPassword",
) {
  return Object.assign(new Error(message), { field });
}

export async function changePassword(formData: FormData): Promise<void> {
  const { currentPassword, newPassword } = changePasswordSchema.parse(
    Object.fromEntries(formData),
  );

  const { supabase, user } = await requireUserWithMfa();

  if (!user.email) {
    throw changePasswordError(
      "Please sign in again before changing your password.",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
    current_password: currentPassword,
  });
  if (error) {
    if (error.code === "weak_password" || error.code === "same_password") {
      throw changePasswordError(error.message, "newPassword");
    }
    throw error;
  }
}
