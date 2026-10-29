"use client";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";
import { updateProfile } from "@/features/profile/edit-profile/services/edit-profile.service";
import type { ProfileFormValues } from "@/features/profile/edit-profile/services/edit-profile.service";
import { useEffect, useRef, useState } from "react";
import useForm from "@/shared/hooks/useForm";
import { useRouter } from "next/navigation";
import { normalizePhoneNumber } from "@/features/profile/utils/normalizePhoneNumber";
import { isValidPhoneNumber } from "libphonenumber-js";
import { uploadAvatar } from "@/features/profile/edit-profile/services/upload-avatar.service";
import { profileNameSchema } from "@/features/profile/validators/profile-name.validator";


export default function useEditProfileForm() {
  const { user } = useCurrentUser();

  const [firstName = "", ...remainingNames] = (
    user?.fullName?.trim() || ""
  ).split(/\s+/);
  const initialValues: Omit<ProfileFormValues, "full_name"> & {
    first_name: string;
    last_name: string;
  } = {
    first_name: firstName,
    last_name: remainingNames.join(" "),
    username: user?.username ?? "",
    phone: normalizePhoneNumber(user?.phone),
    city: user?.city ?? "",
    avatar_url: user?.avatarUrl ?? "",
    bio: user?.bio ?? "",
  };

  const router = useRouter();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const updateProfileHandler = async (values: typeof initialValues) => {
    if (!user) return;

    setSaveError(null);
    setPhoneError(null);
    if (values.phone && !isValidPhoneNumber(values.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }
    setIsSaving(true);
    setSaveError(null);

    try {
      const avatarUrl = avatarFile
        ? await uploadAvatar(user.id, avatarFile)
        : values.avatar_url;
      const { first_name, last_name, ...profileValues } = values;
      await updateProfile(user.id, {
        ...profileValues,
        full_name: [first_name.trim(), last_name.trim()]
          .filter(Boolean)
          .join(" "),
        avatar_url: avatarUrl,
      });

      router.push("/profile");
      router.refresh();
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Unable to save your profile.",
      );
      setIsSaving(false);
    }
  };

  const { register, formHandler, values, setFieldValue, errors } = useForm(
    updateProfileHandler,
    initialValues,
    (formValues) => {
      const result = profileNameSchema.safeParse(formValues);
      if (result.success) return {};
      const fieldErrors: Partial<typeof initialValues> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === "first_name" || field === "last_name")
          fieldErrors[field] = issue.message;
      }
      return fieldErrors;
    },
  );

  const fullName = [values.first_name.trim(), values.last_name.trim()]
    .filter(Boolean)
    .join(" ");

  return {
    user, fullName, values, register, formHandler, errors,
    saveError, phoneError, setPhoneError, isSaving,
    avatarFile, setAvatarFile, avatarPreview, setAvatarPreview,
    avatarError, setAvatarError, avatarInputRef, setFieldValue,
  };
}
