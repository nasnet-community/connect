import { component$ } from "@builder.io/qwik";
import { Link } from "../Link";

/**
 * Accessibility Example - Demonstrates accessible Link patterns and security features
 */
export const AccessibilityExample = component$(() => {
  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Accessibility & Security</h2>
        
        <p class="text-gray-600 dark:text-gray-400">
          The Link component is built with accessibility and security in mind. This example demonstrates best practices for inclusive and secure link usage.
        </p>
      </div>

      {/* Focus Management */}
      <div class="space-y-4 border-l-4 border-blue-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Keyboard Navigation & Focus</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          All link variants include proper focus indicators and support keyboard navigation.
        </p>
        
        <div class="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            <strong>Try using Tab key to navigate through these links:</strong>
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/standard" variant="standard">Standard Link Focus</Link>
            <Link href="/button" variant="button">Button Link Focus</Link>
            <Link href="/nav" variant="nav">Navigation Link Focus</Link>
            <Link href="/icon" variant="icon" prefixIcon={<span>🔗</span>}>Icon Link Focus</Link>
          </div>
          
          <div class="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Focus rings are visible and meet WCAG contrast requirements
          </div>
        </div>
      </div>

      {/* ARIA Labels and Descriptions */}
      <div class="space-y-4 border-l-4 border-green-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">ARIA Labels & Screen Reader Support</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Proper ARIA attributes help screen readers understand link context and purpose.
        </p>
        
        <div class="space-y-4">
          <div>
            <Link 
              href="/download/report.pdf" 
              ariaLabel="Download annual report PDF, 2.4MB file"
              suffixIcon={<span>⬇️</span>}
            >
              Annual Report
            </Link>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Uses ariaLabel to provide context about file type and size
            </p>
          </div>
          
          <div>
            <Link 
              href="https://example.com" 
              external 
              ariaLabel="Visit Example.com, opens in new tab"
              suffixIcon={<span>↗️</span>}
            >
              External Site
            </Link>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Indicates that link opens in new tab
            </p>
          </div>
          
          <div>
            <Link 
              href="/contact" 
              ariaLabel="Contact us - opens contact form"
              prefixIcon={<span>📧</span>}
            >
              Get in Touch
            </Link>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Clarifies the action that will occur
            </p>
          </div>
          
          <div>
            <Link 
              href="tel:+1-555-123-4567" 
              ariaLabel="Call us at 1-555-123-4567"
              prefixIcon={<span>📞</span>}
            >
              Call Now
            </Link>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Provides the actual phone number for screen readers
            </p>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div class="space-y-4 border-l-4 border-red-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Security Features</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          External links automatically include security attributes to protect users from malicious sites.
        </p>
        
        <div class="space-y-4">
          <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 class="font-medium text-red-900 dark:text-red-200 mb-2">Default Security (Enabled)</h4>
            <div class="space-y-2">
              <Link href="https://example.com" external>
                Secure External Link
              </Link>
              <p class="text-xs text-red-700 dark:text-red-300">
                Automatically includes: rel="noopener noreferrer" target="_blank"
              </p>
            </div>
          </div>
          
          <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 class="font-medium text-yellow-900 dark:text-yellow-200 mb-2">Custom Security Attributes</h4>
            <div class="space-y-2">
              <Link 
                href="https://trusted-partner.com" 
                external 
                rel="noopener" 
                secure={false}
              >
                Trusted Partner Link
              </Link>
              <p class="text-xs text-yellow-700 dark:text-yellow-300">
                Custom rel attribute, security disabled for trusted sites
              </p>
            </div>
          </div>
          
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 class="font-medium text-blue-900 dark:text-blue-200 mb-2">Same Tab External Link</h4>
            <div class="space-y-2">
              <Link 
                href="https://documentation.example.com" 
                external 
                newTab={false}
              >
                Documentation Site
              </Link>
              <p class="text-xs text-blue-700 dark:text-blue-300">
                Opens in same tab but still includes security attributes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Contrast & Visibility */}
      <div class="space-y-4 border-l-4 border-purple-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Color Contrast & Visibility</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          All link colors meet WCAG AA contrast requirements in both light and dark modes.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Light Mode Examples */}
          <div class="p-4 bg-white border border-gray-200 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">Light Mode Contrast</h4>
            <div class="space-y-2">
              <Link href="/primary" color="primary">Primary Link (4.5:1+)</Link>
              <Link href="/secondary" color="secondary">Secondary Link (4.5:1+)</Link>
              <Link href="/success" color="success">Success Link (4.5:1+)</Link>
              <Link href="/error" color="error">Error Link (4.5:1+)</Link>
              <Link href="/warning" color="warning">Warning Link (4.5:1+)</Link>
            </div>
          </div>
          
          {/* Dark Mode Examples */}
          <div class="p-4 bg-gray-900 border border-gray-700 rounded-lg">
            <h4 class="font-medium text-white mb-3">Dark Mode Contrast</h4>
            <div class="space-y-2">
              <Link href="/primary" color="primary">Primary Link (4.5:1+)</Link>
              <Link href="/secondary" color="secondary">Secondary Link (4.5:1+)</Link>
              <Link href="/success" color="success">Success Link (4.5:1+)</Link>
              <Link href="/error" color="error">Error Link (4.5:1+)</Link>
              <Link href="/warning" color="warning">Warning Link (4.5:1+)</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Disabled State Accessibility */}
      <div class="space-y-4 border-l-4 border-gray-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Disabled State Accessibility</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Disabled links are properly marked for assistive technologies and cannot be focused.
        </p>
        
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <Link href="/normal" variant="button">Normal Link</Link>
            <Link href="/disabled" variant="button" disabled>Disabled Link</Link>
          </div>
          
          <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <strong>Disabled Link Behavior:</strong>
            <ul class="mt-1 space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Cannot be focused with keyboard navigation</li>
              <li>• Includes aria-disabled="true" attribute</li>
              <li>• Visual opacity indicates disabled state</li>
              <li>• Click events are prevented</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Touch Targets */}
      <div class="space-y-4 border-l-4 border-orange-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Mobile Touch Targets</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Button and navigation variants provide adequate touch targets for mobile devices (44px minimum).
        </p>
        
        <div class="space-y-4">
          <div class="space-y-2">
            <Link href="/mobile-friendly" variant="button">Mobile-Friendly Button</Link>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Includes padding for 44px minimum touch target
            </p>
          </div>
          
          <div class="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/nav1" variant="nav">Nav Item 1</Link>
            <Link href="/nav2" variant="nav">Nav Item 2</Link>
            <Link href="/nav3" variant="nav">Nav Item 3</Link>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Navigation links have adequate vertical padding for touch
          </p>
        </div>
      </div>

      {/* Skip Links */}
      <div class="space-y-4 border-l-4 border-indigo-500 pl-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Skip Links & Navigation Aids</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Examples of accessibility-focused navigation patterns using the Link component.
        </p>
        
        <div class="space-y-4">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 class="font-medium text-blue-900 dark:text-blue-200 mb-2">Skip Links</h4>
            <div class="space-y-2">
              <Link 
                href="#main-content" 
                variant="button" 
                size="sm"
                class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50"
              >
                Skip to main content
              </Link>
              <p class="text-xs text-blue-700 dark:text-blue-300">
                Hidden until focused - appears when user tabs to it
              </p>
            </div>
          </div>
          
          <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 class="font-medium text-green-900 dark:text-green-200 mb-2">Landmark Navigation</h4>
            <nav aria-label="Quick navigation" class="space-x-4">
              <Link href="#content" variant="subtle" size="sm">Main Content</Link>
              <Link href="#sidebar" variant="subtle" size="sm">Sidebar</Link>
              <Link href="#footer" variant="subtle" size="sm">Footer</Link>
            </nav>
            <p class="text-xs text-green-700 dark:text-green-300 mt-2">
              Links to page landmarks with aria-label on navigation
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>♿ Accessibility Checklist:</strong>
        </p>
        <ul class="text-sm text-gray-700 dark:text-gray-300 mt-2 space-y-1">
          <li>✅ Proper focus indicators with sufficient contrast</li>
          <li>✅ Screen reader support with ARIA labels</li>
          <li>✅ Keyboard navigation compatible</li>
          <li>✅ Color contrast meets WCAG AA standards</li>
          <li>✅ Touch targets meet mobile accessibility guidelines</li>
          <li>✅ Security attributes for external links</li>
          <li>✅ Proper disabled state handling</li>
          <li>✅ Semantic HTML and link relationships</li>
        </ul>
      </div>
    </div>
  );
});

export default AccessibilityExample;