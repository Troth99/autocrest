import type { User } from "@supabase/supabase-js";
import type { CurrentUser } from "@/shared/types/currentUser";

export type UserProfile = {
  username: string | null;
  full_name: string | null;
  phone: string | null;
  country_code: string | null;
  region: string | null;
  city: string | null;
  avatar_url: string | null;
  bio: string | null;
};

export function toCurrentUser(
  user: User | null,
  profile: UserProfile | null = null,
): CurrentUser | null {
  if (!user) return null;

  const metadata = user.user_metadata ?? {};
  const fullName =
    profile?.full_name?.trim() ||
    metadata.full_name ||
    metadata.name ||
    null;
  const username =
    profile?.username?.trim() ||
    metadata.username ||
    user.email?.split("@")[0] ||
    "user";
  const avatarUrl =
    profile?.avatar_url?.trim() ||
    metadata.avatar_url ||
    metadata.picture ||
    null;

  return {
    id: user.id,
    email: user.email ?? null,
    name: fullName ?? username,
    fullName,
    username,
    avatarUrl,
    phone: profile?.phone || null,
    countryCode: profile?.country_code || null,
    region: profile?.region || null,
    city: profile?.city || null,
    bio: profile?.bio || null,
    provider: user.app_metadata?.provider ?? null,
    emailConfirmed: Boolean(user.email_confirmed_at),
    createdAt: user.created_at,
    lastSignInAt: user.last_sign_in_at ?? null,
  };
}
