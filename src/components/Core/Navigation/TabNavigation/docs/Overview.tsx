import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const keyFeatures = [
    "Horizontal and vertical orientation options",
    "Multiple visual variants (default, filled, outlined, subtle)",
    "Support for icons within tabs",
    "Responsive design that adapts to different screen sizes",
    "Accessible implementation with ARIA support",
    "Customizable tab sizes and spacing",
  ];

  const whenToUse = [
    "When content needs to be separated into distinct, related sections",
    "For switching between views within the same context",
    "When users need to navigate between related content without page reloads",
    "For grouping form sections in a multi-part form",
    "When screen space is limited and content needs to be organized into tabs",
  ];

  const whenNotToUse = [
    "For primary navigation across an entire website (use TopNavigation instead)",
    "When users need to see multiple sections simultaneously",
    "For content that has a sequential flow (use a Stepper component instead)",
    "For unrelated content that doesn't belong to the same context",
    "When there are more than 7-8 tabs (consider a different navigation pattern)",
  ];

  return (
    <OverviewTemplate
      title="TabNavigation Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The TabNavigation component provides a way to organize and navigate
        between related sections of content within the same view. It creates a
        visually distinct set of tabs that allow users to switch between
        different content panels without navigating to a new page.
      </p>

      <p class="mt-2">
        Tabs are an efficient way to present related content in a compact space,
        allowing users to focus on one section at a time. The TabNavigation
        component supports both horizontal (default) and vertical orientations
        to fit different layout requirements.
      </p>

      <p class="mt-2">
        Built with accessibility in mind, the TabNavigation component implements
        proper ARIA roles and keyboard navigation, ensuring all users can
        interact with tabbed interfaces effectively. The component can be easily
        customized to match your application's design language through various
        styling options and variants.
      </p>
    </OverviewTemplate>
  );
});
