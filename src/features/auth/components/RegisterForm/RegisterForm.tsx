"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { loginUser, registerUser } from "@/features/auth/actions";
import useForm from "@/shared/hooks/useForm";
import { PasswordField } from "@/features/auth/components/PasswordField/PasswordField";
import { FieldError } from "@/shared/components/FieldError/FieldError";
import {
  validateRegisterForm,
  type RegisterFormValues,
} from "@/features/auth/validators/register.validator";

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const { register, formHandler, errors, setErrors } = useForm(
    registerHandler,
    initialValues,
    validateRegisterForm,
  );

  async function registerHandler(values: RegisterFormValues) {
    setIsSubmitting(true);

    try {
      await registerUser({
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      await loginUser({
        email: values.email.trim(),
        password: values.password,
      });
     
      router.push('/')
      router.refresh()

    } catch (error) {
      setErrors({
        email:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="card-base" aria-labelledby="register-title">
      <div className="mb-7">
        <span className="eyebrow">AUTOCREST ACCOUNT</span>
        <h1
          id="register-title"
          className="mt-4 text-[clamp(1.875rem,5vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-text-primary"
        >
          Create your <span className="text-accent-text">workspace</span>
        </h1>
        <p className="mt-3.5 text-[0.9375rem] leading-[1.55] text-muted">
          Keep every vehicle, event, and next decision in one clear place.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={formHandler}>
        <div className="grid gap-2">
          <label className="field-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="yourname"
            autoComplete="username"
            minLength={3}
            className="form-input"
            {...register("username")}
          />
          <FieldError message={errors.username} />
        </div>

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
          id="password"
          label="Password"
          autoComplete="new-password"
          error={errors.password}
          {...register("password")}
        />
        <PasswordField
          id="confirm-password"
          label="Confirm Password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          {...register("confirmPassword")}
        />
    

        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-[1.45] text-muted">
          <input
            className="mt-px size-4 accent-accent"
            name="terms"
            type="checkbox"
            required
          />
          <span>I agree to the Terms and Privacy Policy.</span>
        </label>

        <Button
          className="button-base mt-1 h-auto w-full px-4 py-3.5 text-sm cursor-pointer"
          type="submit"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-5 text-center text-[0.8125rem] text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-info hover:text-info-strong">
          Sign in{" "}
        </Link>
      </p>
    </section>
  );
}
