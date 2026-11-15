"use client";

import { getInitials } from "@/features/profile/utils/getInitials";
import useEditProfileForm from "@/features/profile/hooks/useEditProfileForm";
import ProfileAvatarSelector from "@/features/profile/edit-profile/components/ProfileAvatarSelector";
import EditProfilePreview from "@/features/profile/edit-profile/components/EditProfilePreview";
import ProfileDetailsFields from "@/features/profile/edit-profile/components/ProfileDetailsFields";
import ProfileFormActions from "@/features/profile/edit-profile/components/ProfileFormActions";

export default function EditProfilePage() {
  
  const form = useEditProfileForm();

  if (!form.user) return null;

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      <div>
        <h1 className="page-title">Update your profile</h1>
        <p className="mt-2 section-description sm:text-base">
          Update the information shown on your AutoCrest account.
        </p>
      </div>

      <div className="mt-8 grid items-stretch gap-6 xl:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.6fr)]">
        <EditProfilePreview
          name={form.user.fullName ?? ""}
          email={form.user.email ?? null}
          phone={form.phone}
          avatarUrl={form.avatarPreview || form.user.avatarUrl || null}
        />
        <form
          className="profile-edit-form"
          action={form.updateProfileHandler}

          onReset={(event) => event.preventDefault()}
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
            avatarPreview={form.avatarPreview}
            avatarFile={form.avatarFile}
            avatarUrl={form.user.avatarUrl ?? ""}
            initials={getInitials(form.user.fullName ?? "", form.user.email ?? "")}
            isSaving={form.isSaving}
            avatarError={form.avatarError}
            setAvatarFile={form.setAvatarFile}
            setAvatarPreview={form.setAvatarPreview}
            setAvatarError={form.setAvatarError}
          />
          <div className="border-t border-line" />
          <ProfileDetailsFields
            user={form.user}
            phone={form.phone}
            errors={form.errors}
            isSaving={form.isSaving}
            phoneError={form.phoneError}
            onPhoneChange={form.handlePhoneChange}
          />
          <ProfileFormActions saveError={form.saveError} />
        </form>
      </div>
    </main>
  );
}
