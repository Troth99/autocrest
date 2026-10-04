"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { PasswordField } from "./PasswordField";
import { FieldError } from "@/shared/components/FieldError/FieldError";
import useForm from "@/shared/hooks/useForm";
import {
  loginUser,
  logInWithFacebook,
  logInWithGoogle,
} from "@/features/auth/services/auth.service";
import {
  validateLoginForm,
  type LoginFormValues,
} from "@/features/auth/validators/login.validator";
import { FacebookIcon, GoogleIcon } from "./icons/AuthProviderIcons";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};
export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { register, registerCheckbox, formHandler, errors, setErrors } =
    useForm(loginHandler, initialValues, validateLoginForm);

  async function loginHandler(values: LoginFormValues) {
    setIsSubmitting(true);

    try {
      await loginUser(values);
      router.replace("/verify-2fa");
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
