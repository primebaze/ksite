import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Cookie-bound Supabase client for the ADMIN area only. Uses the publishable
// key + a cookie session to authenticate staff (Supabase Auth). This is the
// auth/session client. Data CRUD in the admin uses the service client
// (lib/supabase.ts getServiceClient) after the user is verified.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component render, where cookies are read-only
            // here. Session refresh still works via the layout/actions path.
          }
        },
      },
    },
  );
}

/** Returns the signed-in staff user, or null. */
export async function getAdminUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
