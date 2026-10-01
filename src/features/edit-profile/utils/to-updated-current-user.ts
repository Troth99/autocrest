import type { ProfileFormValues } from "../services/edit-profile.service";
import type { CurrentUser } from "@/shared/types/currentUser";

export function toUpdatedCurrentUser(
  user: CurrentUser,
  values: ProfileFormValues,
): CurrentUser {
  const fullName = values.full_name.trim() || null;
  const username = values.username.trim() || user.username;

  return {
    ...user,
    name: fullName || username || user.name,
    fullName,
    username,
    phone: values.phone.trim() || null,
    city: values.city.trim() || null,
    avatarUrl: values.avatar_url.trim() || null,
    bio: values.bio.trim() || null,
  };
}
