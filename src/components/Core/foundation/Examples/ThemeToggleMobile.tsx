import { component$ } from "@builder.io/qwik";
import { ThemeToggle } from "../ThemeToggle";

/**
 * Mobile-optimized ThemeToggle examples
 */
export const ThemeToggleMobile = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h3 class="mb-4 text-xl font-semibold">Mobile-Optimized Theme Toggle</h3>
        <p class="mb-6 text-neutral-600 dark:text-neutral-400">
          Examples showing how to optimize ThemeToggle for mobile devices with proper touch targets,
          positioning, and responsive behavior.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Touch Target Optimization</h3>
        <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          Mobile interfaces require minimum 44px touch targets for accessibility. Here are examples
          of properly sized mobile touch targets:
        </p>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex flex-wrap items-center justify-center gap-8">
            <div class="text-center">
              <ThemeToggle buttonClass="touch-manipulation min-h-[44px] min-w-[44px] p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">44px Minimum</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="touch-manipulation min-h-[48px] min-w-[48px] p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">48px Comfortable</p>
            </div>
            <div class="text-center">
              <ThemeToggle buttonClass="touch-manipulation min-h-[56px] min-w-[56px] p-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800" />
              <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">56px Large</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Minimum touch target (44px)
<ThemeToggle buttonClass="touch-manipulation min-h-[44px] min-w-[44px] p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />

// Comfortable touch target (48px)
<ThemeToggle buttonClass="touch-manipulation min-h-[48px] min-w-[48px] p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />

// Large touch target (56px)
<ThemeToggle buttonClass="touch-manipulation min-h-[56px] min-w-[56px] p-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Mobile Navigation Integration</h3>
        <div class="mb-6">
          <h4 class="mb-3 text-lg font-medium">Top Navigation Bar</h4>
          <div class="mx-auto max-w-sm rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
            <header class="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-700">
              <div class="flex items-center space-x-3">
                <button class="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 class="text-lg font-semibold">App</h1>
              </div>
              <ThemeToggle buttonClass="touch-manipulation min-h-[44px] min-w-[44px] p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
            </header>
            <div class="p-4">
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Mobile navigation with theme toggle in the top-right corner.
              </p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`<header class="flex items-center justify-between p-4">
  <div class="flex items-center space-x-3">
    <button class="p-2">☰</button>
    <h1>App</h1>
  </div>
  <ThemeToggle buttonClass="touch-manipulation min-h-[44px] min-w-[44px] p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
</header>`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Bottom Navigation Integration</h3>
        <div class="mb-6">
          <div class="mx-auto max-w-sm rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
            <div class="p-4">
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Mobile app with bottom navigation including theme toggle.
              </p>
            </div>
            <nav class="border-t border-neutral-200 p-2 dark:border-neutral-700">
              <div class="flex items-center justify-around">
                <button class="flex flex-col items-center p-2 text-neutral-600 dark:text-neutral-400">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  <span class="text-xs">Home</span>
                </button>
                <button class="flex flex-col items-center p-2 text-neutral-600 dark:text-neutral-400">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span class="text-xs">Search</span>
                </button>
                <button class="flex flex-col items-center p-2 text-neutral-600 dark:text-neutral-400">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="text-xs">Profile</span>
                </button>
                <div class="flex flex-col items-center p-2">
                  <ThemeToggle buttonClass="touch-manipulation min-h-[32px] min-w-[32px] p-1 rounded" />
                  <span class="text-xs text-neutral-600 dark:text-neutral-400">Theme</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`<nav class="bottom-navigation">
  <div class="flex items-center justify-around">
    <button>Home</button>
    <button>Search</button>
    <button>Profile</button>
    <div class="flex flex-col items-center">
      <ThemeToggle buttonClass="touch-manipulation min-h-[32px] min-w-[32px] p-1 rounded" />
      <span class="text-xs">Theme</span>
    </div>
  </div>
</nav>`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Floating Action Button Style</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="relative h-48">
            <div class="absolute bottom-4 right-4">
              <ThemeToggle buttonClass="touch-manipulation min-h-[56px] min-w-[56px] rounded-full bg-primary-500 p-3 text-white shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all" />
            </div>
            <div class="p-4">
              <h4 class="mb-2 text-lg font-medium">Floating Theme Toggle</h4>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                A floating action button style theme toggle positioned in the bottom-right corner.
              </p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Floating Action Button
