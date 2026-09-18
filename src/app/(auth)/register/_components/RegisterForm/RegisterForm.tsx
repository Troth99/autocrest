"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/services/auth.service";
import useForm from "@/shared/hooks/useForm";
import type { RegisterFormValues } from "@/shared/types/auth";
import { validateRegisterForm } from "@/app/(auth)/validators/auth.validator";

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

const router = useRouter();

  const registerHandler = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      //to make a different confirm window that redirects to the login page
      router.push("/login");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const { register, formHandler, errors } = useForm(
    registerHandler,
    initialValues,
    validateRegisterForm,
  );

  return (
    <section className="card-base" aria-labelledby="register-title">
      <div className="mb-7">
        <span className="eyebrow">AUTOCREST ACCOUNT</span>
        <h1
          id="register-title"
          className="mt-4 text-[clamp(1.875rem,5vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white"
        >
          Create your <span className="text-accent">workspace</span>
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
            required
            className="form-input"
            {...register("username")}
          />
          {errors.username && <p>{errors.username}</p>}
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
            required
            className="form-input"
            {...register("email")}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="grid gap-2">
          <div className="field-row">
            <label htmlFor="password">Password</label>
            <span className="field-hint">At least 8 characters</span>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              autoComplete="new-password"
              minLength={8}
              className="form-input pr-12"
              {...register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-1 bottom-2.5 top-auto"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
            {errors.password && <p>{errors.password}</p>}
          </div>
        </div>

        <div className="grid gap-2">
          <label className="field-label" htmlFor="confirm-password">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat your password"
              autoComplete="new-password"
              minLength={8}
              className="form-input pr-12"
              {...register("confirmPassword")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              className="absolute right-1 bottom-2.5 top-auto"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-[1.45] text-muted">
          <input
            className="mt-px size-4 accent-accent"
            name="terms"
            type="checkbox"
            required
          />
          <span>I agree to the Terms and Privacy Policy.</span>
        </label>

        {message ? (
          <p role="status" className="text-sm text-emerald-300">
            {message}
          </p>
        ) : null}

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
        <Link href="/login" className="font-semibold text-sky-300">
          Sign in{" "}
        </Link>
      </p>
    </section>
  );
}
