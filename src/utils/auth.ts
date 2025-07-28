import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { RequestEvent } from "@builder.io/qwik-city";

// Check if we're on the server side
const isServer = typeof process !== "undefined";

// Environment variables - handle both server and client side
const SUPABASE_URL = isServer
  ? process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_BASE_URL || ""
  : import.meta.env.VITE_SUPABASE_BASE_URL || "";

const SUPABASE_ANON_KEY = isServer
  ? process.env.SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    ""
  : import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const SUPABASE_SERVICE_ROLE_KEY = isServer
  ? process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  : "";

// TODO: Implement authentication redirect and session timeout functionality
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AUTH_REDIRECT_URL = isServer
  ? process.env.AUTH_REDIRECT_URL ||
    import.meta.env.VITE_AUTH_REDIRECT_URL ||
    "/"
  : import.meta.env.VITE_AUTH_REDIRECT_URL || "/";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AUTH_SESSION_TIMEOUT = isServer
  ? parseInt(
      process.env.AUTH_SESSION_TIMEOUT ||
        import.meta.env.VITE_AUTH_SESSION_TIMEOUT ||
        "3600000",
      10,
    )
  : parseInt(import.meta.env.VITE_AUTH_SESSION_TIMEOUT || "3600000", 10);

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
}

// Create a Supabase client
export const getSupabaseClient = (): SupabaseClient => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase URL and Anon Key are required");
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

// Get a service role client (only use server-side)
export const getSupabaseServiceClient = (): SupabaseClient => {
  if (!isServer) {
    throw new Error("Service role client can only be used on the server side");
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Supabase URL and Service Role Key are required for service client",
    );
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
};

// Check if user is authenticated
export const checkAuth = async (
  supabase: SupabaseClient,
): Promise<AuthState> => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return { isAuthenticated: false, user: null };
  }

  return {
    isAuthenticated: true,
    user: data.session.user,
  };
};

// Auth loader for routes
export const requireAuth = async (
  supabase: SupabaseClient,
  requestEvent: RequestEvent,
): Promise<AuthState> => {
  const { isAuthenticated, user } = await checkAuth(supabase);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    throw requestEvent.redirect(
      302,
      `/login?redirectTo=${requestEvent.url.pathname}`,
    );
  }

  return { isAuthenticated, user };
};
