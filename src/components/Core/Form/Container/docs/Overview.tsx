import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

/**
 * Container component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Provides consistent spacing and styling for form sections",
    "Supports title and description for clear section labeling",
    "Offers optional border styling for visual separation",
    "Uses proper semantic structure with heading elements",
    "Includes a footer slot for action buttons or supplementary content",
    "Fully compatible with dark mode"
  ];

  const whenToUse = [
    "When organizing forms into logical sections",
    "When you need to visually separate form content areas",
    "When implementing multi-step forms with individual sections",
    "When displaying related form fields as a group",
    "When you need to provide clear section titles and descriptions"
  ];

  const whenNotToUse = [
    "For individual form fields (use Field or related components instead)",
    "When you need complex layouts with multiple columns (use Grid or Flex)",
    "For page-level layouts (use Layout components)",
    "For card-style content that isn't related to forms",
    "When minimal UI is preferred with no visual separation between sections"
  ];

  return (
    <OverviewTemplate
      title="Container Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Container component provides a structured wrapper for form sections, helping to
        organize and separate content into logical units. It offers consistent spacing, optional
        borders, and supports titles and descriptions for clear labeling.
      </p>
      <p class="mt-2">
        By using this component, you can improve the visual hierarchy and readability of complex
        forms, making them easier for users to understand and complete. The component also provides
        proper semantic structure through heading elements.
      </p>
      <p class="mt-2">
        The Container component supports content through its default slot and provides a named
        "footer" slot for action buttons or additional content at the bottom of the container.
        This makes it ideal for creating form sections with consistent action areas.
      </p>
    </OverviewTemplate>
  );
}); 