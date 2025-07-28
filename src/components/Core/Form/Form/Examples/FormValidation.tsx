import { component$, $ } from "@builder.io/qwik";
import { Form } from "../index";
import { FormField } from "../FormField";
import { Button } from "../../../button";
import type { FormValidationRule } from "../Form.types";

export default component$(() => {
  // Password validation rule
  const passwordValidator$ = $((value: string) => {
    if (!value || value.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one number";
    }
    return undefined;
  });

  // Email validation rule
  const emailValidator$ = $((value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return undefined;
  });

  // Password confirmation validation
  const confirmPasswordValidator$ = $(
    (value: string, formValues: Record<string, any>) => {
      if (value !== formValues.password) {
        return "Passwords do not match";
      }
      return undefined;
    },
  );

  const passwordRules: FormValidationRule[] = [
    { validator: passwordValidator$ },
  ];

  const emailRules: FormValidationRule[] = [{ validator: emailValidator$ }];

  const confirmPasswordRules: FormValidationRule[] = [
    { validator: confirmPasswordValidator$ },
  ];

  return (
    <div class="max-w-md">
      <Form
        validateOnBlur={true}
        validateOnChange={true}
        validateOnSubmit={true}
        onSubmit$={(values) => {
          console.log("Form submitted with values:", values);
          alert("Registration successful!");
        }}
      >
        <FormField
          name="username"
          label="Username"
          required
          helperText="Choose a unique username"
        >
          <input
            type="text"
            name="username"
            class="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Enter username"
            required
          />
        </FormField>

        <FormField
          name="email"
          label="Email"
          required
          validate={emailRules}
          helperText="We'll never share your email"
        >
          <input
            type="email"
            name="email"
            class="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="your.email@example.com"
            required
          />
        </FormField>

        <FormField
          name="password"
          label="Password"
          required
          validate={passwordRules}
          helperText="Must be at least 8 characters with uppercase, lowercase, and number"
        >
          <input
            type="password"
            name="password"
            class="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Enter password"
            required
          />
        </FormField>

        <FormField
          name="confirmPassword"
          label="Confirm Password"
          required
          validate={confirmPasswordRules}
        >
          <input
            type="password"
            name="confirmPassword"
            class="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Confirm password"
            required
          />
        </FormField>

        <div class="mt-2 flex items-center gap-3">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
});
