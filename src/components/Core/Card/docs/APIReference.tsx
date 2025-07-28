import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates/APIReferenceTemplate";
import type { PropDetail } from "~/components/Docs/templates/APIReferenceTemplate";

export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "variant",
      type: "'default' | 'bordered' | 'elevated' | 'success' | 'warning' | 'error' | 'info' | 'glass' | 'gradient'",
      defaultValue: "'default'",
      description: "Determines the visual style of the card. Semantic variants (success, warning, error, info) are ideal for status messages. Special variants (glass, gradient) create unique visual effects.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the card container.",
    },
    {
      name: "hasHeader",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, creates a header section at the top of the card that will receive content from the 'header' slot.",
    },
    {
      name: "hasFooter",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, creates a footer section at the bottom of the card that will receive content from the 'footer' slot.",
    },
    {
      name: "hasActions",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, creates an action buttons container in the footer section that will receive content from the 'actions' slot. Requires hasFooter to be true as well.",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, displays a loading spinner overlay on top of the card content.",
    },
    {
      name: "noPadding",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, removes the default padding from the card body. Useful for cards with media content or custom internal layouts.",
    },
    {
      name: "containerClass",
      type: "string",
      description: "CSS classes for the container wrapper. Enables container queries by adding @container classes for responsive behavior based on container width rather than viewport.",
    },
    {
      name: "role",
      type: "string",
      defaultValue: "'article'",
      description: "ARIA role for the card element. Use appropriate semantic roles like 'article', 'region', or 'complementary' based on content type.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label for the card. Use when the card doesn't have a visible heading that can be referenced with aria-labelledby.",
    },
    {
      name: "aria-labelledby",
      type: "string",
      description: "ID of the element that labels the card. Typically references a heading element within the card for better accessibility.",
    },
    {
      name: "data-testid",
      type: "string",
      description: "Test identifier for automated testing frameworks. Helps locate the card element in integration and e2e tests.",
    },
    {
      name: "data-card-variant",
      type: "string",
      description: "Custom data attribute for styling hooks or tracking. Defaults to the variant value if not specified.",
    },
  ];

  const cssVariables: Array<{
    name: string;
    defaultValue?: string;
    description: string;
  }> = [];

  const dataAttributes = [
    {
      name: "data-loading",
      description: "Present when the card is in loading state.",
    },
    {
      name: "data-card-variant",
      description: "Contains the card variant value for CSS styling hooks and JavaScript selectors.",
    },
  ];

  return (
    <APIReferenceTemplate
      props={props}
      cssVariables={cssVariables}
      dataAttributes={dataAttributes}
    >
      <div>
        <h3 class="mb-3 text-lg font-semibold">Slots</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Name
                </th>
                <th class="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-4 py-2 font-mono text-sm text-gray-700 dark:text-gray-300">
                  default
                </td>
                <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  The main content area of the card.
                </td>
              </tr>
              <tr>
                <td class="px-4 py-2 font-mono text-sm text-gray-700 dark:text-gray-300">
                  header
                </td>
                <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  Content to be rendered in the card header section. Only
                  visible when hasHeader is true.
                </td>
              </tr>
              <tr>
                <td class="px-4 py-2 font-mono text-sm text-gray-700 dark:text-gray-300">
                  footer
                </td>
                <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  Content to be rendered in the card footer section. Only
                  visible when hasFooter is true.
                </td>
              </tr>
              <tr>
                <td class="px-4 py-2 font-mono text-sm text-gray-700 dark:text-gray-300">
                  actions
                </td>
                <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  Interactive elements like buttons to be placed in the footer's
                  action area. Only visible when both hasFooter and hasActions
                  are true.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mb-3 mt-8 text-lg font-semibold">Accessibility</h3>
        <ul class="list-inside list-disc space-y-2">
          <li>The Card component includes a default ARIA role of 'article' which can be customized based on content type.</li>
          <li>All variants maintain WCAG AA color contrast ratios in both light and dark modes.</li>
          <li>Focus states are clearly visible with ring styling that adapts to the card variant.</li>
          <li>The component supports keyboard navigation with tabIndex={0} by default.</li>
          <li>
            Use aria-label when the card lacks a visible heading, or aria-labelledby to reference an existing heading element.
          </li>
          <li>
            Interactive elements within cards maintain minimum touch target sizes of 44x44px for mobile accessibility.
          </li>
          <li>
            Loading states announce changes to screen readers through the spinner component's ARIA attributes.
          </li>
          <li>
            For card collections, consider wrapping in a nav element with aria-label or using list semantics for better screen reader navigation.
          </li>
        </ul>

        <h3 class="mb-3 mt-8 text-lg font-semibold">Variant Guidelines</h3>
        <div class="space-y-4">
          <div>
            <h4 class="mb-2 font-semibold">Layout Variants</h4>
            <ul class="list-inside list-disc space-y-1 text-sm">
              <li><strong>default:</strong> Standard appearance for general content</li>
              <li><strong>bordered:</strong> Enhanced borders for stronger visual separation</li>
              <li><strong>elevated:</strong> Shadow effects for hierarchical emphasis</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-2 font-semibold">Semantic Variants</h4>
            <ul class="list-inside list-disc space-y-1 text-sm">
              <li><strong>success:</strong> Positive feedback, confirmations, completed actions</li>
              <li><strong>warning:</strong> Important notices, cautions, pending states</li>
              <li><strong>error:</strong> Error messages, failures, critical alerts</li>
              <li><strong>info:</strong> General information, tips, neutral messages</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-2 font-semibold">Special Effect Variants</h4>
            <ul class="list-inside list-disc space-y-1 text-sm">
              <li><strong>glass:</strong> Glassmorphism with backdrop blur, best on colorful backgrounds</li>
              <li><strong>gradient:</strong> Eye-catching gradient for featured content or CTAs</li>
            </ul>
          </div>
        </div>
      </div>
    </APIReferenceTemplate>
  );
});