<div class="fixed bottom-4 right-4">
  <ThemeToggle buttonClass="touch-manipulation min-h-[56px] min-w-[56px] rounded-full bg-primary-500 p-3 text-white shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all" />
</div>`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Responsive Layout Example</h3>
        <div class="mb-6">
          <div class="mx-auto max-w-md rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
            <header class="border-b border-neutral-200 p-4 dark:border-neutral-700">
              <div class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div class="text-center sm:text-left">
                  <h2 class="text-lg font-semibold">Dashboard</h2>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    Welcome back!
                  </p>
                </div>
                <div class="flex items-center justify-center space-x-2 sm:justify-end">
                  <span class="hidden text-sm text-neutral-600 sm:inline dark:text-neutral-400">
                    Theme:
                  </span>
                  <ThemeToggle buttonClass="touch-manipulation min-h-[44px] min-w-[44px] p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
                </div>
              </div>
            </header>
            <div class="p-4">
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                This layout adapts from single column on mobile to two columns on larger screens.
              </p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`<div class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
  <div class="text-center sm:text-left">
    <h2>Dashboard</h2>
    <p>Welcome back!</p>
  </div>
  <div class="flex items-center justify-center space-x-2 sm:justify-end">
    <span class="hidden text-sm sm:inline">Theme:</span>
    <ThemeToggle buttonClass="touch-manipulation min-h-[44px] min-w-[44px] p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
  </div>
</div>`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Mobile Settings Integration</h3>
        <div class="mb-6">
          <div class="mx-auto max-w-sm rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
            <div class="p-4">
              <h3 class="mb-4 text-lg font-semibold">Settings</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between py-3">
                  <div>
                    <div class="text-sm font-medium">Notifications</div>
                    <div class="text-xs text-neutral-500 dark:text-neutral-400">
                      Push notifications
                    </div>
                  </div>
                  <input type="checkbox" class="rounded" />
                </div>
                <div class="flex items-center justify-between py-3">
                  <div>
                    <div class="text-sm font-medium">Location</div>
                    <div class="text-xs text-neutral-500 dark:text-neutral-400">
                      Location services
                    </div>
                  </div>
                  <input type="checkbox" checked class="rounded" />
                </div>
                <div class="flex items-center justify-between py-3">
                  <div>
                    <div class="text-sm font-medium">Theme</div>
                    <div class="text-xs text-neutral-500 dark:text-neutral-400">
                      App appearance
                    </div>
                  </div>
                  <ThemeToggle buttonClass="touch-manipulation min-h-[44px] min-w-[44px] p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`<div class="settings-list">
  <div class="flex items-center justify-between py-3">
    <div>
      <div class="text-sm font-medium">Theme</div>
      <div class="text-xs text-neutral-500">App appearance</div>
    </div>
    <ThemeToggle buttonClass="touch-manipulation min-h-[44px] min-w-[44px] p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
  </div>
</div>`}</code>
          </pre>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-warning-200 bg-warning-50 p-6 dark:border-warning-800 dark:bg-warning-950">
        <h3 class="mb-2 text-lg font-medium text-warning-900 dark:text-warning-100">
          📱 Mobile Best Practices
        </h3>
        <ul class="space-y-2 text-sm text-warning-800 dark:text-warning-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Touch Targets:</strong> Always use minimum 44px × 44px touch areas</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Touch Manipulation:</strong> Include <code>touch-manipulation</code> CSS class</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Positioning:</strong> Place in easy-to-reach areas (typically top-right or bottom navigation)</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Visual Feedback:</strong> Provide clear hover/press states for touch interactions</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Spacing:</strong> Ensure adequate spacing around the toggle to prevent accidental taps</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default ThemeToggleMobile;