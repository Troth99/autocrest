"use client";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { PasswordField } from "./PasswordField";
import { FieldError } from "@/shared/components/FieldError/FieldError";
import useLoginForm from "@/features/auth/hooks/useLoginForm";
import OAuthButtons from "./OAuthButtons";

export default function LoginForm({
  passwordReset = false,
}: {
  passwordReset?: boolean;
}) {
  const {
    formAction,
    errors,
    isSubmitting,
    isEmailPending,
    pendingProvider,
    oauthLoginHandler,
    oauthError,
  } = useLoginForm();

  return (
    <section className="auth-form-card" aria-labelledby="login-title">
      {passwordReset && (
        <p
          role="status"
          className="mb-6 rounded-xl border border-accent/25 bg-accent/5 p-4 text-sm text-accent-text"
        >
          Your password has been reset. Sign in with your new password.
        </p>
      )}
      <div className="mb-7">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-info">
          AUTOCREST ACCOUNT
        </span>
        <h1 id="login-title" className="auth-form-title">
          Welcome <span className="text-accent-text">back</span>
        </h1>
        <p className="mt-3.5 text-[0.9375rem] leading-[1.55] text-muted">
          Continue managing your vehicles, events, and next decisions.
        </p>
      </div>

      <OAuthButtons
        isSubmitting={isSubmitting}
        pendingProvider={pendingProvider}
        oauthLoginHandler={oauthLoginHandler}
      />

      {oauthError && <div role="alert"><FieldError message={oauthError} /></div>}

      <div className="my-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted">
          or continue with email
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form
        className="grid gap-4"
        action={formAction}
        // Keep entered values when validation or authentication fails.
        onReset={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <label className="field-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="form-input"
            name="email"
            disabled={isSubmitting}
          />
          <FieldError message={errors.email} />
        </div>

        <PasswordField
          id="login-password"
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          hint={
            <Link
              className="font-semibold text-info transition-colors hover:text-info-strong"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          }
          name="password"
          disabled={isSubmitting}
          error={errors.password}
        />

        <div className="flex items-start gap-2.5 text-xs leading-[1.45] text-muted">
          <input
            className="mt-px size-4 cursor-pointer disabled:cursor-not-allowed"
            type="checkbox"
            name="rememberMe"
            aria-labelledby="remember-me-label"
            disabled={isSubmitting}
          />
          <span id="remember-me-label">Remember me</span>
        </div>

        <Button
          className="button-primary button-base mt-1 h-auto w-full cursor-pointer px-4 py-3.5 text-sm"
          type="submit"
          size="lg"
          disabled={isSubmitting}
        >
          {isEmailPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-5 text-center text-[0.8125rem] text-muted">
        Don&apos;t have an account?{" "}
        <Link
          className="font-semibold text-info transition-colors hover:text-info-strong"
          href="/register"
        >
          Create account
        </Link>
      </p>
    </section>
  );
}
