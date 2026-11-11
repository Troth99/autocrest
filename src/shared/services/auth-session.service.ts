import "server-only";

import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/shared/services/auth-user.service";

export default async function requireUserWithMfa() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await getAuthenticatedUser(supabase);

  if (userError || !user) {
    throw new Error("Please sign in again.");
  }

  const { data: security, error } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (error) {
    throw new Error("Could not verify your session. Please try again.");
  }

  const needsTwoFactor =
    security.nextLevel === "aal2" && security.currentLevel !== "aal2";

  if (needsTwoFactor) {
    throw new Error("Please complete two-factor authentication first.");
  }

  return { supabase, user };
}
