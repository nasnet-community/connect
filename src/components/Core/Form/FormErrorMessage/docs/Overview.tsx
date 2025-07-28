import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * FormErrorMessage component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Provides clear feedback for validation errors in forms",
    "Supports different sizes (small, medium, large)",
    "Can include optional icons for better visual communication",
    "Supports animations for calling attention to errors",
    "Properly integrated with screen readers for accessibility",
    "Easily associated with form fields through ID references",
  ];

  const whenToUse = [
    "When displaying validation errors for form inputs",
    "When communicating critical errors that need user attention",
    "When grouping multiple error messages for a form section",
    "When form submission fails due to validation issues",
    "When implementing real-time validation feedback",
  ];

  const whenNotToUse = [
    "When providing general guidance or instructions (use FormHelperText instead)",
    "When displaying success messages or confirmations",
    "When showing warning messages that don't prevent form submission",
    "When the feedback is optional or supplementary",
    "When errors need complex interactive resolution (consider a Dialog or Alert)",
  ];

  return (
    <OverviewTemplate
      title="FormErrorMessage Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The FormErrorMessage component is designed to clearly communicate
        validation errors in forms. It provides a consistent, accessible way to
        display error messages associated with form fields.
      </p>
      <p class="mt-2">
        With support for different sizes, icons, and animation, the
        FormErrorMessage component helps draw user attention to issues that need
        to be corrected before a form can be successfully submitted.
      </p>
      <p class="mt-2">
        The component is built with accessibility in mind, ensuring that error
        messages are properly announced to screen readers and can be associated
        with form fields through ARIA attributes.
      </p>
    </OverviewTemplate>
  );
});
