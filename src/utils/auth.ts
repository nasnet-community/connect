import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { RequestEvent } from '@builder.io/qwik-city';

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
}

// Create a Supabase client
export const getSupabaseClient = (): SupabaseClient => {
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_ANON_KEY || ''; // Use anon key for client-side auth
  
  return createClient(supabaseUrl, supabaseKey);
};

// Get a service role client (only use server-side)
export const getSupabaseServiceClient = (): SupabaseClient => {
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  return createClient(supabaseUrl, supabaseKey);
};

// Check if user is authenticated
export const checkAuth = async (supabase: SupabaseClient): Promise<AuthState> => {
  const { data, error } = await supabase.auth.getSession();
  
  if (error || !data.session) {
    return { isAuthenticated: false, user: null };
  }
  
  return { 
    isAuthenticated: true, 
    user: data.session.user 
  };
};

// Auth loader for routes
export const requireAuth = async (
  supabase: SupabaseClient,
  requestEvent: RequestEvent
): Promise<AuthState> => {
  const { isAuthenticated, user } = await checkAuth(supabase);
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    throw requestEvent.redirect(302, `/login?redirectTo=${requestEvent.url.pathname}`);
  }
  
  return { isAuthenticated, user };
}; 