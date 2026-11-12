"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { PasswordField } from "@/features/auth/components/PasswordField";
import { resetPassword } from "@/features/auth/services/password-recovery.service";
import { validateResetPassword } from "@/features/auth/validators/password-recovery.validator";
import type { ResetPasswordValues } from "@/features/auth/validators/password-recovery.validator";
import { logoutUser } from "@/features/auth/services/auth.service";

export default function ResetPasswordForm() {
  const inputId = useId();
  const router = useRouter();
  const [signOutError, setSignOutError] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errors, setErrors] = useState<Partial<ResetPasswordValues>>({});
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function finishRecovery() {
    setIsSigningOut(true);
    setSignOutError("");
    try {
      await logoutUser();
      router.replace("/login?password_reset=success");
      router.refresh();
    } catch {
      // The password is already saved; retry only signing out, not the update.
      setSignOutError(
        "Your password has been reset, but we could not sign you out. Please try again.",
      );
      setIsSigningOut(false);
    }
  }

  async function resetPasswordHandler(formData: FormData) {
    const values = {
      newPassword: String(formData.get("newPassword") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    };
    const fieldErrors = validateResetPassword(values);
    setErrors(fieldErrors);
    setError("");

    if (Object.keys(fieldErrors).length > 0) return;

    setBusy(true);
    try {
      await resetPassword(values);
      // Once saved, only retry signing out if navigation cannot complete.
      setSuccess(true);
      await finishRecovery();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-labelledby={`${inputId}-title`}>
      <span className="eyebrow">ACCOUNT RECOVERY</span>
      <h1 id={`${inputId}-title`} className="auth-form-title mt-4">
        Choose a new password
      </h1>
      {success ? (
        <div className="mt-6 grid gap-5">
          <p role="status" className="text-sm text-text-primary">
            Your password has been reset successfully.
          </p>
          {signOutError && (
            <p role="alert" className="text-sm text-destructive">
              {signOutError}
            </p>
          )}
          <Button
            type="button"
            disabled={isSigningOut}
            onClick={finishRecovery}
            className="button-base button-primary h-12 cursor-pointer"
          >
            {isSigningOut
              ? "Returning to sign in..."
              : "Sign out and continue to sign in"}
          </Button>
        </div>
      ) : (
        <form
          noValidate
          action={resetPasswordHandler}
          onReset={(event) => event.preventDefault()}
          className="mt-6 grid gap-5"
          aria-busy={busy}
        >
          <fieldset disabled={busy} className="grid gap-5">
            <PasswordField
              id={`${inputId}-new`}
              label="New password"
              error={errors.newPassword}
              name="newPassword"
              onChange={() => setErrors((current) => ({ ...current, newPassword: undefined }))}
            />
            <PasswordField
              id={`${inputId}-confirm`}
              label="Confirm new password"
              hint={null}
              error={errors.confirmPassword}
              name="confirmPassword"
              onChange={() => setErrors((current) => ({ ...current, confirmPassword: undefined }))}
            />
          </fieldset>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={busy}
            className="button-base button-primary h-12 cursor-pointer"
          >
            {busy ? "Updating password..." : "Reset password"}
          </Button>
          <Link
            href="/forgot-password"
            className="text-sm text-info underline underline-offset-4"
          >
            Request a new reset link
          </Link>
        </form>
      )}
    </section>
  );
}
