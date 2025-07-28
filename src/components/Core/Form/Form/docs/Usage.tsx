import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * Form component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use form fields with proper validation",
      description:
        "Always use validation rules to ensure data integrity and provide clear feedback to users.",
      code: `<Field 
  name="email"
  label="Email Address"
  required
  validate={[required(), email()]}
/>`,
      type: "do",
    },
    {
      title: "Use semantic field grouping",
      description:
        "Group related fields together logically using proper semantic HTML elements.",
      code: `<Form>
  <fieldset class="mb-6 p-4 border rounded">
    <legend class="text-lg font-medium px-2">Personal Information</legend>
    <div class="space-y-4">
      <Field name="firstName" label="First Name" />
      <Field name="lastName" label="Last Name" />
    </div>
  </fieldset>
</Form>`,
      type: "do",
    },
    {
      title: "Integrate with Qwik City for server validation",
      description:
        "Leverage Qwik City's server actions for robust server-side validation.",
      code: `// Route component file
export const useLoginAction = routeAction$(
  async (data) => {
    // Server-side validation and processing
  },
  zod$({
    email: z.string().email(),
    password: z.string().min(8),
  })
);

export default component$(() => {
  const loginAction = useLoginAction();
  
  return (
    <Form qwikAction={loginAction}>
      {/* Form fields */}
    </Form>
  );
});`,
      type: "do",
    },
    {
      title: "Mix form validation responsibilities",
      description:
        "Don't mix validation logic between components; keep validation centralized and consistent.",
      code: `// Avoid this approach
<Form validateOnSubmit={false}>
  <Field name="email" validate={[email()]} />
  <div>
    <input 
      name="password" 
      onChange={(e) => {
        // Inline validation logic
        if (e.target.value.length < 8) {
          setError('Password too short');
        }
      }}
    />
  </div>
</Form>`,
      type: "dont",
    },
    {
      title: "Skip proper error handling",
      description:
        "Don't leave users guessing what went wrong; always provide clear error messages.",
      code: `// Avoid this approach
<Form 
  onSubmit$={async (values) => {
    try {
      await submitData(values);
    } catch (error) {
      // No error handling or user feedback
    }
  }}
>
  {/* Form fields */}
</Form>`,
      type: "dont",
    },
    {
      title: "Manually manage form state",
      description:
        "Don't manually manage form state when the Form component provides built-in state management.",
      code: `// Avoid this approach
const email = useSignal('');
const password = useSignal('');
const isValid = useSignal(false);

// Manual validation and state management
const validate = $(() => {
  isValid.value = email.value.includes('@') && password.value.length >= 8;
});

return (
  <form>
    <input value={email.value} onInput$={(e) => {
      email.value = e.target.value;
      validate();
    }} />
    {/* More manual handling */}
  </form>
);`,
      type: "dont",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Use appropriate field types",
      description:
        "Use specific input types like email, tel, number, etc. to provide appropriate keyboard layouts on mobile devices and built-in browser validation.",
    },
    {
      title: "Provide immediate validation feedback",
      description:
        "Configure form validation to run on blur or change to give users immediate feedback about input errors.",
    },
    {
      title: "Use clear and specific error messages",
      description:
        "Error messages should clearly explain what's wrong and how to fix it. Avoid generic messages like 'Invalid input'.",
    },
    {
      title: "Group related fields logically",
      description:
        "Organize form fields into logical sections or groups to improve clarity and reduce cognitive load.",
    },
    {
      title: "Implement progressive disclosure",
      description:
        "For complex forms, show only the fields needed at each step rather than overwhelming users with a long form.",
    },
    {
      title: "Implement responsive layouts",
      description:
        "Ensure forms adapt gracefully to different screen sizes using responsive design techniques.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Associate labels with inputs",
      description:
        "Every form control should have a label that is properly associated using the 'for' attribute matching the input's ID.",
    },
    {
      title: "Use aria-describedby for error messages",
      description:
        "Connect error messages to form controls using aria-describedby to ensure screen readers announce errors properly.",
    },
    {
      title: "Maintain focus management",
      description:
        "Ensure focus is managed appropriately, especially after form submission, errors, or dynamic content changes.",
    },
    {
      title: "Mark required fields",
      description:
        "Clearly indicate required fields both visually and with the required attribute for screen readers.",
    },
    {
      title: "Provide an error summary",
      description:
        "For forms with multiple fields, consider adding an error summary at the top of the form after submission.",
    },
  ];

  const performanceTips = [
    "Use field-level validation for large forms to avoid validating the entire form on every change.",
    "Consider lazy-loading complex form sections for multi-step forms.",
    "Avoid unnecessary re-renders by properly structuring form state.",
    "Use optimistic UI updates for a better user experience during form submission.",
    "Implement debouncing for validations that require expensive computations or API calls.",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Form component provides a standardized way to build forms with
        built-in validation, state management, and Qwik City integration. Follow
        these guidelines to create effective, accessible, and user-friendly
        forms.
      </p>
      <p class="mt-2">
        The examples below demonstrate recommended patterns and approaches for
        implementing forms in your application. These practices help ensure
        consistency, accessibility, and a positive user experience.
      </p>
    </UsageTemplate>
  );
});
