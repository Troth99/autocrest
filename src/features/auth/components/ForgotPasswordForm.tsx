"use client";

import Link from "next/link";
import { startTransition, useEffect, useId, useState } from "react";
import SendResetLinkButton from "@/features/auth/components/SendResetLinkButton";
import PasswordResetSent from "@/features/auth/components/PasswordResetSent";
import { requestPasswordReset } from "@/features/auth/services/password-recovery.service";
import { validateForgotPassword } from "@/features/auth/validators/password-recovery.validator";
import { logoutUser } from "@/features/auth/services/auth.service";

const resetRequestKey = "autocrest-password-reset";

export default function ForgotPasswordForm({
  invalidLink = false,
}: {
  invalidLink?: boolean;
}) {
  const inputId = useId();
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [error, setError] = useState("");
  const [retryAt, setRetryAt] = useState(0);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  async function handleBackToSignIn() {
    setIsSigningOut(true);
    setSignOutError("");
    try {
      await logoutUser();
      // Reload to clear server-rendered account data along with the session.
      window.location.replace("/login");
    } catch {
      setSignOutError("Could not sign out. Please try again.");
      setIsSigningOut(false);
    }
  }

  useEffect(() => {
    try {
      // Restore the confirmation screen and retry deadline after a page refresh.
      const saved = JSON.parse(sessionStorage.getItem(resetRequestKey) ?? "null");
      if (!saved || typeof saved.email !== "string" || !Number.isFinite(saved.retryAt)) return;

      // Mark these UI updates as non-urgent so user interactions can take priority.
      startTransition(() => {
        setSentEmail(saved.email);
        setRetryAt(saved.retryAt);
        setSuccess(true);
      });
    } catch {
      // Ignore unavailable storage or malformed saved data.
    }
  }, []);

  function handleRetry() {
    try {
      // Clear the saved confirmation before showing the form again.
      sessionStorage.removeItem(resetRequestKey);
    } catch {
      // Browser storage may be unavailable.
    }
    setSuccess(false);
  }

  async function resetPasswordHandler(formData: FormData) {

    const email = String(formData.get("email") ?? "");
    const fieldErrors = validateForgotPassword({ email });
    setErrors(fieldErrors);
    setError("");

    if (Object.keys(fieldErrors).length > 0) return;

    setBusy(true);

    try {
      await requestPasswordReset(email);
      // Save a deadline so refreshing does not restart the 60-second countdown.
      const nextRetryAt = Date.now() + 60_000;
      setRetryAt(nextRetryAt);
      try {
        sessionStorage.setItem(
          resetRequestKey,
          JSON.stringify({ email, retryAt: nextRetryAt }),
        );
      } catch {
        // Keep the successful submission visible even without browser storage.
      }
      setSentEmail(email);
      setSuccess(true);
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
      {!success && (
        <>
          <h1 id={`${inputId}-title`} className="auth-form-title mt-4">
            Forgot your password?
          </h1>
          <p className="mt-3 section-description">
            Enter your email and we will send you a password reset link.
          </p>
        </>
      )}
      {invalidLink && !success && (
        <p role="alert" className="mt-5 text-sm text-destructive">
          This reset link is invalid or has expired. Request a new link and open
          it in the browser where you requested it.
        </p>
      )}
      {success ? (
        <PasswordResetSent
          titleId={`${inputId}-title`}
          email={sentEmail}
          retryAt={retryAt}
          onRetry={handleRetry}
        />
      ) : (
        <form
          noValidate
          action={resetPasswordHandler}
          onReset={(event) => event.preventDefault()}
          className="mt-6 grid gap-5"
          aria-busy={busy}
        >
          <div className="grid gap-2">
            <label className="field-label" htmlFor={inputId}>
              Email address
            </label>
            <input
              id={inputId}
              type="email"
              autoComplete="email"
              className="form-input"
              disabled={busy}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${inputId}-error` : undefined}
              name="email"
              defaultValue={sentEmail}
            />
            {errors.email && (
              <p
                id={`${inputId}-error`}
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.email}
              </p>
            )}
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <SendResetLinkButton />
        </form>
      )}
      {signOutError && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {signOutError}
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleBackToSignIn}
          disabled={busy || isSigningOut}
          className="cursor-pointer text-sm text-info underline underline-offset-4 disabled:cursor-not-allowed"
        >
          {isSigningOut ? "Signing out..." : "Back to sign in"}
        </button>
        <Link href="/" className="button-base button-secondary px-4 py-2 text-sm">
          Home
        </Link>
      </div>
    </section>
  );
}
