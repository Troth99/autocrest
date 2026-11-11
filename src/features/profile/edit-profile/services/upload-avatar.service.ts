"use server";

import requireUserWithMfa from "@/shared/services/auth-session.service";

export async function uploadAvatar(userId: string, file: File) {

  const { supabase, user } = await requireUserWithMfa();

  if (user.id !== userId) {
    throw new Error("You can only upload your own avatar.");
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
