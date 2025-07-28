import { component$ } from "@builder.io/qwik";
import { ThemeToggle } from "../ThemeToggle";

/**
 * Examples documentation for ThemeToggle component
 */
export const ThemeToggleExamples = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">ThemeToggle Examples</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Comprehensive examples showing different use cases and styling options for the ThemeToggle component.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Basic Usage</h3>
        <div class="mb-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`<ThemeToggle />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Header Navigation</h3>
        <div class="mb-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <header class="flex items-center justify-between rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
            <div class="flex items-center space-x-4">
              <h1 class="text-xl font-semibold">My Application</h1>
              <nav class="hidden space-x-4 md:flex">
                <a href="#" class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                  Home
                </a>
                <a href="#" class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                  About
                </a>
                <a href="#" class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                  Contact
                </a>
              </nav>
            </div>
            <div class="flex items-center space-x-3">
              <button class="rounded-md px-3 py-1.5 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700">
                Login
              </button>
              <ThemeToggle />
            </div>
          </header>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`<header class="flex items-center justify-between p-4">
  <div class="flex items-center space-x-4">
    <h1 class="text-xl font-semibold">My Application</h1>
    <nav class="hidden space-x-4 md:flex">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </div>
  <div class="flex items-center space-x-3">
    <button>Login</button>
    <ThemeToggle />
  </div>
</header>`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Settings Panel</h3>
        <div class="mb-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="max-w-md mx-auto rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h3 class="mb-4 text-lg font-semibold">Settings</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium">Notifications</label>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400">
                    Receive push notifications
                  </p>
                </div>
                <input type="checkbox" class="rounded" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium">Auto-save</label>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400">
                    Automatically save changes
                  </p>
                </div>
                <input type="checkbox" checked class="rounded" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium">Theme Preference</label>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400">
                    Choose your preferred theme
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`<div class="settings-panel">
  <h3>Settings</h3>
  <div class="space-y-4">
    {/* Other settings */}
    <div class="flex items-center justify-between">
      <div>
        <label>Theme Preference</label>
        <p>Choose your preferred theme</p>
      </div>
      <ThemeToggle />
    </div>
  </div>
</div>`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Custom Container Styling</h3>
        <div class="mb-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex items-center justify-center">
            <ThemeToggle class="rounded-lg border border-primary-200 p-2 dark:border-primary-800" />
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`<ThemeToggle class="rounded-lg border border-primary-200 p-2 dark:border-primary-800" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Custom Button Styling</h3>
        <div class="mb-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex items-center justify-center space-x-4">
            <ThemeToggle buttonClass="rounded-full bg-primary-100 p-3 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800" />
            <ThemeToggle buttonClass="rounded-lg border-2 border-secondary-500 bg-transparent p-2 text-secondary-600 hover:bg-secondary-50 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-950" />
            <ThemeToggle buttonClass="rounded-md bg-gradient-to-r from-primary-500 to-secondary-500 p-3 text-white shadow-lg hover:shadow-xl" />
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Filled button style
<ThemeToggle buttonClass="rounded-full bg-primary-100 p-3 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800" />

// Outlined button style  
<ThemeToggle buttonClass="rounded-lg border-2 border-secondary-500 bg-transparent p-2 text-secondary-600 hover:bg-secondary-50 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-950" />

// Gradient button style
<ThemeToggle buttonClass="rounded-md bg-gradient-to-r from-primary-500 to-secondary-500 p-3 text-white shadow-lg hover:shadow-xl" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Responsive Layout</h3>
        <div class="mb-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
            <div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div class="text-center md:text-left">
                <h4 class="text-lg font-semibold">Dashboard</h4>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  Welcome back! Here's your overview.
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <span class="hidden text-sm text-neutral-600 md:inline dark:text-neutral-400">
                  Theme:
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`<div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
  <div class="text-center md:text-left">
    <h4>Dashboard</h4>
    <p>Welcome back! Here's your overview.</p>
  </div>
  <div class="flex items-center space-x-2">
    <span class="hidden text-sm md:inline">Theme:</span>
    <ThemeToggle />
  </div>
</div>`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Mobile-Optimized</h3>
        <div class="mb-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="mx-auto max-w-sm">
            <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <div class="mb-4 flex items-center justify-between">
                <h4 class="text-lg font-semibold">Mobile App</h4>
                <ThemeToggle buttonClass="touch-manipulation rounded-lg p-3 hover:bg-neutral-200 focus:ring-2 focus:ring-primary-500 dark:hover:bg-neutral-700" />
              </div>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Optimized for touch interactions with larger touch targets and better accessibility.
              </p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`<ThemeToggle buttonClass="touch-manipulation rounded-lg p-3 hover:bg-neutral-200 focus:ring-2 focus:ring-primary-500 dark:hover:bg-neutral-700" />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Multiple Instances</h3>
        <div class="mb-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="space-y-4">
            <div class="flex items-center justify-between rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
              <span class="text-sm font-medium">Header Toggle</span>
              <ThemeToggle />
            </div>
            <div class="flex items-center justify-between rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
              <span class="text-sm font-medium">Sidebar Toggle</span>
              <ThemeToggle />
            </div>
            <div class="flex items-center justify-between rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
              <span class="text-sm font-medium">Settings Toggle</span>
              <ThemeToggle />
            </div>
          </div>
          <p class="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            All instances stay synchronized automatically
          </p>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Multiple instances automatically stay in sync
<div class="header">
  <ThemeToggle />
</div>

<div class="sidebar">
  <ThemeToggle />
</div>

<div class="settings">
  <ThemeToggle />
</div>`}</code>
          </pre>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-info-200 bg-info-50 p-6 dark:border-info-800 dark:bg-info-950">
        <h3 class="mb-2 text-lg font-medium text-info-900 dark:text-info-100">
          💡 Pro Tips
        </h3>
        <ul class="space-y-2 text-sm text-info-800 dark:text-info-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Place the toggle in consistent locations across your app for better UX</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Use larger touch targets (min 44px) for mobile interfaces</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Multiple instances automatically stay synchronized</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Test your theme toggle with users who have different accessibility needs</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default ThemeToggleExamples;