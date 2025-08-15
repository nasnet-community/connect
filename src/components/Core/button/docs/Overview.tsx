import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const keyFeatures = [
    "12 variants: primary, secondary, outline, ghost, success, error, warning, info, CTA, gradient, glow, glass, and motion",
    "Five size options: extra small (xs), small, medium, large, and extra large (xl)",
    "Customizable border radius: none, small, medium, large, or full",
    "Advanced effects: shadows, pulse animations, and gradient directions",
    "Support for disabled and loading states with smooth transitions",
    "Icon integration (left, right, or both sides) with auto-sizing",
    "Ripple effect on click for better interaction feedback",
    "Fully responsive with mobile-first design approach",
    "Accessible with proper focus states and ARIA attributes",
  ];

  const whenToUse = [
    "For primary user actions and form submissions",
    "To trigger events or transitions in the interface",
    "When users need to make choices or selections",
    "For navigation actions that need more prominence than links",
    "To initiate processes or workflows",
    "In toolbars and action menus",
  ];

  const whenNotToUse = [
    "For simple navigation between pages (use Link instead)",
    "When too many buttons might overwhelm the interface",
    "For secondary or tertiary actions (consider other variants or links)",
    "When an action is not currently available (use disabled state or hide)",
    "For toggle actions that need to show their current state (use Switch or Checkbox)",
  ];

  return (
    <OverviewTemplate
      title="Button Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Button component is a modern, feature-rich interactive element that enables
        users to trigger actions through clicks or taps. With 12 distinct variants including
        eye-catching CTA, gradient, glow, glass, and motion styles, it provides extensive
        customization options for any design system.
      </p>

      <p class="mt-2">
        Beyond traditional variants, the button offers advanced styling capabilities like
        customizable gradients, glassmorphism effects, glowing shadows, and dynamic motion
        animations. Five size options from extra small to extra large, combined with
        adjustable border radius, ensure perfect fit in any layout.
      </p>

      <p class="mt-2">
        Modern features include ripple effects on click, pulse animations for attention,
        shadow elevations, and smooth transitions. The component maintains full accessibility
        with proper ARIA attributes, keyboard navigation, and responsive behavior that
        adapts seamlessly across all device sizes.
      </p>
    </OverviewTemplate>
  );
});
