import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

/**
 * RadioGroup component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Exclusive Selection: Allows users to select exactly one option from a set",
    "Group Management: Centralized state management for radio options",
    "Layout Options: Support for both horizontal and vertical layouts",
    "Visual States: Support for normal, disabled, and error states",
    "Form Integration: Seamless integration with form components",
    "Accessibility: Built with proper ARIA attributes and keyboard navigation"
  ];

  const whenToUse = [
    "When users need to select exactly one option from a list",
    "When presenting mutually exclusive choices",
    "When the user needs to see all options at once",
    "For binary choices when a default option should be pre-selected",
    "For settings or preferences where only one selection is valid"
  ];

  const whenNotToUse = [
    "When users need to select multiple options (use Checkbox or CheckboxGroup instead)",
    "When there are more than 5-7 options (consider using Select)",
    "When space is limited (consider using a Select dropdown)",
    "When the options can change dynamically (consider a more complex component)"
  ];

  return (
    <OverviewTemplate
      title="RadioGroup Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The RadioGroup component provides a way for users to select a single option from a set
        of mutually exclusive choices. It manages the relationship between radio buttons, ensuring
        that only one option can be selected at a time.
      </p>
      <p class="mt-2">
        RadioGroup is ideal for presenting a limited set of options where users need to make
        a single choice. It offers both horizontal and vertical layouts to fit different design requirements.
      </p>
      <p class="mt-2">
        The component is built with accessibility in mind, ensuring proper keyboard navigation, 
        focus management, and screen reader support for all users.
      </p>
    </OverviewTemplate>
  );
}); 