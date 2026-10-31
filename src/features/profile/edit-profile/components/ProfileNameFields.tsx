
import type { ProfileDetailsFieldsProps } from "@/features/profile/edit-profile/components/ProfileDetailsFields";

type Props = Pick<ProfileDetailsFieldsProps, "register" | "errors" | "isSaving">;
export default function ProfileNameFields({ register, errors, isSaving }: Props) {
  return (<>
            <label
              className="form-field"
              htmlFor="first-name"
            >
              First name
              <input data-slot="input" className="native-input"
                id="first-name"
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={
                  errors.firstName ? "first-name-error" : undefined
                }
                autoComplete="given-name"
                placeholder="Your first name"
                disabled={isSaving}
                {...register("firstName")}
              />
              {errors.firstName && (
                <span
                  id="first-name-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.firstName}
                </span>
              )}
            </label>
            <label
              className="form-field"
              htmlFor="last-name"
            >
              Last name
              <input data-slot="input" className="native-input"
                id="last-name"
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={
                  errors.lastName ? "last-name-error" : undefined
                }
                autoComplete="family-name"
                placeholder="Your last name"
                disabled={isSaving}
                {...register("lastName")}
              />
              {errors.lastName && (
                <span
                  id="last-name-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.lastName}
                </span>
              )}
            </label>

</>);
}

