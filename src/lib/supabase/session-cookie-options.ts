import type { CookieOptions } from "@supabase/ssr";
import { cookieOptions } from "@/lib/supabase/auth-cookie-options";

export const REMEMBER_ME_COOKIE = "autocrest-remember-me";
export const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 10; // 10 days

export function getSessionCookieOptions(
  options: CookieOptions,
  rememberMe: boolean,
): CookieOptions {
  const sessionOptions = {
    ...options,
    secure: options.secure || cookieOptions.secure,
  };

  // Preserve cookies that clear an expired or signed-out session.
  if (options.maxAge === 0) return sessionOptions;

  if (rememberMe) {
    return { ...sessionOptions, maxAge: REMEMBER_ME_MAX_AGE };
  }

  delete sessionOptions.maxAge;
  delete sessionOptions.expires;
  return sessionOptions;
}
