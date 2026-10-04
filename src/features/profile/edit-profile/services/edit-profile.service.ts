import { createClient } from "@/lib/supabase/client";

export type ProfileFormValues = {
  full_name: string;
  username: string;
  phone: string;
  city: string;
  avatar_url: string;
  bio: string;
};

export async function updateProfile(userId: string, values: ProfileFormValues) {
  const supabase = createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: values.full_name || null,
      username: values.username || null,
      phone: values.phone || null,
      city: values.city || null,
      avatar_url: values.avatar_url || null,
      bio: values.bio || null,
    })
    .eq("id", userId);

  if (error) throw error;
}
