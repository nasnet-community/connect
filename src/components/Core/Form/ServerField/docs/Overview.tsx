import { component$ } from "@builder.io/qwik";
import OverviewTemplate from "../../../../Docs/templates/OverviewTemplate";

export default component$(() => {
  const keyFeatures = [
    "Provides a consistent layout for form fields in server components",
    "Supports both vertical and inline layouts",
    "Handles required field indicators automatically",
    "Displays validation error messages with appropriate styling",
    "Integrates with other server component variants in the form family",
  ];

  const whenToUse = [
    "When building forms in server components without client-side JavaScript",
    "When you need to create form fields that maintain a consistent layout and styling",
    "When you want to handle validation errors from server-side validation",
    "When implementing forms that need to work without client-side interactivity",
  ];

  const whenNotToUse = [
    "When you need client-side form validation or interactive feedback",
    "When building forms that require complex user interactions or state management",
    "When you want to use the standard Field component with client-side features",
  ];

  return (
    <OverviewTemplate
      title="ServerField Overview"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        ServerField components provide a way to create form fields for
        server-rendered forms in Connect applications. These components are
        designed for use in scenarios where client-side JavaScript isn't needed
        or available.
      </p>
      <p class="mt-2">
        The ServerFormField component handles the layout of a form field
        including labels, input elements, and error messages. It supports both
        vertical (default) and inline layouts, making it suitable for various
        form designs.
      </p>
      <p class="mt-2">
        Unlike the standard Field component, ServerField components do not
        include client-side validation or interactivity, making them ideal for
        server-rendered forms or static forms where minimal JavaScript is
        preferred.
      </p>
    </OverviewTemplate>
  );
});
