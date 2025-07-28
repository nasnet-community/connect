import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * Alert component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "status",
      type: "'info' | 'success' | 'warning' | 'error'",
      description: "Determines the color scheme and default icon of the alert",
      defaultValue: "info",
    },
    {
      name: "title",
      type: "string",
      description: "Title text displayed at the top of the alert",
    },
    {
      name: "message",
      type: "string",
      description: "Body text displayed below the title",
    },
    {
      name: "dismissible",
      type: "boolean",
      description:
        "When true, shows a close button that allows users to dismiss the alert",
      defaultValue: "false",
    },
    {
      name: "onDismiss$",
      type: "QRL<() => void>",
      description: "Callback function invoked when the alert is dismissed",
    },
    {
      name: "icon",
      type: "boolean | JSXNode",
      description:
        "Controls whether an icon is shown (true/false) or allows a custom icon element",
      defaultValue: "true",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Determines the padding and text size of the alert",
      defaultValue: "md",
    },
    {
      name: "variant",
      type: "'solid' | 'outline' | 'subtle'",
      description: "Controls the visual style of the alert. 'subtle' variant provides softer colors with enhanced readability",
      defaultValue: "solid",
    },
    {
      name: "autoCloseDuration",
      type: "number",
      description:
        "Time in milliseconds after which the alert will automatically dismiss",
    },
    {
      name: "loading",
      type: "boolean",
      description:
        "When true, displays a loading spinner instead of the status icon",
      defaultValue: "false",
    },
    {
      name: "id",
      type: "string",
      description: "HTML id attribute applied to the alert element",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the alert",
    },
    {
      name: "animation",
      type: "'fadeIn' | 'slideUp' | 'slideDown' | 'scaleUp'",
      description: "Animation type for alert entrance. Enhances user experience with smooth transitions",
      defaultValue: "fadeIn",
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Content to display within the alert",
    },
  ];

  // Alert component doesn't have methods, but we need to provide an empty array
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The Alert component provides a flexible interface for displaying various
        types of notifications to users. It supports different visual styles,
        sizes, and behaviors to accommodate diverse use cases across your
        application.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-medium">Status Types</h3>
      <p class="mb-4">
        The <code>status</code> prop affects the color scheme and default icon:
      </p>
      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Status</th>
            <th class="border-b px-4 py-2 text-left">Color</th>
            <th class="border-b px-4 py-2 text-left">Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">info</td>
            <td class="border-b px-4 py-2">Blue</td>
            <td class="border-b px-4 py-2">
              General information, neutral updates, or guidance
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">success</td>
            <td class="border-b px-4 py-2">Green</td>
            <td class="border-b px-4 py-2">
              Successful operations, completed actions, or positive feedback
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">warning</td>
            <td class="border-b px-4 py-2">Yellow/Orange</td>
            <td class="border-b px-4 py-2">
              Cautions, important notices, or potential issues
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">error</td>
            <td class="border-b px-4 py-2">Red</td>
            <td class="border-b px-4 py-2">
              Errors, failures, or critical issues that require attention
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Visual Variants</h3>
      <p class="mb-4">
        The <code>variant</code> prop determines the alert's visual style with built-in theme integration:
      </p>
      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Variant</th>
            <th class="border-b px-4 py-2 text-left">Description</th>
            <th class="border-b px-4 py-2 text-left">Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">solid</td>
            <td class="border-b px-4 py-2">
              Full background color with high contrast text
            </td>
            <td class="border-b px-4 py-2">Critical alerts, primary notifications</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">outline</td>
            <td class="border-b px-4 py-2">
              Transparent background with colored border and text
            </td>
            <td class="border-b px-4 py-2">Secondary alerts, inline messaging</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">subtle</td>
            <td class="border-b px-4 py-2">
              Soft background colors with enhanced readability
            </td>
            <td class="border-b px-4 py-2">Background notifications, non-intrusive messages</td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Responsive Size Options</h3>
      <p class="mb-4">
        The <code>size</code> prop provides responsive sizing with mobile-optimized touch targets:
      </p>
      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Size</th>
            <th class="border-b px-4 py-2 text-left">Mobile</th>
            <th class="border-b px-4 py-2 text-left">Desktop</th>
            <th class="border-b px-4 py-2 text-left">Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">sm</td>
            <td class="border-b px-4 py-2">
              Compact with touch-friendly buttons (44px min)
            </td>
            <td class="border-b px-4 py-2">
              Minimal padding for dense layouts
            </td>
            <td class="border-b px-4 py-2">
              Inline alerts, form validation messages
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">md</td>
            <td class="border-b px-4 py-2">
              Balanced sizing with proper spacing
            </td>
            <td class="border-b px-4 py-2">
              Standard padding and typography
            </td>
            <td class="border-b px-4 py-2">
              Default for most alerts and notifications
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">lg</td>
            <td class="border-b px-4 py-2">
              Large, highly visible with generous touch areas
            </td>
            <td class="border-b px-4 py-2">
              Prominent display with emphasis
            </td>
            <td class="border-b px-4 py-2">
              Critical messages, featured announcements
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Animation Types</h3>
      <p class="mb-4">
        The <code>animation</code> prop provides smooth entrance animations optimized for different contexts:
      </p>
      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Animation</th>
            <th class="border-b px-4 py-2 text-left">Behavior</th>
            <th class="border-b px-4 py-2 text-left">Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">fadeIn</td>
            <td class="border-b px-4 py-2">Smooth opacity transition</td>
            <td class="border-b px-4 py-2">General purpose, non-intrusive alerts</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">slideUp</td>
            <td class="border-b px-4 py-2">Slides up from bottom</td>
            <td class="border-b px-4 py-2">Mobile notifications, bottom alerts</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">slideDown</td>
            <td class="border-b px-4 py-2">Slides down from top</td>
            <td class="border-b px-4 py-2">Header alerts, page-level notifications</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">scaleUp</td>
            <td class="border-b px-4 py-2">Scales from center point</td>
            <td class="border-b px-4 py-2">Action confirmations, modal-like alerts</td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Mobile Optimization Features</h3>
      <p class="mb-4">
        The Alert component includes several mobile-specific enhancements:
      </p>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">Touch Accessibility:</h5>
          <ul class="text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Minimum 44px touch targets for dismiss buttons</li>
            <li>• Responsive text sizing for readability</li>
            <li>• Safe area padding for notched devices</li>
            <li>• Optimized animations for touch devices</li>
          </ul>
        </div>
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">Theme Integration:</h5>
          <ul class="text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Automatic dark mode support</li>
            <li>• Consistent color tokens across themes</li>
            <li>• High contrast mode compatibility</li>
            <li>• System preference detection</li>
          </ul>
        </div>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">Accessibility</h3>
      <p class="mb-1">
        The Alert component implements accessibility best practices:
      </p>
      <ul class="list-disc space-y-1 pl-5">
        <li>
          Uses <code>role="alert"</code> to ensure screen readers announce the
          content
        </li>
        <li>
          Dismissible alerts include proper aria-label for the close button
        </li>
        <li>
          Maintains sufficient color contrast for all status types and variants
        </li>
        <li>
          Auto-dismissing alerts provide enough time for users to perceive the
          content
        </li>
        <li>Status icons help convey meaning through visual cues</li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-medium">Theme Customization</h3>
      <p class="mb-4">
        The Alert component leverages Tailwind's color system for consistent theming:
      </p>
      
      <div class="space-y-4">
        <div class="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Using Brand Colors</h4>
          <pre class="text-sm overflow-x-auto bg-white dark:bg-gray-900 p-3 rounded">
