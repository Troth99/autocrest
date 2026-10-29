"use client";

import Link from "next/link";
import { useId } from "react";
import { Button } from "@/shared/components/ui/button";
import usePasswordRecoveryForm from "@/features/auth/hooks/usePasswordRecoveryForm";
import { requestPasswordReset } from "@/features/auth/services/password-recovery.service";
import { validateForgotPassword } from "@/features/auth/validators/password-recovery.validator";

export default function ForgotPasswordForm({ invalidLink = false }: { invalidLink?: boolean }) {
  const inputId = useId();
  const { register, formHandler, errors, busy, success, error } = usePasswordRecoveryForm(
    { email: "" },
    validateForgotPassword,
    async (values) => { await requestPasswordReset(values.email); },
  );

  return (
    <section aria-labelledby={`${inputId}-title`}>
      <span className="eyebrow">ACCOUNT RECOVERY</span>
      <h1 id={`${inputId}-title`} className="auth-form-title mt-4">Forgot your password?</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Enter your email and we will send you a password reset link.</p>
      {invalidLink && !success && (
        <p role="alert" className="mt-5 text-sm text-destructive">This reset link is invalid or has expired. Request a new link and open it in the browser where you requested it.</p>
      )}
      {success ? (
        <p role="status" className="mt-6 text-sm leading-6 text-text-primary">
          If an account exists for that email, you will receive a password reset link. Check your inbox and spam folder.
        </p>
      ) : (
        <form noValidate onSubmit={formHandler} className="mt-6 grid gap-5" aria-busy={busy}>
          <div className="grid gap-2">
            <label className="field-label" htmlFor={inputId}>Email address</label>
            <input id={inputId} type="email" autoComplete="email" className="form-input" disabled={busy}
              aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${inputId}-error` : undefined}
              {...register("email")} />
            {errors.email && <p id={`${inputId}-error`} role="alert" className="text-sm text-destructive">{errors.email}</p>}
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={busy} className="button-base button-primary h-12 cursor-pointer">
            {busy ? "Sending link..." : "Send reset link"}
          </Button>
        </form>
      )}
      <Link href="/login" className="mt-6 inline-block text-sm text-info underline underline-offset-4">Back to sign in</Link>
    </section>
  );
}
