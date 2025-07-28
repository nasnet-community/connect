import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * Enhanced Drawer component API reference documentation with mobile features
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "isOpen",
      type: "boolean",
      description: "Controls the visibility of the drawer.",
      defaultValue: "false",
    },
    {
      name: "onClose$",
      type: "QRL<() => void>",
      description: "Callback function invoked when the drawer is closed.",
    },
    {
      name: "placement",
      type: "'left' | 'right' | 'top' | 'bottom'",
      description: "The edge of the screen from which the drawer will slide in.",
      defaultValue: "right",
    },
    {
      name: "size",
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      description: "Controls the width (for left/right) or height (for top/bottom) of the drawer.",
      defaultValue: "md",
    },
    {
      name: "customSize",
      type: "string",
      description: "Custom size (width or height) of the drawer (e.g., '300px' or '50%').",
    },
    {
      name: "hasOverlay",
      type: "boolean",
      description: "When true, displays a backdrop overlay behind the drawer.",
      defaultValue: "true",
    },
    {
      name: "closeOnOverlayClick",
      type: "boolean",
      description: "When true, clicking the overlay will close the drawer.",
      defaultValue: "true",
    },
    {
      name: "closeOnEsc",
      type: "boolean",
      description: "When true, pressing the Escape key will close the drawer.",
      defaultValue: "true",
    },
    {
      name: "hasCloseButton",
      type: "boolean",
      description: "When true, shows a close button in the drawer header.",
      defaultValue: "true",
    },
    {
      name: "trapFocus",
      type: "boolean",
      description: "When true, traps focus within the drawer when open.",
      defaultValue: "true",
    },
    {
      name: "restoreFocus",
      type: "boolean",
      description: "When true, restores focus to the triggering element when closed.",
      defaultValue: "true",
    },
    {
      name: "blockScroll",
      type: "boolean",
      description: "When true, prevents body scrolling while the drawer is open.",
      defaultValue: "true",
    },
    {
      name: "disableAnimation",
      type: "boolean",
      description: "When true, disables the slide-in/out animations.",
      defaultValue: "false",
    },
    {
      name: "zIndex",
      type: "number",
      description: "Z-index value for the drawer and overlay.",
      defaultValue: "1000",
    },
    {
      name: "ariaLabel",
      type: "string",
      description: "ARIA label for the drawer when no header title is provided.",
    },
    {
      name: "ariaLabelledby",
      type: "string",
      description: "ID of the element that labels the drawer.",
    },
    {
      name: "ariaDescribedby",
      type: "string",
      description: "ID of the element that describes the drawer content.",
    },
    {
      name: "drawerClass",
      type: "string",
      description: "Additional CSS classes to apply to the drawer element.",
    },
    {
      name: "overlayClass",
      type: "string",
      description: "Additional CSS classes to apply to the overlay element.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the drawer container.",
    },
    {
      name: "id",
      type: "string",
      description: "HTML ID attribute for the drawer element.",
    },
    // Enhanced mobile features
    {
      name: "enableSwipeGestures",
      type: "boolean",
      description: "When true, allows closing the drawer with swipe gestures on touch devices.",
      defaultValue: "false",
    },
    {
      name: "swipeThreshold",
      type: "number",
      description: "Minimum distance (in pixels) required to trigger a swipe close gesture.",
      defaultValue: "50",
    },
    {
      name: "showDragHandle",
      type: "boolean",
      description: "When true, shows a visual drag handle to indicate swipe capability.",
      defaultValue: "false",
    },
    {
      name: "backdropBlur",
      type: "'light' | 'medium' | 'heavy'",
      description: "Controls the intensity of the backdrop blur effect for better focus.",
      defaultValue: "medium",
    },
    {
      name: "responsiveSize",
      type: "'sm' | 'md' | 'lg'",
      description: "Responsive sizing that adapts to different screen sizes automatically.",
      defaultValue: "md",
    },
    {
      name: "mobileAnimation",
      type: "boolean",
      description: "When true, uses mobile-optimized animations for smoother performance.",
      defaultValue: "true",
    },
  ];

  // No methods for the Drawer component
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The Drawer component provides a slide-out panel interface that can be positioned 
        on any edge of the screen. It includes advanced mobile features like swipe gestures, 
        backdrop blur effects, and responsive sizing for optimal user experience across devices.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-medium">Drawer Composition</h3>
      <p class="mb-4">
        The Drawer component works with several sub-components for structured content:
      </p>
      <ul class="mb-4 list-disc space-y-1 pl-5">
        <li>
          <code>DrawerHeader</code> - Contains the drawer title and optional close button
        </li>
        <li>
          <code>DrawerContent</code> - Contains the main scrollable content area
        </li>
        <li>
          <code>DrawerFooter</code> - Contains action buttons or controls at the bottom
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-medium">Placement Options</h3>
      <p class="mb-4">
        The drawer can slide in from any edge of the screen:
      </p>
      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Placement</th>
            <th class="border-b px-4 py-2 text-left">Slide Direction</th>
            <th class="border-b px-4 py-2 text-left">Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2"><code>left</code></td>
            <td class="border-b px-4 py-2">Slides in from the left edge</td>
            <td class="border-b px-4 py-2">Navigation menus, filters</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>right</code></td>
            <td class="border-b px-4 py-2">Slides in from the right edge</td>
            <td class="border-b px-4 py-2">Settings panels, detailed views</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>top</code></td>
            <td class="border-b px-4 py-2">Slides down from the top</td>
            <td class="border-b px-4 py-2">Notifications, quick actions</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>bottom</code></td>
            <td class="border-b px-4 py-2">Slides up from the bottom</td>
            <td class="border-b px-4 py-2">Mobile actions, forms (thumb-friendly)</td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Responsive Size Options</h3>
      <p class="mb-4">
        Drawer sizes automatically adapt to different screen sizes:
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
            <td class="border-b px-4 py-2"><code>xs</code></td>
            <td class="border-b px-4 py-2">70% width</td>
            <td class="border-b px-4 py-2">320px width</td>
            <td class="border-b px-4 py-2">Compact menus, quick settings</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>sm</code></td>
            <td class="border-b px-4 py-2">80% width</td>
            <td class="border-b px-4 py-2">384px width</td>
            <td class="border-b px-4 py-2">Navigation, simple forms</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>md</code></td>
            <td class="border-b px-4 py-2">90% width</td>
            <td class="border-b px-4 py-2">448px width</td>
            <td class="border-b px-4 py-2">Default size, general content</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>lg</code></td>
            <td class="border-b px-4 py-2">95% width</td>
            <td class="border-b px-4 py-2">512px width</td>
            <td class="border-b px-4 py-2">Detailed views, complex forms</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>xl</code></td>
            <td class="border-b px-4 py-2">98% width</td>
            <td class="border-b px-4 py-2">576px width</td>
            <td class="border-b px-4 py-2">Rich content, data tables</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>full</code></td>
            <td class="border-b px-4 py-2">100% width</td>
            <td class="border-b px-4 py-2">100% width</td>
            <td class="border-b px-4 py-2">Fullscreen experiences</td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Mobile Touch Gesture Features</h3>
      <p class="mb-4">
        Advanced touch gesture support for mobile devices:
      </p>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">Swipe Gestures:</h5>
          <ul class="text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Direction-aware swipe detection</li>
            <li>• Configurable swipe threshold</li>
            <li>• Velocity-based gesture recognition</li>
            <li>• Visual feedback during interactions</li>
          </ul>
        </div>
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">Mobile Optimizations:</h5>
          <ul class="text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Bottom placement for thumb reach</li>
            <li>• Drag handles for gesture indication</li>
            <li>• Backdrop blur for better focus</li>
            <li>• Safe area padding for notched devices</li>
          </ul>
        </div>
      </div>

      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Gesture Feature</th>
            <th class="border-b px-4 py-2 text-left">Behavior</th>
            <th class="border-b px-4 py-2 text-left">Configuration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">Swipe to Close</td>
            <td class="border-b px-4 py-2">Swipe in the direction opposite to drawer placement</td>
            <td class="border-b px-4 py-2"><code>enableSwipeGestures={true}</code></td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">Swipe Threshold</td>
            <td class="border-b px-4 py-2">Minimum distance required to trigger close</td>
            <td class="border-b px-4 py-2"><code>swipeThreshold={50}</code></td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">Drag Handle</td>
            <td class="border-b px-4 py-2">Visual indicator for swipe interactions</td>
            <td class="border-b px-4 py-2"><code>showDragHandle={true}</code></td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">Backdrop Blur</td>
            <td class="border-b px-4 py-2">Blur intensity for better content focus</td>
            <td class="border-b px-4 py-2"><code>backdropBlur="heavy"</code></td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Theme Integration</h3>
      <p class="mb-4">
        The Drawer component seamlessly integrates with your application's theme system:
      </p>
      <ul class="mb-4 list-disc space-y-1 pl-5">
        <li>Automatic dark mode support with consistent color tokens</li>
        <li>High contrast mode compatibility for accessibility</li>
        <li>Responsive backdrop blur that adapts to theme</li>
        <li>Mobile-optimized animations that respect reduced motion preferences</li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-medium">Accessibility</h3>
      <p class="mb-1">
        The Drawer component implements comprehensive accessibility features:
      </p>
      <ul class="list-disc space-y-1 pl-5">
        <li>
          Uses <code>role="dialog"</code> and <code>aria-modal="true"</code> for 
          proper screen reader identification
        </li>
        <li>
          Provides <code>aria-label</code>, <code>aria-labelledby</code>, and 
          <code>aria-describedby</code> attributes for context
        </li>
        <li>
          Traps focus within the drawer to ensure keyboard navigation stays contained
        </li>
        <li>
          Returns focus to the triggering element when the drawer is closed
        </li>
        <li>Supports dismissal via the Escape key (configurable)</li>
        <li>Touch gesture recognition works with assistive technologies</li>
        <li>Drag handles include proper ARIA labels for screen readers</li>
        <li>Maintains minimum 44px touch targets for interactive elements</li>
      </ul>
    </APIReferenceTemplate>
  );
});