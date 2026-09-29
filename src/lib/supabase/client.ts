import { createBrowserClient } from "@supabase/ssr";

const REMEMBER_ME_COOKIE = "autocrest-remember-me";
const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 10; // 10 дни

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
    (cookie) =>
      cookie.name === REMEMBER_ME_COOKIE && cookie.value === "true",
  );
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. Check .env.local and restart the dev server.",
    );
  }

  return createBrowserClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: getAllCookies,

      setAll(cookies) {
        const rememberMe = isRememberMeEnabled();

        cookies.forEach(({ name, value, options }) => {
          const attributes = [
            `Path=${options.path ?? "/"}`,
            `SameSite=${options.sameSite ?? "lax"}`,
          ];

          if (options.maxAge === 0) {
            attributes.push("Max-Age=0");
          } else if (rememberMe) {
            attributes.push(`Max-Age=${REMEMBER_ME_MAX_AGE}`);
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