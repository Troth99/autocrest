"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/shared/services/auth-user.service";

export async function redirectAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await getAuthenticatedUser(supabase);

  if (!user) return;

  const { data: assurance, error } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (error) {
    throw error;
  }

  redirect(
    assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2"
      ? "/verify-2fa"
      : "/",
  );
}

export async function getMfaVerificationData(next?: string) {
  // Only the recovery destination is accepted; arbitrary redirect URLs are ignored.
  const nextPath: "/" | "/reset-password" =
    next === "/reset-password" ? "/reset-password" : "/";
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await getAuthenticatedUser(supabase);

  if (userError || !user) {
    redirect("/login");
  }

  const { data: assurance, error } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (error) {
    throw error;
  }

  if (assurance.currentLevel === "aal2" || assurance.nextLevel !== "aal2") {
    redirect(nextPath);
  }

  const { data: factors, error: factorsError } =
    await supabase.auth.mfa.listFactors();

  if (factorsError) {
    throw factorsError;
  }

  const totpFactors = factors.totp
    .filter((factor) => factor.status === "verified")
    .map((factor) => ({
      id: factor.id,
      name: factor.friendly_name || "Authenticator app",
    }));

  return { factors: totpFactors, nextPath };
}

export async function requirePasswordResetSession() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await getAuthenticatedUser(supabase);

  if (userError || !user) {
    redirect("/forgot-password?error=invalid_reset_link");
  }

  const { data: assurance, error } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (error) {
    throw error;
  }

  if (assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {
    redirect("/verify-2fa?next=/reset-password");
  }
}

export async function requireVerifiedSession() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await getAuthenticatedUser(supabase);

  if (!user) {
    redirect("/login");
  }

  const { data: assurance, error } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (error) {
    throw error;
  }

  if (assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {
    redirect("/verify-2fa");
  }
}
