import type { User } from "@supabase/supabase-js";
import type { CurrentUser } from "@/shared/types/currentUser";

export function toCurrentUser(user: User | null): CurrentUser | null {
  if (!user) return null;

  const metadata = user.user_metadata ?? {};

  return {
    id: user.id,
    email: user.email ?? null,
    name:
      metadata.full_name ??
      metadata.name ??
      metadata.username ??
      user.email?.split("@")[0] ??
      "Account",
    username: metadata.username ?? user.email?.split("@")[0] ?? "user",
    avatarUrl: metadata.avatar_url ?? null,
    emailConfirmed: Boolean(user.email_confirmed_at),
    createdAt: user.created_at
  };
}