import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates/OverviewTemplate";

export default component$(() => {
  const keyFeatures = [
    "Versatile Layout Options: Cards can include headers, footers, and dedicated action areas",
    "Multiple Visual Variants: Default, bordered, or elevated styles to match your design needs",
    "Loading State: Built-in loading state with spinner to indicate when content is being fetched",
    "Responsive Design: Automatically adjusts padding and layout for different screen sizes",
    "Dark Mode Support: Seamlessly transitions between light and dark themes",
    "Flexible Content Placement: Uses Qwik's Slot component for easy content projection in different card sections",
    "No Padding Option: Ability to remove internal padding for custom layouts or media content",
  ];

  const whenToUse = [
    "Group related information in a visually distinct container",
    "Present a collection of similar items with consistent formatting",
    "Create dashboards with multiple content sections",
    "Display information that requires visual separation from surrounding elements",
    "Organize content into sections with headers and footers",
    "Present information that may require user actions or interactions",
  ];

  const whenNotToUse = [
    "For simple inline content that doesn't need visual containment",
    "When content density is a priority and visual separation adds unnecessary space",
    "For highly interactive complex forms (consider dedicated form layouts instead)",
    "When clear content hierarchy is more important than visual grouping",
    "For content that requires minimal styling or visual emphasis",
  ];

  return (
    <OverviewTemplate
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Card component serves as a container for content, providing
        structure and visual grouping. Cards are used to organize and display
        information, making it easier for users to scan and interact with
        related content.
      </p>
      <p class="mt-2">
        With support for headers, footers, and action areas, cards provide a
        flexible way to present different types of content with consistent
        styling while maintaining visual hierarchy.
      </p>
      <p class="mt-2">
        Cards are fundamental building blocks in modern interfaces, serving as
        containers for everything from simple text displays to complex
        interactive elements.
      </p>
    </OverviewTemplate>
  );
});
