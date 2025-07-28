import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * Checkbox component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Boolean Selection: Provides true/false selection options",
    "Indeterminate State: Supports an indeterminate state for partial selection",
    "Group Management: Checkbox groups for multiple related options",
    "Visual States: Support for checked, unchecked, error, and disabled states",
    "Size Variants: Available in small, medium, and large sizes",
    "Accessibility: Built with proper ARIA attributes and keyboard navigation",
  ];

  const whenToUse = [
    "When users need to select one or more options from a list",
    "For toggling a single feature or setting on/off",
    "When presenting a list of independent options where multiple selections are allowed",
    "For accepting terms and conditions or other agreements",
    "In forms that require multiple selection capabilities",
  ];

  const whenNotToUse = [
    "When users should select only one option from a list (use RadioGroup instead)",
    "For binary selections that take immediate effect (consider using Switch)",
    "When the selection requires a more complex UI (consider using a custom component)",
    "When vertical space is limited and many options exist (consider a Select with multiple)",
  ];

  return (
    <OverviewTemplate
      title="Checkbox Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Checkbox component provides a way to select boolean options in
        forms. It is commonly used for multiple-choice selections where one or
        more options can be selected simultaneously.
      </p>
      <p class="mt-2">
        Checkboxes can operate independently or be grouped together using the
        CheckboxGroup component. They support various states including checked,
        unchecked, indeterminate, disabled, and error states to communicate
        validation status clearly to users.
      </p>
      <p class="mt-2">
        The component is designed with accessibility in mind, ensuring proper
        keyboard navigation, focus management, and screen reader compatibility
        for all users.
      </p>
    </OverviewTemplate>
  );
});
