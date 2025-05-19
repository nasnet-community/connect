import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const keyFeatures = [
    "Multiple variants: primary, secondary, outline, and ghost",
    "Three size options: small, medium, and large",
    "Support for disabled and loading states",
    "Icon integration (left, right, or both sides)",
    "Fully customizable with additional classes",
    "Accessible with proper focus states and ARIA attributes"
  ];

  const whenToUse = [
    "For primary user actions and form submissions",
    "To trigger events or transitions in the interface",
    "When users need to make choices or selections",
    "For navigation actions that need more prominence than links",
    "To initiate processes or workflows",
    "In toolbars and action menus"
  ];

  const whenNotToUse = [
    "For simple navigation between pages (use Link instead)",
    "When too many buttons might overwhelm the interface",
    "For secondary or tertiary actions (consider other variants or links)",
    "When an action is not currently available (use disabled state or hide)",
    "For toggle actions that need to show their current state (use Switch or Checkbox)"
  ];

  return (
    <OverviewTemplate
      title="Button Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Button component is a fundamental interactive element that enables users to trigger actions
        through clicks or taps. It provides visual feedback about its state and the type of action it will perform,
        helping users understand what will happen when they interact with it.
      </p>
      
      <p class="mt-2">
        With multiple variants and sizes, buttons can be styled to match their importance in the interface
        hierarchy. Primary buttons draw attention to the main action, while secondary, outline, and ghost
        variants provide alternatives for less prominent actions.
      </p>
      
      <p class="mt-2">
        Buttons support loading states to indicate when an action is being processed, disabled states
        when an action is unavailable, and can include icons to provide additional context or
        visual cues about their function.
      </p>
    </OverviewTemplate>
  );
});
