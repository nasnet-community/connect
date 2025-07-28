import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const keyFeatures = [
    "VisuallyHidden component for screen reader accessibility",
    "Type-safe utility functions for common tasks",
    "Responsive design utilities optimized for all devices",
    "Theme-aware helpers supporting dark and light modes",
    "Performance-optimized className merging utilities",
    "Comprehensive TypeScript type definitions",
    "Mobile-first design patterns and helpers",
    "Cross-platform compatibility utilities",
  ];

  const whenToUse = [
    "When you need to hide content visually but keep it accessible to screen readers",
    "For generating unique IDs for form elements and ARIA relationships",
    "When merging multiple className strings conditionally",
    "For debouncing user input to improve performance",
    "When building responsive components that adapt to different screen sizes",
    "For consistent type definitions across your application",
    "When implementing accessible patterns like skip links or announcements",
  ];

  const whenNotToUse = [
    "For hiding interactive elements (use proper ARIA states instead)",
    "When content should be completely removed from the accessibility tree",
    "For complex state management (use Qwik's reactive primitives)",
    "For component-specific utilities (keep those co-located with components)",
    "When native HTML/CSS solutions are sufficient",
  ];

  return (
    <OverviewTemplate
      title="Common Utilities & Components"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The common module provides essential utilities, types, and components that are shared across
        the entire application. These foundational elements ensure consistency, accessibility, and
        developer efficiency throughout your codebase.
      </p>

      <p class="mt-2">
        At its core, the module includes the VisuallyHidden component for accessibility, a
        comprehensive set of TypeScript type definitions, and utility functions that solve common
        development challenges. All utilities are optimized for performance and support both light
        and dark themes.
      </p>

      <p class="mt-2">
        These utilities follow mobile-first design principles and are fully responsive, ensuring
        your application works seamlessly across all devices. They integrate perfectly with
        Tailwind CSS and Qwik's reactive system, providing a solid foundation for building modern,
        accessible web applications.
      </p>
    </OverviewTemplate>
  );
});