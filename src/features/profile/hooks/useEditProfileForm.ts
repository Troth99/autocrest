"use client";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";
import { updateProfile } from "@/features/profile/edit-profile/services/edit-profile.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { normalizePhoneNumber } from "@/features/profile/utils/normalizePhoneNumber";
import { isValidPhoneNumber } from "libphonenumber-js";
import { uploadAvatar } from "@/features/profile/edit-profile/services/upload-avatar.service";
import { profileNameSchema } from "@/features/profile/validators/profile-name.validator";

export default function useEditProfileForm() {
  const router = useRouter();
  const { user } = useCurrentUser();

  const [phone, setPhone] = useState(normalizePhoneNumber(user?.phone));
  const [errors, setErrors] = useState<
    Partial<Record<"firstName" | "lastName", string>>
  >({});

  function handlePhoneChange(value: string) {
    setPhone(value);
    setPhoneError(null);
  }

  const [saveError, setSaveError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  async function updateProfileHandler(formData: FormData) {
    if (!user) return;

    const values = Object.fromEntries(formData.entries());

    const parsed = profileNameSchema.safeParse(values);
    const fieldErrors: Partial<Record<"firstName" | "lastName", string>> = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "firstName" || field === "lastName")
          fieldErrors[field] = issue.message;
      }
    }
    setErrors(fieldErrors);
    setSaveError(null);
    setPhoneError(null);
    if (!parsed.success) return;
    const { firstName, lastName } = parsed.data;
    if (phone && !isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }
    setIsSaving(true);

    try {
      const avatarUrl = avatarFile
        ? await uploadAvatar(user.id, avatarFile)
        : (user.avatarUrl ?? "");

      const result = await updateProfile(user.id, {
        fullName: [firstName, lastName].filter(Boolean).join(" "),
        username: String(values.username ?? ""),
        phone,
        city: String(values.city ?? ""),
        bio: String(values.bio ?? ""),
        avatarUrl,
      });

      if (result.error !== null) {
        throw new Error(result.error);
      }
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Unable to save your profile.",
      );
      setIsSaving(false);
      return;
    }

    router.replace("/profile");
    router.refresh();
  }

  return {
    user,
    phone,
    handlePhoneChange,
    updateProfileHandler,
    errors,
    saveError,
    phoneError,
    isSaving,
    avatarFile,
    setAvatarFile,
    avatarPreview,
    setAvatarPreview,
    avatarError,
    setAvatarError,
  };
}
