import { component$ } from "@builder.io/qwik";
import { Link } from "../Link";

/**
 * Overview documentation for the Link component
 * 
 * The Link component provides a flexible and accessible way to create
 * consistent navigation and external links throughout the application.
 */
export const Overview = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Introduction */}
      <section class="space-y-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Link Component
        </h1>
        
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          The Link component provides a unified interface for both internal and external links
          with automatic routing detection, security features, and consistent styling. It seamlessly
          integrates with Qwik's routing system while providing extensive customization options.
        </p>
      </section>

      {/* Key Features */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Key Features
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <h3 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
              🔗 Smart Link Detection
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Automatically detects internal vs external links and applies appropriate routing and security
            </p>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <h3 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
              🎨 Multiple Variants
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Six distinct styles: standard, button, nav, subtle, icon, and breadcrumb variants
            </p>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <h3 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
              🔒 Security First
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Automatic rel="noopener noreferrer" for external links with configurable security options
            </p>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <h3 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
              ♿ Accessibility Built-in
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              ARIA support, keyboard navigation, and screen reader optimizations
            </p>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <h3 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
              📱 Responsive Design
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Mobile-first design with touch-friendly interactions and responsive sizing
            </p>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <h3 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
              🌙 Dark Mode Support
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Complete dark mode support with optimized color schemes and contrast
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Common Use Cases
        </h2>
        
        <div class="space-y-3">
          <div class="border-l-4 border-primary-500 pl-4">
            <h4 class="text-lg font-medium mb-1">Navigation Links</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Internal navigation with proper routing and active states
            </p>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <h4 class="text-lg font-medium mb-1">External References</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Secure external links with automatic security attributes
            </p>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <h4 class="text-lg font-medium mb-1">Call-to-Action Buttons</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Button-styled links for primary actions and conversions
            </p>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <h4 class="text-lg font-medium mb-1">Breadcrumb Navigation</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Hierarchical navigation with appropriate styling and spacing
            </p>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <h4 class="text-lg font-medium mb-1">Icon Links</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Links with prefix or suffix icons for enhanced visual communication
            </p>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <h4 class="text-lg font-medium mb-1">Social Media Links</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              External social links with proper security and new tab behavior
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Best Practices
        </h2>
        
        <ul class="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
          <li class="flex items-start gap-2">
            <span class="text-success-600 dark:text-success-400 mt-0.5">✓</span>
            <span>Use descriptive link text that makes sense out of context</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-success-600 dark:text-success-400 mt-0.5">✓</span>
            <span>Let the component auto-detect internal vs external links when possible</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-success-600 dark:text-success-400 mt-0.5">✓</span>
            <span>Use appropriate variants: nav for navigation, button for CTAs, standard for content</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-success-600 dark:text-success-400 mt-0.5">✓</span>
            <span>Include ariaLabel for links with non-descriptive text or icon-only links</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-success-600 dark:text-success-400 mt-0.5">✓</span>
            <span>Use truncate prop for links in constrained layouts to prevent overflow</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-success-600 dark:text-success-400 mt-0.5">✓</span>
            <span>Consider color contrast and accessibility when using custom colors</span>
          </li>
        </ul>
        
        <div class="mt-4 p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg">
          <h4 class="font-medium text-warning-800 dark:text-warning-200 mb-2">Security Note</h4>
          <p class="text-sm text-warning-700 dark:text-warning-300">
            External links automatically include rel="noopener noreferrer" for security. 
            This prevents the new page from accessing the opener window and protects against tabnabbing attacks.
          </p>
        </div>
      </section>

      {/* Quick Example */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Quick Example
        </h2>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <div class="space-y-3">
            <Link href="/about" variant="standard" color="primary">
              Internal Navigation Link
            </Link>
            
            <Link 
              href="https://qwik.builder.io/" 
              variant="button" 
              color="accent"
              suffixIcon="↗"
            >
              External Documentation
            </Link>
            
            <Link 
              href="/dashboard" 
              variant="nav" 
              active={true}
              color="primary"
            >
              Active Navigation Item
            </Link>
            
            <Link 
              href="/settings" 
              variant="subtle" 
              prefixIcon="⚙️"
              color="secondary"
            >
              Settings with Icon
            </Link>
          </div>
        </div>
      </section>

      {/* Link Types */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Link Types
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Internal Links</h3>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Use Qwik's client-side routing</li>
              <li>• Faster navigation without full page reload</li>
              <li>• Automatically detected by URL pattern</li>
              <li>• No external security attributes needed</li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">External Links</h3>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Open in new tab by default</li>
              <li>• Include security attributes (rel="noopener noreferrer")</li>
              <li>• Detected by http/https/mailto/tel prefixes</li>
              <li>• Can be forced with external prop</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
});