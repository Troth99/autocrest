import type { CookieOptions } from "@supabase/ssr";

const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 10; // 10 days

export function getSessionCookieOptions(
  options: CookieOptions,
  rememberMe: boolean,
): CookieOptions {
  // Preserve cookies that clear an expired or signed-out session.
  if (options.maxAge === 0) return options;

  if (rememberMe) {
    return { ...options, maxAge: REMEMBER_ME_MAX_AGE };
  }

  const sessionOptions = { ...options };
  delete sessionOptions.maxAge;
  delete sessionOptions.expires;
  return sessionOptions;
}
