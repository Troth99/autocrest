import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const REMEMBER_ME_COOKIE = "autocrest-remember-me";
const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 10; //10 days

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          const rememberMe =
            request.cookies.get(REMEMBER_ME_COOKIE)?.value === "true";

          cookiesToSet.forEach(({ name, value, options }) => {
            if (options.maxAge === 0) {
              supabaseResponse.cookies.set(name, value, options);
              return;
            }

            if (rememberMe) {
              supabaseResponse.cookies.set(name, value, {
                ...options,
                maxAge: REMEMBER_ME_MAX_AGE,
              });
              return;
            }

            const sessionOptions = { ...options };
            delete sessionOptions.maxAge;
            delete sessionOptions.expires;

            supabaseResponse.cookies.set(name, value, sessionOptions);
          });
        },
      },
    },
  );

  // Refreshes the auth token if needed; required for Server Components to read a valid session.
  await supabase.auth.getUser();

  return supabaseResponse;
}
