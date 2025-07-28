import { component$ } from "@builder.io/qwik";
import { DocsSideNavigation, type DocsSideNavigationCategory } from "../";

export interface BasicNavigationProps {
  showCode?: boolean;
  containerHeight?: string;
}

export const BasicNavigation = component$<BasicNavigationProps>(({
  showCode = false,
  containerHeight = "h-80"
}) => {
  // Simple navigation data for basic example
  const basicCategories: DocsSideNavigationCategory[] = [
    {
      id: "introduction",
      name: "Introduction",
      links: [
        { href: "/docs/overview", label: "Overview" },
        { href: "/docs/installation", label: "Installation" },
        { href: "/docs/quickstart", label: "Quick Start" },
      ],
    },
    {
      id: "components",
      name: "Components",
      links: [
        { href: "/docs/components/button", label: "Button" },
        { href: "/docs/components/input", label: "Input" },
        { href: "/docs/components/card", label: "Card" },
        { href: "/docs/components/modal", label: "Modal" },
      ],
    },
    {
      id: "guides",
      name: "Guides",
      links: [
        { href: "/docs/styling", label: "Styling" },
        { href: "/docs/theming", label: "Theming" },
        { href: "/docs/deployment", label: "Deployment" },
      ],
    },
  ];

  const codeExample = `import { DocsSideNavigation } from "~/components/Docs/Navigation";

const categories = [
  {
    id: "introduction",
    name: "Introduction",
    links: [
      { href: "/docs/overview", label: "Overview" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/quickstart", label: "Quick Start" },
    ],
  },
  {
    id: "components", 
    name: "Components",
    links: [
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/input", label: "Input" },
      { href: "/docs/components/card", label: "Card" },
    ],
  }
];

export default component$(() => {
  return (
    <DocsSideNavigation
      categories={categories}
      title="Basic Navigation"
      activePath="/docs/components/button"
      sidebarVisible={true}
    />
  );
});`;

  return (
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Basic Navigation
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          A simple navigation setup with essential categories and links. Perfect for 
          getting started with the Navigation component.
        </p>
      </div>

      {/* Example */}
      <div class={`w-full overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 ${containerHeight}`}>
        <DocsSideNavigation
          categories={basicCategories}
          title="Basic Documentation"
          activePath="/docs/components/button"
          sidebarVisible={true}
          renderFullLayout={false}
        />
      </div>

      {/* Features */}
      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
        <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
          Features Demonstrated
        </h4>
        <ul class="list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
          <li>Simple category structure</li>
          <li>Essential navigation links</li>
          <li>Active state highlighting</li>
          <li>Clean, minimal design</li>
          <li>Keyboard navigation support</li>
        </ul>
      </div>

      {/* Usage Notes */}
      <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-900/20">
        <h4 class="mb-2 text-sm font-semibold text-info-800 dark:text-info-200">
          When to Use This Pattern
        </h4>
        <ul class="list-disc space-y-1 pl-5 text-sm text-info-700 dark:text-info-300">
          <li>Simple documentation sites with limited content</li>
          <li>Getting started implementations</li>
          <li>Projects with straightforward navigation needs</li>
          <li>When you need a clean, minimal navigation structure</li>
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