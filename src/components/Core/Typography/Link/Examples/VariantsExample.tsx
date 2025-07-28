import { component$ } from "@builder.io/qwik";
import { Link } from "../Link";

/**
 * Variants Example - Showcases all available Link variants and their use cases
 */
export const VariantsExample = component$(() => {
  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Link Variants</h2>
        
        <p class="text-gray-600 dark:text-gray-400">
          The Link component offers multiple variants to suit different design needs and contexts.
        </p>
      </div>

      {/* Standard Variant */}
      <div class="space-y-4 border-l-4 border-blue-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Standard Variant</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">The default link style with focus ring and hover underline.</p>
        
        <div class="space-y-3">
          <div><Link href="/standard" variant="standard">Standard Link</Link></div>
          <div><Link href="/standard" variant="standard" color="accent">Accent Standard Link</Link></div>
          <div><Link href="/standard" variant="standard" color="success">Success Standard Link</Link></div>
        </div>
      </div>

      {/* Button Variant */}
      <div class="space-y-4 border-l-4 border-green-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Button Variant</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Button-like appearance with padding, border, and hover effects.</p>
        
        <div class="flex flex-wrap gap-3">
          <Link href="/action" variant="button">Primary Action</Link>
          <Link href="/secondary" variant="button" color="secondary">Secondary Action</Link>
          <Link href="/accent" variant="button" color="accent">Accent Action</Link>
          <Link href="/success" variant="button" color="success">Success Action</Link>
          <Link href="/error" variant="button" color="error">Error Action</Link>
        </div>
      </div>

      {/* Navigation Variant */}
      <div class="space-y-4 border-l-4 border-purple-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Navigation Variant</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Designed for navigation menus with bottom border on hover and active states.</p>
        
        <div class="flex space-x-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/home" variant="nav" active>Home</Link>
          <Link href="/about" variant="nav">About</Link>
          <Link href="/services" variant="nav">Services</Link>
          <Link href="/contact" variant="nav">Contact</Link>
        </div>
        
        <p class="text-xs text-gray-500 dark:text-gray-400">The "Home" link shows the active state</p>
      </div>

      {/* Subtle Variant */}
      <div class="space-y-4 border-l-4 border-gray-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Subtle Variant</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Minimal styling with opacity change on hover - perfect for secondary links.</p>
        
        <div class="space-y-3">
          <div><Link href="/subtle" variant="subtle">Subtle Link</Link></div>
          <div><Link href="/subtle" variant="subtle" color="tertiary">Tertiary Subtle Link</Link></div>
          <div class="bg-gray-900 dark:bg-gray-100 p-3 rounded">
            <Link href="/inverse" variant="subtle" color="inverse">Inverse Subtle Link</Link>
          </div>
        </div>
      </div>

      {/* Icon Variant */}
      <div class="space-y-4 border-l-4 border-indigo-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Icon Variant</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Optimized for links with icons, providing proper spacing and alignment.</p>
        
        <div class="space-y-3">
          <div>
            <Link 
              href="/external" 
              variant="icon" 
              prefixIcon={<span>🔗</span>}
              external
            >
              External Link with Icon
            </Link>
          </div>
          
          <div>
            <Link 
              href="/download" 
              variant="icon" 
              suffixIcon={<span>⬇️</span>}
            >
              Download File
            </Link>
          </div>
          
          <div>
            <Link 
              href="/settings" 
              variant="icon" 
              prefixIcon={<span>⚙️</span>}
              suffixIcon={<span>➡️</span>}
            >
              Settings Page
            </Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb Variant */}
      <div class="space-y-4 border-l-4 border-yellow-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Breadcrumb Variant</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Designed for breadcrumb navigation with minimal spacing and styling.</p>
        
        <nav class="flex items-center space-x-2 text-sm">
          <Link href="/" variant="breadcrumb" color="secondary">Home</Link>
          <span class="text-gray-400">/</span>
          <Link href="/products" variant="breadcrumb" color="secondary">Products</Link>
          <span class="text-gray-400">/</span>
          <Link href="/products/category" variant="breadcrumb" color="secondary">Category</Link>
          <span class="text-gray-400">/</span>
          <span class="text-gray-900 dark:text-white font-medium">Current Page</span>
        </nav>
      </div>

      {/* Color Variations */}
      <div class="space-y-4 border-l-4 border-pink-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Color Variations</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">All variants support different color schemes.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/primary" color="primary">Primary Color</Link>
          <Link href="/secondary" color="secondary">Secondary Color</Link>
          <Link href="/tertiary" color="tertiary">Tertiary Color</Link>
          <Link href="/accent" color="accent">Accent Color</Link>
          <Link href="/success" color="success">Success Color</Link>
          <Link href="/error" color="error">Error Color</Link>
          <Link href="/warning" color="warning">Warning Color</Link>
          <Link href="/info" color="info">Info Color</Link>
          <Link href="/inherit" color="inherit">Inherit Color</Link>
        </div>
      </div>

      {/* Disabled and Active States */}
      <div class="space-y-4 border-l-4 border-red-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">States</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Links support disabled and active states across all variants.</p>
        
        <div class="space-y-3">
          <div class="flex flex-wrap gap-4">
            <Link href="/normal" variant="button">Normal State</Link>
            <Link href="/active" variant="button" active>Active State</Link>
            <Link href="/disabled" variant="button" disabled>Disabled State</Link>
          </div>
          
          <div class="flex space-x-6">
            <Link href="/nav1" variant="nav">Normal Nav</Link>
            <Link href="/nav2" variant="nav" active>Active Nav</Link>
            <Link href="/nav3" variant="nav" disabled>Disabled Nav</Link>
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Variant Guidelines:</strong>
        </p>
        <ul class="text-sm text-gray-700 dark:text-gray-300 mt-2 space-y-1">
          <li>• <strong>Standard:</strong> Default choice for most content links</li>
          <li>• <strong>Button:</strong> Call-to-action links that need emphasis</li>
          <li>• <strong>Nav:</strong> Primary navigation menu items</li>
          <li>• <strong>Subtle:</strong> Secondary or less important links</li>
          <li>• <strong>Icon:</strong> Links with icons that need proper spacing</li>
          <li>• <strong>Breadcrumb:</strong> Navigation breadcrumbs and hierarchical links</li>
        </ul>
      </div>
    </div>
  );
});

export default VariantsExample;