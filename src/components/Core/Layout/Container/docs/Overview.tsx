import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

/**
 * Container component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Constrains content width at different responsive breakpoints",
    "Provides consistent horizontal and vertical padding options",
    "Can be centered or aligned to the container edge",
    "Supports fixed width or responsive behavior",
    "Easily nested for complex layouts",
    "Compatible with both light and dark themes"
  ];

  const whenToUse = [
    "When you need to constrain content width for better readability",
    "To create consistent page layouts with proper spacing",
    "When implementing a responsive grid system",
    "For creating centered content blocks with consistent margins",
    "To establish a visual hierarchy with different content widths"
  ];

  const whenNotToUse = [
    "When full-width or edge-to-edge layouts are preferred",
    "For small UI components that don't need width constraints",
    "When more complex or custom layout behavior is required",
    "For flexbox or grid-based layouts that need full flexibility",
    "When implementing specialized layout components like cards or sidebars"
  ];

  return (
    <OverviewTemplate
      title="Container Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Container component is a fundamental layout element that constrains content width
        and provides consistent padding. It helps maintain readability and content structure
        across different screen sizes by setting appropriate maximum widths and spacing.
      </p>
      
      <p class="mt-2">
        Containers are responsive by default, applying their maximum width constraints only at
        the specified breakpoint and above. This ensures content remains fluid on smaller screens
        and properly constrained on larger ones. For cases where consistent width is needed across
        all breakpoints, the fixedWidth option provides non-responsive behavior.
      </p>
      
      <p class="mt-2">
        With configurable padding options and automatic centering capabilities, the Container
        component serves as a versatile building block for creating consistent, responsive layouts
        throughout your application.
      </p>
    </OverviewTemplate>
  );
});
