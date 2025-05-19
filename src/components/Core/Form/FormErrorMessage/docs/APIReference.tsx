import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate, type PropDetail, type MethodDetail } from '~/components/Docs/templates';

/**
 * FormErrorMessage component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "children",
      type: "string",
      description: "The error message content to display"
    },
    {
      name: "message",
      type: "string",
      description: "Alternative way to provide the error message (use either children or message)"
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Size variant of the error message",
      defaultValue: "'md'"
    },
    {
      name: "icon",
      type: "any",
      description: "Optional icon element to display before the error message text"
    },
    {
      name: "id",
      type: "string",
      description: "Unique identifier for the error message, useful for associating with form controls"
    },
    {
      name: "hasTopMargin",
      type: "boolean",
      description: "Whether to add top margin to the error message element",
      defaultValue: "true"
    },
    {
      name: "animate",
      type: "boolean",
      description: "Whether to apply an attention-drawing animation to the error message",
      defaultValue: "false"
    },
    {
      name: "role",
      type: "string",
      description: "ARIA role for the error message element",
      defaultValue: "'alert'"
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of the element that is described by this error message"
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS class names to apply to the error message element"
    }
  ];

  // FormErrorMessage doesn't have methods
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate
      props={props}
      methods={methods}
    >
      <p>
        The FormErrorMessage component displays validation errors for form inputs.
        It's designed to clearly communicate issues that need to be addressed before
        a form can be successfully submitted.
      </p>
      
      <h3 class="text-lg font-medium mt-6 mb-2">Accessibility Features</h3>
      <p class="mb-4">
        The FormErrorMessage component includes several accessibility features:
      </p>
      <ul class="list-disc pl-5 space-y-1 mb-4">
        <li>Uses <code>role="alert"</code> by default to announce errors to screen readers</li>
        <li>Can be associated with form controls using <code>id</code> and <code>aria-describedby</code></li>
        <li>Has proper color contrast for error messages</li>
        <li>Supports icons to provide additional visual cues</li>
      </ul>
      
      <h3 class="text-lg font-medium mt-6 mb-2">Animation</h3>
      <p class="mb-4">
        When the <code>animate</code> prop is enabled, the error message will use a subtle 
        animation to draw user attention to it. This is particularly useful for:
      </p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Real-time validation where errors appear as users type</li>
        <li>Form submission failure where errors need to be highlighted</li>
        <li>Dynamic form sections where errors may not be immediately visible</li>
      </ul>
    </APIReferenceTemplate>
  );
}); 