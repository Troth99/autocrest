import { Input } from "@/shared/components/ui/input";
import type { ProfileDetailsFieldsProps } from "@/features/profile/edit-profile/components/ProfileDetailsFields";

type Props = Pick<ProfileDetailsFieldsProps, "register" | "errors" | "isSaving">;
export default function ProfileNameFields({ register, errors, isSaving }: Props) {
  return (<>
            <label
              className="grid gap-2 text-sm font-medium text-text-secondary"
              htmlFor="first-name"
            >
              First name
              <Input
                id="first-name"
                aria-invalid={Boolean(errors.first_name)}
                aria-describedby={
                  errors.first_name ? "first-name-error" : undefined
                }
                autoComplete="given-name"
                placeholder="Your first name"
                disabled={isSaving}
                {...register("first_name")}
              />
              {errors.first_name && (
                <span
                  id="first-name-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.first_name}
                </span>
              )}
            </label>
            <label
              className="grid gap-2 text-sm font-medium text-text-secondary"
              htmlFor="last-name"
            >
              Last name
              <Input
                id="last-name"
                aria-invalid={Boolean(errors.last_name)}
                aria-describedby={
                  errors.last_name ? "last-name-error" : undefined
                }
                autoComplete="family-name"
                placeholder="Your last name"
                disabled={isSaving}
                {...register("last_name")}
              />
              {errors.last_name && (
                <span
                  id="last-name-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.last_name}
                </span>
              )}
            </label>

</>);
}

