import type { AppUser } from "@/shared/types/currentUser";
import "server-only";
import { createClient } from "@/lib/supabase/server";

export default async function getCurrentUser(): Promise<{
  user: AppUser | null;
  profileError: string | null;
}> {
  const supabase = await createClient();

  // Get the authenticated account, or null when nobody is signed in.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Load the signed-in user's data from the profiles table.
  // maybeSingle allows a missing profile row without reporting a query error.
  const { data: profile, error: profileError } = user
    ? await supabase
        .from("profiles")
        .select("username, fullName, phone, city, avatarUrl, bio")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null, error: null };

  return {
    // Merge Auth and profile data; profile fields override matching Auth fields.
    user: user ? { ...user, ...profile } : null,
    // Let consumers handle profile errors while keeping the Auth user available.
    profileError: profileError ? "Unable to load your profile" : null,
  };
}
