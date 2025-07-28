import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates/OverviewTemplate";

export default component$(() => {
  const keyFeatures = [
    "Multiple visual variants: solid, soft, and outline styles",
    "Seven semantic colors for different contextual representations",
    "Three size options to fit different UI needs",
    "Three shape options: square, rounded, and pill",
    "Support for dismissible badges with custom handlers",
    "Optional dot indicators and borders for enhanced visibility",
    "Support for icons at start or end positions",
    "BadgeGroup component for organizing multiple badges",
    "Accessible with proper ARIA attributes",
  ];

  const whenToUse = [
    "Highlighting new or updated content",
    "Indicating status or state of an item",
    "Categorizing or tagging content",
    "Displaying counts (notifications, items, etc.)",
    "Showing metadata or supplementary information",
    "Highlighting feature availability or limitations",
  ];

  const whenNotToUse = [
    "For primary content that requires substantial screen space",
    "To display long text content (use Cards or other containers instead)",
    "When multiple interactive elements are needed (use ButtonGroup or Dropdown instead)",
    "For critical navigation elements (use Tabs or Menu instead)",
    "When detailed explanations are required (use Tooltip or Popover instead)",
  ];

  return (
    <OverviewTemplate
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Badge component is used to highlight and display short pieces of
        information. Badges can indicate status, categorize items, show counts,
        or emphasize specific attributes in a compact and visually distinct way.
      </p>
      <p class="mt-2">
        With multiple variants, colors, and shapes, badges provide a flexible
        way to present contextual information that stands out from surrounding
        content while maintaining visual harmony.
      </p>
      <p class="mt-2">
        The component also includes a BadgeGroup variant for organizing multiple
        related badges in a consistent layout with configurable spacing and
        alignment.
      </p>
    </OverviewTemplate>
  );
});
