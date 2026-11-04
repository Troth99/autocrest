import type { UserProfile } from "@/shared/types/currentUser";
import "server-only";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export default async function getCurrentUser(): Promise<{
  user: User | null;
  profile: UserProfile | null;
  profileError: string | null;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error: profileError } = user
    ? await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null, error: null };

  return {
    user,
    profile,
    profileError: profileError ? "Unable to load your profile" : null,
  };
}
