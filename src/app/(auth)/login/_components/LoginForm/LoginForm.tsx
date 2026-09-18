"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { type SubmitEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
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

      <form className="grid gap-4" onSubmit={handleSubmit}>
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
            <Link
              className="field-hint transition-colors hover:text-text-primary"
              href="#"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="form-input pr-12"
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
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-[1.45] text-muted">
          <input
            className="mt-px size-4 "
            name="remember"
            type="checkbox"
          />
          <span>Remember me</span>
        </label>

        <Button
          className="button-primary button-base mt-1 h-auto w-full px-4 py-3.5 text-sm"
          type="submit"
          size="lg"
        >
          Sign in
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
