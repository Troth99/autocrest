"use server";

import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/shared/services/auth-user.service";

export async function uploadAvatar(userId: string, file: File) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await getAuthenticatedUser(supabase);

  if (userError || !user) {
    throw new Error("Please sign in again.");
  }

  if (user.id !== userId) {
    throw new Error("You can only upload your own avatar.");
  }

  const { data: assurance, error: assuranceError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (assuranceError) {
    throw new Error("Could not verify your session. Please try again.");
  }

  if (assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {
    throw new Error("Please complete two-factor authentication first.");
  }

  if (!(file instanceof File)) {
    throw new Error("Choose a JPEG, PNG, or WebP image under 2 MB.");
  }

  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  const extension = extensions[file.type];

  if (!extension || file.size === 0 || file.size > 2 * 1024 * 1024) {
    throw new Error("Choose a JPEG, PNG, or WebP image under 2 MB.");
  }

  const path = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("avatars").upload(path, file);

  if (error) throw error;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);

  return data.publicUrl;
}
