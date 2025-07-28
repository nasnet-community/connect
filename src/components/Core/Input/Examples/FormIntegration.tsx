import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import { Input, RadioInput } from "~/components/Core/Input";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: string;
  newsletter: string;
  terms: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  accountType?: string;
  terms?: string;
}

export const FormIntegration = component$(() => {
  const formData = useSignal<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    newsletter: "",
    terms: "",
  });

  const errors = useSignal<FormErrors>({});
  const isSubmitting = useSignal(false);
  const isSubmitted = useSignal(false);

  const validateField = $((field: keyof FormData, value: string) => {
    const newErrors = { ...errors.value };

    switch (field) {
      case "firstName":
        if (!value.trim()) {
          newErrors.firstName = "First name is required";
        } else if (value.length < 2) {
          newErrors.firstName = "First name must be at least 2 characters";
        } else {
          delete newErrors.firstName;
        }
        break;

      case "lastName":
        if (!value.trim()) {
          newErrors.lastName = "Last name is required";
        } else if (value.length < 2) {
          newErrors.lastName = "Last name must be at least 2 characters";
        } else {
          delete newErrors.lastName;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = "Password must contain uppercase, lowercase, and number";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== formData.value.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case "accountType":
        if (!value) {
          newErrors.accountType = "Please select an account type";
        } else {
          delete newErrors.accountType;
        }
        break;

      case "terms":
        if (!value) {
          newErrors.terms = "You must accept the terms and conditions";
        } else {
          delete newErrors.terms;
        }
        break;
    }

    errors.value = newErrors;
  });

  const handleFieldChange$ = $((field: keyof FormData, value: string) => {
    formData.value = { ...formData.value, [field]: value };
    validateField(field, value);
  });

  const handleSubmit$ = $(async (event: Event) => {
    event.preventDefault();
    isSubmitting.value = true;

    // Validate all fields
    Object.keys(formData.value).forEach((key) => {
      validateField(key as keyof FormData, formData.value[key as keyof FormData]);
    });

    // Check if there are any errors
    if (Object.keys(errors.value).length === 0) {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      isSubmitted.value = true;
    }

    isSubmitting.value = false;
  });

  const accountTypeOptions = [
    {
      value: "personal",
      label: "Personal",
      description: "For individual use and personal projects",
    },
    {
      value: "business",
      label: "Business",
      description: "For teams and business organizations",
    },
    {
      value: "enterprise",
      label: "Enterprise",
      description: "For large organizations with advanced needs",
    },
  ];

  const newsletterOptions = [
    { value: "yes", label: "Yes, send me updates and newsletters" },
    { value: "no", label: "No, I prefer not to receive emails" },
  ];

  const termsOptions = [
    { value: "accepted", label: "I agree to the Terms of Service and Privacy Policy" },
  ];

  // Auto-validate confirm password when password changes
  useTask$(({ track }) => {
    track(() => formData.value.password);
    if (formData.value.confirmPassword) {
      validateField("confirmPassword", formData.value.confirmPassword);
    }
  });

  if (isSubmitted.value) {
    return (
      <div class="flex min-h-[400px] items-center justify-center p-6">
        <div class="rounded-lg bg-green-50 p-8 text-center dark:bg-green-900/20">
          <div class="mb-4 text-green-600 dark:text-green-400">
            <svg class="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="mb-2 text-lg font-semibold text-green-900 dark:text-green-100">
            Account Created Successfully!
          </h3>
          <p class="text-green-800 dark:text-green-200">
            Welcome aboard! Your account has been created and you can now start using our platform.
          </p>
          <button
            onClick$={() => {
              isSubmitted.value = false;
              formData.value = {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                accountType: "",
                newsletter: "",
                terms: "",
              };
              errors.value = {};
            }}
            class="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Create Another Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-6 p-6">
      <div class="mb-6">
        <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Form Integration Example
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Complete signup form with validation, error handling, and submission workflow.
        </p>
      </div>

      <form onSubmit$={handleSubmit$} class="space-y-6">
        <div class="grid gap-6 md:grid-cols-2">
          <Input
            label="First Name"
            placeholder="Enter your first name"
            required
            value={formData.value.firstName}
            validation={errors.value.firstName ? "invalid" : "default"}
            errorMessage={errors.value.firstName}
            onChange$={(_, value) => handleFieldChange$("firstName", value)}
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            required
            value={formData.value.lastName}
            validation={errors.value.lastName ? "invalid" : "default"}
            errorMessage={errors.value.lastName}
            onChange$={(_, value) => handleFieldChange$("lastName", value)}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
          value={formData.value.email}
          validation={errors.value.email ? "invalid" : "default"}
          errorMessage={errors.value.email}
          helperText="We'll never share your email with anyone else"
          onChange$={(_, value) => handleFieldChange$("email", value)}
        />

        <div class="grid gap-6 md:grid-cols-2">
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            required
            value={formData.value.password}
            validation={errors.value.password ? "invalid" : "default"}
            errorMessage={errors.value.password}
            helperText="At least 8 characters with uppercase, lowercase, and number"
            onChange$={(_, value) => handleFieldChange$("password", value)}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            required
            value={formData.value.confirmPassword}
            validation={errors.value.confirmPassword ? "invalid" : "default"}
            errorMessage={errors.value.confirmPassword}
            onChange$={(_, value) => handleFieldChange$("confirmPassword", value)}
          />
        </div>

        <RadioInput
          name="accountType"
          label="Account Type"
          value={formData.value.accountType}
          options={accountTypeOptions}
          required
          validation={errors.value.accountType ? "invalid" : "default"}
          errorMessage={errors.value.accountType}
          onChange$={(_, value) => handleFieldChange$("accountType", value)}
        />

        <RadioInput
          name="newsletter"
          label="Newsletter Subscription"
          value={formData.value.newsletter}
          options={newsletterOptions}
          helperText="Stay updated with our latest features and news"
          onChange$={(_, value) => handleFieldChange$("newsletter", value)}
        />

        <RadioInput
          name="terms"
          value={formData.value.terms}
          options={termsOptions}
          required
          validation={errors.value.terms ? "invalid" : "default"}
          errorMessage={errors.value.terms}
          onChange$={(_, value) => handleFieldChange$("terms", value)}
        />

        <div class="flex items-center justify-between pt-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a href="#" class="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign in here
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting.value || Object.keys(errors.value).length > 0}
            class={[
              "rounded-lg px-6 py-2 font-medium transition-colors",
              isSubmitting.value || Object.keys(errors.value).length > 0
                ? "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
            ].join(" ")}
          >
            {isSubmitting.value ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      </form>

      <div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="mb-2 font-medium text-gray-900 dark:text-white">Form State:</h4>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h5 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Data:</h5>
            <pre class="text-xs text-gray-600 dark:text-gray-400">
              {JSON.stringify(formData.value, null, 2)}
            </pre>
          </div>
          <div>
            <h5 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Errors:</h5>
            <pre class="text-xs text-gray-600 dark:text-gray-400">
              {JSON.stringify(errors.value, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div class="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h4 class="mb-2 font-medium text-blue-900 dark:text-blue-100">
          🔧 Integration Features
        </h4>
        <ul class="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• Real-time validation with visual feedback</li>
          <li>• Form state management with Qwik signals</li>
          <li>• Accessible error handling and ARIA attributes</li>
          <li>• Loading states and submission workflow</li>
          <li>• Responsive form layout for all devices</li>
        </ul>
      </div>
    </div>
  );
});