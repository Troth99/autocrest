import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import {
  REMEMBER_ME_COOKIE,
  getSessionCookieOptions,
} from "@/lib/supabase/session-cookie-options";
import { getSupabaseConfig } from "@/lib/supabase/config";

export const createClient = cache(async () => {
  // Reuse the client within the same React server render.
  const cookieStore = await cookies();

  // The Supabase client is created with the server-side cookies to ensure that the session is correctly managed.
  const { url, key } = getSupabaseConfig();

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            const rememberMe =
              cookieStore.get(REMEMBER_ME_COOKIE)?.value === "true";

            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(
                name,
                value,
                getSessionCookieOptions(options, rememberMe),
              );
            });
          } catch {
            // Server Components cannot write cookies; Proxy handles refresh.
          }
        },
      },
    },
  );
});
