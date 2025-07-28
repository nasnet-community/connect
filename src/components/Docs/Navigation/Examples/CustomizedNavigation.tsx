import { component$, useSignal } from "@builder.io/qwik";
import { DocsSideNavigation, type DocsSideNavigationCategory } from "../";

export interface CustomizedNavigationProps {
  showCode?: boolean;
  showCustomizations?: boolean;
}

export const CustomizedNavigation = component$<CustomizedNavigationProps>(({
  showCode = false,
  showCustomizations = true
}) => {
  const currentStyle = useSignal<'default' | 'compact' | 'branded' | 'minimal'>('default');
  const sidebarVisible = useSignal(true);

  // Navigation data for customization demo
  const customCategories: DocsSideNavigationCategory[] = [
    {
      id: "brand",
      name: "Brand Guidelines",
      links: [
        { href: "/brand/logo", label: "Logo Usage" },
        { href: "/brand/colors", label: "Color Palette" },
        { href: "/brand/typography", label: "Typography" },
        { href: "/brand/voice", label: "Brand Voice" },
      ],
    },
    {
      id: "design-system",
      name: "Design System",
      links: [
        { href: "/design/tokens", label: "Design Tokens" },
        { href: "/design/components", label: "Component Library" },
        { href: "/design/patterns", label: "Design Patterns" },
        { href: "/design/guidelines", label: "Usage Guidelines" },
      ],
    },
    {
      id: "resources",
      name: "Resources",
      links: [
        { href: "/resources/downloads", label: "Downloads" },
        { href: "/resources/templates", label: "Templates" },
        { href: "/resources/tools", label: "Design Tools" },
      ],
    },
  ];

  const styleConfigs = {
    default: {
      title: "Documentation",
      className: "",
      description: "Standard navigation styling with default colors and spacing"
    },
    compact: {
      title: "Compact Docs",
      className: "compact-nav",
      description: "Reduced spacing and smaller text for information-dense layouts"
    },
    branded: {
      title: "Brand Hub",
      className: "branded-nav",
      description: "Custom colors and styling to match your brand identity"
    },
    minimal: {
      title: "Minimal Guide",
      className: "minimal-nav",
      description: "Clean, minimal styling with reduced visual elements"
    }
  };

  const currentConfig = styleConfigs[currentStyle.value];

  const codeExample = `import { DocsSideNavigation } from "~/components/Docs/Navigation";

// Custom styling approach 1: CSS classes
const customNavigation = (
  <DocsSideNavigation
    categories={categories}
    title="Custom Navigation"
    class="custom-branded-nav"
    activePath="/current/path"
    sidebarVisible={true}
  />
);

// Custom styling approach 2: Tailwind utilities
const tailwindCustom = (
  <DocsSideNavigation
    categories={categories}
    title="Tailwind Custom"
    class="[&_.nav-category]:text-purple-600 [&_.nav-link]:hover:bg-purple-50"
    activePath="/current/path"
    sidebarVisible={true}
  />
);

// Custom styling approach 3: CSS-in-JS with style prop
const inlineCustom = (
  <div style="--nav-primary-color: #6366f1; --nav-bg-color: #f8fafc;">
    <DocsSideNavigation
      categories={categories}
      title="Inline Styled"
      activePath="/current/path"
      sidebarVisible={true}
    />
  </div>
);`;

  const customStyles = `
    /* Compact Navigation Styles */
    .compact-nav {
      --nav-spacing: 0.5rem;
      --nav-text-size: 0.875rem;
      --nav-category-spacing: 0.75rem;
    }
    
    /* Branded Navigation Styles */
    .branded-nav {
      --nav-primary-color: #7c3aed;
      --nav-secondary-color: #a855f7;
      --nav-accent-color: #c084fc;
      --nav-bg-gradient: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
    }
    
    /* Minimal Navigation Styles */
    .minimal-nav {
      --nav-border-width: 0;
      --nav-shadow: none;
      --nav-bg-color: transparent;
      --nav-category-separator: 1px solid #e5e7eb;
    }
  `;

  return (
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Customized Navigation
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Explore different styling approaches and customization options for the Navigation component. 
          Demonstrates how to adapt the component to match your brand and design requirements.
        </p>
      </div>

      {/* Customization Controls */}
      {showCustomizations && (
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Style Variant:
              </label>
              <select
                value={currentStyle.value}
                onChange$={(_, target) => {
                  currentStyle.value = target.value as typeof currentStyle.value;
                }}
                class="rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="default">Default</option>
                <option value="compact">Compact</option>
                <option value="branded">Branded</option>
                <option value="minimal">Minimal</option>
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

            <div class="text-xs text-gray-500 dark:text-gray-400">
              Current: <span class="font-mono">{currentStyle.value}</span>
            </div>
          </div>

          <div class="rounded-lg border border-info-200 bg-info-50 p-3 dark:border-info-800 dark:bg-info-900/20">
            <p class="text-sm text-info-700 dark:text-info-300">
              <strong>{currentConfig.description}</strong> - 
              {currentStyle.value === 'default' && " Uses the component's built-in styling with Tailwind defaults."}
              {currentStyle.value === 'compact' && " Perfect for dashboards or dense information layouts."}
              {currentStyle.value === 'branded' && " Demonstrates custom color schemes and brand alignment."}
              {currentStyle.value === 'minimal' && " Ideal for clean, distraction-free documentation."}
            </p>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={customStyles} />

      {/* Customized Navigation Demo */}
      <div 
        class={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${currentConfig.className}`}
        style={{ height: '480px' }}
      >
        <DocsSideNavigation
          categories={customCategories}
          title={currentConfig.title}
          activePath="/design/tokens"
          sidebarVisible={sidebarVisible.value}
          onToggleSidebar$={() => {
            sidebarVisible.value = !sidebarVisible.value;
          }}
          renderFullLayout={true}
          class={currentConfig.className}
        >
          <div class="space-y-4">
            <div class="border-b border-gray-200 pb-4 dark:border-gray-700">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                {currentConfig.title}
              </h1>
              <div class="mt-2 flex items-center gap-2">
                <span class="rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-200">
                  {currentStyle.value} style
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  Customization Demo
                </span>
              </div>
            </div>

            <div class="space-y-4">
              <p class="text-gray-600 dark:text-gray-300">
                This example demonstrates how the Navigation component can be customized to match 
                your design system and brand guidelines. Each style variant shows different 
                approaches to customization.
              </p>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                  <h3 class="mb-3 font-semibold text-gray-900 dark:text-white">
                    Customization Methods
                  </h3>
                  <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                      CSS Custom Properties (CSS Variables)
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                      Tailwind CSS Classes & Utilities
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                      Custom CSS Classes
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                      Theme-based Configuration
                    </li>
                  </ul>
                </div>

                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                  <h3 class="mb-3 font-semibold text-gray-900 dark:text-white">
                    Style Properties
                  </h3>
                  <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                      Colors & Color Schemes
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                      Typography & Sizing
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                      Spacing & Layout
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                      Borders & Shadows
                    </li>
                  </ul>
                </div>
              </div>

              {currentStyle.value === 'branded' && (
                <div class="rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 p-4 dark:border-purple-800 dark:from-purple-900/20 dark:to-violet-900/20">
                  <h4 class="mb-2 font-semibold text-purple-800 dark:text-purple-200">
                    🎨 Brand Integration Example
                  </h4>
                  <p class="text-sm text-purple-700 dark:text-purple-300">
                    This branded variant demonstrates how to integrate your brand colors, 
                    spacing, and visual hierarchy into the navigation component while 
                    maintaining accessibility and usability.
                  </p>
                </div>
              )}

              {currentStyle.value === 'compact' && (
                <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <h4 class="mb-2 font-semibold text-blue-800 dark:text-blue-200">
                    📊 Space-Efficient Design
                  </h4>
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    The compact variant reduces spacing and text sizes to fit more navigation 
                    items in limited space, perfect for dense interfaces or smaller screens.
                  </p>
                </div>
              )}

              {currentStyle.value === 'minimal' && (
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                  <h4 class="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                    ✨ Clean & Minimal
                  </h4>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    The minimal variant removes unnecessary visual elements and focuses on 
                    typography and content, creating a clean, distraction-free experience.
                  </p>
                </div>
              )}
            </div>
          </div>
        </DocsSideNavigation>
      </div>

      {/* Customization Guide */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
            🎨 Color Customization
          </h4>
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs dark:border-gray-700 dark:bg-gray-900/50">
            <div class="space-y-1 font-mono text-gray-600 dark:text-gray-300">
              <div>--nav-primary-color: #7c3aed;</div>
              <div>--nav-secondary-color: #a855f7;</div>
              <div>--nav-bg-color: #ffffff;</div>
              <div>--nav-text-color: #1f2937;</div>
              <div>--nav-active-bg: #f3e8ff;</div>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
            📏 Spacing Customization
          </h4>
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs dark:border-gray-700 dark:bg-gray-900/50">
            <div class="space-y-1 font-mono text-gray-600 dark:text-gray-300">
              <div>--nav-spacing: 1rem;</div>
              <div>--nav-category-spacing: 1.5rem;</div>
              <div>--nav-link-padding: 0.75rem;</div>
              <div>--nav-border-radius: 0.5rem;</div>
              <div>--nav-shadow: 0 1px 3px rgba(0,0,0,0.1);</div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Tips */}
      <div class="rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-900/20">
        <h4 class="mb-2 text-sm font-semibold text-warning-800 dark:text-warning-200">
          💡 Customization Best Practices
        </h4>
        <ul class="list-disc space-y-1 pl-4 text-sm text-warning-700 dark:text-warning-300">
          <li>Use CSS custom properties for consistent theming across components</li>
          <li>Test customizations in both light and dark modes</li>
          <li>Maintain sufficient color contrast for accessibility (WCAG AA)</li>
          <li>Consider mobile responsiveness when adjusting spacing and sizing</li>
          <li>Use Tailwind's JIT mode for dynamic class generation</li>
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