import { createClient } from "@/lib/supabase/client";

const REMEMBER_ME_COOKIE = "autocrest-remember-me";
const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 10;

function saveRememberMePreference(rememberMe: boolean) {
  const maxAge = rememberMe ? `; Max-Age=${REMEMBER_ME_MAX_AGE}` : "";

  document.cookie =
    `${REMEMBER_ME_COOKIE}=${rememberMe}` +
    `; Path=/; SameSite=Lax${maxAge}`;
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
}

export async function logoutUser(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function logInWithGoogle(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
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
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }
}

