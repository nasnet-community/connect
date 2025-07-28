import { component$, useSignal } from "@builder.io/qwik";
import { DocsSideNavigation, type DocsSideNavigationCategory } from "../";

export interface DarkModeNavigationProps {
  showCode?: boolean;
  showThemeControls?: boolean;
}

export const DarkModeNavigation = component$<DarkModeNavigationProps>(({
  showCode = false,
  showThemeControls = true
}) => {
  const currentTheme = useSignal<'light' | 'dark' | 'auto'>('light');
  const sidebarVisible = useSignal(true);

  // Navigation data optimized for dark mode demonstration
  const darkModeCategories: DocsSideNavigationCategory[] = [
    {
      id: "theming",
      name: "Theming",
      links: [
        { href: "/docs/theming/colors", label: "Color System" },
        { href: "/docs/theming/dark-mode", label: "Dark Mode" },
        { href: "/docs/theming/customization", label: "Customization" },
      ],
    },
    {
      id: "components",
      name: "Components",
      links: [
        { 
          href: "/docs/components/button", 
          label: "Button",
          subComponents: [
            { href: "/docs/components/button/variants", label: "Variants" },
            { href: "/docs/components/button/states", label: "States" },
            { href: "/docs/components/button/theming", label: "Theming" },
          ]
        },
        { 
          href: "/docs/components/input", 
          label: "Input",
          subComponents: [
            { href: "/docs/components/input/text", label: "Text Input" },
            { href: "/docs/components/input/password", label: "Password" },
            { href: "/docs/components/input/search", label: "Search" },
          ]
        },
        { href: "/docs/components/card", label: "Card" },
        { href: "/docs/components/modal", label: "Modal" },
      ],
    },
    {
      id: "design-tokens",
      name: "Design Tokens",
      links: [
        { href: "/docs/tokens/colors", label: "Colors" },
        { href: "/docs/tokens/typography", label: "Typography" },
        { href: "/docs/tokens/spacing", label: "Spacing" },
        { href: "/docs/tokens/shadows", label: "Shadows" },
      ],
    },
    {
      id: "accessibility",
      name: "Accessibility",
      links: [
        { href: "/docs/a11y/contrast", label: "Color Contrast" },
        { href: "/docs/a11y/focus", label: "Focus Management" },
        { href: "/docs/a11y/screen-readers", label: "Screen Readers" },
      ],
    },
  ];

  const themeClasses = {
    light: '',
    dark: 'dark',
    auto: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ''
  };

  const codeExample = `import { component$, useSignal } from "@builder.io/qwik";
import { DocsSideNavigation } from "~/components/Docs/Navigation";

export default component$(() => {
  const theme = useSignal<'light' | 'dark'>('light');
  
  const toggleTheme = $(() => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  });

  const categories = [
    {
      id: "theming",
      name: "Theming",
      links: [
        { href: "/docs/theming/colors", label: "Color System" },
        { href: "/docs/theming/dark-mode", label: "Dark Mode" },
      ],
    },
    // ... more categories
  ];

  return (
    <div class={theme.value === 'dark' ? 'dark' : ''}>
      <DocsSideNavigation
        categories={categories}
        title="Dark Mode Docs"
        activePath="/docs/theming/dark-mode"
        sidebarVisible={true}
        renderFullLayout={true}
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Dark Mode Example
            </h1>
            <button
              onClick$={toggleTheme}
              class="rounded bg-primary-600 px-4 py-2 text-white"
            >
              Toggle Theme
            </button>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            Navigation automatically adapts to dark mode.
          </p>
        </div>
      </DocsSideNavigation>
    </div>
  );
});`;

  return (
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Dark Mode Navigation
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Showcase of the navigation component's comprehensive dark mode support. 
          The component automatically adapts colors, contrasts, and visual elements for optimal dark mode experience.
        </p>
      </div>

      {/* Theme Controls */}
      {showThemeControls && (
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme:
            </label>
            <select
              value={currentTheme.value}
              onChange$={(_, target) => {
                currentTheme.value = target.value as typeof currentTheme.value;
              }}
              class="rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          <button
            onClick$={() => {
              sidebarVisible.value = !sidebarVisible.value;
            }}
            class="rounded bg-primary-600 px-3 py-1 text-sm text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {sidebarVisible.value ? 'Hide' : 'Show'} Sidebar
          </button>

          <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span class="h-2 w-2 rounded-full bg-current"></span>
            <span>Current: {currentTheme.value}</span>
          </div>
        </div>
      )}

      {/* Dark Mode Demo */}
      <div 
        class={`overflow-hidden rounded-lg border transition-all duration-300 ${themeClasses[currentTheme.value]} ${
          currentTheme.value === 'dark' 
            ? 'border-gray-700 bg-gray-900' 
            : 'border-gray-200 bg-white'
        }`}
        data-theme={currentTheme.value}
        style={{ height: '500px' }}
      >
        <DocsSideNavigation
          categories={darkModeCategories}
          title="Dark Mode Documentation"
          activePath="/docs/theming/dark-mode"
          sidebarVisible={sidebarVisible.value}
          onToggleSidebar$={() => {
            sidebarVisible.value = !sidebarVisible.value;
          }}
          renderFullLayout={true}
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                Dark Mode Experience
              </h1>
              <div class="flex items-center gap-2">
                <div class={`h-3 w-3 rounded-full ${
                  currentTheme.value === 'dark' ? 'bg-yellow-400' : 'bg-blue-500'
                }`}></div>
                <span class="text-sm text-gray-600 dark:text-gray-300">
                  {currentTheme.value === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300">
              The navigation component provides comprehensive dark mode support with proper 
              contrast ratios and visual hierarchy. All colors, shadows, and interactions 
              are optimized for both light and dark themes.
            </p>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
                  Dark Mode Features
                </h3>
                <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Automatic color adaptation</li>
                  <li>• WCAG AA contrast compliance</li>
                  <li>• Optimized focus states</li>
                  <li>• Consistent visual hierarchy</li>
                </ul>
              </div>

              <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
                  Theme Capabilities
                </h3>
                <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>• System preference detection</li>
                  <li>• Manual theme switching</li>
                  <li>• Smooth transitions</li>
                  <li>• Persistent preferences</li>
                </ul>
              </div>
            </div>

            <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-900/20">
              <div class="flex items-start gap-3">
                <div class="mt-1 h-4 w-4 rounded-full bg-info-500 flex-shrink-0"></div>
                <div>
                  <h4 class="font-semibold text-info-800 dark:text-info-200">
                    Accessibility Note
                  </h4>
                  <p class="mt-1 text-sm text-info-700 dark:text-info-300">
                    The navigation component automatically respects user preferences for 
                    reduced motion and high contrast modes, ensuring an accessible experience 
                    across all themes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DocsSideNavigation>
      </div>

      {/* Theme Comparison */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
            ☀️ Light Theme Benefits
          </h4>
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm dark:border-gray-700 dark:bg-gray-900/50">
            <ul class="space-y-1 text-gray-600 dark:text-gray-300">
              <li>• High contrast readability</li>
              <li>• Familiar bright interface</li>
              <li>• Better for daylight use</li>
              <li>• Reduced eye strain in bright environments</li>
            </ul>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
            🌙 Dark Theme Benefits
          </h4>
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm dark:border-gray-700 dark:bg-gray-900/50">
            <ul class="space-y-1 text-gray-600 dark:text-gray-300">
              <li>• Reduced eye strain in low light</li>
              <li>• Better for extended use</li>
              <li>• OLED-friendly (saves battery)</li>
              <li>• Modern, sleek appearance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Tips */}
      <div class="rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-900/20">
        <h4 class="mb-2 text-sm font-semibold text-warning-800 dark:text-warning-200">
          💡 Implementation Tips
        </h4>
        <ul class="list-disc space-y-1 pl-4 text-sm text-warning-700 dark:text-warning-300">
          <li>Use the <code class="rounded bg-warning-100 px-1 dark:bg-warning-900/50">dark:</code> prefix in Tailwind classes</li>
          <li>Test both themes to ensure proper contrast ratios</li>
          <li>Consider system preferences with <code class="rounded bg-warning-100 px-1 dark:bg-warning-900/50">prefers-color-scheme</code></li>
          <li>Provide manual theme toggle for user control</li>
        </ul>
      </div>

      {/* Code Example */}
      {showCode && (
        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
            Implementation Code
          </h4>
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <pre class="overflow-x-auto text-xs text-gray-800 dark:text-gray-200">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
});