import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "../../../../Docs/templates/UsageTemplate";

export default component$(() => {
  const guidelines: UsageGuideline[] = [
    // Do's
    {
      title: "Use for server-rendered forms",
      description:
        "Use ServerFormField when creating server-rendered forms without client-side JavaScript",
      type: "do",
    },
    {
      title: "Provide clear labels",
      description: "Provide clear, concise labels to improve form usability",
      type: "do",
    },
    {
      title: "Indicate required fields",
      description: "Use the required prop to indicate mandatory fields",
      type: "do",
    },
    {
      title: "Display validation errors",
      description:
        "Display validation error messages with the errorMessage prop",
      type: "do",
    },
    {
      title: "Use inline layout appropriately",
      description: "Use the inline layout for checkboxes and radio buttons",
      type: "do",
    },
    {
      title: "Group related fields",
      description: "Group related fields together for better organization",
      type: "do",
    },
    {
      title: "Helpful error messages",
      description: "Ensure error messages are descriptive and helpful",
      type: "do",
    },
    {
      title: "Consistent components",
      description:
        "Use ServerButton for form submissions to maintain consistency",
      type: "do",
    },
    // Don'ts
    {
      title: "Client-side validation",
      description:
        "Don't use ServerFormField when you need client-side validation",
      type: "dont",
    },
    {
      title: "Omit labels",
      description:
        "Don't omit labels or use placeholder text as the only label",
      type: "dont",
    },
    {
      title: "Long labels",
      description: "Don't use overly long or complex labels",
      type: "dont",
    },
    {
      title: "Inline for long inputs",
      description:
        "Don't use inline layout for longer input fields like text areas",
      type: "dont",
    },
    {
      title: "Color-only indicators",
      description: "Don't rely solely on color to indicate error states",
      type: "dont",
    },
    {
      title: "Mix component types",
      description:
        "Don't mix server components with client-interactive components in the same form",
      type: "dont",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Screen reader labels",
      description:
        "Ensure all form fields have proper labels for screen readers",
    },
    {
      title: "Required fields",
      description:
        "Use required attribute to indicate mandatory fields both visually and semantically",
    },
    {
      title: "Clear error messages",
      description:
        "Provide clear error messages that explain how to resolve the issue",
    },
    {
      title: "Color contrast",
      description:
        "Maintain sufficient color contrast between text and background",
    },
    {
      title: "Group controls",
      description:
        "Group related form controls with appropriate fieldset and legend elements when needed",
    },
    {
      title: "Focus states",
      description: "Ensure focus states are visible for keyboard navigation",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Labeling",
      description:
        "Use clear, concise labels that describe the expected input. Position labels consistently above inputs (or inline for checkboxes/radio buttons).",
    },
    {
      title: "Error Handling",
      description:
        "Display specific, actionable error messages below the input field. Use the errorMessage prop to show validation feedback from server-side validation.",
    },
    {
      title: "Field Organization",
      description:
        "Group related fields together and organize fields in a logical order. Consider the tab order for keyboard users.",
    },
    {
      title: "Required Fields",
      description:
        "Clearly indicate required fields with the required prop, which adds an asterisk (*) to the label.",
    },
    {
      title: "Integration",
      description:
        "Use ServerFormField in conjunction with other server components like Select, ServerButton, and form elements to create cohesive server-rendered forms.",
    },
    {
      title: "Progressive Enhancement",
      description:
        "Design forms to work without JavaScript first, then enhance with client-side features where available and appropriate.",
    },
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      accessibilityTips={accessibilityTips}
      bestPractices={bestPractices}
    >
      <div class="mb-6">
        <h2 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Using ServerField Components
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          ServerField components are designed for building forms in
          server-rendered applications where minimal client-side JavaScript is
          preferred or required. These components work well in environments
          where progressive enhancement is the primary strategy.
        </p>
      </div>

      <div class="mb-6">
        <h3 class="text-md mb-2 font-semibold text-gray-900 dark:text-white">
          When to use ServerField
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          Consider using ServerField components when:
        </p>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
          <li>
            Building server-rendered forms with traditional form submission
          </li>
          <li>Creating forms that need to work without JavaScript</li>
          <li>Implementing forms with server-side validation</li>
          <li>Developing for environments with limited JavaScript support</li>
          <li>Focusing on performance and minimal client-side code</li>
        </ul>
      </div>

      <div class="mb-6">
        <h3 class="text-md mb-2 font-semibold text-gray-900 dark:text-white">
          Comparison with Standard Field Component
        </h3>
        <div class="mt-2 overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 border border-gray-200 dark:divide-gray-700 dark:border-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Feature
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  ServerFormField
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Field (Client)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Client-side validation
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ❌ No
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ✅ Yes
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Interactive feedback
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ❌ No
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ✅ Yes
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Works without JavaScript
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ✅ Yes
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ❌ Limited
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Server-side validation
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ✅ Yes
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ✅ Yes
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Client-side bundle size
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ✅ Minimal
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ❌ Larger
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Rich interactive features
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ❌ No
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  ✅ Yes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </UsageTemplate>
  );
});
