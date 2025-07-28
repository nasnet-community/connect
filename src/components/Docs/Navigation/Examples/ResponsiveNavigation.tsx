import { component$, useSignal } from "@builder.io/qwik";
import { DocsSideNavigation, type DocsSideNavigationCategory } from "../";

export interface ResponsiveNavigationProps {
  showCode?: boolean;
  showControls?: boolean;
}

export const ResponsiveNavigation = component$<ResponsiveNavigationProps>(({
  showCode = false,
  showControls = true
}) => {
  const sidebarVisible = useSignal(true);
  const currentDevice = useSignal<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Navigation data that works well across all devices
  const responsiveCategories: DocsSideNavigationCategory[] = [
    {
      id: "getting-started",
      name: "Getting Started",
      links: [
        { href: "/docs/intro", label: "Introduction" },
        { href: "/docs/install", label: "Installation" },
        { href: "/docs/setup", label: "Setup" },
      ],
    },
    {
      id: "components",
      name: "Components",
      links: [
        { href: "/docs/components/button", label: "Button" },
        { href: "/docs/components/input", label: "Input Field" },
        { href: "/docs/components/select", label: "Select" },
        { href: "/docs/components/checkbox", label: "Checkbox" },
        { href: "/docs/components/radio", label: "Radio Button" },
      ],
    },
    {
      id: "layout",
      name: "Layout",
      links: [
        { href: "/docs/layout/grid", label: "Grid System" },
        { href: "/docs/layout/container", label: "Container" },
        { href: "/docs/layout/spacing", label: "Spacing" },
      ],
    },
    {
      id: "patterns",
      name: "Patterns",
      links: [
        { href: "/docs/patterns/forms", label: "Forms" },
        { href: "/docs/patterns/navigation", label: "Navigation" },
        { href: "/docs/patterns/data-display", label: "Data Display" },
      ],
    },
  ];

  const deviceSizes = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: '600px' }
  };

  const currentSize = deviceSizes[currentDevice.value];

  const codeExample = `import { component$, useSignal } from "@builder.io/qwik";
import { DocsSideNavigation } from "~/components/Docs/Navigation";

export default component$(() => {
  const sidebarVisible = useSignal(true);
  
  const categories = [
    {
      id: "getting-started",
      name: "Getting Started",
      links: [
        { href: "/docs/intro", label: "Introduction" },
        { href: "/docs/install", label: "Installation" },
      ],
    },
    // ... more categories
  ];

  return (
    <DocsSideNavigation
      categories={categories}
      title="Responsive Docs"
      activePath="/docs/components/button"
      sidebarVisible={sidebarVisible.value}
      onToggleSidebar$={() => {
        sidebarVisible.value = !sidebarVisible.value;
      }}
      renderFullLayout={true}
    >
      <div class="space-y-4">
        <h1 class="text-2xl font-bold">Responsive Content</h1>
        <p>Navigation adapts automatically to screen size.</p>
      </div>
    </DocsSideNavigation>
  );
});`;

  return (
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Responsive Navigation
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Experience how the navigation component automatically adapts to different screen sizes 
          and device orientations. Test the responsive behavior across mobile, tablet, and desktop viewports.
        </p>
      </div>

      {/* Device Controls */}
      {showControls && (
        <div class="flex flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Device:
            </label>
            <select
              value={currentDevice.value}
              onChange$={(_, target) => {
                currentDevice.value = target.value as typeof currentDevice.value;
              }}
              class="rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="mobile">Mobile (375px)</option>
              <option value="tablet">Tablet (768px)</option>
              <option value="desktop">Desktop (100%)</option>
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
        </div>
      )}

      {/* Responsive Demo Container */}
      <div class="flex justify-center">
        <div 
          class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
          style={{
            width: currentSize.width,
            height: currentSize.height,
            maxWidth: '100%'
          }}
        >
          <DocsSideNavigation
            categories={responsiveCategories}
            title="Responsive Docs"
            activePath="/docs/components/input"
            sidebarVisible={sidebarVisible.value}
            onToggleSidebar$={() => {
              sidebarVisible.value = !sidebarVisible.value;
            }}
            renderFullLayout={true}
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                  Responsive Content
                </h1>
                <div class="flex items-center gap-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
                  <span class="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
                    {currentDevice.value}
                  </span>
                </div>
              </div>
              
              <p class="text-sm text-gray-600 md:text-base dark:text-gray-300">
                The navigation component automatically adapts its layout and behavior based on the 
                screen size. On mobile devices, it becomes a full-screen overlay, while on desktop 
                it remains a traditional sidebar.
              </p>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div class="rounded-lg bg-gradient-to-r from-primary-100 to-primary-200 p-4 dark:from-primary-900/20 dark:to-primary-800/20">
                  <h3 class="mb-2 font-semibold text-primary-800 dark:text-primary-200">
                    Mobile Features
                  </h3>
                  <ul class="space-y-1 text-sm text-primary-700 dark:text-primary-300">
                    <li>• Full-screen overlay</li>
                    <li>• Touch-friendly interactions</li>
                    <li>• Smooth slide animations</li>
                    <li>• Backdrop blur effect</li>
                  </ul>
                </div>

                <div class="rounded-lg bg-gradient-to-r from-secondary-100 to-secondary-200 p-4 dark:from-secondary-900/20 dark:to-secondary-800/20">
                  <h3 class="mb-2 font-semibold text-secondary-800 dark:text-secondary-200">
                    Desktop Features
                  </h3>
                  <ul class="space-y-1 text-sm text-secondary-700 dark:text-secondary-300">
                    <li>• Traditional sidebar layout</li>
                    <li>• Collapsible with animation</li>
                    <li>• Keyboard navigation</li>
                    <li>• Persistent state</li>
                  </ul>
                </div>
              </div>

              <div class="rounded border border-warning-200 bg-warning-50 p-3 dark:border-warning-800 dark:bg-warning-900/20">
                <p class="text-sm text-warning-700 dark:text-warning-300">
                  <strong>Try this:</strong> Switch between device sizes and toggle the sidebar 
                  to see how the component adapts its behavior and animations.
                </p>
              </div>
            </div>
          </DocsSideNavigation>
        </div>
      </div>

      {/* Responsive Features */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
          <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            📱 Mobile Optimizations
          </h4>
          <ul class="list-disc space-y-1 pl-4 text-xs text-gray-600 dark:text-gray-300">
            <li>Full-screen overlay mode</li>
            <li>Touch gesture support</li>
            <li>Optimized spacing</li>
            <li>Backdrop interactions</li>
          </ul>
        </div>

        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
          <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            📱 Tablet Adaptations
          </h4>
          <ul class="list-disc space-y-1 pl-4 text-xs text-gray-600 dark:text-gray-300">
            <li>Hybrid layout behavior</li>
            <li>Optimized touch targets</li>
            <li>Flexible sidebar width</li>
            <li>Portrait/landscape support</li>
          </ul>
        </div>

        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
          <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            🖥️ Desktop Features
          </h4>
          <ul class="list-disc space-y-1 pl-4 text-xs text-gray-600 dark:text-gray-300">
            <li>Traditional sidebar layout</li>
            <li>Keyboard navigation</li>
            <li>Hover interactions</li>
            <li>Collapsible sidebar</li>
          </ul>
        </div>
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