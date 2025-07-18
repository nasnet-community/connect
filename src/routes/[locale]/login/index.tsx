import { component$, useSignal, useStore, $ } from '@builder.io/qwik';
import { routeAction$, Form, useLocation } from '@builder.io/qwik-city';
import { getSupabaseClient } from '~/utils/auth';

// Action to handle login
export const useLoginAction = routeAction$(async (data, requestEvent) => {
  const { email, password } = data as { email: string; password: string };
  
  // Create Supabase client
  const supabase = getSupabaseClient();
  
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return {
        success: false,
        message: error.message
      };
    }
    
    // Get redirect URL from query param or default to report page
    const redirectTo = requestEvent.url.searchParams.get('redirectTo') || '/vpn';
    
    // Set auth cookie if needed
    
    throw requestEvent.redirect(302, redirectTo);
  } catch (error) {
    if (error instanceof Response) {
      throw error; // This is our redirect
    }
    
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
});

export default component$(() => {
  const loginAction = useLoginAction();
  const location = useLocation();
  
  const formData = useStore({
    email: '',
    password: ''
  });
  
  const isLoading = useSignal(false);
  
  const handleSubmit = $(() => {
    isLoading.value = true;
  });
  
  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div class="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">Please sign in to access the dashboard</p>
        </div>
        
        <Form action={loginAction} onSubmit$={handleSubmit} class="mt-8 space-y-6">
          <input 
            type="hidden" 
            name="redirectTo" 
            value={location.url.searchParams.get('redirectTo') || '/vpn'} 
          />
          
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autocomplete="email"
                value={formData.email}
                onInput$={(e: any) => (formData.email = e.target.value)}
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="text"
                required
                autocomplete="current-password"
                value={formData.password}
                onInput$={(e: any) => (formData.password = e.target.value)}
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          {loginAction.value?.success === false && (
            <div class="p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-md text-red-800 dark:text-red-200 text-sm">
              {loginAction.value.message}
            </div>
          )}
          
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading.value}
            >
              {isLoading.value ? (
                <span class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign in'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}); 