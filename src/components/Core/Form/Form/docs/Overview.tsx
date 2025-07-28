import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * Form component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Form State Management: Automatically tracks form values, errors, touched fields, and validation state.",
    "Field Validation: Supports synchronous and asynchronous validation with customizable validation rules and messages.",
    "Qwik City Integration: Seamlessly works with Qwik City actions for server-side form handling.",
    "Accessibility: Built with accessibility in mind, including proper labeling, error messaging, and keyboard navigation.",
    "Responsive Layouts: Adapts to different screen sizes with support for various form layouts.",
    "Controlled & Uncontrolled Modes: Works in both controlled and uncontrolled modes for flexible implementation.",
  ];

  const whenToUse = [
    "User registration and authentication forms",
    "Data entry interfaces",
    "Configuration panels",
    "Search and filter forms",
    "Multi-step wizards and workflows",
    "Settings and preference forms",
  ];

  const whenNotToUse = [
    "For very simple, single-field forms where a dedicated form component might be overkill",
    "When you need full control over form submission handling outside of the Qwik ecosystem",
    "When form data needs to be exclusively processed on the client-side with no server interaction",
  ];

  return (
    <OverviewTemplate
      title="Form Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Form component is a foundational element of the Connect design
        system that provides a structured way to collect user input. It includes
        built-in form validation, state management, and integration with Qwik
        City's actions.
      </p>
      <p class="mt-2">
        Use the Form component to create structured forms with consistent
        validation patterns, error handling, and submission processing. It
        simplifies the process of building complex forms by providing a
        declarative API for defining form fields and their behavior.
      </p>
      <p class="mt-2">
        The Form component handles many common form concerns such as field
        registration, validation timing, error messages, and submission
        handling, allowing you to focus on your application's specific business
        logic.
      </p>
    </OverviewTemplate>
  );
});
