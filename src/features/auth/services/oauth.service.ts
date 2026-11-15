import { createClient } from "@/lib/supabase/client";

export async function loginWithOAuth(provider: "google" | "facebook") {
  const callbackUrl = new URL("/auth/callback", window.location.origin);
  callbackUrl.searchParams.set("provider", provider);

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: callbackUrl.toString() },
  });

  return {
    error: error ? "Could not start sign-in. Please try again." : null,
  };
}
