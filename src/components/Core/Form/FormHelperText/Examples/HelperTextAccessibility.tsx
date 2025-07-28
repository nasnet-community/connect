import { component$ } from "@builder.io/qwik";
import { FormHelperText } from "../index";
import { Field } from "../../Field";

export default component$(() => {
  const passwordFieldId = "password-field";
  const helperTextId = "password-helper";

  return (
    <div class="max-w-md space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Accessible Helper Text</h3>

        <Field
          id={passwordFieldId}
          label="Password"
          type="password"
          placeholder="Enter your password"
          aria-describedby={helperTextId}
        />

        <FormHelperText id={helperTextId}>
          Password must be at least 8 characters and include at least one
          number, one uppercase letter, and one special character
        </FormHelperText>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Screen Reader Only Helper Text
        </h3>

        <Field
          id="email-field"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          aria-describedby="email-sr-helper"
        />

        <FormHelperText id="email-sr-helper" srOnly>
          Please enter a valid email address in the format name@example.com
        </FormHelperText>

        <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
          The helper text above is only visible to screen readers
        </p>
      </div>

      <div class="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="mb-2 text-sm font-medium">Accessibility Features:</h4>
        <ul class="list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
          <li>
            Uses <code>id</code> on helper text for explicit reference
          </li>
          <li>
            Sets <code>aria-describedby</code> on the field to link to its
            helper text
          </li>
          <li>
            Provides <code>srOnly</code> option for screen reader only text
          </li>
          <li>
            Uses <code>role="status"</code> to communicate state changes to
            screen readers
          </li>
        </ul>
      </div>
    </div>
  );
});
