import { createClient } from "@/lib/supabase/client";


export async function getProfileData(userId: string | undefined) {
    const supabase = createClient();

    const {data, error} = await supabase.from("profiles").select("*").eq("id", userId).single();

    if(error) {
        throw new Error(error.message);
    }
    return data
}

export async function updateProfile(
  userId: string,
  values: {
    fullName: string;
    username: string;
    phone: string;
    avatarUrl: string;
    bio: string;
  },
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: values.fullName || null,
      username: values.username || null,
      phone: values.phone || null,
      avatar_url: values.avatarUrl || null,
      bio: values.bio || null,
    })
    .eq("id", userId);

  if (error) throw error;
}