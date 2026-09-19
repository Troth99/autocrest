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
          className="mt-4 text-[clamp(1.875rem,5vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white"
        >
          Welcome <span className="text-accent">back</span>
        </h1>
        <p className="mt-3.5 text-[0.9375rem] leading-[1.55] text-muted">
          Continue managing your vehicles, events, and next decisions.
        </p>
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
              className="font-semibold text-sky-300 transition-colors hover:text-sky-200"
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
          className="font-semibold text-sky-300 transition-colors hover:text-sky-200"
          href="/register"
        >
          Create account
        </Link>
      </p>
    </section>
  );
}
