import ProfileNameFields from "@/features/profile/edit-profile/components/ProfileNameFields";
import type { ChangeEvent } from "react";
import { Input } from "@/shared/components/ui/input";
import PhoneEditSelector from "@/features/profile/edit-profile/components/PhoneEditSelector";
import type { ProfileFormValues } from "@/features/profile/edit-profile/services/edit-profile.service";

export type EditProfileFormValues = Omit<ProfileFormValues, "full_name"> & {
  first_name: string;
  last_name: string;
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
        className="grid gap-2 text-sm font-medium text-text-secondary"
        htmlFor="username"
      >
        Username
        <Input id="username" placeholder="username" {...register("username")} />
      </label>
      <PhoneEditSelector
        value={values.phone}
        error={phoneError}
        onChange={onPhoneChange}
      />
      <label
        className="grid gap-2 text-sm font-medium text-text-secondary"
        htmlFor="location"
      >
        Location
        <Input id="location" placeholder="City" {...register("city")} />
      </label>
      <label className="grid gap-2 text-sm font-medium text-text-secondary sm:col-span-2">
        About
        <textarea
          id="bio"
          rows={4}
          maxLength={255}
          aria-describedby="bio-character-count"
          placeholder="Tell people a little about yourself."
          className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
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
