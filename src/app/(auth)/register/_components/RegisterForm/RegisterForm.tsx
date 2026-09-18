"use client";


import { Eye, EyeOff } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";


export default function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section
      className="card-base"
      aria-labelledby="register-title"
    >
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

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label className="field-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="yourname"
            autoComplete="username"
            minLength={3}
            required
            className="form-input"
          />
        </div>

        <div className="grid gap-2">
          <label className="field-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="form-input"
          />
        </div>

        <div className="grid gap-2">
          <div className="field-row">
            <label htmlFor="password">Password</label>
            <span className="field-hint">At least 8 characters</span>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              autoComplete="new-password"
              minLength={8}
              required
              className="form-input pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-1 bottom-[10px] top-auto"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="field-label" htmlFor="confirm-password">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat your password"
              autoComplete="new-password"
              minLength={8}
              required
              className="form-input pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              className="absolute right-1 bottom-[10px] top-auto"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
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

        <button
          className="button-primary button-base mt-1 w-full px-4 py-3.5 text-sm"
          type="submit"
        >
          Create account
        </button>
      </form>

      <p className="mt-5 text-center text-[0.8125rem] text-muted">
        Already have an account?{" "}
        <span className="font-semibold text-sky-300">Sign in</span>
      </p>
    </section>
  );
}
