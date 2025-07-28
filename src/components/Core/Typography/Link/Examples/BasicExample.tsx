import { component$ } from "@builder.io/qwik";
import { Link } from "../Link";

/**
 * Basic Example - Demonstrates fundamental Link usage for internal and external links
 */
export const BasicExample = component$(() => {
  return (
    <div class="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Basic Link Usage</h2>
        
        <p class="text-gray-600 dark:text-gray-400">
          This example demonstrates the fundamental usage of the Link component for both internal navigation and external links.
        </p>
      </div>

      {/* Internal Links */}
      <div class="space-y-4 border-l-4 border-blue-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Internal Links</h3>
        
        <div class="space-y-3">
          <div>
            <Link href="/about">About Us</Link>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Standard internal link with hover underline</p>
          </div>
          
          <div>
            <Link href="/contact" underline="always">Contact Page</Link>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Internal link with permanent underline</p>
          </div>
          
          <div>
            <Link href="/services" underline="none">Our Services</Link>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Internal link without underline</p>
          </div>
          
          <div>
            <Link href="/portfolio" underline="animate">View Portfolio</Link>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Internal link with animated underline effect</p>
          </div>
        </div>
      </div>

      {/* External Links */}
      <div class="space-y-4 border-l-4 border-green-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">External Links</h3>
        
        <div class="space-y-3">
          <div>
            <Link href="https://qwik.dev" external>Qwik Framework</Link>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">External link (opens in new tab with security attributes)</p>
          </div>
          
          <div>
            <Link href="https://github.com" external newTab={false}>GitHub</Link>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">External link that opens in same tab</p>
          </div>
          
          <div>
            <Link href="mailto:hello@example.com">Send Email</Link>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Email link (auto-detected as external)</p>
          </div>
          
          <div>
            <Link href="tel:+1234567890">Call Us</Link>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Phone link (auto-detected as external)</p>
          </div>
        </div>
      </div>

      {/* Text Sizes */}
      <div class="space-y-4 border-l-4 border-purple-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Different Sizes</h3>
        
        <div class="space-y-3">
          <div><Link href="/page" size="xs">Extra Small Link</Link></div>
          <div><Link href="/page" size="sm">Small Link</Link></div>
          <div><Link href="/page" size="base">Base Link (Default)</Link></div>
          <div><Link href="/page" size="lg">Large Link</Link></div>
          <div><Link href="/page" size="xl">Extra Large Link</Link></div>
        </div>
      </div>

      {/* Font Weights */}
      <div class="space-y-4 border-l-4 border-orange-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Different Weights</h3>
        
        <div class="space-y-3">
          <div><Link href="/page" weight="normal">Normal Weight</Link></div>
          <div><Link href="/page" weight="medium">Medium Weight (Default)</Link></div>
          <div><Link href="/page" weight="semibold">Semibold Weight</Link></div>
          <div><Link href="/page" weight="bold">Bold Weight</Link></div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Tips:</strong>
        </p>
        <ul class="text-sm text-gray-700 dark:text-gray-300 mt-2 space-y-1">
          <li>• Internal links use Qwik's router for fast client-side navigation</li>
          <li>• External links automatically get security attributes (rel="noopener noreferrer")</li>
          <li>• Email and phone links are auto-detected as external</li>
          <li>• Hover states and focus states are built-in for accessibility</li>
        </ul>
      </div>
    </div>
  );
});

export default BasicExample;