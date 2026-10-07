"use client";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";
import { updateProfile } from "./services/edit-profile.service";
import type { ProfileFormValues } from "./services/edit-profile.service";
import { useEffect, useRef, useState } from "react";
import { getInitials } from "@/features/profile/utils/getInitials";
import useForm from "@/shared/hooks/useForm";
import { useRouter } from "next/navigation";
import { normalizePhoneNumber } from "./components/PhoneEditSelector";
import { isValidPhoneNumber } from "libphonenumber-js";
import ProfileAvatarSelector from "./components/ProfileAvatarSelector";
import { uploadAvatar } from "./services/upload-avatar.service";
import { profileNameSchema } from "@/features/profile/validators/profile-name.validator";

import EditProfilePreview from "@/features/profile/edit-profile/components/EditProfilePreview";
import ProfileDetailsFields from "@/features/profile/edit-profile/components/ProfileDetailsFields";
import ProfileFormActions from "@/features/profile/edit-profile/components/ProfileFormActions";

export default function EditProfilePage() {
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
  if (!user) return null;
  const fullName = [values.first_name.trim(), values.last_name.trim()]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">
          Update your profile
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
          Update the information shown on your AutoCrest account.
        </p>
      </div>

      <div className="mt-8 grid items-stretch gap-6 xl:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.6fr)]">
        <EditProfilePreview
          name={fullName || user.name}
          email={user.email}
          phone={values.phone}
          avatarUrl={avatarPreview || values.avatar_url || null}
        />
        <form
          className="space-y-7 rounded-2xl border border-line bg-panel p-6 sm:p-8 [&_input]:h-12 [&_input]:rounded-xl [&_input]:px-4"
          onSubmit={formHandler}
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Personal information
            </h2>
            <p className="mt-2 text-sm text-muted">
              Update the details on your AutoCrest account.
            </p>
          </div>
          <ProfileAvatarSelector
            avatarPreview={avatarPreview}
            avatarFile={avatarFile}
            avatarUrl={values.avatar_url}
            initials={getInitials(fullName || user.name, user.email ?? "")}
            isSaving={isSaving}
            avatarError={avatarError}
            avatarInputRef={avatarInputRef}
            setAvatarFile={setAvatarFile}
            setAvatarPreview={setAvatarPreview}
            setAvatarError={setAvatarError}
          />
          <div className="border-t border-line" />
          <ProfileDetailsFields
            register={register}
            values={values}
            errors={errors}
            isSaving={isSaving}
            phoneError={phoneError}
            onPhoneChange={(value) => {
              setFieldValue("phone", value);
              setPhoneError(null);
            }}
          />
          <ProfileFormActions saveError={saveError} isSaving={isSaving} />{" "}
        </form>
      </div>
    </main>
  );
}
