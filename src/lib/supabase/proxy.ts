import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  getSessionCookieOptions,
  REMEMBER_ME_COOKIE,
} from "@/lib/supabase/session-cookie-options";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const { url, key } = getSupabaseConfig();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },

      setAll(cookiesToSet, headers) {
        // Pass refreshed cookies to the current server request.
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        // Prevent caching responses containing session cookies.
        Object.entries(headers).forEach(([name, value]) => {
          supabaseResponse.headers.set(name, value);
        });

        const rememberMe =
          request.cookies.get(REMEMBER_ME_COOKIE)?.value === "true";

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(
            name,
            value,
            getSessionCookieOptions(options, rememberMe),
          );
        });
      },
    },
  });

  // Verifies the JWT claims and refreshes the session if needed.
  await supabase.auth.getClaims();

  return supabaseResponse;
}
