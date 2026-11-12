import ProfileNameFields from "@/features/profile/edit-profile/components/ProfileNameFields";
import { useState } from "react";
import PhoneEditSelector from "@/features/profile/edit-profile/components/PhoneEditSelector";
import type { AppUser } from "@/shared/types/currentUser";

export type ProfileDetailsFieldsProps = {
  user: AppUser;
  phone: string;
  errors: Partial<Record<"firstName" | "lastName", string>>;
  isSaving: boolean;
  phoneError: string | null;
  onPhoneChange: (value: string) => void;
};
export default function ProfileDetailsFields({
  user,
  phone,
  errors,
  isSaving,
  phoneError,
  onPhoneChange,
}: ProfileDetailsFieldsProps) {
  const [bio, setBio] = useState(user.bio ?? "");
  return (
    <section className="grid items-start gap-5 sm:grid-cols-2">
      <ProfileNameFields
        fullName={user.fullName ?? ""}
        errors={errors}
        isSaving={isSaving}
      />{" "}
      <label className="form-field" htmlFor="username">
        Username
        <input
          data-slot="input"
          className="native-input"
          id="username"
          placeholder="username"
          name="username"
          defaultValue={user.username ?? ""}
          disabled={isSaving}
        />
      </label>
      <PhoneEditSelector
        value={phone}
        error={phoneError}
        onChange={onPhoneChange}
        disabled={isSaving}
      />
      <label className="form-field" htmlFor="location">
        Location
        <input
          data-slot="input"
          className="native-input"
          id="location"
          placeholder="City"
          name="city"
          defaultValue={user.city ?? ""}
          disabled={isSaving}
        />
      </label>
      <label className="form-field sm:col-span-2">
        About
        <textarea
          id="bio"
          rows={4}
          maxLength={255}
          aria-describedby="bio-character-count"
          placeholder="Tell people a little about yourself."
          className="profile-description-input"
          name="bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          disabled={isSaving}
        />
        <span
          id="bio-character-count"
          className="text-right text-xs font-normal text-muted"
        >
          {bio.length} / 255 characters
        </span>
      </label>
    </section>
  );
}
