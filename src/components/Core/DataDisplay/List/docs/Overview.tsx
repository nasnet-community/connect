import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const keyFeatures = [
    "Support for unordered, ordered, and definition list types",
    "Multiple marker styles (disc, circle, square, decimal, roman, alpha)",
    "Various size and spacing options",
    "Support for nested lists with proper indentation",
    "Interactive states for list items (active, disabled)",
    "Accessible implementation with proper ARIA attributes",
    "Consistent styling and spacing",
  ];

  const whenToUse = [
    "For displaying collections of related items in a structured format",
    "When presenting sequential steps or instructions",
    "For organizing navigation items in menus or sidebars",
    "When showing hierarchical data with parent-child relationships",
    "For presenting key-value pairs in definition lists",
    "When content needs to be scanned quickly in a structured format",
  ];

  const whenNotToUse = [
    "For complex data that requires multiple columns (use Table instead)",
    "When items need extensive interactive functionality (consider custom components)",
    "For very large datasets where virtualization is needed",
    "When items need to be reordered by users (use a specialized component)",
    "For content that doesn't benefit from sequential or hierarchical structure",
  ];

  return (
    <OverviewTemplate
      title="List Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The List component is a versatile element for displaying collections of
        items in various formats: unordered lists (bulleted), ordered lists
        (numbered), and definition lists (term-description pairs). Lists are
        fundamental building blocks for organizing and structuring content in a
        way that improves readability and comprehension.
      </p>

      <p class="mt-2">
        With configurable marker styles, sizing options, and spacing controls,
        the List component can be tailored to fit different design requirements
        while maintaining visual consistency. The component supports nested
        lists for representing hierarchical data and includes accessibility
        features to ensure all users can navigate and understand list content
        efficiently.
      </p>

      <p class="mt-2">
        Lists can be static content displays or interactive elements for
        navigation and selection. The component's flexible design allows it to
        be used across various contexts, from simple bullet points in
        documentation to interactive navigation menus in complex applications.
      </p>
    </OverviewTemplate>
  );
});
