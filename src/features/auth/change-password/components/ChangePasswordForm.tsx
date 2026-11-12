"use client";
import Link from "next/link";
import { useId, useState } from "react";
import { Check } from "lucide-react";
import { PasswordField } from "@/features/auth/components/PasswordField";
import { changePassword } from "@/features/auth/services/change-password.service";
import {
  validateChangePasswordForm,
  type ChangePasswordFormValues,
} from "@/features/auth/validators/change-password.validator";
import SubmitChangePasswordButton from "./SubmitChangePasswordButton";


export default function ChangePasswordForm() {
  const inputId = useId();
  const [busy, setBusy] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof ChangePasswordFormValues, string>>
  >({});

  async function savePasswordHandler(formdata: FormData) {
    setSaveError("");
    setSuccess(false);

    const fieldErrors = validateChangePasswordForm(
      Object.fromEntries(formdata) as ChangePasswordFormValues,
    );

    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }
    setBusy(true);
    try {
      await changePassword(formdata);
      setSuccess(true);
    } catch (cause) {
      const message =
        cause instanceof Error
          ? cause.message
          : "Could not change your password. Please try again.";
      if (
        cause instanceof Error &&
        "field" in cause &&
        (cause.field === "currentPassword" || cause.field === "newPassword")
      ) {
        setErrors({ [cause.field]: message });
      } else {
        setSaveError(message);
      }
    } finally {
      setBusy(false);
    }
  }


  return success ? (
      <div className="grid gap-5">
        <p role="status" className="password-security-notice">
          <Check className="size-5 shrink-0" aria-hidden="true" />
          Your password has been changed successfully.
        </p>
        <div className="flex justify-end">
          <Link
            href="/profile"
            className="button-base button-secondary px-5 py-2.5 text-sm"
          >
            Back to profile
          </Link>
        </div>
      </div>
  ) : (
    <form
      className="grid gap-5"
      action={savePasswordHandler}
      aria-busy={busy}
      onChange={(event) => {
        setSuccess(false);
        setSaveError("");

        const target = event.target;
        if (!(target instanceof HTMLInputElement)) return;

        const field = target.name;
        if (
          field === "currentPassword" ||
          field === "newPassword" ||
          field === "confirmPassword"
        ) {
          setErrors((current) => ({ ...current, [field]: undefined }));
        }
      }}
    >
      <fieldset disabled={busy} className="grid min-w-0 gap-5">
        <PasswordField
          id={`${inputId}-current`}
          label="Current password"
          hint={null}
          placeholder="Enter your current password"
          autoComplete="current-password"
          error={errors.currentPassword}
          aria-invalid={Boolean(errors.currentPassword)}
          name="currentPassword"
        />
        <PasswordField
          id={`${inputId}-new`}
          label="New password"
          placeholder="Enter a new password"
          autoComplete="new-password"
          error={errors.newPassword}
          aria-invalid={Boolean(errors.newPassword)}
          name="newPassword"
        />
        <PasswordField
          id={`${inputId}-confirm`}
          label="Confirm new password"
          hint={null}
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          aria-invalid={Boolean(errors.confirmPassword)}
          name="confirmPassword"
        />
      </fieldset>
      {saveError && (
        <p role="alert" className="text-sm text-destructive">
          {saveError}
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/profile"
          className={`button-base button-secondary px-5 py-2.5 text-sm ${busy ? "pointer-events-none opacity-50" : ""}`}
          aria-disabled={busy}
          tabIndex={busy ? -1 : undefined}
        >
          Back to profile
        </Link>
        <SubmitChangePasswordButton />
      </div>
    </form>
  );
}
