import { component$ } from "@builder.io/qwik";

/**
 * Usage guidelines and best practices for GlobalStyles component
 */
export const GlobalStylesUsage = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">GlobalStyles Usage Guidelines</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Best practices and implementation guidelines for the GlobalStyles component to ensure 
          optimal performance, accessibility, and user experience.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Basic Implementation</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-success-200 bg-success-50 p-6 dark:border-success-800 dark:bg-success-950">
            <h4 class="mb-3 text-lg font-medium text-success-900 dark:text-success-100">
              ✅ Recommended Setup
            </h4>
            <div class="space-y-3">
              <div class="rounded bg-white p-3 dark:bg-neutral-800">
                <pre class="text-sm">
                  <code>{`// src/root.tsx or your main layout component
import { component$ } from "@builder.io/qwik";
import { GlobalStyles } from "~/components/Core/foundation";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <GlobalStyles />
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        {/* Other head elements */}
      </head>
      <body lang="en">
        <QwikCityMockProvider>
          <RouterOutlet />
        </QwikCityMockProvider>
      </body>
    </QwikCityProvider>
  );
});`}</code>
                </pre>
              </div>
              <p class="text-sm text-success-800 dark:text-success-200">
                Place GlobalStyles in the head section of your root component for application-wide coverage.
              </p>
            </div>
          </div>

          <div class="rounded-lg border border-error-200 bg-error-50 p-6 dark:border-error-800 dark:bg-error-950">
            <h4 class="mb-3 text-lg font-medium text-error-900 dark:text-error-100">
              ❌ Common Mistakes
            </h4>
            <div class="space-y-3">
              <div class="rounded bg-white p-3 dark:bg-neutral-800">
                <pre class="text-sm">
                  <code>{`// DON'T: Include GlobalStyles multiple times
<head>
  <GlobalStyles />
</head>
<body>
  <GlobalStyles /> {/* ❌ Duplicate - causes style conflicts */}
</body>

// DON'T: Include in individual components  
export const MyComponent = component$(() => {
  return (
    <div>
      <GlobalStyles /> {/* ❌ Should be in root only */}
      <p>Component content</p>
    </div>
  );
});`}</code>
                </pre>
              </div>
              <p class="text-sm text-error-800 dark:text-error-200">
                Avoid multiple inclusions or component-level usage to prevent style conflicts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Theme Integration</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Smooth Theme Transitions</h4>
            <div class="space-y-4">
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <pre class="text-sm">
                  <code>{`// Enable smooth theme transitions
const enableThemeTransitions = () => {
  document.documentElement.classList.add('transition-theme');
};

const disableThemeTransitions = () => {
  document.documentElement.classList.remove('transition-theme');
};

// Theme switching with transitions
const toggleTheme = () => {
  enableThemeTransitions();
  
  // Toggle dark mode
  document.documentElement.classList.toggle('dark');
  
  // Remove transition class after animation completes
  setTimeout(() => {
    disableThemeTransitions();
  }, 300);
};`}</code>
                </pre>
              </div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">
                Use the transition-theme class for smooth color changes during theme switches.
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Custom Transition Speeds</h4>
            <div class="grid gap-4 md:grid-cols-3">
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">Fast (150ms)</div>
                <pre class="text-xs">
                  <code>{`<div class="fast-transition">
  Quick UI changes
</div>`}</code>
                </pre>
              </div>
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">Medium (300ms)</div>
                <pre class="text-xs">
                  <code>{`<div class="medium-transition">
  Standard transitions
</div>`}</code>
                </pre>
              </div>
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">Slow (500ms)</div>
                <pre class="text-xs">
                  <code>{`<div class="slow-transition">
  Deliberate animations
</div>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Accessibility Best Practices</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Focus Management</h4>
            <div class="space-y-4">
              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <div class="mb-2 text-sm font-medium text-success-700 dark:text-success-300">✅ Do</div>
                  <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• Rely on automatic focus states</li>
                    <li>• Test with keyboard navigation</li>
                    <li>• Ensure focus visibility in all themes</li>
                    <li>• Use semantic HTML elements</li>
                  </ul>
                </div>
                <div>
                  <div class="mb-2 text-sm font-medium text-error-700 dark:text-error-300">❌ Don't</div>
                  <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• Override focus styles unnecessarily</li>
                    <li>• Remove outline completely</li>
                    <li>• Use non-interactive elements as buttons</li>
                    <li>• Ignore keyboard navigation testing</li>
                  </ul>
                </div>
              </div>
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <pre class="text-sm">
                  <code>{`// ✅ Good: Let GlobalStyles handle focus states
<button>Interactive element</button>

// ❌ Bad: Removing focus styles
<button style="outline: none !important;">Bad button</button>

// ✅ Good: Enhanced focus with additional styling
<button class="ring-offset-2 focus:ring-2 focus:ring-primary-500">
  Custom enhanced focus
</button>`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Motion Sensitivity</h4>
            <div class="space-y-4">
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <pre class="text-sm">
                  <code>{`// GlobalStyles automatically respects motion preferences
// Your animations should also check user preferences

// ✅ Good: Motion-safe animations
<div class="motion-safe:animate-pulse">
  Only animates if motion is safe
</div>

// ✅ Good: Alternative feedback for reduced motion
<div class="motion-safe:animate-spin motion-reduce:bg-warning-500">
  Spinner or color change
</div>

// ❌ Bad: Forced animations ignoring preferences
<div class="animate-bounce">
  Always animates regardless of preferences
</div>`}</code>
                </pre>
              </div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">
                Always provide alternative feedback for users with reduced motion preferences.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Internationalization Support</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">RTL Language Implementation</h4>
            <div class="space-y-4">
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <pre class="text-sm">
                  <code>{`// Set document direction based on language
const setLanguageDirection = (locale: string) => {
  const rtlLanguages = ['ar', 'fa', 'he', 'ur'];
  const isRTL = rtlLanguages.includes(locale);
  
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = locale;
};

// Usage in your app
export default component$(() => {
  // Get current locale from your i18n system
  const locale = useLocale();
  
  useVisibleTask$(() => {
    setLanguageDirection(locale.value);
  });
  
  return (
    <html dir={isRTL ? 'rtl' : 'ltr'} lang={locale.value}>
      <head>
        <GlobalStyles />
      </head>
      <body>
        {/* App content */}
      </body>
    </html>
  );
});`}</code>
                </pre>
              </div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">
                GlobalStyles automatically adjusts layouts when dir="rtl" is set on the html element.
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Mixed Language Content</h4>
            <div class="space-y-4">
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <pre class="text-sm">
                  <code>{`// Handle mixed content properly
<div dir="ltr"> {/* Main content in LTR */}
  <p>English paragraph with normal left-to-right flow.</p>
  
  <blockquote dir="rtl"> {/* Embedded RTL content */}
    هذا اقتباس باللغة العربية داخل محتوى إنجليزي
  </blockquote>
  
  <p>
    Mixed paragraph with 
    <span dir="rtl">نص عربي</span> 
    embedded in English text.
  </p>
</div>`}</code>
                </pre>
              </div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">
                Use the dir attribute at element level for mixed language content.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Performance Optimization</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Transition Performance</h4>
            <div class="space-y-4">
              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <div class="mb-2 text-sm font-medium text-success-700 dark:text-success-300">✅ Optimized Properties</div>
                  <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• background-color</li>
                    <li>• border-color</li>
                    <li>• color</li>
                    <li>• opacity</li>
                    <li>• box-shadow</li>
                    <li>• transform</li>
                  </ul>
                </div>
                <div>
                  <div class="mb-2 text-sm font-medium text-warning-700 dark:text-warning-300">⚠️ Avoid Animating</div>
                  <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• width/height</li>
                    <li>• padding/margin</li>
                    <li>• top/left/right/bottom</li>
                    <li>• font-size</li>
                    <li>• border-width</li>
                  </ul>
                </div>
              </div>
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <pre class="text-sm">
                  <code>{`// ✅ Good: Animate optimized properties
<button class="transition-colors hover:bg-primary-600">
  Efficient color transition
</button>

// ✅ Good: Use transform for movement
<div class="transition-transform hover:scale-105">
  Efficient scaling
</div>

// ❌ Bad: Animating layout properties
<div class="transition-all hover:w-full hover:h-full">
  Causes layout thrashing
</div>`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Scroll Performance</h4>
            <div class="space-y-4">
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <pre class="text-sm">
                  <code>{`// GlobalStyles optimizes scrolling automatically
// For custom scroll containers, use these patterns:

// ✅ Good: Hardware-accelerated scrolling
<div class="overflow-auto transform-gpu">
  Long scrollable content
</div>

// ✅ Good: Efficient scroll snapping
<div class="overflow-x-auto snap-x snap-mandatory">
  <div class="snap-center">Item 1</div>
  <div class="snap-center">Item 2</div>
</div>

// ⚠️ Be careful with scroll event listeners
const handleScroll = throttle(() => {
  // Throttled scroll handler
}, 16); // 60fps`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Testing and Validation</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Manual Testing Checklist</h4>
            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <div class="mb-3 text-sm font-medium">Accessibility Testing</div>
                <div class="space-y-2 text-sm">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded" />
                    <span>Tab through all interactive elements</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded" />
                    <span>Test focus visibility in both themes</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded" />
                    <span>Verify ARIA label support</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded" />
                    <span>Test with screen reader</span>
                  </label>
                </div>
              </div>
              <div>
                <div class="mb-3 text-sm font-medium">Cross-Browser Testing</div>
                <div class="space-y-2 text-sm">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded" />
                    <span>Chrome (WebKit scrollbars)</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded" />
                    <span>Firefox (Firefox scrollbars)</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded" />
                    <span>Safari (WebKit behaviors)</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded" />
                    <span>Mobile browsers</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Automated Testing</h4>
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// Example test for GlobalStyles integration
import { test, expect } from '@playwright/test';

test('GlobalStyles provides enhanced focus states', async ({ page }) => {
  await page.goto('/');
  
  // Test keyboard navigation
  await page.keyboard.press('Tab');
  
  // Check focus ring visibility
  const focusedElement = await page.locator(':focus');
  await expect(focusedElement).toHaveCSS('outline', '2px solid rgb(73, 114, 186)');
});

test('Theme transitions work smoothly', async ({ page }) => {
  await page.goto('/');
  
  // Enable transition mode
  await page.evaluate(() => {
    document.documentElement.classList.add('transition-theme');
  });
  
  // Toggle theme
  await page.evaluate(() => {
    document.documentElement.classList.toggle('dark');
  });
  
  // Check transition properties
  const body = await page.locator('body');
  await expect(body).toHaveCSS('transition-duration', '300ms');
});`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-info-200 bg-info-50 p-6 dark:border-info-800 dark:bg-info-950">
        <h3 class="mb-2 text-lg font-medium text-info-900 dark:text-info-100">
          💡 Key Takeaways
        </h3>
        <ul class="space-y-2 text-sm text-info-800 dark:text-info-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span><strong>Single Instance:</strong> Include GlobalStyles only once in your root layout</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span><strong>Automatic Benefits:</strong> Most enhancements work without additional classes</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span><strong>Test Thoroughly:</strong> Verify accessibility and cross-browser compatibility</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span><strong>Performance First:</strong> Use optimized transition properties and respect motion preferences</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default GlobalStylesUsage;