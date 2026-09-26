"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/app/(auth)/register/_components/PasswordField/PasswordField";
import { FieldError } from "@/shared/components/FieldError/FieldError";
import useForm from "@/shared/hooks/useForm";
import {
  loginUser,
  logInWithFacebook,
  logInWithGoogle,
} from "@/lib/services/auth.service";
import {
  validateLoginForm,
  type LoginFormValues,
} from "@/app/(auth)/validators/login.validator";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};
export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { register, registerCheckbox, formHandler, errors, setErrors } = useForm(
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

  async function googleLoginHandler() {
    setIsSubmitting(true);

    try {
      await logInWithGoogle();
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  }

  async function facebookLoginHandler() {
    setIsSubmitting(true);

    try {
      await logInWithFacebook();
    } catch (error) {
      console.error(error);
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

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          className="oauth-button oauth-button-google h-11 cursor-pointer"
          type="button"
          variant="outline"
          onClick={googleLoginHandler}
          disabled={isSubmitting}
        >
          <GoogleIcon />
          Google
        </Button>
        <Button
          className="oauth-button oauth-button-facebook h-11 cursor-pointer"
          type="button"
          variant="outline"
          onClick={facebookLoginHandler}
          disabled={isSubmitting}
        >
          <FacebookIcon />
          Facebook
        </Button>

        {/* Placeholder for additional OAuth buttons, e.g., Microsoft, Apple */}
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
          <input
            className="mt-px size-4 "
            type="checkbox"
            {...registerCheckbox("rememberMe")}
          />
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

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.9h2.77l-.44 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06Z"
      />
    </svg>
  );
}
