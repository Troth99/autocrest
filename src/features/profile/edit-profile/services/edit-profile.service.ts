import { createClient } from "@/lib/supabase/client";

export type ProfileFormValues = {
  fullName: string;
  username: string;
  phone: string;
  city: string;
  avatarUrl: string;
  bio: string;
};

export async function updateProfile(userId: string, values: ProfileFormValues) {

  const supabase = createClient();

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
    .eq("id", userId)
    .select("id")
    .maybeSingle();

    if (error) throw error;

  // Confirm that a profile was actually updated before reporting success.
  if (!data) {
    throw new Error(
      "Your profile could not be updated. Refresh the page and try again.",
    );
  }
}
