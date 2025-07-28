import { component$ } from "@builder.io/qwik";
import { GlobalStyles } from "../GlobalStyles";

/**
 * Overview documentation for GlobalStyles component
 */
export const GlobalStylesOverview = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">GlobalStyles Overview</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          GlobalStyles is a foundational component that provides essential CSS styles extending 
          Tailwind's preflight. It ensures consistent behavior across browsers, devices, and themes 
          while maintaining accessibility and performance standards.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Live Component</h3>
        <div class="rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="text-center">
            <GlobalStyles />
            <div class="rounded-lg bg-neutral-50 p-6 dark:bg-neutral-800">
              <div class="mb-4 text-lg font-medium">GlobalStyles Active</div>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                The GlobalStyles component is now active and providing enhanced styles throughout this page.
                Notice the improved focus states, scrollbar styling, and typography consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Key Features</h3>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">🎯</div>
            <h4 class="mb-2 text-lg font-medium">Enhanced Focus States</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Provides enhanced keyboard navigation with proper focus-visible states 
              for better accessibility compliance.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">🌙</div>
            <h4 class="mb-2 text-lg font-medium">Dark Mode Ready</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Complete dark mode support with proper color transitions, 
              scrollbar theming, and text color inheritance.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">🌍</div>
            <h4 class="mb-2 text-lg font-medium">RTL Language Support</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Built-in support for Arabic, Persian, and other RTL languages 
              with proper spacing and layout adjustments.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">⚡</div>
            <h4 class="mb-2 text-lg font-medium">Performance Optimized</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Optimized CSS selectors and transitions that respect 
              user motion preferences for better performance.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">🔧</div>
            <h4 class="mb-2 text-lg font-medium">Browser Consistency</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Fixes browser inconsistencies for autofill, scrollbars, 
              form elements, and mobile interactions.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">📝</div>
            <h4 class="mb-2 text-lg font-medium">Typography Foundation</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Semantic heading hierarchy, proper line heights, 
              and text utility classes for consistent typography.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Implementation Example</h3>
        <div class="space-y-4">
          <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
            <h4 class="mb-3 text-lg font-medium">Basic Setup</h4>
            <pre class="text-sm">
              <code>{`import { GlobalStyles } from "~/components/Core/foundation";

export default component$(() => {
  return (
    <html>
      <head>
        <GlobalStyles />
        {/* Other head elements */}
      </head>
      <body>
        {/* Your app content */}
      </body>
    </html>
  );
});`}</code>
            </pre>
          </div>

          <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
            <h4 class="mb-3 text-lg font-medium">With Theme Transitions</h4>
            <pre class="text-sm">
              <code>{`// Enable smooth theme transitions
document.documentElement.classList.add('transition-theme');

// Your theme switching logic
const toggleTheme = () => {
  document.documentElement.classList.toggle('dark');
  
  // Remove transition class after animation
  setTimeout(() => {
    document.documentElement.classList.remove('transition-theme');
  }, 300);
};`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Style Categories</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Foundation Styles</h4>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <div class="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">Box Model</div>
                <ul class="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                  <li>• Box-sizing: border-box</li>
                  <li>• Element resets</li>
                  <li>• Layout optimizations</li>
                </ul>
              </div>
              <div>
                <div class="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">Typography</div>
                <ul class="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                  <li>• Heading hierarchy</li>
                  <li>• Font rendering</li>
                  <li>• Text utilities</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Accessibility Enhancements</h4>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <div class="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">Focus Management</div>
                <ul class="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                  <li>• Focus-visible support</li>
                  <li>• Custom focus rings</li>
                  <li>• Keyboard navigation</li>
                </ul>
              </div>
              <div>
                <div class="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">Motion Preferences</div>
                <ul class="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                  <li>• Reduced motion support</li>
                  <li>• Smooth scrolling</li>
                  <li>• Animation controls</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Cross-Browser Support</h4>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <div class="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">WebKit/Blink</div>
                <ul class="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                  <li>• Custom scrollbars</li>
                  <li>• Autofill styling</li>
                  <li>• Input spinners</li>
                </ul>
              </div>
              <div>
                <div class="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">Firefox</div>
                <ul class="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                  <li>• Scrollbar theming</li>
                  <li>• Form consistency</li>
                  <li>• Number inputs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Integration Benefits</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-950">
            <h4 class="mb-2 text-lg font-medium text-success-900 dark:text-success-100">
              ✅ With GlobalStyles
            </h4>
            <ul class="space-y-1 text-sm text-success-800 dark:text-success-200">
              <li>• Consistent focus states across all elements</li>
              <li>• Smooth theme transitions</li>
              <li>• Proper RTL language support</li>
              <li>• Enhanced scrollbar appearance</li>
              <li>• Cross-browser form consistency</li>
              <li>• Accessible keyboard navigation</li>
            </ul>
          </div>

          <div class="rounded-lg border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-950">
            <h4 class="mb-2 text-lg font-medium text-error-900 dark:text-error-100">
              ❌ Without GlobalStyles
            </h4>
            <ul class="space-y-1 text-sm text-error-800 dark:text-error-200">
              <li>• Inconsistent browser default styles</li>
              <li>• Poor focus visibility</li>
              <li>• Jarring theme switches</li>
              <li>• Broken RTL layouts</li>
              <li>• Ugly default scrollbars</li>
              <li>• Accessibility compliance issues</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Performance Impact</h3>
        <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
          <div class="grid gap-4 md:grid-cols-3">
            <div class="text-center">
              <div class="mb-2 text-2xl font-bold text-primary-600 dark:text-primary-400">~2KB</div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">Gzipped Size</div>
            </div>
            <div class="text-center">
              <div class="mb-2 text-2xl font-bold text-success-600 dark:text-success-400">0ms</div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">Runtime Overhead</div>
            </div>
            <div class="text-center">
              <div class="mb-2 text-2xl font-bold text-info-600 dark:text-info-400">CSS Only</div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">No JavaScript</div>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-info-200 bg-info-50 p-6 dark:border-info-800 dark:bg-info-950">
        <h3 class="mb-2 text-lg font-medium text-info-900 dark:text-info-100">
          💡 Best Practices
        </h3>
        <ul class="space-y-2 text-sm text-info-800 dark:text-info-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Include GlobalStyles in your root layout component for application-wide benefits</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Use the transition-theme class on document.documentElement for smooth theme changes</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Test your application with GlobalStyles to ensure compatibility with your custom styles</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Leverage the provided utility classes (.truncate, .line-clamp-*) for text management</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default GlobalStylesOverview;