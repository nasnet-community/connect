import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate, type APIReferenceTemplateProps } from "../templates/APIReferenceTemplate";

export interface NavigationAPIDetail {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface NavigationAPIReferenceProps extends APIReferenceTemplateProps {
  showTypeDefinitions?: boolean;
}

export const NavigationAPIReference = component$<NavigationAPIReferenceProps>(({
  showTypeDefinitions = true,
  ...props
}) => {
  const navigationProps: NavigationAPIDetail[] = [
    {
      name: "categories",
      type: "DocsSideNavigationCategory[]",
      description: "Array of navigation categories containing links and subcategories",
      required: true,
    },
    {
      name: "title",
      type: "string",
      defaultValue: '"Documentation"',
      description: "Title displayed in the navigation header",
    },
    {
      name: "class",
      type: "string",
      defaultValue: '""',
      description: "Additional CSS classes to apply to the navigation container",
    },
    {
      name: "activePath",
      type: "string",
      description: "Currently active path to highlight the corresponding navigation item",
    },
    {
      name: "sidebarVisible",
      type: "boolean",
      defaultValue: "true",
      description: "Controls whether the sidebar is visible or collapsed",
    },
    {
      name: "onToggleSidebar$",
      type: "PropFunction<() => void>",
      description: "Callback function called when the sidebar toggle button is clicked",
    },
    {
      name: "isMobile",
      type: "boolean",
      description: "Override mobile detection - when true, forces mobile layout",
    },
    {
      name: "renderFullLayout",
      type: "boolean",
      defaultValue: "false",
      description: "When true, renders the complete layout with content area and responsive behavior",
    },
  ];

  const navigationEvents = [
    {
      name: "onToggleSidebar$",
      description: "Triggered when user clicks the sidebar toggle button",
      args: "void",
    },
    {
      name: "onToggleCategory$",
      description: "Triggered when a category is expanded or collapsed",
      args: "categoryId: string",
    },
  ];

  const categoryTypeProps: NavigationAPIDetail[] = [
    {
      name: "id",
      type: "string",
      description: "Unique identifier for the category",
      required: true,
    },
    {
      name: "name",
      type: "string",
      description: "Display name for the category",
      required: true,
    },
    {
      name: "links",
      type: "DocsSideNavigationLink[]",
      description: "Array of navigation links within this category",
    },
    {
      name: "subcategories",
      type: "DocsSideNavigationCategory[]",
      description: "Array of nested subcategories",
    },
  ];

  const linkTypeProps: NavigationAPIDetail[] = [
    {
      name: "href",
      type: "string",
      description: "URL or path for the navigation link",
      required: true,
    },
    {
      name: "label",
      type: "string",
      description: "Display text for the navigation link",
      required: true,
    },
    {
      name: "subComponents",
      type: "DocsSideNavigationLink[]",
      description: "Array of sub-component links that can be expanded under this link",
    },
  ];

  const hookMethods = [
    {
      name: "useResponsiveDetection",
      description: "Hook for detecting screen size and responsive states",
      returnType: "{ isMobile: Signal<boolean>, isCompact: Signal<boolean> }",
    },
    {
      name: "useCategoryExpansion",
      description: "Hook for managing category expansion state",
      args: "categories: DocsSideNavigationCategory[], activePath?: string",
      returnType: "{ activeHref: Signal<string>, expandedCategories: Signal<Record<string, boolean>>, toggleCategory$: QRL }",
    },
    {
      name: "useToggleCallback",
      description: "Hook for creating toggle callback functions",
      args: "callback?: PropFunction<() => void>",
      returnType: "QRL<() => void> | undefined",
    },
  ];

  const cssVariables = [
    {
      name: "--sidebar-width",
      description: "Width of the sidebar in desktop mode",
      defaultValue: "18rem (288px)",
    },
    {
      name: "--sidebar-mobile-width",
      description: "Maximum width of sidebar in mobile mode",
      defaultValue: "85% (max 320px)",
    },
    {
      name: "--animation-duration",
      description: "Duration for expand/collapse animations",
      defaultValue: "300ms",
    },
    {
      name: "--overlay-backdrop",
      description: "Backdrop blur and opacity for mobile overlay",
      defaultValue: "blur(2px) opacity(50%)",
    },
  ];

  const dataAttributes = [
    {
      name: "data-expanded",
      description: "Applied to categories when expanded (true/false)",
    },
    {
      name: "data-active",
      description: "Applied to active navigation links",
    },
    {
      name: "data-mobile",
      description: "Applied to navigation container in mobile mode",
    },
    {
      name: "data-sidebar-visible",
      description: "Applied when sidebar is visible (true/false)",
    },
  ];

  const ariaAttributes = [
    {
      name: "role",
      values: ["navigation", "button"],
      description: "Semantic roles for navigation container and interactive elements",
    },
    {
      name: "aria-expanded",
      values: ["true", "false"],
      description: "Indicates whether collapsible categories and links are expanded",
    },
    {
      name: "aria-label",
      values: ["Open sidebar", "Close sidebar", "Navigation"],
      description: "Accessible labels for buttons and navigation regions",
    },
    {
      name: "aria-hidden",
      values: ["true", "false"],
      description: "Hides decorative icons and collapsed content from screen readers",
    },
    {
      name: "tabIndex",
      values: ["0", "-1"],
      description: "Controls keyboard focus order for interactive elements",
    },
  ];

  const keyboardNavigation = [
    {
      key: "Tab",
      description: "Navigate between focusable elements (links, buttons)",
    },
    {
      key: "Shift + Tab",
      description: "Navigate backwards between focusable elements",
    },
    {
      key: "Enter",
      description: "Activate focused link or toggle expanded state",
    },
    {
      key: "Space",
      description: "Toggle expanded state for categories and expandable links",
    },
    {
      key: "Escape",
      description: "Close mobile sidebar when focused inside",
    },
    {
      key: "Arrow Keys",
      description: "Navigate between sibling navigation items (future enhancement)",
    },
  ];

  const accessibilityFeatures = [
    {
      name: "Screen Reader Support",
      description: "Full compatibility with NVDA, JAWS, VoiceOver, and other screen readers",
      implementation: [
        "Semantic HTML structure with proper headings hierarchy",
        "ARIA labels and roles for interactive elements",
        "Live region announcements for dynamic state changes",
        "Descriptive link text and button labels"
      ]
    },
    {
      name: "Keyboard Navigation",
      description: "Complete keyboard accessibility without mouse dependency",
      implementation: [
        "Tab navigation through all interactive elements",
        "Enter and Space key support for activation",
        "Escape key to close mobile overlays",
        "Visible focus indicators with high contrast"
      ]
    },
    {
      name: "Touch Accessibility",
      description: "Optimized for touch devices and assistive touch technologies",
      implementation: [
        "Minimum 44px touch targets for all interactive elements",
        "Touch-optimized cursors and feedback",
        "Swipe gesture support for mobile sidebar (planned)",
        "Reduced motion respect for vestibular sensitivity"
      ]
    },
    {
      name: "Visual Accessibility",
      description: "Supports users with visual impairments and preferences",
      implementation: [
        "High contrast color combinations (WCAG AA compliant)",
        "Scalable text up to 200% without layout breaking",
        "Clear visual hierarchy and consistent spacing",
        "Dark mode support with appropriate contrast ratios"
      ]
    },
    {
      name: "Cognitive Accessibility",
      description: "Designed for users with cognitive and learning differences",
      implementation: [
        "Clear, consistent navigation patterns",
        "Predictable interaction behaviors",
        "Reduced motion options for sensitive users",
        "Simple, straightforward language in labels"
      ]
    }
  ];

  return (
    <div class="space-y-6">
      <APIReferenceTemplate
        props={navigationProps}
        events={navigationEvents}
        methods={hookMethods}
        cssVariables={cssVariables}
        dataAttributes={dataAttributes}
        {...props}
      >
        <div class="prose prose-sm max-w-none dark:prose-invert">
          <p>
            The Navigation component provides a comprehensive API for building responsive, accessible navigation systems. 
            All props support TypeScript for enhanced development experience.
          </p>
        </div>
      </APIReferenceTemplate>

      {/* Accessibility Documentation */}
      <div class="space-y-6">
        <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-900/20">
          <h3 class="mb-3 text-lg font-semibold text-info-800 dark:text-info-200">
            ♿ Accessibility Features
          </h3>
          <p class="mb-4 text-sm text-info-700 dark:text-info-300">
            The Navigation component is built with accessibility-first principles, ensuring it works for all users regardless of their abilities or assistive technologies.
          </p>
          
          <div class="space-y-4">
            {accessibilityFeatures.map((feature, index) => (
              <div key={index} class="rounded-lg border border-info-300 bg-info-100 p-3 dark:border-info-700 dark:bg-info-900/30">
                <h4 class="mb-2 font-semibold text-info-800 dark:text-info-200">
                  {feature.name}
                </h4>
                <p class="mb-2 text-sm text-info-700 dark:text-info-300">
                  {feature.description}
                </p>
                <ul class="list-disc space-y-1 pl-4 text-xs text-info-600 dark:text-info-400">
                  {feature.implementation.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ARIA Attributes */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            ARIA Attributes
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th class="px-3 py-2 font-medium">Attribute</th>
                  <th class="px-3 py-2 font-medium">Possible Values</th>
                  <th class="px-3 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                {ariaAttributes.map((attr, index) => (
                  <tr key={index} class="bg-white dark:bg-gray-900">
                    <td class="whitespace-nowrap px-3 py-2 font-mono text-primary-600 dark:text-primary-400">
                      {attr.name}
                    </td>
                    <td class="px-3 py-2 font-mono text-gray-500 dark:text-gray-400">
                      {attr.values.map((value, i) => (
                        <span key={i} class="mr-2 rounded bg-gray-100 px-1 dark:bg-gray-800">
                          {value}
                        </span>
                      ))}
                    </td>
                    <td class="px-3 py-2 text-gray-600 dark:text-gray-300">
                      {attr.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Keyboard Navigation */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            ⌨️ Keyboard Navigation
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th class="px-3 py-2 font-medium">Key</th>
                  <th class="px-3 py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                {keyboardNavigation.map((nav, index) => (
                  <tr key={index} class="bg-white dark:bg-gray-900">
                    <td class="whitespace-nowrap px-3 py-2">
                      <kbd class="rounded bg-gray-100 px-2 py-1 text-xs font-mono text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {nav.key}
                      </kbd>
                    </td>
                    <td class="px-3 py-2 text-gray-600 dark:text-gray-300">
                      {nav.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testing Guidelines */}
        <div class="rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-900/20">
          <h3 class="mb-3 text-lg font-semibold text-warning-800 dark:text-warning-200">
            🧪 Accessibility Testing Guidelines
          </h3>
          <div class="space-y-3 text-sm text-warning-700 dark:text-warning-300">
            <div>
              <h4 class="font-semibold">Automated Testing:</h4>
              <ul class="list-disc space-y-1 pl-4 text-xs">
                <li>Use axe-core or similar tools to check for WCAG violations</li>
                <li>Run Lighthouse accessibility audits regularly</li>
                <li>Test with automated keyboard navigation tools</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Manual Testing:</h4>
              <ul class="list-disc space-y-1 pl-4 text-xs">
                <li>Navigate the entire component using only keyboard</li>
                <li>Test with screen readers (NVDA, JAWS, VoiceOver)</li>
                <li>Verify high contrast mode compatibility</li>
                <li>Test with browser zoom up to 200%</li>
                <li>Check reduced motion preferences</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">User Testing:</h4>
              <ul class="list-disc space-y-1 pl-4 text-xs">
                <li>Include users with disabilities in testing sessions</li>
                <li>Test with real assistive technologies</li>
                <li>Gather feedback on navigation patterns and clarity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showTypeDefinitions && (
        <div class="space-y-4">
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              DocsSideNavigationCategory Interface
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th class="px-3 py-2 font-medium">Property</th>
                    <th class="px-3 py-2 font-medium">Type</th>
                    <th class="px-3 py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  {categoryTypeProps.map((prop, index) => (
                    <tr key={index} class="bg-white dark:bg-gray-900">
                      <td class="whitespace-nowrap px-3 py-2 font-mono text-primary-600 dark:text-primary-400">
                        {prop.name}
                        {prop.required && <span class="ml-1 text-red-500">*</span>}
                      </td>
                      <td class="px-3 py-2 font-mono text-gray-500 dark:text-gray-400">
                        {prop.type}
                      </td>
                      <td class="px-3 py-2 text-gray-600 dark:text-gray-300">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              DocsSideNavigationLink Interface
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th class="px-3 py-2 font-medium">Property</th>
                    <th class="px-3 py-2 font-medium">Type</th>
                    <th class="px-3 py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  {linkTypeProps.map((prop, index) => (
                    <tr key={index} class="bg-white dark:bg-gray-900">
                      <td class="whitespace-nowrap px-3 py-2 font-mono text-primary-600 dark:text-primary-400">
                        {prop.name}
                        {prop.required && <span class="ml-1 text-red-500">*</span>}
                      </td>
                      <td class="px-3 py-2 font-mono text-gray-500 dark:text-gray-400">
                        {prop.type}
                      </td>
                      <td class="px-3 py-2 text-gray-600 dark:text-gray-300">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});