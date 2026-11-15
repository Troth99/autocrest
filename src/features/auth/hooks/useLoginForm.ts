"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import {
  loginUser,
  loginWithOAuth,
} from "@/features/auth/services/auth.service";
import {
  validateLoginForm,
  type LoginFormValues,
} from "@/features/auth/validators/login.validator";

type LoginState = { errors: Partial<Record<keyof LoginFormValues, string>> };

export default function useLoginForm() {
  const [oauthPending, setOauthPending] = useState(false);
  const router = useRouter();
  const [oauthError, setOauthError] = useState<string | null>(null);

  async function loginHandler(
    _previousState: LoginState,
    formData: FormData,
  ): Promise<LoginState> {
    
    const values: LoginFormValues = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      rememberMe: formData.has("rememberMe"),
    };

    const errors = validateLoginForm(values);

    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    try {
      const result = await loginUser(values);
      if (Object.keys(result.errors).length > 0)
        return { errors: result.errors };
    } catch (error) {
      console.error(error);
      return {
        errors: {
          email: "Could not sign in. Please try again.",
        },
      };
    }

    router.replace("/verify-2fa");
    router.refresh();
    return { errors: {} };
  }

  const [state, formAction, pending] = useActionState(loginHandler, {
    errors: {},
  });

  async function oauthLoginHandler(provider: "google" | "facebook") {
    setOauthError(null);
    setOauthPending(true);

    try {
      const result = await loginWithOAuth(provider);
      setOauthError(result.error);
    } finally {
      setOauthPending(false);
    }
  }

  return {
    formAction,
    errors: state.errors,
    isSubmitting: pending || oauthPending,
    oauthLoginHandler,
    oauthError,
  };
}
