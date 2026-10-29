"use client";

import { getInitials } from "@/features/profile/utils/getInitials";
import useEditProfileForm from "@/features/profile/hooks/useEditProfileForm";
import ProfileAvatarSelector from "@/features/profile/edit-profile/components/ProfileAvatarSelector";
import EditProfilePreview from "@/features/profile/edit-profile/components/EditProfilePreview";
import ProfileDetailsFields from "@/features/profile/edit-profile/components/ProfileDetailsFields";
import ProfileFormActions from "@/features/profile/edit-profile/components/ProfileFormActions";

export default function EditProfilePage() {
  const {
    user, fullName, values, register, formHandler, errors,
    saveError, phoneError, setPhoneError, isSaving,
    avatarFile, setAvatarFile, avatarPreview, setAvatarPreview,
    avatarError, setAvatarError, avatarInputRef, setFieldValue,
  } = useEditProfileForm();

  if (!user) return null;

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      <div>
        <h1 className="page-title">
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
          className="profile-edit-form"
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
