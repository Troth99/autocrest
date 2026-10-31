import ProfileNameFields from "@/features/profile/edit-profile/components/ProfileNameFields";
import type { ChangeEvent } from "react";
import PhoneEditSelector from "@/features/profile/edit-profile/components/PhoneEditSelector";
import type { ProfileFormValues } from "@/features/profile/edit-profile/services/edit-profile.service";

export type EditProfileFormValues = Omit<ProfileFormValues, "fullName"> & {
  firstName: string;
  lastName: string;
};
export type ProfileDetailsFieldsProps = {
  register: (field: keyof EditProfileFormValues) => {
    name: string;
    value: string;
    onChange: (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => void;
  };
  values: EditProfileFormValues;
  errors: Partial<EditProfileFormValues>;
  isSaving: boolean;
  phoneError: string | null;
  onPhoneChange: (value: string) => void;
};
export default function ProfileDetailsFields({
  register,
  values,
  errors,
  isSaving,
  phoneError,
  onPhoneChange,
}: ProfileDetailsFieldsProps) {
  return (
    <section className="grid items-start gap-5 sm:grid-cols-2">
      <ProfileNameFields
        register={register}
        errors={errors}
        isSaving={isSaving}
      />{" "}
      <label
        className="form-field"
        htmlFor="username"
      >
        Username
        <input data-slot="input" className="native-input" id="username" placeholder="username" {...register("username")} />
      </label>
      <PhoneEditSelector
        value={values.phone}
        error={phoneError}
        onChange={onPhoneChange}
      />
      <label
        className="form-field"
        htmlFor="location"
      >
        Location
        <input data-slot="input" className="native-input" id="location" placeholder="City" {...register("city")} />
      </label>
      <label className="grid gap-2 text-sm font-medium text-text-secondary sm:col-span-2">
        About
        <textarea
          id="bio"
          rows={4}
          maxLength={255}
          aria-describedby="bio-character-count"
          placeholder="Tell people a little about yourself."
          className="profile-description-input"
          {...register("bio")}
        />
        <span
          id="bio-character-count"
          className="text-right text-xs font-normal text-muted"
        >
          {values.bio.length} / 255 characters
        </span>
      </label>
    </section>
  );
}
