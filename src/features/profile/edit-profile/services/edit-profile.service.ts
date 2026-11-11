"use server";

import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/shared/services/auth-user.service";
import { editProfileSchema } from "@/features/profile/validators/edit-profile.validator";

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
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await getAuthenticatedUser(supabase);

    if (userError || !user) {
      return { error: "Please sign in again." };
    }

    if (user.id !== userId) {
      return { error: "You can only update your own profile." };
    }

    const { data: assurance, error: assuranceError } =
      await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

    if (assuranceError) {
      return { error: "Could not verify your session. Please try again." };
    }

    if (assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {
      return { error: "Please complete two-factor authentication first." };
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
    return { error: null };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to save your profile.",
    };
  }
}
