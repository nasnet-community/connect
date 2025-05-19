import type { RequestHandler } from '@builder.io/qwik-city';
import { getSupabaseClient } from '~/utils/auth';

export const onGet: RequestHandler = async (requestEvent) => {
  const { redirect } = requestEvent;
  
  try {
    // Get Supabase client
    const supabase = getSupabaseClient();
    
    // Sign out the user
    await supabase.auth.signOut();
    
    // Redirect to login page
    throw redirect(302, '/login');
  } catch (error) {
    // If the error is our own redirect, pass it through
    if (error instanceof Response) {
      throw error;
    }
    
    // Otherwise redirect to login with error
    console.error('Error signing out:', error);
    throw redirect(302, '/login?error=sign_out_failed');
  }
}; 