import { component$ } from "@builder.io/qwik";

/**
 * Usage documentation for ThemeToggle component
 */
export const ThemeToggleUsage = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">ThemeToggle Usage Guidelines</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Best practices and guidelines for implementing the ThemeToggle component effectively 
          in your application.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Installation & Import</h3>
        <div class="space-y-4">
          <div>
            <h4 class="mb-2 text-lg font-medium">Import the Component</h4>
            <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`import { ThemeToggle } from "~/components/Core/foundation";

// Or import the type as well
import { ThemeToggle, type Theme } from "~/components/Core/foundation";`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 class="mb-2 text-lg font-medium">Basic Implementation</h4>
            <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`export default component$(() => {
  return (
    <div>
      <header class="flex items-center justify-between p-4">
        <h1>My App</h1>
        <ThemeToggle />
      </header>
      <main>{/* Your content */}</main>
    </div>
  );
});`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Positioning Guidelines</h3>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-950">
            <h4 class="mb-2 text-lg font-medium text-success-900 dark:text-success-100">
              ✓ Recommended Locations
            </h4>
            <ul class="space-y-2 text-sm text-success-800 dark:text-success-200">
              <li>• Top navigation bar (header)</li>
              <li>• Settings or preferences page</li>
              <li>• User profile dropdown menu</li>
              <li>• Application toolbar</li>
              <li>• Dashboard control panel</li>
              <li>• Sidebar navigation (if persistent)</li>
            </ul>
          </div>

          <div class="rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-950">
            <h4 class="mb-2 text-lg font-medium text-warning-900 dark:text-warning-100">
              ⚠ Avoid These Locations
            </h4>
            <ul class="space-y-2 text-sm text-warning-800 dark:text-warning-200">
              <li>• Within main content areas</li>
              <li>• Form fields or input areas</li>
              <li>• Footer areas (too far from content)</li>
              <li>• Overlapping with important CTAs</li>
              <li>• Hidden behind multiple clicks</li>
              <li>• Context menus or tooltips</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Styling Best Practices</h3>
        <div class="space-y-6">
          <div>
            <h4 class="mb-3 text-lg font-medium">Container Styling</h4>
            <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// Basic container styling
<ThemeToggle class="ml-auto" />

// With border and padding
<ThemeToggle class="rounded-lg border border-neutral-200 p-1 dark:border-neutral-700" />

// With background
<ThemeToggle class="rounded-md bg-neutral-100 p-2 dark:bg-neutral-800" />`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-lg font-medium">Button Styling</h4>
            <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// Minimal button styling
<ThemeToggle buttonClass="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800" />

// Enhanced button with focus ring
<ThemeToggle buttonClass="p-3 rounded-lg hover:bg-neutral-100 focus:ring-2 focus:ring-primary-500 dark:hover:bg-neutral-800" />

// Mobile-optimized touch target (minimum 44px)
<ThemeToggle buttonClass="touch-manipulation p-3 min-h-[44px] min-w-[44px] rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Mobile & Responsive Considerations</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-950">
            <h4 class="mb-2 text-lg font-medium text-info-900 dark:text-info-100">
              📱 Mobile Guidelines
            </h4>
            <ul class="space-y-2 text-sm text-info-800 dark:text-info-200">
              <li>
                <strong>Touch Target Size:</strong> Ensure minimum 44px×44px touch area for accessibility
              </li>
              <li>
                <strong>Positioning:</strong> Place in easily reachable areas (typically top-right)
              </li>
              <li>
                <strong>Visual Weight:</strong> Use appropriate contrast without overwhelming other UI elements
              </li>
              <li>
                <strong>Loading States:</strong> Consider adding loading indicators for slow networks
              </li>
            </ul>
          </div>

          <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
            <h5 class="mb-2 font-medium">Responsive Implementation Example</h5>
            <pre class="text-sm">
              <code>{`// Responsive layout with theme toggle
<header class="flex items-center justify-between p-4">
  <div class="flex items-center space-x-2">
    <button class="md:hidden">☰</button>
    <h1 class="text-lg md:text-xl">App Name</h1>
  </div>
  
  <div class="flex items-center space-x-2">
    {/* Hide label on small screens */}
    <span class="hidden text-sm md:inline">Theme:</span>
    <ThemeToggle buttonClass="p-2 md:p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
  </div>
