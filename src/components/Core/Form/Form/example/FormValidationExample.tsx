import { $, component$ } from "@builder.io/qwik";
import { Form } from "../Form";
import { FormField } from "../FormField";
import * as validators from "../formValidation";
import type { FormValidationRule } from "../Form.types";

/**
 * Example component demonstrating advanced form validation and submission
 * techniques in the Connect design system.
 *
 * This showcases:
 * 1. Using pre-built validation rules
 * 2. Custom validation logic
 * 3. Cross-field validation
 * 4. Conditional validation
 * 5. Form submission handling
 */
export const FormValidationExample = component$(() => {
  // Form submission handler
  const handleSubmit$ = $((values: Record<string, any>) => {
    // In a real application, you would send this data to an API
    console.log("Form submitted with values:", values);

    // Example server-side validation simulation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Server validated and processed the data");
        resolve();
      }, 1000);
    });
  });

  // Custom validation to check if the username is available
  // In a real app, this would make an API call
  const checkUsernameAvailable: FormValidationRule = {
    validator: $((value: any) => {
      if (!value) return undefined;

      return new Promise<string | undefined>((resolve) => {
        setTimeout(() => {
          const takenUsernames = ["admin", "user", "test"];
          if (takenUsernames.includes(value.toLowerCase())) {
            resolve("This username is already taken");
          } else {
            resolve(undefined);
          }
        }, 500);
      });
    }),
    message: "This username is already taken",
  };

  // Custom validation function for password strength
  const validatePasswordStrength: FormValidationRule = {
    validator: $((value: any) => {
      if (!value) return undefined;

      // Check for at least 8 characters, 1 uppercase, 1 lowercase, 1 number
      const hasMinLength = value.length >= 8;
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);

      if (!hasMinLength) {
        return "Password must be at least 8 characters long";
      }

      // Calculate strength
      let strength = 0;
      if (hasUppercase) strength++;
      if (hasLowercase) strength++;
      if (hasNumber) strength++;

      if (strength < 3) {
        return "Password must include uppercase, lowercase, and numbers";
      }

      return undefined;
    }),
    message: "Password must include uppercase, lowercase, and numbers",
  };

  return (
    <Form
      onSubmit$={handleSubmit$}
      validateOnChange={true}
      validateOnBlur={true}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      }}
    >
      <div class="grid grid-cols-2 gap-4">
        <FormField name="firstName" label="First Name" required>
          <input
            type="text"
            name="firstName"
            class="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </FormField>

        <FormField name="lastName" label="Last Name" required>
          <input
            type="text"
            name="lastName"
            class="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </FormField>
      </div>

      <FormField
        name="email"
        label="Email Address"
        helperText="We'll never share your email with anyone else"
        required
        validate={[
          validators.required("Email is required"),
          validators.email("Please enter a valid email address"),
        ]}
      >
        <input
          type="email"
          name="email"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </FormField>

      <FormField
        name="username"
        label="Username"
        helperText="Choose a unique username"
        required
        validate={[
          validators.required("Username is required"),
          validators.minLength(3, "Username must be at least 3 characters"),
          validators.maxLength(20, "Username must be at most 20 characters"),
          validators.pattern(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores",
          ),
          checkUsernameAvailable,
        ]}
      >
        <input
          type="text"
          name="username"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </FormField>

      <FormField
        name="password"
        label="Password"
        helperText="Must be at least 8 characters with uppercase, lowercase, and numbers"
        required
        validate={[
          validators.required("Password is required"),
          validatePasswordStrength,
        ]}
      >
        <input
          type="password"
          name="password"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </FormField>

      <FormField
        name="confirmPassword"
        label="Confirm Password"
        required
        validate={[
          validators.required("Please confirm your password"),
          validators.matches("password", "Passwords do not match"),
        ]}
      >
        <input
          type="password"
          name="confirmPassword"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </FormField>

      <FormField
        name="agreeToTerms"
        label="Terms and Conditions"
        validate={[
          {
            validator: $((value: any) =>
              value === true
                ? undefined
                : "You must agree to the terms and conditions",
            ),
            message: "You must agree to the terms and conditions",
          },
        ]}
      >
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            name="agreeToTerms"
            id="agreeToTerms"
            class="h-4 w-4"
            required
          />
          <label for="agreeToTerms" class="text-sm">
            I agree to the{" "}
            <a href="#" class="text-blue-600 hover:underline">
              Terms and Conditions
            </a>
          </label>
        </div>
      </FormField>

      <div class="mt-6 flex justify-end gap-3">
        <button
          type="reset"
          class="rounded-md bg-gray-100 px-4 py-2 text-gray-700"
        >
          Reset
        </button>
        <button
          type="submit"
          class="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Create Account
        </button>
      </div>
    </Form>
  );
});

export default FormValidationExample;
