import { createClient } from "@/lib/supabase/client";
import {
  REMEMBER_ME_COOKIE,
  REMEMBER_ME_MAX_AGE,
} from "@/lib/supabase/session-cookie-options";

function saveRememberMePreference(rememberMe: boolean) {
  const maxAge = rememberMe ? `; Max-Age=${REMEMBER_ME_MAX_AGE}` : "";

  document.cookie =
    `${REMEMBER_ME_COOKIE}=${rememberMe}` + `; Path=/; SameSite=Lax${maxAge}`;
}

export type RegisterInput = {
  email: string;
  password: string;
  username: string;
};

export async function registerUser({
  email,
  password,
  username,
}: RegisterInput): Promise<void> {
  async function isUsernameTaken(username: string): Promise<boolean> {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("is_username_taken", {
      candidate_username: username.trim(),
    });

    if (error || typeof data !== "boolean") {
      throw new Error(
        "Unable to check username availability. Please try again.",
      );
    }

    return data;
  }

  username = username.trim();
  // Check before signup so an already taken username is reported under Username.
  if (await isUsernameTaken(username)) {
    const error = new Error(
      "This username is already taken. Please choose another one.",
    );
    error.name = "UsernameTakenError";
    throw error;
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) {
    throw error;
  }

  // Supabase masks existing accounts as a "success" with no identities when email confirmation is on.
  if (data.user && data.user.identities?.length === 0) {
    throw new Error("An account with this email already exists.");
  }
}

export async function loginUser({
  email,
  password,
  rememberMe = true,
}: {
  email: string;
  password: string;
  rememberMe?: boolean;
}): Promise<void> {
  saveRememberMePreference(rememberMe);
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  // Update the displayed method after a successful password sign-in.
  document.cookie = "autocrest-login-provider=email; Path=/; SameSite=Lax";
}

export async function logoutUser(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  // Clear the previous sign-in label after a successful sign-out.
  document.cookie =
    "autocrest-login-provider=; Path=/; SameSite=Lax; Max-Age=0";
}

export async function logInWithGoogle(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback?provider=google`,
    },
  });

  if (error) {
    throw error;
  }
}

export async function logInWithFacebook(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `${window.location.origin}/auth/callback?provider=facebook`,
    },
  });

  if (error) {
    throw error;
  }
}