<code>{`// Override with primary brand colors from Tailwind config
<Alert
  status="info"
  class="bg-primary-100 text-primary-800 border-primary-300 
         dark:bg-primary-900 dark:text-primary-100"
  title="Brand Alert"
/>`}</code>
          </pre>
        </div>

        <div class="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Responsive Customization</h4>
          <pre class="text-sm overflow-x-auto bg-white dark:bg-gray-900 p-3 rounded">
<code>{`// Different styles for different devices
<Alert
  status="success"
  class="mobile:text-xs mobile:p-2 
         tablet:text-sm tablet:p-4 
         desktop:text-base desktop:p-6"
  title="Responsive Alert"
/>`}</code>
          </pre>
        </div>

        <div class="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Advanced Styling</h4>
          <pre class="text-sm overflow-x-auto bg-white dark:bg-gray-900 p-3 rounded">
<code>{`// Gradient background with glass morphism
<Alert
  status="info"
  class="bg-gradient-to-r from-primary-100 to-secondary-100 
         backdrop-blur-sm border-white/30
         dark:from-primary-900 dark:to-secondary-900"
  title="Modern Alert"
/>`}</code>
          </pre>
        </div>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">Color Reference</h3>
      <p class="mb-4">
        Available semantic colors from your Tailwind configuration:
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div class="p-3 rounded bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-100">
          <div class="font-medium">Info</div>
          <div class="text-xs opacity-75">info-50 to info-950</div>
        </div>
        <div class="p-3 rounded bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100">
          <div class="font-medium">Success</div>
          <div class="text-xs opacity-75">success-50 to success-950</div>
        </div>
        <div class="p-3 rounded bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100">
          <div class="font-medium">Warning</div>
          <div class="text-xs opacity-75">warning-50 to warning-950</div>
        </div>
        <div class="p-3 rounded bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100">
          <div class="font-medium">Error</div>
          <div class="text-xs opacity-75">error-50 to error-950</div>
        </div>
      </div>
    </APIReferenceTemplate>
  );
});
