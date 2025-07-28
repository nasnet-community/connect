import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * Dialog component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Accessible modal dialogs following WAI-ARIA guidelines",
    "Mobile-optimized with automatic fullscreen mode on small devices",
    "Multiple size options from small to full-screen with responsive behavior",
    "Touch-friendly controls with proper hit areas on mobile devices",
    "Safe area support for devices with notches and gesture navigation",
    "Focus trap functionality for improved keyboard navigation",
    "Configurable backdrop with blur effects and theme support",
    "Responsive animations that adapt to device capabilities",
    "Interactive content support including forms and scrollable content",
    "Surface elevation using theme utilities for consistent depth",
  ];

  const whenToUse = [
    "For critical information requiring immediate user attention",
    "To collect user input through a focused form interface",
    "When confirming a user's action before proceeding",
    "To display details without navigating away from the current page",
    "For complex interactions that need to be isolated from the main page",
    "To display important information that needs acknowledgment",
  ];

  const whenNotToUse = [
    "For non-critical information that doesn't require interruption",
    "When a message can be shown inline within the current context",
    "For simple notifications that don't require user action (use Toast instead)",
    "When multiple dialogs would need to be stacked (avoid nested dialogs)",
    "For content that's better suited for a separate page in the navigation flow",
    "For large amounts of content that would require extensive scrolling",
  ];

  return (
    <OverviewTemplate
      title="Dialog Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Dialog component creates an overlay element that displays content in
        a layer above the page, interrupting the user's workflow to capture
        attention or gather input. It follows accessibility best practices by
        managing focus, providing keyboard navigation, and ensuring screen
        reader compatibility.
      </p>

      <p class="mt-2">
        Dialogs are structured with optional header, body, and footer sections,
        making them versatile for various use cases from simple alerts to
        complex forms. The component handles the backdrop, positioning,
        animations, and accessibility concerns, letting you focus on the
        content.
      </p>

      <p class="mt-2">
        The component is fully responsive, automatically adapting to different
        screen sizes. On mobile devices, dialogs switch to fullscreen mode with
        optimized animations and touch-friendly controls. The implementation
        uses theme utilities for consistent styling, proper surface elevation,
        and backdrop effects that enhance the visual hierarchy.
      </p>

      <p class="mt-2">
        With features like customizable sizes, scrollable content areas,
        controlled focus management, and mobile-specific optimizations, the
        Dialog component provides a complete solution for creating modal
        interfaces that work seamlessly across all devices and input methods
        while maintaining a consistent, accessible user experience.
      </p>
    </OverviewTemplate>
  );
});
