import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const keyFeatures = [
    "Single selection from multiple options",
    "Three size variants: small, medium, and large",
    "Support for disabled states at both group and option level",
    "Built-in RadioGroup component for easier management",
    "Horizontal and vertical layout options",
    "Helper text and error message support",
    "Full keyboard navigation with arrow keys",
    "Touch-optimized with minimum 44px touch targets",
    "Dark mode support with theme integration",
    "Accessible with proper ARIA attributes and labels",
  ];

  const whenToUse = [
    "When users need to select exactly one option from a list",
    "For mutually exclusive choices (e.g., payment method, shipping option)",
    "When all options should be visible for comparison",
    "For important selections that shouldn't default to a value",
    "In forms where a single choice determines subsequent options",
    "For binary choices where neither option is preferred (use Switch for on/off)",
    "When you have 2-7 options (consider Select for more options)",
  ];

  const whenNotToUse = [
    "For multiple selections (use Checkbox instead)",
    "For on/off or yes/no choices (use Switch or Toggle instead)",
    "When you have more than 7 options (use Select for better UX)",
    "For navigation or actions (use Tabs or Button instead)",
    "When options are too long or complex (consider a different pattern)",
    "If users might not need to make a selection (add a 'None' option)",
  ];

  return (
    <OverviewTemplate
      title="Radio Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Radio component enables users to select a single option from a
        predefined set of choices. Radio buttons are grouped together to
        indicate that only one option can be selected at a time, making them
        ideal for mutually exclusive selections.
      </p>

      <p class="mt-2">
        Radio buttons can be used individually with the Radio component or
        managed as a group with the RadioGroup component. The RadioGroup
        provides additional features like unified state management, consistent
        styling, helper text, error messages, and simplified keyboard
        navigation.
      </p>

      <p class="mt-2">
        The component is designed with accessibility in mind, featuring proper
        labeling, keyboard navigation, and ARIA attributes. It's optimized for
        both desktop and mobile experiences, with touch-friendly target sizes
        and responsive layouts that adapt to different screen sizes.
      </p>

      <p class="mt-2">
        With full theme integration, Radio components automatically adapt to
        light and dark modes, using the application's color scheme for
        consistent visual design. The component supports three size variants to
        accommodate different UI contexts and density requirements.
      </p>
    </OverviewTemplate>
  );
});