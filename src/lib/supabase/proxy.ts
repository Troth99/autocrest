import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookieOptions } from "@/lib/supabase/session-cookie-options";

const REMEMBER_ME_COOKIE = "autocrest-remember-me";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    },
  );

  // Refreshes the auth token if needed; required for Server Components to read a valid session.
  await supabase.auth.getUser();

  return supabaseResponse;
}
