"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { cookieOptions } from "@/lib/supabase/auth-cookie-options";
import {
  REMEMBER_ME_COOKIE,
  REMEMBER_ME_MAX_AGE,
} from "@/lib/supabase/session-cookie-options";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/validators/login.validator";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/validators/register.validator";
import { getFieldErrors } from "@/shared/validators/getFieldErrors";

async function saveRememberMePreference(rememberMe: boolean) {
  const cookieStore = await cookies();
  
  cookieStore.set(REMEMBER_ME_COOKIE, String(rememberMe), {
    ...cookieOptions,
    ...(rememberMe ? { maxAge: REMEMBER_ME_MAX_AGE } : {}),
  });
}

async function saveEmailProvider() {
  const cookieStore = await cookies();
  cookieStore.set("autocrest-login-provider", "email", cookieOptions);
}

export async function registerUser(input: unknown) {
  
  const result = registerSchema.safeParse(input);
  if (!result.success) {
    return { errors: getFieldErrors<keyof RegisterFormValues>(result.error) };
  }
  const { username, email, password } = result.data;
  const supabase = await createClient();
  const { data: taken, error: availabilityError } = await supabase.rpc(
    "is_username_taken",
    { candidate_username: username },
  );
  if (availabilityError || typeof taken !== "boolean") {
    return {
      errors: {
        username: "Unable to check username availability. Please try again.",
      },
    };
  }
  if (taken) {
    return {
      errors: {
        username: "This username is already taken. Please choose another one.",
      },
    };
  }

  // Set the preference before signup can write session cookies.
  await saveRememberMePreference(true);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });
  if (error) return { errors: { email: error.message } };
  if (data.user && data.user.identities?.length === 0) {
    return { errors: { email: "An account with this email already exists." } };
  }
  if (!data.session) {
    return {
      errors: {
        email:
          "Your account was created, but you could not be signed in. Please try signing in.",
      },
    };
  }
  await saveEmailProvider();
  return { errors: {} };
}

export async function loginUser(input: LoginFormValues) {
  const result = loginSchema.safeParse(input);
  if (!result.success) {
    return {
      errors: getFieldErrors<keyof LoginFormValues>(result.error),
    };
  }
  const { email, password, rememberMe } = result.data;
  await saveRememberMePreference(rememberMe);
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const message =
      error.code === "invalid_credentials"
        ? "Invalid email or password."
        : "Could not sign in. Please try again.";
    return { errors: { email: message, password: message } };
  }
  await saveEmailProvider();
  return { errors: {} };
}

export async function logoutUser(): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  const cookieStore = await cookies();
  cookieStore.delete("autocrest-login-provider");
}

export async function loginWithOAuth(provider: "google" | "facebook") {
  if (provider !== "google" && provider !== "facebook") {
    return { error: "Unsupported sign-in provider." };
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl)
    return { error: "Sign-in is not configured. Please try again later." };

  const callbackUrl = new URL("/auth/callback", siteUrl);
  callbackUrl.searchParams.set("provider", provider);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: callbackUrl.toString(), skipBrowserRedirect: true },
  });
  if (error || !data.url)
    return { error: "Could not start sign-in. Please try again." };
  redirect(data.url);
}
