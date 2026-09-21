"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/app/(auth)/register/_components/PasswordField/PasswordField";
import { FieldError } from "@/shared/components/FieldError/FieldError";
import useForm from "@/shared/hooks/useForm";
import { loginUser } from "@/lib/services/auth.service";
import {
  validateLoginForm,
  type LoginFormValues,
} from "@/app/(auth)/validators/login.validator";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};
export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { register, formHandler, errors, setErrors } = useForm(
    loginHandler,
    initialValues,
    validateLoginForm,
  );

  async function loginHandler(values: LoginFormValues) {
    setIsSubmitting(true);

    try {
      await loginUser(values);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrors({
        email: "Invalid email or password.",
        password: "Invalid email or password.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="card-base" aria-labelledby="login-title">
      <div className="mb-7">
        <span className="eyebrow">AUTOCREST ACCOUNT</span>
        <h1
          id="login-title"
          className="mt-4 text-[clamp(1.875rem,5vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-text-primary"
        >
          Welcome <span className="text-accent-text">back</span>
        </h1>
        <p className="mt-3.5 text-[0.9375rem] leading-[1.55] text-muted">
          Continue managing your vehicles, events, and next decisions.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Button
          className="oauth-button oauth-button-google h-11 cursor-pointer"
          type="button"
          variant="outline"
        >
          <GoogleIcon />
          Google
        </Button>
        <Button
          className="oauth-button oauth-button-github h-11 cursor-pointer"
          type="button"
          variant="outline"
        >
          <GitHubIcon />
          GitHub
        </Button>
        <Button
          className="oauth-button oauth-button-apple h-11 cursor-pointer"
          type="button"
          variant="outline"
        >
          <AppleIcon />
          Apple
        </Button>
      </div>

      <div className="my-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted">
          or continue with email
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form className="grid gap-4" onSubmit={formHandler}>
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
            {...register("email")}
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
          {...register("password")}
          error={errors.password}
        />

        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-[1.45] text-muted">
          <input className="mt-px size-4 " name="remember" type="checkbox" />
          <span>Remember me</span>
        </label>

        <Button
          className="button-primary button-base mt-1 h-auto w-full px-4 py-3.5 text-sm"
          type="submit"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
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

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.2c0-.64-.06-1.25-.16-1.84H12v3.48h5.25a4.49 4.49 0 0 1-1.95 2.94v2.26h3.16c1.85-1.7 2.89-4.22 2.89-6.84Z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.64 0 4.86-.88 6.48-2.38l-3.16-2.26c-.88.59-2 .94-3.32.94-2.55 0-4.71-1.72-5.48-4.04H3.25v2.33A9.75 9.75 0 0 0 12 21.75Z"
      />
      <path
        fill="#FBBC05"
        d="M6.52 14.01A5.86 5.86 0 0 1 6.21 12c0-.7.12-1.38.31-2.01V7.66H3.25A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1 4.34l3.27-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.95c1.44 0 2.72.49 3.73 1.46l2.81-2.81A9.43 9.43 0 0 0 12 2.25a9.75 9.75 0 0 0-8.75 5.41l3.27 2.33C7.29 7.67 9.45 5.95 12 5.95Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.84c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c.02-2.03 1.66-3 1.74-3.05a3.74 3.74 0 0 0-2.95-1.6c-1.24-.13-2.45.74-3.08.74-.64 0-1.61-.73-2.65-.71a3.9 3.9 0 0 0-3.28 2c-1.42 2.46-.36 6.08 1 8.07.68.97 1.47 2.05 2.51 2.01 1.02-.04 1.4-.65 2.63-.65 1.22 0 1.58.65 2.65.63 1.1-.02 1.79-.97 2.44-1.95a8.1 8.1 0 0 0 1.12-2.28 3.52 3.52 0 0 1-2.13-3.21ZM15.03 6.58a3.59 3.59 0 0 0 .82-2.58 3.66 3.66 0 0 0-2.39 1.23 3.42 3.42 0 0 0-.85 2.48 3.03 3.03 0 0 0 2.42-1.13Z" />
    </svg>
  );
}
