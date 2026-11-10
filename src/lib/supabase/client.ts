import { createBrowserClient } from "@supabase/ssr";
import {
  REMEMBER_ME_COOKIE,
  getSessionCookieOptions,
} from "@/lib/supabase/session-cookie-options";
import { getSupabaseConfig } from "@/lib/supabase/config";

function getAllCookies() {
  return document.cookie
    .split("; ")
    .filter(Boolean)
    .map((cookie) => {
      const separatorIndex = cookie.indexOf("=");

      return {
        name: decodeURIComponent(cookie.slice(0, separatorIndex)),
        value: decodeURIComponent(cookie.slice(separatorIndex + 1)),
      };
    });
}

function isRememberMeEnabled() {
  return getAllCookies().some(
    (cookie) => cookie.name === REMEMBER_ME_COOKIE && cookie.value === "true",
  );
}

export function createClient() {

  const { url, key } = getSupabaseConfig();

  return createBrowserClient(url, key, {
    cookies: {
      getAll: getAllCookies,

      setAll(cookies) {
        const rememberMe = isRememberMeEnabled();

        cookies.forEach(({ name, value, options }) => {
          const attributes = [
            `Path=${options.path ?? "/"}`,
            `SameSite=${options.sameSite ?? "lax"}`,
          ];

          const cookieOptions = getSessionCookieOptions(options, rememberMe);

          if (cookieOptions.maxAge !== undefined) {
            attributes.push(`Max-Age=${cookieOptions.maxAge}`);
          }
          if (window.location.protocol === "https:") {
            attributes.push("Secure");
          }

          document.cookie =
            `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ` +
            attributes.join("; ");
        });
      },
    },
  });
}
