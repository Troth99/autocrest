"use server";
import { revalidatePath } from "next/cache";
import { editProfileSchema } from "@/features/profile/validators/edit-profile.validator";
import requireUserWithMfa from "@/shared/services/auth-session.service";

export type ProfileFormValues = {
  fullName: string;
  username: string;
  phone: string;
  city: string;
  avatarUrl: string;
  bio: string;
};

export async function updateProfile(userId: string, values: ProfileFormValues) {
  try {

    const { supabase, user } = await requireUserWithMfa();

    if (user.id !== userId) {
      return { error: "You can only update your own profile." };
    }

    const parsed = editProfileSchema.safeParse(values);
    if (!parsed.success) {
      return {
        error: parsed.error.issues[0]?.message ?? "Invalid profile details.",
      };
    }

    values = parsed.data;

    const { data, error } = await supabase
      .from("profiles")
      .update({
        fullName: values.fullName || null,
        username: values.username || null,
        phone: values.phone || null,
        city: values.city || null,
        avatarUrl: values.avatarUrl || null,
        bio: values.bio || null,
      })
      .eq("id", user.id)
      .select("id")
      .maybeSingle();

    if (error) throw error;

    // Confirm that a profile was actually updated before reporting success.
    if (!data) {
      throw new Error(
        "Your profile could not be updated. Refresh the page and try again.",
      );
    }
    revalidatePath("/", "layout");
    return { error: null };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to save your profile.",
    };
  }
}