</header>`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Accessibility Implementation</h3>
        <div class="space-y-4">
          <div>
            <h4 class="mb-2 text-lg font-medium">Built-in Accessibility Features</h4>
            <ul class="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
                <span>Automatic ARIA labels describing current theme and available actions</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
                <span>Keyboard navigation support (Space/Enter to toggle)</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
                <span>Respects prefers-reduced-motion for transition animations</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
                <span>Clear visual focus indicators</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="mb-2 text-lg font-medium">Additional Accessibility Enhancements</h4>
            <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// Enhanced accessibility with custom focus styles
<ThemeToggle buttonClass="p-3 rounded-lg hover:bg-neutral-100 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-900" />

// With descriptive wrapper for screen readers
<div role="group" aria-labelledby="theme-control-label">
  <span id="theme-control-label" class="sr-only">
    Theme preference controls
  </span>
  <ThemeToggle />
</div>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Performance Considerations</h3>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h4 class="mb-2 text-lg font-medium">Optimization Tips</h4>
            <ul class="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Component is lightweight with minimal JavaScript</li>
              <li>• Uses efficient localStorage for persistence</li>
              <li>• Transitions respect user motion preferences</li>
              <li>• No external dependencies required</li>
              <li>• Minimal DOM manipulation for theme changes</li>
            </ul>
          </div>

          <div>
            <h4 class="mb-2 text-lg font-medium">Loading Considerations</h4>
            <ul class="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Initialize with system preference as fallback</li>
              <li>• Handle localStorage being unavailable gracefully</li>
              <li>• Prevent flash of unstyled content (FOUC)</li>
              <li>• Consider SSR implications for theme state</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Common Integration Patterns</h3>
        <div class="space-y-6">
          <div>
            <h4 class="mb-3 text-lg font-medium">With Navigation Bar</h4>
            <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// Common header pattern
<header class="border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div class="flex items-center">
        <Logo />
        <Navigation />
      </div>
      <div class="flex items-center space-x-4">
        <UserMenu />
        <ThemeToggle />
      </div>
    </div>
  </div>
</header>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-lg font-medium">With Settings Form</h4>
            <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// Settings page integration
<form class="space-y-6">
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <div>
      <label>Language</label>
      <select>{/* Language options */}</select>
    </div>
    
    <div>
      <label>Theme Preference</label>
      <div class="flex items-center justify-between">
        <span class="text-sm text-neutral-600">
          Choose your preferred theme
        </span>
        <ThemeToggle />
      </div>
    </div>
  </div>
</form>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Testing Guidelines</h3>
        <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
          <h4 class="mb-3 text-lg font-medium">Manual Testing Checklist</h4>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <h5 class="mb-2 font-medium text-neutral-900 dark:text-neutral-100">Functionality</h5>
              <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                <li>□ Theme cycles correctly (system → light → dark)</li>
                <li>□ Preference persists after page reload</li>
                <li>□ System preference detection works</li>
                <li>□ Multiple instances stay synchronized</li>
              </ul>
            </div>
            <div>
              <h5 class="mb-2 font-medium text-neutral-900 dark:text-neutral-100">Accessibility</h5>
              <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                <li>□ Keyboard navigation works</li>
                <li>□ Screen reader announces changes</li>
                <li>□ Focus indicators are visible</li>
                <li>□ Touch targets are adequate (44px+)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-warning-200 bg-warning-50 p-6 dark:border-warning-800 dark:bg-warning-950">
        <h3 class="mb-2 text-lg font-medium text-warning-900 dark:text-warning-100">
          ⚠️ Important Notes
        </h3>
        <ul class="space-y-2 text-sm text-warning-800 dark:text-warning-200">
          <li>
            • The component requires your app to use Tailwind CSS with dark mode configured
          </li>
          <li>
            • Ensure GlobalStyles component is included for optimal theme transitions
          </li>
          <li>
            • Test thoroughly across different browsers and devices
          </li>
          <li>
            • Consider providing a way for users to override system preferences
          </li>
        </ul>
      </div>
    </div>
  );
});

export default ThemeToggleUsage;