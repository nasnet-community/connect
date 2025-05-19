import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

/**
 * Select component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Single and multiple selection modes",
    "Searchable options for larger datasets",
    "Option grouping for better organization",
    "Customizable styling and size variants",
    "Accessibility features including keyboard navigation",
    "Support for disabled states and validation"
  ];

  const whenToUse = [
    "When users need to select from a predefined list of options",
    "When you have a large number of options that need to be searchable",
    "When you want to categorize options into logical groups",
    "When screen space is limited and a dropdown interface is more appropriate",
    "When users should only select one option (or multiple in multi-select mode)"
  ];

  const whenNotToUse = [
    "When there are only 2-3 options (consider radio buttons instead)",
    "When users need to see all options at once (consider checkboxes)",
    "When users need to input free-form text (use a text input)",
    "When the primary interaction is toggling a single option on/off (use a switch or checkbox)"
  ];

  return (
    <OverviewTemplate
      title="Select Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Select component provides users with a dropdown interface for choosing one or more options 
        from a predefined list. It handles complex scenarios like searching, grouping, and keyboard 
        navigation while maintaining accessibility.
      </p>
      <p class="mt-2">
        This component offers different visual styles, sizes, and states to match your application's
        design system, along with features like searching, option grouping, and multiple selection to
        enhance usability.
      </p>
      <p class="mt-2">
        The Select component is designed to be fully accessible with keyboard navigation,
        screen reader support, and proper focus management making it usable for all users.
      </p>
    </OverviewTemplate>
  );
}); 