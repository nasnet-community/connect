import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "../Link";

/**
 * Navigation Example - Demonstrates Link usage in various navigation patterns
 */
export const NavigationExample = component$(() => {
  const activeTab = useSignal("dashboard");
  const sidebarOpen = useSignal(false);

  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Navigation Patterns</h2>
        
        <p class="text-gray-600 dark:text-gray-400">
          Real-world examples of how to use the Link component in different navigation contexts.
        </p>
      </div>

      {/* Primary Navigation */}
      <div class="space-y-4 border-l-4 border-blue-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Primary Navigation</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Main site navigation with active state management.</p>
        
        <nav class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="flex justify-between items-center">
            <Link href="/" class="text-xl font-bold text-gray-900 dark:text-white">Brand</Link>
            
            <div class="hidden md:flex space-x-8">
              <Link href="/" variant="nav" active>Home</Link>
              <Link href="/about" variant="nav">About</Link>
              <Link href="/services" variant="nav">Services</Link>
              <Link href="/blog" variant="nav">Blog</Link>
              <Link href="/contact" variant="nav">Contact</Link>
            </div>
            
            <div class="md:hidden">
              <button 
                onClick$={() => sidebarOpen.value = !sidebarOpen.value}
                class="text-gray-600 dark:text-gray-300"
              >
                ☰
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {sidebarOpen.value && (
            <div class="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div class="flex flex-col space-y-2">
                <Link href="/" variant="nav" active>Home</Link>
                <Link href="/about" variant="nav">About</Link>
                <Link href="/services" variant="nav">Services</Link>
                <Link href="/blog" variant="nav">Blog</Link>
                <Link href="/contact" variant="nav">Contact</Link>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Breadcrumb Navigation */}
      <div class="space-y-4 border-l-4 border-green-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Breadcrumb Navigation</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Hierarchical navigation showing the user's location.</p>
        
        <nav aria-label="Breadcrumb" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                href="/" 
                variant="breadcrumb" 
                color="secondary"
                prefixIcon={<span>🏠</span>}
              >
                Home
              </Link>
            </li>
            <li class="text-gray-400">/</li>
            <li>
              <Link href="/products" variant="breadcrumb" color="secondary">Products</Link>
            </li>
            <li class="text-gray-400">/</li>
            <li>
              <Link href="/products/electronics" variant="breadcrumb" color="secondary">Electronics</Link>
            </li>
            <li class="text-gray-400">/</li>
            <li>
              <Link href="/products/electronics/laptops" variant="breadcrumb" color="secondary">Laptops</Link>
            </li>
            <li class="text-gray-400">/</li>
            <li class="text-gray-900 dark:text-white font-medium" aria-current="page">
              MacBook Pro
            </li>
          </ol>
        </nav>
      </div>

      {/* Tab Navigation */}
      <div class="space-y-4 border-l-4 border-purple-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Tab Navigation</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Tabbed interface for switching between different views.</p>
        
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="border-b border-gray-200 dark:border-gray-600">
            <nav class="-mb-px flex space-x-8">
              <Link 
                href="/dashboard" 
                variant="nav" 
                active={activeTab.value === "dashboard"}
                onClick$={() => activeTab.value = "dashboard"}
              >
                Dashboard
              </Link>
              <Link 
                href="/analytics" 
                variant="nav" 
                active={activeTab.value === "analytics"}
                onClick$={() => activeTab.value = "analytics"}
              >
                Analytics
              </Link>
              <Link 
                href="/users" 
                variant="nav" 
                active={activeTab.value === "users"}
                onClick$={() => activeTab.value = "users"}
              >
                Users
              </Link>
              <Link 
                href="/settings" 
                variant="nav" 
                active={activeTab.value === "settings"}
                onClick$={() => activeTab.value = "settings"}
              >
                Settings
              </Link>
            </nav>
          </div>
          
          <div class="mt-4 p-4 bg-white dark:bg-gray-800 rounded">
            <p class="text-gray-600 dark:text-gray-400">
              Content for the <strong>{activeTab.value}</strong> tab would be displayed here.
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div class="space-y-4 border-l-4 border-indigo-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Sidebar Navigation</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Vertical navigation menu with icons and grouping.</p>
        
        <div class="flex bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
          <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600">
            <div class="p-4">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Main Menu</h4>
              <nav class="space-y-1">
                <Link 
                  href="/dashboard" 
                  variant="icon" 
                  prefixIcon={<span>📊</span>}
                  active
                  class="block w-full px-3 py-2 rounded-md text-left"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/projects" 
                  variant="icon" 
                  prefixIcon={<span>📁</span>}
                  class="block w-full px-3 py-2 rounded-md text-left"
                >
                  Projects
                </Link>
                <Link 
                  href="/team" 
                  variant="icon" 
                  prefixIcon={<span>👥</span>}
                  class="block w-full px-3 py-2 rounded-md text-left"
                >
                  Team
                </Link>
              </nav>
              
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 mt-6">Tools</h4>
              <nav class="space-y-1">
                <Link 
                  href="/analytics" 
                  variant="icon" 
                  prefixIcon={<span>📈</span>}
                  class="block w-full px-3 py-2 rounded-md text-left"
                >
                  Analytics
                </Link>
                <Link 
                  href="/reports" 
                  variant="icon" 
                  prefixIcon={<span>📋</span>}
                  class="block w-full px-3 py-2 rounded-md text-left"
                >
                  Reports
                </Link>
              </nav>
              
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 mt-6">Account</h4>
              <nav class="space-y-1">
                <Link 
                  href="/settings" 
                  variant="icon" 
                  prefixIcon={<span>⚙️</span>}
                  class="block w-full px-3 py-2 rounded-md text-left"
                >
                  Settings
                </Link>
                <Link 
                  href="/logout" 
                  variant="icon" 
                  prefixIcon={<span>🚪</span>}
                  color="error"
                  class="block w-full px-3 py-2 rounded-md text-left"
                >
                  Logout
                </Link>
              </nav>
            </div>
          </aside>
          
          <main class="flex-1 p-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Main Content Area</h4>
            <p class="text-gray-600 dark:text-gray-400">
              The selected page content would be displayed in this area.
            </p>
          </main>
        </div>
      </div>

      {/* Footer Navigation */}
      <div class="space-y-4 border-l-4 border-yellow-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Footer Navigation</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Footer links organized in columns with different priorities.</p>
        
        <footer class="bg-gray-900 text-white rounded-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h5 class="font-semibold mb-3">Company</h5>
              <nav class="space-y-2">
                <Link href="/about" variant="subtle" color="inverse" size="sm">About Us</Link>
                <Link href="/careers" variant="subtle" color="inverse" size="sm">Careers</Link>
                <Link href="/press" variant="subtle" color="inverse" size="sm">Press</Link>
                <Link href="/contact" variant="subtle" color="inverse" size="sm">Contact</Link>
              </nav>
            </div>
            
            <div>
              <h5 class="font-semibold mb-3">Products</h5>
              <nav class="space-y-2">
                <Link href="/features" variant="subtle" color="inverse" size="sm">Features</Link>
                <Link href="/pricing" variant="subtle" color="inverse" size="sm">Pricing</Link>
                <Link href="/integrations" variant="subtle" color="inverse" size="sm">Integrations</Link>
                <Link href="/api" variant="subtle" color="inverse" size="sm">API</Link>
              </nav>
            </div>
            
            <div>
              <h5 class="font-semibold mb-3">Resources</h5>
              <nav class="space-y-2">
                <Link href="/docs" variant="subtle" color="inverse" size="sm">Documentation</Link>
                <Link href="/blog" variant="subtle" color="inverse" size="sm">Blog</Link>
                <Link href="/support" variant="subtle" color="inverse" size="sm">Support</Link>
                <Link href="/community" variant="subtle" color="inverse" size="sm">Community</Link>
              </nav>
            </div>
            
            <div>
              <h5 class="font-semibold mb-3">Legal</h5>
              <nav class="space-y-2">
                <Link href="/privacy" variant="subtle" color="inverse" size="sm">Privacy Policy</Link>
                <Link href="/terms" variant="subtle" color="inverse" size="sm">Terms of Service</Link>
                <Link href="/cookies" variant="subtle" color="inverse" size="sm">Cookie Policy</Link>
                <Link href="/gdpr" variant="subtle" color="inverse" size="sm">GDPR</Link>
              </nav>
            </div>
          </div>
          
          <div class="border-t border-gray-700 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p class="text-sm text-gray-400">© 2024 Company Name. All rights reserved.</p>
            <div class="flex space-x-4 mt-4 md:mt-0">
              <Link 
                href="https://twitter.com" 
                variant="icon" 
                color="inverse" 
                external
                ariaLabel="Follow us on Twitter"
              >
                🐦
              </Link>
              <Link 
                href="https://github.com" 
                variant="icon" 
                color="inverse" 
                external
                ariaLabel="View our GitHub"
              >
                🐙
              </Link>
              <Link 
                href="https://linkedin.com" 
                variant="icon" 
                color="inverse" 
                external
                ariaLabel="Connect on LinkedIn"
              >
                💼
              </Link>
            </div>
          </div>
        </footer>
      </div>

      <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>🎯 Navigation Best Practices:</strong>
        </p>
        <ul class="text-sm text-gray-700 dark:text-gray-300 mt-2 space-y-1">
          <li>• Use consistent variant types within the same navigation context</li>
          <li>• Implement active states to show current location</li>
          <li>• Provide proper ARIA labels and breadcrumb semantics</li>
          <li>• Group related navigation items logically</li>
          <li>• Consider mobile-responsive patterns for complex navigation</li>
          <li>• Use appropriate icon sizes and maintain visual hierarchy</li>
        </ul>
      </div>
    </div>
  );
});

export default NavigationExample;