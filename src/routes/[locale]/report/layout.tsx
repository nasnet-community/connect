import { component$, Slot } from '@builder.io/qwik';
import { Link, useLocation, routeLoader$ } from '@builder.io/qwik-city';
import { getSupabaseClient, checkAuth } from '~/utils/auth';

// Add auth check
export const useAuthCheck = routeLoader$(async (requestEvent) => {
  const supabase = getSupabaseClient();
  const authState = await checkAuth(supabase);
  
  // If not authenticated, redirect to login
  if (!authState.isAuthenticated) {
    throw requestEvent.redirect(302, `/login?redirectTo=${requestEvent.url.pathname}`);
  }
  
  return authState;
});

export default component$(() => {
  const location = useLocation();
  const auth = useAuthCheck();
  
  // Get the current path to highlight active navigation item
  const currentPath = location.url.pathname;
  
  // Navigation items
  const navItems = [
    { label: 'Overview', path: '/vpn/' },
    { label: 'Analytics', path: '/vpn/analytics/' },
    { label: 'Manage Credentials', path: '/vpn/manage/' },
  ];
  
  // Function to determine if a nav item is active
  const isActive = (path: string) => {
    if (path === '/vpn/' && currentPath === path) {
      return true;
    }
    if (path !== '/vpn/' && currentPath.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  return (
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header class="bg-white dark:bg-gray-800 shadow">
        <div class="container mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">VPN Credentials Dashboard</h1>
            
            {/* User info and sign out */}
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {auth.value.user?.email}
              </span>
              <Link 
                href="/api/auth/signout"
                class="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Sign Out
              </Link>
            </div>
          </div>
          
          <nav class="mt-4">
            <ul class="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    class={`inline-block px-4 py-2 border-b-2 -mb-px ${
                      isActive(item.path)
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      
      <main class="py-6">
        <Slot />
      </main>
      
      <footer class="bg-white dark:bg-gray-800 shadow mt-8 py-4">
        <div class="container mx-auto px-4">
          <p class="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} VPN Credentials Dashboard
          </p>
        </div>
      </footer>
    </div>
  );
}); 