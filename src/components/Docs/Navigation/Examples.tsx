import { component$, useSignal } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "../templates/ExamplesTemplate";
import { DocsSideNavigation, type DocsSideNavigationCategory } from "./";

export interface NavigationExample extends Example {
  data?: DocsSideNavigationCategory[];
  showCode?: boolean;
}

export interface NavigationExamplesProps {
  showCodeExamples?: boolean;
  showLiveDemo?: boolean;
}

export const NavigationExamples = component$<NavigationExamplesProps>(({
  showCodeExamples = true,
  showLiveDemo = true,
}) => {
  const sidebarVisible = useSignal(true);
  const activePath = useSignal("/docs/components/button");

  // Sample navigation data
  const basicCategories: DocsSideNavigationCategory[] = [
    {
      id: "getting-started",
      name: "Getting Started",
      links: [
        { href: "/docs/installation", label: "Installation" },
        { href: "/docs/setup", label: "Setup" },
        { href: "/docs/configuration", label: "Configuration" },
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
            { href: "/docs/components/button/primary", label: "Primary Button" },
            { href: "/docs/components/button/secondary", label: "Secondary Button" },
            { href: "/docs/components/button/icon", label: "Icon Button" },
          ]
        },
        { href: "/docs/components/input", label: "Input" },
        { href: "/docs/components/card", label: "Card" },
      ],
    },
  ];

  const complexCategories: DocsSideNavigationCategory[] = [
    {
      id: "fundamentals",
      name: "Fundamentals",
      links: [
        { href: "/docs/introduction", label: "Introduction" },
        { href: "/docs/installation", label: "Installation" },
        { href: "/docs/theming", label: "Theming" },
      ],
    },
    {
      id: "layout",
      name: "Layout & Navigation",
      links: [
        { href: "/docs/layout/container", label: "Container" },
        { href: "/docs/layout/grid", label: "Grid System" },
        { href: "/docs/layout/navigation", label: "Navigation" },
      ],
      subcategories: [
        {
          id: "responsive",
          name: "Responsive Design",
          links: [
            { href: "/docs/layout/responsive/breakpoints", label: "Breakpoints" },
            { href: "/docs/layout/responsive/utilities", label: "Utilities" },
          ],
        },
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
            { href: "/docs/components/button/sizes", label: "Sizes" },
            { href: "/docs/components/button/states", label: "States" },
          ]
        },
        { 
          href: "/docs/components/form", 
          label: "Form Controls",
          subComponents: [
            { href: "/docs/components/form/input", label: "Input" },
            { href: "/docs/components/form/select", label: "Select" },
            { href: "/docs/components/form/checkbox", label: "Checkbox" },
            { href: "/docs/components/form/radio", label: "Radio" },
          ]
        },
      ],
      subcategories: [
        {
          id: "data-display",
          name: "Data Display",
          links: [
            { href: "/docs/components/table", label: "Table" },
            { href: "/docs/components/list", label: "List" },
            { href: "/docs/components/card", label: "Card" },
          ],
        },
        {
          id: "feedback",
          name: "Feedback",
          links: [
            { href: "/docs/components/alert", label: "Alert" },
            { href: "/docs/components/toast", label: "Toast" },
            { href: "/docs/components/modal", label: "Modal" },
          ],
        },
      ],
    },
  ];

  const examples: NavigationExample[] = [
    {
      title: "Basic Navigation",
      description: "Simple navigation with categories and links",
      component: (
        <div class="h-96 w-full border border-gray-200 dark:border-gray-700">
          <DocsSideNavigation
            categories={basicCategories}
            title="Basic Docs"
            activePath={"/docs/components/button"}
            sidebarVisible={true}
            renderFullLayout={false}
          />
        </div>
      ),
    },
    {
      title: "Complex Nested Navigation", 
      description: "Navigation with subcategories and sub-components",
      component: (
        <div class="h-96 w-full border border-gray-200 dark:border-gray-700">
          <DocsSideNavigation
            categories={complexCategories}
            title="Advanced Docs"
            activePath={activePath.value}
            sidebarVisible={true}
            renderFullLayout={false}
          />
        </div>
      ),
    },
    {
      title: "Responsive Navigation Demo",
      description: "Interactive demo showing mobile and desktop layouts",
      component: (
        <div class="space-y-4">
          <div class="flex gap-2">
            <button
              onClick$={() => (sidebarVisible.value = !sidebarVisible.value)}
              class="rounded bg-primary-600 px-3 py-2 text-sm text-white hover:bg-primary-700"
            >
              {sidebarVisible.value ? "Hide" : "Show"} Sidebar
            </button>
            <select
              onChange$={(_, target) => (activePath.value = target.value)}
              class="rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="/docs/components/button">Button</option>
              <option value="/docs/components/form/input">Form Input</option>
              <option value="/docs/components/table">Table</option>
              <option value="/docs/layout/responsive/breakpoints">Breakpoints</option>
            </select>
          </div>
          <div class="h-96 w-full border border-gray-200 dark:border-gray-700">
            <DocsSideNavigation
              categories={complexCategories}
              title="Interactive Demo"
              activePath={activePath.value}
              sidebarVisible={sidebarVisible.value}
              renderFullLayout={false}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Full Layout Example",
      description: "Complete layout with content area and responsive behavior",
      component: (
        <div class="h-96 overflow-hidden rounded border border-gray-200 dark:border-gray-700">
          <DocsSideNavigation
            categories={basicCategories}
            title="Full Layout"
            activePath={"/docs/setup"}
            sidebarVisible={true}
            renderFullLayout={true}
          >
            <div class="space-y-4">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                Setup Guide
              </h1>
              <p class="text-gray-600 dark:text-gray-300">
                This is the main content area. The navigation adapts to screen size 
                and provides a seamless experience across devices.
              </p>
              <div class="h-32 rounded bg-gradient-to-r from-primary-100 to-secondary-100 p-4 dark:from-primary-900/20 dark:to-secondary-900/20">
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Content scrolls independently from navigation. On mobile, 
                  the sidebar becomes a full-screen overlay.
                </p>
              </div>
            </div>
          </DocsSideNavigation>
        </div>
      ),
    },
    {
      title: "Compact Navigation",
      description: "Navigation in compact mode for smaller spaces",
      component: (
        <div class="h-80 w-64 border border-gray-200 dark:border-gray-700">
          <DocsSideNavigation
            categories={basicCategories.slice(0, 1)}
            title="Compact"
            activePath={"/docs/installation"}
            sidebarVisible={true}
            renderFullLayout={false}
          />
        </div>
      ),
    },
    {
      title: "Dark Mode Navigation",
      description: "Navigation component with dark theme styling",
      component: (
        <div class="h-96 w-full border border-gray-200 dark:border-gray-700" data-theme="dark">
          <div class="dark">
            <DocsSideNavigation
              categories={complexCategories}
              title="Dark Mode Docs"
              activePath={"/docs/components/form/input"}
              sidebarVisible={true}
              renderFullLayout={false}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <div class="space-y-4">
        <p>
          Explore various configurations and use cases of the Navigation component. 
          Each example demonstrates different features and responsive behaviors.
        </p>
        
        {showCodeExamples && (
          <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-900/20">
            <h4 class="mb-2 font-semibold text-info-800 dark:text-info-200">
              Interactive Examples
            </h4>
            <p class="text-sm text-info-700 dark:text-info-300">
              These examples are fully interactive. Try resizing your browser window to see 
              responsive behavior, and interact with the navigation elements to test functionality.
            </p>
          </div>
        )}

        {showLiveDemo && (
          <div class="rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-900/20">
            <h4 class="mb-2 font-semibold text-warning-800 dark:text-warning-200">
              Live Demo Features
            </h4>
            <ul class="list-disc space-y-1 pl-4 text-sm text-warning-700 dark:text-warning-300">
              <li>Click categories to expand/collapse</li>
              <li>Navigate between links to see active states</li>
              <li>Use the responsive demo controls to test behavior</li>
              <li>Try the full layout example for complete functionality</li>
            </ul>
          </div>
        )}
      </div>
    </ExamplesTemplate>
  );
});