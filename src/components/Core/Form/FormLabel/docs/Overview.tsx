import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * FormLabel component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Semantic HTML label element for form controls",
    "Visually indicates required fields with an asterisk",
    "Supports different sizes (small, medium, large)",
    "Provides visual indication of state (disabled, error, success, warning)",
    "Screen reader support with appropriate ARIA attributes",
    "Supports visually hidden labels with screen reader access",
  ];

  const whenToUse = [
    "When creating form controls that need clear, accessible labels",
    "When you need to visually indicate required form fields",
    "When you need to show field validation states in the label",
    "When you need to maintain consistent label styling across your application",
    "When implementing accessible forms requiring proper label-control association",
  ];

  const whenNotToUse = [
    "When a form field doesn't need a visible label (use srOnly prop instead)",
    "When using placeholder text as the only label (always provide an actual label)",
    "When embedding complex content within a label (use FormHelperText instead)",
    "When additional explanatory text is needed (use FormHelperText component)",
    "When the label is purely decorative and not associated with any input",
  ];

  return (
    <OverviewTemplate
      title="FormLabel Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The FormLabel component provides a standardized way to label form
        controls in your application. It creates semantic HTML label elements
        that are properly associated with form inputs, enhancing accessibility
        and user experience.
      </p>
      <p class="mt-2">
        With support for different sizes, states, and accessibility features,
        FormLabel ensures your forms are both visually consistent and fully
        accessible to all users, including those using assistive technologies
        like screen readers.
      </p>
      <p class="mt-2">
        The component automatically handles required field indicators and
        provides various visual states to match different validation states of
        your form controls.
      </p>
    </OverviewTemplate>
  );
});
