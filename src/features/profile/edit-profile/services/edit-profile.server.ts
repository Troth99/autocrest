import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/shared/types/auth";

export async function getProfileData(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) redirect("/login");

  const { data, error } = await supabase
    .from("profiles")
    .select("id, fullName, username, phone, city, avatarUrl, bio")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw new Error("Unable to load your profile.");

  return data;
}
