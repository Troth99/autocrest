import type { User } from "@supabase/supabase-js";

export type AppUser = User & {
  username?: string | null;
  fullName?: string | null;
  phone?: string | null;
  countryCode?: string | null;
  region?: string | null;
  city?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
};
