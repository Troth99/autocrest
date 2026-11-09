import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

// Deduplicate checks for the same client within one server render.
// Outside a server render (including browser mutations), each call runs normally.
export const getAuthenticatedUser = cache(async (supabase: SupabaseClient) => {
  return await supabase.auth.getUser();
});
